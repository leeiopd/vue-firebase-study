import Vue from "vue"

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app"
import firebaseConfig from "../../firebaseConfig"

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore"

import store from "../store"

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase

firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    // store.commit('setUser', user)
    store.dispatch('getUserToken', user)
});