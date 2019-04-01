// actions 可以处理异步修改数据，mutations 只能是处理同步的
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
}
