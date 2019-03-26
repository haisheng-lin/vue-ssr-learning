import Vue from 'vue'

// 具名插槽: 子组件定义 <slot name="xxx">，父组件传入时 <p slot="xxx"></p>
// slot 里面的双向绑定数据，是来自父组件，而不是子组件
// 那如果希望 slot 的数据来自子组件，怎么办呢？
// 子组件在 slot 中加上 key="value", 父组件的模板加上 slot-scope="props" {{ props.key }} 就可以了
// 其中 key, value, props 这些名字都可以自定义

// 一般 this.$parent 可以拿到父组件的实例，但是该如何拿到爷爷辈甚至更往上的组件呢？
// 答案是通过 provide, inject，在父级提供 provide 方法，在子级声明 inject，就可以拿到了
// provide 不会提供 reactive
// 父组件的数据改变了，通过 provide 传给子组件，子组件模板引用了这个数据，但是却不会根据这个数据被改变
// 但是我们可以手动给它加 reactive, defineProperty get 属性每次都会拿最新的数据，只是这样的做法官方并不推荐
// Object.defineProperty(data, 'value', {
//   get: () => this.value,
//   enumerable: true,
// })

const childComponent = {
  template: `<div>Child Component</div>`,
  inject: ['grandParent'],
  mounted () {
    console.log(this.grandParent)
  },
}

const component = {
  name: 'comp',
  components: {
    ChildComponent: childComponent,
  },
  data () {
    return {
      value: 'child value',
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa',
      }
    }
  },
  template: `
  <div :style="style">
    <slot value="456"></slot>
    <ChildComponent />
  </div>
  `,
}

new Vue({
  el: '#root',
  components: {
    CompOne: component,
  },
  provide () {
    return {
      grandParent: this
    }
  },
  data () {
    return {
      value: 'parent value',
    }
  },
  mounted () {
    // console.log(this.$refs.comp) // 非原生组件得到的是 VueComponent，是对象
    // console.log(this.$refs.span) // 原生组件得到的是 dom 节点
  },
  methods: {
    handleInput (val) {
      this.value = val
    },
  },
  template: `
  <div>
    <CompOne ref="comp">
      <span ref="span" slot-scope="props">{{ props.value }} {{ value }}</span>
    </CompOne>
  </div>
  `,
})
