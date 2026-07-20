<template>
  <main class="news-portal">
    <div class="portal-nav">
      <div class="nav-inner">
        <router-link to="/" class="back-btn">← Back</router-link>
        <div class="nav-brand">
          <span class="brand-accent">MinSU RITE</span>
          <span class="brand-divider">|</span>
          <span class="brand-section">News &amp; Updates</span>
        </div>
        <div class="nav-actions">
          <select v-model="selectedCategory" class="filter-select" @change="activeTab = 'latest'">
            <option value="">All categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <input
            v-model="tagQuery"
            type="search"
            class="filter-select"
            placeholder="Filter by tag…"
          />
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading-state">Loading news…</div>

    <div v-else-if="!filteredItems.length" class="empty-state">
      <h2>No news found</h2>
      <p>Try clearing filters or check back later.</p>
    </div>

    <div v-else class="portal-content">
      <section v-if="heroNews" class="hero-section">
        <article class="hero-main" @click="viewNews(heroNews)">
          <div class="hero-image">
            <img v-if="heroNews.image" :src="img(heroNews.image)" :alt="heroNews.title" />
            <div v-else class="hero-placeholder">No image</div>
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <span class="hero-category">{{ heroNews.category || 'News' }}</span>
              <h1 class="hero-title">{{ heroNews.title }}</h1>
              <p class="hero-excerpt">{{ excerpt(heroNews.description) }}</p>
              <div class="hero-meta">
                <span>{{ heroNews.date || '—' }}</span>
              </div>
            </div>
          </div>
        </article>

        <aside class="hero-sidebar">
          <article
            v-for="item in sidebarItems"
            :key="item.id"
            class="sidebar-item"
            @click="viewNews(item)"
          >
            <div class="sidebar-thumb">
              <img v-if="item.image" :src="img(item.image)" :alt="item.title" />
              <div v-else class="thumb-placeholder">News</div>
            </div>
            <div class="sidebar-info">
              <span class="sidebar-category">{{ item.category || 'News' }}</span>
              <h3 class="sidebar-title">{{ item.title }}</h3>
              <span class="sidebar-date">{{ item.date || '—' }}</span>
            </div>
          </article>
        </aside>
      </section>

      <div class="tabs-section">
        <div class="section-bar">
          <div class="tabs-wrapper">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              type="button"
              :class="['tab-item', { active: activeTab === tab.value }]"
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>

      <section class="news-section">
        <div class="section-header">
          <h2>{{ sectionTitle }}</h2>
        </div>
        <div class="news-grid">
          <article
            v-for="item in gridItems"
            :key="item.id"
            class="news-card"
            @click="viewNews(item)"
          >
            <div class="card-image">
              <img v-if="item.image" :src="img(item.image)" :alt="item.title" loading="lazy" />
              <div v-else class="card-placeholder">No image</div>
              <span class="card-badge">{{ item.category || 'News' }}</span>
            </div>
            <div class="card-body">
              <span class="card-date">{{ item.date || '—' }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ excerpt(item.description) }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { newsService } from '@/services/newsService';
import { resolveStorageUrl } from '@/services/mediaService';

const router = useRouter();
const loading = ref(true);
const items = ref([]);
const selectedCategory = ref('');
const tagQuery = ref('');
const activeTab = ref('latest');

const tabs = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

const img = (path) => resolveStorageUrl(path);

const excerpt = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html || '';
  const text = (div.textContent || '').trim();
  return text.length > 140 ? `${text.slice(0, 140)}…` : text;
};

const parseDate = (item) => {
  if (item?.created_at) {
    const d = new Date(item.created_at);
    if (!Number.isNaN(d.getTime())) return d.getTime();
  }
  if (item?.date) {
    const d = new Date(item.date);
    if (!Number.isNaN(d.getTime())) return d.getTime();
  }
  return 0;
};

const categories = computed(() => {
  const set = new Set(items.value.map((i) => i.category).filter(Boolean));
  return [...set].sort();
});

