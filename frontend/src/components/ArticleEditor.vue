<template>
  <div class="article-editor">
    <div class="article-progress">
      <div class="article-progress-bar" :style="{ width: progressPercent + '%' }"></div>
      <span class="article-progress-label">{{ progressPercent }}% Complete</span>
    </div>

    <div class="article-top-row">
      <div class="article-title-group">
        <label>Article Title <span class="required">*</span></label>
        <input
          :value="title"
          type="text"
          maxlength="500"
          placeholder="Enter a compelling title..."
          @input="$emit('update:title', $event.target.value)"
        />
        <span class="char-count">{{ title.length }} / 500</span>
      </div>
      <div class="article-date-group">
        <label>Publication Date</label>
        <input
          :value="dateIso"
          type="date"
          @input="$emit('update:dateIso', $event.target.value)"
        />
      </div>
      <div class="article-stats">
        <div><strong>{{ wordCount }}</strong> Words</div>
        <div><strong>{{ readMinutes }}</strong> Min Read</div>
      </div>
    </div>

    <div class="article-meta-row">
      <div class="form-group">
        <label>Category <span class="required">*</span></label>
        <select :value="category" @change="$emit('update:category', $event.target.value)">
          <option value="Announcement">Announcement</option>
          <option value="Event">Event</option>
          <option value="Research">Research</option>
          <option value="Extension">Extension</option>
          <option value="Innovation">Innovation</option>
        </select>
      </div>
      <div class="form-group">
        <label>Tags</label>
        <input
          :value="tags"
          type="text"
          placeholder="e.g. research, extension, innovation"
          @input="$emit('update:tags', $event.target.value)"
        />
      </div>
      <div class="form-group">
        <label>External Link (optional)</label>
        <input
          :value="link"
          type="url"
          placeholder="https://..."
          @input="$emit('update:link', $event.target.value)"
        />
      </div>
    </div>

    <div class="form-group">
      <label>Featured Image</label>
      <ImageUploadField :model-value="image" @update:model-value="$emit('update:image', $event)" />
    </div>

    <div class="form-group">
      <label>Article Content <span class="required">*</span></label>
      <Editor
        v-model="contentModel"
        :init="editorInit"
        tinymce-script-src="https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js"
        license-key="gpl"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import ImageUploadField from '@/components/ImageUploadField.vue';
import { mediaService } from '@/services/mediaService';

const props = defineProps({
  title: { type: String, default: '' },
  category: { type: String, default: 'Announcement' },
  tags: { type: String, default: '' },
  dateIso: { type: String, default: '' },
  image: { type: String, default: '' },
  link: { type: String, default: '' },
  description: { type: String, default: '' },
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:tags',
  'update:dateIso',
  'update:image',
  'update:link',
  'update:description',
]);

const contentModel = computed({
  get: () => props.description,
  set: (val) => emit('update:description', val),
});

const plainText = computed(() => {
  const div = document.createElement('div');
  div.innerHTML = props.description || '';
  return div.textContent || '';
});

const wordCount = computed(() => {
  const text = plainText.value.trim();
  return text ? text.split(/\s+/).length : 0;
});

const readMinutes = computed(() => Math.max(1, Math.ceil(wordCount.value / 200)));

const progressPercent = computed(() => {
  let filled = 0;
  if (props.title?.trim()) filled++;
  if (props.category?.trim()) filled++;
  if (props.dateIso) filled++;
  if (plainText.value.trim().length > 20) filled++;
  return Math.round((filled / 4) * 100);
});

const apiBase = (
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:8000'
).replace(/\/api\/?$/, '');

const editorInit = {
  height: 420,
  menubar: false,
  plugins: 'lists link image code fullscreen table',
  toolbar:
    'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | link image | blockquote | removeformat | fullscreen',
  content_style: 'body { font-family: Outfit, Arial, sans-serif; font-size: 15px; }',
  branding: false,
  promotion: false,
  skin_url: 'https://cdn.jsdelivr.net/npm/tinymce@7/skins/ui/oxide',
  content_css: 'https://cdn.jsdelivr.net/npm/tinymce@7/skins/content/default/content.min.css',
  images_upload_handler: async (blobInfo) => {
    const file = blobInfo.blob();
    const { url } = await mediaService.uploadImage(file);
    return url.startsWith('http') ? url : `${apiBase}${url}`;
  },
};
</script>

<style scoped>
.article-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-progress {
  position: relative;
  height: 28px;
  background: #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.article-progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, #059669, #094A25);
  transition: width 0.3s ease;
}

.article-progress-label {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f172a;
}

.article-top-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  align-items: start;
}

.article-title-group {
  position: relative;
}

.article-title-group input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
}

.char-count {
  position: absolute;
  right: 8px;
  bottom: -18px;
  font-size: 0.7rem;
  color: #94a3b8;
}

.article-date-group input {
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.article-stats {
  display: flex;
  gap: 1rem;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  color: #64748b;
  text-align: center;
}

.article-stats strong {
  display: block;
  font-size: 1.1rem;
  color: #094A25;
}

.article-meta-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: #334155;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.required {
  color: #dc2626;
}

@media (max-width: 900px) {
  .article-top-row,
  .article-meta-row {
    grid-template-columns: 1fr;
  }
}
</style>
