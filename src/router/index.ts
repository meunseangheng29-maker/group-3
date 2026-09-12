import {
  createRouter,
  createWebHistory
} from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import DrinkPage from '../pages/DrinkPage.vue'
import OffersPage from '../pages/OffersPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import CartPage from '../pages/CartPage.vue'
import CheckoutPage from '../pages/CheckoutPage.vue' // 1. Import CheckoutPage

const router = createRouter({

  history: createWebHistory(),

  routes: [

    {
      path: '/',
      name: 'home',
      component: HomePage
    },

    {
      path: '/drinks',
      name: 'drinks',
      component: DrinkPage
    },

    {
      path: '/offers',
      name: 'offers',
      component: OffersPage
    },

    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },

    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },

    // 2. បន្ថែម Route សម្រាប់ Checkout
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage
    }

  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }

})

export default router