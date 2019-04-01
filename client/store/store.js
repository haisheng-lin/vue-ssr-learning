import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default function () {
  return new Vuex.Store({
    // 如果启动了 strict，那么不能在 vuex 外部直接更改 state
    // 只在开发环境使用
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
  })
}
