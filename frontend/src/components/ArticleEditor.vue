<template>
  <div class="article-editor">
    <div class="article-progress">
      <div class="article-progress-bar" :style="{ width: progressPercent + '%' }"></div>
      <span class="article-progress-label">{{ progressPercent }}% Complete</span>
    </div>

    <div class="article-layout">
      <div class="article-main-col">
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

        <div class="article-meta-row">
          <div class="form-group">
            <label>Category <span class="required">*</span></label>
            <select :value="category" @change="$emit('update:category', $event.target.value)">
              <option v-for="opt in categoryOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="form-group form-group-tags">
            <label>Tags</label>
            <div class="tags-dropdown" ref="tagsDropdownRef">
              <button
                type="button"
                class="tags-dropdown-trigger"
                :aria-expanded="tagsOpen"
                @click="tagsOpen = !tagsOpen"
              >
                <span class="tags-dropdown-summary">{{ tagsSummary }}</span>
                <span class="tags-dropdown-caret" aria-hidden="true">▾</span>
              </button>
              <div v-if="tagsOpen" class="tags-dropdown-panel" role="listbox" aria-multiselectable="true">
                <label
                  v-for="tag in tagOptions"
                  :key="tag"
                  class="tags-dropdown-option"
                >
                  <input
                    type="checkbox"
                    :value="tag"
                    :checked="selectedTagsModel.includes(tag)"
                    @change="toggleTag(tag)"
                  />
                  <span>{{ tag }}</span>
                </label>
              </div>
            </div>
          </div>
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

      <div class="article-side-col">
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
    </div>

    <div class="form-group">
      <label>Featured Image</label>
      <ImageUploadField :model-value="image" @update:model-value="$emit('update:image', $event)" />
    </div>

    <div class="form-group editor-section">
      <label>Article Content <span class="required">*</span></label>

      <div class="media-tools">
        <div class="media-fields">
          <select v-model="mediaLayout" class="media-select" aria-label="Image layout">
            <option value="full">Full width</option>
            <option value="wide">Wide</option>
            <option value="left">Left (wrap text)</option>
            <option value="right">Right (wrap text)</option>
          </select>
          <input
            v-model="mediaCaption"
            type="text"
            class="media-caption"
            placeholder="Caption (optional)"
          />
        </div>
        <div class="media-actions">
          <button type="button" class="media-btn media-btn-primary" :disabled="mediaBusy" @click="triggerImagePick">
            {{ mediaBusy ? 'Uploading…' : 'Insert Image' }}
          </button>
          <select v-model.number="galleryColumns" class="gallery-select" aria-label="Gallery columns">
            <option :value="2">2 columns</option>
            <option :value="3">3 columns</option>
            <option :value="4">4 columns</option>
          </select>
          <button type="button" class="media-btn media-btn-outline" :disabled="mediaBusy" @click="triggerGalleryPick">
            Insert Gallery
          </button>
        </div>
      </div>

      <input
        ref="imageInput"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        class="hidden-file"
        @change="onImageFile"
      />
      <input
        ref="galleryInput"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        class="hidden-file"
        @change="onGalleryFiles"
      />

      <Editor
        v-model="contentModel"
        :init="editorInit"
        tinymce-script-src="https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js"
        license-key="gpl"
        @init="onEditorInit"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import ImageUploadField from '@/components/ImageUploadField.vue';
import { mediaService, resolveStorageUrl } from '@/services/mediaService';

/** RITE-aligned categories for faculty, research, innovation, tech & extension. */
const categoryOptions = [
  'Announcement',
  'Research',
  'Innovation',
  'Technology',
  'Extension',
  'Event',
  'Training',
  'Workshop',
  'Seminar',
  'Partnership',
  'Publication',
  'Student Opportunity',
  'Ethics & Integrity',
  'Awards & Recognition',
  'Call for Proposals',
];

/** Multi-select tags stored as a comma-separated string for the API. */
const tagOptions = [
  'Faculty Research',
  'Student Research',
  'Interdisciplinary Collaboration',
  'Technology Transfer',
  'Intellectual Property',
  'Patent & ITSO',
  'Community Engagement',
  'Industry Partnership',
  'Capacity Building',
  'Knowledge Translation',
  'Societal Impact',
  'Regional Development',
  'MIMAROPA',
  'Sustainability',
  'Smart Agriculture',
  'Digital Innovation',
  'Food Innovation',
  'Fisheries',
  'Environmental Studies',
  'Extension Services',
];

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

