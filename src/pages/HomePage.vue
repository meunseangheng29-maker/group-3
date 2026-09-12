<script setup lang="ts">
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Clock,
  Plus,
  CupSoda,
  Coffee,
  Citrus,
  Sparkles,
  GlassWater,
  Gift,
  Flame,
  Milk
} from 'lucide-vue-next'

import { drinks } from '../data/Drink'
import { useCart } from '../stores/cart'

const { addToCart } = useCart()

// ប្ដូរ Emoji ទៅជា Icon Component
const categories = [
  { name: 'All Drinks', icon: CupSoda },
  { name: 'Milk Tea', icon: Milk },
  { name: 'Coffee', icon: Coffee },
  { name: 'Fruit Tea', icon: Citrus },
  { name: 'Smoothie', icon: GlassWater },
  { name: 'Juice', icon: Sparkles },
  { name: 'Matcha', icon: Flame },
  { name: 'Specials', icon: Gift }
]

const popularDrinks = drinks.slice(1, 6)

const todayDrink = drinks[0]
</script>

<template>
  <main class="home-page">

    <!-- ================= HERO ================= -->
    <section class="hero-section">

      <div class="hero-content">

        <div class="special-label">
          <span>✦</span>
          TODAY'S SPECIAL
        </div>

        <h1>
          Drink
          <span>of the Day</span>
        </h1>

        <p class="hero-description">
          Try our special drink today.<br>
          Fresh, tasty and made with love! 💛
        </p>

        <div class="hero-price">
          <strong>
            ${{ todayDrink.price.toFixed(2) }}
          </strong>

          <del v-if="todayDrink.originalPrice">
            ${{ todayDrink.originalPrice.toFixed(2) }}
          </del>

          <span v-if="todayDrink.badge">
            {{ todayDrink.badge }}
          </span>
        </div>

        <div class="offer-time">
          <Clock :size="22" />

          <div>
            <small>LIMITED TIME OFFER</small>
            <strong>Fresh drinks, fresh moments</strong>
          </div>
        </div>

        <div class="hero-buttons">

          <button
            class="order-btn"
            @click="addToCart(todayDrink)"
          >
            Order Now
            <ShoppingBag :size="19" />
          </button>

          <button class="favorite-btn">
            <Heart :size="22" />
          </button>

        </div>

      </div>

      <!-- Hero Image -->
      <div class="hero-image-area">

        <div class="circle-decoration"></div>

        <img
          :src="todayDrink.image"
          :alt="todayDrink.name"
          class="hero-drink"
        />

        <div class="ordered-badge">
          <strong>127</strong>
          <span>people ordered<br>today</span>
        </div>

        <div class="drink-label">
          <strong>{{ todayDrink.name }}</strong>
          <p>{{ todayDrink.description }}</p>
        </div>

      </div>

    </section>


   <!-- ================= CATEGORIES ================= -->
    <section class="categories-section">

      <div
        v-for="category in categories"
        :key="category.name"
        class="category-item"
        :class="{ active: category.name === 'All Drinks' }"
      >

        <div class="category-icon">
          <component :is="category.icon" :size="24" />
        </div>

        <span>{{ category.name }}</span>

      </div>

    </section>


    <!-- ================= POPULAR ================= -->
    <section class="popular-section">

      <div class="section-header">

        <div>
          <span class="section-small-title">
            OUR FAVORITES
          </span>

          <h2>Popular Drinks</h2>

          <p>
            Discover drinks everyone is loving right now.
          </p>
        </div>

        <RouterLink
          to="/drinks"
          class="view-all"
        >
          View All
          <ArrowRight :size="18" />
        </RouterLink>

      </div>


      <div class="drink-grid">

        <div
          v-for="drink in popularDrinks"
          :key="drink.id"
          class="drink-card"
        >

          <div class="drink-image-wrapper">

            <img
              :src="drink.image"
              :alt="drink.name"
            />

            <span
              v-if="drink.badge"
              class="drink-badge"
            >
              {{ drink.badge }}
            </span>

            <button class="heart-button">
              <Heart :size="18" />
            </button>

          </div>


          <div class="drink-details">

            <span class="drink-category">
              {{ drink.category }}
            </span>

            <h3>{{ drink.name }}</h3>

            <p>
              {{ drink.description }}
            </p>


            <div class="drink-bottom">

              <strong>
                ${{ drink.price.toFixed(2) }}
              </strong>

              <button
                class="add-button"
                @click="addToCart(drink)"
              >
                <Plus :size="19" />
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>
/* ================= GENERAL ================= */
.home-page {
  background: #fdfbfb;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* ================= HERO SECTION (PINK THEME) ================= */
.hero-section {
  max-width: 1200px;
  min-height: 520px;
  margin: 30px auto 0;
  border-radius: 32px;
  /* Soft Pink Gradient ដូចក្នុងរូប */
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #f3e5f5 100%);
  border: 1px solid #f8bbd0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(233, 30, 99, 0.05);
}

/* Background Glow Effect */
.hero-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(233, 30, 99, 0.15) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
}

