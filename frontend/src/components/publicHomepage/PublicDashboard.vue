<template>
  <div class="public-dashboard" aria-live="polite">
    <div class="pd-topbar">
      <div class="pd-topbar-left">
        <h1 class="pd-title">OVERVIEW</h1>
        <p class="pd-tagline">Public institutional metrics — aggregates only, updated in near real-time</p>
      </div>
      <div class="pd-topbar-right">
        <span class="pd-date">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {{ todayFormatted }}
        </span>
        <span class="pd-updated">
          <span class="live-dot" aria-hidden="true"></span>
          Updated {{ updatedLabel }}
        </span>
      </div>
    </div>

    <!-- KPI grid -->
    <div v-if="kpiWidgets.length" class="pd-metric-grid">
      <div
        v-for="item in kpiWidgets"
        :key="item.id"
        class="pd-metric-card"
      >
        <div class="pd-metric-head">
          <div class="pd-metric-icon" :class="item.def.tone">
            <span class="pd-metric-icon-svg" v-html="item.def.icon"></span>
          </div>
          <span class="pd-metric-label">{{ item.def.publicLabel }}</span>
        </div>
        <div class="pd-metric-value">{{ item.value }}</div>
        <div class="pd-metric-sub">{{ item.def.subtitle }}</div>
      </div>
    </div>

    <!-- Charts row -->
    <div v-if="chartWidgets.length" class="pd-charts-row">
      <template v-for="item in chartWidgets" :key="item.id">
        <div v-if="item.widgetKey === 'submission_status'" class="pd-chart-card">
          <h3 class="pd-chart-title">Submission Status</h3>
          <div class="pd-donut-layout">
            <div class="pd-donut-wrap">
              <div class="pd-donut" :style="{ background: statusDonutGradient }">
                <div class="pd-donut-hole">
                  <strong>{{ statusTotal }}</strong>
                  <span>Total</span>
                </div>
              </div>
            </div>
            <ul class="pd-legend">
              <li v-for="seg in statusSegments" :key="seg.label">
                <span class="pd-legend-dot" :style="{ background: seg.color }"></span>
                <span class="pd-legend-label">{{ seg.label }}</span>
                <span class="pd-legend-pct">{{ seg.pct }}%</span>
              </li>
            </ul>
          </div>
        </div>

        <div v-else-if="item.widgetKey === 'activity_trend_quarters'" class="pd-chart-card pd-chart-wide">
          <h3 class="pd-chart-title">Activity Trend (Submissions per Quarter)</h3>
          <div class="pd-bar-chart">
            <div v-for="bar in activityBars" :key="bar.label" class="pd-bar-col">
              <div class="pd-bar-track">
                <div class="pd-bar-fill" :style="{ height: bar.pct + '%' }">
                  <span v-if="bar.isPeak" class="pd-bar-peak">{{ bar.display }}</span>
                </div>
              </div>
              <span class="pd-bar-label">{{ bar.label }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Centers panel -->
    <div
      v-for="item in panelWidgets"
      :key="item.id"
      class="pd-centers-panel"
    >
      <div class="pd-centers-head">
        <h3>{{ centerCount }} Research Centers — Inquiry Breakdown</h3>
      </div>
      <div class="pd-centers-grid">
        <div v-for="c in centerBreakdown" :key="c.slug" class="pd-center-card">
          <span class="pd-center-count">{{ c.count }}</span>
          <span class="pd-center-title">{{ c.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getWidgetDef, STATUS_COLORS } from '@/publicHomepage/widgetRegistry';

const props = defineProps({
  layout: {
    type: Object,
    default: () => ({ kpi: [], charts: [], panel: [] }),
  },
  metrics: {
    type: Object,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const todayFormatted = computed(() =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
);

const updatedLabel = computed(() => {
  if (!props.updatedAt) return 'just now';
  return props.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

const counters = computed(() => props.metrics?.counters || {});

const resolveKpi = (widgetKey) => {
  const def = getWidgetDef(widgetKey);
  if (!def || !def.counterKey) return 0;
  const c = counters.value;
  const key = def.counterKey;
  if (c[key] != null) return c[key];
  // Aliases for older API payloads / alternate keys
  const aliases = {
    partnerships: ['ecosystem_partners'],
    commercialization: ['carousel_slides'],
    extension_projects: ['contact_inquiries'],
  };
  for (const alt of aliases[key] || []) {
    if (c[alt] != null) return c[alt];
  }
  return 0;
};

const kpiWidgets = computed(() =>
  (props.layout?.kpi || [])
    .map((w) => {
      const def = getWidgetDef(w.widgetKey);
      if (!def || !def.allowPublic) return null;
      return { ...w, def, value: resolveKpi(w.widgetKey) };
    })
    .filter(Boolean)
);

const chartWidgets = computed(() =>
  (props.layout?.charts || []).filter((w) => {
    const def = getWidgetDef(w.widgetKey);
    return def && def.allowPublic;
  })
);

const panelWidgets = computed(() =>
  (props.layout?.panel || []).filter((w) => {
    const def = getWidgetDef(w.widgetKey);
    return def && def.allowPublic && w.widgetKey === 'centers_inquiry_breakdown';
  })
);

const statusRaw = computed(() => props.metrics?.breakdowns?.inquiry_status || []);

const statusSegments = computed(() => {
  const source = statusRaw.value;
  if (!source.length) {
    return [{ label: 'No data', count: 0, color: '#94a3b8', pct: 100 }];
  }
  const total = source.reduce((acc, s) => acc + (s.count || 0), 0) || 1;
  return source.map((s) => ({
    label: s.label,
    count: s.count,
    color: STATUS_COLORS[s.label] || '#94a3b8',
    pct: Math.round((s.count / total) * 100),
  }));
});

const statusTotal = computed(() =>
  statusSegments.value.reduce((acc, s) => acc + (s.count || 0), 0)
);

const statusDonutGradient = computed(() => {
  let cursor = 0;
  const parts = statusSegments.value.map((seg, i, arr) => {
    const start = cursor;
    cursor += seg.pct;
    const end = i === arr.length - 1 ? 100 : cursor;
    return `${seg.color} ${start}% ${end}%`;
  });
  return `conic-gradient(${parts.join(', ')})`;
});

const activityBars = computed(() => {
  const quarters = props.metrics?.series?.activity_trend_quarters || [];
  if (!quarters.length) {
    return Array.from({ length: 6 }, (_, i) => ({
      label: `Q${i + 1}`,
      display: '0',
      pct: 8,
      isPeak: false,
    }));
  }
  const max = Math.max(...quarters.map((q) => q.count || 0), 1);
  const peakIdx = quarters.reduce((best, q, idx, arr) =>
    (q.count || 0) > (arr[best].count || 0) ? idx : best, 0);

  return quarters.map((q, idx) => ({
    label: q.label,
    display: String(q.count || 0),
    pct: Math.max(8, Math.round(((q.count || 0) / max) * 100)),
    isPeak: idx === peakIdx && (q.count || 0) > 0,
  }));
});

const DEFAULT_CENTERS = [
  { slug: 'mindoro-development', title: 'Mindoro Development', count: 0 },
  { slug: 'digital-innovation', title: 'Digital Innovation & Cybersecurity', count: 0 },
  { slug: 'environmental-studies', title: 'Environmental Studies', count: 0 },
  { slug: 'fisheries-research', title: 'Fisheries R&D', count: 0 },
  { slug: 'mimaropa-food', title: 'MIMAROPA Food Innovation', count: 0 },
  { slug: 'island-education', title: 'Island Education', count: 0 },
  { slug: 'peace-criminology', title: 'Peace, Criminology & Law', count: 0 },
  { slug: 'smart-agriculture', title: 'Smart Agriculture & Biosystems', count: 0 },
  { slug: 'textile-fiber', title: 'Natural Textile Fiber', count: 0 },
];

const centerBreakdown = computed(() => {
  const rows = props.metrics?.breakdowns?.centers_inquiry;
  if (Array.isArray(rows) && rows.length) return rows;
  return DEFAULT_CENTERS;
});
const centerCount = computed(() => centerBreakdown.value.length || 9);
</script>

<style scoped>
.public-dashboard {
  background: #edf5f2;
  border-radius: 20px;
  padding: 1.5rem 1.35rem 1.75rem;
  border: 1px solid rgba(9, 74, 37, 0.08);
  box-shadow: 0 16px 40px -20px rgba(9, 74, 37, 0.18);
}

.pd-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.pd-title {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #094A25;
}

.pd-tagline {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  color: #64748b;
}

.pd-topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.pd-date {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.45rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
}

.pd-updated {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f766e;
  background: rgba(16, 185, 129, 0.10);
  border: 1px solid rgba(16, 185, 129, 0.18);
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  animation: pd-pulse 2s ease-in-out infinite;
}

@keyframes pd-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pd-metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
  margin-bottom: 1.1rem;
}

.pd-metric-card {
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 16px;
  padding: 1rem 1.1rem;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
}

.pd-metric-head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.65rem;
}

.pd-metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pd-metric-icon.teal { background: rgba(13, 148, 136, 0.12); color: #0d9488; }
.pd-metric-icon.green { background: rgba(9, 74, 37, 0.12); color: #094A25; }
.pd-metric-icon.gold { background: rgba(234, 179, 8, 0.15); color: #ca8a04; }

.pd-metric-icon-svg { display: flex; }

.pd-metric-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #64748b;
  line-height: 1.25;
}

.pd-metric-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.85rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
  margin-bottom: 0.35rem;
}

.pd-metric-sub {
  font-size: 0.78rem;
  color: #94a3b8;
  font-weight: 600;
}

.pd-charts-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 0.9rem;
  margin-bottom: 1.1rem;
}

.pd-chart-card {
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 16px;
  padding: 1.1rem 1.2rem;
}

.pd-chart-wide { min-width: 0; }

.pd-chart-title {
  margin: 0 0 1rem;
  font-size: 0.95rem;
  font-weight: 800;
  color: #053018;
}

.pd-donut-layout {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.pd-donut {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pd-donut-hole {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pd-donut-hole strong {
  font-size: 1.35rem;
  font-weight: 900;
  color: #094A25;
  line-height: 1;
}

.pd-donut-hole span {
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 600;
}

.pd-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
}

.pd-legend li {
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.82rem;
}

.pd-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.pd-legend-label { color: #475569; font-weight: 600; }
.pd-legend-pct { color: #0f172a; font-weight: 800; }

.pd-bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 0.55rem;
  height: 160px;
  padding-top: 0.5rem;
}

.pd-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  height: 100%;
}

.pd-bar-track {
  flex: 1;
  width: 100%;
  max-width: 42px;
  background: #e2e8f0;
  border-radius: 8px 8px 4px 4px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.pd-bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #10b981, #094A25);
  border-radius: 8px 8px 4px 4px;
  position: relative;
  min-height: 8px;
  transition: height 0.3s ease;
}

.pd-bar-peak {
  position: absolute;
  top: -1.25rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: 800;
  color: #094A25;
  white-space: nowrap;
}

.pd-bar-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #64748b;
  text-align: center;
}

.pd-centers-panel {
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 16px;
  padding: 1.15rem 1.25rem 1.35rem;
}

.pd-centers-head {
  margin-bottom: 1rem;
}

.pd-centers-head h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #053018;
}

.pd-centers-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.pd-center-card {
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pd-center-count {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  color: #094A25;
  line-height: 1;
}

.pd-center-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  line-height: 1.3;
}

@media (max-width: 1024px) {
  .pd-metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .pd-charts-row { grid-template-columns: 1fr; }
  .pd-centers-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .pd-metric-grid { grid-template-columns: 1fr; }
  .pd-centers-grid { grid-template-columns: 1fr; }
  .pd-donut-layout { flex-direction: column; align-items: flex-start; }
}
</style>
