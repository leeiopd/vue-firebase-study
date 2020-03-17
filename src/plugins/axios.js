import Vue from 'vue'
import axios from 'axios'
import store from '../store'

const firebaseAPI = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://vue-firebase-toy.firebaseapp.com/" : "http://localhost:5000/vue-firebase-toy/us-central1/",
    timeout: 5000,
    headers: { 'X-Custome-Header': 'foobar' }
})

firebaseAPI.interceptors.request.use(function (config) {
    config.headers.authorization = store.state.token
    return config
}, function (error) {
    return Promise.reject(error)
})


Vue.prototype.$axios = firebaseAPI