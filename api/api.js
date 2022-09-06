import request from '@/utils/request.js'

export function getTokenApi(data) {
  return request({
    url: '/getToken',
    method: 'get',
    params : data
  }) 
}