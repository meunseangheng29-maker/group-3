<script setup lang="ts">
import {
  Heart,
  ShoppingBag,
  ArrowRight
} from 'lucide-vue-next'

import { computed, ref } from 'vue'

import { drinks } from '../data/Drink'
import { useCart } from '../stores/cart'


// =====================================================
// CART
// =====================================================

const { addToCart } = useCart()


// =====================================================
// OFFERS
// =====================================================

const offers = computed(() => {
  return drinks.filter(drink => drink.originalPrice)
})


// =====================================================
// DISCOUNT
// =====================================================

function discountPercent(
  price: number,
  originalPrice: number
) {
  return Math.round(
    ((originalPrice - price) / originalPrice) * 100
  )
}


// =====================================================
// FAVORITES
// =====================================================

const favorites = ref<number[]>([])

function isFavorite(drinkId: number) {
  return favorites.value.includes(drinkId)
}

function toggleFavorite(drinkId: number) {
  if (isFavorite(drinkId)) {
    favorites.value = favorites.value.filter(
      id => id !== drinkId
    )
  } else {
    favorites.value.push(drinkId)
  }
}
</script>


<template>

  <main class="offers-page">


    <!-- =================================================
         HERO
    ================================================= -->

    <section class="offers-hero">

      <div class="hero-label">
        ✨ LIMITED TIME OFFERS
      </div>

      <h1>
        Special
        <span>Offers</span>
      </h1>

      <p>
        Treat yourself to something delicious.
        Enjoy our best drinks at special prices.
      </p>

    </section>



    <!-- =================================================
         FEATURED OFFER
    ================================================= -->

    <section
      v-if="offers.length > 0"
      class="featured-offer"
    >


      <!-- IMAGE -->

      <div class="featured-image">

        <img
          :src="offers[0].image"
          :alt="offers[0].name"
        />


        <!-- DISCOUNT -->

        <div class="discount-circle">

          <strong>
            {{
              discountPercent(
                offers[0].price,
                offers[0].originalPrice!
              )
            }}%
          </strong>

          <span>
            OFF
          </span>

        </div>

      </div>



      <!-- CONTENT -->

      <div class="featured-content">

        <span class="featured-label">
          TODAY'S SPECIAL
        </span>


        <h2>
          {{ offers[0].name }}
        </h2>


        <p>
          {{ offers[0].description }}
        </p>


        <!-- PRICE -->

        <div class="featured-price">

          <strong>
            ${{ offers[0].price.toFixed(2) }}
          </strong>

          <del>
            ${{ offers[0].originalPrice?.toFixed(2) }}
          </del>

        </div>


        <!-- ACTIONS -->

        <div class="featured-actions">


          <!-- ORDER NOW -->

          <RouterLink
            to="/drinks"
            class="buy-btn"
          >

            Order Now

            <ShoppingBag :size="18" />

          </RouterLink>


          <!-- FAVORITE -->

          <button
            class="heart-btn"
            @click="toggleFavorite(offers[0].id)"
            title="Add to favorites"
          >

            <Heart
              :size="21"
              :fill="
                isFavorite(offers[0].id)
                  ? 'currentColor'
                  : 'none'
              "
            />

          </button>

        </div>

      </div>

    </section>



    <!-- =================================================
         ALL OFFERS
    ================================================= -->

    <section class="all-offers">


      <!-- SECTION TITLE -->

      <div class="section-title">

        <div>

          <span>
            MORE DEALS
          </span>

          <h2>
            Grab Your Favorite
          </h2>

        </div>


        <RouterLink to="/drinks">

          View all drinks

          <ArrowRight :size="17" />

        </RouterLink>

      </div>



      <!-- =================================================
           OFFERS GRID
      ================================================= -->

      <div
        v-if="offers.length > 0"
        class="offers-grid"
      >


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


            <!-- SALE -->

            <span class="sale-badge">

              {{
                discountPercent(
                  drink.price,
                  drink.originalPrice!
                )
              }}% OFF

            </span>


            <!-- HEART -->

            <button
              class="card-heart"
              @click="toggleFavorite(drink.id)"
              title="Add to favorites"
            >

              <Heart
                :size="18"
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


            <!-- CATEGORY -->

            <span class="category">
              {{ drink.category }}
            </span>


            <!-- NAME -->

            <h3>
              {{ drink.name }}
            </h3>


            <!-- DESCRIPTION -->

            <p>
              {{ drink.description }}
            </p>


            <!-- FOOTER -->

            <div class="offer-footer">


              <!-- PRICE -->

              <div class="prices">

                <strong>
                  ${{ drink.price.toFixed(2) }}
                </strong>

                <del>
                  ${{ drink.originalPrice?.toFixed(2) }}
                </del>

              </div>


              <!-- ADD TO CART -->

              <button
                class="plus-btn"
                @click="addToCart(drink)"
                title="Add to cart"
              >

                <ShoppingBag :size="18" />

              </button>

            </div>

          </div>

        </article>

      </div>



      <!-- =================================================
           NO OFFERS
      ================================================= -->

      <div
        v-else
        class="no-offers"
      >

        <h2>
          No offers available
        </h2>

        <p>
          Please check again later for special offers.
        </p>


        <RouterLink to="/drinks">
          Browse Drinks
        </RouterLink>

      </div>

    </section>

  </main>

