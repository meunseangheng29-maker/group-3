
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, X, ShoppingCart } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const router = useRouter()

const { addToCart } = useCart()

// =========================
// Drink Interface
// =========================

interface Drink {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  description?: string
}

// =========================
// Drink Data
// =========================

const drinks: Drink[] = [
  {
    id: 1,
    name: 'Strawberry Matcha Latte',
    category: 'Matcha',
    price: 2.99,
    originalPrice: 4.50,
    image: 'https://tse1.mm.bing.net/th/id/OIP.NKAcfYWZNoH7xfzKvuj_1wHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: '33% OFF',
    description: 'Fresh strawberry with creamy matcha.'
  },

  {
    id: 2,
    name: 'Brown Sugar Milk Tea',
    category: 'Milk Tea',
    price: 3.25,
    image: 'https://carmyy.com/wp-content/uploads/2021/10/Earl-Grey-Milk-Tea-3.jpg',
    badge: 'Popular',
    description: 'Classic brown sugar boba with fresh milk.'
  },

  {
    id: 3,
    name: 'Mango Smoothie',
    category: 'Smoothie',
    price: 3.50,
    image: 'https://tse1.mm.bing.net/th/id/OIP.FsmzC9rKJ4N0xU6lQJ5ycgHaJ4?r=0&w=1152&h=1536&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Popular',
    description: 'Blended fresh mango smoothie.'
  },

  {
    id: 4,
    name: 'Iced Americano',
    category: 'Coffee',
    price: 2.45,
    image: 'https://tse2.mm.bing.net/th/id/OIP.Td6QlUQ5NTbigDQDob0DpQHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Rich espresso poured over cold ice.'
  },

  {
    id: 5,
    name: 'Matcha Latte',
    category: 'Matcha',
    price: 3.75,
    image: 'https://tse4.mm.bing.net/th/id/OIP.MfOVdcPbq6kVXiebzNPgbwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Popular',
    description: 'Premium matcha with creamy milk.'
  },

  {
    id: 6,
    name: 'Passion Fruit Tea',
    category: 'Fruit Tea',
    price: 2.95,
    image: 'https://tse1.mm.bing.net/th/id/OIP.E5q61vVH63cQNECxf5pwuAHaLH?r=0&w=1200&h=1800&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Refreshing tea with passion fruit.'
  },

  {
    id: 7,
    name: 'Taro Milk Tea',
    category: 'Milk Tea',
    price: 3.10,
    image: 'https://tse4.mm.bing.net/th/id/OIP.aqlXsj7nKoW3glbdLdqX4gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Sweet taro flavor with chewy tapioca pearls.'
  },

  {
    id: 8,
    name: 'Iced Caramel Latte',
    category: 'Coffee',
    price: 3.80,
    image: 'https://www.orchidsandsweettea.com/wp-content/uploads/2022/04/Caramel-Iced-Latte-4-of-6.jpg',
    badge: 'Best Seller',
    description: 'Espresso mixed with milk and sweet caramel.'
  },

  {
    id: 9,
    name: 'Fresh Orange Juice',
    category: 'Juice',
    price: 2.75,
    image: 'https://img.freepik.com/premium-photo/glass-freshly-orange-juice_665569-1018.jpg',
    description: '100% pure squeezed orange juice.'
  },

  {
    id: 10,
    name: 'Watermelon Lemonade',
    category: 'Juice',
    price: 3.20,
    image: 'https://tse4.mm.bing.net/th/id/OIP.N58XZpTOpcBn0I7X2BjB_gHaLG?r=0&w=683&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Sweet watermelon blended with tangy lemon.'
  },

  {
    id: 11,
    name: 'Dragon Fruit Smoothie',
    category: 'Smoothie',
    price: 3.90,
    image: 'https://tse4.mm.bing.net/th/id/OIP.Ik_d7fJQG2T-ebvpy9m6ZwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'New',
    description: 'Vibrant pink pitaya smoothie bowl style.'
  },

  {
    id: 12,
    name: 'Peach Fruit Tea',
    category: 'Fruit Tea',
    price: 2.85,
    image: 'https://tse2.mm.bing.net/th/id/OIP.dcFUAFjIIKrG_i592YrGvwHaM9?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Black tea infused with ripe peach slices.'
  },

  {
    id: 13,
    name: 'Avocado Milkshake',
    category: 'Smoothie',
    price: 4.10,
    image: 'https://static.vecteezy.com/system/resources/thumbnails/041/510/997/small_2x/ai-generated-glass-of-avocado-smoothie-photo.jpg',
    description: 'Rich and creamy fresh avocado blend.'
  },

  {
    id: 14,
    name: 'Khmer Green Milk Tea',
    category: 'Milk Tea',
    price: 3.00,
    image: 'https://ameessavorydish.com/wp-content/uploads/2023/01/Matcha-milk-tea-feature.jpg',
    description: 'Aromatic Thai green tea mixed with milk.'
  },

  {
    id: 15,
    name: 'Iced Mocha',
    category: 'Coffee',
    price: 3.65,
    originalPrice: 4.20,
    image: 'https://tse4.mm.bing.net/th/id/OIP.ZAbW6lgdfofyK_-PEKkpRAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: '15% OFF',
    description: 'Espresso combined with rich chocolate syrup.'
  },

  {
    id: 16,
    name: 'Berry Blast Smoothie',
    category: 'Smoothie',
    price: 3.95,
    image: 'https://tse2.mm.bing.net/th/id/OIP.wkYdSwyQMsywwj7mE9ucfAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Mixed strawberries, blueberries, and raspberries.'
  },

  {
    id: 17,
    name: 'Iced Lemon Tea',
    category: 'Fruit Tea',
    price: 2.20,
    image: 'https://ourzestylife.com/wp-content/uploads/2025/05/Iced-Tea-Recipe-OurZestyLife-3.jpg',
    description: 'Classic iced tea with real lemon juice.'
  },

  {
    id: 18,
    name: 'Cold Brew Coffee',
    category: 'Coffee',
    price: 3.40,
    image: 'https://tse4.mm.bing.net/th/id/OIP.l2mhvIVQBPtcOIl3HWDfPAHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Special',
    description: 'Slow-steeped coffee served over ice.'
  },

  {
    id: 19,
    name: 'Sparkling Mango Passion',
    category: 'Specials',
    price: 3.70,
    image: 'https://tse2.mm.bing.net/th/id/OIP.qldxyVq9xr3GmSoaRrwtuwHaJ1?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Special',
    description: 'Fizzy soda drink with fresh mango and passion fruit.'
  },

  {
    id: 20,
    name: 'Coconut Ice Cream Shake',
    category: 'Specials',
    price: 4.25,
    image: 'https://tse4.mm.bing.net/th/id/OIP.xCJeSZuxa8caRo4eOSrlSgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Special',
    description: 'Fresh coconut water blended with vanilla ice cream.'
  }
]

