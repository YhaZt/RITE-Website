<template>
  <main class="contact-page">
    <div class="contact-grid">
      <!-- Left Column: Details -->
      <section class="contact-details-panel">
        <div class="glow-orb"></div>
        
        <div class="details-content">
          <span class="details-tag">Connect With Us</span>
          <h1 class="details-title">Get in Touch with RITE</h1>
          <p class="details-desc">
            We are here to support your research, publication, and technology transfer goals. Reach out to our offices for inquiries, consultations, or collaborative ventures.
          </p>

          <div class="info-list">
            <div class="info-item">
              <span class="info-icon">✉</span>
              <div>
                <h4>Email Address</h4>
                <a :href="`mailto:${contactInfo.email}`" class="info-link">{{ contactInfo.email }}</a>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📞</span>
              <div>
                <h4>Phone Number</h4>
                <a :href="`tel:${contactInfo.phone}`" class="info-link">{{ contactInfo.phone }}</a>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📍</span>
              <div>
                <h4>Office Location</h4>
                <p class="info-text">{{ contactInfo.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Column: Inquiry Form -->
      <section class="contact-form-panel">
        <form @submit.prevent="handleSubmit" class="inquiry-form">
          <h3 class="form-title">Send Us a Message</h3>
          <p class="form-subtitle">Fill out the form below and our team will get back to you shortly.</p>

          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              v-model="form.message"
              id="message"
              required
              rows="5"
              placeholder="Write your inquiry here..."
              class="form-input"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="submitting">
            {{ submitting ? 'Sending...' : 'Send Inquiry →' }}
          </button>

          <transition name="fade">
            <p v-if="submitSuccess" class="success-message">
              ✓ Message sent successfully! Thank you for reaching out.
            </p>
          </transition>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from "vue";
import { contactInfo } from "@/data/siteData";

const form = reactive({
  name: "",
  email: "",
  message: ""
});

const submitting = ref(false);
const submitSuccess = ref(false);

const handleSubmit = async () => {
  submitting.value = true;
  // Simulate API post
  await new Promise((resolve) => setTimeout(resolve, 1000));
  submitting.value = false;
  submitSuccess.value = true;
  form.name = "";
  form.email = "";
  form.message = "";
  setTimeout(() => {
    submitSuccess.value = false;
  }, 4000);
};
</script>

<style scoped>
.contact-page {
  padding: 4rem 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  width: 100%;
  align-items: start;
}

/* Left Column: Details */
.contact-details-panel {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0d5e32 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 45px -15px rgba(5, 48, 24, 0.22);
}

.glow-orb {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%);
  filter: blur(20px);
}

.details-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.details-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #10b981;
}

.details-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 800;
  margin: 0;
  line-height: 1.15;
  color: white;
}

.details-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0 0 1.5rem 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.info-item h4 {
  font-family: 'Outfit', sans-serif;
  margin: 0 0 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}

.info-link {
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: opacity 0.2s ease;
}

.info-link:hover {
  text-decoration: underline;
  opacity: 0.85;
}

.info-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: white;
  font-weight: 500;
}

/* Right Column: Inquiry Form */
.contact-form-panel {
  background: white;
  border-radius: 28px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  padding: 3.5rem 3rem;
}

.inquiry-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.form-subtitle {
  color: #64748b;
  font-size: 0.92rem;
  margin: 0 0 0.5rem 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  color: #334155;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  outline: none;
  font-size: 0.92rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
}

.submit-btn {
  font-family: 'Outfit', sans-serif;
  width: 100%;
  padding: 0.9rem;
  border-radius: 999px;
  border: none;
  background: #053018;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(5, 48, 24, 0.15);
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #0d5e32;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  color: #15803d;
  font-size: 0.88rem;
  font-weight: 700;
  margin: 0.5rem 0 0;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 3rem 1.5rem;
  }
  .contact-details-panel {
    padding: 3rem 1.75rem;
  }
  .contact-form-panel {
    padding: 2.5rem 1.75rem;
  }
}
</style>
