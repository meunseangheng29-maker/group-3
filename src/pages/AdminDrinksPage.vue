
<template>
  <div class="admin-layout">

    <!-- ================= SIDEBAR ================= -->
    <AdminSidebar />

    <!-- ================= MAIN CONTENT ================= -->
    <main class="admin-content">

      <!-- Header -->
      <header class="page-header">
        <div>
          <h1>Drinks</h1>
          <p>Manage your drinks and menu items.</p>
        </div>

        <div class="admin-user">
          <User :size="20" />
          {{ adminUsername }}
        </div>
      </header>


      <!-- ================= DRINK CARD ================= -->
      <section class="content-card">

        <div class="card-header">

          <div>
            <h2>Drink Menu</h2>
            <p>Manage all drinks available on your website.</p>
          </div>

          <button
            class="add-btn"
            @click="addDrink"
          >
            <Plus :size="18" />
            Add Drink
          </button>

        </div>


        <!-- ================= DRINK GRID ================= -->
        <div class="drink-grid">

          <div
            v-for="drink in drinks"
            :key="drink.id"
            class="drink-card"
          >

            <!-- Image -->
            <div class="drink-image">

              <img
                v-if="drink.image"
                :src="drink.image"
                :alt="drink.name"
              />

              <CupSoda
                v-else
                :size="45"
              />

            </div>


            <!-- Information -->
            <div class="drink-info">

              <h3>
                {{ drink.name }}
              </h3>

              <p>
                {{ drink.description }}
              </p>

              <div class="drink-bottom">

                <strong>
                  ${{ drink.price.toFixed(2) }}
                </strong>

                <span
                  class="stock"
                  :class="{
                    'out-of-stock': drink.stock === 0
                  }"
                >
                  {{ drink.stock }} in stock
                </span>

              </div>

            </div>


            <!-- Actions -->
            <div class="drink-actions">

              <button
                class="edit-btn"
                @click="editDrink(drink.id)"
              >
                <Pencil :size="16" />
                Edit
              </button>

              <button
                class="delete-btn"
                @click="deleteDrink(drink.id)"
              >
                <Trash2 :size="16" />
                Delete
              </button>

            </div>

          </div>


          <!-- Empty -->
          <div
            v-if="drinks.length === 0"
            class="empty"
          >
            <CupSoda :size="45" />

            <h3>No drinks found</h3>

            <p>
              Add your first drink to the menu.
            </p>
          </div>

        </div>

      </section>

    </main>

  </div>
</template>


<script setup lang="ts">

import { computed, ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import AdminSidebar from '../components/AdminSidebar.vue'

import {
  User,
  CupSoda,
  Plus,
  Pencil,
  Trash2
} from 'lucide-vue-next'


/* ================= ROUTER ================= */

const router = useRouter()


/* ================= ADMIN USER ================= */

const adminUsername = computed(() => {
  return localStorage.getItem('adminUsername') || 'Admin'
})


/* ================= DRINK TYPE ================= */

interface Drink {
  id: number
  name: string
  description: string
  price: number
  image: string
  stock: number
}


/* ================= DRINK DATA ================= */

const drinks = ref<Drink[]>([])


/* ================= DEFAULT DRINKS ================= */

const defaultDrinks: Drink[] = [

  {
    id: 1,
    name: 'Matcha Latte',
    description: 'Creamy Japanese matcha latte.',
    price: 3.75,
    image: '',
    stock: 20
  },

  {
    id: 2,
    name: 'Mango Smoothie',
    description: 'Fresh mango smoothie.',
    price: 3.50,
    image: '',
    stock: 15
  },

  {
    id: 3,
    name: 'Brown Sugar Milk Tea',
    description: 'Milk tea with brown sugar.',
    price: 3.25,
    image: '',
    stock: 25
  },

  {
    id: 4,
    name: 'Iced Caramel Latte',
    description: 'Smooth iced caramel coffee.',
    price: 3.80,
    image: '',
    stock: 12
  },

  {
    id: 5,
    name: 'Strawberry Matcha Latte',
    description: 'Strawberry with creamy matcha.',
    price: 2.99,
    image: '',
    stock: 18
  }

]


/* ================= LOAD DRINKS ================= */

onMounted(() => {

  const savedDrinks = localStorage.getItem('adminDrinks')

  if (savedDrinks) {

    try {

      drinks.value = JSON.parse(savedDrinks)

    } catch {

      drinks.value = defaultDrinks

    }

  } else {

    drinks.value = defaultDrinks

  }

})


/* ================= SAVE DRINKS ================= */

function saveDrinks() {

  localStorage.setItem(
    'adminDrinks',
    JSON.stringify(drinks.value)
  )

}


/* ================= ADD DRINK ================= */

function addDrink() {

  router.push('/admin/drinks/create')

}


/* ================= EDIT DRINK ================= */

function editDrink(id: number) {

  router.push(`/admin/drinks/edit/${id}`)

}


/* ================= DELETE DRINK ================= */

function deleteDrink(id: number) {

  const drink = drinks.value.find(
    item => item.id === id
  )

  if (!drink) {
    return
  }


  const confirmed = confirm(
    `Are you sure you want to delete ${drink.name}?`
  )


  if (!confirmed) {
    return
  }


  drinks.value = drinks.value.filter(
    item => item.id !== id
  )


  saveDrinks()

}

</script>


<style scoped>

/* ================= LAYOUT ================= */

* {
  box-sizing: border-box;
}

.admin-layout {
  min-height: 100vh;
  background: #f8f8f8;
}


/* ================= CONTENT ================= */

.admin-content {
  margin-left: 250px;
  padding: 30px;
}


/* ================= HEADER ================= */

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 5px;

  color: #333;

  font-size: 36px;
}