// =========================
// Search
// =========================

const searchText = ref('')

const filteredDrinks = computed(() => {
  const keyword = searchText.value.toLowerCase().trim()

  if (!keyword) {
    return drinks
  }

  return drinks.filter(drink =>
    drink.name.toLowerCase().includes(keyword) ||
    drink.category.toLowerCase().includes(keyword) ||
    drink.description?.toLowerCase().includes(keyword)
  )
})

// =========================
// Clear Search
// =========================

function clearSearch() {
  searchText.value = ''
}

// =========================
// Order Drink
// =========================

function orderDrink(drink: Drink) {
  addToCart(drink)

  router.push('/cart')
}
</script>

<template>
  <div class="search-page">

    <!-- =========================
         Header
    ========================== -->

    <section class="search-header">
      <div class="header-content">

        <h1>Search Drinks</h1>

        <p>
          Find your favorite drink
        </p>

        <!-- Search Box -->

        <div class="search-box">

          <Search
            :size="22"
            class="search-icon"
          />

          <input
            v-model="searchText"
            type="text"
            placeholder="Search milk tea, coffee, smoothie..."
          />

          <button
            v-if="searchText"
            class="clear-btn"
            @click="clearSearch"
            title="Clear search"
          >
            <X :size="20" />
          </button>

        </div>

      </div>
    </section>


    <!-- =========================
         Results
    ========================== -->

    <section class="results-section">

      <div class="results-header">

        <div>
          <h2>
            {{ searchText ? 'Search Results' : 'All Drinks' }}
          </h2>

          <p>
            {{ filteredDrinks.length }}
            {{ filteredDrinks.length === 1 ? 'drink' : 'drinks' }}
            found
          </p>
        </div>

        <ShoppingCart
          :size="28"
          class="cart-icon"
          @click="router.push('/cart')"
        />

      </div>


      <!-- =========================
           No Results
      ========================== -->

      <div
        v-if="filteredDrinks.length === 0"
        class="no-results"
      >

        <Search :size="50" />

        <h3>
          No drinks found
        </h3>

        <p>
          Try searching for another drink or category.
        </p>

        <button
          class="show-all-btn"
          @click="clearSearch"
        >
          Show All Drinks
        </button>

      </div>


      <!-- =========================
           Drink Cards
      ========================== -->

      <div
        v-else
        class="drink-grid"
      >

        <div
          v-for="drink in filteredDrinks"
          :key="drink.id"
          class="drink-card"
        >

          <!-- Drink Image -->

          <div class="image-container">

            <img
              :src="drink.image"
              :alt="drink.name"
              class="drink-image"
            />

            <span
              v-if="drink.badge"
              class="badge"
            >
              {{ drink.badge }}
            </span>

            <span class="category">
              {{ drink.category }}
            </span>

          </div>


          <!-- Drink Information -->

          <div class="drink-info">

            <h3>
              {{ drink.name }}
            </h3>

            <p class="drink-category">
              {{ drink.category }}
            </p>

            <p
              v-if="drink.description"
              class="drink-description"
            >
              {{ drink.description }}
            </p>


            <!-- Price + Order -->

            <div class="drink-bottom">

              <div class="price-container">

                <span class="price">
                  ${{ drink.price.toFixed(2) }}
                </span>

                <span
                  v-if="drink.originalPrice"
                  class="original-price"
                >
                  ${{ drink.originalPrice.toFixed(2) }}
                </span>

              </div>

              <button
                class="order-btn"
                @click="orderDrink(drink)"
              >
                Order Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>

