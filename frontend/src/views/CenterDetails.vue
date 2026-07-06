<template>
  <main v-if="center" class="center-details-page" :style="{ '--theme-color': center.themeColor, '--theme-gradient': center.gradient }">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      
      <div class="hero-content">
        <span class="hero-tag">Research Center Profile</span>
        <h1 class="hero-title" style="color:#ffffff !important;">
          {{ center.title }}
        </h1>
        <p class="hero-desc" style="color:#f1f5f9 !important;">{{ center.description }}</p>
        <div class="hero-line"></div>
        <button @click="showModal = true" class="btn-hero-action" style="margin-top:1.5rem;">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:8px; vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Send Research Inquiry
        </button>
      </div>
    </section>

    <!-- Focus Areas -->
    <section v-if="center.focusAreas && center.focusAreas.length > 0" class="focus-section">
      <h2 class="section-title">Research Focus Areas</h2>
      <p class="section-subtitle">Advancing studies across key domains</p>
      
      <div class="focus-grid">
        <div
          v-for="(area, i) in center.focusAreas"
          :key="i"
          class="focus-card"
          :style="{
            '--area-color': area.color,
            '--area-bg': area.bg
          }"
        >
          <div class="focus-icon-box">
            {{ area.icon }}
          </div>
          <h4 class="focus-card-title">{{ area.title }}</h4>
          <p class="focus-card-desc">{{ area.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Programs & Services -->
    <section v-if="center.programs && center.programs.length > 0" class="programs-section">
      <h3 class="section-title">Programs &amp; Services</h3>
      <p class="section-subtitle">Driving research-based solutions and capacity building</p>
      
      <div class="programs-grid">
        <div
          v-for="(p, i) in center.programs"
          :key="i"
          class="program-card"
          :style="{ '--p-color': p.color }"
        >
          <div class="program-icon-box">
            {{ p.icon }}
          </div>
          <h4 class="program-card-title">{{ p.title }}</h4>
          <p class="program-card-desc">{{ p.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Research Highlights (If present) -->
    <section v-if="center.highlights && center.highlights.length > 0" class="highlights-section">
      <h3 class="highlights-title">Recent Research Highlights</h3>
      <p class="highlights-subtitle">Breakthrough studies and developments in this domain</p>
      
      <div class="highlights-grid">
        <div
          v-for="(r, i) in center.highlights"
          :key="i"
          class="highlight-card"
        >
          <span class="highlight-tag" :style="{ background: r.tagColor }">
            {{ r.tag }}
          </span>
          <h4 class="highlight-card-title">{{ r.title }}</h4>
          <p class="highlight-card-desc">{{ r.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section v-if="center.mission" class="mission-section">
      <div class="mission-container">
        <div class="mission-glow"></div>
        <div class="mission-header">
          <svg class="mission-svg-icon" viewBox="0 0 24 24" width="24" height="24" stroke="#34d399" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
          <h3>Our Mission</h3>
        </div>
        <p class="mission-text">{{ center.mission }}</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <div class="cta-icon-box">
          <svg viewBox="0 0 24 24" width="36" height="36" stroke="#094A25" stroke-width="2" fill="none"><polygon points="12 2 20 7 4 7 12 2"></polygon><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line></svg>
        </div>
        <h3 class="cta-title">Partner With Us</h3>
        <p class="cta-desc">
          {{ center.ctaText || `Whether you're an industry stakeholder, LGU, or academic researcher, we invite you to collaborate with us to advance development in this sector.` }}
        </p>
        <div class="cta-actions">
          <button @click="showModal = true" class="cta-btn cta-btn-primary">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:6px; vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Send Center Inquiry
          </button>
          <router-link to="/centers" class="cta-btn cta-btn-secondary">
            Explore All Centers
          </router-link>
        </div>
      </div>
    </section>

    <!-- POPUP MODAL / SLIDE-OVER FORM -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <h3 style="color:#ffffff !important; margin:0;">Send Research Inquiry</h3>
            <p style="color:#a7f3d0 !important; margin:0.2rem 0 0 0;">Direct message to {{ center.title }}</p>
          </div>
          <button @click="showModal = false" class="modal-close-btn">✕</button>
        </div>

        <form @submit.prevent="handleSubmission" class="sub-form">
          <div v-if="submitSuccess" class="alert-success">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right:6px; vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg> Thank you! Your message and attached documents have been sent directly to {{ center.title }}.
          </div>
          <div v-if="submitError" class="alert-error">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right:6px; vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> {{ submitError }}
          </div>

          <div class="form-row-2">
            <div class="input-group">
              <label>Your Full Name *</label>
              <input v-model="subForm.sender_name" required type="text" placeholder="e.g. Dr. Alex Vance" />
            </div>
            <div class="input-group">
              <label>Email Address *</label>
              <input v-model="subForm.email" required type="email" placeholder="e.g. alex@partner.org" />
            </div>
          </div>

          <div class="form-row-2">
            <div class="input-group">
              <label>Contact Phone Number</label>
              <input v-model="subForm.phone" type="text" placeholder="e.g. +63 912 345 6789" />
            </div>
            <div class="input-group">
              <label>Inquiry Purpose Dropdown *</label>
              <select v-model="subForm.subject" required>
                <option value="Joint Research Proposal">Joint Research Proposal</option>
                <option value="Laboratory Facility Booking / Usage">Laboratory Facility Booking / Usage</option>
                <option value="Technical Consulting Request">Technical Consulting Request</option>
                <option value="General Inquiry">General Center Inquiry</option>
              </select>
            </div>
          </div>

          <div class="input-group">
            <label>Message / Collaboration Details *</label>
            <textarea v-model="subForm.message" required rows="3" placeholder="Describe your proposed collaboration, equipment requirements, or questions for our researchers..."></textarea>
          </div>

          <div class="input-group">
            <label>Attach Reference File / Proposal (PDF, DOCX, ZIP, Max 10MB)</label>
            <input type="file" @change="handleFileUpload" class="file-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" />
          </div>

          <div class="modal-footer-btns">
            <button type="button" @click="showModal = false" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="btn-submit">
              {{ isSubmitting ? 'Sending...' : 'Send Inquiry' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>

  <main v-else class="center-not-found-page">
    <div class="not-found-card">
      <svg viewBox="0 0 24 24" width="48" height="48" stroke="#094A25" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <h2>Center Not Found</h2>
      <p>The research center you are trying to view does not exist or has been moved.</p>
      <router-link to="/centers" class="back-link">
        Back to Research Centers
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { researchCenters } from "@/data/siteData";
import { centerService } from "@/services/centerService";

import { submissionService } from "@/services/submissionService";

const route = useRoute();
const apiCenterData = ref(null);

const showModal = ref(false);
const subForm = ref({
  sender_name: "",
  email: "",
  phone: "",
  subject: "Joint Research Proposal",
  message: "",
});
const selectedFile = ref(null);
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

const handleFileUpload = (e) => {
  if (e.target.files && e.target.files[0]) {
    selectedFile.value = e.target.files[0];
  }
};

const handleSubmission = async () => {
  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = "";

  try {
    const slug = route.params.id;
    const fd = new FormData();
    fd.append("target_unit", `center:${slug}`);
    fd.append("sender_name", subForm.value.sender_name);
    fd.append("email", subForm.value.email);
    fd.append("phone", subForm.value.phone);
    fd.append("subject", `${subForm.value.subject} (${center.value?.title || slug})`);
    fd.append("message", subForm.value.message);
    if (selectedFile.value) {
      fd.append("attachment", selectedFile.value);
    }

    await submissionService.submit(fd);
    submitSuccess.value = true;
    subForm.value = { sender_name: "", email: "", phone: "", subject: "Joint Research Proposal", message: "" };
    selectedFile.value = null;
    setTimeout(() => { showModal.value = false; submitSuccess.value = false; }, 2500);
  } catch (err) {
    submitError.value = err.response?.data?.message || "Failed to send inquiry.";
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  try {
    const slug = route.params.id;
    const res = await centerService.get(slug);
    if (res) {
      apiCenterData.value = res;
    }
  } catch (e) {
    console.warn("Using static center detail fallback", e);
  }
});

const center = computed(() => {
  const id = route.params.id;
  const staticData = researchCenters[id];
  
  if (staticData) {
    return staticData;
  }
  
  if (apiCenterData.value) {
    return {
      title: apiCenterData.value.name,
      icon: "🏛️",
      gradient: "linear-gradient(135deg, #053018 0%, #0c3e21 100%)",
      themeColor: "#094A25",
      description: apiCenterData.value.description,
      focusAreas: [
        { icon: "🔬", title: "Applied Research", desc: "Scientific investigation and technological innovation.", color: "#094A25", bg: "#f0fdf4" }
      ],
      programs: [
        { icon: "📋", title: "Programs & Advisory", desc: "Technical consulting and institutional research initiatives.", color: "#094A25" }
      ],
      mission: apiCenterData.value.description || "To advance regional research and knowledge development.",
    };
  }

  return null;
});
</script>

<style scoped>
*, *::before, *::after {
  box-sizing: border-box;
}

.center-details-page {
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #fcfdfd;
  overflow-x: hidden;
  width: 100%;
}

/* Hero Banner */
.hero-section {
  position: relative;
  background: var(--theme-gradient, linear-gradient(135deg, #053018 0%, #0c3e21 100%));
  color: white;
  padding: 5rem 1.5rem;
  overflow: hidden;
  width: 100%;
}

.hero-glow-1 {
  position: absolute;
  top: -60px;
  right: -40px;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
}

.hero-glow-2 {
  position: absolute;
  bottom: -80px;
  left: 10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
}

.hero-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.75;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.8rem, 4.5vw, 2.75rem);
  font-weight: 800;
  margin: 0;
  line-height: 1.25;
  color: #ffffff;
}

.title-icon {
  display: inline-block;
  margin-right: 0.4rem;
}

.hero-desc {
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.75;
  opacity: 0.92;
  margin: 0;
  max-width: 800px;
}

.hero-line {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 2px;
  margin-top: 1.5rem;
}

.btn-hero-action {
  background: #ffffff;
  color: #053018;
  border: none;
  padding: 0.9rem 2.2rem;
  border-radius: 999px;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.btn-hero-action:hover {
  transform: translateY(-3px);
  background: #f8fafc;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

/* Section Common Layouts */
.focus-section,
.programs-section,
.highlights-section,
.mission-section {
  padding: 1.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--theme-color, #094A25);
  margin: 0 0 0.4rem 0;
}

.section-subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0 0 3rem 0;
}

/* Focus Areas */
.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.focus-card {
  padding: 2.25rem 1.75rem;
  border-radius: 20px;
  background: var(--area-bg, #f8fafc);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.focus-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
}

.focus-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}

.focus-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--area-color, #094A25);
  margin: 0;
  line-height: 1.35;
}

.focus-card-desc {
  font-size: 0.88rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
}

/* Programs & Services */
.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.program-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  border-top: 4px solid var(--p-color, #094A25);
  border-left: 1px solid #f1f5f9;
  border-right: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.program-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.07);
}

.program-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  background: #f8fafc;
}

.program-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--p-color, #094A25);
  margin: 0 0 0.5rem 0;
}

.program-card-desc {
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0;
}

/* Highlights */
.highlights-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #094A25;
  margin: 0 0 0.4rem 0;
}

.highlights-subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0 0 3rem 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.highlight-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.25rem 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.highlight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.05);
}

.highlight-tag {
  display: inline-block;
  color: #fff;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.highlight-card-title {
  color: #0f172a;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
  line-height: 1.35;
}

.highlight-card-desc {
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0;
}

/* Mission Section */
.mission-container {
  position: relative;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  color: white;
  background: linear-gradient(135deg, var(--theme-color, #094A25) 0%, #053018 100%);
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(5, 48, 24, 0.12);
}

.mission-glow {
  position: absolute;
  top: -30px;
  right: -20px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.mission-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  position: relative;
}

.mission-icon {
  font-size: 1.5rem;
}

.mission-header h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0;
}

.mission-text {
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.92;
  margin: 0;
  position: relative;
}

/* CTA Section */
.cta-section {
  padding: 5rem 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(5, 48, 24, 0.03) 0%, rgba(5, 48, 24, 0.08) 100%);
  width: 100%;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.cta-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--theme-color, #094A25);
  margin: 0 0 0.8rem 0;
}

.cta-desc {
  font-size: 1rem;
  color: #334155;
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* MODAL POPUP STYLING */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 1.5rem; box-sizing: border-box;
}

.modal-card {
  background: #ffffff; width: 100%; max-width: 650px; border-radius: 28px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); animation: popIn 0.3s ease; max-height: 90vh; overflow-y: auto; text-align: left;
}

@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.modal-header {
  background: linear-gradient(135deg, #053018, #094A25); color: #ffffff !important; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center;
}
.modal-header h3 { margin: 0; font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #ffffff !important; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
.modal-header p { margin: 0.2rem 0 0 0; font-size: 0.9rem; color: #a7f3d0 !important; font-weight: 600; }
.modal-close-btn { background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.sub-form { padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
.alert-success { background: #dcfce7; color: #166534; padding: 1rem; border-radius: 12px; font-weight: 700; }
.alert-error { background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 12px; font-weight: 700; }

.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.input-group { display: flex; flex-direction: column; gap: 0.4rem; }
.input-group label { font-weight: 700; font-size: 0.85rem; color: #334155; }
.input-group input, .input-group select, .input-group textarea {
  width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid #cbd5e1; font-family: inherit; font-size: 0.95rem; outline: none; box-sizing: border-box;
}
.input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #094A25; box-shadow: 0 0 0 3px rgba(9, 74, 37, 0.12); }
.file-input { background: #f8fafc; padding: 0.5rem !important; }

.modal-footer-btns { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
.btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 0.8rem 1.5rem; border-radius: 999px; font-weight: 700; cursor: pointer; }
.btn-submit { background: #094A25; color: white; border: none; padding: 0.8rem 1.8rem; border-radius: 999px; font-family: 'Outfit', sans-serif; font-weight: 800; cursor: pointer; }

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  font-family: 'Outfit', sans-serif;
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-btn-primary {
  background: linear-gradient(135deg, var(--theme-color, #094A25), #053018);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(5, 48, 24, 0.15);
}

.cta-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(5, 48, 24, 0.25);
}

.cta-btn-secondary {
  background: #ffffff;
  color: var(--theme-color, #094A25);
  border: 2px solid var(--theme-color, #094A25);
}

.cta-btn-secondary:hover {
  transform: translateY(-2px);
  background: rgba(5, 48, 24, 0.03);
}

/* Not Found Page */
.center-not-found-page {
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.not-found-card {
  max-width: 500px;
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 10px 25px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.not-found-icon {
  font-size: 3rem;
}

.not-found-card h2 {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  color: #053018;
}

.not-found-card p {
  color: #64748b;
  margin: 0;
}

.back-link {
  font-family: 'Outfit', sans-serif;
  color: #10b981;
  font-weight: 700;
  text-decoration: underline;
}
</style>
