<template>
  <main class="pub-printing-page">
    <!-- Hero Banner -->
    <section class="page-hero">
      <div class="glow-orb"></div>
      <div class="hero-content">
        <span class="hero-tag">RITE Services</span>
        <h1 class="hero-title">Publication &amp; Printing Unit</h1>
        <p class="hero-desc">
          The Publication and Printing Unit supports the dissemination of scholarly work through high-quality publishing, layout, copyediting, and printing services that meet rigorous academic and institutional standards.
        </p>
      </div>
    </section>

    <!-- Content Card -->
    <section class="services-section">
      <div class="services-container">
        <div class="card-glow-line"></div>
        <div class="services-content">
          <div class="services-icon-header">
            <span class="emoji-badge">📚</span>
            <h2>Dissemination &amp; Publishing Services</h2>
          </div>
          <p class="services-desc">
            The unit provides peer-reviewed journal support, professional printing, aesthetic layout services, and open-access assistance to ensure your research achieves maximum visibility and reaches the widest possible audience.
          </p>
          
          <div class="key-deliverables">
            <div class="deliverable-item">
              <span class="bullet-check">✓</span>
              <div>
                <h4>Peer-Reviewed Journals</h4>
                <p>Ensuring compliance with international citation standards and scholarly index formats.</p>
              </div>
            </div>
            <div class="deliverable-item">
              <span class="bullet-check">✓</span>
              <div>
                <h4>Layout &amp; Graphic Design</h4>
                <p>Polishing research papers, brochures, newsletters, and reports for professional presentation.</p>
              </div>
            </div>
            <div class="deliverable-item">
              <span class="bullet-check">✓</span>
              <div>
                <h4>Open-Access Dissemination</h4>
                <p>Support for digital indexing, DOI registration, and repository archiving.</p>
              </div>
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
.pub-printing-page {
  padding: 3rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Page Hero */
.page-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #053018 100%);
  color: white;
  padding: 4rem 3rem;
  border-radius: 24px;
  margin-bottom: 3rem;
  overflow: hidden;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.15);
}

.glow-orb {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
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

/* Services Container Card */
.services-section {
  width: 100%;
}

.services-container {
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(5, 48, 24, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  transition: transform 0.25s ease;
}

.services-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(5, 48, 24, 0.05);
}

.card-glow-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #0f172a);
}

.services-content {
  padding: 3.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.services-icon-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.emoji-badge {
  font-size: 2.25rem;
}

.services-icon-header h2 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.services-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
  margin: 0;
}

.key-deliverables {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.deliverable-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.bullet-check {
  font-weight: 900;
  color: #10b981;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.deliverable-item h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #053018;
  margin: 0 0 0.3rem 0;
}

.deliverable-item p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #64748b;
}

@media (max-width: 768px) {
  .page-hero {
    padding: 3rem 1.75rem;
  }
  .services-content {
    padding: 2.5rem 1.5rem;
  }
}
</style>
