import { request, config } from '../utils'

const { myLogin } = config

export async function login (data) {
  return request({
    url: myLogin,
    method: 'post',
    data,
  })
}
