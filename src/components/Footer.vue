<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="footer-logo">
            <CupSoda :size="28" color="#d81b60" />
            <span>Team<span class="highlight">&lt;3</span></span>
          </div>

          <p class="brand-desc">
            Fresh drinks, happy moments.<br>
            Made with love for My Team3 togeter.
          </p>
        </div>

        <!-- Links Section -->
        <div class="footer-group">
          <h3>Quick Links</h3>
          <nav class="footer-links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/drinks">Drinks</RouterLink>
            <RouterLink to="/offers">Offers</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
          </nav>
        </div>

        <!-- Contact Section -->
        <div class="footer-group">
          <h3>Contact</h3>
          <div class="contact-info">
            <p>Phnom Penh, Cambodia</p>
            <p>+855 12 345 678</p>
            <p>team3@gmail.com</p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 Team3. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { CupSoda } from 'lucide-vue-next'
</script>

<style scoped>
/* ================= FOOTER CONTAINER ================= */
.footer {
  background: linear-gradient(180deg, #ffffff 0%, #fce4ec 100%);
  border-top: 1px solid #f8bbd0;
  padding: 60px 20px 25px;
  color: #444;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #f48fb1;
}

/* ================= BRAND ================= */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 900;
  color: #250505;
  margin-bottom: 14px;
}

.logo-icon {
  color: #efe6e9;
  min-width: 28px;
  min-height: 28px;
}

.highlight {
  color: #d81b60;
}

.brand-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

/* ================= HEADINGS ================= */
.footer-group h3 {
  font-size: 16px;
  font-weight: 800;
  color: #111;
  margin: 0 0 18px;
}

/* ================= LINKS ================= */
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  width: fit-content;
}

.footer-links a:hover {
  color: #d81b60;
  transform: translateX(5px);
}

/* Router active link inside footer */
.footer-links a.router-link-active {
  color: #d81b60;
  font-weight: 800;
}

/* ================= CONTACT ================= */
.contact-info p {
  color: #666;
  font-size: 14px;
  margin: 0 0 10px;
  line-height: 1.5;
}

/* ================= BOTTOM ================= */
.footer-bottom {
  padding-top: 25px;
  text-align: center;
  color: #888888;
  font-size: 13px;
  font-weight: 500;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>