import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '@/views/BookListView.vue'
import LoginView from '@/views/LoginView.vue'
import BookView from '@/views/BookView.vue'
import UserView from '@/views/UserView.vue'
import AdminBooksView from '@/views/AdminBooksView.vue'
import AdminCreateBooksView from '@/views/AdminCreateBooksView.vue'
import RegisterView from '@/views/RegisterView.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    }
  ]
})

export default router
