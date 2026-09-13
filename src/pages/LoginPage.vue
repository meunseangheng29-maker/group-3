<template>
  <main class="login-page">

    <!-- Left Side -->
    <section class="login-intro">

      <div class="intro-label">
        WELCOME BACK
      </div>

      <h1>
        Welcome Back to
        <span>Team&lt;3Coffee</span>
      </h1>

      <p>
        Login to your account and continue
        enjoying your favorite drinks.
      </p>

    </section>


    <!-- Login Card -->
    <section class="login-section">

      <div class="login-card">

        <div class="login-header">
          <div class="login-icon">
            <User :size="28" />
          </div>

          <h2>Login</h2>

          <p>
            Enter your account details
          </p>
        </div>


        <!-- Login Form -->
        <form @submit.prevent="login">

          <!-- Username -->
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
                required
              />
            </div>

          </div>


          <!-- Password -->
          <div class="form-group">

            <label>
              Password
            </label>

            <div class="input-wrapper">

              <Lock :size="19" />

              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
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


          <!-- Remember + Forgot -->
          <div class="login-options">

            <label class="remember">
              <input
                v-model="rememberMe"
                type="checkbox"
              />

              <span>Remember me</span>
            </label>

            <RouterLink to="/forgot-password">
              Forgot password?
            </RouterLink>

          </div>


          <!-- Error -->
          <p
            v-if="errorMessage"
            class="error-message"
          >
            {{ errorMessage }}
          </p>


          <!-- Login Button -->
          <button
            type="submit"
            class="login-submit"
          >
            <LogIn :size="19" />
            Login
          </button>

        </form>


        <!-- Register -->
        <div class="register-link">
          <span>Don't have an account?</span>

          <RouterLink to="/register">
            Create an account
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
  Lock,
  LogIn
} from 'lucide-vue-next'


const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const showPassword = ref(false)
const errorMessage = ref('')


function login() {

  errorMessage.value = ''

  if (!username.value || !password.value) {
    errorMessage.value =
      'Please enter your username and password.'

    return
  }

  /*
    For now this is only the Vue frontend.

    Later we will connect this form
    to your Flask API.
  */

  console.log('Username:', username.value)
  console.log('Password:', password.value)
  console.log('Remember me:', rememberMe.value)

  alert(`Welcome, ${username.value}!`)
}

</script>


<style scoped>

/* ================= PAGE ================= */

.login-page {
  min-height: calc(100vh - 75px);

  display: grid;
  grid-template-columns: 1fr 1fr;

  background: #ffffff;
}


/* ================= LEFT INTRO ================= */

.login-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 70px;

  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f8bbd0 50%,
      #f3e5f5 100%
    );
}

.intro-label {
  display: inline-flex;

  width: fit-content;

  padding: 9px 22px;

  margin-bottom: 25px;

  background: #ffffff;

  color: #c93662;

  border-radius: 30px;

  font-size: 12px;
  font-weight: 900;

  letter-spacing: 1.5px;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.08);
}

.login-intro h1 {
  max-width: 600px;

  margin: 0;

  color: #16070d;

  font-size: 54px;

  line-height: 1.1;

  font-weight: 900;
}

.login-intro h1 span {
  display: block;

  color: #cf3865;
}

.login-intro p {
  max-width: 500px;

  margin-top: 25px;

  color: #5f6268;

  font-size: 18px;

  line-height: 1.7;
}


/* ================= LOGIN SECTION ================= */

.login-section {
  display: flex;

  align-items: center;
  justify-content: center;

  padding: 50px 30px;

  background: #ffffff;
}


/* ================= LOGIN CARD ================= */

.login-card {
  width: 100%;

  max-width: 440px;

  padding: 35px;

  background:
    linear-gradient(
      180deg,
      #ffffff 0%,
      #fff7fa 100%
    );

  border: 1px solid #f8bbd0;

  border-radius: 28px;

  box-shadow:
    0 15px 40px rgba(216, 27, 96, 0.08);

  box-sizing: border-box;
}


/* ================= HEADER ================= */

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

  border-radius: 18px;

  background:
    linear-gradient(
      135deg,
      #e91e63,
      #d81b60
    );

  color: #ffffff;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.25);
}

.login-header h2 {
  margin: 0;

  color: #171717;

  font-size: 30px;

  font-weight: 900;
}

.login-header p {
  margin: 7px 0 0;

  color: #777777;

  font-size: 14px;
}


/* ================= FORM ================= */

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;

  margin-bottom: 7px;

  color: #333333;

  font-size: 13px;

  font-weight: 800;
}


/* ================= INPUT ================= */

.input-wrapper {
  position: relative;

  display: flex;
  align-items: center;
}

.input-wrapper > svg {
  position: absolute;
  left: 15px;

  color: #d81b60;

  pointer-events: none;
}

.input-wrapper input {
  width: 100%;

  height: 48px;

  padding: 0 15px 0 45px;

  border: 1px solid #f8bbd0;

  border-radius: 14px;

  outline: none;

  background: #ffffff;

  color: #222222;

  font-size: 14px;

  box-sizing: border-box;

  transition: all 0.25s ease;
}

.input-wrapper input:focus {
  border-color: #d81b60;

  box-shadow:
    0 0 0 3px rgba(216, 27, 96, 0.12);
}

.input-wrapper input::placeholder {
  color: #aaaaaa;
}


/* ================= SHOW PASSWORD ================= */

.show-password {
  position: absolute;

  right: 12px;

  border: none;

  background: transparent;

  color: #d81b60;

  font-size: 12px;

  font-weight: 700;

  cursor: pointer;
}


/* ================= OPTIONS ================= */

.login-options {
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin: 5px 0 20px;

  font-size: 12px;
}

.remember {
  display: flex;

  align-items: center;

  gap: 6px;

  color: #666666;

  cursor: pointer;
}

.remember input {
  accent-color: #d81b60;
}

.login-options a {
  color: #d81b60;

  text-decoration: none;

  font-weight: 700;
}

.login-options a:hover {
  text-decoration: underline;
}


/* ================= ERROR ================= */

.error-message {
  margin: 0 0 15px;

  padding: 10px 12px;

  border-radius: 10px;

  background: #fff0f3;

  color: #c62852;

  font-size: 13px;

  font-weight: 600;
}


/* ================= LOGIN BUTTON ================= */

.login-submit {
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 9px;

  padding: 14px;

  border: none;

  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      #e91e63,
      #d81b60
    );

  color: #ffffff;

  font-size: 15px;

  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.25);

  transition: all 0.25s ease;
}

.login-submit:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 28px rgba(216, 27, 96, 0.35);
}

.login-submit:active {
  transform: translateY(0);
}


/* ================= REGISTER ================= */

.register-link {
  display: flex;

  justify-content: center;

  gap: 5px;

  margin-top: 25px;

  font-size: 13px;

  color: #777777;
}

.register-link a {
  color: #d81b60;

  font-weight: 800;

  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}


/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {

  .login-page {
    grid-template-columns: 1fr;
  }

  .login-intro {
    min-height: 350px;

    padding: 55px 30px;

    text-align: center;

    align-items: center;
  }

  .login-intro h1 {
    font-size: 45px;
  }

  .login-intro p {
    font-size: 16px;
  }

}


@media (max-width: 550px) {

  .login-intro {
    min-height: 300px;

    padding: 45px 20px;
  }

  .login-intro h1 {
    font-size: 36px;
  }

  .login-section {
    padding: 35px 16px;
  }

  .login-card {
    padding: 25px 20px;
  }

  .login-options {
    flex-direction: column;
    align-items: flex-start;

    gap: 10px;
  }

}

</style>