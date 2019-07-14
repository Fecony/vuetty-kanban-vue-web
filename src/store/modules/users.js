import axios from 'axios'
import router from '../../router'

const state = {
  token: null
};

const getters = {};

const mutations = {
  authUser (state, userData) {
    state.token = userData.token
  }
};

const actions = {
  register ({commit}, authData) {
    axios.post("/auth/register", {
      email: authData.email,
      password: authData.password,    
    })
    .then((response) => {
      commit('authUser', {
        token: response.data.token
      })    
    })
    .catch((error) => console.log(error))
  },
  login ({commit}, authData) {
    axios.post("/auth/login", {
      email: authData.email,
      password: authData.password
    })
    .then((response) => {
      commit('authUser', {
        token: response.data.token
      })
      if (state.token) {
        router.push('/dashboard')
      }   
    })    
    .catch((error) => console.log(error))
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
