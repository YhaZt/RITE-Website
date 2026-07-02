<template>
  <main class="page-container">
    <!-- Split Hero Section -->
    <section class="hero-section">
      <div class="hero-inner">
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
                <div class="showcase-controls">
                  <button @click="prevHero" class="control-btn" aria-label="Previous slide">‹</button>
                  <button @click="nextHero" class="control-btn" aria-label="Next slide">›</button>
                </div>
              </div>
              <div class="floating-badge-box">
                <svg class="badge-svg-icon" viewBox="0 0 24 24" width="22" height="22" stroke="#10b981" stroke-width="2" fill="none"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 9 0 4.4-3.6 8-8 8Z"></path><path d="M11 20v-9"></path></svg>
                <div>
                  <h4>RITE Innovation</h4>
                  <p>Ecosystem driven</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full-width public analytics strip -->
        <div class="rite-pulse-panel" aria-live="polite">
          <div class="rite-pulse-head">
            <div>
              <h3>RITE Pulse</h3>
              <p>Public institutional metrics — safe to display, updated in near real-time</p>
            </div>
            <div class="rite-pulse-meta">
              <span class="live-dot" aria-hidden="true"></span>
              <span class="rite-pulse-updated">Updated {{ publicMetricsUpdatedLabel }}</span>
            </div>
          </div>

          <div class="rite-pulse-stats">
            <div v-for="stat in pulseStats" :key="stat.id" class="pulse-stat">
              <span class="pulse-stat-label">{{ stat.label }}</span>
              <strong class="pulse-stat-value">{{ stat.value }}</strong>
            </div>
          </div>

          <div class="rite-pulse-charts">
            <div class="pulse-chart-card pulse-chart-wide">
              <div class="pulse-chart-head">
                <h4>Inquiry Activity</h4>
                <span>Last 14 days</span>
              </div>
              <svg class="pulse-svg" viewBox="0 0 360 100" preserveAspectRatio="none" role="img" aria-label="Inquiry activity line chart">
                <polyline v-if="trendLinePoints" :points="trendLinePoints" fill="none" stroke="rgba(16,185,129,0.2)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                <polyline v-if="trendLinePoints" :points="trendLinePoints" fill="none" stroke="#094A25" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="pulse-chart-foot">
                <span>Total: {{ pmTotal }}</span>
                <span>Avg/day: {{ pmAvg }}</span>
              </div>
            </div>

            <div class="pulse-chart-card">
              <div class="pulse-chart-head">
                <h4>Inquiries by Unit</h4>
                <span>All time</span>
              </div>
              <div class="pulse-bars">
                <div v-for="bar in unitBars" :key="bar.label" class="pulse-bar-col">
                  <div class="pulse-bar-track">
                    <div class="pulse-bar-fill" :style="{ height: bar.pct + '%' }"></div>
                  </div>
                  <span class="pulse-bar-val">{{ bar.count }}</span>
                  <span class="pulse-bar-label">{{ bar.shortLabel }}</span>
                </div>
                <p v-if="!unitBars.length" class="pulse-empty">No inquiry data yet</p>
              </div>
            </div>

            <div class="pulse-chart-card">
              <div class="pulse-chart-head">
                <h4>{{ statusChartTitle }}</h4>
                <span>Distribution</span>
              </div>
              <div class="pulse-donut-layout">
                <div class="pulse-donut" :style="{ background: statusDonutGradient }">
                  <div class="pulse-donut-hole">
                    <strong>{{ statusDonutTotal }}</strong>
                    <span>Total</span>
                  </div>
                </div>
                <ul class="pulse-legend">
                  <li v-for="seg in statusSegments" :key="seg.label">
                    <span class="pulse-legend-dot" :style="{ background: seg.color }"></span>
                    <span>{{ seg.label }}</span>
                    <strong>{{ seg.count }}</strong>
                  </li>
                </ul>
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
import { homeCarouselSlides as staticSlides, homeFeatureCards, homePageOverviews, homeNewsItems as staticNews } from "@/data/siteData";
import { carouselService } from "@/services/carouselService";
import { newsService } from "@/services/newsService";
import { publicMetricsService } from "@/services/publicMetricsService";

const homeCarouselSlides = ref(staticSlides);
const homeNewsItems = ref(staticNews);
const publicMetrics = ref(null);
const publicMetricsUpdatedAt = ref(null);

let publicMetricsInterval = null;

// Hero Image Carousel Slider
const currentHeroIndex = ref(0);
let heroInterval = null;

const nextHero = () => {
  if (homeCarouselSlides.value.length === 0) return;
  currentHeroIndex.value = (currentHeroIndex.value + 1) % homeCarouselSlides.value.length;
};

