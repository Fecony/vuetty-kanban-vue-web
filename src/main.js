import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import { initialize } from './helpers/general'

axios.defaults.baseURL = process.env.VUE_APP_SERVER || 'http://localhost:3000'

require('./assets/main.scss')

Vue.use(router)
Vue.use(VeeValidate)

initialize(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
