<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="admin-content">
      <!-- Header -->
      <header class="page-header">
        <div class="header-titles">
          <h1>Settings & System Controls</h1>
          <p>Manage your system preferences, account security, and dashboard configurations.</p>
        </div>

        <div class="admin-user-pill">
          <User :size="18" class="user-icon" />
          <span>{{ adminUsername }}</span>
        </div>
      </header>

      <!-- Settings Container -->
      <div class="settings-container">
        
        <!-- SECTION 1: ACCOUNT & SECURITY -->
        <div class="settings-section-title">
          <ShieldCheck :size="18" />
          <span>Account & Security</span>
        </div>

        <div class="setting-card">
          <div class="setting-icon-box account">
            <UserCog :size="24" />
          </div>
          <div class="setting-info">
            <h3>Admin Account Profile</h3>
            <p>Update your administrator display name and contact credentials.</p>
          </div>
          <button class="btn-primary" @click="editAccount">
            <Edit3 :size="16" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div class="setting-card">
          <div class="setting-icon-box security-bg">
            <KeyRound :size="24" />
          </div>
          <div class="setting-info">
            <h3>Change Password</h3>
            <p>Secure your dashboard by updating your administrator password.</p>
          </div>
          <button class="btn-secondary" @click="changePassword">
            <Lock :size="16" />
            <span>Update Password</span>
          </button>
        </div>

        <!-- SECTION 2: SYSTEM PREFERENCES -->
        <div class="settings-section-title">
          <Sliders :size="18" />
          <span>Preferences & Notifications</span>
        </div>

        <div class="setting-card">
          <div class="setting-icon-box notify-bg">
            <BellRing :size="24" />
          </div>
          <div class="setting-info">
            <h3>Order Sound Notifications</h3>
            <p>Play an alert chime automatically when a new customer order arrives.</p>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="soundEnabled" @change="toggleSound">
            <span class="slider round"></span>
          </label>
        </div>

        <!-- SECTION 3: DATA & STORAGE -->
        <div class="settings-section-title">
          <DatabaseBackup :size="18" />
          <span>Data Management</span>
        </div>

        <div class="setting-card">
          <div class="setting-icon-box danger-bg">
            <Database :size="24" />
          </div>
          <div class="setting-info">
            <h3>Clear Orders History</h3>
            <p>Permanently delete all saved customer orders from local storage.</p>
          </div>
          <button class="btn-danger" @click="clearOrders">
            <Trash2 :size="16" />
            <span>Clear Data</span>
          </button>
        </div>

        <!-- SECTION 4: SYSTEM INFO & SESSION -->
        <div class="settings-section-title">
          <Info :size="18" />
          <span>System & Session</span>
        </div>

        <div class="setting-card">
          <div class="setting-icon-box info-bg">
            <Server :size="24" />
          </div>
          <div class="setting-info">
            <h3>Drink of the Day v2.5.0</h3>
            <p>Running smoothly on Vue 3 TypeScript Engine. All systems operational.</p>
          </div>
          <span class="badge-status">Online</span>
        </div>

        <div class="setting-card">
          <div class="setting-icon-box warning-bg">
            <LogOut :size="24" />
          </div>
          <div class="setting-info">
            <h3>Admin Logout</h3>
            <p>Safely sign out of your administrator session dashboard.</p>
          </div>
          <button class="btn-warning" @click="logout">
            <LogOut :size="16" />
            <span>Logout</span>
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
  User,
  UserCog,
  Database,
  LogOut,
  Edit3,
  Trash2,
  ShieldCheck,
  KeyRound,
  Lock,
  Sliders,
  BellRing,
  DatabaseBackup,
  Info,
  Server
} from 'lucide-vue-next'

const router = useRouter()

const adminUsername = ref(
  localStorage.getItem('adminUsername') || 'Admin'
)

// Sound Notification State (Dark Mode removed)
const soundEnabled = ref(localStorage.getItem('adminSound') !== 'false')

function editAccount() {
  const newUsername = prompt('Enter new admin username:', adminUsername.value)
  if (!newUsername || newUsername.trim() === '') return
  adminUsername.value = newUsername.trim()
  localStorage.setItem('adminUsername', newUsername.trim())
  alert('Admin account updated successfully.')
}

function changePassword() {
  const oldPass = prompt('Enter current password:')
  if (oldPass === null) return
  const newPass = prompt('Enter new admin password:')
  if (!newPass) return
  alert('Password changed successfully!')
}

function toggleSound() {
  localStorage.setItem('adminSound', String(soundEnabled.value))
}

function clearOrders() {
  const confirmed = confirm('Are you sure you want to delete all orders? This action cannot be undone.')
  if (!confirmed) return
  localStorage.removeItem('adminOrders')
  alert('All orders have been deleted.')
}

function logout() {
  const confirmed = confirm('Are you sure you want to logout from the admin panel?')
  if (!confirmed) return
  localStorage.removeItem('adminLoggedIn')
  localStorage.removeItem('adminUsername')
  router.push('/admin')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
}

.admin-content {
  margin-left: 260px;
  padding: 40px;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  max-width: 1050px;
}

.header-titles h1 {
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 28px;
  font-weight: 700;
}

.header-titles p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.admin-user-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  background: white;
  border-radius: 50px;
  color: #1e293b;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
}

.user-icon {
  color: #4f46e5;
}

/* Section Title dividers */
.settings-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 25px 0 12px;
  color: #475569;
  font-size: 15px;
  font-weight: 700;
  max-width: 1050px;
}

/* Settings Container & Cards */
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 1050px;
}

.setting-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  background: white;
  border-radius: 18px;
  padding: 24px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.setting-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
  border-color: #cbd5e1;
}

/* Icon Boxes */
.setting-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ede9fe;
  color: #7c3aed;
  flex-shrink: 0;
}

.setting-icon-box.security-bg { background: #e0f2fe; color: #0284c7; }
.setting-icon-box.notify-bg { background: #fae8ff; color: #c084fc; }
.setting-icon-box.danger-bg { background: #fee2e2; color: #dc2626; }
.setting-icon-box.info-bg { background: #f1f5f9; color: #475569; }
.setting-icon-box.warning-bg { background: #ffedd5; color: #ea580c; }

/* Info */
.setting-info {
  flex-grow: 1;
}

.setting-info h3 {
  margin: 0 0 4px;
  color: #1e293b;
  font-size: 17px;
  font-weight: 600;
}

.setting-info p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

/* Buttons Styling */
button {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-primary { background: #4f46e5; color: white; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); }
.btn-primary:hover { background: #4338ca; }

.btn-secondary { background: #0284c7; color: white; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2); }
.btn-secondary:hover { background: #0369a1; }

.btn-danger { background: #ef4444; color: white; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2); }
.btn-danger:hover { background: #dc2626; }

.btn-warning { background: #f97316; color: white; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2); }
.btn-warning:hover { background: #ea580c; }

/* Status Badge & Toggle Switch */
.badge-status {
  background: #dcfce7;
  color: #15803d;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  flex-shrink: 0;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #cbd5e1;
  transition: .3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4f46e5;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-content {
    margin-left: 70px;
    padding: 20px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .setting-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .setting-card button, .switch {
    width: 100%;
    justify-content: center;
  }
}
</style>