const prevHero = () => {
  if (homeCarouselSlides.value.length === 0) return;
  currentHeroIndex.value = (currentHeroIndex.value - 1 + homeCarouselSlides.value.length) % homeCarouselSlides.value.length;
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

onMounted(async () => {
  // Fetch dynamic data from Laravel Backend API
  try {
    const slidesData = await carouselService.getAll();
    if (slidesData && slidesData.length > 0) {
      homeCarouselSlides.value = slidesData;
    }
  } catch (e) {
    console.warn("Using static carousel slides fallback", e);
  }

  try {
    const newsData = await newsService.getAll();
    if (newsData && newsData.length > 0) {
      homeNewsItems.value = newsData;
    }
  } catch (e) {
    console.warn("Using static news fallback", e);
  }

  // Start Hero Auto Slider
  heroInterval = setInterval(nextHero, 6000);
  // Start Spotlight Auto Slider
  resetSpotlightInterval();

  const loadPublicMetrics = async () => {
    try {
      const data = await publicMetricsService.get();
      publicMetrics.value = data;
      publicMetricsUpdatedAt.value = data?.generated_at ? new Date(data.generated_at) : new Date();
    } catch (e) {
      // Keep UI stable; public chart is non-critical
      if (!publicMetricsUpdatedAt.value) publicMetricsUpdatedAt.value = new Date();
    }
  };

  await loadPublicMetrics();
  publicMetricsInterval = setInterval(loadPublicMetrics, 30000);
});

onUnmounted(() => {
  if (heroInterval) clearInterval(heroInterval);
  if (spotlightInterval) clearInterval(spotlightInterval);
  if (publicMetricsInterval) clearInterval(publicMetricsInterval);
});

const publicMetricsUpdatedLabel = computed(() => {
  if (!publicMetricsUpdatedAt.value) return "just now";
  return publicMetricsUpdatedAt.value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
});

const pulseCounters = computed(() => {
  const c = publicMetrics.value?.counters;
  return {
    research_centers: c?.research_centers ?? 9,
    ecosystem_partners: c?.ecosystem_partners ?? 0,
    news_items: c?.news_items ?? homeNewsItems.value.length,
    carousel_slides: c?.carousel_slides ?? homeCarouselSlides.value.length,
    total_inquiries: c?.total_inquiries ?? 0,
  };
});

const pulseStats = computed(() => [
  { id: "centers", label: "Research Centers", value: pulseCounters.value.research_centers },
  { id: "partners", label: "Ecosystem Partners", value: pulseCounters.value.ecosystem_partners },
  { id: "news", label: "News & Events", value: pulseCounters.value.news_items },
  { id: "carousel", label: "Hero Initiatives", value: pulseCounters.value.carousel_slides },
  { id: "inquiries", label: "Total Inquiries", value: pulseCounters.value.total_inquiries },
]);

const pmSeries = computed(() => publicMetrics.value?.series?.submissions_last_14_days || []);
const pmTotal = computed(() => pmSeries.value.reduce((acc, p) => acc + (p.count || 0), 0));
const pmAvg = computed(() => {
  if (!pmSeries.value.length) return "0.0";
  return (pmTotal.value / pmSeries.value.length).toFixed(1);
});

const buildLinePoints = (points, w = 360, h = 100) => {
  if (!points || points.length < 2) return "";
  const padX = 6;
  const padY = 8;
  const max = Math.max(...points.map((p) => p.count || 0), 1);
  return points
    .map((p, i) => {
      const x = padX + (i * (w - padX * 2)) / (points.length - 1);
      const y = h - padY - ((p.count || 0) * (h - padY * 2)) / max;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

const trendLinePoints = computed(() => buildLinePoints(pmSeries.value));

const unitBars = computed(() => {
  const rows = publicMetrics.value?.breakdowns?.inquiries_by_unit || [];
  const max = Math.max(...rows.map((r) => r.count), 1);
  return rows.slice(0, 4).map((r) => ({
    label: r.label,
    shortLabel: r.label.replace("Publication & Printing", "Pub. & Print").replace("Research Centers", "Centers"),
    count: r.count,
    pct: Math.max(10, Math.round((r.count / max) * 100)),
  }));
});

const STATUS_COLORS = { Pending: "#094A25", Reviewed: "#22c55e", Completed: "#eab308" };
const ECOSYSTEM_COLORS = ["#094A25", "#22c55e", "#0ea5e9", "#eab308", "#8b5cf6"];

const inquiryStatus = computed(() => publicMetrics.value?.breakdowns?.inquiry_status || []);
const ecosystemCats = computed(() => publicMetrics.value?.breakdowns?.ecosystem_categories || []);

const statusChartTitle = computed(() =>
  inquiryStatus.value.some((s) => s.count > 0) ? "Inquiry Status" : "Partner Categories"
);

const statusSegments = computed(() => {
  const source = inquiryStatus.value.some((s) => s.count > 0)
    ? inquiryStatus.value
    : ecosystemCats.value;

  if (!source.length) {
    return [
      { label: "Partners", count: pulseCounters.value.ecosystem_partners, color: "#094A25", pct: 100 },
    ];
  }

  const total = source.reduce((acc, s) => acc + s.count, 0) || 1;
  return source.map((s, i) => ({
    label: s.label,
    count: s.count,
    color: STATUS_COLORS[s.label] || ECOSYSTEM_COLORS[i % ECOSYSTEM_COLORS.length],
    pct: Math.round((s.count / total) * 100),
  }));
});

const statusDonutTotal = computed(() =>
  statusSegments.value.reduce((acc, s) => acc + s.count, 0)
);

const statusDonutGradient = computed(() => {
  let cursor = 0;
  const parts = statusSegments.value.map((seg, i, arr) => {
    const start = cursor;
    cursor += seg.pct;
    const end = i === arr.length - 1 ? 100 : cursor;
    return `${seg.color} ${start}% ${end}%`;
  });
  return `conic-gradient(${parts.join(", ")})`;
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
  padding: 3.5rem 1.25rem 2.5rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #e6f7ed 100%);
  border-bottom: 1px solid rgba(9, 74, 37, 0.05);
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 3rem;
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
  max-height: 420px;
}

/* RITE Pulse — full-width analytics strip */
.rite-pulse-panel {
  background: #ffffff;
  border: 1px solid rgba(9, 74, 37, 0.10);
  border-radius: 20px;
  padding: 1.15rem 1.25rem 1.25rem;
  box-shadow: 0 16px 40px -20px rgba(9, 74, 37, 0.18);
}

.rite-pulse-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}

.rite-pulse-head h3 {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #053018;
}

.rite-pulse-head p {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #64748b;
}

.rite-pulse-meta {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  animation: pulse-live 2s ease-in-out infinite;
}

@keyframes pulse-live {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.rite-pulse-updated {
  font-size: 0.72rem;
  font-weight: 700;
  color: #0f766e;
  background: rgba(16, 185, 129, 0.10);
  border: 1px solid rgba(16, 185, 129, 0.18);
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
}

.rite-pulse-stats {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.6rem;
  margin-bottom: 0.9rem;
}

.pulse-stat {
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 12px;
  padding: 0.6rem 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.pulse-stat-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #64748b;
  line-height: 1.2;
}

.pulse-stat-value {
  font-family: "Outfit", sans-serif;
  font-size: 1.25rem;
  font-weight: 900;
  color: #094A25;
  line-height: 1;
}

.rite-pulse-charts {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 0.75rem;
}

.pulse-chart-card {
  background: linear-gradient(135deg, rgba(240, 253, 244, 0.85) 0%, rgba(230, 247, 237, 0.85) 100%);
  border: 1px solid rgba(9, 74, 37, 0.08);
  border-radius: 14px;
  padding: 0.75rem 0.85rem 0.7rem;
  min-width: 0;
}

.pulse-chart-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.pulse-chart-head h4 {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  color: #053018;
}

.pulse-chart-head span {
  font-size: 0.68rem;
  color: #94a3b8;
  font-weight: 600;
}

.pulse-svg {
  width: 100%;
  height: 72px;
  display: block;
}

.pulse-chart-foot {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.35rem;
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.pulse-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.35rem;
  height: 100px;
  padding-top: 0.25rem;
}

.pulse-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 0;
}

.pulse-bar-track {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.pulse-bar-fill {
  width: 70%;
  max-width: 28px;
  background: linear-gradient(180deg, #3d6b52 0%, #094A25 100%);
  border-radius: 5px 5px 2px 2px;
  min-height: 6px;
  transition: height 0.3s ease;
}

.pulse-bar-val {
  font-size: 0.68rem;
  font-weight: 800;
  color: #094A25;
  margin-top: 0.25rem;
}

.pulse-bar-label {
  font-size: 0.58rem;
  font-weight: 700;
  color: #64748b;
  text-align: center;
  line-height: 1.1;
  margin-top: 0.15rem;
  word-break: break-word;
}

.pulse-empty {
  margin: auto;
  font-size: 0.75rem;
  color: #94a3b8;
  text-align: center;
}

.pulse-donut-layout {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.pulse-donut {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-donut-hole {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px #e2e8f0;
}

.pulse-donut-hole strong {
  font-family: "Outfit", sans-serif;
  font-size: 0.95rem;
  color: #094A25;
  line-height: 1;
}

.pulse-donut-hole span {
  font-size: 0.55rem;
  color: #94a3b8;
}

.pulse-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.pulse-legend li {
  display: grid;
  grid-template-columns: 8px 1fr auto;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  color: #475569;
}

.pulse-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.pulse-legend strong {
  color: #053018;
  font-size: 0.72rem;
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
  left: 1.5rem;
  bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 0.75rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15);
  z-index: 5;
  max-width: 85%;
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
    gap: 2.5rem;
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
  .hero-image-showcase {
    max-height: none;
  }
  .rite-pulse-charts {
    grid-template-columns: 1fr 1fr;
  }
  .pulse-chart-wide {
    grid-column: 1 / -1;
  }
  .rite-pulse-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

@media (max-width: 640px) {
  .hero-section {
    padding: 2.5rem 1rem 2rem;
  }
  .rite-pulse-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .rite-pulse-charts {
    grid-template-columns: 1fr;
  }
  .pulse-donut-layout {
    flex-direction: row;
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
  .rite-pulse-stats {
    grid-template-columns: 1fr 1fr;
  }
  .pulse-stat-value {
    font-size: 1.1rem;
  }
}
</style>
