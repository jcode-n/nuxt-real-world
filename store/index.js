const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
const state = () => {
  return {
    // 当前用户登陆状态
    user: null
  }
}

const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

const actions = {
  // 初始化容器以及需要传递给客户端的数据
  // 这个特殊的 action 只会在服务端渲染期间运行
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转成 js 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (e) {

      }
    }

    // 提交 mutation 修改 state 状态
    commit('setUser', user)
  }
}

export default {
  state,
  mutations,
  actions
}
