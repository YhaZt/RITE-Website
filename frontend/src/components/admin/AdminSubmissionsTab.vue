<template>
  <div class="tab-content">
    <div class="content-header" style="display:flex; flex-direction:column; align-items:flex-start; gap:1rem;">
      <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
        <h2>Submissions &amp; Inquiries Console ({{ filteredCount }})</h2>
      </div>

      <!-- PRIMARY UNIT TABS -->
      <div class="unit-filter-tabs" style="display:flex; gap:0.5rem; flex-wrap:wrap; width:100%; border-bottom:2px solid #e2e8f0; padding-bottom:0.75rem;">
        <button
          :class="['unit-tab-btn', { active: filter === 'all' }]"
          style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
          :style="filter === 'all' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
          @click="$emit('update:filter', 'all')"
        >
          All Submissions ({{ totalCount }})
        </button>
        <button
          :class="['unit-tab-btn', { active: filter === 'publication-printing' }]"
          style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
          :style="filter === 'publication-printing' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
          @click="$emit('update:filter', 'publication-printing')"
        >
          Publication &amp; Printing Unit ({{ pubPrintingCount }})
        </button>
        <button
          :class="['unit-tab-btn', { active: filter === 'research-unit' }]"
          style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
          :style="filter === 'research-unit' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
          @click="$emit('update:filter', 'research-unit')"
        >
          Research Unit ({{ researchUnitCount }})
        </button>
        <button
          :class="['unit-tab-btn', { active: filter === 'tech-transfer' }]"
          style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
          :style="filter === 'tech-transfer' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
          @click="$emit('update:filter', 'tech-transfer')"
        >
          Tech Transfer &amp; Patent ({{ techTransferCount }})
        </button>
        <button
          :class="['unit-tab-btn', { active: filter === 'centers' || filter.startsWith('center:') }]"
          style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
          :style="filter === 'centers' || filter.startsWith('center:') ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
          @click="$emit('update:filter', 'centers')"
        >
          All 9 Centers ({{ centerCount }})
        </button>
      </div>

      <!-- SECONDARY SUB-TABS FOR EACH SPECIFIC CENTER -->
      <div v-if="filter === 'centers' || filter.startsWith('center:')" class="centers-sub-pills-bar" style="display:flex; gap:0.4rem; flex-wrap:wrap; background:#f8fafc; padding:0.75rem 1rem; border-radius:14px; border:1px solid #e2e8f0; width:100%;">
        <span style="font-weight:800; font-size:0.82rem; color:#094A25; display:flex; align-items:center; margin-right:0.5rem;">Filter Each Center:</span>
        <button
          v-for="c in centerCountsList"
          :key="c.slug"
          style="padding:0.35rem 0.85rem; border-radius:8px; font-weight:700; font-size:0.78rem; border:1px solid #cbd5e1; cursor:pointer; transition:all 0.2s ease;"
          :style="filter === 'center:' + c.slug ? 'background:#8b5cf6; color:#ffffff; border-color:#8b5cf6;' : 'background:#ffffff; color:#334155;'"
          @click="$emit('update:filter', 'center:' + c.slug)"
        >
          {{ c.title }} ({{ c.count }})
        </button>
      </div>
    </div>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Target Unit</th>
            <th>Sender / Email</th>
            <th>Subject / Purpose</th>
            <th>Details &amp; File Attachment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sub in items" :key="sub.id">
            <td><span class="tag-badge green">{{ sub.target_unit }}</span></td>
            <td>
              <div class="font-bold">{{ sub.sender_name }}</div>
              <div style="font-size:0.8rem; color:#64748b;">{{ sub.email }} | {{ sub.phone || 'No phone' }}</div>
            </td>
            <td class="font-bold">{{ sub.subject }}</td>
            <td>
              <div class="html-snippet" style="max-width:200px;">{{ sub.message }}</div>
              <div v-if="sub.file_path" style="margin-top:0.4rem;">
                <button type="button" class="btn-link-preview" @click="$emit('preview-file', sub)">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:4px; vertical-align:middle;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Preview {{ sub.file_name || 'Attachment' }}
                </button>
              </div>
              <span v-else style="font-size:0.75rem; color:#94a3b8;">No file attached</span>
            </td>
            <td>
              <span class="tag-badge" :class="statusBadgeClass(sub.status)">
                {{ statusLabel(sub.status) }}
              </span>
            </td>
            <td class="actions">
              <button class="btn-sm edit" type="button" @click="$emit('update-status', sub)">Update Status</button>
              <button class="btn-sm delete" type="button" @click="$emit('archive', sub.id)">Archive</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="totalPages > 1" class="admin-pagination">
        <button :disabled="page === 1" class="btn-sm page-btn" type="button" @click="$emit('update:page', page - 1)">← Prev</button>
        <span class="admin-page-info">Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page === totalPages" class="btn-sm page-btn" type="button" @click="$emit('update:page', page + 1)">Next →</button>
      </div>
    </div>

    <!-- SUBMISSION STATUS WORKFLOW MODAL -->
    <div v-if="showStatusModal" class="modal-overlay" @click.self="$emit('close-status')">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Update Submission Status</h3>
          <button class="modal-close" type="button" @click="$emit('close-status')">✕</button>
        </div>
        <form @submit.prevent="$emit('submit-status')" class="modal-form">
          <div v-if="statusTarget" class="status-summary">
            <p><strong>Sender:</strong> {{ statusTarget.sender_name }} ({{ statusTarget.email }})</p>
            <p><strong>Subject:</strong> {{ statusTarget.subject }}</p>
            <p><strong>Unit:</strong> {{ statusTarget.target_unit }}</p>
            <p>
              <strong>Current status:</strong>
              <span class="tag-badge" :class="statusBadgeClass(statusTarget.status)">
                {{ statusLabel(statusTarget.status) }}
              </span>
            </p>
          </div>
          <div class="form-group">
            <label>New Status</label>
            <select
              :value="statusForm.newStatus"
              required
              style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;"
              @change="$emit('update:status-field', { field: 'newStatus', value: $event.target.value })"
            >
              <option v-for="opt in statuses" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Message to Sender <span style="color:#dc2626;">*</span></label>
            <textarea
              :value="statusForm.adminNote"
              rows="4"
              required
              placeholder="Write an update or comment that will be emailed to the sender..."
              style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;"
              @input="$emit('update:status-field', { field: 'adminNote', value: $event.target.value })"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="$emit('close-status')">Cancel</button>
            <button type="submit" class="btn-primary">Send Update &amp; Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filter: { type: String, required: true },
  filteredCount: { type: Number, required: true },
  totalCount: { type: Number, required: true },
  pubPrintingCount: { type: Number, required: true },
  researchUnitCount: { type: Number, required: true },
  techTransferCount: { type: Number, required: true },
  centerCount: { type: Number, required: true },
  centerCountsList: { type: Array, required: true },
  items: { type: Array, required: true },
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  showStatusModal: { type: Boolean, default: false },
  statusTarget: { type: Object, default: null },
  statusForm: { type: Object, required: true },
  statuses: { type: Array, required: true },
  statusLabel: { type: Function, required: true },
  statusBadgeClass: { type: Function, required: true },
});