</template>


<style scoped>

/* =====================================================
   PAGE
===================================================== */

.offers-page {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
}


/* =====================================================
   HERO
===================================================== */

.offers-hero {
  min-height: 520px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  text-align: center;

  padding: 70px 20px;

  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f3c1d5 50%,
      #f8dce9 100%
    );

  position: relative;

  overflow: hidden;
}


/* Decorative circle */

.offers-hero::before {
  content: "";

  position: absolute;

  width: 350px;
  height: 350px;

  border-radius: 50%;

  background: rgba(
    255,
    255,
    255,
    0.15
  );

  top: -180px;
  left: -100px;
}


.offers-hero::after {
  content: "";

  position: absolute;

  width: 300px;
  height: 300px;

  border-radius: 50%;

  background: rgba(
    255,
    255,
    255,
    0.12
  );

  bottom: -150px;
  right: -80px;
}


/* =====================================================
   HERO LABEL
===================================================== */

.hero-label {
  position: relative;

  z-index: 2;

  background: #ffffff;

  color: #c92f61;

  padding: 11px 40px;

  border-radius: 30px;

  font-size: 14px;

  font-weight: 800;

  letter-spacing: 2px;

  margin-bottom: 28px;

  box-shadow:
    0 8px 25px rgba(
      0,
      0,
      0,
      0.05
    );
}


/* =====================================================
   HERO TITLE
===================================================== */

.offers-hero h1 {
  position: relative;

  z-index: 2;

  margin: 0;

  font-size: 64px;

  line-height: 1.05;

  font-weight: 900;

  color: #18090e;

  letter-spacing: -2px;
}


.offers-hero h1 span {
  display: block;

  color: #ce3764;
}


/* =====================================================
   HERO DESCRIPTION
===================================================== */

.offers-hero p {
  position: relative;

  z-index: 2;

  max-width: 700px;

  margin: 28px auto 0;

  font-size: 18px;

  line-height: 1.7;

  color: #666666;
}


/* =====================================================
   FEATURE OFFER
===================================================== */

.featured-offer {
  max-width: 1200px;

  margin: 60px auto 70px;

  display: grid;

  grid-template-columns:
    1.1fr 1fr;

  background:
    linear-gradient(
      135deg,
      #fff2e5,
      #fffaf6
    );

  border-radius: 25px;

  overflow: hidden;

  min-height: 380px;
}


/* =====================================================
   FEATURE IMAGE
===================================================== */

.featured-image {
  position: relative;

  min-height: 380px;
}


