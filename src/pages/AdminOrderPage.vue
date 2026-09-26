<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-content">
      <header class="page-header">
        <div class="header-titles">
          <h1>Orders Pipeline</h1>
          <p>Real-time order tracking and management board</p>
        </div>

        <div class="header-actions">
          <button class="action-btn clear-all" @click="clearOrders" v-if="orders.length > 0">
            <Trash2 :size="16" />
            Clear All
          </button>
          <div class="admin-user-pill">
            <User :size="16" />
            <span>{{ adminUsername }}</span>
          </div>
        </div>
      </header>

      <div class="metrics-bar">
        <div class="metric-item">
          <ShoppingBag :size="20" class="m-icon" />
          <div>
            <span>Total</span>
            <strong>{{ orders.length }}</strong>
          </div>
        </div>
        <div class="metric-item">
          <Clock :size="20" class="m-icon pending" />
          <div>
            <span>Pending</span>
            <strong>{{ pendingOrders }}</strong>
          </div>
        </div>
        <div class="metric-item">
          <CheckCircle :size="20" class="m-icon success" />
          <div>
            <span>Completed</span>
            <strong>{{ completedOrders }}</strong>
          </div>
        </div>
        <div class="metric-item">
          <DollarSign :size="20" class="m-icon revenue" />
          <div>
            <span>Revenue</span>
            <strong>${{ totalRevenue.toFixed(2) }}</strong>
          </div>
        </div>
      </div>

      <div v-if="orders.length === 0" class="empty-pipeline">
        <div class="empty-icon">
          <ShoppingBag :size="48" />
        </div>
        <h3>No active orders</h3>
        <p>New customer orders will show up here automatically.</p>
      </div>

      <div v-else class="kanban-pipeline">
        
        <!-- Pending Column -->
        <div class="kanban-column">
          <div class="column-header pending-head">
            <h3>Pending</h3>
            <span class="count-badge">{{ getOrdersByStatus('pending').length }}</span>
          </div>
          <div class="column-cards">
            <div v-for="order in getOrdersByStatus('pending')" :key="order.id" class="kanban-card">
              <div class="card-top">
                <span class="id-tag">#{{ order.id }}</span>
                <button class="delete-mini" @click="deleteOrder(order.id)">
                  <Trash2 :size="14" />
                </button>
              </div>
              <div class="customer-details">
                <h4>{{ order.customerName || order.name || 'Customer' }}</h4>
                <p>
                  <Phone :size="12" class="inline-icon" />
                  {{ order.phone || 'N/A' }}
                </p>
                <p>
                  <MapPin :size="12" class="inline-icon" />
                  {{ order.address || 'N/A' }}
                </p>
              </div>
              <div class="items-summary">
                <div v-for="(item, idx) in order.items" :key="idx" class="item-row">
                  <span>{{ item.name }} (x{{ item.quantity || item.qty || 1 }})</span>
                </div>
              </div>
              <div class="card-bottom">
                <span class="price-val">${{ getOrderTotal(order).toFixed(2) }}</span>
                <div class="card-action-buttons">
                  <button class="receipt-btn" @click="openReceipt(order)" title="View Receipt">
                    <FileText :size="14" />
                  </button>
                  <button class="advance-btn" @click="changeStatus(order)">
                    <span>Next</span>
                    <ArrowRight :size="14" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preparing Column -->
        <div class="kanban-column">
          <div class="column-header preparing-head">
            <h3>Preparing</h3>
            <span class="count-badge">{{ getOrdersByStatus('preparing').length }}</span>
          </div>
          <div class="column-cards">
            <div v-for="order in getOrdersByStatus('preparing')" :key="order.id" class="kanban-card">
              <div class="card-top">
                <span class="id-tag">#{{ order.id }}</span>
                <button class="delete-mini" @click="deleteOrder(order.id)">
                  <Trash2 :size="14" />
                </button>
              </div>
              <div class="customer-details">
                <h4>{{ order.customerName || order.name || 'Customer' }}</h4>
                <p>
                  <Phone :size="12" class="inline-icon" />
                  {{ order.phone || 'N/A' }}
                </p>
                <p>
                  <MapPin :size="12" class="inline-icon" />
                  {{ order.address || 'N/A' }}
                </p>
              </div>
              <div class="items-summary">
                <div v-for="(item, idx) in order.items" :key="idx" class="item-row">
                  <span>{{ item.name }} (x{{ item.quantity || item.qty || 1 }})</span>
                </div>
              </div>
              <div class="card-bottom">
                <span class="price-val">${{ getOrderTotal(order).toFixed(2) }}</span>
                <div class="card-action-buttons">
                  <button class="receipt-btn" @click="openReceipt(order)" title="View Receipt">
                    <FileText :size="14" />
                  </button>
                  <button class="advance-btn" @click="changeStatus(order)">
                    <span>Next</span>
                    <ArrowRight :size="14" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ready Column -->
        <div class="kanban-column">
          <div class="column-header ready-head">
            <h3>Ready</h3>
            <span class="count-badge">{{ getOrdersByStatus('ready').length }}</span>
          </div>
          <div class="column-cards">
            <div v-for="order in getOrdersByStatus('ready')" :key="order.id" class="kanban-card">
              <div class="card-top">
                <span class="id-tag">#{{ order.id }}</span>
                <button class="delete-mini" @click="deleteOrder(order.id)">
                  <Trash2 :size="14" />
                </button>
              </div>
              <div class="customer-details">
                <h4>{{ order.customerName || order.name || 'Customer' }}</h4>
                <p>
                  <Phone :size="12" class="inline-icon" />
                  {{ order.phone || 'N/A' }}
                </p>
                <p>
                  <MapPin :size="12" class="inline-icon" />
                  {{ order.address || 'N/A' }}
                </p>
              </div>
              <div class="items-summary">
                <div v-for="(item, idx) in order.items" :key="idx" class="item-row">
                  <span>{{ item.name }} (x{{ item.quantity || item.qty || 1 }})</span>
                </div>
              </div>
              <div class="card-bottom">
                <span class="price-val">${{ getOrderTotal(order).toFixed(2) }}</span>
                <div class="card-action-buttons">
                  <button class="receipt-btn" @click="openReceipt(order)" title="View Receipt">
                    <FileText :size="14" />
                  </button>
                  <button class="advance-btn" @click="changeStatus(order)">
                    <span>Next</span>
                    <ArrowRight :size="14" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Delivered / Completed Column -->
        <div class="kanban-column">
          <div class="column-header completed-head">
            <h3>Delivered</h3>
            <span class="count-badge">{{ getOrdersByStatus('delivered').length }}</span>
          </div>
          <div class="column-cards">
            <template v-for="order in getOrdersByStatus('delivered')" :key="order.id">
              <div class="kanban-card done">
                <div class="card-top">
                  <span class="id-tag">#{{ order.id }}</span>
                  <button class="delete-mini" @click="deleteOrder(order.id)">
                    <Trash2 :size="14" />
                  </button>
                </div>
                <div class="customer-details">
                  <h4>{{ order.customerName || order.name || 'Customer' }}</h4>
                  <p>
                    <Phone :size="12" class="inline-icon" />
                    {{ order.phone || 'N/A' }}
                  </p>
                </div>
                <div class="card-bottom">
                  <span class="price-val">${{ getOrderTotal(order).toFixed(2) }}</span>
                  <div class="card-action-buttons">
                    <button class="receipt-btn" @click="openReceipt(order)" title="View Receipt">
                      <FileText :size="14" />
                    </button>
                    <span class="done-tag">
                      <Check :size="12" class="inline-icon" />
                      Done
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

      </div>
    </main>

    <!-- Refined Receipt Modal Form with Lucide Icon -->
    <div v-if="showReceiptModal" class="modal-overlay" @click.self="closeReceipt">
      <div class="receipt-modal">
        <div class="receipt-header">
          <div class="receipt-logo-icon">
            <ReceiptText :size="28" />
          </div>
          <h3>Drink of the Day</h3>
          <p class="receipt-subtitle">Official Receipt</p>
        </div>
        
        <div v-if="selectedOrder" class="receipt-body">
          <div class="receipt-meta-box">
            <div class="receipt-info-row">
              <span>Order ID:</span>
              <strong>#{{ selectedOrder.id }}</strong>
            </div>
            <div class="receipt-info-row">
              <span>Customer:</span>
              <strong>{{ selectedOrder.customerName || selectedOrder.name || 'Guest' }}</strong>
            </div>
            <div class="receipt-info-row">
              <span>Phone:</span>
              <strong>{{ selectedOrder.phone || 'N/A' }}</strong>
            </div>
            <div class="receipt-info-row">
              <span>Date:</span>
              <strong>{{ new Date().toLocaleString() }}</strong>
            </div>
          </div>

          <div class="receipt-divider"></div>

          <div class="receipt-items-table">
            <div v-for="(item, idx) in selectedOrder.items" :key="idx" class="receipt-item-row">
              <span class="item-name">{{ item.name }} <small>x{{ item.quantity || item.qty || 1 }}</small></span>
              <span class="item-price">${{ (Number(item.price || 0) * Number(item.quantity || item.qty || 1)).toFixed(2) }}</span>
            </div>
          </div>

          <div class="receipt-divider"></div>

          <div class="receipt-total-row">
            <span>TOTAL AMOUNT</span>
            <span class="total-price">${{ getOrderTotal(selectedOrder).toFixed(2) }}</span>
          </div>

          <div class="receipt-footer-msg">
            <p>Thank you for your order!</p>
          </div>
        </div>

        <button class="close-modal-btn" @click="closeReceipt">Close Receipt</button>
      </div>
    </div>
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
  Phone,
  MapPin,
  ArrowRight,
  Check,
  FileText,
  ReceiptText
} from 'lucide-vue-next'

