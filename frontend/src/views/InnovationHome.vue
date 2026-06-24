<template>
  <main class="innovation-page">
    <!-- Hero Banner -->
    <section class="innovation-hero">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      
      <div class="hero-header-content">
        <span class="hero-tag">RITE Innovation Division</span>
        <h1 class="hero-title">Office of Innovation</h1>
        <p class="hero-desc">
          The Office of Innovation drives institutional growth by accelerating technology innovation and transfer, building smart university systems, upskilling faculty, students, and communities, and fostering entrepreneurship through incubation, mentorship, and industry linkages.
        </p>
      </div>

      <!-- Innovation Pillars Showcase -->
      <div class="pillars-showcase">
        <h2 class="pillars-title">Our Innovation Pillars</h2>
        
        <div class="pillars-grid">
          <div
            v-for="(p, i) in innovationPillars"
            :key="p.letter"
            class="pillar-card-wrapper"
          >
            <!-- Router Link Wrapper for Technology Transfer (Pillar 'B') -->
            <router-link
              v-if="p.link"
              :to="p.link"
              class="pillar-card-link"
            >
              <div
                class="pillar-card-inner"
                :class="{ 'is-flipped': hovered === i || flipped.includes(i) }"
                @mouseenter="hovered = i"
                @mouseleave="hovered = null"
              >
                <!-- Front Side -->
                <div class="card-side card-front">
                  <div class="letter-badge">{{ p.letter }}</div>
                  <p class="pillar-front-text">{{ p.front }}</p>
                </div>
                <!-- Back Side -->
                <div class="card-side card-back">
                  <p class="pillar-back-text">{{ p.back }}</p>
                  <span class="explore-indicator">Click to Explore →</span>
                </div>
              </div>
            </router-link>

            <!-- Interactive Div for non-link pillars -->
            <div
              v-else
              class="pillar-card-link"
              role="button"
              tabindex="0"
              @mouseenter="hovered = i"
              @mouseleave="hovered = null"
              @click="toggleFlip(i)"
              @keydown.enter="toggleFlip(i)"
            >
              <div
                class="pillar-card-inner"
                :class="{ 'is-flipped': hovered === i || flipped.includes(i) }"
              >
                <!-- Front Side -->
                <div class="card-side card-front">
                  <div class="letter-badge">{{ p.letter }}</div>
                  <p class="pillar-front-text">{{ p.front }}</p>
                </div>
                <!-- Back Side -->
                <div class="card-side card-back">
                  <p class="pillar-back-text">{{ p.back }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sub-page Initiatives Grid Layout -->
    <section class="initiatives-section">
      <div class="section-header">
        <span class="section-tag">Focus Pillars</span>
        <h2>Key Hubs &amp; Systems</h2>
        <div class="section-line"></div>
      </div>

      <div class="initiatives-grid">
        <!-- Technology Transfer & Patent Unit -->
        <router-link to="/technology-transfer" class="initiative-box tt-box">
          <div class="box-glow"></div>
          <h3 class="box-title">Technology Transfer &amp;<br />Patent Unit</h3>
          <p class="box-desc">
            Bridging research innovation and commercialization through IP protection, patent filing, technology licensing, and spin-off support.
          </p>
          <div class="box-tags">
            <span v-for="tag in ['IP Protection', 'Patents', 'Licensing']" :key="tag" class="box-tag">
              {{ tag }}
            </span>
          </div>
          <span class="box-action">Explore Office →</span>
        </router-link>

        <!-- Minsu I-BIBES -->
        <a href="https://www.minsuibibes.com" target="_blank" rel="noopener noreferrer" class="initiative-box ibibes-box">
          <div class="box-glow"></div>
          <h3 class="box-title">Minsu I-BIBES</h3>
          <p class="box-desc">
            Targeted innovation support bridging community-driven solutions with institutional resources through labs, field pilots, and capacity-building workshops.
          </p>
          <div class="box-tags">
            <span v-for="tag in ['Community Labs', 'Field Pilots', 'Capacity Building']" :key="tag" class="box-tag">
              {{ tag }}
            </span>
          </div>
          <span class="box-action">Visit Portal →</span>
        </a>

        <!-- BUKID Hub -->
        <router-link to="/innovation-hub" class="initiative-box hub-box">
          <div class="box-glow"></div>
          <h3 class="box-title">Innovation Hub</h3>
          <p class="box-desc">
            A dedicated innovation hub fostering entrepreneurship, technology development, and collaborative partnerships to transform ideas into viable business solutions.
          </p>
          <div class="box-tags">
            <span v-for="tag in ['Incubation', 'Entrepreneurship', 'Partnerships']" :key="tag" class="box-tag">
              {{ tag }}
            </span>
          </div>
          <span class="box-action">Explore Hub →</span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { innovationPillars } from "@/data/siteData";

const hovered = ref(null);
const flipped = ref([]);

const toggleFlip = (index) => {
  if (flipped.value.includes(index)) {
    flipped.value = flipped.value.filter((i) => i !== index);
  } else {
    flipped.value.push(index);
  }
};
</script>

<style scoped>
.innovation-page {
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Hero Banner */
.innovation-hero {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0d5e32 50%, #10b981 100%);
  color: white;
  padding: 4rem 3rem 5rem 3rem;
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
  left: 20%;
  width: 260px;
  height: 260px;
  background: rgba(245, 158, 11, 0.08);
}

.hero-header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 3rem;
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
  font-size: clamp(2rem, 5vw, 3rem);
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

/* Pillars Showcase */
.pillars-showcase {
  position: relative;
  z-index: 2;
  width: 100%;
}

.pillars-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding-bottom: 0.75rem;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.25rem;
  width: 100%;
}

.pillar-card-wrapper {
  perspective: 1000px;
  height: 220px;
}

.pillar-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}

