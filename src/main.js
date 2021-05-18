import Vue from 'vue'
import Vuetify from 'vuetify';
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {router} from "./router";
import {store} from "./store/store";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import VueSimpleAlert from "vue-simple-alert";
import './assets/css/wegue.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;
const opts = {};

const createApp = function (appConfig) {
  Vue.prototype.$appConfig = appConfig;
  new Vue({
    vuetify: new Vuetify(opts),
    el: '#app',
    router,
    store,
    template: '<app/>',
    components: { App }
  });
};
const configFile = 'static/appConf.json';
fetch(configFile)
  .then(function (response) {
    return response.json().then(function (appConfig) {
      createApp(appConfig);
    })
  }).catch(function () {
    console.error('Cannot load config file: ' + configFile)
  });