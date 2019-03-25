import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  data: {
    text: 'text'
  },
  template: '<div>This is {{ text }}</div>',
})

app.$mount('#root')
