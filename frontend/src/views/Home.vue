<template>
  <main class="page-container">
    <!-- Split Hero Section -->
    <section class="hero-section">
      <div class="hero-grid">
        <div class="hero-left">
          <span class="hero-badge">Mindoro State University</span>
          <h1 class="hero-title">
            Research, Innovation &amp; Technology Extension
          </h1>
          <p class="hero-description">
            Advancing regional knowledge, fostering community-driven solutions, and driving technology commercialization for inclusive sustainable growth.
          </p>
          <div class="hero-actions">
            <router-link to="/about" class="btn btn-primary">Discover Our Mission</router-link>
            <router-link to="/centers" class="btn btn-secondary">Explore Research Centers</router-link>
          </div>
        </div>

        <div class="hero-right">
          <div class="hero-image-showcase">
            <div class="showcase-card shadow-lg">
              <transition name="fade-slide" mode="out-in">
                <div :key="currentHeroIndex" class="showcase-slide" :style="{ backgroundImage: `url(${homeCarouselSlides[currentHeroIndex].image})` }">
                  <div class="slide-overlay"></div>
                  <div class="slide-content">
                    <span class="slide-category">Key Focus</span>
                    <h3>{{ homeCarouselSlides[currentHeroIndex].title }}</h3>
                    <p>{{ homeCarouselSlides[currentHeroIndex].description }}</p>
                  </div>
                </div>
              </transition>
              <!-- Carousel Controls -->
              <div class="showcase-controls">
                <button @click="prevHero" class="control-btn" aria-label="Previous slide">‹</button>
                <button @click="nextHero" class="control-btn" aria-label="Next slide">›</button>
              </div>
            </div>
            <!-- Absolute Floating Status Box -->
            <div class="floating-badge-box">
              <span class="floating-icon">🌱</span>
              <div>
                <h4>RITE Innovation</h4>
                <p>Ecosystem driven</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Services Features Grid -->
    <section class="features-section">
      <div class="section-header">
        <span class="section-tag">Capabilities</span>
        <h2>Key Areas of Impact</h2>
        <div class="section-line"></div>
      </div>

      <div class="features-grid">
        <div v-for="card in homeFeatureCards" :key="card.id" class="feature-card">
          <div class="card-icon-container">
            <span class="card-number">0{{ card.id }}</span>
          </div>
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-description">{{ card.description }}</p>
        </div>
      </div>
    </section>

    <!-- Spotlight Dashboard System (Interactive Tabs) -->
    <section class="spotlight-section">
      <div class="section-header text-center">
        <span class="section-tag">Spotlight</span>
        <h2>Interactive Showcase</h2>
        <p class="section-subtitle">Select a tab below to explore RITE's dynamic initiatives and programs</p>
        <div class="section-line mx-auto"></div>
      </div>

      <div class="spotlight-dashboard">
        <!-- Vertical Tabs Side -->
        <nav class="spotlight-tabs" aria-label="Spotlight tabs">
          <button
            v-for="(item, idx) in homePageOverviews"
            :key="idx"
            class="tab-btn"
            :class="{ 'active-tab': spotlightIdx === idx }"
            @click="selectSpotlight(idx)"
          >
            <span class="tab-accent" :style="{ backgroundColor: item.color }"></span>
            <span class="tab-label">{{ item.title }}</span>
          </button>
        </nav>

        <!-- Details Card Side -->
        <div class="spotlight-content-card">
          <transition name="fade-slide" mode="out-in">
            <div :key="spotlightIdx" class="spotlight-detail-panel">
              <div class="panel-header">
                <span class="panel-badge" :style="{ background: spotlight.gradient }">{{ spotlight.title }}</span>
              </div>
              <p class="panel-description">{{ spotlight.description }}</p>
              
              <!-- Tags list -->
              <div class="tags-container">
                <span v-for="tag in spotlight.tags" :key="tag" class="tag-pill">
                  {{ tag }}
                </span>
              </div>

              <!-- Learn More Button -->
              <router-link :to="spotlight.path" class="panel-action-link" :style="{ color: spotlight.color }">
                Explore Focus Area <span class="arrow-symbol">→</span>
              </router-link>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- News Grid Section -->
    <section class="news-section">
      <div class="section-header-row">
        <div class="section-header-left">
          <span class="section-tag">News &amp; Events</span>
          <h2>Latest Updates</h2>
          <div class="section-line"></div>
        </div>
        <a href="https://www.facebook.com/profile.php?id=61554793640385" target="_blank" rel="noopener noreferrer" class="link-more-facebook">
          View all on Facebook <span class="arrow-symbol">→</span>
        </a>
      </div>

      <div class="news-grid">
        <article v-for="item in homeNewsItems" :key="item.id" class="news-card">
          <a :href="item.link" target="_blank" rel="noopener noreferrer" class="news-card-link">
            <div class="news-image-wrapper">
              <img :src="item.image" :alt="item.title" loading="lazy" class="news-img" />
              <span class="news-category-badge">{{ item.category }}</span>
            </div>
            <div class="news-content">
              <span class="news-date">{{ item.date }}</span>
              <h3 class="news-title">{{ item.title }}</h3>
              <p class="news-desc">{{ item.description }}</p>
            </div>
          </a>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { homeCarouselSlides, homeFeatureCards, homePageOverviews, homeNewsItems } from "@/data/siteData";

