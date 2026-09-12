<template>

  <main class="contact-page">

    <section class="contact-header">

      <p class="section-small">
        WE'D LOVE TO HEAR FROM YOU
      </p>

      <h1>
        Contact Us
      </h1>

      <p>
        Have a question or suggestion?
        Send us a message.
      </p>

    </section>


    <section class="contact-container">

      <div class="contact-info">

        <div class="info-item">

          <div class="info-icon">
            <MapPin />
          </div>

          <div>
            <h3>
              Visit Us
            </h3>

            <p>
              Phnom Penh, Cambodia
            </p>
          </div>

        </div>


        <div class="info-item">

          <div class="info-icon">
            <Phone />
          </div>

          <div>
            <h3>
              Call Us
            </h3>

            <p>
              +855 712 447 679
            </p>
          </div>

        </div>


        <div class="info-item">

          <div class="info-icon">
            <Mail />
          </div>

          <div>
            <h3>
              Email Us
            </h3>

            <p>
              Team3@email.com
            </p>
          </div>

        </div>


        <div class="info-item">

          <div class="info-icon">
            <Clock />
          </div>

          <div>
            <h3>
              Opening Hours
            </h3>

            <p>
              8:00 AM – 9:00 PM
            </p>
          </div>

        </div>

      </div>


      <form
        class="contact-form"
        @submit.prevent="submitForm"
      >

        <div class="form-row">

          <div>
            <label>
              Your Name
            </label>

            <input
              v-model="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label>
              Email
            </label>

            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

        </div>


        <label>
          Subject
        </label>

        <input
          v-model="subject"
          type="text"
          placeholder="What is this about?"
          required
        />


        <label>
          Message
        </label>

        <textarea
          v-model="message"
          placeholder="Write your message..."
          required
        ></textarea>


        <button type="submit">

          <Send :size="18" />

          Send Message

        </button>

      </form>

    </section>

  </main>

</template>

<script setup lang="ts">

import {
  ref
} from 'vue'

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send
} from 'lucide-vue-next'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

function submitForm() {

  alert(
    `Thank you ${name.value}! Your message has been sent.`
  )

  name.value = ''
  email.value = ''
  subject.value = ''
  message.value = ''

}

</script>
<style scoped>
/* ================= PAGE LAYOUT ================= */
.contact-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  min-height: 85vh;
}

/* ================= HEADER SECTION ================= */
.contact-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-small {
  font-size: 11px;
  font-weight: 800;
  color: #f48fb1;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.contact-header h1 {
  font-size: 36px;
  font-weight: 900;
  color: #111111;
  margin: 0 0 10px 0;
}

.contact-header p {
  font-size: 16px;
  color: #666666;
  margin: 0;
  font-weight: 500;
}

/* ================= CONTENT CONTAINER ================= */
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: start;
}

/* ================= CONTACT INFO (LEFT) ================= */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f8bbd0;
  border-radius: 20px;
  transition: all 0.25s ease;
}

.info-item:hover {
  border-color: #f48fb1;
  transform: translateX(6px);
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.06);
}

.info-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #fdf2f8;
  color: #d81b60;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-item h3 {
  font-size: 15px;
  font-weight: 800;
  color: #111111;
  margin: 0 0 4px 0;
}

.info-item p {
  font-size: 14px;
  color: #666666;
  margin: 0;
  font-weight: 500;
}

/* ================= CONTACT FORM (RIGHT) ================= */
.contact-form {
  background: linear-gradient(180deg, #ffffff 0%, #fce4ec 100%);
  border: 1px solid #f8bbd0;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(216, 27, 96, 0.05);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.contact-form label {
  font-size: 13px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 6px;
  display: block;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #f8bbd0;
  border-radius: 14px;
  font-size: 14px;
  background: #ffffff;
  color: #1a1a1a;
  outline: none;
  font-family: inherit;
  transition: all 0.25s ease;
  box-sizing: border-box;
}

.contact-form textarea {
  min-height: 130px;
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #d81b60;
  box-shadow: 0 0 0 3px rgba(216, 27, 96, 0.12);
}

.contact-form button[type="submit"] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 8px 20px rgba(216, 27, 96, 0.25);
  transition: all 0.25s ease;
}

.contact-form button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(216, 27, 96, 0.35);
}

.contact-form button[type="submit"]:active {
  transform: translateY(0);
}

/* ================= RESPONSIVE ================= */
@media (max-width: 850px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 20px;
  }
}
</style>