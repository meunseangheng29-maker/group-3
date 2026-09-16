<template>
  <div class="admin-container">
    <div class="admin-header-title">
      <h2>
        <font-awesome-icon icon="toolbox" class="header-icon" /> Admin Dashboard - Customer Orders
      </h2>
      <button @click="clearAllOrders" class="clear-all-btn" v-if="orders.length > 0">
        <font-awesome-icon icon="trash-can" /> Clear All Orders
      </button>
    </div>

    <div v-if="orders.length === 0" class="empty-orders">
      <font-awesome-icon icon="box-open" class="empty-icon" />
      <p>No customer orders found yet.</p>
    </div>

    <div v-else class="orders-grid">
      <div v-for="(order, index) in orders" :key="index" class="order-card">
        <div class="order-header">
          <span class="order-id">
            <font-awesome-icon icon="hashtag" /> <b>ID:</b> {{ order.orderId }}
          </span>
          
          <div class="status-action">
            <select v-model="order.status" @change="updateOrderStatus" class="status-select">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button @click="deleteOrder(index)" class="delete-btn" title="Delete Order">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>

        <div class="customer-info">
          <p><font-awesome-icon icon="user" class="info-icon" /> <b>Customer:</b> {{ order.customerName }}</p>
          <p><font-awesome-icon icon="phone" class="info-icon" /> <b>Phone:</b> {{ order.phone }}</p>
          <p><font-awesome-icon icon="location-dot" class="info-icon" /> <b>Address:</b> {{ order.address }}</p>
          <p><font-awesome-icon icon="credit-card" class="info-icon" /> <b>Payment:</b> {{ order.paymentMethod }}</p>
          <p><font-awesome-icon icon="calendar-days" class="info-icon" /> <b>Order Date:</b> {{ order.date }}</p>
        </div>

        <div class="items-section">
          <h4><font-awesome-icon icon="basket-shopping" /> Ordered Items:</h4>
          <ul>
            <li v-for="(item, i) in order.items" :key="i" class="item-row">
              <img :src="item.image" alt="" class="admin-product-img" />
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </li>
          </ul>
        </div>

        <div class="order-footer">
          <strong><font-awesome-icon icon="receipt" /> Total Amount:</strong>
          <span class="total-amount">${{ order.total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const orders = ref<any[]>([])

onMounted(() => {
  loadOrders()
})

function loadOrders() {
  const savedOrders = localStorage.getItem('adminOrders')
  if (savedOrders) {
    orders.value = JSON.parse(savedOrders).reverse()
  }
}

function updateOrderStatus() {
  const originalOrders = [...orders.value].reverse()
  localStorage.setItem('adminOrders', JSON.stringify(originalOrders))
}

function deleteOrder(index: number) {
  if (confirm('Are you sure you want to delete this order?')) {
    orders.value.splice(index, 1)
    const originalOrders = [...orders.value].reverse()
    localStorage.setItem('adminOrders', JSON.stringify(originalOrders))
  }
}

function clearAllOrders() {
  if (confirm('Are you sure you want to delete all orders?')) {
    localStorage.removeItem('adminOrders')
    orders.value = []
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: inherit;
}

.admin-header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.admin-header-title h2 {
  font-size: 24px;
  font-weight: 800;
  color: #111;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  color: #d81b60;
}

.clear-all-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.empty-orders {
  text-align: center;
  padding: 40px;
  background: #fdf2f8;
  border-radius: 12px;
  color: #888;
}

.empty-icon {
  font-size: 32px;
  color: #f48fb1;
  margin-bottom: 10px;
}

.orders-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: #fff;
  border: 1px solid #f8bbd0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(216, 27, 96, 0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #fdf2f8;
}

.order-id {
  color: #d81b60;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-action {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-select {
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #f8bbd0;
  background: #fdf2f8;
  font-weight: 700;
  font-size: 12px;
  color: #d81b60;
  outline: none;
  cursor: pointer;
}

.delete-btn {
  background: #ffebee;
  color: #c62828;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #ffcdd2;
}

.customer-info p {
  margin: 6px 0;
  font-size: 14px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  color: #d81b60;
  width: 14px;
}

.items-section {
  margin-top: 14px;
  background: #fdf2f8;
  padding: 12px;
  border-radius: 12px;
}

.items-section h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #d81b60;
  display: flex;
  align-items: center;
  gap: 6px;
}

.items-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #333;
}

.admin-product-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
}

.item-price {
  margin-left: auto;
  font-weight: 700;
  color: #d81b60;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 16px;
}

.order-footer strong {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.total-amount {
  color: #d81b60;
  font-weight: 900;
  font-size: 18px;
}
</style>