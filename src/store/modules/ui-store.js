const state = {
  authElem: 'login'
}

const getters = {}

const mutations = {
  setAuthElem(state, payload) {
    state.authElem = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
