import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/todo-list.vue')
    },
    {
      path: '/active',
      name: 'active',
      props: { filter: 'active' },
      component: () => import('../views/todo-list.vue')
    },
    {
      path: '/completed',
      name: 'completed',
      props: { filter: 'completed' },
      component: () => import('../views/todo-list.vue')
    }
  ]
})

export default router
