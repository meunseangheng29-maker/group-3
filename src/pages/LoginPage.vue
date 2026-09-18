<script setup lang="ts">

import { ref } from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  User,
  Lock,
  LogIn
} from 'lucide-vue-next'

import { useAuth } from '../stores/auth'


// =========================
// ROUTER
// =========================

const router = useRouter()
const route = useRoute()


// =========================
// AUTH
// =========================

const auth = useAuth()


// =========================
// FORM
// =========================

const username = ref('')
const password = ref('')

const rememberMe = ref(false)

const showPassword = ref(false)

const errorMessage = ref('')


// =========================
// LOGIN
// =========================

function login() {

  errorMessage.value = ''

  // Check empty fields
  if (
    !username.value.trim() ||
    !password.value.trim()
  ) {

    errorMessage.value =
      'Please enter your username and password.'

    return
  }


  // Call Pinia login
  const success = auth.login(
    username.value,
    password.value
  )


  // Login failed
  if (!success) {

    errorMessage.value =
      'Login failed. Please try again.'

    return
  }


  // Remember me
  if (rememberMe.value) {

    localStorage.setItem(
      'rememberMe',
      'true'
    )

  } else {

    localStorage.removeItem(
      'rememberMe'
    )

  }


  // Get redirect page
  const redirect =
    typeof route.query.redirect === 'string'
      ? route.query.redirect
      : '/offers'


  // Go to redirect page
  router.push(redirect)

}

</script>


<template>

  <main class="login-page">

    <div class="login-card">


      <!-- ========================= -->
      <!-- LOGIN HEADER -->
      <!-- ========================= -->

      <div class="login-header">

        <div class="login-icon">

          <LogIn :size="28" />

        </div>

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to continue your order.
        </p>

      </div>


      <!-- ========================= -->
      <!-- ERROR MESSAGE -->
      <!-- ========================= -->

      <div
        v-if="errorMessage"
        class="error-message"
      >

        {{ errorMessage }}

      </div>


      <!-- ========================= -->
      <!-- LOGIN FORM -->
      <!-- ========================= -->

      <form @submit.prevent="login">


        <!-- USERNAME -->

        <div class="form-group">

          <label>
            Username
          </label>

          <div class="input-wrapper">

            <User :size="19" />

            <input
              v-model="username"
              type="text"
              placeholder="Enter your username"
            />

          </div>

        </div>


        <!-- PASSWORD -->

        <div class="form-group">

          <label>
            Password
          </label>

          <div class="input-wrapper">

            <Lock :size="19" />

            <input
              v-model="password"
              :type="
                showPassword
                  ? 'text'
                  : 'password'
              "
              placeholder="Enter your password"
            />

          </div>

        </div>


        <!-- REMEMBER ME -->

        <div class="login-options">

          <label class="remember">

            <input
              v-model="rememberMe"
              type="checkbox"
            />

            <span>
              Remember me
            </span>

          </label>

        </div>


        <!-- LOGIN BUTTON -->

        <button
          type="submit"
          class="login-button"
        >

          <LogIn :size="19" />

          Login

        </button>


      </form>


      <!-- ========================= -->
      <!-- REGISTER -->
      <!-- ========================= -->

      <div class="register-link">

        <span>
          Don't have an account?
        </span>

        <button
          type="button"
          @click="router.push('/register')"
        >
          Register
        </button>

      </div>


    </div>

  </main>

</template>


<style scoped>

.login-page {
  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 40px 20px;

  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f8bbd0 50%,
      #f3e5f5 100%
    );
}


.login-card {
  width: 100%;

  max-width: 430px;

  background: white;

  border-radius: 20px;

  padding: 40px;

  box-shadow:
    0 15px 40px
    rgba(216, 27, 96, 0.12);
}


/* =========================
   HEADER
========================= */

.login-header {
  text-align: center;

  margin-bottom: 30px;
}


.login-icon {
  width: 60px;

  height: 60px;

  margin: 0 auto 15px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #e91e63,
      #d81b60
    );

  color: white;
}


.login-header h1 {
  margin: 0 0 8px;

  color: #251014;

  font-size: 30px;

  font-weight: 900;
}


.login-header p {
  margin: 0;

  color: #777;

  font-size: 14px;
}


/* =========================
   ERROR
========================= */

.error-message {
  margin-bottom: 20px;

  padding: 12px 15px;

  border-radius: 10px;

  background: #fff0f3;

  color: #d81b60;

  font-size: 14px;

  text-align: center;
}


/* =========================
   FORM
========================= */

.form-group {
  margin-bottom: 20px;
}


.form-group label {
  display: block;

  margin-bottom: 8px;

  color: #251014;

  font-size: 14px;

  font-weight: 700;
}


.input-wrapper {
  display: flex;

  align-items: center;

  gap: 10px;

  padding:
    0 14px;

  border:
    1px solid #e8dce1;

  border-radius: 11px;

  background: white;

  transition: 0.2s;
}


.input-wrapper:focus-within {
  border-color: #d81b60;

  box-shadow:
    0 0 0 3px
    rgba(216, 27, 96, 0.08);
}


.input-wrapper svg {
  flex-shrink: 0;

  color: #d81b60;
}


.input-wrapper input {
  width: 100%;

  padding: 13px 0;

  border: none;

  outline: none;

  background: transparent;

  color: #222;

  font-size: 14px;
}


/* =========================
   OPTIONS
========================= */

.login-options {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 25px;
}


.remember {
  display: flex;

  align-items: center;

  gap: 8px;

  color: #666;

  font-size: 13px;

  cursor: pointer;
}


.remember input {
  accent-color: #d81b60;
}


/* =========================
   LOGIN BUTTON
========================= */

.login-button {
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  padding: 14px;

  border: none;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #e91e63,
      #d81b60
    );

  color: white;

  font-size: 15px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.25s;
}


.login-button:hover {
  transform:
    translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(216, 27, 96, 0.25);
}


/* =========================
   REGISTER
========================= */

.register-link {
  display: flex;

  justify-content: center;

  gap: 6px;

  margin-top: 25px;

  font-size: 13px;

  color: #777;
}


.register-link button {
  padding: 0;

  border: none;

  background: none;

  color: #d81b60;

  font-weight: 700;

  cursor: pointer;
}


.register-link button:hover {
  text-decoration: underline;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 500px) {

  .login-card {
    padding: 30px 22px;
  }


  .login-header h1 {
    font-size: 26px;
  }

}

</style>