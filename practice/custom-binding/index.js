import Vue from 'vue'

// 由于在实现组件 v-model 的双向绑定时，需要给子组件传入名字为 value 的 prop
// 但是很有可能这个名字会跟其它需要的 prop 冲突，那么就需要重命名了
// 在子组件中加个选项 model (意思就是 v-model), prop 这个选项允许你自定义原来 value 的名字
// event 选项允许你自定义绑定时所触发的是哪种事件
// 例如子组件 emit 的是 change，那么这里 event 需要填写的就是 change

// 当然了，如果你不用 v-model，那么你可以让子组件接受个 prop 叫 'dummy'
// 父组件传入时是 :dummy="xxx" 就行了

const component = {
  model: {
    prop: 'value1',
    event: 'change',
  },
  props: ['value1'],
  template: `
  <div>
    <input type="text" @input="handleInput" :value="value1">
    <span>{{ value1 }}</span>
  </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    },
  },
}

new Vue({
  el: '#root',
  components: {
    CompOne: component,
  },
  data () {
    return {
      value: '123',
    }
  },
  methods: {
    handleInput (val) {
      this.value = val
    },
  },
  template: `
  <div>
    <CompOne v-model="value"></CompOne>
  </div>
  `,
})