/* Hero Content Left */
.hero-content {
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.special-label {
  width: fit-content;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 30px;
  color: #d81b60;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(216, 27, 96, 0.08);
}

.hero-content h1 {
  font-size: clamp(44px, 4.5vw, 64px);
  line-height: 1.05;
  margin: 0 0 20px;
  color: #1a1a1a;
  font-weight: 900;
  letter-spacing: -2px;
}

.hero-content h1 span {
  color: #d81b60; /* Berry Pink accent */
}

.hero-description {
  color: #5a5a5a;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Hero Price & Badges */
.hero-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.hero-price strong {
  font-size: 38px;
  color: #d81b60;
  font-weight: 900;
}

.hero-price del {
  color: #9e9e9e;
  font-size: 20px;
}

.hero-price span {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #f48fb1;
  border-radius: 20px;
  color: #d81b60;
  font-size: 12px;
  font-weight: 800;
}

.offer-time {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border: 1px solid rgba(244, 143, 177, 0.5);
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  color: #d81b60;
  margin-bottom: 28px;
}

.offer-time div {
  display: flex;
  flex-direction: column;
}

.offer-time small {
  color: #757575;
  font-size: 10px;
  font-weight: 800;
}

.offer-time strong {
  color: #212121;
  font-size: 13px;
}

/* Hero Buttons */
.hero-buttons {
  display: flex;
  gap: 14px;
}

.order-btn {
  border: none;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: white;
  padding: 14px 28px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(233, 30, 99, 0.3);
  transition: all 0.25s ease;
}

.order-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(233, 30, 99, 0.4);
}

.favorite-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #f48fb1;
  background: white;
  border-radius: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d81b60;
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  background: #fce4ec;
  transform: translateY(-2px);
}

/* ================= HERO RIGHT IMAGE ================= */
.hero-image-area {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.circle-decoration {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  filter: blur(15px);
}

.hero-drink {
  width: 440px;
  height: 440px;
  object-fit: cover;
  border-radius: 28px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s ease;
}

.hero-drink:hover {
  transform: scale(1.02);
}

/* Ordered Badge (Deep Berry Red/Pink) */
.ordered-badge {
  position: absolute;
  top: 60px;
  right: 25px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  background: #c2185b;
  color: white;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 4px solid white;
  box-shadow: 0 10px 25px rgba(194, 24, 91, 0.35);
}

.ordered-badge strong { font-size: 24px; }
.ordered-badge span { font-size: 10px; line-height: 1.1; }

.drink-label {
  position: absolute;
  left: 300px;
  bottom: 50px;
  z-index: 4;
  width: 210px;
  background: rgba(236, 210, 231, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  padding: 14px 18px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(216, 27, 96, 0.08);
}

.drink-label strong { font-size: 15px; color: #111; display: block; }
.drink-label p { margin: 4px 0 0; color: #666; font-size: 12px; line-height: 1.3; }

/* ================= CATEGORIES ================= */
.categories-section {
  max-width: 1200px;
  margin: 35px auto 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
}

.category-item {
  min-height: 92px;
  border: 1px solid #f8bbd0;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.25s ease;
}

.category-item:hover {
  border-color: #f48fb1;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(233, 30, 99, 0.08);
  color: #d81b60;
}

.category-item.active {
  border: 2px solid #d81b60;
  background: #fce4ec;
  color: #d81b60;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.12);
}

.category-icon { font-size: 24px; }
.category-item span { font-size: 12px; font-weight: 700; }

/* ================= POPULAR SECTION ================= */
.popular-section {
  max-width: 1200px;
  margin: 60px auto 0;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
}

.section-small-title {
  color: #d81b60;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.section-header h2 { margin: 4px 0 0; font-size: 32px; font-weight: 800; color: #111; }
.section-header p { margin: 6px 0 0; color: #777; font-size: 14px; }

.view-all {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #d81b60;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: transform 0.2s ease;
}

.view-all:hover { transform: translateX(3px); }

/* ================= DRINK GRID & CARDS ================= */
.drink-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.drink-card {
  background: white;
  border: 1px solid #f8bbd0;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.drink-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 35px rgba(233, 30, 99, 0.08);
  border-color: #f48fb1;
}

.drink-image-wrapper {
  height: 200px;
  background: #fcf8f9;
  position: relative;
  overflow: hidden;
}

.drink-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.drink-card:hover img { transform: scale(1.06); }

.drink-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #d81b60;
  color: white;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
}

.heart-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #d81b60;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s ease;
}

.heart-button:hover { transform: scale(1.1); }

.drink-details { padding: 16px; }

.drink-category {
  color: #b0bec5;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
}

.drink-details h3 {
  font-size: 15px;
  font-weight: 700;
  margin: 6px 0;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drink-details p {
  color: #757575;
  font-size: 12px;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
  margin: 0 0 14px;
}

.drink-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drink-bottom strong { font-size: 18px; color: #111; font-weight: 800; }

.add-button {
  width: 36px;
  height: 36px;
  border: none;
  background: #fce4ec;
  color: #d81b60;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #d81b60;
  color: white;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 1000px) {
  .hero-section { margin: 20px; grid-template-columns: 1fr; }
  .categories-section { margin: 20px; grid-template-columns: repeat(4, 1fr); }
  .popular-section { margin: 40px 20px; }
  .drink-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 650px) {
  .hero-content { padding: 35px 25px; }
  .hero-drink { width: 280px; height: 330px; }
  .categories-section { grid-template-columns: repeat(2, 1fr); }
  .drink-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>