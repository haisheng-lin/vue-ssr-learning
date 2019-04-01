// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  { // 默认根路径跳转至 app
    path: '/',
    redirect: '/app',
  },
  {
    path: '/app',
    component: () => import('../views/todo/todo.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
  },
]
