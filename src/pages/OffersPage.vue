<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  Heart,
  ShoppingBag,
  ArrowRight
} from 'lucide-vue-next'

import { drinks } from '../data/Drink'
import type { Drink } from '../data/Drink'
import { useCart } from '../stores/cart'

// =========================
// CART
// =========================
const { addToCart: addDrinkToCart } = useCart()

// =========================
// OFFERS
// =========================
const offers = computed(() => {
  return drinks.filter(
    drink => drink.originalPrice !== undefined
  )
})

// =========================
// DISCOUNT
// =========================
function discountPercent(
  price: number,
  originalPrice: number
) {
  return Math.round(
    ((originalPrice - price) / originalPrice) * 100
  )
}

// =========================
// ADD TO CART
// =========================
function addToCart(drink: Drink) {
  addDrinkToCart({
    ...drink,
    image: drink.image
  })
}

// =========================
// ORDER NOW
// =========================
function handleOrderNow() {
  if (offers.value.length === 0) {
    return
  }

  const drink = offers.value[0]

  // Add the featured drink with its image
  addDrinkToCart({
    ...drink,
    image: drink.image
  })
}

// =========================
// FAVORITES
// =========================
const favorites = ref<number[]>([])

function isFavorite(id: number) {
  return favorites.value.includes(id)
}

function toggleFavorite(id: number) {
  if (isFavorite(id)) {
    favorites.value = favorites.value.filter(
      item => item !== id
    )
  } else {
    favorites.value.push(id)
  }
}
</script>

<template>
  <main class="offers-page">

    <!-- ================================================= -->
    <!-- HERO -->
    <!-- ================================================= -->

    <section class="offers-hero">
      <div class="offers-hero-content">

        <span class="hero-label">
          SPECIAL OFFERS
        </span>

        <h1>
          Great Drinks,
          <span>Better Prices</span>
        </h1>

        <p>
          Enjoy your favorite drinks with
          special discounts.
        </p>

        

      </div>
    </section>


    <!-- ================================================= -->
    <!-- FEATURED OFFER -->
    <!-- ================================================= -->

    <section
      v-if="offers.length > 0"
      class="featured-section"
    >

      <div class="section-title">
        <span>
          FEATURED OFFER
        </span>

        <h2>
          Today's Special
        </h2>
      </div>


      <div class="featured-card">

        <!-- IMAGE -->

        <div class="featured-image">

          <img
            :src="offers[0].image"
            :alt="offers[0].name"
          />

          <div class="discount-badge">
            -{{
              discountPercent(
                offers[0].price,
                offers[0].originalPrice!
              )
            }}%
          </div>

        </div>


        <!-- INFORMATION -->

        <div class="featured-info">

          <span class="offer-label">
            {{ offers[0].category }}
          </span>

          <h3>
            {{ offers[0].name }}
          </h3>

          <p>
            {{ offers[0].description }}
          </p>


          <!-- PRICE -->

          <div class="price">

            <span class="old-price">
              ${{ offers[0].originalPrice?.toFixed(2) }}
            </span>

            <span class="current-price">
              ${{ offers[0].price.toFixed(2) }}
            </span>

          </div>


          <!-- ADD TO CART -->

          <button
            class="featured-buy"
            @click="addToCart(offers[0])"
          >
            <ShoppingBag :size="19" />
            Add to Cart
          </button>

        </div>

      </div>

    </section>


    <!-- ================================================= -->
    <!-- ALL OFFERS -->
    <!-- ================================================= -->

    <section class="offers-section">

      <div class="section-title">

        <span>
          MORE DEALS
        </span>

        <h2>
          All Offers
        </h2>

      </div>


      <div class="offers-grid">

        <article
          v-for="drink in offers"
          :key="drink.id"
          class="offer-card"
        >

          <!-- IMAGE -->

          <div class="offer-image">

            <img
              :src="drink.image"
              :alt="drink.name"
            />


            <!-- DISCOUNT -->

            <div class="discount-badge">
              -{{
                discountPercent(
                  drink.price,
                  drink.originalPrice!
                )
              }}%
            </div>


            <!-- FAVORITE -->

            <button
              class="heart-btn"
              @click="toggleFavorite(drink.id)"
            >

              <Heart
                :size="19"
                :fill="
                  isFavorite(drink.id)
                    ? 'currentColor'
                    : 'none'
                "
              />

            </button>

          </div>


          <!-- INFORMATION -->

          <div class="offer-info">

            <span class="offer-label">
              {{ drink.category }}
            </span>

            <h3>
              {{ drink.name }}
            </h3>

            <p>
              {{ drink.description }}
            </p>


            <div class="card-bottom">

              <!-- PRICE -->

              <div class="price">

                <span class="old-price">
                  ${{ drink.originalPrice?.toFixed(2) }}
                </span>

                <span class="current-price">
                  ${{ drink.price.toFixed(2) }}
                </span>

              </div>


              <!-- SHOPPING BAG -->

              <button
                class="plus-btn"
                @click="addToCart(drink)"
              >

                <ShoppingBag :size="20" />

              </button>

            </div>

          </div>

        </article>

      </div>

    </section>

  </main>
