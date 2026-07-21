<template>
  <main class="bukid-page">
    <!-- ===== HERO ===== -->
    <section class="bukid-hero">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>

      <div class="bukid-hero-grid">
        <div class="hero-left">
          <span class="hero-tag">Innovation Hub Initiative</span>
          <h1 class="hero-title">{{ bukidHubData.title }}</h1>
          <p class="hero-tagline"><em>{{ bukidHubData.tagline }}</em></p>
          <p class="hero-desc">{{ bukidHubData.description }}</p>

          <div class="sdgs-container">
            <span v-for="sdg in bukidHubData.sdgs" :key="sdg" class="sdg-badge">
              {{ sdg }}
            </span>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bukid-hero-stats">
          <div
            v-for="(stat, i) in bukidHubData.stats"
            :key="i"
            class="stat-box"
            :class="{ 'stat-box-hovered': hoveredFinance === `hero-${i}` }"
            @mouseenter="hoveredFinance = `hero-${i}`"
            @mouseleave="hoveredFinance = null"
          >
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-sub">{{ stat.sub }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT / OBJECTIVES ===== -->
    <section class="about-section">
      <div class="bukid-about-grid">
        <div class="about-left">
          <h2 class="section-title">About BUKID Hub</h2>
          <p class="about-text">
            The MIMAROPA region holds the <strong>third smallest number of MSMEs</strong> and ranks as the <strong>second slowest-growing region</strong> among 17 regions in the Philippines. BUKID Hub addresses this by providing structured support for entrepreneurship, training programs, and mentorship.
          </p>
          <p class="about-text">
            Through the partnership between MinSU and Department of Agriculture MIMAROPA, the hub will facilitate ventures in biowaste products, renewable energy, food innovation, smart agriculture, and IoT for sustainable communities — fueling regional economic growth.
          </p>

          <div class="about-details-grid">
            <div
              v-for="(info, i) in bukidHubData.about.details"
              :key="i"
              class="detail-card"
            >
              <p class="detail-label">{{ info.label }}</p>
              <p class="detail-value">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <!-- Objectives -->
        <div class="objectives-card">
          <div class="card-glow"></div>
          <h3 class="objectives-title">Project Objectives</h3>
          <div class="objectives-list">
            <div
              v-for="obj in bukidHubData.objectives"
              :key="obj.num"
              class="objective-item"
            >
              <div class="obj-number-badge">{{ obj.num }}</div>
              <div class="obj-info">
                <h4>{{ obj.title }}</h4>
                <p>{{ obj.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FOCUS AREAS ===== -->
    <section class="focus-section">
      <h2 class="focus-title">Venture Focus Areas</h2>
      <p class="focus-subtitle">Supporting innovation across six key domains for regional growth</p>

      <div class="bukid-focus-grid">
        <div
          v-for="(area, index) in bukidHubData.focusAreas"
          :key="index"
          class="focus-card"
          :class="{ 'focus-card-hovered': hoveredFocus === index }"
          @mouseenter="hoveredFocus = index"
          @mouseleave="hoveredFocus = null"
        >
          <div class="card-deco-circle"></div>
          <div class="focus-icon">{{ area.icon }}</div>
          <h3 class="focus-card-title">{{ area.title }}</h3>
          <p class="focus-card-desc">{{ area.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ===== BUILDING DESIGN CAROUSEL ===== -->
    <section class="carousel-section">
      <div class="carousel-wrapper">
        <img
          :src="bukidHubData.carouselImages[currentImageIndex].placeholder"
          :alt="bukidHubData.carouselImages[currentImageIndex].title"
          class="carousel-img"
        />
        <div class="carousel-overlay"></div>

        <div class="figure-label">
          {{ bukidHubData.carouselImages[currentImageIndex].figure }} — BUKID Hub Building Design
        </div>

        <!-- Prev Button -->
        <button @click="prevImage" class="nav-arrow prev-arrow">‹</button>
        <!-- Next Button -->
        <button @click="nextImage" class="nav-arrow next-arrow">›</button>

        <!-- Bottom Info -->
        <div class="carousel-caption">
          <h3>{{ bukidHubData.carouselImages[currentImageIndex].title }}</h3>
          <p>{{ bukidHubData.carouselImages[currentImageIndex].description }}</p>
          <div class="carousel-dots">
            <button
              v-for="(_, index) in bukidHubData.carouselImages"
              :key="index"
              @click="currentImageIndex = index"
              class="dot-btn"
              :class="{ 'dot-active': currentImageIndex === index }"
            ></button>
          </div>
        </div>

        <!-- Thumbnail Strip -->
        <div class="thumbnail-strip">
          <div
            v-for="(img, index) in bukidHubData.carouselImages"
            :key="index"
            @click="currentImageIndex = index"
            class="thumb-item"
            :class="{ 'thumb-active': currentImageIndex === index }"
          >
            <img :src="img.placeholder" :alt="img.title" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TWO FUNCTIONAL ZONES ===== -->
    <section class="zones-section">
      <h2 class="zones-title">Two Functional Zones</h2>
      <p class="zones-subtitle">State-of-the-art facilities empowering product development and innovation</p>

      <div class="bukid-zones-grid">
        <div
          v-for="(zone, i) in bukidHubData.zones"
          :key="i"
          class="zone-card"
          :class="{ 'zone-card-hovered': hoveredZone === i }"
          @mouseenter="hoveredZone = i"
          @mouseleave="hoveredZone = null"
        >
          <div class="zone-card-content">
            <div class="zone-icon">{{ zone.icon }}</div>
            <h3 class="zone-title-text">{{ zone.title }}</h3>
            <p class="zone-desc">{{ zone.desc }}</p>

            <h4 class="equipment-header">Equipment &amp; Facilities</h4>
            <ul class="equipment-list">
              <li v-for="(eq, j) in zone.equipment" :key="j">{{ eq }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== OPERATIONS PLAN ===== -->
    <section class="operations-section">
      <h2 class="ops-title">Operations Plan</h2>
      <p class="ops-subtitle">Open Monday to Friday, 8:00 AM – 5:00 PM</p>

      <div class="bukid-ops-grid">
        <div
          v-for="(slot, i) in bukidHubData.operations.schedule"
          :key="i"
          class="ops-box"
          :class="{ 'ops-box-hovered': hoveredFinance === `ops-${i}` }"
          @mouseenter="hoveredFinance = `ops-${i}`"
          @mouseleave="hoveredFinance = null"
        >
          <div class="ops-icon">{{ slot.icon }}</div>
          <p class="ops-hours">{{ slot.hours }}</p>
          <p class="ops-slot-title">{{ slot.title }}</p>
          <p class="ops-desc">{{ slot.desc }}</p>
        </div>
      </div>

      <div class="ops-terms-card">
        <p class="terms-text">{{ bukidHubData.operations.terms }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { bukidHubData } from "@/data/siteData";

const hoveredFinance = ref(null);
const hoveredFocus = ref(null);
const hoveredZone = ref(null);
const currentImageIndex = ref(0);

let autoPlayTimer = null;

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % bukidHubData.carouselImages.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + bukidHubData.carouselImages.length) % bukidHubData.carouselImages.length;
};

onMounted(() => {
  autoPlayTimer = setInterval(nextImage, 6000);
});

onUnmounted(() => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
});
</script>

<style scoped>
.bukid-page {
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
  background-color: #fcfdfd;
}

/* ===== HERO ===== */
.bukid-hero {
  position: relative;
  background: linear-gradient(135deg, #1f2d0d 0%, #365314 30%, #5f3f15 70%, #0d5a2c 100%);
  color: white;
  padding: 5rem 3rem;
  overflow: hidden;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.hero-glow-1 {
  position: absolute;
  top: -80px;
  right: -60px;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.hero-glow-2 {
  position: absolute;
  bottom: -100px;
  left: 5%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
}

.bukid-hero-grid {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.hero-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #a3e635;
  margin-bottom: 0.8rem;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  color: #ffffff;
}

.hero-tagline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  color: #cbd5e1;
}

.hero-desc {
  font-size: 0.95rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.sdgs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sdg-badge {
  padding: 0.4rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(4px);
  color: white;
}

.bukid-hero-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 1.8rem 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.stat-box-hovered {
  transform: translateY(-4px) scale(1.02);
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 800;
  line-height: 1.1;
  color: white;
}

.stat-label {
  margin: 0.5rem 0 0.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #a3e635;
}

.stat-sub {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.75;
}

/* ===== ABOUT / OBJECTIVES ===== */
.about-section {
  padding: 6rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.bukid-about-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 4rem;
  align-items: start;
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  color: #365314;
}

.about-text {
  color: #475569;
  line-height: 1.8;
  font-size: 1rem;
  margin: 0 0 1.5rem 0;
}

.about-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-top: 2rem;
}

.detail-card {
  padding: 1.25rem;
  background: #fbf9f4;
  border-radius: 12px;
  border-left: 4px solid #15803d;
}

.detail-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: #15803d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  margin: 0.4rem 0 0;
  color: #1c2e0b;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Objectives Card */
.objectives-card {
  position: relative;
  background: linear-gradient(135deg, #2b1f13, #5a3c1c);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  color: white;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(90, 60, 28, 0.12);
}

.card-glow {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.objectives-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 0 2rem 0;
  color: white;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.objective-item {
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
}

.obj-number-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  flex-shrink: 0;
  color: #a3e635;
}

.obj-info h4 {
  font-family: 'Outfit', sans-serif;
  margin: 0 0 0.3rem 0;
  font-weight: 700;
  font-size: 1.05rem;
  color: white;
}

.obj-info p {
  margin: 0;
  opacity: 0.85;
  line-height: 1.6;
  font-size: 0.88rem;
}

/* ===== FOCUS AREAS ===== */
.focus-section {
  padding: 6rem 3rem;
  background: #f8fafc;
}

.focus-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: #365314;
  text-align: center;
}

.focus-subtitle {
  text-align: center;
  color: #334155;
  margin: 0 0 4rem 0;
  font-size: 1rem;
}

.bukid-focus-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.focus-card {
  background: white;
  color: #1e293b;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.card-deco-circle {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(22, 101, 52, 0.04);
  transition: all 0.4s;
}

.focus-icon {
  font-size: 2.5rem;
  margin-bottom: 1.25rem;
  line-height: 1;
}

.focus-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0 0 0.8rem 0;
  color: #6b3f1d;
  transition: color 0.3s;
}

.focus-card-desc {
  font-size: 0.9rem;
  line-height: 1.75;
  margin: 0;
  opacity: 0.8;
  transition: opacity 0.3s;
  flex: 1;
}

/* Hover Focused Style */
.focus-card-hovered {
  transform: translateY(-8px);
  background: linear-gradient(135deg, #15803d, #365314);
  color: white;
  border-color: transparent;
  box-shadow: 0 20px 40px rgba(21, 128, 61, 0.2);
}

.focus-card-hovered .focus-card-title {
  color: white;
}

.focus-card-hovered .focus-card-desc {
  opacity: 0.95;
}

.focus-card-hovered .card-deco-circle {
  background: rgba(255, 255, 255, 0.08);
}

/* ===== BUILDING CAROUSEL ===== */
.carousel-section {
  padding: 0;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: clamp(500px, 65vh, 750px);
  overflow: hidden;
  background: #0f172a;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.6s ease;
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

.figure-label {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.15);
  z-index: 3;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s;
  z-index: 3;
}

.nav-arrow:hover {
  background: white;
  color: #15803d;
  transform: translateY(-50%) scale(1.05);
}

.prev-arrow {
  left: 2rem;
}

.next-arrow {
  right: 2rem;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem 4rem;
  color: white;
  z-index: 2;
  max-width: 800px;
}

.carousel-caption h3 {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  margin: 0 0 0.8rem 0;
  color: #ffffff;
}

.carousel-caption p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #f1f5f9;
  opacity: 1;
  margin: 0 0 1.5rem 0;
}

.carousel-dots {
  display: flex;
  gap: 0.5rem;
}

.dot-btn {
  height: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  background: rgba(255, 255, 255, 0.4);
  width: 10px;
}

.dot-active {
  width: 32px;
  background: white;
}

.thumbnail-strip {
  position: absolute;
  bottom: 2.5rem;
  right: 4rem;
  display: flex;
  gap: 0.75rem;
  z-index: 3;
}

.thumb-item {
  width: 80px;
  height: 55px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  opacity: 0.6;
}

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-active {
  border-color: white;
  opacity: 1;
  transform: scale(1.05);
}

/* ===== TWO FUNCTIONAL ZONES ===== */
.zones-section {
  padding: 6rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.zones-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: #365314;
  text-align: center;
}

.zones-subtitle {
  text-align: center;
  color: #64748b;
  margin: 0 0 4rem 0;
  font-size: 1rem;
}

.bukid-zones-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.zone-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.zone-card-content {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
}

.zone-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.zone-title-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0 0 0.8rem 0;
  color: #1c2e0b;
  transition: color 0.3s;
}

.zone-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.equipment-header {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1rem 0;
  color: #15803d;
  transition: color 0.3s;
}

.equipment-list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.9;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.equipment-list li {
  opacity: 0.75;
  transition: opacity 0.3s;
}

/* Zone Card Hover State */
.zone-card-hovered {
  transform: translateY(-6px);
}

.zone-card:nth-child(1).zone-card-hovered {
  background: linear-gradient(135deg, #166534 0%, #84cc16 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 20px 45px rgba(22, 101, 52, 0.25);
}

.zone-card:nth-child(2).zone-card-hovered {
  background: linear-gradient(135deg, #5c3514 0%, #15803d 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 20px 45px rgba(92, 53, 20, 0.25);
}

.zone-card-hovered .zone-title-text,
.zone-card-hovered .equipment-header {
  color: white !important;
}

.zone-card-hovered .zone-desc {
  opacity: 0.95;
}

.zone-card-hovered .equipment-list li {
  opacity: 0.9;
}

/* ===== OPERATIONS PLAN ===== */
.operations-section {
  padding: 6rem 3rem;
  background: linear-gradient(135deg, #1f2d0d 0%, #365314 50%, #0c4a24 100%);
  color: white;
}

.ops-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: white;
  text-align: center;
}

.ops-subtitle {
  text-align: center;
  opacity: 0.85;
  margin: 0 0 4rem 0;
  font-size: 1rem;
}

.bukid-ops-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem auto;
}

.ops-box {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  padding: 2.5rem 2rem;
  border-radius: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.ops-box-hovered {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.ops-icon {
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
}

.ops-hours {
  font-family: 'Outfit', sans-serif;
  margin: 0 0 0.4rem 0;
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 800;
}

.ops-slot-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #a3e635;
}

.ops-desc {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.85;
  line-height: 1.6;
}

.ops-terms-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem 2.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  max-width: 1200px;
  margin: 0 auto;
}

.terms-text {
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.7;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .bukid-hero-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .bukid-about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .bukid-focus-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bukid-zones-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .bukid-ops-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .thumbnail-strip {
    display: none;
  }
}

@media (max-width: 768px) {
  .bukid-hero {
    padding: 4rem 1.5rem;
  }
  .about-section {
    padding: 4rem 1.5rem;
  }
  .focus-section {
    padding: 4rem 1.5rem;
  }
  .zones-section {
    padding: 4rem 1.5rem;
  }
  .operations-section {
    padding: 4rem 1.5rem;
  }
  .bukid-focus-grid {
    grid-template-columns: 1fr;
  }
  .nav-arrow {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }
  .prev-arrow {
    left: 1rem;
  }
  .next-arrow {
    right: 1rem;
  }
  .carousel-caption {
    padding: 2rem;
  }
}
</style>