.featured-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}


/* =====================================================
   DISCOUNT CIRCLE
===================================================== */

.discount-circle {
  position: absolute;

  top: 25px;
  left: 25px;

  width: 90px;
  height: 90px;

  border-radius: 50%;

  background: #df0874;

  color: white;

  border: 4px solid white;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  box-shadow:
    0 8px 20px rgba(
      0,
      0,
      0,
      0.15
    );
}


.discount-circle strong {
  font-size: 24px;
}


.discount-circle span {
  font-size: 10px;

  font-weight: 700;
}


/* =====================================================
   FEATURE CONTENT
===================================================== */

.featured-content {
  padding: 50px;

  display: flex;

  flex-direction: column;

  justify-content: center;
}


.featured-label {
  width: fit-content;

  background: #ffe1cb;

  color: #df0874;

  padding: 7px 12px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: 800;
}


.featured-content h2 {
  font-size: 38px;

  margin: 15px 0 10px;

  line-height: 1.1;
}


.featured-content p {
  color: #666666;

  line-height: 1.6;

  max-width: 420px;

  font-size: 14px;
}


/* =====================================================
   FEATURE PRICE
===================================================== */

.featured-price {
  display: flex;

  align-items: center;

  gap: 14px;

  margin: 12px 0 25px;
}


.featured-price strong {
  font-size: 32px;

  color: #df0874;
}


.featured-price del {
  color: #888888;

  font-size: 18px;
}


/* =====================================================
   FEATURE BUTTONS
===================================================== */

.featured-actions {
  display: flex;

  gap: 10px;
}


/* =====================================================
   ORDER NOW
===================================================== */

.buy-btn {
  border: none;

  background: #df0874;

  color: white;

  border-radius: 11px;

  padding: 14px 23px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  font-weight: 700;

  cursor: pointer;

  text-decoration: none;

  transition: 0.2s;
}


.buy-btn:hover {
  background: #c51665;

  transform: translateY(-2px);
}


/* =====================================================
   FEATURE HEART
===================================================== */

.heart-btn {
  width: 49px;
  height: 49px;

  border: none;

  background: white;

  color: #df0874;

  border-radius: 11px;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  transition: 0.2s;
}


.heart-btn:hover {
  background: #fff0f6;

  transform: scale(1.05);
}


/* =====================================================
   ALL OFFERS
===================================================== */

.all-offers {
  max-width: 1200px;

  margin: 0 auto;

  padding: 0 20px 80px;
}


/* =====================================================
   SECTION TITLE
===================================================== */

.section-title {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  margin-bottom: 23px;
}


.section-title span {
  color: #df0874;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: 1.5px;
}


.section-title h2 {
  margin: 5px 0 0;

  font-size: 29px;

  color: #111111;
}


.section-title a {
  display: flex;

  align-items: center;

  gap: 5px;

  color: #df0874;

  text-decoration: none;

  font-size: 14px;

  font-weight: 700;

  transition: 0.2s;
}


.section-title a:hover {
  gap: 9px;
}


/* =====================================================
   OFFERS GRID
===================================================== */

.offers-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 22px;
}


/* =====================================================
   OFFER CARD
===================================================== */

.offer-card {
  border: 1px solid #eeeeee;

  border-radius: 18px;

  overflow: hidden;

  background: white;

  transition: 0.25s;
}


.offer-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 15px 35px rgba(
      0,
      0,
      0,
      0.09
    );
}


/* =====================================================
   OFFER IMAGE
===================================================== */

.offer-image {
  height: 260px;

  position: relative;

  background: #f7f7f7;

  overflow: hidden;
}


.offer-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: 0.3s;
}


.offer-card:hover
.offer-image img {
  transform: scale(1.05);
}


/* =====================================================
   SALE BADGE
===================================================== */

.sale-badge {
  position: absolute;

  top: 13px;
  left: 13px;

  background: #df0874;

  color: white;

  padding: 6px 10px;

  border-radius: 7px;

  font-size: 10px;

  font-weight: 800;
}


