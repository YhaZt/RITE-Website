<template>
  <main class="news-detail-portal">
    <div class="detail-nav">
      <div class="nav-inner">
        <button type="button" class="back-btn" @click="goBack">← Back</button>
        <div class="nav-breadcrumb">
          <router-link to="/">Home</router-link>
          <span>/</span>
          <router-link to="/news">News</router-link>
          <span>/</span>
          <span class="current">{{ truncate(news?.title, 40) }}</span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="state-box">Loading article…</div>
    <div v-else-if="error" class="state-box">
      <h2>Article not found</h2>
      <p>{{ error }}</p>
      <router-link to="/news" class="btn-primary">Browse all news</router-link>
    </div>

    <div v-else-if="news" class="article-layout">
      <article class="main-article">
        <header class="article-header">
          <div class="header-meta">
            <span class="category-badge">{{ news.category || 'News' }}</span>
            <span class="publish-date">{{ news.date || '—' }}</span>
          </div>
          <h1 class="article-title">{{ news.title }}</h1>
          <div v-if="tagList.length" class="tags-row">
            <span v-for="tag in tagList" :key="tag" class="tag-chip">{{ tag }}</span>
          </div>
        </header>

        <div v-if="news.image" class="featured-image">
          <img :src="img(news.image)" :alt="news.title" />
        </div>

        <div class="article-body" v-html="news.description"></div>

        <div v-if="news.link" class="external-link">
          <a :href="news.link" target="_blank" rel="noopener noreferrer">Open external link →</a>
        </div>
      </article>

      <aside class="related-sidebar">
        <h3>More stories</h3>
        <article
          v-for="item in related"
          :key="item.id"
          class="related-item"
          @click="$router.push(`/news/${item.id}`)"
        >
          <div class="related-thumb">
            <img v-if="item.image" :src="img(item.image)" :alt="item.title" />
            <div v-else class="thumb-ph">News</div>
          </div>
          <div>
            <span class="related-cat">{{ item.category || 'News' }}</span>
            <h4>{{ item.title }}</h4>
            <span class="related-date">{{ item.date || '—' }}</span>
          </div>
        </article>
      </aside>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { newsService } from '@/services/newsService';
import { resolveStorageUrl } from '@/services/mediaService';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const error = ref('');
const news = ref(null);
const allNews = ref([]);

const img = (path) => resolveStorageUrl(path);
const truncate = (text, n) => {
  const t = text || '';
  return t.length > n ? `${t.slice(0, n)}…` : t;
};

const tagList = computed(() =>
  String(news.value?.tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
);

const related = computed(() =>
  allNews.value.filter((i) => i.id !== news.value?.id).slice(0, 5)
);

const goBack = () => {
  if (window.history.length > 1) router.back();
  else router.push('/news');
};

const load = async () => {
  loading.value = true;
  error.value = '';
  news.value = null;
  try {
    const id = route.params.id;
    const [item, list] = await Promise.all([
      newsService.get(id),
      newsService.getAll().catch(() => []),
    ]);
    news.value = item;
    allNews.value = list;
  } catch {
    error.value = 'This news article could not be loaded.';
  } finally {
    loading.value = false;
  }
};

onMounted(load);
watch(() => route.params.id, load);
</script>

<style scoped>
.news-detail-portal {
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.detail-nav {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 20;
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.back-btn {
  border: none;
  background: transparent;
  color: #094A25;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.nav-breadcrumb {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: #94a3b8;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.nav-breadcrumb a {
  color: #094A25;
  text-decoration: none;
  font-weight: 600;
}

.current { color: #334155; }

.state-box {
  max-width: 640px;
  margin: 4rem auto;
  text-align: center;
  color: #64748b;
}

.btn-primary {
  display: inline-block;
  margin-top: 1rem;
  background: #094A25;
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1.1rem;
  border-radius: 8px;
  font-weight: 700;
}

.article-layout {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
  display: grid;
  grid-template-columns: 1.7fr 0.9fr;
  gap: 1.5rem;
  align-items: start;
}

.main-article {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem 1.6rem 2rem;
}

.header-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.category-badge {
  background: #094A25;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
}

.publish-date {
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 600;
}

.article-title {
  margin: 0 0 0.85rem;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1.2;
  color: #0f172a;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.tag-chip {
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  color: #475569;
  font-weight: 600;
}

.featured-image {
  margin: 0 0 1.25rem;
  border-radius: 12px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  display: block;
  max-height: 420px;
  object-fit: cover;
}

.article-body {
  color: #334155;
  line-height: 1.75;
  font-size: 1.02rem;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.article-body :deep(.news-figure) {
  margin: 1.25rem 0;
}

.article-body :deep(.news-figure--left) {
  float: left;
  width: 46%;
  margin: 0.35rem 1.25rem 0.85rem 0;
}

.article-body :deep(.news-figure--right) {
  float: right;
  width: 46%;
  margin: 0.35rem 0 0.85rem 1.25rem;
}

.article-body :deep(.news-gallery) {
  display: grid;
  gap: 0.65rem;
  margin: 1.25rem 0;
  clear: both;
}

.article-body :deep(.news-gallery--cols-2) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.article-body :deep(.news-gallery--cols-3) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.article-body :deep(.news-gallery--cols-4) { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.article-body :deep(.news-gallery img) {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.external-link {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.external-link a {
  color: #094A25;
  font-weight: 700;
}

.related-sidebar {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.1rem;
}

.related-sidebar h3 {
  margin: 0 0 0.85rem;
  font-family: 'Outfit', sans-serif;
  color: #0f172a;
}

.related-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 0.7rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
}

.related-item:last-child { border-bottom: none; }

.related-thumb {
  width: 72px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #e2e8f0;
}

.related-thumb img,
.thumb-ph {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-ph {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #94a3b8;
  font-weight: 700;
}

.related-cat {
  display: block;
  font-size: 0.68rem;
  font-weight: 800;
  color: #094A25;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.related-item h4 {
  margin: 0 0 0.25rem;
  font-size: 0.88rem;
  line-height: 1.3;
  color: #0f172a;
}

.related-date {
  font-size: 0.72rem;
  color: #94a3b8;
}

@media (max-width: 900px) {
  .article-layout { grid-template-columns: 1fr; }
}
</style>
