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
      component: () => import('../views/CuteView.vue'),
    },
    {
      path: '/lovely',
      name: 'lovely',
      component: () => import('../views/LovelyView.vue'),
    },
    {
      path: '/sweet',
      name: 'sweet',
      component: () => import('../views/SweetGirlView.vue'),
    },
    {
      path: '/tough',
      name: 'tough',
      component: () => import('../views/ToughGuyView.vue'),
    },
  ],
})

export default router
