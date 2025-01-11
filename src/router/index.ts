import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cute',
      name: 'cute',
      component: () => import('../views/Cute.vue'),
    },
    {
      path: '/lovely',
      name: 'lovely',
      component: () => import('../views/Lovely.vue'),
    },
    {
      path: '/sweet',
      name: 'sweet',
      component: () => import('../views/SweetGirl.vue'),
    },
    {
      path: '/tough',
      name: 'tough',
      component: () => import('../views/ToughGuy.vue'),
    },
  ],
})

export default router
