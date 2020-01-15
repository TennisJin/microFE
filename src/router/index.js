import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vue*', // 子项目history模式下需要/vue*，子项目路由同时要设置base为副项目路径，否则匹配不到子项目的路由 如果子项目哈希模式 /vue即可
    name: 'vue',
    component: () => import(/* webpackChunkName: "about" */ '../components/subVue')
  },
  {
    path: '/demo', // 子项目history模式下需要/vue*，子项目路由同时要设置base为副项目路径，否则匹配不到子项目的路由 如果子项目哈希模式 /vue即可
    name: 'demo',
    component: () => import(/* webpackChunkName: "about" */ '../components/demo')
  },
  {
    path: '/react',
    name: 'react',
    component: () => import(/* webpackChunkName: "about" */ '../components/subReact')
  }
  // {
  //   path: '/angular',
  //   name: 'angular',
  //   component: () => import(/* webpackChunkName: "about" */ '../components/Angular')
  // },
  // {
  //   path: '/basicComponents',
  //   name: 'basicComponents',
  //   component: () => import(/* webpackChunkName: "about" */ '../components/basicComponents')
  // }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
