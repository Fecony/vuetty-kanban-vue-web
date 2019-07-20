import { getLocalUser } from '../../helpers/auth'

const user = getLocalUser()

const state = {
  currentUser: user,
  isLoading: false,
  isLoggedIn: !!user,
  auth_error: null
}

const getters = {
  currentUser(state) {
    return state.currentUser
  },
  authError(state) {
    return state.auth_error
  }
}

const mutations = {
  on_sign(state) {
    state.isLoading = true
    state.auth_error = null
  },
  authUser(state, payload) {
    state.token = payload.token
  },
  on_login_success(state, { user, token }) {
    state.currentUser = Object.assign({}, user, { token })
    localStorage.setItem('user', JSON.stringify(state.currentUser))
  },
  on_failed(state, payload) {
    state.isLoading = false
    state.auth_error = payload
    setTimeout(() => {
      state.auth_error = null
    }, 2000)
  },
  logout(state) {
    localStorage.removeItem('user')
    state.isLoggedIn = false
    state.currentUser = null
  }
}

const actions = {
  on_sign({ commit }) {
    commit('on_sign')
  },
  on_success({ commit, state }, payload) {
    state.auth_error = null
    state.isLoggedIn = false
    state.isLoading = false
    commit('on_login_success', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
