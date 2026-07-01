<template>
  <main class="about-page">
    <!-- Premium Card Hero Header -->
    <section class="about-hero">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="hero-content">
        <span class="hero-tag">About RITE</span>
        <h1 class="hero-title">Advancing Knowledge, Fostering Innovation</h1>
        <p class="hero-desc">
          {{ aboutContent.hero.description }}
        </p>
      </div>
    </section>

    <!-- Mission & Vision Cards Section -->
    <section class="mission-vision-section">
      <div class="cards-grid">
        <!-- Mission -->
        <div class="mv-card mission-card">
          <div class="card-glow"></div>
          <div class="card-icon-header">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="#10b981" stroke-width="2" fill="none" class="card-svg"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            <h3>Our Mission</h3>
          </div>
          <p class="card-text">{{ aboutContent.mission }}</p>
        </div>

        <!-- Vision -->
        <div class="mv-card vision-card">
          <div class="card-glow"></div>
          <div class="card-icon-header">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="#10b981" stroke-width="2" fill="none" class="card-svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <h3>Our Vision</h3>
          </div>
          <p class="card-text">{{ aboutContent.vision }}</p>
        </div>
      </div>
    </section>

    <!-- Core Values Section -->
    <section class="values-section">
      <div class="section-header text-center">
        <span class="section-tag">Philosophy</span>
        <h2>Our Core Values</h2>
        <div class="section-line"></div>
      </div>

      <div class="values-grid">
        <div 
          v-for="val in aboutContent.coreValues" 
          :key="val.label" 
          class="value-card" 
          :style="{ 
            '--accent-color': val.color, 
            '--card-bg': val.bg, 
            '--card-border': val.border 
          }"
        >
          <div class="val-bullet"></div>
          <h4 class="val-label">{{ val.label }}</h4>
          <p class="val-desc">{{ getCoreValueDesc(val.label) }}</p>
        </div>
      </div>
    </section>

    <!-- Organizational Chart Section -->
    <section class="chart-section">
      <OrganizationalChart />
    </section>

    <!-- Ecosystem Partners Search & Filter Dashboard -->
    <section class="partners-section">
      <div class="section-header text-center">
        <span class="section-tag">Collaboration</span>
        <h2>RITE Ecosystem Directory</h2>
        <p class="section-subtitle">Explore and search our vast network of local, national, and international partners</p>
        <div class="section-line"></div>
      </div>

      <!-- Search & Filter Controls -->
      <div class="dashboard-controls">
        <div class="search-input-wrapper">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="#94a3b8" stroke-width="2" fill="none" class="search-svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search partners by name..."
            class="search-field"
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search-btn">✕</button>
        </div>

        <div class="filter-buttons-wrapper">
          <button
            v-for="cat in categories"
            :key="cat.value"
            class="filter-tab-btn"
            :class="{ 'active-tab': activeCategory === cat.value }"
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Partners Grid -->
      <div class="partners-results-container">
        <transition-group name="grid-fade" tag="div" class="partners-grid">
          <div
            v-for="partner in paginatedPartners"
            :key="partner.name"
            class="partner-card"
          >
            <component
              :is="partner.link ? 'a' : 'div'"
              v-bind="partner.link ? { href: partner.link, target: '_blank', rel: 'noopener noreferrer' } : {}"
              class="partner-card-inner"
            >
              <div class="partner-logo-box" :style="getLogoBoxStyle(partner)">
                <!-- Check if the logo failed to load; if so, render the custom initials badge -->
                <img
                  v-if="!failedLogos[partner.name]"
                  :src="partner.logo"
                  :alt="`${partner.name} logo`"
                  loading="lazy"
                  class="partner-logo-img"
                  :style="getImageStyle(partner)"
                  @error="onLogoError(partner.name)"
                />
                <div v-else class="partner-logo-fallback">
                  {{ getInitials(partner.name) }}
                </div>
              </div>
              <h4 class="partner-name">{{ partner.name }}</h4>
            </component>
          </div>
        </transition-group>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="pagination-bar">
          <button :disabled="currentPage === 1" @click="currentPage--" class="page-btn">← Prev</button>
          <span class="page-info">Page {{ currentPage }} of {{ totalPages }} ({{ filteredPartners.length }} items)</span>
          <button :disabled="currentPage === totalPages" @click="currentPage++" class="page-btn">Next →</button>
        </div>

        <!-- No Results Fallback -->
        <div v-if="filteredPartners.length === 0" class="no-results-panel">
          <span class="no-results-icon">📂</span>
          <h3>No Partners Found</h3>
          <p>No partners matching "{{ searchQuery }}" were found. Try resetting the filters.</p>
          <button @click="resetFilters" class="btn btn-secondary">Reset Filters</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { aboutContent, ecosystemPartners as staticPartners } from "@/data/siteData";
import { ecosystemService } from "@/services/ecosystemService";
import OrganizationalChart from "@/components/OrganizationalChart.vue";

