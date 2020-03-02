import Vue from "vue";
import './plugins'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import error from "./error"


Vue.config.productionTip = false;

const global = 'abcd'

// 전역 선언
Vue.prototype.$global = global


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
