<template>
  <div class="manage-homepage">
    <div class="mh-header">
      <div>
        <h2>Manage Public Homepage</h2>
        <p>Drag widgets to reorder. Toggle visibility for the public site. Admin Overview always shows all admin data.</p>
      </div>
      <div class="mh-actions">
        <button type="button" class="btn-secondary" @click="resetDefault" :disabled="saving">Reset defaults</button>
        <button type="button" class="btn-primary" @click="save" :disabled="saving">
          {{ saving ? 'Saving…' : 'Save Layout' }}
        </button>
      </div>
    </div>

    <p v-if="message" class="mh-message" :class="{ error: messageError }">{{ message }}</p>

    <div class="mh-grid">
      <section class="mh-area" v-for="area in areas" :key="area.key">
        <div class="mh-area-head">
          <h3>{{ area.title }}</h3>
          <select v-model="addSelect[area.key]" class="mh-add-select">
            <option value="">+ Add widget…</option>
            <option
              v-for="opt in availableFor(area.key)"
              :key="opt.widgetKey"
              :value="opt.widgetKey"
            >
              {{ opt.adminLabel }}{{ opt.allowPublic ? '' : ' (admin only)' }}
            </option>
          </select>
          <button
            type="button"
            class="btn-sm"
            @click="addWidget(area.key)"
          >
            Add
          </button>
        </div>

        <draggable
          v-model="layout[area.key]"
          item-key="id"
          handle=".mh-drag-handle"
          class="mh-list"
          :animation="180"
        >
          <template #item="{ element, index }">
            <div class="mh-item" :class="{ 'mh-item--private': !element.isPublic }">
              <button type="button" class="mh-drag-handle" title="Drag to reorder" aria-label="Drag">
                ⋮⋮
              </button>
              <div class="mh-item-body">
                <strong>{{ labelFor(element.widgetKey) }}</strong>
                <span class="mh-item-key">{{ element.widgetKey }}</span>
              </div>
              <label class="mh-toggle" :title="canBePublic(element.widgetKey) ? '' : 'This widget cannot be shown publicly'">
                <input
                  type="checkbox"
                  :checked="element.isPublic"
                  :disabled="!canBePublic(element.widgetKey)"
                  @change="togglePublic(area.key, index, $event.target.checked)"
                />
                <span>Visible on public</span>
              </label>
              <button type="button" class="btn-sm delete" @click="removeWidget(area.key, index)">Remove</button>
            </div>
          </template>
        </draggable>

        <p v-if="!layout[area.key]?.length" class="mh-empty">No widgets in this area. Add one from the dropdown.</p>
      </section>
    </div>

    <div class="mh-preview-note">
      <strong>Preview tip:</strong> Open the public site after saving. Only widgets with “Visible on public” appear there.
      External Funding is never available for the public homepage.
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import { homepageLayoutService } from '@/services/homepageLayoutService';
import {
  defaultLayout,
  getWidgetDef,
  makeWidgetInstance,
  widgetsForArea,
} from '@/publicHomepage/widgetRegistry';

const areas = [
  { key: 'kpi', title: 'KPI Cards' },
  { key: 'charts', title: 'Charts' },
  { key: 'panel', title: 'Bottom Panel' },
];

const layout = reactive({
  kpi: [],
  charts: [],
  panel: [],
});

const addSelect = reactive({ kpi: '', charts: '', panel: '' });
const saving = ref(false);
const message = ref('');
const messageError = ref(false);

const labelFor = (key) => getWidgetDef(key)?.adminLabel || key;
const canBePublic = (key) => !!getWidgetDef(key)?.allowPublic;

const availableFor = (area) => {
  // Always list all widgets for the area so Add always has options
  // (duplicates allowed if admin wants the same metric twice)
  return widgetsForArea(area);
};

const applyLayout = (data) => {
  layout.kpi = Array.isArray(data?.kpi) ? data.kpi.map((w) => ({ ...w })) : [];
  layout.charts = Array.isArray(data?.charts) ? data.charts.map((w) => ({ ...w })) : [];
  layout.panel = Array.isArray(data?.panel) ? data.panel.map((w) => ({ ...w })) : [];
  // Force non-public widgets off
  ['kpi', 'charts', 'panel'].forEach((area) => {
    layout[area].forEach((w) => {
      if (!canBePublic(w.widgetKey)) w.isPublic = false;
    });
  });
};

