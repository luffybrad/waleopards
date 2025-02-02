import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import SignUpView from '@/views/SignUpView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AdminView from '@/views/Admin/AdminHome.vue'
import CategoryView from '@/views/CategoryView.vue'
import SalesView from '@/views/SalesView.vue'
import SearchView from '@/views/SearchView.vue'
import ProductView from '@/views/ProductView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoryView
    },
    {
    path: '/sales',
    name: 'sales',
    component: SalesView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
  ],
})

export default router
