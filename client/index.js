import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.less'

import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 可以动态注册模块
store.registerModule('c', {
  state: {
    text: 3,
  },
})

router.beforeEach((to, from, next) => {
  console.log('global beforeEach')
  next()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
