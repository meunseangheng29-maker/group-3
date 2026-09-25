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

import AdminLoginPage from '../pages/AdminLoginPage.vue'
import AdminOrderPage from '../pages/AdminOrderPage.vue'
import AdminDrinksPage from '../pages/AdminDrinksPage.vue'
import AdminCustomersPage from '../pages/AdminCustomersPage.vue'
import AdminAnalyticsPage from '../pages/AdminAnalyticsPage.vue'
import AdminSettingsPage from '../pages/AdminSettingsPage.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'

import { useAuth } from '../stores/auth'


const router = createRouter({

  history: createWebHistory(),

  routes: [

      {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard
      },

    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
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
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,

      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/admin',
      name: 'admin-login',
      component: AdminLoginPage
    },

    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminOrderPage,

      meta: {
        requiresAdmin: true
      }
    },

    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrderPage,

      meta: {
        requiresAdmin: true
      }
    },

    {
      path: '/admin/drinks',
      name: 'admin-drinks',
      component: AdminDrinksPage,

      meta: {
        requiresAdmin: true
      }
    },

    {
      path: '/admin/customers',
      name: 'admin-customers',
      component: AdminCustomersPage,

      meta: {
        requiresAdmin: true
      }
    },

    {
      path: '/admin/analytics',
      name: 'admin-analytics',
      component: AdminAnalyticsPage,

      meta: {
        requiresAdmin: true
      }
    },

    {
      path: '/admin/settings',
      name: 'admin-settings',
      component: AdminSettingsPage,

      meta: {
        requiresAdmin: true
      }
    }

  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }

})


router.beforeEach((to) => {

  const auth = useAuth()


  if (to.meta.requiresAuth && !auth.isLoggedIn) {

    return {
      name: 'login',

      query: {
        redirect: to.fullPath
      }
    }

  }


  if (to.meta.requiresAdmin) {

    const adminLoggedIn =
      localStorage.getItem('adminLoggedIn') === 'true'


    if (!adminLoggedIn) {

      return {
        name: 'admin-login'
      }

    }

  }


  return true

})


export default router