<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!--            <a href="">Have an account?</a>-->
            <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
            <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template>
              <li v-for="(value, key) in errors">
                <span v-for="item in value">
                  {{ key }} {{ item }}
                </span>
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password"
                     required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
import { login, register } from '/api/user'

export default {
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  data () {
    return {
      user: {
        email: '',
        password: '',
        username: ''
      },
      errors: {}
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    // 提交表单登陆
    async onSubmit () {
      try {
        const { data } = this.isLogin ?
            await login({ user: this.user })
            : await register({ user: this.user })

        // 保存用户信息
        this.$store.commit('setUser', data.user)

        // 为了防止刷新数据丢失
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
  }
}
</script>

<style scoped>

</style>