const router = useRouter()

const adminUsername = ref(
  localStorage.getItem('adminUsername') || 'Admin'
)

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

const orders = ref<Order[]>([])
const showReceiptModal = ref(false)
const selectedOrder = ref<Order | null>(null)

function loadOrders() {
  const savedOrders = localStorage.getItem('adminOrders')
  if (!savedOrders) {
    orders.value = []
    return
  }
  try {
    const data = JSON.parse(savedOrders)
    orders.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error loading orders:', error)
    orders.value = []
  }
}

loadOrders()

function getOrderTotal(order: Order) {
  if (order.total !== undefined && !isNaN(Number(order.total))) {
    return Number(order.total)
  }
  return order.items.reduce((total, item) => {
    const quantity = Number(item.quantity ?? item.qty ?? 1)
    const price = Number(item.price || 0)
    return total + price * quantity
  }, 0)
}

function getOrdersByStatus(statusKey: string) {
  return orders.value.filter(order => {
    const s = (order.status || 'Pending').toLowerCase()
    if (statusKey.toLowerCase() === 'delivered' || statusKey.toLowerCase() === 'completed') {
      return s === 'delivered' || s === 'completed'
    }
    return s === statusKey.toLowerCase()
  })
}

const pendingOrders = computed(() => {
  return orders.value.filter(
    order => (order.status || 'Pending').toLowerCase() === 'pending'
  ).length
})

