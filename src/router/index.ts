import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FoodView from '@/views/FoodView.vue'
import CreateFood from '@/views/foods/CreateFood.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/food',
      name: 'food',
      component: FoodView
    },
    {
      path: '/food/create',
      name: 'create-food',
      component: CreateFood
    },
    {
      path: '/food/edit/:id',
      name: 'create-food',
      component: CreateFood
    }
  ]
})

export default router
