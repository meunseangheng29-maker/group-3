<template>
  <main class="contact-page">

    <!-- ================= HERO ================= -->
    <section class="contact-hero">

      <div class="hero-label">
        WE'D LOVE TO HEAR FROM YOU
      </div>

      <h1>
        Get in Touch With
        <span>Us</span>
      </h1>

      <p>
        Have a question, suggestion, or just want to say hello?
        <br />
        We would love to hear from you.
      </p>

    </section>


    <!-- ================= CONTACT SECTION ================= -->
    <section class="contact-section">

      <div class="contact-container">

        <!-- ================= CONTACT INFO ================= -->
        <div class="contact-info">

          <div class="info-title">
            <span>CONTACT INFORMATION</span>
            <h2>Let's Talk</h2>
            <p>
              We're always happy to hear from our customers.
              Feel free to contact us anytime.
            </p>
          </div>


          <!-- Visit Us -->
          <div class="info-item">

            <div class="info-icon">
              <MapPin :size="22" />
            </div>

            <div>
              <h3>Visit Us</h3>
              <p>Phnom Penh, Cambodia</p>
            </div>

          </div>


          <!-- Call Us -->
          <div class="info-item">

            <div class="info-icon">
              <Phone :size="22" />
            </div>

            <div>
              <h3>Call Us</h3>
              <p>+855 712 447 679</p>
            </div>

          </div>


          <!-- Email -->
          <div class="info-item">

            <div class="info-icon">
              <Mail :size="22" />
            </div>

            <div>
              <h3>Email Us</h3>
              <p>Team3@email.com</p>
            </div>

          </div>


          <!-- Opening Hours -->
          <div class="info-item">

            <div class="info-icon">
              <Clock :size="22" />
            </div>

            <div>
              <h3>Opening Hours</h3>
              <p>8:00 AM – 9:00 PM</p>
            </div>

          </div>

        </div>


        <!-- ================= CONTACT FORM ================= -->
        <form
          class="contact-form"
          @submit.prevent="submitForm"
        >

          <div class="form-title">
            <span>SEND US A MESSAGE</span>
            <h2>Get In Touch</h2>
          </div>


          <!-- Name + Email -->
          <div class="form-row">

            <div class="form-group">

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


            <div class="form-group">

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


          <!-- Subject -->
          <div class="form-group">

            <label>
              Subject
            </label>

            <input
              v-model="subject"
              type="text"
              placeholder="What is this about?"
              required
            />

          </div>


          <!-- Message -->
          <div class="form-group">

            <label>
              Message
            </label>

            <textarea
              v-model="message"
              placeholder="Write your message..."
              required
            ></textarea>

          </div>


          <!-- Submit -->
          <button type="submit">

            <Send :size="18" />

            Send Message

          </button>

        </form>

      </div>

    </section>

  </main>
</template>


<script setup lang="ts">

import { ref } from 'vue'

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

/* ==================================================
   PAGE
================================================== */

.contact-page {
  width: 100%;
  background: #ffffff;
}


/* ==================================================
   HERO
================================================== */

.contact-hero {
  min-height: 560px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  padding: 80px 20px;

  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f8bbd0 50%,
      #f3e5f5 100%
    );

  box-sizing: border-box;
}


/* White label */

.hero-label {
  width: min(840px, 90%);

  padding: 10px 20px;

  background: #ffffff;

  border-radius: 30px;

  color: #c93662;

  font-size: 16px;
  font-weight: 900;

  letter-spacing: 2px;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.08);

  margin-bottom: 28px;
}


/* Hero title */

.contact-hero h1 {
  margin: 0;

  max-width: 900px;

  color: #16070d;

  font-size: 62px;
  line-height: 1.1;

  font-weight: 900;

  letter-spacing: -1px;
}

.contact-hero h1 span {
  display: block;

  color: #cf3865;
}


/* Hero description */

.contact-hero p {
  margin: 28px 0 0;

  color: #5f6268;

  font-size: 19px;

  line-height: 1.8;

  font-weight: 500;
}


/* ==================================================
   CONTACT SECTION
================================================== */

.contact-section {
  max-width: 1200px;

  margin: 0 auto;

  padding: 80px 20px 100px;

  box-sizing: border-box;
}


/* ==================================================
   CONTAINER
================================================== */

.contact-container {
  display: grid;

  grid-template-columns: 1fr 1.4fr;

  gap: 45px;

  align-items: start;
}


/* ==================================================
   CONTACT INFORMATION
================================================== */

