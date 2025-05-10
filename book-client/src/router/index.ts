import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '@/views/BookListView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminBooksView from '@/views/AdminBooksView.vue'

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
      path: '/admin-books',
      name: 'admin-books',
      component: AdminBooksView,
    }


  ]
})

export default router