const filteredItems = computed(() => {
  let list = [...items.value];
  if (selectedCategory.value) {
    list = list.filter((i) => i.category === selectedCategory.value);
  }
  const q = tagQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter((i) => String(i.tags || '').toLowerCase().includes(q));
  }
  list.sort((a, b) => {
    const diff = parseDate(b) - parseDate(a);
    return activeTab.value === 'oldest' ? -diff : diff;
  });
  return list;
});

const heroNews = computed(() => filteredItems.value[0] || null);
const sidebarItems = computed(() => filteredItems.value.slice(1, 5));
const gridItems = computed(() => filteredItems.value.slice(5));

const sectionTitle = computed(() =>
  activeTab.value === 'oldest' ? 'Archives' : 'Latest News'
);

const viewNews = (item) => {
  if (!item?.id) return;
  router.push({ name: 'NewsDetail', params: { id: item.id } });
};

onMounted(async () => {
  try {
    items.value = await newsService.getAll();
  } catch {
    items.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.news-portal {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.portal-nav {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-btn {
  color: #094A25;
  font-weight: 700;
  text-decoration: none;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  flex: 1;
}

.brand-accent { color: #094A25; }
.brand-divider { color: #cbd5e1; }
.brand-section { color: #334155; }

.nav-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.45rem 0.65rem;
  font-size: 0.85rem;
  background: #fff;
  min-width: 140px;
}

.portal-content {
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
}

.loading-state,
.empty-state {
  max-width: 720px;
  margin: 4rem auto;
  text-align: center;
  color: #64748b;
}

.hero-section {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.hero-main {
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  min-height: 360px;
  background: #0f172a;
}

.hero-image {
  position: relative;
  height: 100%;
  min-height: 360px;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-placeholder,
.card-placeholder,
.thumb-placeholder {
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  color: #94a3b8;
  font-weight: 700;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 20%, rgba(15, 23, 42, 0.88) 100%);
}

.hero-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
  color: #fff;
}

.hero-category,
.card-badge,
.sidebar-category {
  display: inline-block;
  background: #094A25;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  margin-bottom: 0.55rem;
}

.hero-title {
  margin: 0 0 0.5rem;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  line-height: 1.2;
}

.hero-excerpt {
  margin: 0 0 0.65rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}

.hero-meta {
  font-size: 0.8rem;
  opacity: 0.85;
}

.hero-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.sidebar-item {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.55rem;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.sidebar-item:hover {
  border-color: rgba(9, 74, 37, 0.35);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.sidebar-thumb {
  border-radius: 8px;
  overflow: hidden;
  height: 72px;
  background: #e2e8f0;
}

.sidebar-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sidebar-title {
  margin: 0 0 0.35rem;
  font-size: 0.88rem;
  line-height: 1.3;
  color: #0f172a;
}

.sidebar-date {
  font-size: 0.75rem;
  color: #94a3b8;
}

.tabs-section {
  margin-bottom: 1.25rem;
}

.section-bar {
  border-bottom: 1px solid #e2e8f0;
}

.tabs-wrapper {
  display: flex;
  gap: 1.25rem;
}

.tab-item {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.75rem 0;
  font-weight: 800;
  color: #64748b;
  cursor: pointer;
}

.tab-item.active {
  color: #094A25;
  border-bottom-color: #094A25;
}

.section-header h2 {
  margin: 0 0 1rem;
  font-family: 'Outfit', sans-serif;
  color: #0f172a;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.news-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.card-image {
  position: relative;
  height: 170px;
  background: #e2e8f0;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-badge {
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
}

.card-body {
  padding: 0.9rem 1rem 1.1rem;
}

.card-date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

.card-body h3 {
  margin: 0.35rem 0;
  font-size: 1rem;
  color: #0f172a;
  line-height: 1.35;
}

.card-body p {
  margin: 0;
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .hero-section { grid-template-columns: 1fr; }
  .news-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .news-grid { grid-template-columns: 1fr; }
}
</style>