</template>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.offers-page {
  min-height: 100vh;
  background: #fdfbfb;
  color: #222;
}


/* =====================================================
   HERO
===================================================== */

.offers-hero {
  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f8bbd0 50%,
      #f3e5f5 100%
    );

  padding: 85px 20px;

  text-align: center;

  border-bottom: 1px solid #f8bbd0;

  margin-bottom: 45px;
}


.offers-hero-content {
  max-width: 800px;
  margin: 0 auto;
}


/* =====================================================
   HERO LABEL
===================================================== */

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


/* =====================================================
   HERO TITLE
===================================================== */

.offers-hero h1 {
  font-size: 48px;

  line-height: 1.15;

  margin: 0 auto 20px;

  color: #251014;

  font-weight: 900;

  letter-spacing: -1px;
}


.offers-hero h1 span {
  color: #d81b60;

  display: block;
}


/* =====================================================
   HERO DESCRIPTION
===================================================== */

.offers-hero p {
  max-width: 650px;

  margin: 0 auto;

  color: #666;

  font-size: 17px;

  line-height: 1.7;
}


/* =====================================================
   HERO BUTTON
===================================================== */

.hero-button {
  margin-top: 25px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  padding: 12px 22px;

  border: 1px solid #d81b60;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #e91e63 0%,
      #d81b60 100%
    );

  color: white;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.25s ease;
}


.hero-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(216, 27, 96, 0.2);
}


/* =====================================================
   SECTION
===================================================== */

.featured-section,
.offers-section {
  max-width: 1200px;

  margin: 0 auto;

  padding: 20px 20px 60px;
}


/* =====================================================
   SECTION TITLE
===================================================== */

.section-title {
  margin-bottom: 30px;
}


.section-title span {
  color: #d81b60;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 1.5px;
}


.section-title h2 {
  margin: 8px 0 0;

  color: #251014;

  font-size: 30px;

  font-weight: 900;
}


/* =====================================================
   FEATURED CARD
===================================================== */

.featured-card {
  display: grid;

  grid-template-columns: 1fr 1fr;

  background: #ffffff;

  border: 1px solid #f8bbd0;

  border-radius: 20px;

  overflow: hidden;

  box-shadow:
    0 8px 25px
    rgba(216, 27, 96, 0.07);
}


/* =====================================================
   FEATURED IMAGE
===================================================== */

.featured-image {
  position: relative;

  height: 400px;
}


.featured-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;
}


/* =====================================================
   FEATURED INFORMATION
===================================================== */

.featured-info {
  padding: 40px;

  display: flex;

  flex-direction: column;

  justify-content: center;
}


.offer-label {
  color: #d81b60;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 1.5px;
}


.featured-info h3 {
  margin: 12px 0;

  color: #251014;

  font-size: 32px;

  font-weight: 900;
}


.featured-info p {
  color: #666;

  line-height: 1.7;

  font-size: 15px;
}


/* =====================================================
   DISCOUNT BADGE
===================================================== */

