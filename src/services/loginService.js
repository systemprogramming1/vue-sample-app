import { requestUtil } from "../util/requestUtil";
import Vue from 'vue'

const funcLogOff = () => requestUtil.postRequest(Vue.prototype.$appConfig.webApi_Url + "/api/User/LogOff",null);

const funcLogIn = (loginModel) =>  requestUtil.postRequest(Vue.prototype.$appConfig.webApi_Url + "/api/user/login",loginModel);

export const loginService = {funcLogIn, funcLogOff };

export default loginService;
