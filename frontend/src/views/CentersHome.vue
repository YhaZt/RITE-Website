<template>
  <main class="centers-page-container">
    <!-- Premium Banner Header -->
    <section class="centers-hero">
      <div class="hero-content">
        <span class="hero-tag">RITE Departments</span>
        <h1 class="hero-title">Highly Specialized Research Centers</h1>
        <p class="hero-desc">
          Advancing regional development and scientific discovery through specialized academic and applied research investigations.
        </p>
      </div>
    </section>

    <!-- Center Cards Grid Directory -->
    <section class="directory-section">
      <div class="centers-grid">
        <article
          v-for="(center, idx) in centers"
          :key="idx"
          class="center-card-wrapper"
          @mouseenter="hoveredIndex = idx"
          @mouseleave="hoveredIndex = null"
        >
          <router-link :to="center.link" class="center-card-link">
            <div class="card-image-box">
              <img :src="center.img" :alt="center.title" class="center-bg-img" loading="lazy" />
              <div class="image-gradient-overlay"></div>
              
              <!-- Floating Icon/Badge -->
              <span class="center-icon-badge">{{ center.icon }}</span>
            </div>

            <div class="card-content-box">
              <h3 class="center-card-title">{{ center.title }}</h3>
              <p class="center-card-desc">{{ center.desc }}</p>
              
              <div class="card-action-row">
                <span class="explore-btn-text">Explore Center</span>
                <span class="arrow-symbol">→</span>
              </div>
            </div>
          </router-link>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

const hoveredIndex = ref(null);

const centers = [
  { title: "Mindoro Development and Studies Center", desc: "Researching socio-economic, environmental, and cultural developments in the Mindoro region.", img: "/development.png", link: "/centers/mindoro-development", icon: "🌴" },
  { title: "Center for Digital Innovation, Cybersecurity & Emerging Technologies", desc: "Advancing digital transformation, cryptography, and emerging computing networks.", img: "/digital.png", link: "/centers/digital-innovation", icon: "💻" },
  { title: "Center for Environmental Studies", desc: "Dedicated to local biodiversity conservation, sustainability, and ecosystem protection.", img: "/environmental.png", link: "/centers/environmental-studies", icon: "🌲" },
  { title: "Fisheries Research and Development Center", desc: "Advancing marine science, aquaculture, and sustainable coastal fishing technologies.", img: "/fisheries.png", link: "/centers/fisheries-research", icon: "🐟" },
  { title: "MIMAROPA Food Innovation Center", desc: "Focusing on regional nutrition, food safety, and post-harvest agricultural innovations.", img: "/food.png", link: "/centers/mimaropa-food", icon: "🍲" },
  { title: "Center for Island Education and Sustainability", desc: "Specialized educational research regarding unique island geographies and ecologies.", img: "/island.png", link: "/centers/island-education", icon: "🏫" },
  { title: "Center for Peace, Criminology, and Law Enforcement Studies", desc: "Socio-political research into regional conflict resolution, security, and crime reduction models.", img: "/centers/peace-criminology", icon: "⚖️" },
  { title: "Center for Smart Agriculture and Biosystems Innovation", desc: "Integrating smart IoT sensors, automation, and AI robotics into farming systems.", img: "/smart.png", link: "/centers/smart-agriculture", icon: "🚜" },
  { title: "Natural Textile Fiber Innovation Center", desc: "Pioneering natural fiber extraction, textile processing, and sustainable garment engineering.", img: "/textile.png", link: "/centers/textile-fiber", icon: "🧶" },
];
</script>

<style scoped>
.centers-page-container {
  background-color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Hero Header */
.centers-hero {
  background: linear-gradient(135deg, #053018 0%, #0c3e21 100%);
  color: white;
  padding: 5.5rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hero-tag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #10b981;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
}

.hero-desc {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
  max-width: 600px;
}

/* Directory Grid */
.directory-section {
  padding: 5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.centers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.center-card-wrapper {
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.center-card-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 35px rgba(9, 74, 37, 0.07);
  border-color: rgba(9, 74, 37, 0.1);
}

.center-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image-box {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #f1f5f9;
}

.center-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.center-card-wrapper:hover .center-bg-img {
  transform: scale(1.05);
}

.image-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(5, 48, 24, 0.4) 0%, transparent 100%);
}

.center-icon-badge {
  position: absolute;
  bottom: -1.25rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(9, 74, 37, 0.05);
  z-index: 2;
}

.card-content-box {
  padding: 2.25rem 1.75rem 1.75rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.center-card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
  line-height: 1.35;
}

.center-card-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #475569;
  margin: 0;
  flex: 1;
}

.card-action-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
}

.explore-btn-text {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #10b981;
  transition: color 0.2s ease;
}

.center-card-wrapper:hover .explore-btn-text {
  color: #094A25;
}

.arrow-symbol {
  color: #10b981;
  transition: transform 0.2s ease;
}

.center-card-wrapper:hover .arrow-symbol {
  transform: translateX(4px);
  color: #094A25;
}

@media (max-width: 480px) {
  .centers-hero {
    padding: 4rem 1.5rem;
  }
  .card-content-box {
    padding: 2rem 1.25rem 1.25rem 1.25rem;
  }
}
</style>
