<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-content">
      <header class="page-header">
        <div class="header-titles">
          <h1>Dashboard</h1>
          <p>Welcome back, here is your store's overview today.</p>
        </div>

        <div class="admin-user">
          <div class="user-avatar-badge">
            <User :size="18" />
          </div>
          <span>{{ adminUsername }}</span>
        </div>
      </header>

      <!-- Statistics -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon drinks">
            <CupSoda :size="22" />
          </div>
          <div class="stat-info">
            <span>Total Drinks</span>
            <h2>20</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orders">
            <ShoppingBag :size="22" />
          </div>
          <div class="stat-info">
            <span>Total Orders</span>
            <h2>156</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon customers">
            <Users :size="22" />
          </div>
          <div class="stat-info">
            <span>Customers</span>
            <h2>98</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon revenue">
            <DollarSign :size="22" />
          </div>
          <div class="stat-info">
            <span>Total Revenue</span>
            <h2>$485.50</h2>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="dashboard-grid">
        <!-- Drink of the Day -->
        <section class="dashboard-card drink-spotlight">
          <div class="card-header">
            <h2>Drink of the Day</h2>
            <RouterLink to="/admin/drinks" class="action-link">
              Manage <ArrowRight :size="14" class="inline-icon" />
            </RouterLink>
          </div>

          <div class="drink-day-content">
            <div class="drink-image">
              <Sparkles :size="28" />
            </div>
            <div class="drink-details">
              <h3>Strawberry Matcha Latte</h3>
              <p>Today's featured bestselling drink</p>
              <span class="price-tag">$2.99</span>
            </div>
          </div>
        </section>

        <!-- Order Status -->
        <section class="dashboard-card">
          <div class="card-header">
            <h2>Order Status</h2>
          </div>

          <div class="order-status-grid">
            <div class="status-box pending">
              <span>Pending</span>
              <strong>12</strong>
            </div>
            <div class="status-box preparing">
              <span>Preparing</span>
              <strong>8</strong>
            </div>
            <div class="status-box ready">
              <span>Ready</span>
              <strong>5</strong>
            </div>
            <div class="status-box delivered">
              <span>Delivered</span>
              <strong>20</strong>
            </div>
          </div>
        </section>
      </div>

      <!-- Recent Orders -->
      <section class="dashboard-card recent-orders-card">
        <div class="card-header">
          <h2>Recent Orders</h2>
          <RouterLink to="/admin/orders" class="action-link">
            View All <ArrowRight :size="14" class="inline-icon" />
          </RouterLink>
        </div>

        <div class="table-responsive">
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
                <td class="order-id">#1005</td>
                <td>
                  <div class="customer-name">Dara</div>
                </td>
                <td>Matcha Latte</td>
                <td class="price">$3.75</td>
                <td>
                  <span class="status-badge completed">Completed</span>
                </td>
              </tr>
              <tr>
                <td class="order-id">#1004</td>
                <td>
                  <div class="customer-name">Srey</div>
                </td>
                <td>Mango Smoothie</td>
                <td class="price">$5.90</td>
                <td>
                  <span class="status-badge preparing">Preparing</span>
                </td>
              </tr>
              <tr>
                <td class="order-id">#1003</td>
                <td>
                  <div class="customer-name">Bora</div>
                </td>
                <td>Milk Tea</td>
                <td class="price">$3.25</td>
                <td>
                  <span class="status-badge pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  DollarSign,
  Sparkles,
  ArrowRight
} from 'lucide-vue-next'

const adminUsername = computed(() => {
  return localStorage.getItem('adminUsername') || 'Admin'
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f4f7fe;
  font-family: 'Inter', sans-serif;
}

.admin-content {
  margin-left: 260px;
  padding: 30px;
  max-width: 1400px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-titles h1 {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  color: #1b2559;
}

.header-titles p {
  margin: 0;
  color: #707eae;
  font-size: 13px;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  padding: 6px 14px 6px 8px;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  font-weight: 600;
  font-size: 14px;
  color: #2b3674;
}

.user-avatar-badge {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  padding: 18px 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.stat-icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.stat-icon.drinks { background: #ffe5ec; color: #ff3366; }
.stat-icon.orders { background: #e0f2fe; color: #0284c7; }
.stat-icon.customers { background: #fef3c7; color: #d97706; }
.stat-icon.revenue { background: #dcfce7; color: #16a34a; }

.stat-info span {
  color: #707eae;
  font-size: 12px;
  font-weight: 500;
}

.stat-info h2 {
  margin: 2px 0 0;
  color: #1b2559;
  font-size: 20px;
  font-weight: 700;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.dashboard-card {
  background: white;
  padding: 20px 24px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #1b2559;
}

.action-link {
  color: #ff3366;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-link:hover {
  opacity: 0.8;
}

.inline-icon {
  vertical-align: middle;
}

/* Drink Spotlight */
.drink-day-content {
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(135deg, #fff0f3 0%, #fff 100%);
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #ffe3ec;
}

.drink-image {
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: #ff3366;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(255, 51, 102, 0.08);
  flex-shrink: 0;
}

.drink-details h3 {
  margin: 0 0 2px;
  font-size: 15px;
  color: #1b2559;
}

.drink-details p {
  margin: 0 0 6px;
  color: #707eae;
  font-size: 12px;
}

.price-tag {
  background: #ff3366;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

/* Order Status Grid */
.order-status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.status-box {
  padding: 12px 14px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f1f5f9;
}

.status-box span {
  color: #707eae;
  font-size: 12px;
  font-weight: 500;
}

.status-box strong {
  color: #1b2559;
  font-size: 15px;
}

.status-box.pending { background: #fffbeb; border-color: #fef3c7; }
.status-box.preparing { background: #fff7ed; border-color: #ffedd5; }
.status-box.ready { background: #f0fdf4; border-color: #dcfce7; }
.status-box.delivered { background: #f0fdfa; border-color: #ccfbf1; }

/* Table Section */
.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 14px;
  text-align: left;
}

th {
  color: #707eae;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border-bottom: 1px solid #f1f5f9;
}

td {
  color: #2b3674;
  font-size: 13px;
  border-bottom: 1px solid #f8fafc;
}

.order-id {
  font-weight: 600;
  color: #ff3366;
}

.price {
  font-weight: 600;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}

.status-badge.completed { background: #dcfce7; color: #15803d; }
.status-badge.preparing { background: #ffedd5; color: #c2410c; }
.status-badge.pending { background: #fef3c7; color: #b45309; }

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 70px;
    padding: 15px;
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>