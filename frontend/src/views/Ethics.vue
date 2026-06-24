<template>
  <main class="ethics-page">
    <!-- Hero Banner -->
    <section class="ethics-hero">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="hero-content">
        <span class="hero-subtitle">RITE Compliance &amp; Standards</span>
        <h1 class="hero-title">Research Ethics &amp;<br />Integrity</h1>
        <p class="hero-desc">
          Ensuring ethical, responsible, and transparent research practices across all academic divisions, scholarly activities, and institutional programs.
        </p>
      </div>
    </section>

    <!-- Programs Grid -->
    <section class="programs-section">
      <div class="section-header">
        <span class="section-tag">What We Do</span>
        <h2 class="section-title">Our Focus Areas</h2>
        <div class="section-line"></div>
      </div>
      
      <div class="programs-grid">
        <article
          v-for="(item, idx) in ethicsPrograms"
          :key="idx"
          class="program-card"
          :style="{
            '--accent-color': item.color,
            '--card-bg': item.bg,
            '--card-border': item.border
          }"
        >
          <div class="card-accent-bar"></div>
          <div class="card-icon-container">
            <span class="card-index">0{{ idx + 1 }}</span>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ethicsPrograms } from "@/data/siteData";
</script>

<style scoped>
.ethics-page {
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Hero Section */
.ethics-hero {
  position: relative;
  background: linear-gradient(135deg, #4c0519 0%, #881337 50%, #db2777 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  margin-bottom: 4rem;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(136, 19, 55, 0.15);
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
  background: rgba(219, 39, 119, 0.15);
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
  max-width: 700px;
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
  color: #f472b6;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin: 0;
}

.hero-desc {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
}

/* Programs Section */
.programs-section {
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

.section-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #db2777;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: #4c0519;
  margin: 0;
}

.section-line {
  width: 48px;
  height: 4px;
  background: #881337;
  border-radius: 2px;
  margin-top: 0.25rem;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.program-card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.program-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 35px rgba(136, 19, 55, 0.08);
}

.card-accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--accent-color);
}

.card-icon-container {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.4);
}

.card-index {
  font-family: 'Outfit', sans-serif;
  color: var(--accent-color);
  font-weight: 800;
  font-size: 1.1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #4c0519;
  margin: 0;
  line-height: 1.3;
}

.card-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #475569;
  margin: 0;
}

@media (max-width: 768px) {
  .ethics-hero {
    padding: 3rem 1.75rem;
  }
}
</style>
