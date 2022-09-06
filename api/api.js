import request from '@/utils/request.js'

export function getToken(data) {
  return request({
    url: '/getToken',
    method: 'get',
    params : data
  }) 
}