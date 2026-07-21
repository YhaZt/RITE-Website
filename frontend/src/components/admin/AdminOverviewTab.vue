<template>
  <div class="tab-content overview-tab">
    <div class="overview-topbar">
      <div class="overview-topbar-left">
        <h1 class="overview-title">OVERVIEW</h1>
        <p class="overview-tagline">Real-time decision support across Mindoro State University RITE</p>
      </div>
      <div class="overview-topbar-right">
        <button class="sidebar-toggle" type="button" @click="$emit('open-sidebar')" aria-label="Open navigation">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span class="overview-date">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {{ todayFormatted }}
        </span>
        <router-link to="/" class="btn-preview overview-site-btn" target="_blank">View Public Site →</router-link>
      </div>
    </div>

    <div class="metric-grid">
      <button
        v-for="metric in metrics"
        :key="metric.id"
        type="button"
        class="metric-card"
        :title="`View ${metric.subtitle}`"
        @click="onMetricClick(metric)"
      >
        <span class="metric-card-action">View details →</span>
        <div class="metric-card-head">
          <div class="metric-icon" :class="metric.tone">
            <span class="metric-icon-svg" v-html="metric.icon"></span>
          </div>
          <span class="metric-label">{{ metric.label }}</span>
        </div>
        <div class="metric-value">{{ metric.value }}</div>
        <div class="metric-sub">{{ metric.subtitle }}</div>
        <div v-if="metric.trend !== null" class="metric-trend">
          <span class="trend-up">↑ {{ metric.trend }}%</span>
          <span class="trend-period">{{ metric.trendLabel }}</span>
        </div>
      </button>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <h3 class="chart-title">Submission Status</h3>
        <div class="chart-body donut-layout">
          <div class="donut-wrap">
            <div class="donut-chart" :style="{ background: donutGradient }">
              <div class="donut-hole">
                <strong>{{ submissionTotal }}</strong>
                <span>Total</span>
              </div>
            </div>
          </div>
          <ul class="donut-legend">
            <li v-for="seg in projectStatusSegments" :key="seg.label">
              <span class="legend-dot" :style="{ background: seg.color }"></span>
              <span class="legend-label">{{ seg.label }}</span>
              <span class="legend-pct">{{ seg.pct }}%</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="chart-card chart-card-wide">
        <h3 class="chart-title">Activity Trend (Submissions per Quarter)</h3>
        <div class="chart-body">
          <div class="bar-chart">
            <div v-for="bar in fundingBars" :key="bar.label" class="bar-col">
              <div class="bar-track">
                <div class="bar-fill" :style="{ height: bar.pct + '%' }">
                  <span v-if="bar.isPeak" class="bar-peak-label">{{ bar.display }}</span>
                </div>
              </div>
              <span class="bar-label">{{ bar.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="centers-panel">
      <div class="centers-panel-head">
        <h3>9 Research Centers — Inquiry Breakdown</h3>
        <button type="button" class="centers-view-all" @click="$emit('filter-submissions', 'centers')">View all center submissions →</button>
      </div>
      <div class="centers-mini-grid">
        <button
          v-for="c in centerCountsList"
          :key="c.slug"
          type="button"
          class="center-mini-card"
          @click="$emit('filter-submissions', 'center:' + c.slug)"
        >
          <span class="center-mini-count">{{ c.count }}</span>
          <span class="center-mini-title">{{ c.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todayFormatted: { type: String, required: true },
  metrics: { type: Array, required: true },
  donutGradient: { type: String, required: true },
  submissionTotal: { type: Number, required: true },
  projectStatusSegments: { type: Array, required: true },
  fundingBars: { type: Array, required: true },
  centerCountsList: { type: Array, required: true },
});

const emit = defineEmits(['open-sidebar', 'filter-submissions', 'navigate-tab']);

const onMetricClick = (metric) => {
  const action = metric.action;
  if (!action) return;
  if (action.type === 'submissions') {
    emit('filter-submissions', action.filter);
  } else if (action.type === 'tab') {
    emit('navigate-tab', action.tab);
  }
};
</script>

<style scoped>
.overview-tab { padding: 0; }

.overview-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.overview-title {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #0f2d1c;
}

.overview-tagline {
  margin: 0.35rem 0 0;
  color: #5b7268;
  font-size: 0.9rem;
}

.overview-topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.overview-date {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #fff;
  border: 1px solid #cfe0d8;
  color: #334155;
  padding: 0.55rem 0.9rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
}

.overview-site-btn { font-size: 0.85rem; }

.btn-preview { background: #ffffff; color: #094A25; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; text-decoration: none; }

.sidebar-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #ffffff;
  color: #094A25;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  position: relative;
  background: #fff;
  border: 1px solid #d5e5dd;
  border-radius: 14px;
  padding: 1.1rem 1.15rem 1rem;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.04);
  overflow: hidden;
}

.metric-card-action {
  position: absolute;
  top: 0.85rem;
  right: 0.9rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: #059669;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  border-color: #059669;
  background: #f8fffb;
  box-shadow: 0 14px 32px rgba(9, 74, 37, 0.14);
}

.metric-card:hover .metric-card-action {
  opacity: 1;
  transform: translateY(0);
}

.metric-card:hover .metric-value {
  color: #094A25;
}

.metric-card:active {
  transform: translateY(-1px);
}

.metric-card-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.85rem;
}

