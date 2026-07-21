<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content" :class="{ 'modal-content--wide': entityType === 'news' }">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="modal-close" type="button" aria-label="Close dialog" @click="$emit('close')">✕</button>
      </div>
      <form @submit.prevent="$emit('save')" class="modal-form">
        <!-- NEWS FORM WITH ARTICLE EDITOR -->
        <div v-if="entityType === 'news'">
          <ArticleEditor
            :title="form.title"
            :category="form.category"
            :tags="form.tags"
            :date-iso="form.dateIso"
            :image="form.image"
            :link="form.link"
            :description="form.description"
            @update:title="updateField('title', $event)"
            @update:category="updateField('category', $event)"
            @update:tags="updateField('tags', $event)"
            @update:dateIso="updateField('dateIso', $event)"
            @update:image="updateField('image', $event)"
            @update:link="updateField('link', $event)"
            @update:description="updateField('description', $event)"
          />
        </div>

        <!-- CAROUSEL FORM -->
        <div v-if="entityType === 'carousel'">
          <div class="form-group">
            <label>Slide Title</label>
            <input :value="form.title" required type="text" @input="updateField('title', $event.target.value)" />
          </div>
          <div class="form-group">
            <label>Sort Order Number</label>
            <input :value="form.sort_order" type="number" @input="updateField('sort_order', Number($event.target.value))" />
          </div>
          <div class="form-group">
            <label>Slide Image</label>
            <ImageUploadField :model-value="form.image" @update:model-value="updateField('image', $event)" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea :value="form.description" rows="3" @input="updateField('description', $event.target.value)"></textarea>
          </div>
        </div>

        <!-- CENTERS FORM -->
        <div v-if="entityType === 'centers'">
          <div class="form-group">
            <label>Research Center Name</label>
            <input :value="form.name" required type="text" @input="updateField('name', $event.target.value)" />
          </div>
          <div class="form-group">
            <label>Category</label>
            <input :value="form.category" type="text" @input="updateField('category', $event.target.value)" />
          </div>
          <div class="form-group">
            <label>Contact Email</label>
            <input :value="form.contact_email" type="email" @input="updateField('contact_email', $event.target.value)" />
          </div>
          <div class="form-group">
            <label>Center Image</label>
            <ImageUploadField :model-value="form.image" @update:model-value="updateField('image', $event)" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea :value="form.description" rows="3" @input="updateField('description', $event.target.value)"></textarea>
          </div>
        </div>

        <!-- ECOSYSTEM FORM -->
        <div v-if="entityType === 'ecosystem'">
          <div class="form-group">
            <label>Partner Title</label>
            <input :value="form.title" required type="text" @input="updateField('title', $event.target.value)" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Category (gov, academic, etc)</label>
              <input :value="form.category" type="text" placeholder="gov, academic..." @input="updateField('category', $event.target.value)" />
            </div>
            <div class="form-group">
              <label>Partner Logo</label>
              <ImageUploadField :model-value="form.image" :preset-urls="ecosystemPresetUrls" @update:model-value="updateField('image', $event)" />
            </div>
          </div>
          <div class="form-group">
            <label>External Website Link</label>
            <input :value="form.link" type="text" placeholder="https://..." @input="updateField('link', $event.target.value)" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea :value="form.description" rows="2" @input="updateField('description', $event.target.value)"></textarea>
          </div>
        </div>

        <!-- ORG MEMBER FORM -->
        <div v-if="entityType === 'org'">
          <div class="form-group">
            <label>Member / Unit Name</label>
            <input :value="form.name" required type="text" @input="updateField('name', $event.target.value)" />
          </div>
          <div class="form-group">
            <label>Title / Designation</label>
            <input :value="form.title" required type="text" @input="updateField('title', $event.target.value)" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Division</label>
              <select :value="form.division" style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;" @change="updateField('division', $event.target.value)">
                <option value="Executive Leadership">Executive Leadership</option>
                <option value="Research & Publication">Research &amp; Publication</option>
                <option value="Research Centers">Research Centers</option>
                <option value="Extension Division">Extension Division</option>
              </select>
            </div>
            <div class="form-group">
              <label>Role Type</label>
              <select :value="form.role_type" style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;" @change="updateField('role_type', $event.target.value)">
                <option value="executive_top">Top Executive</option>
                <option value="executive">Executive</option>
                <option value="support">Support</option>
                <option value="node">Office Node</option>
              </select>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Save Content</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import ImageUploadField from '@/components/ImageUploadField.vue';

const ArticleEditor = defineAsyncComponent(() => import('@/components/ArticleEditor.vue'));

defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  entityType: { type: String, required: true },
  form: { type: Object, required: true },
  ecosystemPresetUrls: { type: Array, default: () => [] },
});

const emit = defineEmits(['close', 'save', 'update:field']);

const updateField = (field, value) => {
  emit('update:field', { field, value });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
  box-sizing: border-box;
}
.modal-content {
  background: #fff;
  width: 100%;
  max-width: 650px;
  margin: auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.modal-content--wide {
  max-width: min(960px, 100%);
  max-height: none;
}
.modal-header {
  padding: 1.25rem 1.5rem;
  background: #094A25;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}
.modal-header h3 {
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  color: #ffffff;
}
.modal-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
.modal-form {
  padding: clamp(1rem, 3vw, 1.5rem);
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-group {
  margin-bottom: 1.25rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: #334155;
  font-size: 0.85rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.65rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-family: inherit;
  box-sizing: border-box;
}
.modal-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.btn-cancel {
  background: #f1f5f9;
  color: #475569;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.btn-primary {
  background: #094A25;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 720px) {
  .modal-overlay {
    padding: 0.5rem;
    align-items: stretch;
  }
  .modal-content,
  .modal-content--wide {
    max-width: 100%;
    border-radius: 12px;
    min-height: calc(100vh - 1rem);
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .modal-footer {
    flex-direction: column-reverse;
  }
  .btn-cancel,
  .btn-primary {
    width: 100%;
  }
}
</style>
