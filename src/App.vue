
<template>
  <div id="app">

    <!-- Navbar -->
    <Navbar v-if="showCustomerLayout" />

    <!-- Page -->
    <RouterView />

    <!-- Footer -->
    <Footer v-if="showCustomerLayout" />

    <!-- Chatbot -->
    <Chatbot v-if="showCustomerLayout" />

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Chatbot from './components/Chatbot.vue'

const route = useRoute()

const showCustomerLayout = computed(() => {
  const path = route.path

  // Login page: no Navbar, Footer, or Chatbot
  if (path === '/login') {
    return false
  }

  // All admin pages: no Navbar, Footer, or Chatbot
  if (path === '/admin' || path.startsWith('/admin/')) {
    return false
  }

  // Customer pages: show everything
  return true
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
