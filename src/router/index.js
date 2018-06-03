import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import SearchPage from '@/pages/SearchPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: LoginPage
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchPage
    }
  ],
})
