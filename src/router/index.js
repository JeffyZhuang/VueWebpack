import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
  ]
})
