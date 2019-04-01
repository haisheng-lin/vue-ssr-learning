import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default function () {
  const store = new Vuex.Store({
    // 如果启动了 strict，那么不能在 vuex 外部直接更改 state
    // 只在开发环境使用
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    // 当规模成长到一定程度的时候，把所有数据放在一个模块里将会增加维护难度
    // modules: {
    //   a: { // a 模块
    //     // 在 vuex 中如果存在两个相同名字的 mutation，将会产生冲突
    //     // 加入 namespaced 可以解决命名冲突的问腿
    //     // 但是调用 mutations 的时候需要加上 a/updateTextA，见 app.vue 例子
    //     namespaced: true,
    //     state: {
    //       text: 1,
    //     },
    //     mutations: {
    //       updateTextA (state, text) {
    //         state.text = text // 这个 state 只是 a 模块下的 state
    //       },
    //     },
    //     getters: {
    //       /**
    //        * @param {*} state
    //        * @param {*} getters
    //        * @param {*} rootState 全局 state 对象
    //        */
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.b.text
    //       },
    //     },
    //     actions: {
    //       // root: true，是声明 mutations 是全局的
    //       // 所以这里的 updateCount 是指全局 mutations 的函数
    //       // 当然了如果想要调用 a 模块的 mutation，只需要 a/updateTextA
    //       add ({ state, commit, rootState }) {
    //         commit('updateCount', rootState.count, { root: true })
    //       },
    //     },
    //   },
    //   b: { // b 模块
    //     state: {
    //       text: 2,
    //     },
    //   },
    // },
  })

  // 热更替
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters',
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions,
      })
    })
  }

  return store
}
