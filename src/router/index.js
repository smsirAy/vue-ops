import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import View from '../components/view/View'
import User from '../components/user/Users'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home,
    redirect: '/view',
    children: [
      { path: '/view', component: View },
      { path: '/users', component: User },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径
  // from代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 ；next('/login') 强制跳转
  if (to.path === '/login/') {
    return next()
  } else {
    const tokens = window.sessionStorage.getItem('token')
    if (!tokens) {
      return next('/login/')
    } else {
      next()
    }
  }
})

export default router