// Hero Image Carousel Slider
const currentHeroIndex = ref(0);
let heroInterval = null;

const nextHero = () => {
  currentHeroIndex.value = (currentHeroIndex.value + 1) % homeCarouselSlides.length;
};

const prevHero = () => {
  currentHeroIndex.value = (currentHeroIndex.value - 1 + homeCarouselSlides.length) % homeCarouselSlides.length;
};

// Spotlight Tab System
const spotlightIdx = ref(0);
let spotlightInterval = null;

const spotlight = computed(() => homePageOverviews[spotlightIdx.value]);

const selectSpotlight = (idx) => {
  spotlightIdx.value = idx;
  resetSpotlightInterval();
};

const resetSpotlightInterval = () => {
  if (spotlightInterval) clearInterval(spotlightInterval);
  spotlightInterval = setInterval(() => {
    spotlightIdx.value = (spotlightIdx.value + 1) % homePageOverviews.length;
  }, 9000);
};

onMounted(() => {
  // Start Hero Auto Slider
  heroInterval = setInterval(nextHero, 6000);
  // Start Spotlight Auto Slider
  resetSpotlightInterval();
});

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval);
  if (spotlightInterval) clearInterval(spotlightInterval);
});
</script>

<style scoped>
.page-container {
  padding: 0;
  overflow-x: hidden;
  background-color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Split Hero Styles */
.hero-section {
  padding: 4rem 1.5rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #e6f7ed 100%);
  border-bottom: 1px solid rgba(9, 74, 37, 0.05);
}

.hero-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.hero-badge {
  font-family: 'Outfit', sans-serif;
  background: rgba(16, 185, 129, 0.1);
  color: #064e3b;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  line-height: 1.15;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.7;
  color: #475569;
  margin: 0;
  max-width: 580px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.btn {
  font-family: 'Outfit', sans-serif;
  display: inline-block;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: #094A25;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.25);
}

.btn-primary:hover {
  background: #063018;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(9, 74, 37, 0.35);
}

.btn-secondary {
  background: #ffffff;
  color: #094A25;
  border: 2px solid rgba(9, 74, 37, 0.2);
}

.btn-secondary:hover {
  background: rgba(9, 74, 37, 0.05);
  border-color: #094A25;
  transform: translateY(-2px);
}

.hero-right {
  position: relative;
}

.hero-image-showcase {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
}

.showcase-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ebebeb;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.showcase-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 2.5rem 2rem;
  color: white;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
  z-index: 1;
}

.slide-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-width: 440px;
}

