import Vue from 'vue'

const app = new Vue({
  el: '#root',
  data: {
    isActive: false,
  },
  template: `
    <div>
      This is {{ isActive }}
    </div>
  `,
})
