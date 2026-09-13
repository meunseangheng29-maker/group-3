<template>
  <main class="register-page">

    <!-- Left Side -->
    <section class="register-intro">
      <div class="intro-label">
        JOIN US
      </div>

      <h1>
        Create Your
        <span>Team&lt;3Coffee</span>
        Account
      </h1>

      <p>
        Create an account to order your favorite
        drinks and enjoy a better experience with us.
      </p>
    </section>

    <!-- Right Side -->
    <section class="register-section">
      <div class="register-card">

        <!-- Header -->
        <div class="register-header">
          <div class="register-icon">
            <UserPlus :size="28" />
          </div>

          <h2>Create Account</h2>

          <p>
            Fill in your information to register
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="register">

          <!-- Username -->
          <div class="form-group">
            <label>Username</label>

            <div class="input-wrapper">
              <User :size="19" />

              <input
                v-model="username"
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label>Email</label>

            <div class="input-wrapper">
              <Mail :size="19" />

              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label>Password</label>

            <div class="input-wrapper">
              <Lock :size="19" />

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
                required
              />

              <button
                type="button"
                class="show-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="form-group">
            <label>Confirm Password</label>

            <div class="input-wrapper">
              <Lock :size="19" />

              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                required
              />

              <button
                type="button"
                class="show-password"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <!-- Error -->
          <p
            v-if="errorMessage"
            class="error-message"
          >
            {{ errorMessage }}
          </p>

          <!-- Register Button -->
          <button
            type="submit"
            class="register-submit"
          >
            <UserPlus :size="19" />
            Create Account
          </button>

        </form>

        <!-- Login -->
        <div class="login-link">
          <span>Already have an account?</span>

          <RouterLink to="/login">
            Login
          </RouterLink>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  User,
  Mail,
  Lock,
  UserPlus
} from 'lucide-vue-next'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const errorMessage = ref('')

function register() {
  errorMessage.value = ''

  // Check password
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  // Check password length
  if (password.value.length < 6) {
    errorMessage.value =
      'Password must be at least 6 characters.'
    return
  }

  console.log('Username:', username.value)
  console.log('Email:', email.value)
  console.log('Password:', password.value)

  alert(`Account created successfully for ${username.value}!`)

  // Go to login page
  window.location.href = '/login'
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fdfbfb;
}

/* =========================
   LEFT SIDE
========================= */

.register-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px;
  background:
    linear-gradient(
      135deg,
      #fce4ec,
      #f8bbd0,
      #f3e5f5
    );
}

.intro-label {
  width: fit-content;
  padding: 9px 18px;
  margin-bottom: 25px;

  background: white;
  color: #d81b60;

  border-radius: 30px;

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
}

.register-intro h1 {
  max-width: 550px;

  margin: 0;

  color: #333;

  font-size: 52px;
  line-height: 1.15;
  font-weight: 800;
}

.register-intro h1 span {
  display: block;
  color: #d81b60;
}

.register-intro p {
  max-width: 500px;

  margin-top: 25px;

  color: #666;

  font-size: 18px;
  line-height: 1.7;
}


/* =========================
   RIGHT SIDE
========================= */

.register-section {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 50px;
}

.register-card {
  width: 100%;
  max-width: 470px;

  padding: 40px;

  background: white;

  border: 1px solid #f8bbd0;
  border-radius: 28px;

  box-shadow:
    0 15px 45px rgba(216, 27, 96, 0.12);
}


/* Header */

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-icon {
  width: 58px;
  height: 58px;

  margin: 0 auto 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  background:
    linear-gradient(
      135deg,
      #d81b60,
      #e91e63
    );

  border-radius: 18px;
}

.register-header h2 {
  margin: 0;

  color: #333;

  font-size: 30px;
}

.register-header p {
  margin-top: 8px;

  color: #777;
}


/* Form */

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  color: #444;

  font-size: 14px;
  font-weight: 600;
}

.input-wrapper {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 0 14px;

  height: 52px;

  color: #999;

  background: #fffafa;

  border: 1px solid #eadde2;
  border-radius: 13px;

  transition: 0.2s;
}

.input-wrapper:focus-within {
  border-color: #d81b60;

  box-shadow:
    0 0 0 3px rgba(216, 27, 96, 0.08);
}

.input-wrapper input {
  flex: 1;

  min-width: 0;

  border: none;
  outline: none;

  background: transparent;

  color: #333;

  font-size: 14px;
}

.input-wrapper input::placeholder {
  color: #aaa;
}

.show-password {
  padding: 5px;

  border: none;

  background: transparent;

  color: #d81b60;

  cursor: pointer;

  font-size: 12px;
  font-weight: 600;
}


/* Error */

.error-message {
  margin: 10px 0;

  color: #d32f2f;

  font-size: 13px;
}


/* Register Button */

.register-submit {
  width: 100%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  margin-top: 10px;

  border: none;
  border-radius: 13px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #d81b60,
      #e91e63
    );

  cursor: pointer;

  font-size: 15px;
  font-weight: 700;

  transition: 0.2s;
}

.register-submit:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.25);
}


/* Login */

.login-link {
  display: flex;
  justify-content: center;

  gap: 5px;

  margin-top: 25px;

  font-size: 14px;

  color: #777;
}

.login-link a {
  color: #d81b60;

  text-decoration: none;

  font-weight: 700;
}

.login-link a:hover {
  text-decoration: underline;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .register-page {
    grid-template-columns: 1fr;
  }

  .register-intro {
    padding: 60px 30px;
    text-align: center;
    align-items: center;
  }

  .register-intro h1 {
    font-size: 42px;
  }

  .register-section {
    padding: 40px 20px;
  }
}

@media (max-width: 500px) {
  .register-intro {
    padding: 45px 20px;
  }

  .register-intro h1 {
    font-size: 34px;
  }

  .register-intro p {
    font-size: 16px;
  }

  .register-card {
    padding: 28px 20px;
    border-radius: 20px;
  }
}
</style>