const selectedTagsModel = computed({
  get: () =>
    (props.tags || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
  set: (values) => emit('update:tags', (values || []).join(', ')),
});

const tagsSummary = computed(() => {
  const selected = selectedTagsModel.value;
  if (!selected.length) return 'Select tags…';
  if (selected.length <= 2) return selected.join(', ');
  return `${selected.slice(0, 2).join(', ')} +${selected.length - 2} more`;
});

const tagsOpen = ref(false);
const tagsDropdownRef = ref(null);

const toggleTag = (tag) => {
  const next = new Set(selectedTagsModel.value);
  if (next.has(tag)) next.delete(tag);
  else next.add(tag);
  selectedTagsModel.value = [...next];
};

const onDocClick = (event) => {
  if (!tagsDropdownRef.value) return;
  if (!tagsDropdownRef.value.contains(event.target)) {
    tagsOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', onDocClick));
onBeforeUnmount(() => document.removeEventListener('click', onDocClick));

const editorInstance = ref(null);
const imageInput = ref(null);
const galleryInput = ref(null);
const mediaLayout = ref('full');
const mediaCaption = ref('');
const galleryColumns = ref(3);
const mediaBusy = ref(false);

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

const contentCss = `
  body { font-family: Outfit, Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #0f172a; }
  .news-figure { margin: 1.25rem 0; clear: both; }
  .news-figure img { max-width: 100%; height: auto; display: block; border-radius: 8px; }
  .news-figure figcaption { margin-top: 0.45rem; font-size: 0.85rem; color: #64748b; font-style: italic; text-align: center; }
  .news-figure--left { float: left; width: 46%; margin: 0.35rem 1.25rem 0.85rem 0; }
  .news-figure--right { float: right; width: 46%; margin: 0.35rem 0 0.85rem 1.25rem; }
  .news-figure--wide { width: 100%; max-width: 100%; }
  .news-figure--full { width: 100%; margin-left: 0; margin-right: 0; }
  .news-gallery { display: grid; gap: 0.65rem; margin: 1.25rem 0; clear: both; }
  .news-gallery--cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .news-gallery--cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .news-gallery--cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .news-gallery img { width: 100%; height: 160px; object-fit: cover; border-radius: 8px; display: block; }
`;

const editorInit = {
  height: 420,
  menubar: false,
  statusbar: false,
  elementpath: false,
  plugins: 'lists link image code fullscreen table',
  toolbar:
    'undo redo | blocks fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | blockquote hr | removeformat | fullscreen',
  toolbar_mode: 'wrap',
  content_style: contentCss,
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

const onEditorInit = (_evt, editor) => {
  editorInstance.value = editor;
};

const absoluteUrl = (url) => {
  const resolved = resolveStorageUrl(url);
  if (resolved.startsWith('http')) return resolved;
  return `${apiBase}${resolved.startsWith('/') ? resolved : `/${resolved}`}`;
};

const layoutClass = (layout) => {
  const map = {
    full: 'news-figure--full',
    wide: 'news-figure--wide',
    left: 'news-figure--left',
    right: 'news-figure--right',
  };
  return map[layout] || 'news-figure--full';
};

const escapeHtml = (str) =>
  String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const insertHtml = (html) => {
  const ed = editorInstance.value;
  if (!ed) {
    alert('Editor is still loading. Try again in a moment.');
    return;
  }
  ed.focus();
  ed.insertContent(html);
};

const buildFigureHtml = (imageUrl, caption, layout) => {
  const cap = caption?.trim()
    ? `<figcaption>${escapeHtml(caption.trim())}</figcaption>`
    : '';
  return `<figure class="news-figure ${layoutClass(layout)}"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(caption || '')}" />${cap}</figure><p></p>`;
};

const triggerImagePick = () => imageInput.value?.click();
const triggerGalleryPick = () => galleryInput.value?.click();

const uploadErrorMessage = (err) => {
  const status = err?.response?.status;
  if (status === 413) {
    return 'The image is too large for the server upload limit. Try a smaller file, or ask the admin to raise PHP/nginx upload limits.';
  }
  if (status === 401 || status === 419) {
    return 'Your session expired. Refresh the page and sign in again, then retry the upload.';
  }
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    'Failed to upload image.'
  );
};

const onImageFile = async (e) => {
  const file = e.target.files?.[0];
  e.target.value = '';
  if (!file) return;
  mediaBusy.value = true;
  try {
    const { url } = await mediaService.uploadImage(file);
    insertHtml(buildFigureHtml(absoluteUrl(url), mediaCaption.value, mediaLayout.value));
    mediaCaption.value = '';
  } catch (err) {
    alert(uploadErrorMessage(err));
  } finally {
    mediaBusy.value = false;
  }
};

const onGalleryFiles = async (e) => {
  const files = Array.from(e.target.files || []);
  e.target.value = '';
  if (!files.length) return;
  mediaBusy.value = true;
  try {
    const urls = [];
    for (const file of files) {
      const { url } = await mediaService.uploadImage(file);
      urls.push(absoluteUrl(url));
    }
    const cols = [2, 3, 4].includes(galleryColumns.value) ? galleryColumns.value : 3;
    const imgs = urls.map((u) => `<img src="${escapeHtml(u)}" alt="" />`).join('');
    insertHtml(`<div class="news-gallery news-gallery--cols-${cols}">${imgs}</div><p></p>`);
  } catch (err) {
    alert(uploadErrorMessage(err));
  } finally {
    mediaBusy.value = false;
  }
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

.article-layout {
  display: grid;
  grid-template-columns: 1.6fr 0.9fr;
  gap: 1rem;
  align-items: start;
}

.article-main-col,
.article-side-col {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.article-title-group {
  position: relative;
}

.article-title-group input,
.article-date-group input,
.form-group input,
.form-group select,
.media-select,
.media-caption,
.gallery-select {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.char-count {
  position: absolute;
  right: 8px;
  bottom: -18px;
  font-size: 0.7rem;
  color: #94a3b8;
}

.article-stats {
  display: flex;
  gap: 1rem;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 0.85rem 1rem;
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
  grid-template-columns: 1fr 1.4fr;
  gap: 1rem;
}

.tag-hint {
  font-weight: 500;
  color: #64748b;
  font-size: 0.8rem;
}

.tags-dropdown {
  position: relative;
  width: 100%;
}

.tags-dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  font-size: 0.9rem;
  color: #0f172a;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
}

.tags-dropdown-summary {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tags-dropdown-caret {
  color: #64748b;
  flex-shrink: 0;
}

.tags-dropdown-panel {
  position: absolute;
  z-index: 30;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 220px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  padding: 0.35rem;
}

.tags-dropdown-option {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 0.55rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #334155;
  cursor: pointer;
}

.tags-dropdown-option:hover {
  background: #f1f5f9;
}

.tags-dropdown-option input {
  width: auto;
  margin: 0;
  accent-color: #094A25;
}

.form-group label {
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 700;
  font-size: 0.85rem;
  color: #334155;
}

.form-group label,
.article-title-group label,
.article-date-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: #334155;
}

.required { color: #dc2626; }

.editor-section { margin-top: 0.25rem; }

.media-tools {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.media-fields {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 0.6rem;
}

.media-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.gallery-select {
  width: auto;
  min-width: 120px;
}

.media-btn {
  border-radius: 8px;
  padding: 0.55rem 0.9rem;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
}

.media-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.media-btn-primary {
  background: #094A25;
  color: #fff;
}

.media-btn-outline {
  background: #fff;
  color: #094A25;
  border: 1px solid rgba(9, 74, 37, 0.35);
}

.hidden-file { display: none; }

@media (max-width: 900px) {
  .article-layout {
    grid-template-columns: 1fr;
  }

  .article-meta-row {
    grid-template-columns: 1fr;
  }

  .media-fields {
    grid-template-columns: 1fr;
  }

  .article-stats {
    justify-content: space-around;
  }
}

@media (max-width: 600px) {
  .article-editor {
    gap: 0.75rem;
  }

  .media-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .media-btn,
  .gallery-select {
    width: 100%;
  }
}
</style>
