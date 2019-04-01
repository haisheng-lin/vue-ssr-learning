import Vuex from 'vuex'

export default function () {
  return new Vuex.Store({
    state: {
      count: 0,
    },
    mutations: {
      updateCount (state, newCount) {
        state.count = num
      },
    },
  })
}
