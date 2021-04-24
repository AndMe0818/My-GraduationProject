import Vue from 'vue'
import VueRouter from 'vue-router'
// home框架 路由
import Home from '../views/home/Home.vue'
// 登录
import Login from '../views/login/Login.vue'
// 导航栏路由
import Ground from '../views/ground/Ground.vue'
import Users from '../views/users/Users.vue'
import Notice from '../views/notice/Notice.vue'
import Date from '../views/date/Date.vue'
import Shop from '../views/shop/Shop.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/ground',
        component: Ground
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/notice',
        component: Notice
      },
      {
        path: '/date',
        component: Date
      },
      {
        path: '/shop',
        component: Shop
      },
      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
