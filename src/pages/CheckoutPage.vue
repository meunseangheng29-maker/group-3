<template>
  <div class="checkout-container">
    <h2><font-awesome-icon :icon="['fas', 'cash-register']" class="header-icon" /> Checkout Details</h2>

    <div class="checkout-grid">
      <!-- 1. Form បំពេញព័ត៌មាន និងជ្រើសរើសការបង់ប្រាក់ -->
      <form class="checkout-form" @submit.prevent="handlePlaceOrder">
        <section class="form-section">
          <h3><font-awesome-icon :icon="['fas', 'truck-fast']" /> Delivery Information</h3>
          <div class="input-group">
            <label><font-awesome-icon :icon="['fas', 'user']" /> Full Name</label>
            <input type="text" v-model="form.fullName" placeholder="John Doe" required />
          </div>

          <div class="input-group">
            <label><font-awesome-icon :icon="['fas', 'phone']" /> Phone Number</label>
            <input type="tel" v-model="form.phone" placeholder="012 345 678" required />
          </div>

          <div class="input-group">
            <label><font-awesome-icon :icon="['fas', 'location-dot']" /> Delivery Address</label>
            <textarea rows="3" v-model="form.address" placeholder="Phnom Penh, Cambodia" required></textarea>
          </div>
        </section>

        <!-- ជ្រើសរើស Payment Method -->
        <section class="form-section">
          <h3><font-awesome-icon :icon="['fas', 'wallet']" /> Payment Method</h3>
          <div class="payment-options">
            <label class="payment-card" :class="{ active: paymentMethod === 'qr' }">
              <input type="radio" value="qr" v-model="paymentMethod" />
              <div class="card-info">
                <strong><font-awesome-icon :icon="['fas', 'qrcode']" /> KHQR / Bank Transfer</strong>
                <p>Scan to pay via KHQR</p>
              </div>
            </label>

            <label class="payment-card" :class="{ active: paymentMethod === 'cod' }">
              <input type="radio" value="cod" v-model="paymentMethod" />
              <div class="card-info">
                <strong><font-awesome-icon :icon="['fas', 'money-bill-wave']" /> Cash on Delivery (COD)</strong>
                <p>Pay cash when your order arrives</p>
              </div>
            </label>
          </div>
        </section>

        <!-- បង្ហាញ QR Code ករណីជ្រើសយក QR -->
        <div v-if="paymentMethod === 'qr'" class="qr-box">
          <h4><font-awesome-icon :icon="['fas', 'qrcode']" /> Scan KHQR to Pay</h4>
          <img src="/QRAcelida.jpg" alt="KHQR Code" />
          <p class="qr-instruction">Please scan with any mobile banking app.</p>
        </div>

        <button 
          type="submit" 
          class="place-order-btn"
          :disabled="!isFormValid"
          :class="{ 'disabled-btn': !isFormValid }"
        >
          <font-awesome-icon :icon="['fas', 'circle-check']" /> 
          {{ paymentMethod === 'qr' ? 'Confirm & Place Order' : 'Place Order (COD)' }}
        </button>
      </form>

      <!-- 2. Order Summary Box (មានរូបភាព Product) -->
      <div class="order-summary">
        <h3><font-awesome-icon :icon="['fas', 'receipt']" /> Order Summary</h3>
        
        <div v-if="cartItems.length === 0" class="empty-summary">
          <font-awesome-icon :icon="['fas', 'box-open']" class="empty-icon" />
          <p>No items in cart.</p>
        </div>

        <div v-else>
          <div class="summary-items-list">
            <div v-for="item in cartItems" :key="item.drink.id" class="summary-card">
              <img :src="item.drink.image" :alt="item.drink.name" class="product-img" />
              
              <div class="product-details">
                <span class="product-name">{{ item.drink.name }}</span>
                <span class="product-category" v-if="item.drink.category">{{ item.drink.category }}</span>
                <span class="product-qty">Qty: {{ item.quantity }}</span>
              </div>

              <div class="product-price">
                ${{ (item.drink.price * item.quantity).toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row">
            <span><font-awesome-icon :icon="['fas', 'basket-shopping']" /> Total Items:</span>
            <span>{{ cartCount }}</span>
          </div>
          
          <div class="summary-row total">
            <strong><font-awesome-icon :icon="['fas', 'money-bill-1']" /> Total Amount:</strong>
            <strong>${{ cartTotal.toFixed(2) }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const router = useRouter()
const { cartItems, cartCount, cartTotal, clearCart } = useCart()

const paymentMethod = ref<'qr' | 'cod'>('qr')

const form = reactive({
  fullName: '',
  phone: '',
  address: ''
})

const isFormValid = computed(() => {
  return (
    form.fullName.trim() !== '' &&
    form.phone.trim() !== '' &&
    form.address.trim() !== '' &&
    cartItems.value.length > 0
  )
})

function handlePlaceOrder() {
  if (!isFormValid.value) return

  const newOrder = {
    orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    customerName: form.fullName,
    phone: form.phone,
    address: form.address,
    paymentMethod: paymentMethod.value === 'qr' ? 'KHQR / Bank Transfer' : 'Cash on Delivery (COD)',
    items: cartItems.value.map(item => ({
      name: item.drink.name,
      price: item.drink.price,
      quantity: item.quantity,
      image: item.drink.image
    })),
    total: cartTotal.value.toFixed(2),
    date: new Date().toLocaleString(),
    status: 'Pending'
  }

  const existingOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]')
  existingOrders.push(newOrder)
  localStorage.setItem('adminOrders', JSON.stringify(existingOrders))

  if (paymentMethod.value === 'qr') {
    alert('Payment confirmed! Your order has been sent to admin.')
  } else {
    alert('Order placed successfully! You can pay cash upon delivery.')
  }

  clearCart()
  router.push('/')
}
</script>

<style scoped>
.checkout-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  min-height: 70vh;
}

.checkout-container h2 {
  font-size: 28px;
  font-weight: 900;
  color: #111111;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  color: #d81b60;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1.8fr 1.2fr;
  gap: 30px;
  align-items: start;
}

.form-section {
  background: #ffffff;
  border: 1px solid #f8bbd0;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(216, 27, 96, 0.03);
}

.form-section h3 {
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 18px;
  font-weight: 800;
  color: #111111;
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.input-group label {
  font-size: 13px;
  font-weight: 700;
  color: #444444;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.input-group input,
.input-group textarea {
  padding: 12px 14px;
  border: 1px solid #f8bbd0;
  border-radius: 12px;
  font-size: 14px;
  background: #fdf2f8;
  color: #1a1a1a;
  outline: none;
  transition: all 0.25s ease;
  font-family: inherit;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: #d81b60;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(216, 27, 96, 0.12);
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid #f8bbd0;
  border-radius: 14px;
  cursor: pointer;
  background: #ffffff;
  transition: all 0.25s ease;
}

.payment-card:hover {
  border-color: #f48fb1;
  background: #fdf2f8;
}

.payment-card.active {
  border-color: #d81b60;
  background: #fce4ec;
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.1);
}

.payment-card input[type="radio"] {
  accent-color: #d81b60;
  width: 18px;
  height: 18px;
}

.card-info strong {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 800;
  color: #1a1a1a;
}

.card-info p {
  margin: 2px 0 0;
  font-size: 12px;
  color: #666666;
  font-weight: 500;
}

.qr-box {
  background: #fdf2f8;
  border: 2px dashed #f48fb1;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.qr-box h4 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 800;
  color: #d81b60;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.qr-box img {
  border-radius: 12px;
  border: 4px solid #ffffff;
  box-shadow: 0 6px 16px rgba(216, 27, 96, 0.12);
  margin: 8px 0;
  max-width: 200px;
}

.qr-instruction {
  font-size: 13px;
  color: #666666;
  font-weight: 600;
  margin: 4px 0 0;
}

.place-order-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.25);
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.place-order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(216, 27, 96, 0.35);
}