.metric-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon.teal { background: #e4f2ec; color: #094A25; }
.metric-icon.green { background: #e8f8ef; color: #15803d; }
.metric-icon.gold { background: #fff6dd; color: #b45309; }

.metric-icon-svg :deep(svg) { display: block; }

.metric-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #64748b;
  line-height: 1.2;
}

.metric-value {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #0f2d1c;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.metric-sub {
  font-size: 0.82rem;
  color: #64748b;
  margin-bottom: 0.55rem;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
}

.trend-up {
  color: #15803d;
  font-weight: 800;
}

.trend-period {
  color: #94a3b8;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.chart-card {
  background: #fff;
  border: 1px solid #d5e5dd;
  border-radius: 14px;
  padding: 1.15rem 1.25rem 1.25rem;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.chart-card:hover {
  transform: translateY(-2px);
  border-color: #94c4ad;
  box-shadow: 0 12px 28px rgba(9, 74, 37, 0.1);
}

.centers-panel {
  background: #fff;
  border: 1px solid #d5e5dd;
  border-radius: 14px;
  padding: 1.15rem 1.25rem 1.25rem;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.04);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.centers-panel:hover {
  box-shadow: 0 10px 24px rgba(9, 74, 37, 0.08);
}

.chart-title {
  margin: 0 0 1rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f2d1c;
}

.donut-layout {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.donut-wrap { flex-shrink: 0; }

.donut-chart {
  width: 148px;
  height: 148px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-hole {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px #e2e8f0;
}

.donut-hole strong {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  color: #094A25;
  line-height: 1;
}

.donut-hole span {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.donut-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.donut-legend li {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #475569;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-pct {
  font-weight: 800;
  color: #0f2d1c;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.65rem;
  height: 190px;
  padding-top: 1.5rem;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar-track {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar-fill {
  width: 72%;
  max-width: 52px;
  background: linear-gradient(180deg, #3d6b52 0%, #094A25 100%);
  border-radius: 6px 6px 2px 2px;
  position: relative;
  min-height: 8px;
  transition: height 0.3s ease;
}

.bar-peak-label {
  position: absolute;
  top: -1.35rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.72rem;
  font-weight: 800;
  color: #b45309;
  white-space: nowrap;
}

.bar-label {
  margin-top: 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
}

.centers-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.centers-panel-head h3 {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f2d1c;
}

.centers-view-all {
  background: transparent;
  border: none;
  color: #094A25;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
}

.centers-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.center-mini-card {
  background: #f4faf7;
  border: 1px solid #cfe0d8;
  border-radius: 12px;
  padding: 0.75rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.center-mini-card:hover {
  background: #dff3e8;
  border-color: #059669;
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(9, 74, 37, 0.12);
}

.center-mini-count {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #094A25;
  line-height: 1;
}

.center-mini-title {
  font-size: 0.68rem;
  font-weight: 700;
  color: #475569;
  line-height: 1.2;
}

@media (max-width: 1200px) {
  .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .charts-row { grid-template-columns: 1fr; }
}

@media (max-width: 900px) {
  .sidebar-toggle { display: inline-flex; }
}

@media (max-width: 640px) {
  .metric-grid { grid-template-columns: 1fr; }
  .centers-mini-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .donut-layout { flex-direction: column; }
}
</style>
