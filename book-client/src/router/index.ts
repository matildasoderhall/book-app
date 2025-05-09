import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '@/views/BookListView.vue'
import LoginView from '@/views/LoginView.vue'
import BookView from '@/views/BookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'books',
      component: BookListView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/books/:id',
      name: 'book',
      component: BookView,
    }

  ]
})

export default router
