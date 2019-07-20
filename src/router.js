import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Auth/Signup.vue'
import PageNotFound from './views/PageNotFound'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Signup
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: PageNotFound,
      meta: {
        requiresAuth: true
      }
    },
    { path: '*', redirect: '/404' }
  ]
})
