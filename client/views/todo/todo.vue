<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    >
    <Item
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      @delete="deleteTodo"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAll="clearAllCompleted"
    />
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
      id: 0,
      todos: [],
      filter: 'all',
    };
  },
  beforeRouteEnter (to, from, next) {
    console.log('todo beforeRouteEnter')
    next()
  },
  // 这个钩子只有在路由使用了参数的时候，而这参数被更新了，才会调用
  // 例如：/list/:id，点击不同元素进入详情页，那么每次点击详情页的时候会调用这钩子
  // 用处：根据这个参数获取数据展示页面，可以通过这钩子做
  // 而且如果接口出错了，还可以不用 next，进入到这个详情页
  beforeRouteUpdate (to, from, next) {
    console.log('todo beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo beforeRouteLeave')
    next()
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos;
      }
      const completed = this.filter === 'completed';
      return this.todos.filter(todo => todo.completed === completed);
    },
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: this.id++,
        content: e.target.value.trim(),
        completed: false,
      });
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter (state) {
      this.filter = state;
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed);
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
