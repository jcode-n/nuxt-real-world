/**
 * Nuxt.js 配置文件
 */

export default {
  router: {
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      // 清楚 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          // 当某个路由有子集路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性
          // name: 'layout',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            }, {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            }, {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            }, {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            }, {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            }, {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            }, {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}
