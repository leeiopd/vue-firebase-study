import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store"

Vue.use(VueRouter);

// 구형 level Check
// const levelCheck = (to, from, next) => {
//   // 로그인이 되어있지 않으면
//   if (!store.state.user) return next('/sign')

//   // 유저 정보가 없다면
//   if (!store.state.claims) return next('/userProfile')

//   next()
// }

const adminCheck = (to, from, next) => {
  // 로그인이 되어있지 않으면
  if (!store.state.user) {
    // sign 페이지에서 sign 페이지로 넘어가는 무한루프 방지
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) return next('/userProfile')
    if (store.state.claims.level > 0) throw Error('관리자 권한이 필요합니다.')


  }
  next()
}

const userCheck = (to, from, next) => {
  // 로그인이 되어있지 않으면
  if (!store.state.user) {
    // sign 페이지에서 sign 페이지로 넘어가는 무한루프 방지
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) return next('/userProfile')
    if (store.state.claims.level > 1) throw Error('사용자 권한이 필요합니다.')
  }
  next()
}
const gestCheck = (to, from, next) => {
  // 로그인이 되어있지 않으면
  if (!store.state.user) {
    // sign 페이지에서 sign 페이지로 넘어가는 무한루프 방지
    if (to.path !== '/sign') return next('/sign')
  } else {
    if (!store.state.user.emailVerified) return next('/userProfile')
    if (store.state.claims.level > 2) throw Error('손님이 아닙니다.')
  }
  next()
}

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: gestCheck
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
    path: "/test/lv0",
    component: () => import("../views/test/lv0.vue"),
    beforeEnter: adminCheck
  },
  {
    path: "/test/lv1",
    component: () => import("../views/test/lv1.vue"),
    beforeEnter: userCheck
  },
  {
    path: "/test/lv2",
    component: () => import("../views/test/lv2.vue"),
    beforeEnter: gestCheck
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
      import("../views/sign.vue"),
    // 로그인 확인
    beforeEnter: (to, from, next) => {
      if (store.state.user) return next('/')
      next()
    }
  },

  {
    path: "/admin/users",
    component: () => import("../views/admin/users.vue"),
    beforeEnter: adminCheck
  },
  {
    path: "/userProfile",
    component: () =>
      import("../views/userProfile.vue"),
    // 로그인 확인
    beforeEnter: (to, from, next) => {
      if (!store.state.user) return next('/sign')
      next()
    }
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


const waitFirebase = () => {
  return new Promise((resolve, reject) => {
    let cnt = 0
    // 10ms 마다 동작
    const timer = setInterval(() => {
      // firebase load 완료 체크
      if (store.state.firebaseLoaded) {
        clearInterval(timer)
        resolve()
      } else if (cnt++ > 200) {
        clearInterval(timer)
        // promise catch
        reject('firebase load error.')
      }
    }, 10)
  })
}


// vue router 가드 순서 : bf each -> af enter -> af each
// 속도가 느릴 수 있음

router.beforeEach((to, from, next) => {
  Vue.prototype.$Progress.start();
  // if (store.state.firebaseLoaded) next()

  waitFirebase().then(() => next()).catch(e => Vue.prototype.$toasted.global.error(e.message))

})

router.afterEach((to, from, next) => {
  Vue.prototype.$Progress.finish();
})

// 라우터에서 발생한 에러 처리
router.onError(e => {
  Vue.prototype.$Progress.finish();
  Vue.prototype.$toasted.global.error(e.message)
})

export default router;
