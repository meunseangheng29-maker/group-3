<script setup lang="ts">
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  House,
  CupSoda,
  Tag,
  Mail
} from 'lucide-vue-next'

import { useCart } from '../stores/cart'

const { cartCount } = useCart()

// បន្ថែម Function សម្រាប់ចាត់ចែងពេលចុច Search ឬ User
function openSearch() {
  console.log('Search clicked')
  // ដាក់កូដបើក Search Modal/Drawer ត្រង់នេះ
}

function openUserAccount() {
  console.log('User clicked')
  // ដាក់កូដបើក Profile ឬ Login Modal ត្រង់នេះ
}
</script>

<template>
  <nav class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="logo">
      <div class="logo-icon">
        <CupSoda :size="26" />
      </div>

      <span>Team<span><3Coffee</span></span>
    </RouterLink>


    <!-- Navigation -->
    <div class="nav-links">

      <RouterLink to="/">
        <House :size="20" />
        Home
      </RouterLink>

      <RouterLink to="/drinks">
        <CupSoda :size="20" />
        Drinks
      </RouterLink>

      <RouterLink to="/offers">
        <Tag :size="20" />
        Offers
      </RouterLink>

      <RouterLink to="/contact">
        <Mail :size="20" />
        Contact
      </RouterLink>

    </div>


    <!-- Right icons (បានកែប្រែឱ្យចុចបាន) -->
    <div class="nav-actions">

      <!-- 1. Search Icon (ចុចដើម្បីបើក Search Function) -->
      <button class="icon-btn" @click="openSearch" title="Search">
        <Search :size="22" />
      </button>

      <!-- 2. Profile / User Icon (បើកទៅកាន់ Page Profile ឬ Login) -->
      <RouterLink to="/profile" class="icon-btn" title="Account">
        <User :size="22" />
      </RouterLink>

      <!-- 3. Favorite / Heart Icon (បើកទៅកាន់ Page Favorites) -->
      <RouterLink to="/favorites" class="icon-btn" title="Favorites">
        <Heart :size="22" />
      </RouterLink>

      <!-- 4. Cart Icon (បើកទៅកាន់ Page Cart) -->
      <RouterLink to="/cart" class="cart-btn" title="Shopping Cart">
        <ShoppingCart :size="22" />

        <span
          v-if="cartCount > 0"
          class="cart-badge"
        >
          {{ cartCount }}
        </span>
      </RouterLink>

    </div>

  </nav>
</template>

<style scoped>
/* ================= NAVBAR CONTAINER ================= */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #f8bbd0;
  box-shadow: 0 4px 20px rgba(233, 30, 99, 0.03);
}

/* ================= LOGO ================= */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 22px;
  font-weight: 900;
  color: #111111;
  letter-spacing: -0.5px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 15px rgba(233, 30, 99, 0.25);
}

.logo span span {
  color: #d81b60;
}

/* ================= NAV LINKS ================= */
.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fcf8f9;
  padding: 6px 10px;
  border-radius: 30px;
  border: 1px solid #f8bbd0;
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 20px;
  text-decoration: none;
  color: #666666;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.nav-links a:hover {
  color: #d81b60;
  background: rgba(253, 242, 248, 0.8);
}

/* Vue Router Active State Styling */
.nav-links a.router-link-active {
  background: #d81b60;
  color: white;
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.25);
}

/* ================= RIGHT ACTIONS ================= */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-btn,
.cart-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid #f8bbd0;
  background: white;
  color: #444444;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.icon-btn:hover,
.cart-btn:hover {
  background: #fce4ec;
  color: #d81b60;
  border-color: #f48fb1;
  transform: translateY(-2px);
}

/* Router Active Style សម្រាប់ Icon (ឧទាហរណ៍៖ កំពុងនៅលើទំព័រ Profile ឬ Favorites) */
.icon-btn.router-link-active,
.cart-btn.router-link-active {
  background: #fdf2f8;
  color: #d81b60;
  border-color: #d81b60;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #d81b60;
  color: white;
  font-size: 11px;
  font-weight: 800;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(216, 27, 96, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 14px 20px;
  }
  .nav-links span {
    display: none;
  }
  .nav-links a {
    padding: 8px 10px;
  }
}
</style>