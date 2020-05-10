import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3030'
// axios 请求拦截器
axios.interceptors.request.use( config => {
  // 为请求头对象添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定格式，必须返回config
  return config
})
//将axios绑定到$http，后续代码可以直接使用this.$http.get请求接口
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
