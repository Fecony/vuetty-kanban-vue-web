import Vue from 'vue';
import Vuex from 'vuex';

import ui from './modules/ui-store';
import users from './modules/users';
import tickets from './modules/tickets';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    users,
    tickets
  }
});
