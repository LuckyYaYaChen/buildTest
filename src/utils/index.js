/* global window */
import lodash from 'lodash'
import moment from 'moment'
import classnames from 'classnames'
import config from './config'
import request from './request'
import { color } from './theme'
import editCell from './editCell'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    let str = r.input.substring(5, r.input.length)
    return decodeURI(str)
  }
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

const handleFields = (data) => {
  const dataArr = Reflect.enumerate(data)._k
  dataArr.forEach((item) => {
    if (data[item] instanceof moment) {
      data[item] = data[item].format('YYYYMMDD')
    }
  })
  return data
}
/* 翻译后台数据 */
const translateData = (index, item) => {
  const obj = item.find((itemm) => {
    return itemm.value === index
  })
  return obj.name
}

/* 处理金额 */
/**
 * @param data 需要处理的数据对象
 * @param arr 需要处理的数据字段的数组集合
 * @param float 精确度（默认为2）
 * @returns {*}
 */
const floatNumber = (data, arr, float = 2) => {
  arr.forEach((item) => {
    const numberData = data[item]
    if (data[item] !== undefined) {
      data[item] = parseFloat(numberData).toFixed(float)
    }
  })
  /* const dataArr = Reflect.enumerate(data)._k
   dataArr.forEach((item) => {
     arr.forEach((arrItem) => {
       if (arrItem === item) {
         data[arrItem] = data[arrItem].toFixed(2)
       }
     })
   }) */
  // console.log(data)
  return data
}

// 比例格式化
const formatterPecent = {
  formatter: value => `${value}%`,
  parser: value => value.replace('%', ''),
}

const getRowKey = (record, text) => {
  let str = ''
  if (text instanceof Array) {
    text.forEach((item) => {
      str += record[item]
    })
  } else if (text instanceof String) {
    str = record[text]
  } else if (text === null) {
    str = record.id
  }
  return str
}
/**
 * 保存表格选中的数据
 * @param payload 表格参数对象
 * @param stateData 当前state下的选中数据
 * @returns {*}
 */
const saveSelectedData = (payload, stateData) => {
  if (payload.selectedRow instanceof Array) {
    if (payload.record === true) {
      payload.selectedRow.forEach((index) => {
        stateData = stateData.filter((item) => {
          return item.key !== index.key
        })
      })
      stateData = stateData.concat(payload.selectedRow)
    } else {
      payload.changeRows.forEach((index) => {
        stateData = stateData.filter((item) => {
          return item.key !== index.key
        })
      })
    }
  } else if (payload.record === true) {
    stateData.push(payload.selectedRow)
  } else {
    stateData = stateData.filter((item) => {
      return item.key !== payload.selectedRow.key
    })
  }
  return stateData
}/**
 * 保存表格选中的数据
 * @param payload 表格参数对象
 * @param stateData 当前state下的选中数据
 * @returns {*}
 */
const saveSelectedDataID = (payload, stateData = []) => {
  if (payload.selectedRow instanceof Array) {
    if (payload.record === true) {
      payload.selectedRow.forEach((index) => {
        stateData = stateData.filter((item) => {
          return item.id !== index.id
        })
      })
      stateData = stateData.concat(payload.selectedRow)
    } else {
      payload.changeRows.forEach((index) => {
        stateData = stateData.filter((item) => {
          return item.id !== index.id
        })
      })
    }
  } else if (payload.record === true) {
    stateData.push(payload.selectedRow)
  } else {
    stateData = stateData.filter((item) => {
      return item.id !== payload.selectedRow.id
    })
  }
  return stateData
}
// 删除父节点
const loopArr = (data1, childData) => {
  console.log(childData)
  console.log(data1)
}

/**
 *
 * @param list 第一组列表的 list 数据
 * @param newData 需要拼接上的 list 数据
 * @param limitationSeq 数据拼接的唯一标志
 * @returns {Array} 拼接完成后的数组
 */

const mergeList = (list, newData, limitationSeq) => {
  let arr = []
  list.forEach((item) => {
    newData.forEach((innnerItem) => {
      if (innnerItem[limitationSeq] === item[limitationSeq]) {
        const obj = Object.assign(item, innnerItem)
        arr.push(obj)
      }
    })
  })
  return arr
}

// 格式话时间
const getNowFormatDate = () => {
  let date = new Date()
  const seperator1 = '-'
  const seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let strHour = date.getHours()
  let strMin = date.getMinutes()
  let strSec = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = `0${strHour}`
  }
  if (strMin >= 0 && strMin <= 9) {
    strMin = `0${strMin}`
  }
  if (strSec >= 0 && strSec <= 9) {
    strSec = `0${strSec}`
  }
  const currentdate = `${date.getFullYear()}${seperator1}${month}${seperator1}${strDate} ${strHour}${seperator2}${strMin}${seperator2}${strSec} `
  return currentdate
}

// 去除查詢中的空字段
const delEmptyKey = (obj) => {
  const keys = []
  for (let item in obj) {
    // 对象字段转化成数组
    if (obj.hasOwnProperty(item)) {
      keys.push(item)
    }
  }
  keys.forEach((item) => {
    if (obj[item] === '') {
      delete obj[item]
    }
  })
  return obj
}

// 获取年月日
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
// 获取数据的Ids
const getListId = (arr, value, value1, value2) => {
  /* let str = ''
  arr.forEach((item) => {
    str = `${item[value]}-${item[value1]}-${item[value2]}-,${str}`
  })
  str = str.substring(0, str.length - 1)
  return str */
  let arrNew = []
  arr.forEach((item) => {
    const obj = {}
    obj[value] = item[value]
    obj[value1] = item[value1]
    obj[value2] = item[value2]
    arrNew.push(obj)
  })
  return arrNew
}

// 新建window窗口
const createWindow = (url) => {
  window.open(
    url, // 窗口地址
    url, // 窗口名称 为了区分不同窗口
    'toolbar=no,width=700,height=700,directories=no,status=no,scrollbars=yes,resize=no,menubar=no')
}

module.exports = {
  getListId,
  createWindow,
  getRowKey,
  getYMD,
  delEmptyKey,
  getNowFormatDate,
  mergeList,
  loopArr,
  saveSelectedData,
  saveSelectedDataID,
  formatterPecent,
  handleFields,
  floatNumber,
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  editCell,
  translateData,
}
