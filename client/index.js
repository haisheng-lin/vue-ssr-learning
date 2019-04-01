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
// store.registerModule('c', {
//   state: {
//     text: 3,
//   },
// })

// 监听 store 数据变化
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('newCount watch: ' + newCount)
// })

// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

// store.subscribeAction((action, state) => {
//   console.log(action.type)
//   console.log(action.payload)
// })

router.beforeEach((to, from, next) => {
  console.log('global beforeEach')
  next()
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