defineEmits([
  'update:filter',
  'update:page',
  'preview-file',
  'update-status',
  'archive',
  'close-status',
  'submit-status',
  'update:status-field',
]);
</script>

<style scoped>
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.table-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th, .data-table td { padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }
.data-table th { background: #f8fafc; color: #475569; font-size: 0.85rem; text-transform: uppercase; }
.tag-badge { background: #e2e8f0; color: #334155; padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; }
.tag-badge.green { background: #dcfce7; color: #166534; }
.tag-badge.purple { background: #f3e8ff; color: #6b21a8; }
.tag-badge.blue { background: #dbeafe; color: #1e40af; }
.tag-badge.red { background: #fee2e2; color: #b91c1c; }
.tag-badge.gold { background: #fef3c7; color: #b45309; }
.font-bold { font-weight: 700; }
.html-snippet { max-width: 250px; max-height: 60px; overflow: hidden; font-size: 0.8rem; opacity: 0.8; }
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
.btn-sm.edit { background: #fef3c7; color: #92400e; }
.btn-sm.delete { background: #fee2e2; color: #991b1b; }
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
.btn-link-preview { background: none; border: none; color: #059669; font-weight: 700; font-size: 0.85rem; text-decoration: underline; cursor: pointer; padding: 0; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15,23,42,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: #fff; width: 100%; max-width: 650px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
.status-summary { background: #f8fafc; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; font-size: 0.9rem; }
.status-summary p { margin: 0.35rem 0; }
.modal-header { padding: 1.25rem 1.5rem; background: #094A25; color: #fff; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 1.15rem; }
.modal-close { background: transparent; border: none; color: #fff; font-size: 1.2rem; cursor: pointer; }
.modal-form { padding: 1.5rem; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; margin-bottom: 0.4rem; font-weight: 700; color: #334155; font-size: 0.85rem; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }
.btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
.btn-primary { background: #094A25; color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
</style>
