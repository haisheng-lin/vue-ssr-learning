<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    >
    <Item :todo="todo"></Item>
    <Tabs :filter="filter"></Tabs>
  </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';
export default {
  components: {
    Item,
    Tabs,
  },
  data () {
    return {
      todo: {
        id: 0,
        content: 'this is todo',
        completed: false,
      },
      filter: 'all',
    };
  },
  methods: {
    addTodo () {

    },
  },
}
</script>

<style lang="less" scoped>
  .real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
  }
  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    border: 1px solid #999;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }
</style>
