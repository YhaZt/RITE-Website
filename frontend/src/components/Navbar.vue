<template>
  <header class="navbar-header">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="logo-link" @click="closeAll">
        <img :src="riteLogo" alt="RITE Logo" class="logo-image" />
      </router-link>

      <!-- Desktop Navigation Links -->
      <nav class="desktop-nav">
        <ul class="nav-links-list">
          <li>
            <router-link to="/" class="nav-item-link" active-class="active-route">Home</router-link>
          </li>
          <li>
            <router-link to="/about" class="nav-item-link" active-class="active-route">About</router-link>
          </li>

          <!-- Dropdown: Research & Publication -->
          <li class="dropdown-item" @mouseenter="openDropdown('research')" @mouseleave="closeDropdown('research')">
            <router-link to="/research" class="dropdown-trigger" @click="closeAll" :class="{ 'active-trigger': isDropdownActive(['/publication-and-printing', '/research-unit']) }">
              Research &amp; Publication
              <span class="arrow-icon">▾</span>
            </router-link>
            <transition name="dropdown-fade">
              <ul v-show="activeDropdown === 'research'" class="dropdown-panel">
                <li>
                  <router-link to="/publication-and-printing" class="dropdown-link" @click="closeAll">Publication &amp; Printing Unit</router-link>
                </li>
                <li>
                  <router-link to="/research-unit" class="dropdown-link" @click="closeAll">Research Unit</router-link>
                </li>
              </ul>
            </transition>
          </li>

          <!-- Dropdown: Innovation -->
          <li class="dropdown-item" @mouseenter="openDropdown('innovation')" @mouseleave="closeDropdown('innovation')">
            <router-link to="/innovation" class="dropdown-trigger" @click="closeAll" :class="{ 'active-trigger': isDropdownActive(['/technology-transfer', '/innovation-hub', '/bukid-hub', '/project-mauya']) }">
              Innovation
              <span class="arrow-icon">▾</span>
            </router-link>
            <transition name="dropdown-fade">
              <ul v-show="activeDropdown === 'innovation'" class="dropdown-panel">
                <li>
                  <router-link to="/technology-transfer" class="dropdown-link" @click="closeAll">Tech Transfer &amp; Patents</router-link>
                </li>
                <li>
                  <a href="https://www.minsuibibes.com" target="_blank" rel="noopener noreferrer" class="dropdown-link" @click="closeAll">Minsu I-BIBES</a>
                </li>
                <li>
                  <router-link to="/innovation-hub" class="dropdown-link" @click="closeAll">Innovation Hub</router-link>
                </li>
                <li class="nested-sub-menu">
                  <router-link to="/bukid-hub" class="dropdown-link sub-link" @click="closeAll">BUKID Hub</router-link>
                </li>
                <li class="nested-sub-menu">
                  <router-link to="/project-mauya" class="dropdown-link sub-link" @click="closeAll">Project MAUYA</router-link>
                </li>
              </ul>
            </transition>
          </li>

          <li>
            <router-link to="/ethics" class="nav-item-link" active-class="active-route">Research Ethics</router-link>
          </li>
          <li>
            <router-link to="/extension" class="nav-item-link" active-class="active-route">Extension</router-link>
          </li>

          <!-- Dropdown: Research Centers -->
          <li class="dropdown-item" @mouseenter="openDropdown('centers')" @mouseleave="closeDropdown('centers')">
            <router-link to="/centers" class="dropdown-trigger" @click="closeAll" :class="{ 'active-trigger': isRouteActive('/centers') }">
              Research Centers
              <span class="arrow-icon">▾</span>
            </router-link>
            <transition name="dropdown-fade">
              <ul v-show="activeDropdown === 'centers'" class="dropdown-panel centers-dropdown-panel">
                <li><router-link to="/centers/mindoro-development" class="dropdown-link" @click="closeAll">Mindoro Development &amp; Studies</router-link></li>
                <li><router-link to="/centers/digital-innovation" class="dropdown-link" @click="closeAll">Digital Innovation &amp; Emerging Tech</router-link></li>
                <li><router-link to="/centers/environmental-studies" class="dropdown-link" @click="closeAll">Environmental Studies</router-link></li>
                <li><router-link to="/centers/fisheries-research" class="dropdown-link" @click="closeAll">Fisheries Research</router-link></li>
                <li><router-link to="/centers/mimaropa-food" class="dropdown-link" @click="closeAll">MIMAROPA Food Innovation</router-link></li>
                <li><router-link to="/centers/island-education" class="dropdown-link" @click="closeAll">Island Education &amp; Sustainability</router-link></li>
                <li><router-link to="/centers/peace-criminology" class="dropdown-link" @click="closeAll">Peace, Criminology &amp; Law</router-link></li>
                <li><router-link to="/centers/smart-agriculture" class="dropdown-link" @click="closeAll">Smart Agriculture &amp; Biosystems</router-link></li>
                <li><router-link to="/centers/textile-fiber" class="dropdown-link" @click="closeAll">Natural Textile Fiber Innovation</router-link></li>
              </ul>
            </transition>
          </li>

          <!-- Auth Actions -->
          <li v-if="user" class="auth-btn-group">
            <router-link to="/change-password" class="nav-item-link" active-class="active-route">Change Password</router-link>
            <button @click="handleLogout" class="action-btn logout-btn">Logout</button>
          </li>
          <li v-else class="auth-btn-group">
            <router-link to="/login" class="action-btn login-btn">Login</router-link>
          </li>
        </ul>
      </nav>

      <!-- Mobile Hamburger Button -->
      <button class="hamburger-btn" @click="toggleMobileMenu" :class="{ 'hamburger-active': mobileMenuOpen }" aria-label="Toggle menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Drawer Overlay -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="drawer-overlay" @click="closeAll"></div>
    </transition>

    <!-- Mobile Drawer Menu -->
    <transition name="slide-drawer">
      <aside v-if="mobileMenuOpen" class="mobile-drawer">
        <div class="drawer-header">
          <img :src="riteLogo" alt="RITE Logo" class="drawer-logo" />
          <button class="close-drawer-btn" @click="closeAll" aria-label="Close menu">✕</button>
        </div>

        <nav class="mobile-nav">
          <ul class="mobile-links-list">
            <li>
              <router-link to="/" class="mobile-nav-link" active-class="active-mob" @click="closeAll">Home</router-link>
            </li>
            <li>
              <router-link to="/about" class="mobile-nav-link" active-class="active-mob" @click="closeAll">About</router-link>
            </li>

            <!-- Mobile Accordion: Research & Publication -->
            <li class="mobile-accordion-item">
              <button class="accordion-trigger" @click="toggleAccordion('research')">
                Research &amp; Publication
                <span class="accordion-caret" :class="{ rotated: mobileAccordions.research }">▼</span>
              </button>
              <ul v-show="mobileAccordions.research" class="accordion-menu">
                <li><router-link to="/research" class="accordion-link font-semibold" @click="closeAll">Overview &amp; Services →</router-link></li>
                <li><router-link to="/publication-and-printing" class="accordion-link" @click="closeAll">Publication &amp; Printing Unit</router-link></li>
                <li><router-link to="/research-unit" class="accordion-link" @click="closeAll">Research Unit</router-link></li>
              </ul>
            </li>

            <!-- Mobile Accordion: Innovation -->
            <li class="mobile-accordion-item">
              <button class="accordion-trigger" @click="toggleAccordion('innovation')">
                Innovation
                <span class="accordion-caret" :class="{ rotated: mobileAccordions.innovation }">▼</span>
              </button>
              <ul v-show="mobileAccordions.innovation" class="accordion-menu">
                <li><router-link to="/innovation" class="accordion-link font-semibold" @click="closeAll">Overview &amp; Pillars →</router-link></li>
                <li><router-link to="/technology-transfer" class="accordion-link" @click="closeAll">Tech Transfer &amp; Patents</router-link></li>
                <li><a href="https://www.minsuibibes.com" target="_blank" rel="noopener noreferrer" class="accordion-link" @click="closeAll">Minsu I-BIBES</a></li>
                <li><router-link to="/innovation-hub" class="accordion-link font-semibold" @click="closeAll">Innovation Hub</router-link></li>
                <li><router-link to="/bakodhub" class="accordion-link sub-nested-link" @click="closeAll">BUKID Hub</router-link></li>
                <li><router-link to="/project-mauya" class="accordion-link sub-nested-link" @click="closeAll">Project MAUYA</router-link></li>
              </ul>
            </li>

            <li>
              <router-link to="/ethics" class="mobile-nav-link" active-class="active-mob" @click="closeAll">Research Ethics</router-link>
            </li>
            <li>
              <router-link to="/extension" class="mobile-nav-link" active-class="active-mob" @click="closeAll">Extension</router-link>
            </li>

            <!-- Mobile Accordion: Research Centers -->
            <li class="mobile-accordion-item">
              <button class="accordion-trigger" @click="toggleAccordion('centers')">
                Research Centers
                <span class="accordion-caret" :class="{ rotated: mobileAccordions.centers }">▼</span>
              </button>
              <ul v-show="mobileAccordions.centers" class="accordion-menu">
                <li><router-link to="/centers" class="accordion-link font-semibold" @click="closeAll">All Research Centers →</router-link></li>
                <li><router-link to="/centers/mindoro-development" class="accordion-link" @click="closeAll">Mindoro Development &amp; Studies</router-link></li>
                <li><router-link to="/centers/digital-innovation" class="accordion-link" @click="closeAll">Digital Innovation &amp; Emerging Tech</router-link></li>
                <li><router-link to="/centers/environmental-studies" class="accordion-link" @click="closeAll">Environmental Studies</router-link></li>
                <li><router-link to="/centers/fisheries-research" class="accordion-link" @click="closeAll">Fisheries Research</router-link></li>
                <li><router-link to="/centers/mimaropa-food" class="accordion-link" @click="closeAll">MIMAROPA Food Innovation</router-link></li>
                <li><router-link to="/centers/island-education" class="accordion-link" @click="closeAll">Island Education &amp; Sustainability</router-link></li>
                <li><router-link to="/centers/peace-criminology" class="accordion-link" @click="closeAll">Peace, Criminology &amp; Law</router-link></li>
                <li><router-link to="/centers/smart-agriculture" class="accordion-link" @click="closeAll">Smart Agriculture &amp; Biosystems</router-link></li>
                <li><router-link to="/centers/textile-fiber" class="accordion-link" @click="closeAll">Natural Textile Fiber Innovation</router-link></li>
              </ul>
            </li>

            <!-- Mobile Auth Actions -->
            <li class="mobile-auth-section" v-if="user">
              <router-link to="/change-password" class="mobile-nav-link" active-class="active-mob" @click="closeAll">Change Password</router-link>
              <button @click="handleLogout" class="mobile-action-btn logout-mob-btn">Logout</button>
            </li>
            <li class="mobile-auth-section" v-else>
              <router-link to="/login" class="mobile-action-btn login-mob-btn" @click="closeAll">Login</router-link>
            </li>
          </ul>
        </nav>
      </aside>
    </transition>
  </header>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { riteLogo } from "@/data/siteData";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const route = useRoute();
