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
import Check from '../views/check/Check.vue'
import Welcome from '../views/home/Welcome.vue'

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
    redirect:'/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/ground', component: Ground },
      { path: '/users', component: Users },
      { path: '/notice', component: Notice },
      { path: '/check', component: Check }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  //  to 表示去访问的路径
  // from 表示 从哪来
  // next 是个函数，表示放行   next() 放行  next('/xxx')强制跳转
  if (to.path === '/login') return next()
  // 如果不是 login
  const user = window.sessionStorage.getItem('user')
  console.log(user)
  if (user) return next()
  next('/login')
})

export default router
