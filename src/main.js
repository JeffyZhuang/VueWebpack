// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import '@/styles/index.scss'

Vue.config.debug = true
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
axios.defaults.withCredentials = true


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    console.log('需登录');
  } else {
    next()
  }
  if (sessionStorage.getItem('Authorization') != null) {
    next()
  } else {
    //session为空，重定向到登录界面
    next('/')
  }
})
