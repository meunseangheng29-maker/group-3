<template>
  <div class="admin-layout">

    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="admin-content">

      <!-- Header -->
      <header class="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage customer orders.</p>
        </div>

        <div class="admin-user">
          <User :size="20" />
          <span>{{ adminUsername }}</span>
        </div>
      </header>


      <!-- Order Summary -->
      <div class="stats-grid">

        <div class="stat-card">
          <div class="stat-icon">
            <ShoppingBag :size="24" />
          </div>

          <div>
            <p>Total Orders</p>
            <h2>{{ orders.length }}</h2>
          </div>
        </div>


        <div class="stat-card">
          <div class="stat-icon">
            <Clock :size="24" />
          </div>

          <div>
            <p>Pending</p>
            <h2>{{ pendingOrders }}</h2>
          </div>
        </div>


        <div class="stat-card">
          <div class="stat-icon">
            <CheckCircle :size="24" />
          </div>

          <div>
            <p>Completed</p>
            <h2>{{ completedOrders }}</h2>
          </div>
        </div>


        <div class="stat-card">
          <div class="stat-icon">
            <DollarSign :size="24" />
          </div>

          <div>
            <p>Total Revenue</p>
            <h2>${{ totalRevenue.toFixed(2) }}</h2>
          </div>
        </div>

      </div>


      <!-- Orders Card -->
      <div class="orders-card">

        <div class="card-header">
          <div>
            <h2>Customer Orders</h2>
            <p>View and manage all saved orders.</p>
          </div>

          <button
            class="clear-btn"
            @click="clearOrders"
            v-if="orders.length > 0"
          >
            <Trash2 :size="17" />
            Clear All
          </button>
        </div>


        <!-- Empty -->
        <div
          v-if="orders.length === 0"
          class="empty-state"
        >
          <ShoppingBag :size="45" />

          <h3>No Orders Yet</h3>

          <p>
            Customer orders will appear here.
          </p>
        </div>


        <!-- Order List -->
        <div
          v-else
          class="orders-list"
        >

          <div
            v-for="order in orders"
            :key="order.id"
            class="order-card"
          >

            <!-- Order Header -->
            <div class="order-header">

              <div>
                <h3>
                  Order #{{ order.id }}
                </h3>

                <p>
                  {{ order.customerName || 'Customer' }}
                </p>
              </div>

              <span
                class="status"
                :class="getStatusClass(order.status)"
              >
                {{ order.status || 'Pending' }}
              </span>

            </div>


            <!-- Customer Information -->
            <div class="customer-info">

              <div>
                <strong>Phone</strong>
                <span>
                  {{ order.phone || 'N/A' }}
                </span>
              </div>

              <div>
                <strong>Address</strong>
                <span>
                  {{ order.address || 'N/A' }}
                </span>
              </div>

            </div>


            <!-- Items -->
            <div class="order-items">

              <h4>Order Items</h4>

              <div
                v-for="(item, index) in order.items"
                :key="index"
                class="order-item"
              >

                <div>
                  <strong>
                    {{ item.name }}
                  </strong>

                  <span>
                    Qty: {{ item.quantity || item.qty || 1 }}
                  </span>
                </div>

                <strong>
                  ${{
                    (
                      Number(item.price || 0) *
                      Number(item.quantity || item.qty || 1)
                    ).toFixed(2)
                  }}
                </strong>

              </div>

            </div>


            <!-- Order Footer -->
            <div class="order-footer">

              <span>
                Total
              </span>

              <strong>
                ${{ getOrderTotal(order).toFixed(2) }}
              </strong>

            </div>


            <!-- Actions -->
            <div class="order-actions">

              <button
                class="status-btn"
                @click="changeStatus(order)"
              >
                <RefreshCw :size="16" />
                Change Status
              </button>

              <button
                class="delete-btn"
                @click="deleteOrder(order.id)"
              >
                <Trash2 :size="16" />
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

  </div>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import AdminSidebar from '../components/AdminSidebar.vue'

import {
  User,
  ShoppingBag,
  Clock,
  CheckCircle,
  DollarSign,
  Trash2,
  RefreshCw
} from 'lucide-vue-next'


const router = useRouter()


// =========================
// ADMIN USER
// =========================

const adminUsername = ref(
  localStorage.getItem('adminUsername') || 'Admin'
)


// =========================
// TYPES
// =========================

interface OrderItem {
  name: string
  price: number
  quantity?: number
  qty?: number
}


