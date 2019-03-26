import Vue from 'vue'

/**
 * 使用 computed 的好处: computed 的值会被缓存
 * 下面的例子中：computed fullName 和 methods getFullName 展示出来的效果是一样的
 * 但是由于我们输入的 number 与模板绑定了，导致模板被重新渲染
 * 那么 getFullName 这个方法会被重新执行
 * 但是 computed 它的依赖值 lastName, firstName 没变化，所以无需重新计算
 * 就用回上一次缓存的值就 OK 了，这就是 computed 的好处
 *
 * watch 监听对象，如果对象属性有变化，希望能触发 watch 函数的话，有两种选择：
 * 1. 使用 deep: true, 但是这样所有属性的变化都会触发，性能开销可能很大
 * 2. 单独监听某个属性，例如：watch: { 'obj.a': { handler () { ... } } }
 */

const app = new Vue({
  // el: '#root',
  data: {
    firstName: 'haisheng',
    lastName: 'lin',
    number: 0,
  },
  computed: {
    fullName () {
      console.log('computed fullName');
      return `${this.firstName} ${this.lastName}`
    },
  },
  methods: {
    getFullName () {
      console.log('getFullName invoked')
      return `${this.firstName} ${this.lastName}`
    },
  },
  template: `
    <div>
      <p>{{ fullName }}</p>
      <p>{{ getFullName() }}</p>
      <p>Number: {{ number }}</p>
      <p><input type="text" v-model="number"></p>
    </div>
  `,
})

app.$mount('#root')