.disabled-btn {
  background: #cccccc !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
  transform: none !important;
}

.order-summary {
  background: linear-gradient(180deg, #ffffff 0%, #fce4ec 100%);
  border: 1px solid #f8bbd0;
  border-radius: 20px;
  padding: 24px;
  height: fit-content;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.05);
}

.order-summary h3 {
  margin: 0 0 18px;
  font-size: 18px;
  font-weight: 800;
  color: #111111;
  display: flex;
  align-items: center;
  gap: 8px;
}

.empty-summary {
  text-align: center;
  padding: 20px 0;
  color: #888888;
  font-size: 14px;
}

.empty-icon {
  font-size: 28px;
  color: #f48fb1;
  margin-bottom: 8px;
}

.summary-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid #f8bbd0;
}

.product-img {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 10px;
  background: #fdf2f8;
}

.product-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-name {
  font-weight: 800;
  font-size: 14px;
  color: #1a1a1a;
}

.product-category {
  font-size: 10px;
  color: #f48fb1;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-qty {
  font-size: 12px;
  color: #777777;
  font-weight: 600;
  margin-top: 2px;
}

.product-price {
  font-weight: 800;
  font-size: 15px;
  color: #d81b60;
}

.summary-divider {
  height: 1px;
  background-color: #f48fb1;
  margin: 18px 0;
  opacity: 0.5;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 14px;
  color: #666666;
  font-weight: 600;
}

.summary-row span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 900;
  color: #d81b60;
  margin-top: 14px;
}

@media (max-width: 850px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}
</style>