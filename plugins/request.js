/**
 * 基于 axios 封装请求模块
 */

import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// 通过插件机制获取到上下文对象（query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  instance.interceptors.request.use((config) => {
    const { user } = store.state
    if (user?.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, (error => {
    return Promise.reject(error)
  }))
}

