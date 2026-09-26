<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-content">
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

      <section class="content-card">
        <div class="card-header">
          <div>
            <h2>Drink Menu</h2>
            <p>Manage all drinks available on your website.</p>
          </div>

          <button class="add-btn" @click="openAddModal">
            <Plus :size="18" />
            Add Drink
          </button>
        </div>

        <div class="drink-grid">
          <div v-for="drink in drinks" :key="drink.id" class="drink-card">
            <div class="drink-image">
              <img
                v-if="drink.image"
                :src="drink.image"
                :alt="drink.name"
              />
              <CupSoda v-else :size="45" />
            </div>

            <div class="drink-info">
              <h3>{{ drink.name }}</h3>
              <p>{{ drink.description }}</p>

              <div class="drink-bottom">
                <strong>${{ Number(drink.price || 0).toFixed(2) }}</strong>
                <span
                  class="stock"
                  :class="{ 'out-of-stock': drink.stock === 0 }"
                >
                  {{ drink.stock }} in stock
                </span>
              </div>
            </div>

            <div class="drink-actions">
              <button class="edit-btn" @click="openEditModal(drink)">
                <Pencil :size="16" />
                Edit
              </button>

              <button class="delete-btn" @click="deleteDrink(drink.id)">
                <Trash2 :size="16" />
                Delete
              </button>
            </div>
          </div>

          <div v-if="drinks.length === 0" class="empty">
            <CupSoda :size="45" />
            <h3>No drinks found</h3>
            <p>Add your first drink to the menu.</p>
          </div>
        </div>
      </section>
    </main>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Edit Drink' : 'Add New Drink' }}</h2>
        
        <form @submit.prevent="saveDrink">
          <div class="form-group">
            <label>Drink Name</label>
            <input type="text" v-model="form.name" placeholder="e.g. Matcha Latte" required />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="form.description" placeholder="Brief description..." rows="2"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" v-model.number="form.price" placeholder="3.50" required />
            </div>

            <div class="form-group">
              <label>Stock Quantity</label>
              <input type="number" v-model.number="form.stock" placeholder="20" required />
            </div>
          </div>

          <div class="form-group">
            <label>Upload Image File</label>
            <input type="file" accept="image/*" @change="handleFileUpload" />
            
            <div v-if="form.image" class="image-preview">
              <img :src="form.image" alt="Preview" />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
            <button type="submit" class="submit-btn">{{ isEditing ? 'Update Drink' : 'Save Drink' }}</button>
          </div>
        </form>
      </div>
    </div>
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

import { drinks as defaultDrinks } from '../data/Drink'
import type { Drink } from '../data/Drink'

const router = useRouter()

const adminUsername = computed(() => {
  return localStorage.getItem('adminUsername') || 'Admin'
})

const drinks = ref<Drink[]>([])

const isModalOpen = ref(false)
const isEditing = ref(false)
const currentId = ref<number | null>(null)

const form = ref({
  name: '',
  description: '',
  price: 0,
  image: '',
  stock: 10,
  category: 'Milk Tea'
})
onMounted(() => {
  // ឆែកមើលក្នុង localStorage មុនគេបង្អស់
  const savedDrinks = localStorage.getItem('adminDrinks') || localStorage.getItem('drinks')
  
  if (savedDrinks) {
    try {
      const parsed = JSON.parse(savedDrinks)
      // បើមានទិន្នន័យក្នុង localStorage គឺយកវាភ្លាម មិនត្រូវយក defaultDrinks មកជាន់ទេ
      if (Array.isArray(parsed) && parsed.length > 0) {
        drinks.value = parsed
      } else {
        drinks.value = defaultDrinks
        persistDrinks()
      }
    } catch {
      drinks.value = defaultDrinks
      persistDrinks()
    }
  } else {
    // បើគ្មានទិន្នន័យសោះ ទើបយក defaultDrinks មកដាក់
    drinks.value = defaultDrinks
    persistDrinks()
  }
})

