<template>
  <aside class="admin-sidebar">

    <!-- Logo -->
    <div class="sidebar-header">
      <div class="logo-icon">
        <CupSoda :size="28" />
      </div>

      <div>
        <h2>Drink of the Day</h2>
        <span>Admin Panel</span>
      </div>
    </div>

    <!-- Menu -->
    <nav class="sidebar-menu">

      <RouterLink
        to="/admin/dashboard"
        class="menu-item"
      >
        <LayoutDashboard :size="20" />
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink
        to="/admin/orders"
        class="menu-item"
      >
        <ShoppingBag :size="20" />
        <span>Orders</span>
      </RouterLink>

      <RouterLink
        to="/admin/drinks"
        class="menu-item"
      >
        <CupSoda :size="20" />
        <span>Drinks</span>
      </RouterLink>

      <RouterLink
        to="/admin/customers"
        class="menu-item"
      >
        <Users :size="20" />
        <span>Customers</span>
      </RouterLink>

      <RouterLink
        to="/admin/analytics"
        class="menu-item"
      >
        <BarChart3 :size="20" />
        <span>Analytics</span>
      </RouterLink>

      <RouterLink
        to="/admin/settings"
        class="menu-item"
      >
        <Settings :size="20" />
        <span>Settings</span>
      </RouterLink>

    </nav>

    <!-- Bottom -->
    <div class="sidebar-bottom">

      <button class="website-button" @click="goWebsite">
        <Globe :size="20" />
        <span>View Website</span>
      </button>

      <button class="logout-button" @click="logout">
        <LogOut :size="20" />
        <span>Logout</span>
      </button>

    </div>

  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  LayoutDashboard,
  ShoppingBag,
  CupSoda,
  Users,
  BarChart3,
  Settings,
  Globe,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()

function goWebsite() {
  router.push('/')
}

function logout() {
  localStorage.removeItem('adminLoggedIn')
  localStorage.removeItem('adminUsername')

  router.push('/admin')
}
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  background: #ffffff;
  border-right: 1px solid #eeeeee;

  z-index: 1000;
}

/* Header */

.sidebar-header {
  height: 85px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  gap: 12px;

  border-bottom: 1px solid #eeeeee;
}

.logo-icon {
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f8bbd0;
  color: #d81b60;

  border-radius: 12px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.sidebar-header span {
  font-size: 12px;
  color: #999;
}

/* Menu */

.sidebar-menu {
  flex: 1;
  padding: 20px 12px;
}

.menu-item {
  height: 48px;
  padding: 0 15px;
  margin-bottom: 6px;

  display: flex;
  align-items: center;
  gap: 13px;

  color: #666;
  text-decoration: none;

  border-radius: 10px;

  font-size: 15px;
  font-weight: 500;

  transition: 0.2s;
}

.menu-item:hover {
  background: #fff0f5;
  color: #d81b60;
}

.menu-item.router-link-active {
  background: #f8bbd0;
  color: #ad1457;
  font-weight: 600;
}

/* Bottom */

.sidebar-bottom {
  padding: 15px;
  border-top: 1px solid #eeeeee;
}

.website-button,
.logout-button {
  width: 100%;
  height: 45px;

  border: none;
  border-radius: 9px;

  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 14px;

  background: transparent;

  cursor: pointer;
  font-size: 14px;

  margin-bottom: 6px;
}

.website-button {
  color: #555;
}

.website-button:hover {
  background: #f5f5f5;
}

.logout-button {
  color: #d32f2f;
}

.logout-button:hover {
  background: #fff0f0;
}

/* Mobile */

@media (max-width: 768px) {
  .admin-sidebar {
    width: 70px;
  }

  .sidebar-header {
    justify-content: center;
    padding: 0;
  }

  .sidebar-header > div:last-child {
    display: none;
  }

  .menu-item {
    justify-content: center;
    padding: 0;
  }

  .menu-item span {
    display: none;
  }

  .website-button,
  .logout-button {
    justify-content: center;
    padding: 0;
  }

  .website-button span,
  .logout-button span {
    display: none;
  }
}
</style>