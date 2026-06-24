<template>
  <main class="tt-page">
    <!-- Header Banner -->
    <section class="tt-hero">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="hero-content">
        <span class="hero-tag">RITE Innovation Division</span>
        <h1 class="hero-title">Technology Transfer &amp;<br />Patent Unit</h1>
        <p class="hero-desc">
          The Technology Transfer and Patent Unit (TTPU) serves as the institutional bridge between research innovation and commercialization, enabling community impact.
        </p>
      </div>
    </section>

    <!-- Intro block -->
    <section class="intro-section">
      <p class="intro-text">
        The TTPU facilitates the transformation of research outputs into market-ready products and services, provides comprehensive intellectual property protection, and supports the creation of technology-based enterprises. We work collaboratively with researchers, industry partners, and entrepreneurs to unlock the full potential of RITE's innovations and contribute to socio-economic development.
      </p>
    </section>

    <!-- Side-by-Side Grid Layout -->
    <div class="tt-dashboard-grid">
      <!-- Left Column: News Slider -->
      <section class="news-slider-column">
        <h3 class="column-title">Latest News &amp; Orientation</h3>
        
        <div class="slider-container">
          <transition name="fade-slide" mode="out-in">
            <article :key="newsStartIndex" class="news-slide-card">
              <div class="news-image-wrapper">
                <img :src="currentNews.image" :alt="currentNews.title" class="news-slide-img" />
                <span class="news-slide-badge">{{ currentNews.category }}</span>
              </div>
              <div class="news-slide-content">
                <span class="news-slide-date">{{ currentNews.date }}</span>
                <h4 class="news-slide-title">{{ currentNews.title }}</h4>
                <p class="news-slide-desc">{{ currentNews.description }}</p>
              </div>
            </article>
          </transition>

          <!-- Slider Controls -->
          <div class="slider-controls">
            <button @click="prevNews" class="slider-btn prev-btn" aria-label="Previous News">‹</button>
            <button @click="nextNews" class="slider-btn next-btn" aria-label="Next News">›</button>
          </div>
        </div>
      </section>

      <!-- Right Column: Downloads Panel -->
      <aside class="downloads-column">
        <h3 class="column-title">Downloadable Forms</h3>
        
        <div class="forms-card">
          <div class="forms-card-glow"></div>
          <div class="forms-card-content">
            <h4 class="forms-header">
              <span class="forms-icon">📋</span>
              Forms &amp; Disclosures
            </h4>
            
            <div class="forms-list">
              <a
                v-for="(form, index) in ttpuForms"
                :key="index"
                :href="form.downloadUrl"
                download
                class="form-link-item"
              >
                <div class="file-icon-box">
                  <span class="file-icon">📄</span>
                </div>
                <span class="form-name">{{ form.name }}</span>
                <span class="download-symbol">⬇</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- Functions and Services Grid -->
    <section class="functions-section">
      <div class="section-header">
        <span class="section-tag">Core Actions</span>
        <h2>Office Functions &amp; Services</h2>
        <div class="section-line"></div>
      </div>

      <div class="functions-grid">
        <div
          v-for="(func, idx) in ttpuFunctions"
          :key="func.title"
          class="function-card"
          :style="{
            '--card-bg': func.gradient,
            '--text-color': func.color,
            '--bullet-color': func.color === 'white' ? '#10b981' : '#053018',
            '--border-color': func.color === 'white' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'
          }"
        >
          <div class="function-card-content">
            <h3 class="function-title">{{ func.title }}</h3>
            <ul class="bullets-list">
              <li v-for="bullet in func.bullets" :key="bullet" class="bullet-item">
                <span class="bullet-dot">•</span>
                {{ bullet }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { ttpuNews, ttpuForms, ttpuFunctions } from "@/data/siteData";

const newsStartIndex = ref(0);

const currentNews = computed(() => ttpuNews[newsStartIndex.value]);

const nextNews = () => {
  newsStartIndex.value = (newsStartIndex.value + 1) % ttpuNews.length;
};

const prevNews = () => {
  newsStartIndex.value = (newsStartIndex.value - 1 + ttpuNews.length) % ttpuNews.length;
};
</script>

<style scoped>
.tt-page {
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Hero Section */
.tt-hero {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0d5e32 50%, #10b981 100%);
  color: white;
  padding: 4.5rem 3.5rem;
  border-radius: 28px;
  margin-bottom: 2.5rem;
  overflow: hidden;
  box-shadow: 0 20px 45px -15px rgba(5, 48, 24, 0.18);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.orb-1 {
  top: -40px;
  right: -30px;
  width: 220px;
  height: 220px;
  background: rgba(16, 185, 129, 0.18);
}

.orb-2 {
  bottom: -60px;
  left: 20%;
  width: 260px;
  height: 260px;
  background: rgba(245, 158, 11, 0.08);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 750px;
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
  color: #10b981;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin: 0;
}

.hero-desc {
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
}

/* Intro Section */
.intro-section {
  background: #ffffff;
  border-left: 4px solid #10b981;
  padding: 1.75rem 2rem;
  border-radius: 0 16px 16px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
  margin-bottom: 3.5rem;
}

.intro-text {
  margin: 0;
  color: #475569;
  font-size: 0.98rem;
  line-height: 1.8;
}

/* Side by Side Grid Layout */
.tt-dashboard-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 3rem;
  margin-bottom: 5rem;
  align-items: start;
}

.column-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 1.5rem 0;
}

/* Slider Section */
.slider-container {
  position: relative;
}

.news-slide-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: transform 0.25s ease;
}

