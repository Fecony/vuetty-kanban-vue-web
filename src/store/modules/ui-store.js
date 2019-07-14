const state = {
  authElem: 'login'
};

const getters = {};

const mutations = {
  setAuthElem(state, action) {
    state.authElem = action;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