.slide-category {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #10b981;
}

.slide-content h3 {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.slide-content p {
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
  margin: 0;
}

.showcase-controls {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 3;
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
}

.control-btn:hover {
  background: #ffffff;
  color: #094A25;
}

.floating-badge-box {
  position: absolute;
  left: -2rem;
  bottom: 2rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 0.8rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
  z-index: 5;
}

.floating-icon {
  font-size: 1.75rem;
}

.floating-badge-box h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #094A25;
}

.floating-badge-box p {
  margin: 0;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

/* Features Section */
.features-section {
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 3.5rem;
  gap: 0.4rem;
}

.section-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #10b981;
}

.section-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.section-line {
  width: 48px;
  height: 4px;
  background: #094A25;
  border-radius: 2px;
  margin-top: 0.25rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  border: 1px solid rgba(9, 74, 37, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(9, 74, 37, 0.06);
  border-color: rgba(9, 74, 37, 0.1);
}

.card-icon-container {
  width: 52px;
  height: 52px;
  background: rgba(16, 185, 129, 0.08);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-number {
  font-family: 'Outfit', sans-serif;
  color: #10b981;
  font-weight: 800;
  font-size: 1.25rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #053018;
  margin: 0;
}

.card-description {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #475569;
  margin: 0;
}

/* Spotlight Dashboard Section */
.spotlight-section {
  padding: 6rem 1.5rem;
  background: #ffffff;
  border-top: 1px solid rgba(0,0,0,0.02);
  border-bottom: 1px solid rgba(0,0,0,0.02);
}

.text-center {
  align-items: center;
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.section-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0.5rem 0 0;
  max-width: 600px;
}

.spotlight-dashboard {
  max-width: 1200px;
  margin: 4rem auto 0 auto;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 3.5rem;
  align-items: flex-start;
}

.spotlight-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tab-btn {
  font-family: 'Outfit', sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: #f8fafc;
}

.tab-accent {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.tab-label {
  font-size: 1rem;
  font-weight: 700;
  color: #475569;
}

.active-tab {
  background: #f1f5f9 !important;
}

.active-tab .tab-label {
  color: #053018;
}

.spotlight-content-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(9, 74, 37, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.spotlight-detail-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.panel-badge {
  font-family: 'Outfit', sans-serif;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.panel-description {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  margin: 0;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.tag-pill {
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  background: #e2e8f0;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
}

.panel-action-link {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
  margin-top: 0.5rem;
}

.panel-action-link:hover {
  transform: translateX(4px);
}

/* News Section */
.news-section {
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3.5rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.section-header-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.section-header-left h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.link-more-facebook {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #094A25;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, color 0.2s ease;
}

.link-more-facebook:hover {
  color: #10b981;
  transform: translateX(2px);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.25rem;
}

.news-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.07);
  border-color: rgba(9, 74, 37, 0.08);
}

.news-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.news-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: #f1f5f9;
  overflow: hidden;
}

.news-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-img {
  transform: scale(1.04);
}

.news-category-badge {
  font-family: 'Outfit', sans-serif;
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #094A25;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.news-content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.news-date {
  font-size: 0.82rem;
  font-weight: 600;
  color: #64748b;
}

.news-title {
  font-size: 1.15rem;
  font-weight: 750;
  line-height: 1.4;
  color: #053018;
  margin: 0;
}

.news-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #475569;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Responsive Media Queries */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .hero-left {
    align-items: center;
    text-align: center;
  }
  .hero-description {
    max-width: 100%;
  }
  .hero-actions {
    justify-content: center;
  }
  .spotlight-dashboard {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .spotlight-tabs {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tab-btn {
    padding: 0.6rem 1rem;
  }
  .floating-badge-box {
    left: 1rem;
    bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  .btn {
    width: 100%;
    text-align: center;
  }
  .showcase-controls {
    top: auto;
    bottom: 1.5rem;
  }
}
</style>
