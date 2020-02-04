import Vue from "vue"

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app"
import firebaseConfig from "../../firebaseConfig"

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore"


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase