import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
  state: {
      user:{},
  },
  mutations: {
      setUser(state,userInfo){
        state.user=userInfo
      },
  },
  // 对任务进行分发
  actions: {}
})
export default store
