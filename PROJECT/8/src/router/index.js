import Vue from 'vue'
import VueRouter from 'vue-router'

import Shop from '../views/shop.vue'
import Auth from '../views/auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Auth
  },
  {
    path: '/:id',
    name: 'Shop',
    component: Shop
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
