import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // store.state.title
    title: '원래 제목'
  },
  mutations: {

    setTitle(state, payload) {
      // payload : 넘겨 받는 값
      state.title = payload

    }
  },
  actions: {},
  modules: {}
});
