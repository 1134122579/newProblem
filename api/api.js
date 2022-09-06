import request from '/utils/request.js'

export function toLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    params : data
  }) 
}