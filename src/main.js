import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import './assets/css/global.css'
import './assets/font2/iconfont.css'
// import axios from 'axios'
import vueaxios from './network/axios'
import '../mock/index'

// 引入 vuex
import store from './store'

Vue.prototype.$http = vueaxios
// axios.defaults.withCredentials = true
import { message } from './utils/resetMessage'
Vue.prototype.$message = message; 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
