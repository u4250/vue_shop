import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://121.4.224.118:3000'
// 请求拦截器 添加token
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
