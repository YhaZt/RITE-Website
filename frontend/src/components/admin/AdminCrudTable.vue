<template>
  <div class="tab-content">
    <div class="content-header" :style="headerStyle">
      <slot name="header-content">
        <h2>{{ title }}</h2>
        <slot name="actions">
          <button v-if="addLabel" class="btn-primary" type="button" @click="$emit('add')">{{ addLabel }}</button>
        </slot>
      </slot>
    </div>
    <div v-if="loading" class="admin-state admin-state-loading" role="status" aria-live="polite">
      Loading…
    </div>
    <div v-else-if="empty" class="admin-state admin-state-empty" role="status">
      <p>{{ emptyMessage }}</p>
      <button v-if="addLabel" class="btn-primary" type="button" @click="$emit('add')">{{ addLabel }}</button>
    </div>
    <div v-else class="table-card">
      <table class="data-table">
        <thead>
          <slot name="columns" />
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
      <div v-if="totalPages > 1" class="admin-pagination">
        <button :disabled="page === 1" class="btn-sm page-btn" type="button" @click="$emit('update:page', page - 1)">← Prev</button>
        <span class="admin-page-info">Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page === totalPages" class="btn-sm page-btn" type="button" @click="$emit('update:page', page + 1)">Next →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  addLabel: { type: String, default: '' },
  page: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  headerStyle: { type: [String, Object], default: null },
  loading: { type: Boolean, default: false },
  empty: { type: Boolean, default: false },
  emptyMessage: { type: String, default: 'No records yet.' },
});

defineEmits(['add', 'update:page']);
</script>

<style scoped>
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.table-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table :deep(th), .data-table :deep(td) { padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }
.data-table :deep(th) { background: #f8fafc; color: #475569; font-size: 0.85rem; text-transform: uppercase; }
:deep(.tag-badge) { background: #e2e8f0; color: #334155; padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; }
:deep(.tag-badge.green) { background: #dcfce7; color: #166534; }
:deep(.tag-badge.purple) { background: #f3e8ff; color: #6b21a8; }
:deep(.tag-badge.blue) { background: #dbeafe; color: #1e40af; }
:deep(.tag-badge.red) { background: #fee2e2; color: #b91c1c; }
:deep(.tag-badge.gold) { background: #fef3c7; color: #b45309; }
:deep(.font-bold) { font-weight: 700; }
:deep(.html-snippet) { max-width: 250px; max-height: 60px; overflow: hidden; font-size: 0.8rem; opacity: 0.8; }
:deep(.table-img) { width: 50px; height: 35px; object-fit: cover; border-radius: 4px; }
:deep(.table-link) { color: #094A25; }
:deep(.actions) { white-space: nowrap; }
.btn-primary { background: #094A25; color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
.btn-sm {
  padding: 6px 0.7rem;
  border-radius: 6px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 0.4rem;
  width: 110px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  vertical-align: bottom;
  white-space: nowrap;
}
:deep(.btn-sm) {
  padding: 6px 0.7rem;
  border-radius: 6px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  margin-right: 0.4rem;
  width: 110px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  vertical-align: bottom;
  white-space: nowrap;
}
:deep(.btn-sm.edit) { background: #fef3c7; color: #92400e; }
:deep(.btn-sm.delete) { background: #fee2e2; color: #991b1b; }

.admin-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
}

.admin-page-info {
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
}

.admin-state {
  background: #fff;
  border-radius: 12px;
  padding: 3rem 1.5rem;
  text-align: center;
  color: #475569;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

.admin-state-loading {
  font-weight: 600;
  color: #0b7f47;
}

.admin-state-empty p {
  margin: 0 0 1rem;
}

.admin-state-empty .btn-primary {
  margin-top: 0.5rem;
}
</style>
