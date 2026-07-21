<template>
  <main class="mauya-page">
    <!-- ===== HERO ===== -->
    <section class="mauya-hero">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>

      <div class="mauya-hero-grid">
        <div class="hero-left">
          <span class="hero-tag">Innovation Hub Initiative</span>
          <h1 class="hero-title">Project<br />MAUYA</h1>
          <p class="hero-tagline"><em>{{ projectMauyaData.tagline }}</em></p>
          <p class="hero-desc">{{ projectMauyaData.description }}</p>

          <div class="sdgs-container">
            <span v-for="sdg in projectMauyaData.sdgs" :key="sdg" class="sdg-badge">
              {{ sdg }}
            </span>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="mauya-hero-stats">
          <div
            v-for="(s, i) in projectMauyaData.stats"
            :key="i"
            class="stat-box"
          >
            <p class="stat-value">{{ s.value }}</p>
            <p class="stat-label">{{ s.label }}</p>
            <p class="stat-sub">{{ s.sub }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT / OBJECTIVES ===== -->
    <section class="about-section">
      <div class="mauya-about-grid">
        <div class="about-left">
          <h2 class="section-title">About Project MAUYA</h2>
          <p class="about-text">{{ projectMauyaData.about.text1 }}</p>
          <p class="about-text">{{ projectMauyaData.about.text2 }}</p>

          <div class="about-details-grid">
            <div
              v-for="(info, i) in projectMauyaData.about.details"
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
              v-for="obj in projectMauyaData.objectives"
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
      <p class="focus-subtitle">Supporting innovation across key domains for regional growth</p>

      <div class="mauya-focus-grid">
        <div
          v-for="(area, index) in projectMauyaData.focusAreas"
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

    <!-- ===== BUILDING / SYSTEMS CAROUSEL ===== -->
    <section class="carousel-section">
      <div class="carousel-wrapper">
        <img
          :src="projectMauyaData.carouselImages[currentImageIndex].placeholder"
          :alt="projectMauyaData.carouselImages[currentImageIndex].title"
          class="carousel-img"
        />
        <div class="carousel-overlay"></div>

        <div class="figure-label">
          {{ projectMauyaData.carouselImages[currentImageIndex].figure }}
        </div>

        <!-- Prev Button -->
        <button @click="prevImage" class="nav-arrow prev-arrow">‹</button>
        <!-- Next Button -->
        <button @click="nextImage" class="nav-arrow next-arrow">›</button>

        <!-- Bottom Info -->
        <div class="carousel-caption">
          <h3>{{ projectMauyaData.carouselImages[currentImageIndex].title }}</h3>
          <p>{{ projectMauyaData.carouselImages[currentImageIndex].description }}</p>
          <div class="carousel-dots">
            <button
              v-for="(_, idx) in projectMauyaData.carouselImages"
              :key="idx"
              @click="currentImageIndex = idx"
              class="dot-btn"
              :class="{ 'dot-active': currentImageIndex === idx }"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== EXPECTED OUTPUTS ===== -->
    <section class="outputs-section">
      <h2 class="outputs-title">Expected Outputs</h2>
      <p class="outputs-subtitle">Measurable targets driving real-world impact</p>

      <div class="mauya-outputs-grid">
        <div
          v-for="(o, i) in projectMauyaData.outputs"
          :key="i"
          class="output-card"
          :class="{ 'output-card-hovered': hoveredOutput === i }"
          @mouseenter="hoveredOutput = i"
          @mouseleave="hoveredOutput = null"
        >
          <div class="output-icon">{{ o.icon }}</div>
          <p class="output-value">{{ o.value }}</p>
          <h4 class="output-title-text">{{ o.title }}</h4>
          <p class="output-desc">{{ o.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ===== POTENTIAL IMPACT ===== -->
    <section class="impact-section">
      <h2 class="impact-title">Potential Impact</h2>
      <div class="mauya-impact-grid">
        <div
          v-for="(impact, i) in projectMauyaData.impacts"
          :key="i"
          class="impact-card"
          :class="{ 'impact-card-hovered': hoveredImpact === i }"
          :style="{
            '--hover-gradient': impact.gradient,
            '--hover-color': impact.color
          }"
          @mouseenter="hoveredImpact = i"
          @mouseleave="hoveredImpact = null"
        >
          <div class="impact-card-content">
            <div class="impact-icon">{{ impact.icon }}</div>
            <h3 class="impact-card-title">{{ impact.title }}</h3>
            <ul class="impact-list">
              <li v-for="(it, j) in impact.items" :key="j">{{ it }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Join the Smart Farming Revolution</h2>
        <p>Partner with Project MAUYA for training, research and capacity building in sustainable agriculture.</p>
        <a href="mailto:innovation@minsu.edu.ph" class="cta-btn">Get Involved →</a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { projectMauyaData } from "@/data/siteData";

const hoveredFocus = ref(null);
const hoveredOutput = ref(null);
const hoveredImpact = ref(null);
const currentImageIndex = ref(0);

let autoPlayTimer = null;

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % projectMauyaData.carouselImages.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + projectMauyaData.carouselImages.length) % projectMauyaData.carouselImages.length;
};

onMounted(() => {
  autoPlayTimer = setInterval(nextImage, 6000);
});

onUnmounted(() => {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
});
</script>

<style scoped>
.mauya-page {
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
  background-color: #fcfdfd;
}

/* ===== HERO ===== */
.mauya-hero {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0c5e31 30%, #10b981 70%, #059669 100%);
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

.mauya-hero-grid {
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
  color: #10b981;
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

.mauya-hero-stats {
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
  cursor: default;
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
  color: #10b981;
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

.mauya-about-grid {
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
  color: #0b4d2e;
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
  background: #f0fdf4;
  border-radius: 12px;
  border-left: 4px solid #16a34a;
}

.detail-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  margin: 0.4rem 0 0;
  color: #0b4d2e;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Objectives Card */
.objectives-card {
  position: relative;
  background: linear-gradient(135deg, #094A25, #0C6B37);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  color: white;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(9, 74, 37, 0.12);
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
  color: #ffffff;
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
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
  flex-shrink: 0;
  color: #10b981;
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
  color: #0b7f47;
  text-align: center;
}

.focus-subtitle {
  text-align: center;
  color: #334155;
  margin: 0 0 4rem 0;
  font-size: 1rem;
}

.mauya-focus-grid {
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
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  cursor: default;
}

.card-deco-circle {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(16, 127, 71, 0.05);
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
  color: #0b7f47;
  transition: color 0.3s;
}

.focus-card-desc {
  font-size: 0.9rem;
  line-height: 1.75;
  margin: 0;
  opacity: 0.7;
  transition: opacity 0.3s;
  flex: 1;
}

.focus-card-hovered {
  transform: translateY(-8px);
  background: linear-gradient(135deg, #0b7f47, #16a34a);
  color: white;
  border-color: transparent;
  box-shadow: 0 20px 40px rgba(11, 127, 71, 0.2);
}

.focus-card-hovered .focus-card-title {
  color: white;
}

.focus-card-hovered .focus-card-desc {
  opacity: 0.95;
}

.focus-card-hovered .card-deco-circle {
  background: rgba(255, 255, 255, 0.1);
}

/* ===== CAROUSEL ===== */
.carousel-section {
  padding: 0;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  height: clamp(500px, 60vh, 700px);
  overflow: hidden;
  background: #0f172a;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%);
  z-index: 1;
}

.figure-label {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  transition: all 0.3s;
  z-index: 3;
}

.nav-arrow:hover {
  background: white;
  color: #0b7f47;
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
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 800;
  margin: 0 0 0.6rem;
  color: #ffffff;
}

.carousel-caption p {
  font-size: 1rem;
  line-height: 1.7;
  color: #f1f5f9;
  opacity: 1;
  margin: 0 0 1.5rem;
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
  transition: all 0.4s;
  background: rgba(255, 255, 255, 0.4);
  width: 10px;
}

.dot-active {
  width: 40px;
  background: white;
}

/* ===== EXPECTED OUTPUTS ===== */
.outputs-section {
  padding: 6rem 3rem;
  background: #f0fdf4;
}

.outputs-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: #0b4d2e;
  text-align: center;
}

.outputs-subtitle {
  text-align: center;
  color: #64748b;
  margin: 0 0 4rem 0;
  font-size: 1rem;
}

.mauya-outputs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.output-card {
  background: white;
  color: #1e293b;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.output-icon {
  font-size: 2.2rem;
  margin-bottom: 0.6rem;
  line-height: 1;
}

.output-value {
  font-family: 'Outfit', sans-serif;
  margin: 0 0 0.4rem;
  font-size: clamp(1.6rem, 3vw, 2rem);
  font-weight: 800;
}

.output-title-text {
  font-family: 'Outfit', sans-serif;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: #0b4d2e;
}

.output-desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.6;
  opacity: 0.75;
}

.output-card-hovered {
  background: linear-gradient(135deg, #0b7f47, #16a34a);
  color: white;
  box-shadow: 0 16px 40px rgba(11, 127, 71, 0.25);
  border-color: transparent;
  transform: translateY(-8px) scale(1.02);
}

.output-card-hovered .output-title-text {
  color: white;
}

/* ===== POTENTIAL IMPACT ===== */
.impact-section {
  padding: 6rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.impact-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 4rem 0;
  color: #0b4d2e;
  text-align: center;
}

.mauya-impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.impact-card {
  background: white;
  color: #1e293b;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.impact-card-content {
  padding: 2.5rem 2rem;
}

.impact-icon {
  font-size: 2.25rem;
  margin-bottom: 1rem;
}

.impact-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0 0 1.2rem 0;
  transition: color 0.3s;
}

.impact-list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.9;
  font-size: 0.9rem;
}

.impact-list li {
  opacity: 0.75;
  transition: opacity 0.3s;
}

/* Hover Impact Style */
.impact-card-hovered {
  transform: translateY(-8px);
  background: var(--hover-gradient);
  color: white;
  border-color: transparent;
  box-shadow: 0 20px 45px rgba(11, 127, 71, 0.2);
}

.impact-card-hovered .impact-card-title {
  color: white !important;
}

.impact-card-hovered .impact-list li {
  opacity: 0.95;
}

/* ===== CTA ===== */
.cta-section {
  background: linear-gradient(135deg, #053018 0%, #0c5e31 50%, #10b981 100%);
  color: white;
  padding: 6rem 3rem;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cta-content h2 {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 800;
  margin: 0;
}

.cta-content p {
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0 0 1rem;
}

.cta-btn {
  font-family: 'Outfit', sans-serif;
  display: inline-block;
  padding: 0.9rem 2rem;
  background: white;
  color: #0b4d2e;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .mauya-hero-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .mauya-about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .mauya-focus-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .mauya-outputs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .mauya-impact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .mauya-hero {
    padding: 4rem 1.5rem;
  }
  .about-section {
    padding: 4rem 1.5rem;
  }
  .focus-section {
    padding: 4rem 1.5rem;
  }
  .outputs-section {
    padding: 4rem 1.5rem;
  }
  .impact-section {
    padding: 4rem 1.5rem;
  }
  .cta-section {
    padding: 4rem 1.5rem;
  }
  .mauya-focus-grid {
    grid-template-columns: 1fr;
  }
  .mauya-outputs-grid {
    grid-template-columns: 1fr;
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