function persistDrinks() {
  const jsonData = JSON.stringify(drinks.value)
  // រក្សាទុកក្នុង Key ទាំងពីរដើម្បីធានាថាត្រូវគ្នាជាមួយគ្រប់ Page ទាំងអស់
  localStorage.setItem('adminDrinks', jsonData)
  localStorage.setItem('drinks', jsonData)
  
  // បញ្ជូនសញ្ញាព្រឹត្តិការណ៍ (Event) ទៅកាន់ Tab ឬ Component ដទៃទៀតឱ្យដឹងថាទិន្នន័យបានប្តូរ
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'drinks',
    newValue: jsonData
  }))
  window.dispatchEvent(new Event('storage'))
}
function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.value.image = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

function openAddModal() {
  isEditing.value = false
  currentId.value = null
  form.value = { name: '', description: '', price: 3.00, image: '', stock: 20, category: 'Milk Tea' }
  isModalOpen.value = true
}

function openEditModal(drink: any) {
  isEditing.value = true
  currentId.value = drink.id
  form.value = {
    name: drink.name,
    description: drink.description,
    price: drink.price,
    image: drink.image,
    stock: drink.stock,
    category: drink.category || 'Milk Tea'
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function saveDrink() {
  if (isEditing.value && currentId.value !== null) {
    const index = drinks.value.findIndex(d => d.id === currentId.value)
    if (index !== -1) {
      drinks.value[index] = {
        id: currentId.value,
        ...form.value
      }
    }
  } else {
    const newId = drinks.value.length > 0 ? Math.max(...drinks.value.map(d => d.id)) + 1 : 1
    drinks.value.push({
      id: newId,
      ...form.value
    })
  }

  persistDrinks()
  closeModal()
}

function deleteDrink(id: number) {
  const drink = drinks.value.find(item => item.id === id)
  if (!drink) return

  const confirmed = confirm(`Are you sure you want to delete ${drink.name}?`)
  if (!confirmed) return

  drinks.value = drinks.value.filter(item => item.id !== id)
  persistDrinks()
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.admin-layout {
  min-height: 100vh;
  background: #f8f8f8;
}

.admin-content {
  margin-left: 250px;
  padding: 30px;
}

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

.admin-user {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 10px 15px;
  border-radius: 10px;
}

.content-card {
  background: white;
  padding: 25px;
  border-radius: 14px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.04);
}

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

.drink-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* ប្ដូរពី 3 មក 4 ដើម្បីឱ្យវាបានច្រើននិងមិនធំពេក */
  gap: 20px;
}

.drink-card {
  border: 1px solid #eee;
  border-radius: 14px;
  overflow: hidden;
  background: white;
  transition: 0.2s;
}

.drink-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.drink-image {
  height: 140px; /* បន្ថយពី 180px មក 140px រួសរាន់និងសមាមាត្រស្អាត */
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

.drink-info {
  padding: 15px; /* កាត់បន្ថយ padding បន្តិច */
}

.drink-info h3 {
  margin: 0 0 5px;
  color: #333;
  font-size: 16px;
}

.drink-info p {
  margin: 0 0 12px;
  color: #888;
  font-size: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 34px;
}

.drink-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drink-bottom strong {
  color: #d81b60;
  font-size: 16px;
}

.stock {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 20px;
  background: #e8f5e9;
  color: #2e7d32;
}

.stock.out-of-stock {
  background: #ffebee;
  color: #c62828;
}

.drink-actions {
  display: flex;
  gap: 8px;
  padding: 0 15px 15px;
}

.drink-actions button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
}

.edit-btn {
  border: 1px solid #eee;
  background: white;
  color: #555;
}

.edit-btn:hover {
  border-color: #d81b60;
  color: #d81b60;
}

.delete-btn {
  border: 1px solid #ffcdd2;
  background: #fff5f5;
  color: #d32f2f;
}

.delete-btn:hover {
  background: #ffebee;
}

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

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 14px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
  margin-bottom: 20px;
  font-size: 22px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
}

.form-group input[type="file"] {
  padding: 6px;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #d81b60;
}

.image-preview {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-row {
  display: flex;
  gap: 15px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}

.cancel-btn {
  background: #f1f5f9;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  color: #555;
  cursor: pointer;
}

.submit-btn {
  background: #d81b60;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  cursor: pointer;
}

.submit-btn:hover {
  background: #ad1457;
}

@media (max-width: 1400px) {
  .drink-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1100px) {
  .drink-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .admin-content {
    margin-left: 70px;
    padding: 20px;
  }
  .drink-grid {
    grid-template-columns: 1fr;
  }
}
</style>