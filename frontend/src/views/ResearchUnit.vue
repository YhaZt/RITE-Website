<template>
  <main class="research-unit-page">
    <!-- Hero Banner -->
    <section class="page-hero">
      <div class="glow-orb"></div>
      <div class="hero-content">
        <span class="hero-tag">RITE Services</span>
        <h1 class="hero-title">Research Unit</h1>
        <p class="hero-desc">
          The Research Unit drives scientific inquiry, builds institutional research capability, and manages funding portfolios to address key local, regional, and national development agendas.
        </p>
      </div>
    </section>

    <!-- Content Card -->
    <section class="details-section">
      <div class="details-container">
        <div class="card-glow-line"></div>
        <div class="details-content">
          <div class="details-icon-header">
            <span class="emoji-badge">🔬</span>
            <h2>Scientific Development &amp; Focus</h2>
          </div>
          <p class="details-desc">
            We specialize in orchestrating faculty and student research projects, organizing academic capability training, and seeking external financing and partnerships to elevate MinSU's academic prestige.
          </p>

          <div class="key-objectives">
            <div class="objective-card">
              <span class="obj-num">01</span>
              <h4>Applied Inquiry</h4>
              <p>Promoting practical solutions in agriculture, engineering, social sciences, and marine biology.</p>
            </div>
            <div class="objective-card">
              <span class="obj-num">02</span>
              <h4>Capability Building</h4>
              <p>Workshops on data science, citation indexes, prior art research, and technical writing.</p>
            </div>
            <div class="objective-card">
              <span class="obj-num">03</span>
              <h4>Strategic Grants</h4>
              <p>Coordinating national and international funding opportunities (DOST, CHED, DA-BAR).</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.research-unit-page {
  padding: 3rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Page Hero */
.page-hero {
  position: relative;
  background: linear-gradient(135deg, #094d2c 0%, #064024 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  margin-bottom: 3rem;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(9, 77, 44, 0.15);
}

.glow-orb {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
  filter: blur(20px);
}

.hero-content {
  position: relative;
  z-index: 2;
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
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin: 0;
}

.hero-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
  max-width: 800px;
}

/* Details Card */
.details-section {
  width: 100%;
}

.details-container {
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(5, 48, 24, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  transition: transform 0.25s ease;
}

.details-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(5, 48, 24, 0.05);
}

.card-glow-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #f59e0b);
}

.details-content {
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.details-icon-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.emoji-badge {
  font-size: 2.25rem;
}

.details-icon-header h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.details-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
  margin: 0;
}

.key-objectives {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.objective-card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.02);
  position: relative;
}

.obj-num {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: rgba(16, 185, 129, 0.18);
  position: absolute;
  top: 1rem;
  right: 1.25rem;
}

.objective-card h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #053018;
  margin: 0;
}

.objective-card p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #64748b;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 3rem 1.75rem;
  }
  .details-content {
    padding: 2.5rem 1.5rem;
  }
}
</style>