onMounted(async () => {
  try {
    const data = await homepageLayoutService.getAdminLayout();
    applyLayout(data);
  } catch {
    applyLayout(defaultLayout());
  }
});

const addWidget = (area) => {
  const key = addSelect[area];
  if (!key) {
    message.value = 'Select a widget from the dropdown, then click Add.';
    messageError.value = true;
    return;
  }
  layout[area].push(makeWidgetInstance(key));
  addSelect[area] = '';
  message.value = '';
  messageError.value = false;
};

const removeWidget = (area, index) => {
  layout[area].splice(index, 1);
};

const togglePublic = (area, index, checked) => {
  const w = layout[area][index];
  if (!w) return;
  if (!canBePublic(w.widgetKey)) {
    w.isPublic = false;
    return;
  }
  w.isPublic = !!checked;
};

const resetDefault = () => {
  if (!confirm('Reset to the default public-safe layout?')) return;
  applyLayout(defaultLayout());
  message.value = 'Defaults loaded — click Save Layout to persist.';
  messageError.value = false;
};

const save = async () => {
  saving.value = true;
  message.value = '';
  try {
    const payload = {
      kpi: layout.kpi.map((w) => ({
        id: w.id,
        widgetKey: w.widgetKey,
        isPublic: canBePublic(w.widgetKey) ? !!w.isPublic : false,
      })),
      charts: layout.charts.map((w) => ({
        id: w.id,
        widgetKey: w.widgetKey,
        isPublic: canBePublic(w.widgetKey) ? !!w.isPublic : false,
      })),
      panel: layout.panel.map((w) => ({
        id: w.id,
        widgetKey: w.widgetKey,
        isPublic: canBePublic(w.widgetKey) ? !!w.isPublic : false,
      })),
    };
    await homepageLayoutService.saveAdminLayout(payload);
    message.value = 'Public homepage layout saved.';
    messageError.value = false;
  } catch {
    message.value = 'Failed to save layout.';
    messageError.value = true;
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.manage-homepage {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mh-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.mh-header h2 {
  margin: 0 0 0.35rem;
  font-family: 'Outfit', sans-serif;
  color: #0f172a;
}

.mh-header p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  max-width: 560px;
}

.mh-actions {
  display: flex;
  gap: 0.6rem;
}

.btn-primary {
  background: #094A25;
  color: #fff;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-secondary {
  background: #fff;
  color: #094A25;
  border: 1px solid #cbd5e1;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.btn-sm {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.35rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  color: #334155;
}

.btn-sm.delete {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
  color: #dc2626;
}

.mh-message {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #065f46;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
}

.mh-message.error {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.3);
  color: #b91c1c;
}

.mh-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.mh-area {
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 14px;
  padding: 1.1rem 1.2rem;
}

.mh-area-head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}

.mh-area-head h3 {
  margin: 0;
  flex: 1;
  font-size: 1rem;
  color: #053018;
}

.mh-add-select {
  padding: 0.4rem 0.6rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.85rem;
  min-width: 200px;
}

.mh-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 48px;
}

.mh-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 10px;
  padding: 0.65rem 0.75rem;
}

.mh-item--private {
  opacity: 0.72;
  border-style: dashed;
}

.mh-drag-handle {
  background: transparent;
  border: none;
  cursor: grab;
  color: #94a3b8;
  font-size: 1rem;
  letter-spacing: -2px;
  padding: 0.25rem;
  line-height: 1;
}

.mh-drag-handle:active { cursor: grabbing; }

.mh-item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.mh-item-body strong {
  font-size: 0.9rem;
  color: #0f172a;
}

.mh-item-key {
  font-size: 0.72rem;
  color: #94a3b8;
  font-family: ui-monospace, monospace;
}

.mh-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  white-space: nowrap;
  cursor: pointer;
}

.mh-empty {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: #94a3b8;
}

.mh-preview-note {
  font-size: 0.85rem;
  color: #64748b;
  background: rgba(9, 74, 37, 0.05);
  border-radius: 10px;
  padding: 0.85rem 1rem;
}
</style>
