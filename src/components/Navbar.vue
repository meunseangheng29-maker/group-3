<script setup lang="ts">
import {
  Search,
  User,
  ShoppingCart,
  House,
  CupSoda,
  Tag,
  Mail,
  Info,
  Toolbox,
  Menu,
  X
} from 'lucide-vue-next'

import { ref } from 'vue'
import { useCart } from '../stores/cart'

const { cartCount } = useCart()

const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}

function openSearch() {
  console.log('Search clicked')
}
</script>

<template>
  <nav class="navbar">

    <!-- Logo -->
    <RouterLink to="/" class="logo" @click="closeMenu">
      <div class="logo-icon">
        <CupSoda :size="26" />
      </div>

      <span>
        Team<span>&lt;3Coffee</span>
      </span>
    </RouterLink>


    <!-- Desktop Navigation -->
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

      <RouterLink to="/admin/orders">
        <Toolbox :size="20" />
        Admin Dashboard
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


      <!-- Mobile Menu Button -->
      <button
        class="menu-btn"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle navigation"
      >
        <X v-if="isMenuOpen" :size="25" />
        <Menu v-else :size="25" />
      </button>

    </div>


    <!-- Mobile Navigation -->
    <div
      v-if="isMenuOpen"
      class="mobile-menu"
    >

      <RouterLink to="/" @click="closeMenu">
        <House :size="20" />
        Home
      </RouterLink>

      <RouterLink to="/about" @click="closeMenu">
        <Info :size="20" />
        About
      </RouterLink>

      <RouterLink to="/drinks" @click="closeMenu">
        <CupSoda :size="20" />
        Drinks
      </RouterLink>

      <RouterLink to="/offers" @click="closeMenu">
        <Tag :size="20" />
        Offers
      </RouterLink>

      <RouterLink to="/contact" @click="closeMenu">
        <Mail :size="20" />
        Contact
      </RouterLink>

      <RouterLink to="/admin/orders" @click="closeMenu">
        <Toolbox :size="20" />
        Admin Dashboard
      </RouterLink>

    </div>

  </nav>
</template>


<style scoped>

/* ================= NAVBAR ================= */

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

  white-space: nowrap;
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

  gap: 4px;

  background: #fcf8f9;

  padding: 6px 8px;

  border-radius: 30px;

  border: 1px solid #f8bbd0;
}

.nav-links a {
  display: flex;
  align-items: center;

  gap: 7px;

  padding: 8px 13px;

  border-radius: 20px;

  text-decoration: none;

  color: #666666;

  font-size: 14px;
  font-weight: 700;

  transition: all 0.25s ease;

  white-space: nowrap;
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


/* ================= SEARCH ================= */

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

  text-decoration: none;
}

.icon-btn:hover {
  background: #fce4ec;

  color: #d81b60;

  border-color: #f48fb1;

  transform: translateY(-2px);
}


/* ================= LOGIN ================= */

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


/* ================= CART ================= */

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


/* ================= CART BADGE ================= */

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


/* ================= MOBILE MENU BUTTON ================= */

.menu-btn {
  display: none;

  width: 42px;
  height: 42px;

  border-radius: 12px;

  border: 1px solid #f8bbd0;

  background: white;

  color: #444444;

  align-items: center;
  justify-content: center;

  cursor: pointer;
}


/* ================= MOBILE MENU ================= */

.mobile-menu {
  display: none;
}


/* ================================================= */
/* TABLET */
/* ================================================= */

@media (max-width: 1200px) {

  .navbar {
    padding: 14px 25px;
  }

  .nav-links {
    gap: 2px;
  }

  .nav-links a {
    padding: 8px 9px;
    font-size: 13px;
  }

  .nav-links a svg {
    width: 17px;
  }

  .login-btn {
    padding: 0 12px;
  }

}


/* ================================================= */
/* MOBILE */
/* ================================================= */

@media (max-width: 900px) {

  .navbar {
    padding: 12px 20px;
  }


  /* Hide desktop navigation */

  .nav-links {
    display: none;
  }


  /* Show hamburger */

  .menu-btn {
    display: flex;
  }


  /* Hide Login text */

  .login-btn span {
    display: none;
  }

  .login-btn {
    width: 42px;
    padding: 0;
  }


  /* Mobile menu */

  .mobile-menu {
    position: absolute;

    top: 100%;
    left: 0;
    right: 0;

    background: white;

    border-bottom: 1px solid #f8bbd0;

    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.08);

    padding: 12px 20px;

    display: flex;
    flex-direction: column;

    gap: 5px;
  }

  .mobile-menu a {
    display: flex;
    align-items: center;

    gap: 12px;

    padding: 13px 15px;

    border-radius: 10px;

    text-decoration: none;

    color: #555;

    font-size: 15px;
    font-weight: 700;

    transition: 0.2s;
  }

  .mobile-menu a:hover {
    background: #fce4ec;
    color: #d81b60;
  }

  .mobile-menu a.router-link-active {
    background: #d81b60;
    color: white;
  }

}


/* ================================================= */
/* SMALL PHONE */
/* ================================================= */

@media (max-width: 500px) {

  .navbar {
    padding: 10px 14px;
  }

  .logo {
    font-size: 18px;
  }

  .logo-icon {
    width: 38px;
    height: 38px;
  }

  .nav-actions {
    gap: 6px;
  }

  .icon-btn,
  .login-btn,
  .cart-btn,
  .menu-btn {
    width: 38px;
    height: 38px;
  }

}


/* ================================================= */
/* VERY SMALL PHONE */
/* ================================================= */

@media (max-width: 380px) {

  .logo > span {
    display: none;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

}

</style>