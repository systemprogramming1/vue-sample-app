import Vue from 'vue'
import { store } from "../store";
const state = {
    notification: []
}

const getters = {
    getNotificationInfo(state) {
        return state.notification;
    }
}

const mutations = {
    updateNotification(state, _notification) {
        state.notification = _notification;
    },
    showNotification(state, _notificationCode) {
        let getInfoNot = state.notification.data.find(o => o.notificationCode === _notificationCode);
        Vue.fire({
            title: getInfoNot.title,
            text: getInfoNot.contains,
            type: getInfoNot.notificationTypeName.toLowerCase(),
            showCloseButton: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Tamam',
        }).then(r => {
        });

    }

}

const actions = {
    showNotification({ commit, dispatch }) {
        Vue.axios
            .get(
                Vue.prototype.$appConfig.webApi_Url + "/api/Language/GetAppMessageLanguage/" + store.getters.getUserLang,
            )
            .then((response) => {
                commit("updateNotification", response)
            });
    }

}

export default {
    state,
    mutations,
    getters,
    actions

}