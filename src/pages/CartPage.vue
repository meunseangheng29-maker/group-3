<template>
  <div class="cart-container">
    <h2>Shopping Cart</h2>

    <!-- 1. Empty Cart State -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is currently empty!</p>
      <router-link to="/drinks" class="btn-shop">Explore Drinks</router-link>
    </div>

    <!-- 2. Cart Content State -->
    <div v-else class="cart-content">
      <div class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.drink.id" 
          class="cart-item-card"
        >
          <!-- Drink Image -->
          <img :src="item.drink.image" :alt="item.drink.name" class="item-img" />

          <!-- Drink Info -->
          <div class="item-details">
            <h3>{{ item.drink.name }}</h3>
            <p class="category">{{ item.drink.category }}</p>
            <p class="price">${{ item.drink.price.toFixed(2) }}</p>
          </div>

          <!-- Quantity Controls -->
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.drink.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="addToCart(item.drink)">+</button>
          </div>

          <!-- Item Total Price -->
          <div class="item-total">
            ${{ (item.drink.price * item.quantity).toFixed(2) }}
          </div>

          <!-- Remove Item Button -->
          <button class="remove-btn" @click="removeFromCart(item.drink.id)">
            <Trash2 :size="18" />
          </button>
        </div>
      </div>

      <!-- Order Summary Box -->
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Total Quantity:</span>
          <span>{{ cartCount }} {{ cartCount > 1 ? 'items' : 'item' }}</span>
        </div>
        <div class="summary-row total">
          <span>Total Price:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <!-- ភ្ជាប់ Event @click ទៅកាន់ function goToCheckout -->
        <button class="checkout-btn" @click="goToCheckout">Checkout</button>
        <button class="clear-btn" @click="clearCart">Clear Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Trash2 } from 'lucide-vue-next'
import { useCart } from '../stores/cart'

const router = useRouter()

const { 
  cartItems, 
  cartCount, 
  cartTotal, 
  addToCart, 
  decreaseQuantity, 
  removeFromCart, 
  clearCart 
} = useCart()

function goToCheckout() {
  router.push('/checkout')
}
</script>

<style scoped>
/* ================= MAIN CONTAINER ================= */
.cart-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  min-height: 65vh;
}

.cart-container h2 {
  font-size: 28px;
  font-weight: 900;
  color: #111111;
  margin-bottom: 24px;
}

/* ================= EMPTY CART STATE ================= */
.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border: 1px dashed #f8bbd0;
  border-radius: 24px;
  margin-top: 20px;
}

.empty-cart p {
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
  font-weight: 600;
}

.btn-shop {
  display: inline-block;
  padding: 12px 28px;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: white;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.25);
  transition: all 0.25s ease;
}

.btn-shop:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(216, 27, 96, 0.35);
}

/* ================= CART CONTENT LAYOUT ================= */
.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ================= CART ITEM CARD ================= */
.cart-item-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #f8bbd0;
  border-radius: 20px;
  background: #ffffff;
  transition: all 0.25s ease;
}

.cart-item-card:hover {
  border-color: #f48fb1;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.06);
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 14px;
  background: #fdf2f8;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #1a1a1a;
}

.category {
  font-size: 10px;
  color: #f48fb1;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 4px 0;
}

.price {
  margin: 0;
  color: #777777;
  font-size: 14px;
  font-weight: 600;
}

/* ================= QUANTITY CONTROLS ================= */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fcf8f9;
  padding: 6px 10px;
  border-radius: 12px;
  border: 1px solid #f8bbd0;
}

.quantity-controls button {
  width: 28px;
  height: 28px;
  border: none;
  background: white;
  color: #d81b60;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.quantity-controls button:hover {
  background: #d81b60;
  color: white;
}

.quantity-controls span {
  font-weight: 800;
  color: #1a1a1a;
  min-width: 20px;
  text-align: center;
  font-size: 14px;
}

.item-total {
  font-weight: 800;
  font-size: 16px;
  color: #d81b60;
  min-width: 70px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #e57373;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #ffebee;
  color: #d32f2f;
}

/* ================= ORDER SUMMARY BOX ================= */
.cart-summary {
  padding: 24px;
  border: 1px solid #f8bbd0;
  border-radius: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #fce4ec 100%);
  height: fit-content;
  box-shadow: 0 10px 25px rgba(216, 27, 96, 0.05);
}

.cart-summary h3 {
  font-size: 18px;
  font-weight: 800;
  color: #111;
  margin: 0 0 18px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  color: #666;
  font-size: 14px;
  font-weight: 600;
}

.summary-row.total {
  font-weight: 900;
  font-size: 20px;
  color: #d81b60;
  border-top: 1px dashed #f48fb1;
  padding-top: 16px;
  margin-top: 16px;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.25);
  transition: all 0.25s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(216, 27, 96, 0.35);
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  color: #e57373;
  border: 1px solid #ffcdd2;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #ffebee;
  border-color: #ef5350;
  color: #d32f2f;
}

/* Responsive */
@media (max-width: 850px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .cart-item-card {
    flex-wrap: wrap;
  }
  .item-total {
    text-align: left;
  }
}
</style>