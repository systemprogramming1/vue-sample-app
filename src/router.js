import Login from "./components/Login/Login";
import Home from "./components/AppTemplate"
import Vue from 'vue'
import VueRouter from 'vue-router';
import { store } from "./store/store";

export const routes = [
    {
        path: '',
        component: Login,
        

    },
    {
        path: '/Login',
        component: Login,

    },
    {
        path: '/Home', component: Home,
        beforeEnter: store.getters.isAuth
    },
    { path: '*', redirect: "/" }
]

Vue.use(VueRouter);

export const router = new VueRouter({
    base: '/DstVueSample/',
    mode: "history",//# çıkmasın
    routes
})