.pillar-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  cursor: pointer;
}

.pillar-card-inner.is-flipped {
  transform: rotateY(180deg);
}

.card-side {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-front {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  color: #ffffff;
}

.letter-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 2.25rem;
  font-weight: 900;
  line-height: 1;
  color: #10b981;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
}

.pillar-front-text {
  font-family: 'Outfit', sans-serif;
  font-size: 0.88rem;
  line-height: 1.35;
  font-weight: 600;
  margin: 0;
}

.card-back {
  background: rgba(255, 255, 255, 0.95);
  color: #053018;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pillar-back-text {
  font-size: 0.8rem;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
}

.explore-indicator {
  font-family: 'Outfit', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  margin-top: 0.4rem;
}

/* Initiatives Grid */
.initiatives-section {
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

.initiatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.initiative-box {
  position: relative;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  color: white;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.initiative-box:hover {
  transform: translateY(-6px);
}

.box-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  transition: transform 0.4s ease;
}

.initiative-box:hover .box-glow {
  transform: scale(1.2);
}

.tt-box {
  background: linear-gradient(135deg, #053018 0%, #0d5e32 100%);
}

.tt-box:hover {
  box-shadow: 0 20px 40px rgba(5, 48, 24, 0.22);
}

.ibibes-box {
  background: linear-gradient(135deg, #c2410c 0%, #f97316 100%);
}

.ibibes-box:hover {
  box-shadow: 0 20px 40px rgba(249, 115, 22, 0.22);
}

.hub-box {
  background: linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%);
}

.hub-box:hover {
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.22);
}

.box-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0 0 0.8rem 0;
  line-height: 1.25;
}

.box-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0 0 1.5rem 0;
  flex: 1;
}

.box-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.box-tag {
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.box-action {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: transform 0.2s ease;
}

.initiative-box:hover .box-action {
  transform: translateX(4px);
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .pillars-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .innovation-hero {
    padding: 3rem 1.75rem;
  }
  .pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}
</style>
