<template>
  <article class="drink-card">
    <button class="favorite-button" @click="toggleFavorite">
      <Heart :size="19" :fill="isFavorite ? 'currentColor' : 'none'" />
    </button>

    <div v-if="drink.badge" class="drink-badge">
      {{ drink.badge }}
    </div>

    <div class="drink-image">
      <img :src="drink.image" :alt="drink.name" />
    </div>

    <div class="drink-info">
      <p class="category">{{ drink.category }}</p>
      <h3>{{ drink.name }}</h3>
      <p class="description">{{ drink.description }}</p>

      <div class="drink-footer">
        <div class="price">
          <strong>${{ drink.price.toFixed(2) }}</strong>
          <del v-if="drink.originalPrice">${{ drink.originalPrice.toFixed(2) }}</del>
        </div>

        <button class="add-button" @click="handleAddToCart">
          <Plus :size="20" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Heart, Plus } from 'lucide-vue-next'
import type { Drink } from '../data/Drink'
import { useCart } from '../stores/cart'

const props = defineProps<{
  drink: Drink
}>()

const { addToCart } = useCart()
const isFavorite = ref(false)

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
}

function handleAddToCart() {
  addToCart(props.drink)
}
</script>
<style scoped>
/* ================= CARD CONTAINER ================= */
.drink-card {
  background: white;
  border: 1px solid #f8bbd0;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drink-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(216, 27, 96, 0.1);
  border-color: #f48fb1;
}

/* ================= FAVORITE BUTTON ================= */
.favorite-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #d81b60;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.favorite-button:hover {
  transform: scale(1.1);
  background: white;
  color: #c2185b;
}

/* ================= BADGE ================= */
.drink-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  z-index: 4;
  box-shadow: 0 4px 10px rgba(216, 27, 96, 0.25);
  letter-spacing: 0.3px;
}

/* ================= IMAGE AREA ================= */
.drink-image {
  width: 100%;
  height: 200px;
  background: #fdf2f8;
  overflow: hidden;
  position: relative;
}

.drink-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.4s ease;
}

.drink-card:hover .drink-image img {
  transform: scale(1.08);
}

/* ================= CONTENT / INFO ================= */
.drink-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.category {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #f48fb1;
  letter-spacing: 0.8px;
  margin: 0 0 4px 0;
}

.drink-info h3 {
  font-size: 16px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  font-size: 12px;
  color: #666666;
  line-height: 1.4;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 34px;
}

/* ================= FOOTER (PRICE & ADD BTN) ================= */
.drink-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.price {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price strong {
  font-size: 18px;
  font-weight: 800;
  color: #d81b60;
}

.price del {
  font-size: 13px;
  color: #9e9e9e;
  font-weight: 500;
}

.add-button {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: #fce4ec;
  color: #d81b60;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #d81b60;
  color: white;
  transform: scale(1.08);
  box-shadow: 0 6px 15px rgba(216, 27, 96, 0.3);
}

.add-button:active {
  transform: scale(0.95);
}
</style>