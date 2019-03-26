import Vue from 'vue'

// v-once 只会进行一次数据绑定，一旦绑定了即使数据再变，它也不会重新渲染
// 它的使用场景是用在静态 dom 上，能减去 vue 检测变化所带来的开销

const app = new Vue({
  el: '#root',
  data: {
    text: 'text',
  },
  template: `
    <div>
      This is {{ text }}
    </div>
  `,
})
