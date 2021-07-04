/**
 * 对 axios 进行接口的二次封装
 */
import { instance } from '/plugins/request'

// 用户登陆
export const login = data => {
  return instance({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return instance({
    method: 'post',
    url: '/api/users',
    data
  })
}
