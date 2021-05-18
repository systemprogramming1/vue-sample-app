import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from "./mutations";
import * as getters  from "./getters";
import * as actions from "./actions";
import login from "./modules/login";
import layer from "./modules/layer";
import notification from "./modules/notifications";
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLoading:false
  },
  mutations,
  getters,
  actions,
  modules: {
     login,
     notification,
     layer
  },
})
