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

    firebaseLoaded: false
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
    },

    setFirebaseLoaded(state) {
      state.firebaseLoaded = true
    }
  },

  actions: {
    async getUserToken({ dispatch, commit }, user) {
      commit('setUser', user)

      if (!user) return null

      await dispatch('getToken', user)
      commit('setFirebaseLoaded')

    },
    async getToken({ commit, state }) {
      // getIdToken(true) - 항상 새로운 토큰 갱신
      const token = await state.user.getIdToken(true)
      commit('setUserToken', token)
      const { claims } = await state.user.getIdTokenResult()
      commit('setUserClaims', claims)

    }
  },
  modules: {}
});