interface Order {
  id: string | number
  customerName?: string
  name?: string
  phone?: string
  address?: string
  status?: string
  total?: number
  items: OrderItem[]
}


// =========================
// LOAD ORDERS
// =========================

const orders = ref<Order[]>([])


function loadOrders() {

  const savedOrders =
    localStorage.getItem('adminOrders')

  if (!savedOrders) {
    orders.value = []
    return
  }

  try {

    const data = JSON.parse(savedOrders)

    if (Array.isArray(data)) {
      orders.value = data
    } else {
      orders.value = []
    }

  } catch (error) {

    console.error(
      'Error loading orders:',
      error
    )

    orders.value = []

  }

}


loadOrders()


// =========================
// CALCULATE ORDER TOTAL
// =========================

function getOrderTotal(order: Order) {

  if (
    order.total !== undefined &&
    !isNaN(Number(order.total))
  ) {
    return Number(order.total)
  }

  return order.items.reduce(
    (total, item) => {

      const quantity =
        Number(
          item.quantity ??
          item.qty ??
          1
        )

      const price =
        Number(item.price || 0)

      return total + price * quantity

    },
    0
  )

}


// =========================
// STATISTICS
// =========================

const pendingOrders = computed(() => {

  return orders.value.filter(
    order =>
      (order.status || 'Pending')
        .toLowerCase() === 'pending'
  ).length

})


const completedOrders = computed(() => {

  return orders.value.filter(
    order =>
      ['completed', 'delivered']
        .includes(
          (order.status || '')
            .toLowerCase()
        )
  ).length

})


const totalRevenue = computed(() => {

  return orders.value.reduce(
    (total, order) => {

      return total +
        getOrderTotal(order)

    },
    0
  )

})


// =========================
// CHANGE STATUS
// =========================

function changeStatus(order: Order) {

  const statuses = [
    'Pending',
    'Preparing',
    'Ready',
    'Delivered',
    'Cancelled'
  ]

  const currentIndex =
    statuses.indexOf(
      order.status || 'Pending'
    )

  const nextIndex =
    (currentIndex + 1) %
    statuses.length

  order.status =
    statuses[nextIndex]

  saveOrders()

}


// =========================
// SAVE ORDERS
// =========================

function saveOrders() {

  localStorage.setItem(
    'adminOrders',
    JSON.stringify(orders.value)
  )

}


// =========================
// DELETE ONE ORDER
// =========================

function deleteOrder(
  id: string | number
) {

  const confirmed = confirm(
    'Are you sure you want to delete this order?'
  )

  if (!confirmed) return

  orders.value =
    orders.value.filter(
      order => order.id !== id
    )

  saveOrders()

}


// =========================
// CLEAR ALL ORDERS
// =========================

function clearOrders() {

  const confirmed = confirm(
    'Are you sure you want to delete all orders?'
  )

  if (!confirmed) return

  localStorage.removeItem(
    'adminOrders'
  )

  orders.value = []

}


// =========================
// STATUS CLASS
// =========================

function getStatusClass(
  status?: string
) {

  const value =
    (status || 'Pending')
      .toLowerCase()

  if (value === 'completed') {
    return 'completed'
  }

  if (value === 'delivered') {
    return 'delivered'
  }

  if (value === 'preparing') {
    return 'preparing'
  }

  if (value === 'ready') {
    return 'ready'
  }

  if (value === 'cancelled') {
    return 'cancelled'
  }

  return 'pending'

}

</script>


<style scoped>

/* =========================
   ADMIN LAYOUT
========================= */

.admin-layout {
  min-height: 100vh;
  background: #fff8fa;
}


/* =========================
   MAIN CONTENT
========================= */

.admin-content {
  margin-left: 250px;
  padding: 30px;
}


/* =========================
   HEADER
========================= */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 8px;

  color: #d81b60;

  font-size: 30px;
}

.page-header p {
  margin: 0;

  color: #777;
}


/* =========================
   ADMIN USER
========================= */

.admin-user {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 16px;

  background: white;

  border-radius: 12px;

  color: #555;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.05);
}


/* =========================
   STATISTICS
========================= */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 20px;

  margin-bottom: 30px;
}


.stat-card {
  display: flex;

  align-items: center;

  gap: 15px;

  background: white;

  padding: 22px;

  border-radius: 16px;

  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.05);
}


.stat-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 12px;

  background: #fde3ed;

  color: #d81b60;
}


.stat-card p {
  margin: 0 0 5px;

  color: #888;

  font-size: 14px;
}


