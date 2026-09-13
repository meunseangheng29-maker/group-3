<template>
  <main class="forgot-page">

    <section class="forgot-card">

      <div class="forgot-icon">
        <LockKeyhole :size="28" />
      </div>

      <h1>Forgot Password?</h1>

      <p>
        Enter your email address and we'll help you
        reset your password.
      </p>

      <form @submit.prevent="resetPassword">

        <label>
          Email
        </label>

        <div class="input-wrapper">
          <Mail :size="19" />

          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit">
          <Send :size="18" />
          Send Reset Link
        </button>

      </form>

      <RouterLink
        to="/login"
        class="back-login"
      >
        ← Back to Login
      </RouterLink>

    </section>

  </main>
</template>


<script setup lang="ts">

import { ref } from 'vue'

import {
  LockKeyhole,
  Mail,
  Send
} from 'lucide-vue-next'

const email = ref('')

function resetPassword() {

  alert(
    `A password reset link has been sent to ${email.value}`
  )

  email.value = ''
}

</script>


<style scoped>

.forgot-page {
  min-height: calc(100vh - 75px);

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

.forgot-card {
  width: 100%;
  max-width: 430px;

  padding: 40px;

  background: #ffffff;

  border: 1px solid #f8bbd0;

  border-radius: 28px;

  text-align: center;

  box-shadow:
    0 15px 40px rgba(216, 27, 96, 0.12);

  box-sizing: border-box;
}

.forgot-icon {
  width: 60px;
  height: 60px;

  margin: 0 auto 18px;

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

  color: white;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.25);
}

.forgot-card h1 {
  margin: 0 0 10px;

  color: #171717;

  font-size: 30px;

  font-weight: 900;
}

.forgot-card > p {
  margin: 0 0 28px;

  color: #777777;

  font-size: 14px;

  line-height: 1.6;
}

.forgot-card form {
  text-align: left;
}

.forgot-card label {
  display: block;

  margin-bottom: 7px;

  color: #333333;

  font-size: 13px;

  font-weight: 800;
}

.input-wrapper {
  position: relative;

  display: flex;
  align-items: center;
}

.input-wrapper svg {
  position: absolute;

  left: 15px;

  color: #d81b60;
}

.input-wrapper input {
  width: 100%;
  height: 48px;

  padding: 0 15px 0 45px;

  border: 1px solid #f8bbd0;

  border-radius: 14px;

  outline: none;

  font-size: 14px;

  box-sizing: border-box;
}

.input-wrapper input:focus {
  border-color: #d81b60;

  box-shadow:
    0 0 0 3px rgba(216, 27, 96, 0.12);
}

.forgot-card button {
  width: 100%;

  margin-top: 20px;

  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  border: none;

  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      #e91e63,
      #d81b60
    );

  color: white;

  font-size: 15px;

  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.25);

  transition: all 0.25s ease;
}

.forgot-card button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 28px rgba(216, 27, 96, 0.35);
}

.back-login {
  display: inline-block;

  margin-top: 25px;

  color: #d81b60;

  font-size: 13px;

  font-weight: 800;

  text-decoration: none;
}

.back-login:hover {
  text-decoration: underline;
}

@media (max-width: 500px) {

  .forgot-card {
    padding: 28px 20px;
  }

}

</style>