const searchQuery = ref("");
const activeCategory = ref("all");
const failedLogos = ref({});
const dynamicPartners = ref(staticPartners);

const currentPage = ref(1);
const itemsPerPage = ref(12);

onMounted(async () => {
  try {
    const apiPartners = await ecosystemService.getAll();
    if (apiPartners && apiPartners.length > 0) {
      dynamicPartners.value = apiPartners.map(p => ({
        name: p.title,
        link: p.link,
        logo: p.image || '',
        category: p.category || 'all'
      }));
    }
  } catch (e) {
    console.warn("Using static ecosystem fallback", e);
  }
});

const categories = [
  { label: "All Partners", value: "all" },
  { label: "Government & DOST", value: "gov" },
  { label: "Universities & Academia", value: "academic" },
  { label: "LGUs & Local Communities", value: "local" },
];

const getCoreValueDesc = (label) => {
  const descs = {
    Integrity: "Upholding the highest standard of professional ethics, accountability, honesty, and transparency in all undertakings.",
    Collaboration: "Fostering team spirit, interdisciplinary cooperation, and strong partnerships to achieve shared goals.",
    Excellence: "Striving for the highest quality and continuous improvement in research, extension, and academic outcomes.",
    Service: "Dedication to serving our communities, resolving regional challenges, and driving inclusive sustainable growth."
  };
  return descs[label] || "";
};

const onLogoError = (name) => {
  failedLogos.value[name] = true;
};

const getInitials = (name) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const filteredPartners = computed(() => {
  return dynamicPartners.value.filter((partner) => {
    // 1. Filter by search query
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 2. Filter by category
    let matchesCategory = true;
    const name = partner.name.toLowerCase();

    if (activeCategory.value === "gov") {
      matchesCategory = name.includes("dost") || name.includes("department of science") || name.includes("department of agriculture") || name.includes("national research") || name.includes("deped") || name.includes("denr") || name.includes("psa") || name.includes("philippine statistics") || name.includes("ncip");
    } else if (activeCategory.value === "academic") {
      matchesCategory = name.includes("university") || name.includes("college") || name.includes("school") || name.includes("academy") || name.includes("institute");
    } else if (activeCategory.value === "local") {
      matchesCategory = name.includes("lgu") || name.includes("barangay") || name.includes("brgy") || name.includes("samahan") || name.includes("association") || name.includes("foundation") || name.includes("cooperative") || name.includes("volunteers") || name.includes("community");
    }

    return matchesSearch && matchesCategory;
  });
});

const totalPages = computed(() => Math.ceil(filteredPartners.value.length / itemsPerPage.value) || 1);

const paginatedPartners = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPartners.value.slice(start, start + itemsPerPage.value);
});

const resetFilters = () => {
  searchQuery.value = "";
  activeCategory.value = "all";
  currentPage.value = 1;
};

const getLogoBoxStyle = (partner) => {
  const isDostMimaropa = partner.name === "DEPARTMENT OF SCIENCE AND TECHNOLOGY – MIMAROPA";
  const isDostMimaropaPgom = partner.name === "DEPARTMENT OF SCIENCE AND TECHNOLOGY-MIMAROPA, Provincial Government of Oriental Mindoro (PGOM)";
  const isNuSportsAcademy = partner.name === "National University Sports Academy, Inc";
  const isPhivolcs = partner.name === "DEPARTMENT OF SCIENCE AND TECHNOLOGY – PHILIPPINE INSTITUTE OF VOLCANOLOGY AND SEISMOLOGY";

  let background = "#f8fafc";
  if (isDostMimaropa || isDostMimaropaPgom) background = "#0f2341";
  else if (isNuSportsAcademy) background = "#3b4998";
  else if (isPhivolcs) background = "#ffffff";

  return {
    background,
    cursor: partner.link ? "pointer" : "default",
  };
};