.contact-info {
  display: flex;

  flex-direction: column;

  gap: 16px;
}


/* Information title */

.info-title {
  margin-bottom: 10px;
}

.info-title > span {
  color: #d81b60;

  font-size: 12px;

  font-weight: 900;

  letter-spacing: 1.5px;
}

.info-title h2 {
  margin: 8px 0;

  font-size: 32px;

  color: #171717;

  font-weight: 900;
}

.info-title p {
  margin: 0 0 15px;

  color: #666666;

  font-size: 15px;

  line-height: 1.7;
}


/* ==================================================
   INFORMATION CARD
================================================== */

.info-item {
  display: flex;

  align-items: center;

  gap: 16px;

  padding: 20px;

  background: #ffffff;

  border: 1px solid #f8bbd0;

  border-radius: 20px;

  transition: all 0.25s ease;

  box-sizing: border-box;
}

.info-item:hover {
  transform: translateX(6px);

  border-color: #f48fb1;

  box-shadow:
    0 10px 25px rgba(216, 27, 96, 0.08);
}


/* Icon */

.info-icon {
  width: 50px;
  height: 50px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  background: #fdf2f8;

  color: #d81b60;
}


/* Text */

.info-item h3 {
  margin: 0 0 5px;

  color: #151515;

  font-size: 15px;

  font-weight: 800;
}

.info-item p {
  margin: 0;

  color: #666666;

  font-size: 14px;

  font-weight: 500;
}


/* ==================================================
   FORM
================================================== */

.contact-form {
  padding: 35px;

  background:
    linear-gradient(
      180deg,
      #ffffff 0%,
      #fce4ec 100%
    );

  border: 1px solid #f8bbd0;

  border-radius: 28px;

  box-shadow:
    0 15px 35px rgba(216, 27, 96, 0.07);

  display: flex;

  flex-direction: column;

  gap: 18px;

  box-sizing: border-box;
}


/* Form title */

.form-title {
  margin-bottom: 5px;
}

.form-title span {
  color: #d81b60;

  font-size: 11px;

  font-weight: 900;

  letter-spacing: 1.5px;
}

.form-title h2 {
  margin: 7px 0 0;

  color: #171717;

  font-size: 30px;

  font-weight: 900;
}


/* ==================================================
   FORM ROW
================================================== */

.form-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 16px;
}


/* ==================================================
   FORM GROUP
================================================== */

.form-group {
  width: 100%;
}

.contact-form label {
  display: block;

  margin-bottom: 7px;

  color: #333333;

  font-size: 13px;

  font-weight: 800;
}


/* ==================================================
   INPUT + TEXTAREA
================================================== */

.contact-form input,
.contact-form textarea {
  width: 100%;

  padding: 13px 16px;

  border: 1px solid #f8bbd0;

  border-radius: 14px;

  background: #ffffff;

  color: #222222;

  font-family: inherit;

  font-size: 14px;

  outline: none;

  box-sizing: border-box;

  transition: all 0.25s ease;
}

.contact-form input {
  height: 48px;
}

.contact-form textarea {
  min-height: 140px;

  resize: vertical;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #aaaaaa;
}


/* Focus */

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #d81b60;

  box-shadow:
    0 0 0 3px rgba(216, 27, 96, 0.12);
}


/* ==================================================
   BUTTON
================================================== */

.contact-form button {
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 10px;

  width: 100%;

  padding: 15px 25px;

  border: none;

  border-radius: 15px;

  background:
    linear-gradient(
      135deg,
      #e91e63 0%,
      #d81b60 100%
    );

  color: #ffffff;

  font-size: 15px;

  font-weight: 800;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(216, 27, 96, 0.25);

  transition: all 0.25s ease;
}

.contact-form button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 28px rgba(216, 27, 96, 0.35);
}

.contact-form button:active {
  transform: translateY(0);
}


/* ==================================================
   RESPONSIVE
================================================== */

@media (max-width: 900px) {

  .contact-container {
    grid-template-columns: 1fr;
  }

  .contact-hero h1 {
    font-size: 50px;
  }

}


@media (max-width: 600px) {

  .contact-hero {
    min-height: 500px;

    padding: 60px 16px;
  }

  .hero-label {
    font-size: 12px;

    letter-spacing: 1.2px;
  }

  .contact-hero h1 {
    font-size: 38px;
  }

  .contact-hero p {
    font-size: 16px;
  }

  .contact-hero p br {
    display: none;
  }

  .contact-section {
    padding: 55px 16px 70px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 22px;
  }

}

</style>