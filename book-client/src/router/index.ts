import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '@/views/BookListView.vue'
import LoginView from '@/views/LoginView.vue'
import UserView from '@/views/UserView.vue'
import AdminBooksView from '@/views/AdminBooksView.vue'
import AdminCreateBooksView from '@/views/AdminCreateBooksView.vue'

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
      path: '/admin/users',
      name: 'admin users',
      component: UserView,
    },
    {
      path: '/admin-books',
      name: 'admin-books',
      component: AdminBooksView,
    },
    {
      path: '/admin-add-book',
      name: 'admin-add-book',
      component: AdminCreateBooksView,
    }


  ]
})

export default router