const getImageStyle = (partner) => {
  const name = partner.name;
  const isVnua = name === "Vietnam National University of Agriculture";
  const isUm = name === "Universiti Malaya";
  const isSiu = name === "Shinawatra University";
  const isNrcp = name === "National Research Council of the Philippines";
  const isDa = name === "Department of Agriculture";
  const isDaMimaropa = name === "Department of Agriculture-Regional Field Office-MIMAROPA";
  const isDaBar = name === "Department of Agriculture-Bureau of Agricultural Research (DA-BAR)";
  const isDostMimaropa = name === "DEPARTMENT OF SCIENCE AND TECHNOLOGY – MIMAROPA";
  const isDostMimaropaPgom = name === "DEPARTMENT OF SCIENCE AND TECHNOLOGY-MIMAROPA, Provincial Government of Oriental Mindoro (PGOM)";
  const isNuSportsAcademy = name === "National University Sports Academy, Inc";
  const isPhivolcs = name === "DEPARTMENT OF SCIENCE AND TECHNOLOGY – PHILIPPINE INSTITUTE OF VOLCANOLOGY AND SEISMOLOGY";

  if (isVnua) {
    return { width: "70px", height: "70px", objectFit: "cover", borderRadius: "50%" };
  } else if (isUm) {
    return { width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" };
  } else if (isSiu || isNrcp) {
    return { width: "76px", height: "76px", objectFit: "contain" };
  } else if (isDa || isDaMimaropa || isDaBar || isDostMimaropa || isPhivolcs || isNuSportsAcademy) {
    return { width: "100%", height: "100%", objectFit: "contain" };
  } else if (isDostMimaropaPgom) {
    return { width: "76px", height: "76px", objectFit: "cover", borderRadius: "8px" };
  } else {
    return { width: "100%", height: "100%", objectFit: "contain" };
  }
};
</script>

<style scoped>
.about-page {
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Premium Card Hero */
.about-hero {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0d5e32 50%, #10b981 100%);
  color: white;
  padding: 4.5rem 3.5rem;
  border-radius: 28px;
  margin-bottom: 4rem;
  overflow: hidden;
  box-shadow: 0 20px 45px -15px rgba(5, 48, 24, 0.18);
  text-align: left;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.15;
}

.hero-desc {
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
}

/* Mission & Vision Section */
.mission-vision-section {
  padding: 1rem 0 4rem 0;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.mv-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  border: 1px solid rgba(9, 74, 37, 0.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.mv-card:hover {
  transform: translateY(-4px);
  border-color: rgba(9, 74, 37, 0.1);
}

.card-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: opacity 0.3s ease;
  opacity: 0.4;
}

.mission-card .card-glow {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
}

.vision-card .card-glow {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
}

.card-icon-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-emoji {
  font-size: 2.25rem;
}

.card-icon-header h3 {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.card-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
  margin: 0;
  position: relative;
  z-index: 2;
}

/* Philosophy / Core Values */
.values-section {
  padding: 1rem 0 4rem 0;
}

.section-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 3.5rem;
  gap: 0.4rem;
}

.section-header.text-center {
  align-items: center;
  text-align: center;
}

.section-header:not(.text-center) {
  align-items: flex-start;
  text-align: left;
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

.section-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin: 0.5rem 0 0 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.value-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-top: 4px solid var(--accent-color);
  border-radius: 20px;
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.85rem;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(5, 48, 24, 0.06);
}

.val-bullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--accent-color);
}

.val-label {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #053018;
  margin: 0;
}

.val-desc {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #1e293b;
  margin: 0;
}

/* Chart Section */
.chart-section {
  padding: 1rem 0 4rem 0;
}

/* Partners Dashboard Section */
.partners-section {
  padding: 2rem 0 4rem 0;
}

.dashboard-controls {
  margin: 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-svg {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  pointer-events: none;
}

.search-field {
  width: 100%;
  padding: 0.9rem 3rem 0.9rem 3rem;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  outline: none;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.search-field:focus {
  border-color: #094A25;
  box-shadow: 0 0 0 3px rgba(9, 74, 37, 0.12);
}

.clear-search-btn {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  opacity: 0.5;
}

.clear-search-btn:hover {
  opacity: 0.9;
}

.filter-buttons-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tab-btn {
  font-family: 'Outfit', sans-serif;
  background: #e2e8f0;
  color: #475569;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tab-btn:hover {
  background: #cbd5e1;
}

.filter-tab-btn.active-tab {
  background: #094A25;
  color: white;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.partner-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  height: 100%;
}

.partner-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.06);
  border-color: rgba(9, 74, 37, 0.1);
}

.partner-card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.partner-logo-box {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f8fafc;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.partner-logo-img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.2s ease;
}

.partner-card:hover .partner-logo-img {
  transform: scale(1.04);
}

.partner-logo-fallback {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #094A25 0%, #10b981 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  box-shadow: 0 4px 10px rgba(9, 74, 37, 0.15);
  text-align: center;
}

.partner-name {
  padding: 1.25rem 1rem;
  font-size: 0.85rem;
  font-weight: 750;
  text-align: center;
  color: #053018;
  margin: 0;
  line-height: 1.4;
  text-transform: uppercase;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-wrap: break-word;
}

/* Fallback panel */
.no-results-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-results-panel h3 {
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
}

.no-results-panel p {
  color: #64748b;
  margin: 0 0 1.5rem 0;
}

.btn-secondary {
  background: #ffffff;
  color: #094A25;
  border: 2px solid rgba(9, 74, 37, 0.2);
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(9, 74, 37, 0.05);
  border-color: #094A25;
}

/* Pagination Styles */
.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  padding: 1rem;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.page-btn {
  background: #094A25;
  color: white;
  border: none;
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: #063219;
  transform: translateY(-1px);
}

.page-btn:disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

.page-info {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
}

/* Grid animations */
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: all 0.3s ease;
}
.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive queries */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .mv-card {
    padding: 2.25rem 1.75rem;
  }
  .about-hero {
    padding: 3rem 1.75rem;
  }
  .pagination-bar {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
