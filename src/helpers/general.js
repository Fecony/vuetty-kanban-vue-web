import axios from 'axios'

export function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentUser = store.state.auth.currentUser

    if (requiresAuth && !currentUser) {
      next('/login')
    } else if (to.path == '/login' && currentUser) {
      next('/')
    } else {
      next()
    }
  })

  axios.interceptors.response.use(null, error => {
    if (error.response.status == 401) {
      store.commit('auth/logout')
      router.push('/login')
    }

    return Promise.reject(error)
  })

  if (store.getters['auth/currentUser']) {
    setAuthorization(store.getters['auth/currentUser'].token)
  }
}

export function setAuthorization(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
