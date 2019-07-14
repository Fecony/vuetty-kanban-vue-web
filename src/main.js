import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import axios from 'axios';
import VeeValidate from 'vee-validate'

axios.defaults.baseURL = "http://localhost:3001"

Vue.use(router)
Vue.use(VeeValidate)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount('#app');

import './../node_modules/bulma/css/bulma.css';
