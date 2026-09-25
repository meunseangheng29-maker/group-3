
<template>
  <div class="admin-layout">

    <!-- ================= SIDEBAR ================= -->
    <AdminSidebar />

    <!-- ================= MAIN CONTENT ================= -->
    <main class="admin-content">

      <header class="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Overview of your shop performance.</p>
        </div>

        <div class="admin-user">
          <User :size="20" />
          {{ adminUsername }}
        </div>
      </header>

      <!-- ================= STATISTICS ================= -->
      <div class="stats-grid">

        <div class="stat-card">
          <div class="stat-icon">
            <ShoppingBag />
          </div>

          <div>
            <span>Total Orders</span>
            <h2>{{ totalOrders }}</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <DollarSign />
          </div>

          <div>
            <span>Total Revenue</span>
            <h2>${{ totalRevenue.toFixed(2) }}</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <Users />
          </div>

          <div>
            <span>Customers</span>
            <h2>{{ totalCustomers }}</h2>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <CupSoda />
          </div>

          <div>
            <span>Items Sold</span>
            <h2>{{ totalItems }}</h2>
          </div>
        </div>

      </div>

      <!-- ================= ANALYTICS ================= -->
      <div class="analytics-grid">

        <!-- Sales -->
        <section class="analytics-card">

          <div class="card-header">
            <h2>Sales Overview</h2>
            <span>This Month</span>
          </div>

          <div class="sales-number">
            ${{ totalRevenue.toFixed(2) }}
          </div>

          <p class="description">
            Total revenue generated from all orders.
          </p>

          <div class="fake-chart">
            <div class="bar" style="height: 45%"></div>
            <div class="bar" style="height: 65%"></div>
            <div class="bar" style="height: 50%"></div>
            <div class="bar" style="height: 80%"></div>
            <div class="bar" style="height: 60%"></div>
            <div class="bar" style="height: 90%"></div>
            <div class="bar" style="height: 75%"></div>
          </div>

        </section>

        <!-- Order Information -->
        <section class="analytics-card">

          <div class="card-header">
            <h2>Order Information</h2>
          </div>

          <div class="order-row">
            <span>Total Orders</span>
            <strong>{{ totalOrders }}</strong>
          </div>

          <div class="order-row">
            <span>Items Sold</span>
            <strong>{{ totalItems }}</strong>
          </div>

          <div class="order-row">
            <span>Customers</span>
            <strong>{{ totalCustomers }}</strong>
          </div>

          <div class="order-row">
            <span>Revenue</span>
            <strong>
              ${{ totalRevenue.toFixed(2) }}
            </strong>
          </div>

        </section>

      </div>

    </main>
  </div>
</template>

<script setup lang="ts">

import { computed, ref, onMounted } from 'vue'

import AdminSidebar from '../components/AdminSidebar.vue'

import {
  User,
  CupSoda,
  ShoppingBag,
  Users,
  DollarSign
} from 'lucide-vue-next'


/* ================= ADMIN USER ================= */

const adminUsername = computed(() => {
  return localStorage.getItem('adminUsername') || 'Admin'
})


/* ================= ANALYTICS DATA ================= */

const totalOrders = ref(0)
const totalRevenue = ref(0)
const totalCustomers = ref(0)
const totalItems = ref(0)


/* ================= LOAD ORDERS ================= */

onMounted(() => {

  const savedOrders = localStorage.getItem('adminOrders')

  if (!savedOrders) {
    return
  }

  const orders = JSON.parse(savedOrders)

  totalOrders.value = orders.length

  const customers = new Set<string>()

  orders.forEach((order: any) => {

    /* Revenue */
    totalRevenue.value += Number(order.total || 0)


    /* Customers */
    if (order.name) {
      customers.add(order.name)
    }
    else if (order.phone) {
      customers.add(order.phone)
    }


    /* Items */
    if (order.items) {

      order.items.forEach((item: any) => {

        totalItems.value += Number(
          item.quantity || 1
        )

      })

    }

  })


  totalCustomers.value = customers.size

})

</script>


<style scoped>

/* ================= LAYOUT ================= */

* {
  box-sizing: border-box;
}

.admin-layout {
  min-height: 100vh;
  background: #f8f8f8;
}


/* ================= CONTENT ================= */

.admin-content {
  margin-left: 250px;
  padding: 30px;
}


/* ================= HEADER ================= */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 5px;
  color: #333;
  font-size: 36px;
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


/* ================= STATISTICS ================= */

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

.stat-card span {
  color: #888;

  font-size: 13px;
}

.stat-card h2 {
  margin: 5px 0 0;

  color: #333;
}


/* ================= ANALYTICS ================= */

.analytics-grid {
  display: grid;

  grid-template-columns: 2fr 1fr;

  gap: 25px;
}

.analytics-card {
  background: white;

  padding: 25px;

  border-radius: 14px;
}


/* ================= CARD HEADER ================= */

.card-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;
}

.card-header h2 {
  margin: 0;

  color: #333;
}

.card-header span {
  color: #d81b60;

  font-size: 14px;
}


/* ================= SALES ================= */

.sales-number {
  font-size: 35px;

  font-weight: bold;

  color: #d81b60;
}

.description {
  color: #888;
}


/* ================= CHART ================= */

.fake-chart {
  height: 150px;

  display: flex;

  align-items: flex-end;

  gap: 18px;

  border-bottom: 1px solid #eee;

  padding: 0 20px;

  margin-top: 30px;
}

.bar {
  width: 35px;

  background: #efb7cc;

  border-radius: 8px 8px 0 0;
}


/* ================= ORDER INFORMATION ================= */

.order-row {
  display: flex;

  justify-content: space-between;

  padding: 18px 0;

  border-bottom: 1px solid #eee;

  color: #777;
}

.order-row strong {
  color: #333;
}


/* ================= RESPONSIVE ================= */

@media (max-width: 1000px) {

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .analytics-grid {
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

  .page-header h1 {
    font-size: 28px;
  }

}

</style>

