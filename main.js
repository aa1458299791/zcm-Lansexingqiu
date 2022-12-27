import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from "uview-ui"; // 引入组件库
// import uView from '@/uni_modules/uview-ui'

import store from './store/index.js'  //导入
 import {
 	errorToast,
 	successToast
 } from '@/close/toast .js'
 
//把vuex定义为全局组件
Vue.prototype.$store = store
// 封装 失败的轻提示
Vue.prototype.$errorToast = errorToast
// 封装 成功提示
Vue.prototype.$successToast = successToast
// ui 库
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif