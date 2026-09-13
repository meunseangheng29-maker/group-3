
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

import { useCart } from '../stores/cart'


// =====================================================
// CART
// =====================================================

const { addToCart: addDrinkToCart } = useCart()


// =====================================================
// SEARCH
// =====================================================

const search = ref('')


// =====================================================
// CATEGORY
// =====================================================

const selectedCategory = ref('All Drinks')

const categories = [
  'All Drinks',
  'Milk Tea',
  'Coffee',
  'Fruit Tea',
  'Smoothie',
  'Juice',
  'Matcha',
  'Specials'
]


// =====================================================
// FILTER DRINKS
// =====================================================

const filteredDrinks = computed(() => {

  return drinks.filter((drink) => {

    // Category filter
    const matchCategory =
      selectedCategory.value === 'All Drinks' ||
      drink.category === selectedCategory.value


    // Search filter
    const matchSearch =
      drink.name
        .toLowerCase()
        .includes(
          search.value.toLowerCase()
        )


    return matchCategory && matchSearch

  })

})


// =====================================================
// TOAST
// =====================================================

const toastMessage = ref('')


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(drink: Drink) {

  // Add drink to cart
  addDrinkToCart(drink)

  // Show message
  toastMessage.value =
    `${drink.name} added to cart`


  // Hide message after 2.5 seconds
  setTimeout(() => {

    toastMessage.value = ''

  }, 2500)

}

</script>


<template>

  <main class="drinks-page">


    <!-- ================================================= -->
    <!-- HERO -->
    <!-- ================================================= -->

    <section class="drinks-hero">

      <div class="drinks-hero-content">

        <span class="hero-label">
          EXPLORE OUR MENU
        </span>


        <h1>
          Our
          <span>Drinks</span>
        </h1>


        <p>
          Find your perfect drink and enjoy every sip.
        </p>

      </div>

    </section>



    <!-- ================================================= -->
    <!-- MENU CONTROLS -->
    <!-- ================================================= -->

    <section class="menu-controls">


      <!-- ================= SEARCH ================= -->

      <div class="search-box">

        <Search :size="20" />

        <input
          v-model="search"
          type="text"
          placeholder="Search drinks..."
        />

      </div>



      <!-- ================= CATEGORY FILTER ================= -->

      <div class="filter-section">

        <button
          v-for="category in categories"
          :key="category"

          :class="{
            active:
              selectedCategory === category
          }"

          @click="
            selectedCategory = category
          "
        >

          {{ category }}

        </button>

      </div>

    </section>



    <!-- ================================================= -->
    <!-- DRINKS -->
    <!-- ================================================= -->

    <section
      v-if="filteredDrinks.length > 0"
      class="drink-grid"
    >

      <DrinkCard
        v-for="drink in filteredDrinks"

        :key="drink.id"

        :drink="drink"

        @add="addToCart"
      />

    </section>



    <!-- ================================================= -->
    <!-- NO RESULT -->
    <!-- ================================================= -->

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



    <!-- ================================================= -->
    <!-- TOAST -->
    <!-- ================================================= -->

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



<style scoped>


/* ===================================================== */
/* MAIN LAYOUT */
/* ===================================================== */

.drinks-page {

  min-height: 100vh;

  background: #fdfbfb;

  color: #222;

}



/* ===================================================== */
/* HERO */
/* ===================================================== */

.drinks-hero {

  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f8bbd0 50%,
      #f3e5f5 100%
    );

  padding: 85px 20px;

  text-align: center;

  border-bottom:
    1px solid #f8bbd0;

  margin-bottom: 45px;

}


.drinks-hero-content {

  max-width: 800px;

  margin: 0 auto;

}



/* ===================================================== */
/* HERO LABEL */
/* ===================================================== */

.hero-label {

  display: inline-block;

  padding: 7px 16px;

  border-radius: 20px;

  background: white;

  color: #d81b60;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 1.5px;

  margin-bottom: 18px;

  box-shadow:
    0 4px 15px
    rgba(216, 27, 96, 0.08);

}



/* ===================================================== */
/* HERO TITLE */
/* ===================================================== */

.drinks-hero h1 {

  font-size: 48px;

  line-height: 1.15;

  margin:
    0 auto 20px;

  color: #251014;

  font-weight: 900;

  letter-spacing: -1px;

}


.drinks-hero h1 span {

  color: #d81b60;

  display: block;

}



/* ===================================================== */
/* HERO DESCRIPTION */
/* ===================================================== */

.drinks-hero p {

  max-width: 650px;

  margin: 0 auto;

  color: #666;

  font-size: 17px;

  line-height: 1.7;

}



/* ===================================================== */
/* MENU CONTROLS */
/* ===================================================== */

.menu-controls {

  max-width: 1200px;

  margin:
    0 auto 25px;

  padding:
    0 20px;

}



/* ===================================================== */
/* SEARCH BOX */
/* ===================================================== */

.search-box {

  display: flex;

  align-items: center;

  gap: 10px;

  background: #ffffff;

  border:
    1px solid #f8bbd0;

  padding:
    10px 18px;

  border-radius: 16px;

  width: 100%;

  max-width: 400px;

  color: #d81b60;

  transition:
    all 0.25s ease;

  box-shadow:
    0 4px 12px
    rgba(216, 27, 96, 0.03);

  margin-bottom: 18px;

}


.search-box:focus-within {

  border-color: #d81b60;

  box-shadow:
    0 0 0 3px
    rgba(216, 27, 96, 0.12);

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



/* ===================================================== */
/* CATEGORY FILTER */
/* ===================================================== */

.filter-section {

  display: flex;

  align-items: center;

  gap: 10px;

  overflow-x: auto;

  padding-bottom: 12px;

  scrollbar-width: none;

}


.filter-section::-webkit-scrollbar {

  display: none;

}



/* ===================================================== */
/* CATEGORY BUTTON */
/* ===================================================== */

.filter-section button {

  padding:
    10px 20px;

  border-radius: 12px;

  border:
    1px solid #f8bbd0;

  background: #ffffff;

  color: #555555;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  white-space: nowrap;

  transition:
    all 0.25s ease;

}


.filter-section button:hover {

  border-color: #f48fb1;

  color: #d81b60;

  background: #fdf2f8;

}


.filter-section button.active {

  background:
    linear-gradient(
      135deg,
      #e91e63 0%,
      #d81b60 100%
    );

  border-color: #d81b60;

  color: #ffffff;

  box-shadow:
    0 6px 16px
    rgba(216, 27, 96, 0.25);

}



/* ===================================================== */
/* DRINKS GRID */
/* ===================================================== */

.drink-grid {

  max-width: 1200px;

  margin:
    0 auto;

  padding:
    0 20px 60px;

  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(240px, 1fr)
    );

  gap: 24px;

}



/* ===================================================== */
/* NO RESULT */
/* ===================================================== */

.no-result {

  text-align: center;

  padding:
    60px 20px;

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



/* ===================================================== */
/* TOAST */
/* ===================================================== */

.toast {

  position: fixed;

  bottom: 30px;

  right: 30px;

  background: #111111;

  color: #ffffff;

  padding:
    12px 20px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 14px;

  font-weight: 700;

  box-shadow:
    0 10px 25px
    rgba(0, 0, 0, 0.2);

  z-index: 100;

  border-left:
    4px solid #d81b60;

}


.toast svg {

  color: #4caf50;

}



/* ===================================================== */
/* TOAST ANIMATION */
/* ===================================================== */

.toast-enter-active,
.toast-leave-active {

  transition:
    all 0.3s
    cubic-bezier(
      0.4,
      0,
      0.2,
      1
    );

}


.toast-enter-from,
.toast-leave-to {

  opacity: 0;

  transform:
    translateY(20px)
    scale(0.95);

}



/* ===================================================== */
/* RESPONSIVE */
/* ===================================================== */

@media (max-width: 768px) {

  .drinks-hero {

    padding:
      60px 20px;

  }


  .drinks-hero h1 {

    font-size: 38px;

  }


  .drinks-hero p {

    font-size: 15px;

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

