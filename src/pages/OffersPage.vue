

<script setup lang="ts">
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles
} from 'lucide-vue-next'

import { computed } from 'vue'
import { drinks } from '../data/Drink'
import { useCart } from '../stores/cart'

const { addToCart } = useCart()

const offers = computed(() => {
  return drinks.filter(drink => drink.originalPrice)
})

function discountPercent(price: number, originalPrice: number) {
  return Math.round(
    ((originalPrice - price) / originalPrice) * 100
  )
}
</script>

<template>

  <main class="offers-page">

    <!-- HEADER -->

    <section class="offers-header">

      <div>

        <span class="small-title">
          <Sparkles :size="15" />
          LIMITED TIME
        </span>

        <h1>
          Special <span>Offers</span>
        </h1>

        <p>
          Treat yourself to something delicious.
          Enjoy our best drinks at special prices.
        </p>

      </div>

      <div class="offer-count">
        {{ offers.length }} Offers
      </div>

    </section>


    <!-- FEATURE OFFER -->

    <section
      v-if="offers.length"
      class="featured-offer"
    >

      <div class="featured-image">

        <img
          :src="offers[0].image"
          :alt="offers[0].name"
        />

        <div class="discount-circle">
          <strong>
            {{ discountPercent(
              offers[0].price,
              offers[0].originalPrice!
            ) }}%
          </strong>

          <span>OFF</span>
        </div>

      </div>


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


        <div class="featured-price">

          <strong>
            ${{ offers[0].price.toFixed(2) }}
          </strong>

          <del>
            ${{ offers[0].originalPrice?.toFixed(2) }}
          </del>

        </div>


        <div class="featured-actions">

          <button
            class="buy-btn"
            @click="addToCart(offers[0])"
          >
            Order Now
            <ShoppingBag :size="18" />
          </button>

          <button class="heart-btn">
            <Heart :size="21" />
          </button>

        </div>

      </div>

    </section>


    <!-- ALL OFFERS -->

    <section class="all-offers">

      <div class="section-title">

        <div>
          <span>MORE DEALS</span>
          <h2>Grab Your Favorite</h2>
        </div>

        <RouterLink to="/drinks">
          View all drinks
          <ArrowRight :size="17" />
        </RouterLink>

      </div>


      <div class="offers-grid">

        <article
          v-for="drink in offers"
          :key="drink.id"
          class="offer-card"
        >

          <div class="offer-image">

            <img
              :src="drink.image"
              :alt="drink.name"
            />

            <span class="sale-badge">
              {{
                discountPercent(
                  drink.price,
                  drink.originalPrice!
                )
              }}% OFF
            </span>

            <button class="card-heart">
              <Heart :size="18" />
            </button>

          </div>


          <div class="offer-info">

            <span class="category">
              {{ drink.category }}
            </span>

            <h3>{{ drink.name }}</h3>

            <p>
              {{ drink.description }}
            </p>


            <div class="offer-footer">

              <div class="prices">

                <strong>
                  ${{ drink.price.toFixed(2) }}
                </strong>

                <del>
                  ${{ drink.originalPrice?.toFixed(2) }}
                </del>

              </div>


              <button
                class="plus-btn"
                @click="addToCart(drink)"
              >
                <ShoppingBag :size="18" />
              </button>

            </div>

          </div>

        </article>

      </div>

    </section>

  </main>

</template>


<style scoped>

/* ================= PAGE ================= */

.offers-page {
  max-width: 1200px;

  margin: 0 auto;

  padding: 40px 20px 80px;

  background: #fff;
}


/* ================= HEADER ================= */

.offers-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  margin-bottom: 30px;
}


.small-title {
  display: flex;

  align-items: center;

  gap: 5px;

  color: #df0874;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1.5px;
}


.offers-header h1 {
  margin: 7px 0;

  font-size: 48px;

  letter-spacing: -1.5px;
}


.offers-header h1 span {
  color: #df0874;
}


.offers-header p {
  margin: 0;

  color: #777;

  max-width: 500px;

  font-size: 15px;
}


.offer-count {
  background: #fff4ea;

  color: #df0874;

  padding: 10px 17px;

  border-radius: 30px;

  font-size: 13px;

  font-weight: 700;
}


/* ================= FEATURE ================= */

.featured-offer {
  display: grid;

  grid-template-columns: 1.1fr 1fr;

  background: linear-gradient(
    135deg,
    #fff2e5,
    #fffaf6
  );

  border-radius: 25px;

  overflow: hidden;

  min-height: 380px;

  margin-bottom: 55px;
}


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

  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}


.discount-circle strong {
  font-size: 24px;
}


.discount-circle span {
  font-size: 10px;
  font-weight: 700;
}


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
  color: #666;

  line-height: 1.6;

  max-width: 420px;

  font-size: 14px;
}


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
  color: #888;

  font-size: 18px;
}


.featured-actions {
  display: flex;

  gap: 10px;
}


.buy-btn {
  border: none;

  background: #df0874;

  color: white;

  border-radius: 11px;

  padding: 14px 23px;

  display: flex;
  align-items: center;

  gap: 9px;

  font-weight: 700;

  cursor: pointer;
}


.heart-btn {
  width: 49px;

  border: none;

  background: white;

  color: #df0874;

  border-radius: 11px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}


/* ================= ALL OFFERS ================= */

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
}


.section-title a {
  display: flex;

  align-items: center;

  gap: 5px;

  color: #df0874;

  text-decoration: none;

  font-size: 14px;

  font-weight: 700;
}


.offers-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 22px;
}


.offer-card {
  border: 1px solid #eeeeee;

  border-radius: 18px;

  overflow: hidden;

  background: white;

  transition: .25s;
}


.offer-card:hover {
  transform: translateY(-5px);

  box-shadow: 0 15px 35px rgba(0,0,0,.09);
}


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

  transition: .3s;
}


.offer-card:hover .offer-image img {
  transform: scale(1.05);
}


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

  box-shadow: 0 4px 12px rgba(0,0,0,.1);
}


.offer-info {
  padding: 18px;
}


.category {
  color: #999;

  font-size: 9px;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 1px;
}


.offer-info h3 {
  font-size: 18px;

  margin: 6px 0;
}


.offer-info p {
  color: #777;

  font-size: 12px;

  line-height: 1.5;

  height: 36px;

  overflow: hidden;

  margin-bottom: 15px;
}


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
  color: #999;

  font-size: 13px;
}


.plus-btn {
  width: 38px;
  height: 38px;

  border: 1.5px solid #df0874;

  background: white;

  color:#df0874;

  border-radius: 9px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: .2s;
}


.plus-btn:hover {
  background: #df0874;

  color: white;
}


/* ================= RESPONSIVE ================= */

@media (max-width: 850px) {

  .featured-offer {
    grid-template-columns: 1fr;
  }

  .featured-image {
    height: 330px;
  }

  .offers-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


@media (max-width: 600px) {

  .offers-header {
    align-items: flex-start;

    flex-direction: column;

    gap: 15px;
  }

  .offers-header h1 {
    font-size: 38px;
  }

  .featured-content {
    padding: 30px;
  }

  .offers-grid {
    grid-template-columns: 1fr;
  }

}

</style>