

<template>
  <div class="admin-layout">

    <AdminSidebar />

    <main class="admin-content">

      <header class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to Drink of the Day Admin Panel</p>
        </div>

        <div class="admin-user">
          <User :size="20" />
          {{ adminUsername }}
        </div>
      </header>

      <!-- Statistics -->
      <div class="stats-grid">

        <div class="stat-card">
          <div class="stat-icon">
            <CupSoda />
          </div>
          <div>
            <span>Total Drinks</span>
            <h2>20</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <ShoppingBag />
          </div>
          <div>
            <span>Total Orders</span>
            <h2>156</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <Users />
          </div>
          <div>
            <span>Customers</span>
            <h2>98</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <DollarSign />
          </div>
          <div>
            <span>Total Revenue</span>
            <h2>$485.50</h2>
          </div>
        </div>

      </div>

      <!-- Content -->
      <div class="dashboard-grid">

        <!-- Drink of the Day -->
        <section class="dashboard-card">
          <div class="card-header">
            <h2>Drink of the Day</h2>
            <RouterLink to="/admin/drinks">
              Manage
            </RouterLink>
          </div>

          <div class="drink-day">
            <div class="drink-image">
              🥤
            </div>

            <div>
              <h3>Strawberry Matcha Latte</h3>
              <p>Today's featured drink</p>
              <strong>$2.99</strong>
            </div>
          </div>
        </section>

        <!-- Order Status -->
        <section class="dashboard-card">
          <div class="card-header">
            <h2>Order Status</h2>
          </div>

          <div class="order-status">
            <div>
              <span>Pending</span>
              <strong>12</strong>
            </div>

            <div>
              <span>Preparing</span>
              <strong>8</strong>
            </div>

            <div>
              <span>Ready</span>
              <strong>5</strong>
            </div>

            <div>
              <span>Delivered</span>
              <strong>20</strong>
            </div>
          </div>
        </section>

      </div>

      <!-- Recent Orders -->
      <section class="dashboard-card recent-orders">

        <div class="card-header">
          <h2>Recent Orders</h2>

          <RouterLink to="/admin/orders">
            View All
          </RouterLink>
        </div>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Drink</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#1005</td>
              <td>Dara</td>
              <td>Matcha Latte</td>
              <td>$3.75</td>
              <td>
                <span class="status completed">
                  Completed
                </span>
              </td>
            </tr>

            <tr>
              <td>#1004</td>
              <td>Srey</td>
              <td>Mango Smoothie</td>
              <td>$5.90</td>
              <td>
                <span class="status preparing">
                  Preparing
                </span>
              </td>
            </tr>

            <tr>
              <td>#1003</td>
              <td>Bora</td>
              <td>Milk Tea</td>
              <td>$3.25</td>
              <td>
                <span class="status pending">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>

      </section>

    </main>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AdminSidebar from '../components/AdminSidebar.vue'

import {
  User,
  CupSoda,
  ShoppingBag,
  Users,
  DollarSign
} from 'lucide-vue-next'

const adminUsername = computed(() => {
  return localStorage.getItem('adminUsername') || 'Admin'
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8f8f8;
}

.admin-content {
  margin-left: 250px;
  padding: 30px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 5px;
  color: #333;
}

.page-header p {
  margin: 0;
  color: #888;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 10px 15px;
  border-radius: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 14px;

  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f8bbd0;
  color: #d81b60;

  border-radius: 10px;
}

.stat-icon :deep(svg) {
  width: 24px;
}

.stat-card span {
  color: #888;
  font-size: 13px;
}

.stat-card h2 {
  margin: 5px 0 0;
  color: #333;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 25px;
}

.dashboard-card {
  background: white;
  padding: 25px;
  border-radius: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h2 {
  margin: 0;
  font-size: 19px;
  color: #333;
}

.card-header a {
  color: #d81b60;
  text-decoration: none;
  font-size: 14px;
}

.drink-day {
  display: flex;
  align-items: center;
  gap: 20px;
}

.drink-image {
  width: 90px;
  height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #fff0f5;
  border-radius: 12px;

  font-size: 45px;
}

.drink-day h3 {
  margin: 0 0 5px;
}

.drink-day p {
  margin: 0 0 8px;
  color: #888;
}

.drink-day strong {
  color: #d81b60;
}

.order-status {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.order-status div {
  padding: 15px;
  background: #fafafa;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
}

.order-status span {
  color: #777;
}

.order-status strong {
  color: #333;
}

.recent-orders {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  color: #777;
  font-size: 13px;
}

td {
  color: #444;
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.completed {
  background: #e8f5e9;
  color: #2e7d32;
}

.preparing {
  background: #fff3e0;
  color: #ef6c00;
}

.pending {
  background: #fff8e1;
  color: #f9a825;
}

@media (max-width: 1000px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 70px;
    padding: 20px;
  }

  .page-header {
    align-items: flex-start;
  }
}
</style>