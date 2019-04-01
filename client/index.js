import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.less'

import createRouter from './config/router'

Vue.use(VueRouter)
const router = createRouter()

router.beforeEach((to, from, next) => {
  console.log('global beforeEach')
  next()
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
