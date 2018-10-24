import { request, config } from '../../../../utils'
const { api } = config
const { loanTypes } = api

export async function query (params) {
  return request({
    url: loanTypes,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: loanTypes,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: loanTypes,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: loanTypes,
    method: 'put',
    data: params,
  })
}
