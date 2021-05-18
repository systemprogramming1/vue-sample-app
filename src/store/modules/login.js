import { router } from "../../router";
import { loginService } from '../../services/loginService';

const state = {
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    token: "",
    userLayers: JSON.parse(sessionStorage.getItem("userLayers")),
    selectedLang: JSON.parse(sessionStorage.getItem("selectedLang")),
    userRegionId: JSON.parse(sessionStorage.getItem("userRegionId")),
}
const defaultState = state;

const getters = {
    getUserInfo(state) {
        return state.userInfo;
    },
    isAuth(state) {
        return state.token !== "";
    },
    getToken(state) {
        return state.token;
    },
    getUserLang(state) {
        return state.selectedLang;
    },

    getUserLayer(state) {
        return state.userLayers;
    },
    getUserRegionId(state) {
        return state.userRegionId;
    }

}

const mutations = {
    updateUserInfo(state, user) {
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        state.userInfo = user;
    },
    setToken(state, _token) {
        sessionStorage.setItem("token", _token);
        state.token = _token;
    },
    clearToken(state) {
        state.token = "";
    },
    MUTATE_SET_RESET_STATE(state) {
        Object.assign(state, defaultState)
    },
    updateUserLang(state, _lang) {
        sessionStorage.setItem("selectedLang", _lang);
        state.selectedLang = _lang;
    },
    updateUserLayer(state, _layer) {
        var layers = _layer.filter(
            (a) => a.languageCode == state.selectedLang);
        var layerItems = [];
        layers.forEach(function (layer) {
            if (layer.isOpen === false) {
                return;
            }
            layerItems.push({
                layerTitle: layer.groupName,
                layerName: layer.groupKey,
                children: layer.layers,
                workspaceName: layer.workspaceName,
            });
        });
        state.userLayers = layerItems;
        sessionStorage.setItem("userLayers", JSON.stringify(layerItems));

    } ,
     updateUserRegion(state, _region) {
        sessionStorage.setItem("userRegionId", JSON.stringify(_region));
        state.userRegionId = _region;
    },
}

const actions = {
    getUserInfoApi({ commit, dispatch }, payload) {
        commit('loading', true);
        loginService.funcLogIn(payload).
            then(response => {
                if (response.isException) {
                    commit("showNotification", "DST-273");
                    commit("clearToken");
                } else {
                    commit("updateUserInfo", response.sessionUser);
                    commit("setToken", response.sessionUser.sessionId);
                    commit("updateUserLayer", response.sessionUser.userLayers);
                    commit("updateUserRegion", response.sessionUser.authRegionIds);
                    sessionStorage.setItem("expireTime", new Date().getTime() + 3600000);
                    dispatch("setTimeoutTimer", 3600000)
                    router.replace("/Home");
                }
                commit('loading', false);
            }).
            catch(ex => {

            });
    },
    logOff({ commit }) {

        loginService.funcLogOff().
            then(response => {

            }).
            catch(ex => {
            });
        commit("clearToken");
        commit("MUTATE_SET_RESET_STATE");
        sessionStorage.clear();
        router.push("/Login").catch(() => { });

    },
    setTimeoutTimer({ dispatch }, expiresIn) {
        setTimeout(() => {
            dispatch("logOff");
        }, expiresIn);
    }
}

export default {
    state,
    mutations,
    getters,
    actions

}
