<script setup lang="ts">
import {
  Search,
  User,
  ShoppingCart,
  House,
  CupSoda,
  Tag,
  Mail,
  Info
} from 'lucide-vue-next'

import { useCart } from '../stores/cart'

const { cartCount } = useCart()

function openSearch() {
  console.log('Search clicked')
}
</script>

<template>
  <nav class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="logo">
      <div class="logo-icon">
        <CupSoda :size="26" />
      </div>

      <span>
        Team<span>&lt;3Coffee</span>
      </span>
    </RouterLink>


    <!-- Navigation -->
    <div class="nav-links">

      <RouterLink to="/">
        <House :size="20" />
        Home
      </RouterLink>

      <RouterLink to="/about">
        <Info :size="20" />
        About
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


    <!-- Right Actions -->
    <div class="nav-actions">

      <!-- Search -->
      <RouterLink
        to="/search"
        class="icon-btn"
        title="Search"
      >
        <Search :size="22" />
      </RouterLink>


      <!-- Login -->
      <RouterLink
        to="/login"
        class="login-btn"
        title="Login"
      >
        <User :size="20" />
        <span>Login</span>
      </RouterLink>


      <!-- Cart -->
      <RouterLink
        to="/cart"
        class="cart-btn"
        title="Shopping Cart"
      >
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

  box-shadow:
    0 4px 20px rgba(233, 30, 99, 0.03);
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
}

.logo-icon {
  width: 42px;
  height: 42px;

  background: linear-gradient(
    135deg,
    #e91e63,
    #d81b60
  );

  border-radius: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  box-shadow:
    0 6px 15px rgba(233, 30, 99, 0.25);
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

  background: #fdf2f8;
}

.nav-links a.router-link-active {
  background: #d81b60;

  color: white;

  box-shadow:
    0 4px 12px rgba(216, 27, 96, 0.25);
}


/* ================= RIGHT ACTIONS ================= */

.nav-actions {
  display: flex;
  align-items: center;

  gap: 10px;
}


/* Search */

.icon-btn {
  width: 42px;
  height: 42px;

  border-radius: 12px;

  border: 1px solid #f8bbd0;

  background: white;

  color: #444444;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: #fce4ec;

  color: #d81b60;

  border-color: #f48fb1;

  transform: translateY(-2px);
}


/* Login */

.login-btn {
  height: 42px;

  padding: 0 16px;

  border-radius: 12px;

  border: 1px solid #f8bbd0;

  background: white;

  color: #444444;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  text-decoration: none;

  font-size: 14px;
  font-weight: 700;

  transition: all 0.2s ease;
}

.login-btn:hover {
  background: #d81b60;

  color: white;

  border-color: #d81b60;

  transform: translateY(-2px);

  box-shadow:
    0 5px 15px rgba(216, 27, 96, 0.2);
}


/* Cart */

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

.cart-btn:hover {
  background: #fce4ec;

  color: #d81b60;

  border-color: #f48fb1;

  transform: translateY(-2px);
}


/* Cart Badge */

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
}


/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {

  .navbar {
    padding: 14px 20px;
  }

  .nav-links a {
    padding: 8px 10px;
  }

  .login-btn span {
    display: none;
  }

  .login-btn {
    width: 42px;
    padding: 0;
  }

}


@media (max-width: 700px) {

  .logo > span {
    display: none;
  }

  .nav-links {
    gap: 2px;
  }

  .nav-links a {
    padding: 8px;
  }

  .nav-links a svg {
    display: none;
  }

}

</style>