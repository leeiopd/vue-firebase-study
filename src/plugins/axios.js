import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import firebaseConfig from "../../firebaseConfig"
import moment from "moment"

const firebaseAPI = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/` : `http://localhost:5000/${firebaseConfig.projectId}/us-central1/`,
    timeout: 5000,
    headers: { 'X-Custome-Header': 'foobar' }
})


firebaseAPI.interceptors.request.use(async (config) => {
    // 세션 발급 시간
    console.log(new Date(store.state.claims.iat * 1000))

    // 세션 종료 시간
    console.log(new Date(store.state.claims.exp * 1000))

    // 시간 비교
    console.log(moment(store.state.claims.exp * 1000).diff(moment(), 'minutes'))

    const dif = moment(store.state.claims.exp * 1000).diff(moment(), 'minutes')

    if (dif < 10) await store.dispatch('getToken')

    config.headers.authorization = store.state.token
    return config
}, function (error) {
    return Promise.reject(error)
})


Vue.prototype.$axios = firebaseAPI