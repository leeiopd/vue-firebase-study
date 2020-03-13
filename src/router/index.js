import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store"

Vue.use(VueRouter);

const levelCheck = (to, from, next) => {
  if (store.state.claims.level === undefined) next('/userProfile')
  next()
}
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: levelCheck
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/about2",
    component: () => import("../views/About2.vue")
  },
  {
    path: "/test",
    component: () => import("../views/test.vue")
  },
  {
    path: "/lectures/card",
    component: () => import("../views/lectures/card.vue")
  },
  {
    path: "/lectures/layout",
    component: () => import("../views/lectures/layout.vue")
  },
  {
    path: "/lectures/notes",
    component: () => import("../views/lectures/notes.vue")
  },
  {
    path: "/lectures/axios",
    component: () =>
      import("../views/lectures/axios.vue")
  },
  {
    path: "/lectures/mother",
    component: () =>
      import("../views/lectures/mother.vue")
  },
  {
    path: "/lectures/vuex",
    component: () =>
      import("../views/lectures/vuex.vue")
  },
  {
    path: "/sign",
    name: "sign",
    component: () =>
      import("../views/sign.vue")
  },
  {
    path: "/userProfile",
    component: () =>
      import("../views/userProfile.vue")
  },
  {
    path: "*",
    component: () => import("../views/e404.vue")
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


// Vue router 가드를 이용하여 모든 페이지 랜더링 이전에
// 로그인을 확인하게됨


// vue router 가드 순서 : bf each -> af enter -> af each
// 속도가 느릴 수 있음

router.beforeEach((to, from, next) => {
  Vue.prototype.$Progress.start();
  if (store.state.firebaseLoaded) next()

})

router.afterEach((to, from, next) => {
  Vue.prototype.$Progress.finish();
})


export default router;
