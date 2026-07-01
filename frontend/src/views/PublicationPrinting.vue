<template>
  <main class="pub-printing-page">
    <!-- Hero Banner -->
    <section class="page-hero">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="hero-content">
        <span class="hero-tag">RITE Services</span>
        <h1 class="hero-title">Publication &amp;<br />Printing Unit</h1>
        <p class="hero-desc">
          The Publication and Printing Unit supports the dissemination of scholarly work through high-quality publishing, layout, copyediting, and printing services that meet rigorous academic and institutional standards.
        </p>
        <button @click="showModal = true" class="btn-hero-action">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:8px; vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg> Request Printing &amp; Submit Manuscript
        </button>
      </div>
    </section>

    <!-- Content Card -->
    <section class="services-section">
      <div class="services-container">
        <div class="card-glow-line"></div>
        <div class="services-content">
          <div class="services-icon-header">
            <svg viewBox="0 0 24 24" width="28" height="28" stroke="#094A25" stroke-width="2" fill="none" class="badge-svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            <h2>Dissemination &amp; Publishing Services</h2>
          </div>
          <p class="services-desc">
            The unit provides peer-reviewed journal support, professional printing, aesthetic layout services, and open-access assistance to ensure your research achieves maximum visibility and reaches the widest possible audience.
          </p>
          
          <div class="key-deliverables">
            <div class="deliverable-item">
              <span class="bullet-check"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <div>
                <h4>Peer-Reviewed Journals</h4>
                <p>Ensuring compliance with international citation standards and scholarly index formats.</p>
              </div>
            </div>
            <div class="deliverable-item">
              <span class="bullet-check"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <div>
                <h4>Layout &amp; Graphic Design</h4>
                <p>Polishing research papers, brochures, newsletters, and reports for professional presentation.</p>
              </div>
            </div>
            <div class="deliverable-item">
              <span class="bullet-check"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <div>
                <h4>Open-Access Dissemination</h4>
                <p>Support for digital indexing, DOI registration, and repository archiving.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- POPUP MODAL / SLIDE-OVER FORM -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <h3 style="color:#ffffff !important; margin:0;">Submit Manuscript / Printing Request</h3>
            <p style="color:#a7f3d0 !important; margin:0.2rem 0 0 0;">Direct submission to Publication &amp; Printing Unit</p>
          </div>
          <button @click="showModal = false" class="modal-close-btn">✕</button>
        </div>

        <form @submit.prevent="handleSubmission" class="sub-form">
          <div v-if="submitSuccess" class="alert-success">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right:6px; vertical-align:middle;"><polyline points="20 6 9 17 4 12"></polyline></svg> Your publication request and manuscript file have been submitted successfully!
          </div>
          <div v-if="submitError" class="alert-error">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right:6px; vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> {{ submitError }}
          </div>

          <div class="form-row-2">
            <div class="input-group">
              <label>Author / Requestor Name *</label>
              <input v-model="subForm.sender_name" required type="text" placeholder="e.g. Prof. Maria Santos" />
            </div>
            <div class="input-group">
              <label>Email Address *</label>
              <input v-model="subForm.email" required type="email" placeholder="e.g. author@minsu.edu.ph" />
            </div>
          </div>

          <div class="form-row-2">
            <div class="input-group">
              <label>Contact Phone</label>
              <input v-model="subForm.phone" type="text" placeholder="e.g. +63 912 345 6789" />
            </div>
            <div class="input-group">
              <label>Service Dropdown *</label>
              <select v-model="subForm.subject" required>
                <option value="Journal Manuscript Submission">Journal Manuscript Submission</option>
                <option value="Layout & Copyediting Service">Layout &amp; Copyediting Service</option>
                <option value="Institutional Printing Request">Institutional Printing Request</option>
                <option value="DOI & Open Access Indexing">DOI &amp; Open Access Indexing</option>
              </select>
            </div>
          </div>

          <div class="input-group">
            <label>Manuscript Notes / Printing Specifications *</label>
            <textarea v-model="subForm.message" required rows="3" placeholder="Specify paper title, target journal, printing copies, dimensions, or layout notes..."></textarea>
          </div>

          <div class="input-group">
            <label>Attach Manuscript / Draft File (PDF, DOCX, ZIP, Max 10MB)</label>
            <input type="file" @change="handleFileUpload" class="file-input" accept=".pdf,.doc,.docx,.zip,.jpg,.png" />
          </div>

          <div class="modal-footer-btns">
            <button type="button" @click="showModal = false" class="btn-cancel">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="btn-submit">
              {{ isSubmitting ? 'Submitting...' : 'Send Application & File' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { submissionService } from "@/services/submissionService";

const showModal = ref(false);
const subForm = ref({
  sender_name: "",
  email: "",
  phone: "",
  subject: "Journal Manuscript Submission",
  message: "",
});
const selectedFile = ref(null);
const isSubmitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

const handleFileUpload = (e) => {
  if (e.target.files && e.target.files[0]) {
    selectedFile.value = e.target.files[0];
  }
};

const handleSubmission = async () => {
  isSubmitting.value = true;
  submitSuccess.value = false;
  submitError.value = "";

  try {
    const fd = new FormData();
    fd.append("target_unit", "publication-printing");
    fd.append("sender_name", subForm.value.sender_name);
    fd.append("email", subForm.value.email);
    fd.append("phone", subForm.value.phone);
    fd.append("subject", subForm.value.subject);
    fd.append("message", subForm.value.message);
    if (selectedFile.value) {
      fd.append("attachment", selectedFile.value);
    }

    await submissionService.submit(fd);
    submitSuccess.value = true;
    subForm.value = { sender_name: "", email: "", phone: "", subject: "Journal Manuscript Submission", message: "" };
    selectedFile.value = null;
    setTimeout(() => { showModal.value = false; submitSuccess.value = false; }, 2500);
  } catch (err) {
    submitError.value = err.response?.data?.message || "Failed to submit request.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.pub-printing-page {
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.page-hero {
  position: relative;
  background: linear-gradient(135deg, #053018 0%, #0d5e32 50%, #10b981 100%);
  color: white;
  padding: 4.5rem 3.5rem;
  border-radius: 28px;
  margin-bottom: 2.5rem;
  overflow: hidden;
  box-shadow: 0 20px 45px -15px rgba(5, 48, 24, 0.18);
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.orb-1 { top: -40px; right: -30px; width: 220px; height: 220px; background: rgba(16, 185, 129, 0.18); }
.orb-2 { bottom: -50px; left: -20px; width: 180px; height: 180px; background: rgba(52, 211, 153, 0.15); }

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.hero-tag {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: #a7f3d0;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  line-height: 1.15;
  color: #ffffff !important;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.hero-desc {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #f1f5f9 !important;
  margin: 0;
  max-width: 800px;
}

.btn-hero-action {
  background: #ffffff;
  color: #053018;
  border: none;
  padding: 0.9rem 2.2rem;
  border-radius: 999px;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 0.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.btn-hero-action:hover {
  transform: translateY(-3px);
  background: #f8fafc;
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.services-container {
  position: relative;
  background: #ffffff;
  border-radius: 28px;
  padding: 3.5rem;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  overflow: hidden;
}

.card-glow-line {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, #094A25 0%, #10b981 100%);
}

.services-icon-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
.services-icon-header h2 { font-family: 'Outfit', sans-serif; font-size: 1.85rem; font-weight: 800; color: #053018; margin: 0; }
.services-desc { font-size: 1.05rem; line-height: 1.6; color: #475569; margin-bottom: 2.5rem; }

.key-deliverables { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.75rem; }
.deliverable-item { display: flex; gap: 1.25rem; align-items: flex-start; background: #f8fafc; padding: 1.5rem; border-radius: 20px; border: 1px solid rgba(0,0,0,0.03); }
.bullet-check { background: #dcfce7; color: #059669; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
.deliverable-item h4 { margin: 0 0 0.3rem 0; font-size: 1.05rem; color: #0f172a; font-weight: 800; }
.deliverable-item p { margin: 0; font-size: 0.9rem; color: #64748b; line-height: 1.5; }

/* MODAL POPUP STYLING */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 99999; padding: 1.5rem; box-sizing: border-box;
}

.modal-card {
  background: #ffffff; width: 100%; max-width: 650px; border-radius: 28px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); animation: popIn 0.3s ease; max-height: 90vh; overflow-y: auto; text-align: left;
}

@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.modal-header {
  background: linear-gradient(135deg, #053018, #094A25); color: #ffffff !important; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center;
}
.modal-header h3 { margin: 0; font-family: 'Outfit', sans-serif; font-size: 1.35rem; font-weight: 800; color: #ffffff !important; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
.modal-header p { margin: 0.2rem 0 0 0; font-size: 0.9rem; color: #a7f3d0 !important; font-weight: 600; }
.modal-close-btn { background: rgba(255,255,255,0.15); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.sub-form { padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
.alert-success { background: #dcfce7; color: #166534; padding: 1rem; border-radius: 12px; font-weight: 700; }
.alert-error { background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 12px; font-weight: 700; }

.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.input-group { display: flex; flex-direction: column; gap: 0.4rem; }
.input-group label { font-weight: 700; font-size: 0.85rem; color: #334155; }
.input-group input, .input-group select, .input-group textarea {
  width: 100%; padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid #cbd5e1; font-family: inherit; font-size: 0.95rem; outline: none; box-sizing: border-box;
}
.input-group input:focus, .input-group select:focus, .input-group textarea:focus { border-color: #094A25; box-shadow: 0 0 0 3px rgba(9, 74, 37, 0.12); }
.file-input { background: #f8fafc; padding: 0.5rem !important; }

.modal-footer-btns { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
.btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 0.8rem 1.5rem; border-radius: 999px; font-weight: 700; cursor: pointer; }
.btn-submit { background: #094A25; color: white; border: none; padding: 0.8rem 1.8rem; border-radius: 999px; font-family: 'Outfit', sans-serif; font-weight: 800; cursor: pointer; }

@media (max-width: 768px) {
  .page-hero { padding: 3rem 1.75rem; }
  .services-container { padding: 2rem 1.5rem; }
  .form-row-2 { grid-template-columns: 1fr; }
}
</style>
