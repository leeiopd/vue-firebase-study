import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
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
    path: "*",
    component: () => import("../views/e404.vue")
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