.page-header p {
  margin: 0;

  color: #888;
}


/* ================= ADMIN USER ================= */

.admin-user {
  display: flex;

  align-items: center;

  gap: 8px;

  background: white;

  padding: 10px 15px;

  border-radius: 10px;
}


/* ================= CONTENT CARD ================= */

.content-card {
  background: white;

  padding: 25px;

  border-radius: 14px;

  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.04);
}


/* ================= CARD HEADER ================= */

.card-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}

.card-header h2 {
  margin: 0 0 5px;

  color: #333;

  font-size: 20px;
}

.card-header p {
  margin: 0;

  color: #888;

  font-size: 13px;
}


/* ================= ADD BUTTON ================= */

.add-btn {
  display: flex;

  align-items: center;

  gap: 7px;

  border: none;

  padding: 11px 17px;

  border-radius: 9px;

  background: #d81b60;

  color: white;

  cursor: pointer;

  font-weight: 600;

  transition: 0.2s;
}

.add-btn:hover {
  background: #ad1457;
}


/* ================= DRINK GRID ================= */

.drink-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;
}


/* ================= DRINK CARD ================= */

.drink-card {
  border: 1px solid #eee;

  border-radius: 14px;

  overflow: hidden;

  background: white;

  transition: 0.2s;
}

.drink-card:hover {
  transform: translateY(-3px);

  box-shadow:
    0 6px 20px
    rgba(0, 0, 0, 0.08);
}


/* ================= IMAGE ================= */

.drink-image {
  height: 180px;

  background: #fff0f5;

  display: flex;

  align-items: center;

  justify-content: center;

  color: #d81b60;

  overflow: hidden;
}

.drink-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;
}


/* ================= DRINK INFO ================= */

.drink-info {
  padding: 18px;
}

.drink-info h3 {
  margin: 0 0 7px;

  color: #333;

  font-size: 17px;
}

.drink-info p {
  margin: 0 0 15px;

  color: #888;

  font-size: 13px;

  line-height: 1.5;

  min-height: 39px;
}


/* ================= PRICE / STOCK ================= */

.drink-bottom {
  display: flex;

  justify-content: space-between;

  align-items: center;
}

.drink-bottom strong {
  color: #d81b60;

  font-size: 18px;
}

.stock {
  font-size: 12px;

  padding: 5px 9px;

  border-radius: 20px;

  background: #e8f5e9;

  color: #2e7d32;
}

.stock.out-of-stock {
  background: #ffebee;

  color: #c62828;
}


/* ================= ACTIONS ================= */

.drink-actions {
  display: flex;

  gap: 10px;

  padding: 0 18px 18px;
}

.drink-actions button {
  flex: 1;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 6px;

  padding: 9px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;

  font-size: 13px;
}


/* Edit */

.edit-btn {
  border: 1px solid #eee;

  background: white;

  color: #555;
}

.edit-btn:hover {
  border-color: #d81b60;

  color: #d81b60;
}


/* Delete */

.delete-btn {
  border: 1px solid #ffcdd2;

  background: #fff5f5;

  color: #d32f2f;
}

.delete-btn:hover {
  background: #ffebee;
}


/* ================= EMPTY ================= */

.empty {
  grid-column: 1 / -1;

  text-align: center;

  padding: 60px 20px;

  color: #999;
}

.empty h3 {
  margin: 15px 0 5px;

  color: #555;
}

.empty p {
  margin: 0;

  color: #999;
}


/* ================= RESPONSIVE ================= */

@media (max-width: 1100px) {

  .drink-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}


@media (max-width: 768px) {

  .admin-content {
    margin-left: 70px;

    padding: 20px;
  }

  .page-header h1 {
    font-size: 28px;
  }

  .drink-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    align-items: flex-start;

    gap: 15px;

    flex-direction: column;
  }

}

</style>