/* =========================
   Page
========================= */

.search-page {
  min-height: 100vh;
  background: #fff7fa;
}


/* =========================
   Header
========================= */

.search-header {
  padding: 60px 20px 45px;

  background: linear-gradient(
    135deg,
    #fce4ec,
    #f8bbd0
  );
}

.header-content {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.header-content h1 {
  margin: 0;

  font-size: 38px;

  color: #880e4f;

  font-weight: 700;
}

.header-content p {
  margin: 10px 0 30px;

  color: #6d214f;

  font-size: 17px;
}


/* =========================
   Search Box
========================= */

.search-box {
  max-width: 650px;

  margin: 0 auto;

  display: flex;

  align-items: center;

  background: white;

  border-radius: 50px;

  padding: 5px 10px 5px 20px;

  box-shadow:
    0 5px 20px rgba(136, 14, 79, 0.12);
}

.search-icon {
  color: #d81b60;

  flex-shrink: 0;
}

.search-box input {
  flex: 1;

  border: none;

  outline: none;

  padding: 15px 12px;

  font-size: 16px;

  color: #333;

  background: transparent;
}

.search-box input::placeholder {
  color: #999;
}


/* =========================
   Clear Button
========================= */

.clear-btn {
  width: 38px;

  height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  border-radius: 50%;

  background: #fce4ec;

  color: #d81b60;

  cursor: pointer;

  transition: 0.2s;
}

.clear-btn:hover {
  background: #f8bbd0;
}


/* =========================
   Results Section
========================= */

.results-section {
  max-width: 1100px;

  margin: 0 auto;

  padding: 45px 20px 70px;
}

.results-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 30px;
}

