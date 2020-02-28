import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // store.state.title
    title: '원래 제목',
    user: null,
    token: null,
  },

  mutations: {
    setTitle(state, payload) {
      // payload : 넘겨 받는 값
      state.title = payload
    },

    setUser(state, user) {
      state.user = user
    },

    setUserToken(state, token) {
      state.token = token
    }
  },

  actions: {
    getUserToken({ commit }, user) {
      commit('setUser', user)

      if (!user) return

      user.getIdToken().then(token => {
        commit('setUserToken', token)
      })
    }
  },
  modules: {}
});
