const state = {
  isLoading: false,
  users: []
}

const getters = {
  isLoading(state) {
    return state.isLoading
  },
  users(state) {
    return state.users
  }
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