const { user, logout } = useAuth();

const mobileMenuOpen = ref(false);
const activeDropdown = ref("");

const mobileAccordions = reactive({
  research: false,
  innovation: false,
  centers: false,
});

const openDropdown = (type) => {
  activeDropdown.value = type;
};

const closeDropdown = (type) => {
  if (activeDropdown.value === type) {
    activeDropdown.value = "";
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const toggleAccordion = (key) => {
  mobileAccordions[key] = !mobileAccordions[key];
};

const closeAll = () => {
  mobileMenuOpen.value = false;
  activeDropdown.value = "";
  mobileAccordions.research = false;
  mobileAccordions.innovation = false;
  mobileAccordions.centers = false;
};

const handleLogout = async () => {
  closeAll();
  await logout();
  router.push("/");
};

const isRouteActive = (path) => {
  return route.path.startsWith(path);
};

const isDropdownActive = (paths) => {
  return paths.some((p) => route.path === p);
};

const handleClickOutside = (e) => {
  if (!e.target.closest(".navbar-header")) {
    closeAll();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(9, 74, 37, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
  height: 80px;
  display: flex;
  align-items: center;
}

.navbar-container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.logo-image:hover {
  transform: scale(1.04);
}

.desktop-nav {
  display: flex;
  align-items: center;
}

.nav-links-list {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item-link:hover,
.dropdown-trigger:hover {
  color: #10b981;
  background: rgba(16, 185, 129, 0.06);
}

.active-route,
.active-trigger {
  color: #094A25 !important;
  background: rgba(9, 74, 37, 0.06) !important;
}

.dropdown-item {
  position: relative;
}

.dropdown-trigger {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  background: transparent;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
  transition: all 0.2s ease;
  text-decoration: none;
}

.arrow-icon {
  font-size: 0.75rem;
  opacity: 0.7;
  transition: transform 0.2s ease;
}

.dropdown-item:hover .arrow-icon {
  transform: translateY(1px);
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 1px solid rgba(9, 74, 37, 0.08);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  min-width: 250px;
  padding: 0.6rem;
  margin-top: 0.5rem;
  list-style: none;
  z-index: 110;
}

.centers-dropdown-panel {
  min-width: 290px;
}

.dropdown-link {
  display: block;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s ease;
}

.dropdown-link:hover {
  background: rgba(16, 185, 129, 0.08);
  color: #094A25;
  padding-left: 1.2rem;
}

.sub-link {
  padding-left: 1.8rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.sub-link:hover {
  padding-left: 2rem;
}

.auth-btn-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.2s ease;
}

.login-btn {
  background: #094A25;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(9, 74, 37, 0.15);
}

.login-btn:hover {
  background: #063018;
  transform: translateY(-1px);
}

.logout-btn {
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
}

.logout-btn:hover {
  background: #dc2626;
  color: white;
}

/* Hamburger Styles */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 120;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: #094A25;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Mobile Drawer */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 105;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: #ffffff;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  z-index: 115;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.drawer-logo {
  height: 48px;
  width: auto;
}

.close-drawer-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #374151;
  cursor: pointer;
}

.mobile-nav {
  flex: 1;
}

.mobile-links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.mobile-nav-link,
.accordion-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover,
.accordion-trigger:hover {
  background: rgba(16, 185, 129, 0.05);
  color: #094A25;
}

.active-mob {
  background: rgba(9, 74, 37, 0.06) !important;
  color: #094A25 !important;
}

.mobile-accordion-item {
  display: flex;
  flex-direction: column;
}

.accordion-caret {
  font-size: 0.7rem;
  transition: transform 0.25s ease;
  opacity: 0.7;
}

.accordion-caret.rotated {
  transform: rotate(180deg);
}

.accordion-menu {
  list-style: none;
  padding: 0.25rem 0 0.5rem 1.25rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-left: 2px solid rgba(9, 74, 37, 0.08);
  margin-left: 1.5rem;
}

.accordion-link {
  display: block;
  padding: 0.5rem 0.75rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.accordion-link:hover {
  background: rgba(16, 185, 129, 0.05);
  color: #094A25;
}

.sub-nested-link {
  padding-left: 1.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.mobile-auth-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(9, 74, 37, 0.08);
}

.mobile-action-btn {
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.login-mob-btn {
  background: #094A25;
  color: #ffffff;
}

.logout-mob-btn {
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
}

/* Animations */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-drawer-enter-active,
.slide-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-drawer-enter-from,
.slide-drawer-leave-to {
  transform: translateX(100%);
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }
  .hamburger-btn {
    display: flex;
  }
  .logo-image {
    height: 52px;
  }
  .navbar-header {
    height: 72px;
  }
}

/* Hamburger active animation */
.hamburger-active .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger-active .hamburger-line:nth-child(2) {
  opacity: 0;
}
.hamburger-active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>
