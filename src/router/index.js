import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    }
  ],
})
