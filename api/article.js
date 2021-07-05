import request, { instance } from '/plugins/request'
import store from '/store/index'

// 获取公共文章
export const getArticles = params => {
  return instance({
    method: 'get',
    url: '/api/articles',
    params
  })
}

// 获取关注文章
export const getFeedArticles = params => {
  return instance({
    method: 'get',
    url: '/api/articles/feed',
    params
  })
}

// 文章点赞
export const addFavorite = slug => {
  return instance({
    method: 'post',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return instance({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticleDetail = slug => {
  return instance({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = slug => {
  return instance({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 发表评论
export const postComment = ({ slug, comment }) => {
  return instance({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        body: comment
      }
    }
  })
}

// 删除评论
export const delComment = ({ slug, id }) => {
  return instance({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 创作文章
export const createArticle = article => {
  return instance({
    method: 'POST',
    url: `/api/articles`,
    data: {
      article
    }
  })
}

// 关注文章
export const followingArticle = username => {
  return instance({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

// 取消关注
export const unFollowingArticle = username => {
  return instance({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}

// 喜欢文章
export const favoriteArticle = slug => {
  return instance({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 不喜欢文章
export const unFavoriteArticle = slug => {
  return instance({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 删除文章
export const delArticle = slug => {
  return instance({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 编辑文章
export const updateArticle = ({ slug, article }) => {
  return instance({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data: {
      article
    }
  })
}
