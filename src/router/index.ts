
import {
  createRouter,
  createWebHistory
} from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import DrinkPage from '../pages/DrinkPage.vue'
import OffersPage from '../pages/OffersPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import CartPage from '../pages/CartPage.vue'
import CheckoutPage from '../pages/CheckoutPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import ForgotPasswordPage from '../pages/ForgotPasswordPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import SearchPage from '../pages/SearchPage.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // Home
    {
      path: '/',
      name: 'home',
      component: HomePage
    },

    // About
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },

    // Drinks
    {
      path: '/drinks',
      name: 'drinks',
      component: DrinkPage
    },

    // Offers
    {
      path: '/offers',
      name: 'offers',
      component: OffersPage
    },

    // Contact
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },

    // Cart
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },

    // Login
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },

    // Foget Password
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordPage
    },

    // Register 
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },

    // Search
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },

    // Checkout
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

