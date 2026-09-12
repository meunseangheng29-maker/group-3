<template>

  <main class="drinks-page">

    <section class="page-header">

      <div>

        <p class="section-small">
          EXPLORE OUR MENU
        </p>

        <h1>
          Our Drinks
        </h1>

        <p>
          Find your perfect drink and enjoy every sip.
        </p>

      </div>

      <div class="search-box">

        <Search :size="20" />

        <input
          v-model="search"
          type="text"
          placeholder="Search drinks..."
        />

      </div>

    </section>


    <!-- CATEGORY FILTER -->

    <section class="filter-section">

      <button
        v-for="category in categories"
        :key="category"
        :class="{
          active: selectedCategory === category
        }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>

    </section>


    <!-- DRINKS -->

    <section class="drink-grid">

      <DrinkCard
        v-for="drink in filteredDrinks"
        :key="drink.id"
        :drink="drink"
        @add="addToCart"
      />

    </section>


    <div
      v-if="filteredDrinks.length === 0"
      class="no-result"
    >

      <SearchX :size="45" />

      <h2>
        No drinks found
      </h2>

      <p>
        Try another drink name or category.
      </p>

    </div>


    <Transition name="toast">

      <div
        v-if="toastMessage"
        class="toast"
      >
        <CircleCheck :size="20" />
        {{ toastMessage }}
      </div>

    </Transition>

  </main>

</template>

<script setup lang="ts">

import {
  computed,
  ref
} from 'vue'

import {
  Search,
  SearchX,
  CircleCheck
} from 'lucide-vue-next'

import DrinkCard from '../components/DrinkCard.vue'

import {
  drinks
} from '../data/Drink'

import type {
  Drink
} from '../data/Drink'

const search = ref('')
const selectedCategory = ref('All Drinks')
const toastMessage = ref('')

const categories = [
  'All Drinks',
  'Milk Tea',
  'Coffee',
  'Fruit Tea',
  'Smoothie',
  'Juice',
  'Matcha'
]

const filteredDrinks = computed(() => {

  return drinks.filter(drink => {

    const matchCategory =
      selectedCategory.value === 'All Drinks' ||
      drink.category === selectedCategory.value

    const matchSearch =
      drink.name
        .toLowerCase()
        .includes(search.value.toLowerCase())

    return matchCategory && matchSearch

  })

})

function addToCart(drink: Drink) {

  toastMessage.value =
    `${drink.name} added to cart`

  setTimeout(() => {
    toastMessage.value = ''
  }, 2500)

}

</script>

<style scoped>
/* ================= MAIN LAYOUT ================= */
.drinks-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  min-height: 85vh;
}

/* ================= PAGE HEADER & SEARCH ================= */
.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.section-small {
  font-size: 11px;
  font-weight: 800;
  color: #f48fb1;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 8px 0;
}

.page-header h1 {
  font-size: 36px;
  font-weight: 900;
  color: #111111;
  margin: 0 0 8px 0;
}

.page-header p {
  font-size: 15px;
  color: #666666;
  margin: 0;
  font-weight: 500;
}

/* SEARCH BOX */
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #f8bbd0;
  padding: 10px 18px;
  border-radius: 16px;
  width: 100%;
  max-width: 320px;
  color: #d81b60;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(216, 27, 96, 0.03);
}

.search-box:focus-within {
  border-color: #d81b60;
  box-shadow: 0 0 0 3px rgba(216, 27, 96, 0.12);
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #1a1a1a;
  background: transparent;
  font-family: inherit;
}

.search-box input::placeholder {
  color: #aaa;
}

/* ================= CATEGORY FILTER BUTTONS ================= */
.filter-section {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 32px;
  scrollbar-width: none; /* Hide scrollbar Firefox */
}

.filter-section::-webkit-scrollbar {
  display: none; /* Hide scrollbar Chrome/Safari */
}

.filter-section button {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid #f8bbd0;
  background: #ffffff;
  color: #555555;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
}

.filter-section button:hover {
  border-color: #f48fb1;
  color: #d81b60;
  background: #fdf2f8;
}

.filter-section button.active {
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  border-color: #d81b60;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(216, 27, 96, 0.25);
}

/* ================= DRINKS GRID ================= */
.drink-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

/* ================= NO RESULT STATE ================= */
.no-result {
  text-align: center;
  padding: 60px 20px;
  color: #888888;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.no-result svg {
  color: #f48fb1;
}

.no-result h2 {
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
}

.no-result p {
  font-size: 14px;
  color: #666666;
  margin: 0;
}

/* ================= TOAST NOTIFICATION ================= */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #111111;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 100;
  border-left: 4px solid #d81b60;
}

.toast svg {
  color: #4caf50;
}

/* Toast Transition Animation */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    max-width: 100%;
  }

  .toast {
    left: 20px;
    right: 20px;
    bottom: 20px;
    justify-content: center;
  }
}
</style>