import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  data: {
    text: 'text'
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  mounted () {
    console.log(this, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    throw new TypeError('render error')
    return h('div', {}, this.text)
  },
  template: '<div>This is {{ text }}</div>',
  renderError (h, err) {
    // 仅在开发环境被调用
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 可以沿着组件树往上冒泡，可在正式环境使用
    console.log('errorCaptured')
  },
})

app.$mount('#root')
