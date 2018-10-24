import { request, config } from '../../utils'

const { api } = config
const { dic } = api
const {
  // 机构信息查询
  CFSWOS0012,
  // 商户信息查询
  CFSWOS0013,
  // 字典项转义
  CFSWOS0011,
  // 申请状态查询
  CFSWOS0014,
  // 消息内容查询
  CFSWOS0015,
} = dic

export async function queryMessage (params) {
  return request({
    url: CFSWOS0015,
    method: 'get',
    data: params,
  })
}

export async function queryApplyStatus (params) {
  return request({
    url: CFSWOS0014,
    method: 'get',
    data: params,
  })
}

export async function queryOrgan (params) {
  return request({
    url: CFSWOS0012,
    method: 'get',
    data: params,
  })
}

export async function queryMerc (params) {
  return request({
    url: CFSWOS0013,
    method: 'get',
    data: params,
  })
}

export async function queryDic (params) {
  return request({
    url: CFSWOS0011,
    method: 'get',
    data: params,
  })
}
