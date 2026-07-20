<template>
  <div class="image-upload-field">
    <div
      class="dropzone"
      :class="{ 'dropzone--active': isDragging, 'dropzone--has-image': previewUrl }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      @click="triggerBrowse"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        class="dropzone-input"
        @change="onFileSelect"
      />
      <div v-if="previewUrl" class="dropzone-preview">
        <img :src="previewUrl" alt="Preview" />
        <button type="button" class="dropzone-clear" @click.stop="clearImage">✕</button>
      </div>
      <div v-else class="dropzone-placeholder">
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="#94a3b8" stroke-width="1.5" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p><strong>Drop image here</strong> or click to browse</p>
        <span>JPEG, PNG, WebP, GIF — saved as WebP (any size; auto-resized)</span>
      </div>
      <div v-if="uploading" class="dropzone-loading">Uploading…</div>
    </div>
    <div v-if="presetUrls?.length" class="preset-chips">
      <span class="preset-label">Quick picks:</span>
      <button
        v-for="url in presetUrls"
        :key="url"
        type="button"
        class="preset-chip"
        @click="selectPreset(url)"
      >
        <img :src="resolveUrl(url)" :alt="url" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { mediaService, resolveStorageUrl } from '@/services/mediaService';

const props = defineProps({
  modelValue: { type: String, default: '' },
  presetUrls: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const isDragging = ref(false);
const uploading = ref(false);
const previewUrl = ref('');
const objectUrl = ref('');

const resolveUrl = (url) => resolveStorageUrl(url);

watch(
  () => props.modelValue,
  (val) => {
    if (!objectUrl.value) {
      previewUrl.value = val ? resolveStorageUrl(val) : '';
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value);
});

const triggerBrowse = () => fileInput.value?.click();

const handleFile = async (file) => {
  if (!file || !file.type.startsWith('image/')) return;
  // No client size hard-block — server resizes + converts to WebP (max 50 MB)

  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value);
  objectUrl.value = URL.createObjectURL(file);
  previewUrl.value = objectUrl.value;

  uploading.value = true;
  try {
    const { url } = await mediaService.uploadImage(file);
    emit('update:modelValue', url);
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value);
      objectUrl.value = '';
    }
    previewUrl.value = resolveStorageUrl(url);
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      (err?.response?.status === 413 ? 'Image is too large for the server.' : null) ||
      'Failed to upload image.';
    alert(msg);
    previewUrl.value = props.modelValue ? resolveStorageUrl(props.modelValue) : '';
  } finally {
    uploading.value = false;
  }
};

const onFileSelect = (e) => {
  const file = e.target.files?.[0];
  if (file) handleFile(file);
  e.target.value = '';
};

const onDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files?.[0];
  if (file) handleFile(file);
};

const selectPreset = (url) => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = '';
  }
  emit('update:modelValue', url);
  previewUrl.value = resolveStorageUrl(url);
};

const clearImage = () => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = '';
  }
  previewUrl.value = '';
  emit('update:modelValue', '');
};
</script>

<style scoped>
.image-upload-field {
  width: 100%;
}

.dropzone {
  position: relative;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #f8fafc;
  transition: border-color 0.2s, background 0.2s;
  overflow: hidden;
}

.dropzone--active {
  border-color: #059669;
  background: rgba(16, 185, 129, 0.05);
}

.dropzone--has-image {
  border-style: solid;
  min-height: 180px;
}

.dropzone-input {
  display: none;
}

.dropzone-placeholder {
  text-align: center;
  padding: 1.5rem;
  color: #64748b;
}

.dropzone-placeholder p {
  margin: 0.5rem 0 0.25rem;
  color: #334155;
}

.dropzone-placeholder span {
  font-size: 0.75rem;
}

.dropzone-preview {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 180px;
}

.dropzone-preview img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: #fff;
}

.dropzone-clear {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(15, 23, 42, 0.7);
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}

.dropzone-loading {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #094A25;
}

.preset-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.6rem;
}

.preset-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.preset-chip {
  width: 40px;
  height: 40px;
  padding: 2px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  overflow: hidden;
}

.preset-chip img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preset-chip:hover {
  border-color: #059669;
}
</style>
