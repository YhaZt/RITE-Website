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
            <svg class="contact-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <a :href="`mailto:${contactInfo.email}`" class="contact-link">{{ contactInfo.email }}</a>
          </li>
          <li class="contact-item">
            <svg class="contact-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span class="contact-text">{{ contactInfo.phone }}</span>
          </li>
          <li class="contact-item">
            <svg class="contact-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
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
  color: #f8fafc;
  padding: 4rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #34d399;
  margin: 0;
  letter-spacing: 1px;
}

.brand-subtitle {
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.brand-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #e2e8f0;
  margin: 0;
  max-width: 440px;
}

.column-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
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
  width: 36px;
  height: 3px;
  background-color: #34d399;
  border-radius: 2px;
}

.footer-links-list,
.contact-info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer-link {
  font-size: 0.95rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
}

.footer-link:hover {
  color: #34d399;
  transform: translateX(4px);
  display: inline-block;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  font-size: 0.95rem;
  color: #e2e8f0;
}

.contact-svg {
  color: #34d399;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-link {
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.contact-link:hover {
  color: #34d399;
}

.contact-text {
  line-height: 1.5;
  font-weight: 500;
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
  font-size: 0.9rem;
  color: #94a3b8;
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
