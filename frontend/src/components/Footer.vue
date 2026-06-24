<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <!-- Column 1: Brand Info -->
      <div class="footer-column brand-column">
        <h3 class="brand-title">RITE</h3>
        <p class="brand-subtitle">Research, Innovation, Technology &amp; Extension</p>
        <p class="brand-text">
          Mindoro State University's institutional portal for research excellence, dynamic community extension, and technology commercialization.
        </p>
      </div>

      <!-- Column 2: Navigation Links -->
      <div class="footer-column links-column">
        <h4 class="column-title">Quick Links</h4>
        <ul class="footer-links-list">
          <li><router-link to="/" class="footer-link">Home</router-link></li>
          <li><router-link to="/about" class="footer-link">About Us</router-link></li>
          <li><router-link to="/research" class="footer-link">Research &amp; Publications</router-link></li>
          <li><router-link to="/innovation" class="footer-link">Innovation</router-link></li>
          <li><router-link to="/centers" class="footer-link">Research Centers</router-link></li>
        </ul>
      </div>

      <!-- Column 3: Contact Info -->
      <div class="footer-column contact-column">
        <h4 class="column-title">Contact Us</h4>
        <ul class="contact-info-list">
          <li class="contact-item">
            <span class="contact-icon">✉</span>
            <a :href="`mailto:${contactInfo.email}`" class="contact-link">{{ contactInfo.email }}</a>
          </li>
          <li class="contact-item">
            <span class="contact-icon">📞</span>
            <span class="contact-text">{{ contactInfo.phone }}</span>
          </li>
          <li class="contact-item">
            <span class="contact-icon">📍</span>
            <span class="contact-text">{{ contactInfo.location }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Copyright Bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright-text">
          &copy; {{ currentYear }} Mindoro State University - RITE. All rights reserved.
        </p>
        <p class="signature-text">
          Designed for excellence and innovation.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { contactInfo } from "@/data/siteData";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.site-footer {
  background: linear-gradient(135deg, #051d0e 0%, #0c361e 100%);
  color: #e2e8f0;
  padding: 4rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin-top: auto;
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #10b981;
  margin: 0;
  letter-spacing: 1px;
}

.brand-subtitle {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  opacity: 0.95;
}

.brand-text {
  font-size: 0.9rem;
  line-height: 1.7;
  color: #94a3b8;
  margin: 0;
  max-width: 440px;
}

.column-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  position: relative;
  padding-bottom: 0.5rem;
}

.column-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 32px;
  height: 2.5px;
  background-color: #10b981;
  border-radius: 2px;
}

.footer-links-list,
.contact-info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  font-size: 0.9rem;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: #10b981;
  transform: translateX(3px);
  display: inline-block;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #94a3b8;
}

.contact-icon {
  color: #10b981;
  font-size: 1rem;
}

.contact-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #10b981;
}

.contact-text {
  line-height: 1.5;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: #64748b;
}

.copyright-text,
.signature-text {
  margin: 0;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 2rem;
  }
  .site-footer {
    padding-top: 3rem;
  }
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