const completedOrders = computed(() => {
  return orders.value.filter(
    order => ['completed', 'delivered'].includes((order.status || '').toLowerCase())
  ).length
})

const totalRevenue = computed(() => {
  return orders.value.reduce((total, order) => total + getOrderTotal(order), 0)
})

function changeStatus(order: Order) {
  const current = (order.status || 'Pending').toLowerCase()
  let next = 'Pending'
  
  if (current === 'pending') next = 'Preparing'
  else if (current === 'preparing') next = 'Ready'
  else if (current === 'ready') next = 'Delivered'
  else next = 'Pending'

  order.status = next
  saveOrders()
}

function openReceipt(order: Order) {
  selectedOrder.value = order
  showReceiptModal.value = true
}

function closeReceipt() {
  showReceiptModal.value = false
  selectedOrder.value = null
}

function saveOrders() {
  localStorage.setItem('adminOrders', JSON.stringify(orders.value))
}

function deleteOrder(id: string | number) {
  if (!confirm('Are you sure you want to delete this order?')) return
  orders.value = orders.value.filter(order => order.id !== id)
  saveOrders()
}

function clearOrders() {
  if (!confirm('Are you sure you want to delete all orders?')) return
  localStorage.removeItem('adminOrders')
  orders.value = []
}
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
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-titles h1 {
  margin: 0 0 2px;
  font-size: 24px;
  font-weight: 700;
  color: #1b2559;
}

.header-titles p {
  margin: 0;
  color: #707eae;
  font-size: 13px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-user-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 6px 14px 6px 10px;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  font-weight: 600;
  color: #2b3674;
  font-size: 13px;
}

.action-btn.clear-all {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
}

/* Metrics Mini Bar */
.metrics-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 24px;
}

