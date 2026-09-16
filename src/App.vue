<script setup lang="ts">
import Chatbot from './components/Chatbot.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';


</script>

<template>
      <Navbar/>
      <main>
        <RouterView/>
        <Chatbot/>
      </main>
      <Footer/>
</template>
