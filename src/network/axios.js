import originAxios from 'axios'

// import qs from 'qs'

import Vue from 'vue'
import Router from '../router/index'

export default function axios(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = originAxios.create({
      // baseURL: '',
      timeout: 5000
    })

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      config => {
        // console.log('来到了request拦截success中');
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

        // 3.对请求的参数进行序列化(看服务器是否需要序列化)
        // config.data = qs.stringify(config.data)

        // config.headers.Authorization = window.sessionStorage.getItem('token')
        // console.log(config)
        // 4.等等
        return config
      },
      err => {
        // console.log('来到了request拦截failure中');
        return err
      }
    )

    instance.interceptors.response.use(
      response => {
        console.log('来到了response拦截success中')
        // 操作反馈
        let message = response.data.meta.msg
        switch (response.data.meta.status) {
          case 200:
            Vue.prototype.$message.success(message)
            break
          case 201:
            Vue.prototype.$message.success(message)
            break
          case 204:
            Vue.prototype.$message.success(message)
            break
          case 400:
            Vue.prototype.$message.error(message)
            break
          case 401:
            Vue.prototype.$message.error(message)
            break
          case 403:
            Vue.prototype.$message.error(message)
            Router.push('/login')
            break
          case 404:
            Vue.prototype.$message.error(message)
            break
          case 500:
            Vue.prototype.$message.error(message)
            break
        }
        return response.data
      },
      err => {
        console.log('来到了response拦截failure中')
        console.log(err)
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权的访问'
              break
          }
        }
        return err
      }
    )

    // 2.传入对象进行网络请求
    instance(option)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
