<template>
  <main v-if="center" class="center-details-page" :style="{ '--theme-color': center.themeColor, '--theme-gradient': center.gradient }">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      
      <div class="hero-content">
        <span class="hero-tag">Research Center Profile</span>
        <h1 class="hero-title">
          <span class="title-icon">{{ center.icon }}</span> {{ center.title }}
        </h1>
        <p class="hero-desc">{{ center.description }}</p>
        <div class="hero-line"></div>
      </div>
    </section>

    <!-- Focus Areas -->
    <section class="focus-section">
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
    <section class="programs-section">
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
    <section class="mission-section">
      <div class="mission-container">
        <div class="mission-glow"></div>
        <div class="mission-header">
          <span class="mission-icon">🎯</span>
          <h3>Our Mission</h3>
        </div>
        <p class="mission-text">{{ center.mission }}</p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <span class="cta-icon">{{ center.icon }}</span>
        <h3 class="cta-title">Partner With Us</h3>
        <p class="cta-desc">
          {{ center.ctaText || `Whether you're an industry stakeholder, LGU, or academic researcher, we invite you to collaborate with us to advance development in this sector.` }}
        </p>
        <div class="cta-actions">
          <router-link to="/contact" class="cta-btn cta-btn-primary">
            Get In Touch
          </router-link>
          <router-link to="/centers" class="cta-btn cta-btn-secondary">
            Explore All Centers
          </router-link>
        </div>
      </div>
    </section>
  </main>

  <main v-else class="center-not-found-page">
    <div class="not-found-card">
      <span class="not-found-icon">🔍</span>
      <h2>Center Not Found</h2>
      <p>The research center you are trying to view does not exist or has been moved.</p>
      <router-link to="/centers" class="back-link">
        Back to Research Centers
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { researchCenters } from "@/data/siteData";

const route = useRoute();

const center = computed(() => {
  const id = route.params.id;
  return researchCenters[id] || null;
});
</script>

<style scoped>
.center-details-page {
  padding: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #fcfdfd;
}

/* Hero Banner */
.hero-section {
  position: relative;
  background: var(--theme-gradient);
  color: white;
  padding: 5rem 3rem;
  overflow: hidden;
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
  max-width: 800px;
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
}

.hero-line {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 2px;
  margin-top: 1.5rem;
}

/* Section Common Layouts */
.focus-section,
.programs-section,
.highlights-section,
.mission-section {
  padding: 5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--theme-color);
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.focus-card {
  padding: 2.25rem 1.75rem;
  border-radius: 20px;
  background: var(--area-bg);
  border: 1px solid rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: default;
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
  color: var(--area-color);
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
.programs-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%);
  max-width: 100%;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.program-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  border-top: 4px solid var(--p-color);
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
  color: var(--p-color);
  margin: 0 0 0.5rem 0;
}

.program-card-desc {
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0;
}

/* Highlights */
.highlights-section {
  background: linear-gradient(135deg, #053018e6 0%, #031d0fe6 100%);
  color: white;
  max-width: 100%;
}

.highlights-title {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.4rem 0;
}

.highlights-subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.95rem;
  margin: 0 0 3rem 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.highlight-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 2.25rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s;
}

.highlight-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.highlight-card-title {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
  line-height: 1.35;
}

.highlight-card-desc {
  color: rgba(255, 255, 255, 0.8);
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
  background: linear-gradient(135deg, var(--theme-color) 0%, #053018 100%);
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
  padding: 5rem 3rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(5, 48, 24, 0.03) 0%, rgba(5, 48, 24, 0.08) 100%);
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
  color: var(--theme-color);
  margin: 0 0 0.8rem 0;
}

.cta-desc {
  font-size: 1rem;
  color: #334155;
  line-height: 1.7;
  margin-bottom: 2rem;
}

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
  background: linear-gradient(135deg, var(--theme-color), #053018);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(5, 48, 24, 0.15);
}

.cta-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(5, 48, 24, 0.25);
}

.cta-btn-secondary {
  background: #ffffff;
  color: var(--theme-color);
  border: 2px solid var(--theme-color);
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

/* Responsive Queries */
@media (max-width: 768px) {
  .hero-section {
    padding: 3.5rem 1.75rem;
  }
  .focus-section,
  .programs-section,
  .highlights-section,
  .mission-section {
    padding: 3.5rem 1.75rem;
  }
}
</style>
