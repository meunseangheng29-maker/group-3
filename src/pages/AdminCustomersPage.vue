
<template>
  <div class="admin-layout">

    <!-- ================= SIDEBAR ================= -->
    <AdminSidebar />

    <!-- ================= MAIN CONTENT ================= -->
    <main class="admin-content">

      <!-- Header -->
      <header class="page-header">
        <div>
          <h1>Customers</h1>
          <p>View customer information.</p>
        </div>

        <div class="admin-user">
          <User :size="20" />
          {{ adminUsername }}
        </div>
      </header>


      <!-- ================= CUSTOMER CARD ================= -->
      <section class="content-card">

        <div class="card-header">
          <h2>Customer List</h2>

          <span>
            {{ customers.length }} Customers
          </span>
        </div>


        <!-- Customer Table -->
        <div class="customer-table">

          <!-- Header -->
          <div class="customer-header">
            <span>Name</span>
            <span>Phone</span>
            <span>Address</span>
          </div>


          <!-- Customers -->
          <div
            v-for="customer in customers"
            :key="customer.id"
            class="customer-row"
          >

            <strong>
              {{ customer.name }}
            </strong>

            <span>
              {{ customer.phone }}
            </span>

            <span>
              {{ customer.address }}
            </span>

          </div>


          <!-- Empty -->
          <div
            v-if="customers.length === 0"
            class="empty"
          >
            No customers found.
          </div>

        </div>

      </section>

    </main>

  </div>
</template>


<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'

import AdminSidebar from '../components/AdminSidebar.vue'

import {
  User
} from 'lucide-vue-next'


/* ================= ADMIN USER ================= */

const adminUsername = computed(() => {
  return localStorage.getItem('adminUsername') || 'Admin'
})


/* ================= CUSTOMER TYPE ================= */

interface Customer {
  id: number
  name: string
  phone: string
  address: string
}


/* ================= CUSTOMERS ================= */

const customers = ref<Customer[]>([])


/* ================= LOAD CUSTOMERS ================= */

onMounted(() => {

  const savedOrders = localStorage.getItem('adminOrders')

  if (!savedOrders) {
    return
  }


  const orders = JSON.parse(savedOrders)

  const uniqueCustomers: Customer[] = []


  orders.forEach((order: any, index: number) => {

    const exists = uniqueCustomers.some(
      customer =>
        customer.name === order.name &&
        customer.phone === order.phone
    )


    if (!exists) {

      uniqueCustomers.push({
        id: index + 1,

        name: order.name || 'Unknown',

        phone: order.phone || 'N/A',

        address: order.address || 'N/A'
      })

    }

  })


  customers.value = uniqueCustomers

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


/* ================= ADMIN USER ================= */

.admin-user {
  display: flex;
  align-items: center;

  gap: 8px;

  background: white;

  padding: 10px 15px;

  border-radius: 10px;
}


/* ================= CONTENT CARD ================= */

.content-card {
  background: white;

  border-radius: 14px;

  padding: 25px;

  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.04);
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

  font-size: 20px;
}

.card-header span {
  color: #d81b60;

  font-size: 14px;
}


/* ================= CUSTOMER TABLE ================= */

.customer-table {
  width: 100%;
}


/* ================= TABLE HEADER ================= */

.customer-header,
.customer-row {
  display: grid;

  grid-template-columns: 1fr 1fr 2fr;

  gap: 20px;

  padding: 18px;
}


/* Header */

.customer-header {
  background: #fff0f6;

  color: #d81b60;

  font-weight: 600;

  border-radius: 10px;
}


/* ================= CUSTOMER ROW ================= */

.customer-row {
  border-bottom: 1px solid #f5e1e8;

  color: #666;

  align-items: center;
}

.customer-row strong {
  color: #333;
}


/* ================= EMPTY ================= */

.empty {
  padding: 50px;

  text-align: center;

  color: #999;
}


/* ================= RESPONSIVE ================= */

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

  .content-card {
    padding: 15px;
  }

  .customer-header,
  .customer-row {
    grid-template-columns: 1fr 1fr 1.5fr;

    gap: 10px;

    padding: 14px 10px;

    font-size: 14px;
  }

}

</style>

