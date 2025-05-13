import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '@/views/BookListView.vue'
import LoginView from '@/views/LoginView.vue'
import BookView from '@/views/BookView.vue'
import UserView from '@/views/UserView.vue'
import AdminBooksView from '@/views/AdminBooksView.vue'
import AdminCreateBooksView from '@/views/AdminCreateBooksView.vue'
import { useUserStore } from '@/stores/user'


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
      meta: {requiresAdmin: true}
    },
    {
      path: '/admin-books',
      name: 'admin-books',
      component: AdminBooksView,
      meta: {requiresAdmin: true}
    },
    {
      path: '/admin-add-book',
      name: 'admin-add-book',
      component: AdminCreateBooksView,
      meta: {requiresAdmin: true}
    }


  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.isLoaded) {
    await userStore.fetchUser();
  }

  if (to.meta.requiresAdmin && !userStore.is_admin) {
    alert("Admin access only");
    next('/login')
  }

  next();
});

export default router;
