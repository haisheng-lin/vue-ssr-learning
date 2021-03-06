import createApp from './create-app'

// 这里的 context 等于 server-render 里的 context
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url) // 给路由推一条记录，才能进入路由调用组件
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
