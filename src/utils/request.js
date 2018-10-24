/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { YQL, CORS, baseURL, applicationCode } from './config'

axios.defaults.url = baseURL
const instance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
const instanceJson = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

const getYMD = () => {
  let date = new Date()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  const currentdate = `${date.getFullYear()}${month}${strDate}`
  return currentdate
}

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options
  // console.log(data)
  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  const YMD = getYMD()
  // console.log(YMD)
  let token = Cookies.get('token')
  let sessionId = ''
  if (token) {
    sessionId = JSON.parse(token).sessionId
  } else {
    sessionId = ''
  }
  const requestData = {
    // ...cloneData,
    sign: sessionId,
    apiCode: url.split('/')[url.split('/').length - 1], // api码 请求接口地址
    serialNumber: `0013${YMD}${(new Date()).valueOf()}${(Math.random() * 100000).toString().split('.')[0]}`, // 流水号
    applicationCode, // 渠道
    ...cloneData,
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: requestData,
      })
    case 'delete':
      return instance.delete(url, {
        data: qs.stringify(requestData),
      })
    case 'post1':
      return instanceJson.post(url, requestData)
    case 'post':
      return instance.post(url, qs.stringify(requestData))
    case 'put':
      return instance.put(url, qs.stringify(requestData))
    case 'patch':
      return instance.patch(url, requestData)
    default:
      return instance(options)
  }
}
export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }
  let token = Cookies.get('token')
  let sessionId = ''
  if (token) {
    sessionId = JSON.parse(token).sessionId
  } else {
    sessionId = ''
  }
  // 判断登陆是否超时
  if (sessionId === '' && options.url !== '/cfs-web/base/login') {
    return { success: false, message: '登陆超时，请重新登陆' }
  }
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }
    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.string || statusText
      // if (Number(statusCode) === 404) {
      //   window.location = location.origin
      // } else {
      //   msg = data.message || statusText
      // }
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