.metric-item {
  background: white;
  padding: 14px 18px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.m-icon {
  color: #3b82f6;
}
.m-icon.pending { color: #d97706; }
.m-icon.success { color: #16a34a; }
.m-icon.revenue { color: #dc2626; }

.metric-item span {
  display: block;
  font-size: 11px;
  color: #707eae;
  font-weight: 500;
}

.metric-item strong {
  font-size: 16px;
  color: #1b2559;
}

/* Kanban Pipeline Layout */
.kanban-pipeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: start;
  overflow-x: auto;
  padding-bottom: 20px;
}

.kanban-column {
  background: #ebf0fa;
  border-radius: 16px;
  padding: 14px;
  min-height: 450px;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
}

.pending-head { background: #fef3c7; color: #b45309; }
.preparing-head { background: #ffedd5; color: #c2410c; }
.ready-head { background: #e0f2fe; color: #0369a1; }
.completed-head { background: #dcfce7; color: #15803d; }

.column-header h3 {
  margin: 0;
  font-size: 14px;
}

.count-badge {
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11px;
}

.column-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kanban-card {
  background: white;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #e2e8f0;
}

.kanban-card.done {
  background: #f8fafc;
  opacity: 0.85;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.id-tag {
  background: #1b2559;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.delete-mini {
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.delete-mini:hover {
  color: #dc2626;
  background: #fee2e2;
}

.customer-details h4 {
  margin: 0 0 2px;
  font-size: 13px;
  font-weight: 700;
  color: #1b2559;
}

.customer-details p {
  margin: 2px 0;
  font-size: 11px;
  color: #707eae;
  display: flex;
  align-items: center;
  gap: 4px;
}

.inline-icon {
  vertical-align: middle;
}

.items-summary {
  background: #f8fafc;
  padding: 8px;
  border-radius: 8px;
  font-size: 11px;
  color: #334155;
}

.item-row {
  margin-bottom: 2px;
}
.item-row:last-child {
  margin-bottom: 0;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #f1f5f9;
  padding-top: 8px;
}

.card-action-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.price-val {
  font-weight: 700;
  font-size: 14px;
  color: #ff3366;
}

.receipt-btn {
  background: #e0f2fe;
  border: none;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #0369a1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.receipt-btn:hover {
  background: #0284c7;
  color: white;
}

.advance-btn {
  background: #f1f5f9;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #1b2559;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.advance-btn:hover {
  background: #1b2559;
  color: white;
}

.done-tag {
  font-size: 11px;
  font-weight: 700;
  color: #15803d;
  display: flex;
  align-items: center;
  gap: 4px;
}

.empty-pipeline {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  color: #707eae;
}

.empty-icon {
  width: 64px;
  height: 64px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: #cbd5e1;
}

/* Modern & Clean Receipt Modal Styling with Icon */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
}

.receipt-modal {
  background: #ffffff;
  width: 380px;
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  font-family: 'Inter', sans-serif;
  border: 1px solid #f1f5f9;
}

.receipt-header {
  text-align: center;
  margin-bottom: 20px;
}

.receipt-logo-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 50%;
  margin-bottom: 8px;
}

.receipt-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1b2559;
  letter-spacing: -0.5px;
}

.receipt-subtitle {
  margin: 4px 0 0;
  font-size: 12px;
  color: #707eae;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.receipt-meta-box {
  background: #f8fafc;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
}

.receipt-info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 13px;
}

.receipt-info-row:last-child {
  margin-bottom: 0;
}

.receipt-info-row span {
  color: #64748b;
}

.receipt-info-row strong {
  color: #1e293b;
}

.receipt-divider {
  border-bottom: 1.5px dashed #e2e8f0;
  margin: 16px 0;
}

.receipt-items-table {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 160px;
  overflow-y: auto;
  padding-right: 4px;
}

.receipt-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.item-name {
  color: #334155;
  font-weight: 500;
}

.item-name small {
  color: #94a3b8;
  margin-left: 4px;
}

.item-price {
  color: #1e293b;
  font-weight: 600;
}

.receipt-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #1b2559;
}

.total-price {
  font-size: 18px;
  color: #ff3366;
}

.receipt-footer-msg {
  text-align: center;
  font-size: 12px;
  color: #707eae;
  margin-top: 18px;
  font-weight: 500;
}

.close-modal-btn {
  width: 100%;
  margin-top: 20px;
  background: #1b2559;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.close-modal-btn:hover {
  background: #2b3674;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 1200px) {
  .kanban-pipeline {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 70px;
    padding: 15px;
  }
  .metrics-bar {
    grid-template-columns: 1fr 1fr;
  }
  .kanban-pipeline {
    grid-template-columns: 1fr;
  }
}
</style>