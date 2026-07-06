<template>
  <div v-if="visible" class="file-preview-overlay" @click.self="close">
    <div class="file-preview-modal">
      <div class="file-preview-header">
        <h3>{{ fileName || 'Attachment Preview' }}</h3>
        <button type="button" class="file-preview-close" @click="close">✕</button>
      </div>
      <div class="file-preview-body">
        <p v-if="loading" class="file-preview-loading">Loading preview…</p>
        <p v-else-if="error" class="file-preview-error">{{ error }}</p>

        <img v-else-if="isImage" :src="previewBlobUrl || resolvedUrl" :alt="fileName" class="file-preview-image" />

        <iframe
          v-else-if="isPdf || useOfficeEmbed"
          :src="previewSrc"
          class="file-preview-iframe"
          :title="fileName"
        />

        <div v-else-if="docxHtml" class="file-preview-doc" v-html="docxHtml" />

        <div v-else-if="excelHtml" class="file-preview-excel" v-html="excelHtml" />
      </div>
      <div class="file-preview-footer">
        <a :href="resolvedUrl" target="_blank" rel="noopener" class="file-preview-download">Open / Download</a>
        <button type="button" class="file-preview-btn" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { http } from '@/api/http';
import { resolveStorageUrl } from '@/services/mediaService';

const props = defineProps({
  visible: { type: Boolean, default: false },
  filePath: { type: String, default: '' },
  fileName: { type: String, default: '' },
});

const emit = defineEmits(['close']);

const loading = ref(false);
const error = ref('');
const docxHtml = ref('');
const excelHtml = ref('');
const useOfficeEmbed = ref(false);
const previewBlobUrl = ref('');

const resolvedUrl = computed(() => resolveStorageUrl(props.filePath));

const ext = computed(() => {
  const name = props.fileName || props.filePath || '';
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
});

const isImage = computed(() => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext.value));
const isPdf = computed(() => ext.value === 'pdf');
const isDocx = computed(() => ext.value === 'docx');
const isDoc = computed(() => ext.value === 'doc');
const isExcel = computed(() => ['xls', 'xlsx'].includes(ext.value));
const isOfficeDoc = computed(() => isDoc.value || isDocx.value);

const previewSrc = computed(() => {
  if (isPdf.value && previewBlobUrl.value) return previewBlobUrl.value;
  if (isPdf.value) return resolvedUrl.value;
  if (useOfficeEmbed.value) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(resolvedUrl.value)}`;
  }
  return resolvedUrl.value;
});

const revokeBlob = () => {
  if (previewBlobUrl.value) {
    URL.revokeObjectURL(previewBlobUrl.value);
    previewBlobUrl.value = '';
  }
};

const resetPreview = () => {
  loading.value = false;
  error.value = '';
  docxHtml.value = '';
  excelHtml.value = '';
  useOfficeEmbed.value = false;
  revokeBlob();
};

const fetchFileBlob = async () => {
  const response = await http.get('/submissions/attachment/preview', {
    params: { path: props.filePath },
    responseType: 'blob',
  });
  return response.data;
};

const loadPreview = async () => {
  resetPreview();
  if (!props.filePath) return;

  if (isImage.value || isPdf.value) {
    loading.value = true;
    try {
      const blob = await fetchFileBlob();
      previewBlobUrl.value = URL.createObjectURL(blob);
    } catch {
      error.value = 'Failed to load preview. Try Open / Download instead.';
    } finally {
      loading.value = false;
    }
    return;
  }

  loading.value = true;
  try {
    const blob = await fetchFileBlob();
    const arrayBuffer = await blob.arrayBuffer();

    if (isDocx.value) {
      const result = await mammoth.convertToHtml({ arrayBuffer });
      docxHtml.value = result.value || '<p>Document is empty.</p>';
    } else if (isExcel.value) {
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheet];
      excelHtml.value = XLSX.utils.sheet_to_html(sheet, { id: 'preview-sheet' });
    } else if (isDoc.value) {
      useOfficeEmbed.value = true;
    } else {
      error.value = 'Preview is not available for this file type.';
    }
  } catch {
    if (isOfficeDoc.value || isExcel.value) {
      useOfficeEmbed.value = true;
    } else {
      error.value = 'Failed to load preview. Try Open / Download instead.';
    }
  } finally {
    loading.value = false;
  }
};

watch(
  () => [props.visible, props.filePath],
  ([visible, path]) => {
    if (visible && path) loadPreview();
    else resetPreview();
  }
);

onBeforeUnmount(revokeBlob);

const close = () => emit('close');
</script>

<style scoped>
.file-preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.file-preview-modal {
  background: #fff;
  border-radius: 16px;
  width: min(900px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.file-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #094A25;
  color: #fff;
}

.file-preview-header h3 {
  margin: 0;
  font-size: 1rem;
  word-break: break-all;
}

.file-preview-close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
}

.file-preview-body {
  flex: 1;
  overflow: auto;
  padding: 1rem;
  min-height: 300px;
  background: #f8fafc;
}

.file-preview-loading,
.file-preview-error {
  text-align: center;
  color: #64748b;
  padding: 2rem;
}

.file-preview-error {
  color: #b45309;
}

.file-preview-image {
  display: block;
  max-width: 100%;
  max-height: 60vh;
  margin: 0 auto;
  object-fit: contain;
  border-radius: 8px;
}

.file-preview-iframe {
  width: 100%;
  height: 60vh;
  border: none;
  border-radius: 8px;
  background: #fff;
}

.file-preview-doc,
.file-preview-excel {
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem;
  max-height: 60vh;
  overflow: auto;
  font-size: 0.95rem;
  line-height: 1.6;
}

.file-preview-doc :deep(p) {
  margin: 0 0 0.75rem;
}

.file-preview-excel :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.file-preview-excel :deep(td),
.file-preview-excel :deep(th) {
  border: 1px solid #e2e8f0;
  padding: 0.35rem 0.5rem;
}

.file-preview-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid #e2e8f0;
}

.file-preview-download {
  color: #059669;
  font-weight: 700;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

.file-preview-btn {
  background: #094A25;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
}
</style>
