import { instance } from '/plugins/request'

// 获取标签列表
export const getTags = () => {
  return instance({
    method: 'get',
    url: '/api/tags'
  })
}
