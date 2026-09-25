<template>
  <div class="admin-login-page">
    <div class="login-card">

      <!-- Header -->
      <div class="login-header">
        <div class="admin-icon">
          🔐
        </div>

        <h1>Admin Login</h1>
        <p>Sign in to access the admin dashboard</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login">

        <!-- Username -->
        <div class="form-group">
          <label>Username</label>

          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            autocomplete="username"
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password</label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            autocomplete="current-password"
          />
        </div>

        <!-- Error -->
        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <!-- Login button -->
        <button type="submit" class="login-button">
          Login
        </button>

      </form>

      <!-- Back to website -->
      <button class="back-button" @click="goHome">
        ← Back to Website
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

function login() {
  errorMessage.value = ''

  // Demo admin account
  if (
    username.value === 'admin' &&
    password.value === '1234'
  ) {
    // Save login status
    localStorage.setItem('adminLoggedIn', 'true')

    // Save admin username
    localStorage.setItem('adminUsername', username.value)

    // Go to dashboard
    router.push('/admin/dashboard')

  } else {
    errorMessage.value = 'Invalid username or password.'
  }
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #fff8fa;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.admin-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8bbd0;
  border-radius: 50%;
  font-size: 30px;
}

.login-header h1 {
  margin: 0 0 8px;
  color: #333;
  font-size: 28px;
}

.login-header p {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 13px 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  transition: 0.2s;
}

.form-group input:focus {
  border-color: #d81b60;
  box-shadow: 0 0 0 3px rgba(216, 27, 96, 0.1);
}

.error-message {
  margin: 0 0 15px;
  padding: 10px;
  background: #ffe5e5;
  color: #d32f2f;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #d81b60;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.login-button:hover {
  background: #ad1457;
}

.back-button {
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  border: none;
  background: transparent;
  color: #777;
  cursor: pointer;
  font-size: 14px;
}

.back-button:hover {
  color: #d81b60;
}

/* Phone */
@media (max-width: 480px) {
  .login-card {
    padding: 25px 20px;
  }
}
</style>