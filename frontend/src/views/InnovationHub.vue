<template>
  <main class="hub-page">
    <!-- Hero Section -->
    <section class="hub-hero">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      
      <div class="hero-content">
        <span class="hero-subtitle">RITE Innovation Division</span>
        <h1 class="hero-title">Innovation Hub</h1>
        <p class="hero-desc">
          The Innovation Hub is the institutional engine for research translation, entrepreneurship, and community impact. It coordinates multiple initiatives and sub-hubs to accelerate the development and deployment of innovations that drive societal and economic growth.
        </p>
      </div>
    </section>

    <!-- Key Initiatives Section -->
    <section class="initiatives-section">
      <h3 class="section-title">Key Initiatives &amp; Sub-Hubs</h3>
      
      <div class="initiatives-grid">
        <router-link
          v-for="(initiative, index) in innovationHubInitiatives"
          :key="index"
          :to="initiative.path"
          class="initiative-card-link"
        >
          <article
            class="initiative-card"
            :style="{ '--accent-gradient': initiative.gradient, '--theme-color': initiative.color }"
          >
            <div class="card-header">
              <div class="card-glow-circle"></div>
              <h3 class="card-title">{{ initiative.title }}</h3>
            </div>
            
            <div class="card-body">
              <p class="card-desc">{{ initiative.description }}</p>
              
              <div class="features-list">
                <span
                  v-for="(feature, i) in initiative.features"
                  :key="i"
                  class="feature-pill"
                >
                  {{ feature }}
                </span>
              </div>
              
              <div class="card-action">
                Learn More <span class="action-arrow">→</span>
              </div>
            </div>
          </article>
        </router-link>
      </div>
    </section>

    <!-- Info Block -->
    <section class="why-hub-section">
      <h3 class="why-title">Why the Innovation Hub?</h3>
      <div class="why-grid">
        <div
          v-for="(item, i) in [
            { title: 'Accelerated Translation', desc: 'Bridge research to real-world application' },
            { title: 'Economic Growth', desc: 'Create scalable business opportunities' },
            { title: 'Community Impact', desc: 'Solve pressing local and regional challenges' },
            { title: 'Talent Development', desc: 'Build entrepreneurial and innovation skills' }
          ]"
          :key="i"
          class="why-item"
        >
          <h4 class="why-item-title">{{ item.title }}</h4>
          <p class="why-item-desc">{{ item.desc }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { innovationHubInitiatives } from "@/data/siteData";
</script>

<style scoped>
.hub-page {
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Hero Section */
.hub-hero {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0c5e31 50%, #10b981 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 28px;
  margin-bottom: 4rem;
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
  left: 10%;
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

.hero-subtitle {
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
  line-height: 1.8;
  opacity: 0.9;
  margin: 0;
}

/* Initiatives Grid */
.initiatives-section {
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 2rem 0;
  border-bottom: 1px solid rgba(5, 48, 24, 0.08);
  padding-bottom: 0.75rem;
}

.initiatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.initiative-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.initiative-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.initiative-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(5, 48, 24, 0.1);
}

.card-header {
  height: 130px;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  background: var(--accent-gradient);
  color: white;
}

.card-glow-circle {
  position: absolute;
  top: -20px;
  right: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.card-header h3 {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  position: relative;
}

.card-body {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card-desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #475569;
  flex: 1;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-pill {
  font-size: 0.72rem;
  padding: 0.3rem 0.75rem;
  background-color: rgba(16, 185, 129, 0.08);
  color: var(--theme-color);
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.card-action {
  font-family: 'Outfit', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--theme-color);
  transition: transform 0.2s ease;
}

.action-arrow {
  transition: transform 0.2s ease;
}

.initiative-card:hover .action-arrow {
  transform: translateX(4px);
}

/* Why Hub Section */
.why-hub-section {
  padding: 3.5rem 3rem;
  background-color: #f0fdf4;
  border-radius: 28px;
  border: 1px solid rgba(16, 185, 129, 0.1);
  box-shadow: inset 0 2px 4px rgba(16, 185, 129, 0.02);
}

.why-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #053018;
  margin: 0 0 2rem 0;
  border-bottom: 1px solid rgba(16, 185, 129, 0.15);
  padding-bottom: 0.75rem;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.why-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.why-item-title {
  font-family: 'Outfit', sans-serif;
  margin: 0;
  color: #059669;
  font-size: 1.05rem;
  font-weight: 700;
}

.why-item-desc {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: #475569;
}

@media (max-width: 768px) {
  .hub-hero {
    padding: 3rem 1.75rem;
  }
  .why-hub-section {
    padding: 2.5rem 1.5rem;
  }
}
</style>
