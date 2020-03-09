import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // store.state.title
    title: '원래 제목',
    user: null,
    token: null,
    // 토큰정보를 해독한 정보
    claims: null,
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
    },

    setUserClaims(state, claims) {
      state.claims = claims
    }
  },

  actions: {
    getUserToken({ commit }, user) {
      commit('setUser', user)

      if (!user) return

      return user.getIdToken()
        .then(token => {
          commit('setUserToken', token)

          // function 체인
          return user.getIdTokenResult()
        }).then(r => {
          commit('setUserClaims', r.claims)
        })
    }
  },
  modules: {}
});