.results-header h2 {
  margin: 0;

  color: #333;

  font-size: 28px;
}

.results-header p {
  margin: 5px 0 0;

  color: #777;
}

.cart-icon {
  color: #d81b60;

  cursor: pointer;

  transition: 0.2s;
}

.cart-icon:hover {
  transform: scale(1.1);
}


/* =========================
   Drink Grid
========================= */

.drink-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 25px;
}


/* =========================
   Drink Card
========================= */

.drink-card {
  overflow: hidden;

  background: white;

  border-radius: 18px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.08);

  transition:
    transform 0.25s,
    box-shadow 0.25s;
}

.drink-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.12);
}


/* =========================
   Image
========================= */

.image-container {
  position: relative;

  width: 100%;

  height: 230px;

  overflow: hidden;
}

.drink-image {
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;

  transition: transform 0.3s;
}

.drink-card:hover .drink-image {
  transform: scale(1.05);
}


/* =========================
   Badge
========================= */

.badge {
  position: absolute;

  top: 12px;

  right: 12px;

  padding: 6px 12px;

  background: #d81b60;

  color: white;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 700;

  box-shadow:
    0 3px 10px rgba(0, 0, 0, 0.15);
}


/* =========================
   Category
========================= */

.category {
  position: absolute;

  top: 12px;

  left: 12px;

  padding: 6px 12px;

  background: white;

  color: #d81b60;

  border-radius: 20px;

  font-size: 13px;

  font-weight: 600;

  box-shadow:
    0 3px 10px rgba(0, 0, 0, 0.1);
}


/* =========================
   Drink Information
========================= */

.drink-info {
  padding: 20px;
}

.drink-info h3 {
  margin: 0 0 7px;

  font-size: 19px;

  color: #333;
}

.drink-category {
  margin: 0 0 10px;

  font-size: 14px;

  color: #888;
}

.drink-description {
  margin: 0 0 18px;

  font-size: 13px;

  line-height: 1.5;

  color: #777;

  min-height: 39px;
}


/* =========================
   Bottom
========================= */

.drink-bottom {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;
}


/* =========================
   Price
========================= */

.price-container {
  display: flex;

  align-items: center;

  gap: 8px;
}

.price {
  color: #d81b60;

  font-size: 20px;

  font-weight: 700;
}

.original-price {
  color: #999;

  font-size: 13px;

  text-decoration: line-through;
}


/* =========================
   Order Button
========================= */

.order-btn {
  border: none;

  padding: 10px 16px;

  background: #d81b60;

  color: white;

  border-radius: 25px;

  font-size: 14px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s;
}

.order-btn:hover {
  background: #ad1457;

  transform: translateY(-2px);
}


/* =========================
   No Results
========================= */

.no-results {
  text-align: center;

  padding: 70px 20px;

  color: #999;
}

.no-results svg {
  color: #f8bbd0;

  margin-bottom: 15px;
}

.no-results h3 {
  margin: 0 0 8px;

  color: #555;

  font-size: 22px;
}

.no-results p {
  margin: 0 0 25px;
}


/* =========================
   Show All Button
========================= */

.show-all-btn {
  border: none;

  padding: 12px 22px;

  border-radius: 25px;

  background: #d81b60;

  color: white;

  font-weight: 600;

  cursor: pointer;
}


/* =========================
   Tablet
========================= */

@media (max-width: 850px) {

  .drink-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


/* =========================
   Mobile
========================= */

@media (max-width: 550px) {

  .search-header {
    padding: 40px 15px;
  }

  .header-content h1 {
    font-size: 30px;
  }

  .results-section {
    padding: 35px 15px;
  }

  .drink-grid {
    grid-template-columns: 1fr;
  }

  .image-container {
    height: 240px;
  }

  .drink-bottom {
    flex-direction: column;

    align-items: stretch;
  }

  .price-container {
    justify-content: center;

    margin-bottom: 5px;
  }

  .order-btn {
    width: 100%;
  }

}

</style>

