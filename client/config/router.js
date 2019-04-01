import Router from 'vue-router'
import routes from './routes'

// 为什么不直接 export router，因为之后涉及到服务端渲染的问题，这样会导致内存溢出
// 每一次服务端渲染都会重新生成一个新的 app，但是这里用的却是同一个 router 对象，所以类似于闭包产生的内存泄露

export default () => {
  return new Router({
    routes,
  })
}