.news-slide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
}

.news-image-wrapper {
  position: relative;
  height: clamp(250px, 40vw, 360px);
  overflow: hidden;
}

.news-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-slide-card:hover .news-slide-img {
  transform: scale(1.03);
}

.news-slide-badge {
  font-family: 'Outfit', sans-serif;
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  background: #10b981;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
}

.news-slide-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.news-slide-date {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
}

.news-slide-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
  line-height: 1.4;
}

.news-slide-desc {
  font-size: 0.92rem;
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.slider-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 1rem;
  pointer-events: none;
  z-index: 10;
}

.slider-btn {
  pointer-events: auto;
  background: white;
  border: 1px solid rgba(5, 48, 24, 0.1);
  color: #053018;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  line-height: 1;
}

.slider-btn:hover {
  background: #10b981;
  color: white;
  border-color: #10b981;
  transform: scale(1.05);
}

/* Downloads Column */
.downloads-column {
  width: 100%;
}

.forms-card {
  position: relative;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
}

.forms-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #053018);
}

.forms-card-content {
  padding: 2.25rem 2rem;
}

.forms-header {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.forms-icon {
  font-size: 1.35rem;
}

.forms-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.02);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.form-link-item:hover {
  background: rgba(16, 185, 129, 0.05);
  transform: translateX(4px);
  border-color: rgba(16, 185, 129, 0.15);
}

.file-icon-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.file-icon {
  font-size: 1rem;
}

.form-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: #334155;
  flex: 1;
  padding: 0 1rem;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.download-symbol {
  font-size: 0.95rem;
  color: #10b981;
  transition: transform 0.2s ease;
}

.form-link-item:hover .download-symbol {
  transform: translateY(2px);
}

/* Functions Grid */
.functions-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
}

.section-line {
  width: 48px;
  height: 4px;
  background: #094A25;
  border-radius: 2px;
  margin-top: 0.25rem;
}

.functions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.function-card {
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease;
}

.function-card:hover {
  transform: translateY(-4px);
}

.function-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 1.5rem 0;
  line-height: 1.3;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
  color: var(--text-color);
}

.bullets-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bullet-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-color);
}

.bullet-dot {
  color: var(--bullet-color);
  font-weight: bold;
  flex-shrink: 0;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .tt-dashboard-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .tt-hero {
    padding: 3rem 1.75rem;
  }
}
</style>