/* =====================================================
   CARD HEART
===================================================== */

.card-heart {
  position: absolute;

  top: 11px;
  right: 11px;

  width: 36px;
  height: 36px;

  border: none;

  background: white;

  color: #df0874;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  box-shadow:
    0 4px 12px rgba(
      0,
      0,
      0,
      0.1
    );

  transition: 0.2s;
}


.card-heart:hover {
  transform: scale(1.1);

  background: #fff0f6;
}


/* =====================================================
   OFFER INFORMATION
===================================================== */

.offer-info {
  padding: 18px;
}


.category {
  color: #999999;

  font-size: 9px;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 1px;
}


.offer-info h3 {
  font-size: 18px;

  margin: 6px 0;

  color: #111111;
}


.offer-info p {
  color: #777777;

  font-size: 12px;

  line-height: 1.5;

  height: 36px;

  overflow: hidden;

  margin-bottom: 15px;
}


/* =====================================================
   OFFER FOOTER
===================================================== */

.offer-footer {
  display: flex;

  justify-content: space-between;

  align-items: center;
}


.prices {
  display: flex;

  align-items: center;

  gap: 8px;
}


.prices strong {
  color: #df0874;

  font-size: 20px;
}


.prices del {
  color: #999999;

  font-size: 13px;
}


/* =====================================================
   ADD TO CART
===================================================== */

.plus-btn {
  width: 38px;
  height: 38px;

  border: 1.5px solid #df0874;

  background: white;

  color: #df0874;

  border-radius: 9px;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  transition: 0.2s;
}


.plus-btn:hover {
  background: #df0874;

  color: white;

  transform: scale(1.05);
}


/* =====================================================
   NO OFFERS
===================================================== */

.no-offers {
  text-align: center;

  padding: 70px 20px;

  color: #666666;
}


.no-offers h2 {
  color: #222222;

  margin-bottom: 10px;
}


.no-offers p {
  margin-bottom: 20px;
}


.no-offers a {
  display: inline-block;

  background: #df0874;

  color: white;

  padding: 12px 22px;

  border-radius: 10px;

  text-decoration: none;

  font-weight: 700;
}


/* =====================================================
   TABLET
===================================================== */

@media (max-width: 850px) {

  .offers-hero {
    min-height: 450px;
  }


  .offers-hero h1 {
    font-size: 52px;
  }


  .featured-offer {
    grid-template-columns: 1fr;

    margin-left: 20px;

    margin-right: 20px;
  }


  .featured-image {
    height: 330px;

    min-height: 330px;
  }


  .featured-content {
    padding: 40px;
  }


  .offers-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .offers-hero {
    min-height: 420px;

    padding: 50px 20px;
  }


  .hero-label {
    padding: 10px 25px;

    font-size: 11px;

    letter-spacing: 1.5px;
  }


  .offers-hero h1 {
    font-size: 42px;

    letter-spacing: -1px;
  }


  .offers-hero p {
    font-size: 15px;

    max-width: 400px;
  }


  .featured-offer {
    margin-top: 35px;

    margin-bottom: 50px;

    margin-left: 15px;

    margin-right: 15px;

    border-radius: 18px;
  }


  .featured-image {
    height: 280px;

    min-height: 280px;
  }


  .featured-content {
    padding: 30px 25px;
  }


  .featured-content h2 {
    font-size: 30px;
  }


  .featured-price strong {
    font-size: 27px;
  }


  .all-offers {
    padding-left: 15px;

    padding-right: 15px;
  }


  .section-title {
    align-items: flex-start;

    flex-direction: column;

    gap: 15px;
  }


  .section-title h2 {
    font-size: 25px;
  }


  .offers-grid {
    grid-template-columns: 1fr;

    gap: 18px;
  }


  .offer-image {
    height: 280px;
  }

}

</style>