.discount-badge {
  position: absolute;

  top: 15px;

  left: 15px;

  padding: 7px 12px;

  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      #e91e63 0%,
      #d81b60 100%
    );

  color: white;

  font-size: 12px;

  font-weight: 800;

  box-shadow:
    0 5px 15px
    rgba(216, 27, 96, 0.2);
}


/* =====================================================
   PRICE
===================================================== */

.price {
  display: flex;

  align-items: center;

  gap: 10px;

  margin: 15px 0;
}


.current-price {
  color: #d81b60;

  font-size: 20px;

  font-weight: 900;
}


.old-price {
  color: #999;

  font-size: 14px;

  text-decoration: line-through;
}


/* =====================================================
   FEATURED BUY BUTTON
===================================================== */

.featured-buy {
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  width: fit-content;

  padding: 11px 20px;

  border: 1px solid #d81b60;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #e91e63 0%,
      #d81b60 100%
    );

  color: white;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

  box-shadow:
    0 6px 16px
    rgba(216, 27, 96, 0.2);

  transition: all 0.25s ease;
}


.featured-buy:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(216, 27, 96, 0.25);
}


/* =====================================================
   OFFERS GRID
===================================================== */

.offers-grid {
  display: grid;

  grid-template-columns:
    repeat(
      auto-fill,
      minmax(240px, 1fr)
    );

  gap: 24px;
}


/* =====================================================
   OFFER CARD
===================================================== */

.offer-card {
  background: #ffffff;

  border: 1px solid #f8bbd0;

  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 6px 20px
    rgba(216, 27, 96, 0.05);

  transition: all 0.25s ease;
}


.offer-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 10px 25px
    rgba(216, 27, 96, 0.10);
}


/* =====================================================
   OFFER IMAGE
===================================================== */

.offer-image {
  position: relative;

  height: 230px;

  overflow: hidden;
}


.offer-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;

  transition: transform 0.3s ease;
}


.offer-card:hover .offer-image img {
  transform: scale(1.04);
}


/* =====================================================
   HEART BUTTON
===================================================== */

.heart-btn {
  position: absolute;

  top: 15px;

  right: 15px;

  width: 40px;

  height: 40px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid #f8bbd0;

  border-radius: 50%;

  background: #ffffff;

  color: #d81b60;

  cursor: pointer;

  z-index: 5;

  transition: all 0.25s ease;
}


.heart-btn:hover {
  background: #fdf2f8;

  transform: scale(1.05);
}


/* =====================================================
   OFFER INFO
===================================================== */

.offer-info {
  padding: 20px;
}


.offer-info h3 {
  margin: 0 0 8px;

  color: #251014;

  font-size: 19px;

  font-weight: 800;
}


.offer-info p {
  color: #666;

  font-size: 14px;

  line-height: 1.5;

  min-height: 42px;

  margin: 0;
}


/* =====================================================
   CARD BOTTOM
===================================================== */

.card-bottom {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: 15px;
}


.card-bottom .price {
  margin: 0;

  align-items: flex-start;

  flex-direction: column;

  gap: 2px;
}


/* =====================================================
   SHOPPING BAG
===================================================== */

.plus-btn {
  width: 42px;

  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid #d81b60;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #e91e63 0%,
      #d81b60 100%
    );

  color: white;

  cursor: pointer;

  transition: all 0.25s ease;
}


.plus-btn:hover {
  transform:
    translateY(-2px)
    scale(1.03);

  box-shadow:
    0 6px 16px
    rgba(216, 27, 96, 0.25);
}


.plus-btn svg {
  pointer-events: none;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media (max-width: 768px) {

  .offers-hero {
    padding: 60px 20px;
  }


  .offers-hero h1 {
    font-size: 38px;
  }


  .offers-hero p {
    font-size: 15px;
  }


  .featured-card {
    grid-template-columns: 1fr;
  }


  .featured-image {
    height: 300px;
  }


  .featured-info {
    padding: 30px;
  }


  .offers-grid {
    grid-template-columns:
      repeat(
        auto-fill,
        minmax(220px, 1fr)
      );
  }

}

</style>