<template>
  <div v-if="open" class="sidebar-backdrop" @click="$emit('close')"></div>
  <aside class="admin-sidebar" :class="{ open }">
    <div class="sidebar-brand">
      <svg class="brand-logo-svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 9 0 4.4-3.6 8-8 8Z"></path><path d="M11 20v-9"></path></svg>
      <div class="brand-text">
        <h2>MinSU RITE</h2>
        <p>Intelligence System</p>
      </div>
    </div>

    <nav class="sidebar-nav">
      <button :class="{ active: activeTab === 'overview' }" @click="navigate('overview')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg> Overview
      </button>
      <button :class="{ active: activeTab === 'news' }" @click="navigate('news')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M18 18h-8"></path><path d="M18 10h-8"></path></svg> News &amp; Events
      </button>
      <button :class="{ active: activeTab === 'carousel' }" @click="navigate('carousel')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> Hero Carousel
      </button>
      <button :class="{ active: activeTab === 'centers' }" @click="navigate('centers')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg> 9 Research Centers
      </button>
      <button :class="{ active: activeTab === 'ecosystem' }" @click="navigate('ecosystem')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Ecosystem Directory
      </button>
      <button :class="{ active: activeTab === 'org' }" @click="navigate('org')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Organizational Structure
      </button>
      <button :class="{ active: activeTab === 'contact' }" @click="navigate('contact')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Contact Messages
      </button>
      <button :class="{ active: activeTab === 'submissions' }" @click="navigate('submissions')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Unit Submissions
      </button>
      <button :class="{ active: activeTab === 'manage-public-homepage' }" @click="navigate('manage-public-homepage')">
        <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> Public Homepage
      </button>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar-box">ADM</div>
        <div>
          <p class="user-name">Administrator</p>
          <p class="user-role">Super Admin</p>
        </div>
      </div>
      <button class="logout-btn" @click="$emit('logout')">Logout</button>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  activeTab: { type: String, required: true },
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate', 'close', 'logout']);

const navigate = (tab) => {
  emit('navigate', tab);
};
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  background: #063018;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.05);
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  z-index: 1200;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

.brand-logo-svg { color: #10b981; }
.brand-text h2 { margin: 0; font-family: 'Outfit', sans-serif; font-size: 1.25rem; color: rgba(255, 255, 255, 1); }
.brand-text p { margin: 0; font-size: 0.75rem; opacity: 0.7; }

.sidebar-nav { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.sidebar-nav button {
  display: flex; align-items: center; gap: 0.75rem;
  background: transparent; border: none; color: rgba(255, 255, 255, 0.8);
  padding: 0.75rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer;
  transition: all 0.2s ease; text-align: left; font-size: 0.9rem;
}
.nav-svg { flex-shrink: 0; opacity: 0.85; transition: opacity 0.2s; }
.sidebar-nav button:hover .nav-svg, .sidebar-nav button.active .nav-svg { opacity: 1; stroke: #10b981; }
.sidebar-nav button:hover, .sidebar-nav button.active {
  background: rgba(255, 255, 255, 0.15); color: #ffffff;
}

.sidebar-footer {
  padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex; flex-direction: column; gap: 1rem;
}
.user-info { display: flex; align-items: center; gap: 0.75rem; }
.user-avatar-box { width: 36px; height: 36px; font-size: 0.75rem; font-weight: 800; background: rgba(16, 185, 129, 0.2); color: #10b981; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(16, 185, 129, 0.3); }
.user-name { margin: 0; font-weight: 700; font-size: 0.85rem; }
.user-role { margin: 0; font-size: 0.75rem; opacity: 0.7; }
.logout-btn {
  background: rgba(239, 68, 68, 0.2); color: #f87171; border: none;
  padding: 0.6rem; border-radius: 6px; font-weight: 700; cursor: pointer;
}

@media (max-width: 900px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1300;
    transform: translateX(-110%);
    transition: transform 0.22s ease;
    width: min(320px, 86vw);
  }

  .admin-sidebar.open {
    transform: translateX(0);
  }
}
</style>
