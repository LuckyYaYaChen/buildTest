import { request, config } from '../../../utils'

const { api } = config
const { workbench } = api
const {
  // 工作台-审批进度-详情信息页
  CFSWOS0006,
  // 工作台-审批进度-查询
  CFSWOS0002,
  // 工作台-审批进度-打印
  CFSWOS0003,
  // 工作台-审批进度-审批轨迹
  CFSWOS0004,
  // 工作台-审批进度-资金轨迹
  CFSWOS0005,
  // 工作台-审批进度-审批信息查询
  CFSWOS0007,
  // 工作台-审批进度-查询主申人编号
  CFSWOS0001,
} = workbench


export async function queryManCode (params) {
  return request({
    url: CFSWOS0001,
    method: 'get',
    data: params,
  })
}

export async function queryDetail (params) {
  return request({
    url: CFSWOS0006,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: CFSWOS0002,
    method: 'post',
    data: params,
  })
}
export async function queryOther (params) {
  return request({
    url: CFSWOS0007,
    method: 'post1',
    data: params,
  })
}

export async function print (params) {
  return request({
    url: CFSWOS0003,
    method: 'get',
    data: params,
  })
}

export async function aTimeLine (params) {
  return request({
    url: CFSWOS0004,
    method: 'get',
    data: params,
  })
}

export async function mTomeLine (params) {
  return request({
    url: CFSWOS0005,
    method: 'get',
    data: params,
  })
}
