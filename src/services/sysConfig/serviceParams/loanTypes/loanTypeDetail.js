import { request } from '../../../../utils'

export async function query (params) {
  return request({
    url: '/api/loanTypeDetail',
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: '/api/loanTypesAdd',
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: '/api/loanTypesAdd',
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: '/api/loanTypesAdd',
    method: 'put',
    data: params,
  })
}
