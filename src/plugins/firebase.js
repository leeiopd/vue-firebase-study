import Vue from "vue"

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app"
import firebaseConfig from "../../firebaseConfig"

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore"

import store from "../store"
import router from "../router"

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase
Vue.prototype.$isFirebaseAuth = false

firebase.auth().onAuthStateChanged((user) => {
    Vue.prototype.$isFirebaseAuth = true
    console.log(user)

    if (user) {
        router.push('/')
    } else {
        router.push('/sign')
    }
    // store.commit('setUser', user)
    store.dispatch('getUserToken', user)
});