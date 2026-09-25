<template>
  <div class="admin-layout">

    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="admin-content">

      <!-- Header -->
      <header class="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your admin settings.</p>
        </div>

        <div class="admin-user">
          <User :size="20" />
          <span>{{ adminUsername }}</span>
        </div>
      </header>


      <!-- Settings Card -->
      <div class="settings-card">

        <!-- Admin Account -->
        <div class="setting">

          <div class="setting-info">
            <h3>Admin Account</h3>

            <p>
              Manage your administrator account.
            </p>
          </div>

          <button @click="editAccount">
            Edit
          </button>

        </div>


        <!-- Clear Orders -->
        <div class="setting">

          <div class="setting-info">
            <h3>Clear Orders</h3>

            <p>
              Delete all saved customer orders.
            </p>
          </div>

          <button
            class="danger"
            @click="clearOrders"
          >
            Clear
          </button>

        </div>


        <!-- Logout -->
        <div class="setting">

          <div class="setting-info">
            <h3>Admin Logout</h3>

            <p>
              Sign out of the administrator dashboard.
            </p>
          </div>

          <button @click="logout">
            Logout
          </button>

        </div>

      </div>

    </main>

  </div>
</template>


<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AdminSidebar from '../components/AdminSidebar.vue'

import {
  User
} from 'lucide-vue-next'


const router = useRouter()


// =========================
// ADMIN USERNAME
// =========================

const adminUsername = ref(
  localStorage.getItem('adminUsername') || 'Admin'
)


// =========================
// EDIT ACCOUNT
// =========================

function editAccount() {

  const newUsername = prompt(
    'Enter new admin username:',
    adminUsername.value
  )

  if (!newUsername) return

  adminUsername.value = newUsername

  localStorage.setItem(
    'adminUsername',
    newUsername
  )

  alert('Admin account updated successfully.')

}


// =========================
// CLEAR ORDERS
// =========================

function clearOrders() {

  const confirmed = confirm(
    'Are you sure you want to delete all orders?'
  )

  if (!confirmed) return

  localStorage.removeItem('adminOrders')

  alert(
    'All orders have been deleted.'
  )

}


// =========================
// LOGOUT
// =========================

function logout() {

  const confirmed = confirm(
    'Are you sure you want to logout?'
  )

  if (!confirmed) return

  localStorage.removeItem(
    'adminLoggedIn'
  )

  localStorage.removeItem(
    'adminUsername'
  )

  router.push('/admin')

}

</script>


<style scoped>

/* =========================
   ADMIN LAYOUT
========================= */

.admin-layout {
  min-height: 100vh;
  background: #fff8fa;
}


/* =========================
   MAIN CONTENT
========================= */

.admin-content {
  margin-left: 250px;
  padding: 30px;
}


/* =========================
   HEADER
========================= */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 8px;

  color: #d81b60;
  font-size: 30px;
}

.page-header p {
  margin: 0;

  color: #777;
}


/* =========================
   ADMIN USER
========================= */

.admin-user {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px 16px;

  background: white;

  border-radius: 12px;

  color: #555;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.05);
}


/* =========================
   SETTINGS CARD
========================= */

.settings-card {
  background: white;

  border-radius: 18px;

  padding: 10px 25px;

  box-shadow:
    0 5px 20px
    rgba(0, 0, 0, 0.05);
}


/* =========================
   SETTING
========================= */

.setting {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 25px 0;

  border-bottom:
    1px solid #f2dfe7;
}


.setting:last-child {
  border-bottom: none;
}


/* =========================
   SETTING INFO
========================= */

.setting-info h3 {
  margin: 0 0 8px;

  color: #333;

  font-size: 18px;
}


.setting-info p {
  margin: 0;

  color: #888;

  font-size: 14px;
}


/* =========================
   BUTTON
========================= */

button {
  border: none;

  border-radius: 10px;

  padding: 10px 22px;

  background: #d81b60;

  color: white;

  cursor: pointer;

  font-weight: bold;

  transition: 0.2s;
}


button:hover {
  opacity: 0.85;

  transform: translateY(-1px);
}


/* =========================
   DANGER BUTTON
========================= */

button.danger {
  background: #e74c3c;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 768px) {

  .admin-content {
    margin-left: 70px;

    padding: 20px;
  }


  .page-header {
    align-items: flex-start;

    gap: 15px;

    flex-direction: column;
  }


  .settings-card {
    padding: 10px 18px;
  }


  .setting {
    align-items: flex-start;

    flex-direction: column;
  }

}

</style>