import { router } from "../router"

export const initAuth = ({ commit, dispatch }) => {
    let token = sessionStorage.getItem("token");

    let expirationTime = sessionStorage.getItem("expireTime");

    let dateNow = new Date().getTime();

    if (token) {
        if (dateNow >= expirationTime) {
            dispatch("logOff");

        } else {
            commit("setToken", token);
            let remainingTime= expirationTime-dateNow;
            dispatch("setTimeoutTimer", remainingTime)
            router.push("/Home").catch(() => { });

        }
    } else {
        router.push("/Login").catch(() => { });
        return false;

    }
}