.stat-card h2 {
  margin: 0;

  color: #333;

  font-size: 24px;
}


/* =========================
   ORDERS CARD
========================= */

.orders-card {
  background: white;

  border-radius: 18px;

  padding: 25px;

  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.05);
}


/* =========================
   CARD HEADER
========================= */

.card-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}


.card-header h2 {
  margin: 0 0 5px;

  color: #333;
}


.card-header p {
  margin: 0;

  color: #888;

  font-size: 14px;
}


/* =========================
   CLEAR BUTTON
========================= */

.clear-btn {
  display: flex;

  align-items: center;

  gap: 7px;

  border: none;

  padding: 10px 16px;

  border-radius: 10px;

  background: #e74c3c;

  color: white;

  font-weight: bold;

  cursor: pointer;
}


.clear-btn:hover {
  opacity: 0.85;
}


/* =========================
   EMPTY STATE
========================= */

.empty-state {
  text-align: center;

  padding: 70px 20px;

  color: #aaa;
}


.empty-state h3 {
  margin: 15px 0 8px;

  color: #555;
}


.empty-state p {
  margin: 0;
}


/* =========================
   ORDERS LIST
========================= */

.orders-list {
  display: flex;

  flex-direction: column;

  gap: 20px;
}


/* =========================
   ORDER CARD
========================= */

.order-card {
  border: 1px solid #f2dfe7;

  border-radius: 15px;

  padding: 20px;

  background: #fff;
}


/* =========================
   ORDER HEADER
========================= */

.order-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-bottom: 15px;

  border-bottom:
    1px solid #f2dfe7;
}


.order-header h3 {
  margin: 0 0 5px;

  color: #333;
}


.order-header p {
  margin: 0;

  color: #888;
}


/* =========================
   STATUS
========================= */

.status {
  padding: 7px 13px;

  border-radius: 20px;

  font-size: 13px;

  font-weight: bold;
}


.status.pending {
  background: #fff3cd;
  color: #856404;
}


.status.preparing {
  background: #e8ddff;
  color: #6842a5;
}


.status.ready {
  background: #d9edf7;
  color: #31708f;
}


.status.delivered,
.status.completed {
  background: #dff5e5;
  color: #27843b;
}


.status.cancelled {
  background: #fde0e0;
  color: #c0392b;
}


/* =========================
   CUSTOMER INFO
========================= */

.customer-info {
  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 20px;

  padding: 18px 0;
}


.customer-info div {
  display: flex;

  flex-direction: column;

  gap: 5px;
}


.customer-info strong {
  color: #555;

  font-size: 13px;
}


.customer-info span {
  color: #777;

  font-size: 14px;
}


/* =========================
   ORDER ITEMS
========================= */

.order-items {
  padding: 15px 0;

  border-top:
    1px solid #f2dfe7;
}


.order-items h4 {
  margin: 0 0 12px;

  color: #555;
}


.order-item {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 10px 0;
}


.order-item div {
  display: flex;

  flex-direction: column;

  gap: 4px;
}


.order-item strong {
  color: #333;
}


.order-item span {
  color: #999;

  font-size: 13px;
}


/* =========================
   ORDER FOOTER
========================= */

.order-footer {
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-top: 15px;

  border-top:
    1px solid #f2dfe7;
}


.order-footer span {
  color: #777;

  font-weight: bold;
}


.order-footer strong {
  color: #d81b60;

  font-size: 20px;
}


/* =========================
   ACTIONS
========================= */

.order-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 15px;
}


.status-btn,
.delete-btn {
  display: flex;

  align-items: center;

  gap: 6px;

  border: none;

  padding: 9px 14px;

  border-radius: 9px;

  color: white;

  font-weight: bold;

  cursor: pointer;
}


.status-btn {
  background: #d81b60;
}


.delete-btn {
  background: #e74c3c;
}


.status-btn:hover,
.delete-btn:hover {
  opacity: 0.85;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1000px) {

  .stats-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


@media (max-width: 768px) {

  .admin-content {
    margin-left: 70px;

    padding: 20px;
  }


  .page-header {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }


  .stats-grid {
    grid-template-columns: 1fr;
  }


  .customer-info {
    grid-template-columns: 1fr;
  }


  .card-header {
    flex-direction: column;

    align-items: flex-start;

    gap: 15px;
  }


  .order-actions {
    flex-direction: column;
  }


  .status-btn,
  .delete-btn {
    justify-content: center;
  }

}

</style>