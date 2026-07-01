<template>
  <div class="admin-wrapper">
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <svg class="brand-logo-svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 9 0 4.4-3.6 8-8 8Z"></path><path d="M11 20v-9"></path></svg>
        <div class="brand-text">
          <h2>RITE Admin</h2>
          <p>Console v2.0</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <button :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect></svg> Overview
        </button>
        <button :class="{ active: activeTab === 'news' }" @click="activeTab = 'news'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M18 18h-8"></path><path d="M18 10h-8"></path></svg> News &amp; Events
        </button>
        <button :class="{ active: activeTab === 'carousel' }" @click="activeTab = 'carousel'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> Hero Carousel
        </button>
        <button :class="{ active: activeTab === 'centers' }" @click="activeTab = 'centers'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line><polygon points="12 2 20 7 4 7 12 2"></polygon></svg> 9 Research Centers
        </button>
        <button :class="{ active: activeTab === 'ecosystem' }" @click="activeTab = 'ecosystem'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> Ecosystem Directory
        </button>
        <button :class="{ active: activeTab === 'org' }" @click="activeTab = 'org'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Organizational Structure
        </button>
        <button :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Contact Messages
        </button>
        <button :class="{ active: activeTab === 'submissions' }" @click="activeTab = 'submissions'">
          <svg class="nav-svg" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Unit Submissions
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
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="admin-main">
      <header class="main-header">
        <div class="header-title">
          <h1>{{ getTabTitle() }}</h1>
          <p>Manage real-time dynamic content across Mindoro State University RITE</p>
        </div>
        <div class="header-actions">
          <router-link to="/" class="btn-preview" target="_blank">View Public Site →</router-link>
        </div>
      </header>

      <!-- TAB 1: OVERVIEW DASHBOARD -->
      <div v-if="activeTab === 'overview'" class="tab-content">
        <div class="stats-grid">
          <div class="stat-card" @click="openSubmissionsFilter('publication-printing')" style="cursor:pointer;">
            <div class="stat-icon green"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></div>
            <div class="stat-data">
              <h3>{{ pubPrintingSubmissionsCount }}</h3>
              <p>Publication &amp; Printing Submissions</p>
            </div>
          </div>
          <div class="stat-card" @click="openSubmissionsFilter('research-unit')" style="cursor:pointer;">
            <div class="stat-icon blue"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M10 2v7.31L4.75 20.25A2 2 0 0 0 6.46 23h11.08a2 2 0 0 0 1.71-2.75L14 9.31V2"></path></svg></div>
            <div class="stat-data">
              <h3>{{ researchUnitSubmissionsCount }}</h3>
              <p>Research Unit Submissions</p>
            </div>
          </div>
          <div class="stat-card" @click="openSubmissionsFilter('tech-transfer')" style="cursor:pointer;">
            <div class="stat-icon orange"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
            <div class="stat-data">
              <h3>{{ techTransferSubmissionsCount }}</h3>
              <p>Tech Transfer &amp; Patent Submissions</p>
            </div>
          </div>
          <div style="display:flex; flex-direction:column; gap:1rem; grid-column: span 1;">
            <div class="stat-card" @click="openSubmissionsFilter('centers')" style="cursor:pointer; width:100%;">
              <div class="stat-icon purple"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 20 7 4 7 12 2"></polygon><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line></svg></div>
              <div class="stat-data">
                <h3>{{ centerSubmissionsCount }}</h3>
                <p>9 Research Centers Inquiries</p>
              </div>
            </div>

            <!-- 9 RESEARCH CENTERS PERMANENT GRID DASHBOARD (ALWAYS VISIBLE & ALWAYS ALIGNED BELOW CARD 4) -->
            <div class="centers-grid-popover" style="background:#ffffff; border-radius:20px; padding:1.25rem; border:2px solid #8b5cf6; box-shadow:0 12px 30px rgba(139,92,246,0.15); width:100%; box-sizing:border-box;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; width:100%;">
                <h4 style="margin:0; font-family:'Outfit',sans-serif; color:#4c1d95; font-size:0.88rem; font-weight:800; display:flex; align-items:center; gap:0.35rem;">
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none"><polygon points="12 2 20 7 4 7 12 2"></polygon><line x1="6" y1="18" x2="6" y2="11"></line><line x1="10" y1="18" x2="10" y2="11"></line><line x1="14" y1="18" x2="14" y2="11"></line><line x1="18" y1="18" x2="18" y2="11"></line></svg> Centers Breakdown (9 Squares)
                </h4>
                <span style="font-size:0.68rem; color:#6b21a8; font-weight:700;">Click to filter</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem; justify-content:center;">
                <div
                  v-for="c in centerCountsList"
                  :key="c.slug"
                  @click="openSubmissionsFilter('center:' + c.slug)"
                  style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:12px; padding:0.5rem 0.35rem; cursor:pointer; transition:all 0.15s ease; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; aspect-ratio:1/1; box-sizing:border-box;"
                  onmouseover="this.style.background='#ede9fe'; this.style.transform='scale(1.03)'"
                  onmouseout="this.style.background='#f5f3ff'; this.style.transform='scale(1)'"
                >
                  <div style="font-size:1.4rem; font-weight:900; color:#6d28d9; font-family:'Outfit',sans-serif; line-height:1; margin-bottom:0.25rem;">{{ c.count }}</div>
                  <div style="font-size:0.68rem; font-weight:700; color:#4c1d95; line-height:1.1; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">{{ c.title }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="stat-card" @click="activeTab = 'ecosystem'" style="cursor:pointer;">
            <div class="stat-icon green"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg></div>
            <div class="stat-data">
              <h3>{{ ecosystemList.length }}</h3>
              <p>Ecosystem Partners</p>
            </div>
          </div>
          <div class="stat-card" @click="activeTab = 'org'" style="cursor:pointer;">
            <div class="stat-icon blue"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg></div>
            <div class="stat-data">
              <h3>{{ orgList.length }}</h3>
              <p>Org Structure Members</p>
            </div>
          </div>

        <div class="quick-overview-card" style="margin-top:1.5rem;">
          <h3>Welcome to RITE Central Management Console</h3>
          <p>Select any category from the left navigation bar to add, update, or remove dynamic content in real-time. All updates reflect immediately across the public website.</p>
        </div>
      </div>

      <!-- TAB 2: NEWS MANAGEMENT (WYSIWYG) -->
      <div v-if="activeTab === 'news'" class="tab-content">
        <div class="content-header">
          <h2>News &amp; Announcements catalog ({{ newsList.length }})</h2>
          <button class="btn-primary" @click="openNewsModal()">+ Add New Announcement</button>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Date</th>
                <th>Rich Content Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedNews" :key="item.id">
                <td><span class="tag-badge">{{ item.category || 'General' }}</span></td>
                <td class="font-bold">{{ item.title }}</td>
                <td>{{ item.date || 'N/A' }}</td>
                <td>
                  <div class="html-snippet" v-html="item.description"></div>
                </td>
                <td class="actions">
                  <button class="btn-sm edit" @click="openNewsModal(item)">Edit</button>
                  <button class="btn-sm delete" @click="deleteNews(item.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesNews > 1" class="admin-pagination">
            <button :disabled="pageState.news === 1" @click="pageState.news--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.news }} of {{ totalPagesNews }}</span>
            <button :disabled="pageState.news === totalPagesNews" @click="pageState.news++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>

      <!-- TAB 3: CAROUSEL SLIDES -->
      <div v-if="activeTab === 'carousel'" class="tab-content">
        <div class="content-header">
          <h2>Hero Banner Carousel Slides ({{ carouselList.length }})</h2>
          <button class="btn-primary" @click="openCarouselModal()">+ Add Hero Slide</button>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slide in paginatedCarousel" :key="slide.id">
                <td>#{{ slide.sort_order }}</td>
                <td class="font-bold">{{ slide.title }}</td>
                <td>{{ slide.description }}</td>
                <td>
                  <img v-if="slide.image" :src="slide.image" class="table-img" />
                </td>
                <td class="actions">
                  <button class="btn-sm edit" @click="openCarouselModal(slide)">Edit</button>
                  <button class="btn-sm delete" @click="deleteCarousel(slide.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesCarousel > 1" class="admin-pagination">
            <button :disabled="pageState.carousel === 1" @click="pageState.carousel--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.carousel }} of {{ totalPagesCarousel }}</span>
            <button :disabled="pageState.carousel === totalPagesCarousel" @click="pageState.carousel++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>

      <!-- TAB 4: RESEARCH CENTERS -->
      <div v-if="activeTab === 'centers'" class="tab-content">
        <div class="content-header">
          <h2>Highly Specialized Research Centers ({{ centerList.length }})</h2>
          <button class="btn-primary" @click="openCenterModal()">+ Add Research Center</button>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Contact Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="center in paginatedCenters" :key="center.id">
                <td class="font-bold">{{ center.name }}</td>
                <td><span class="tag-badge green">{{ center.category || 'Center' }}</span></td>
                <td>{{ center.contact_email || 'N/A' }}</td>
                <td class="actions">
                  <button class="btn-sm edit" @click="openCenterModal(center)">Edit</button>
                  <button class="btn-sm delete" @click="deleteCenter(center.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesCenters > 1" class="admin-pagination">
            <button :disabled="pageState.centers === 1" @click="pageState.centers--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.centers }} of {{ totalPagesCenters }}</span>
            <button :disabled="pageState.centers === totalPagesCenters" @click="pageState.centers++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>

      <!-- TAB 5: ECOSYSTEM DIRECTORY -->
      <div v-if="activeTab === 'ecosystem'" class="tab-content">
        <div class="content-header">
          <h2>RITE Ecosystem Directory Partners ({{ ecosystemList.length }})</h2>
          <button class="btn-primary" @click="openEcosystemModal()">+ Add Ecosystem Partner</button>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Partner Title</th>
                <th>Category</th>
                <th>External Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="eco in paginatedEcosystem" :key="eco.id">
                <td><img v-if="eco.image" :src="eco.image" alt="logo" class="table-img" style="object-fit:contain; background:#f8fafc;" /></td>
                <td class="font-bold">{{ eco.title }}</td>
                <td><span class="tag-badge purple">{{ eco.category || 'Partner' }}</span></td>
                <td><a :href="eco.link" target="_blank" class="table-link">{{ eco.link }}</a></td>
                <td class="actions">
                  <button class="btn-sm edit" @click="openEcosystemModal(eco)">Edit</button>
                  <button class="btn-sm delete" @click="deleteEcosystem(eco.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesEcosystem > 1" class="admin-pagination">
            <button :disabled="pageState.ecosystem === 1" @click="pageState.ecosystem--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.ecosystem }} of {{ totalPagesEcosystem }}</span>
            <button :disabled="pageState.ecosystem === totalPagesEcosystem" @click="pageState.ecosystem++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>

      <!-- TAB 6: ORGANIZATIONAL STRUCTURE -->
      <div v-if="activeTab === 'org'" class="tab-content">
        <div class="content-header">
          <h2>Organizational Structure Members ({{ orgList.length }})</h2>
          <button class="btn-primary" @click="openOrgModal()">+ Add Org Member</button>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Title / Designation</th>
                <th>Division</th>
                <th>Role Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in paginatedOrg" :key="m.id">
                <td class="font-bold">{{ m.name }}</td>
                <td>{{ m.title }}</td>
                <td>{{ m.division }}</td>
                <td><span class="tag-badge blue">{{ m.role_type }}</span></td>
                <td class="actions">
                  <button class="btn-sm edit" @click="openOrgModal(m)">Edit</button>
                  <button class="btn-sm delete" @click="deleteOrg(m.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesOrg > 1" class="admin-pagination">
            <button :disabled="pageState.org === 1" @click="pageState.org--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.org }} of {{ totalPagesOrg }}</span>
            <button :disabled="pageState.org === totalPagesOrg" @click="pageState.org++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>

      <!-- TAB 7: CONTACT MESSAGES -->
      <div v-if="activeTab === 'contact'" class="tab-content">
        <div class="content-header">
          <h2>Contact Inquiries &amp; Submissions ({{ contactList.length }})</h2>
        </div>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Sender Name</th>
                <th>Email Address</th>
                <th>Subject</th>
                <th>Message Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="msg in paginatedContact" :key="msg.id">
                <td class="font-bold">{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.subject || 'No Subject' }}</td>
                <td>{{ msg.message }}</td>
                <td class="actions">
                  <button class="btn-sm delete" @click="deleteContact(msg.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesContact > 1" class="admin-pagination">
            <button :disabled="pageState.contact === 1" @click="pageState.contact--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.contact }} of {{ totalPagesContact }}</span>
            <button :disabled="pageState.contact === totalPagesContact" @click="pageState.contact++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>

      <!-- TAB 8: UNIT & CENTER SUBMISSIONS -->
      <div v-if="activeTab === 'submissions'" class="tab-content">
        <div class="content-header" style="display:flex; flex-direction:column; align-items:flex-start; gap:1rem;">
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
            <h2>Submissions &amp; Inquiries Console ({{ filteredSubmissions.length }})</h2>
          </div>
          
          <!-- PRIMARY UNIT TABS -->
          <div class="unit-filter-tabs" style="display:flex; gap:0.5rem; flex-wrap:wrap; width:100%; border-bottom:2px solid #e2e8f0; padding-bottom:0.75rem;">
            <button
              :class="['unit-tab-btn', { active: submissionFilter === 'all' }]"
              @click="submissionFilter = 'all'"
              style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
              :style="submissionFilter === 'all' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
            >
              All Submissions ({{ submissionList.length }})
            </button>
            <button
              :class="['unit-tab-btn', { active: submissionFilter === 'publication-printing' }]"
              @click="submissionFilter = 'publication-printing'"
              style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
              :style="submissionFilter === 'publication-printing' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
            >
              Publication &amp; Printing Unit ({{ pubPrintingSubmissionsCount }})
            </button>
            <button
              :class="['unit-tab-btn', { active: submissionFilter === 'research-unit' }]"
              @click="submissionFilter = 'research-unit'"
              style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
              :style="submissionFilter === 'research-unit' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
            >
              Research Unit ({{ researchUnitSubmissionsCount }})
            </button>
            <button
              :class="['unit-tab-btn', { active: submissionFilter === 'tech-transfer' }]"
              @click="submissionFilter = 'tech-transfer'"
              style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
              :style="submissionFilter === 'tech-transfer' ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
            >
              Tech Transfer &amp; Patent ({{ techTransferSubmissionsCount }})
            </button>
            <button
              :class="['unit-tab-btn', { active: submissionFilter === 'centers' || submissionFilter.startsWith('center:') }]"
              @click="submissionFilter = 'centers'"
              style="padding:0.6rem 1.25rem; border-radius:999px; font-weight:800; font-size:0.88rem; border:none; cursor:pointer; transition:all 0.2s ease;"
              :style="submissionFilter === 'centers' || submissionFilter.startsWith('center:') ? 'background:#094A25; color:#ffffff;' : 'background:#f1f5f9; color:#475569;'"
            >
              All 9 Centers ({{ centerSubmissionsCount }})
            </button>
          </div>

          <!-- SECONDARY SUB-TABS FOR EACH SPECIFIC CENTER -->
          <div v-if="submissionFilter === 'centers' || submissionFilter.startsWith('center:')" class="centers-sub-pills-bar" style="display:flex; gap:0.4rem; flex-wrap:wrap; background:#f8fafc; padding:0.75rem 1rem; border-radius:14px; border:1px solid #e2e8f0; width:100%;">
            <span style="font-weight:800; font-size:0.82rem; color:#094A25; display:flex; align-items:center; margin-right:0.5rem;">Filter Each Center:</span>
            <button
              v-for="c in centerCountsList"
              :key="c.slug"
              @click="submissionFilter = 'center:' + c.slug"
              style="padding:0.35rem 0.85rem; border-radius:8px; font-weight:700; font-size:0.78rem; border:1px solid #cbd5e1; cursor:pointer; transition:all 0.2s ease;"
              :style="submissionFilter === 'center:' + c.slug ? 'background:#8b5cf6; color:#ffffff; border-color:#8b5cf6;' : 'background:#ffffff; color:#334155;'"
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
              <tr v-for="sub in paginatedSubmissions" :key="sub.id">
                <td><span class="tag-badge green">{{ sub.target_unit }}</span></td>
                <td>
                  <div class="font-bold">{{ sub.sender_name }}</div>
                  <div style="font-size:0.8rem; color:#64748b;">{{ sub.email }} | {{ sub.phone || 'No phone' }}</div>
                </td>
                <td class="font-bold">{{ sub.subject }}</td>
                <td>
                  <div class="html-snippet" style="max-width:200px;">{{ sub.message }}</div>
                  <div v-if="sub.file_path" style="margin-top:0.4rem;">
                    <a :href="sub.file_path" target="_blank" download style="color:#059669; font-weight:700; font-size:0.85rem; text-decoration:underline;">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:4px; vertical-align:middle;"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg> Download {{ sub.file_name || 'Attachment' }}
                    </a>
                  </div>
                  <span v-else style="font-size:0.75rem; color:#94a3b8;">No file attached</span>
                </td>
                <td>
                  <span class="tag-badge" :class="sub.status === 'completed' ? 'green' : sub.status === 'reviewed' ? 'blue' : 'purple'">
                    {{ sub.status }}
                  </span>
                </td>
                <td class="actions">
                  <button class="btn-sm edit" @click="toggleSubmissionStatus(sub)">Toggle Status</button>
                  <button class="btn-sm delete" @click="deleteSubmission(sub.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="totalPagesSubmissions > 1" class="admin-pagination">
            <button :disabled="pageState.submissions === 1" @click="pageState.submissions--" class="btn-sm page-btn">← Prev</button>
            <span class="admin-page-info">Page {{ pageState.submissions }} of {{ totalPagesSubmissions }}</span>
            <button :disabled="pageState.submissions === totalPagesSubmissions" @click="pageState.submissions++" class="btn-sm page-btn">Next →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- UNIVERSAL MODAL DIALOG WITH WYSIWYG EDITOR -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        <form @submit.prevent="saveForm" class="modal-form">
          <!-- NEWS FORM WITH WYSIWYG -->
          <div v-if="activeTab === 'news'">
            <div class="form-row">
              <div class="form-group">
                <label>Title</label>
                <input v-model="form.title" required type="text" placeholder="Announcement title..." />
              </div>
              <div class="form-group">
                <label>Category</label>
                <input v-model="form.category" type="text" placeholder="e.g. Announcement, Event" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Date String</label>
                <input v-model="form.date" type="text" placeholder="e.g. June 5 - 6, 2026" />
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input v-model="form.image" type="text" placeholder="/globalislands.jpg or https://..." />
              </div>
            </div>

            <!-- WYSIWYG TOOLBAR & EDITOR -->
            <div class="form-group">
              <label>Rich Content (WYSIWYG Editor)</label>
              <div class="wysiwyg-toolbar">
                <button type="button" @click="applyWysiwyg('b')" title="Bold"><b>B</b></button>
                <button type="button" @click="applyWysiwyg('i')" title="Italic"><i>I</i></button>
                <button type="button" @click="applyWysiwyg('h2')" title="Heading 2">H2</button>
                <button type="button" @click="applyWysiwyg('h3')" title="Heading 3">H3</button>
                <button type="button" @click="applyWysiwyg('p')" title="Paragraph">P</button>
                <button type="button" @click="applyWysiwyg('ul')" title="Bullet List">• List</button>
              </div>
              <textarea v-model="form.description" rows="6" placeholder="Write news description with HTML/WYSIWYG tags..." class="wysiwyg-textarea"></textarea>
            </div>
          </div>

          <!-- CAROUSEL FORM -->
          <div v-if="activeTab === 'carousel'">
            <div class="form-group">
              <label>Slide Title</label>
              <input v-model="form.title" required type="text" />
            </div>
            <div class="form-group">
              <label>Sort Order Number</label>
              <input v-model.number="form.sort_order" type="number" />
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <input v-model="form.image" type="text" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="form.description" rows="3"></textarea>
            </div>
          </div>

          <!-- CENTERS FORM -->
          <div v-if="activeTab === 'centers'">
            <div class="form-group">
              <label>Research Center Name</label>
              <input v-model="form.name" required type="text" />
            </div>
            <div class="form-group">
              <label>Category</label>
              <input v-model="form.category" type="text" />
            </div>
            <div class="form-group">
              <label>Contact Email</label>
              <input v-model="form.contact_email" type="email" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="form.description" rows="3"></textarea>
            </div>
          </div>

          <!-- ECOSYSTEM FORM -->
          <div v-if="activeTab === 'ecosystem'">
            <div class="form-group">
              <label>Partner Title</label>
              <input v-model="form.title" required type="text" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Category (gov, academic, etc)</label>
                <input v-model="form.category" type="text" placeholder="gov, academic..." />
              </div>
              <div class="form-group">
                <label>Logo / Image Dropdown *</label>
                <select v-model="form.image" style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;">
                  <option value="">-- Select Available Logo --</option>
                  <option value="https://tucst.edu.vn/icon/logo_dhvh.jpg">Thanh Hoa University Logo</option>
                  <option value="https://file.vnua.edu.vn/data/6/images/2019/08/14/host/logo.png">VNUA Logo</option>
                  <option value="https://www.um.edu.my/images/img-logo-UM.png">Universiti Malaya Logo</option>
                  <option value="/ecosystem/SIU_logo_Head.png">Shinawatra University Logo</option>
                  <option value="/ecosystem/national Research.png">National Research Council Logo</option>
                  <option value="https://acef.da.gov.ph/wp-content/uploads/2018/03/DA-Logo.png">Department of Agriculture Logo</option>
                  <option value="/ecosystem/dost_mimaropa.png">DOST MIMAROPA Logo</option>
                  <option value="/ecosystem/BatStateU-NEU-Logo.png">BatStateU Logo</option>
                  <option value="/ecosystem/mapua.png">Mapua Logo</option>
                  <option value="/ecosystem/nu-logo.webp">NU Sports Academy Logo</option>
                  <option value="/ecosystem/upd-logo-2021.jpg">UP Diliman Logo</option>
                  <option value="https://www.ust.edu.ph/wp-content/uploads/2019/07/logoustb.png">UST Logo</option>
                  <option value="/ecosystem/mansalay.png">Mansalay LGU Logo</option>
                  <option value="/ecosystem/Calapan_City_Logo-1.png">Calapan City Logo</option>
                  <option value="/ecosystem/DENR-IV-A-CALABARZON.png">DENR CENRO Logo</option>
                  <option value="/ecosystem/cropped-PGOM-100x100.png">PGOM Logo</option>
                  <option value="/ecosystem/DSWD.png">DSWD Logo</option>
                  <option value="/ecosystem/DAR.png">DAR Logo</option>
                  <option value="/ecosystem/DTI.jpg">DTI Logo</option>
                </select>
                <input v-model="form.image" type="text" placeholder="Or enter custom URL..." style="margin-top:0.4rem; font-size:0.85rem;" />
              </div>
            </div>
            <div class="form-group">
              <label>External Website Link</label>
              <input v-model="form.link" type="text" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="form.description" rows="2"></textarea>
            </div>
          </div>

          <!-- ORG MEMBER FORM -->
          <div v-if="activeTab === 'org'">
            <div class="form-group">
              <label>Member / Unit Name</label>
              <input v-model="form.name" required type="text" />
            </div>
            <div class="form-group">
              <label>Title / Designation</label>
              <input v-model="form.title" required type="text" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Division</label>
                <select v-model="form.division" style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;">
                  <option value="Executive Leadership">Executive Leadership</option>
                  <option value="Research & Publication">Research &amp; Publication</option>
                  <option value="Research Centers">Research Centers</option>
                  <option value="Extension Division">Extension Division</option>
                </select>
              </div>
              <div class="form-group">
                <label>Role Type</label>
                <select v-model="form.role_type" style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;">
                  <option value="executive_top">Top Executive</option>
                  <option value="executive">Executive</option>
                  <option value="support">Support</option>
                  <option value="node">Office Node</option>
                </select>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary">Save Content</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { newsService } from '@/services/newsService';
import { carouselService } from '@/services/carouselService';
import { centerService } from '@/services/centerService';
import { contactService } from '@/services/contactService';
import { ecosystemService } from '@/services/ecosystemService';
import { orgService } from '@/services/orgService';
import { submissionService } from '@/services/submissionService';

const router = useRouter();
const { logout } = useAuth();

const activeTab = ref('overview');
const newsList = ref([]);
const carouselList = ref([]);
const centerList = ref([]);
const contactList = ref([]);
const ecosystemList = ref([]);
const orgList = ref([]);
const submissionList = ref([]);
const submissionFilter = ref('all');
const showCentersGridHover = ref(false);

const pubPrintingSubmissionsCount = computed(() => submissionList.value.filter(s => s.target_unit === 'publication-printing').length);
const researchUnitSubmissionsCount = computed(() => submissionList.value.filter(s => s.target_unit === 'research-unit').length);
const techTransferSubmissionsCount = computed(() => submissionList.value.filter(s => s.target_unit === 'tech-transfer').length);
const centerSubmissionsCount = computed(() => submissionList.value.filter(s => s.target_unit && s.target_unit.startsWith('center:')).length);

const centerCountsList = computed(() => [
  { slug: 'mindoro-development', title: 'Mindoro Development', count: submissionList.value.filter(s => s.target_unit === 'center:mindoro-development').length },
  { slug: 'digital-innovation', title: 'Digital Innovation & Cybersecurity', count: submissionList.value.filter(s => s.target_unit === 'center:digital-innovation').length },
  { slug: 'environmental-studies', title: 'Environmental Studies', count: submissionList.value.filter(s => s.target_unit === 'center:environmental-studies').length },
  { slug: 'fisheries-research', title: 'Fisheries R&D', count: submissionList.value.filter(s => s.target_unit === 'center:fisheries-research').length },
  { slug: 'mimaropa-food', title: 'MIMAROPA Food Innovation', count: submissionList.value.filter(s => s.target_unit === 'center:mimaropa-food').length },
  { slug: 'island-education', title: 'Island Education', count: submissionList.value.filter(s => s.target_unit === 'center:island-education').length },
  { slug: 'peace-criminology', title: 'Peace, Criminology & Law', count: submissionList.value.filter(s => s.target_unit === 'center:peace-criminology').length },
  { slug: 'smart-agriculture', title: 'Smart Agriculture & Biosystems', count: submissionList.value.filter(s => s.target_unit === 'center:smart-agriculture').length },
  { slug: 'textile-fiber', title: 'Natural Textile Fiber', count: submissionList.value.filter(s => s.target_unit === 'center:textile-fiber').length },
]);

const filteredSubmissions = computed(() => {
  if (submissionFilter.value === 'all') return submissionList.value;
  if (submissionFilter.value === 'centers') return submissionList.value.filter(s => s.target_unit && s.target_unit.startsWith('center:'));
  return submissionList.value.filter(s => s.target_unit === submissionFilter.value);
});

const openSubmissionsFilter = (filterKey) => {
  submissionFilter.value = filterKey;
  activeTab.value = 'submissions';
};

// Pagination State (10 items per page)
const pageState = ref({ news: 1, carousel: 1, centers: 1, ecosystem: 1, org: 1, contact: 1, submissions: 1 });
const perPage = 10;

const paginatedNews = computed(() => newsList.value.slice((pageState.value.news - 1) * perPage, pageState.value.news * perPage));
const totalPagesNews = computed(() => Math.ceil(newsList.value.length / perPage) || 1);

const paginatedCarousel = computed(() => carouselList.value.slice((pageState.value.carousel - 1) * perPage, pageState.value.carousel * perPage));
const totalPagesCarousel = computed(() => Math.ceil(carouselList.value.length / perPage) || 1);

const paginatedCenters = computed(() => centerList.value.slice((pageState.value.centers - 1) * perPage, pageState.value.centers * perPage));
const totalPagesCenters = computed(() => Math.ceil(centerList.value.length / perPage) || 1);

const paginatedEcosystem = computed(() => ecosystemList.value.slice((pageState.value.ecosystem - 1) * perPage, pageState.value.ecosystem * perPage));
const totalPagesEcosystem = computed(() => Math.ceil(ecosystemList.value.length / perPage) || 1);

const paginatedOrg = computed(() => orgList.value.slice((pageState.value.org - 1) * perPage, pageState.value.org * perPage));
const totalPagesOrg = computed(() => Math.ceil(orgList.value.length / perPage) || 1);

const paginatedContact = computed(() => contactList.value.slice((pageState.value.contact - 1) * perPage, pageState.value.contact * perPage));
const totalPagesContact = computed(() => Math.ceil(contactList.value.length / perPage) || 1);

const paginatedSubmissions = computed(() => filteredSubmissions.value.slice((pageState.value.submissions - 1) * perPage, pageState.value.submissions * perPage));
const totalPagesSubmissions = computed(() => Math.ceil(filteredSubmissions.value.length / perPage) || 1);

const showModal = ref(false);
const modalTitle = ref('');
const editingId = ref(null);
const form = ref({});

const getTabTitle = () => {
  const titles = {
    overview: 'Console Dashboard Overview',
    news: 'Manage News & Announcements (WYSIWYG)',
    carousel: 'Manage Hero Carousel Slides',
    centers: 'Manage 9 Highly Specialized Research Centers',
    ecosystem: 'Manage RITE Ecosystem Directory',
    org: 'Manage Organizational Structure',
    contact: 'Manage Received Contact Messages',
    submissions: 'Manage Research, Printing & Center Submissions'
  };
  return titles[activeTab.value] || 'Admin Console';
};

const loadAll = async () => {
  try { newsList.value = await newsService.getAll(); } catch(e) {}
  try { carouselList.value = await carouselService.getAll(); } catch(e) {}
  try { centerList.value = await centerService.getAll(); } catch(e) {}
  try { contactList.value = await contactService.getAll(); } catch(e) {}
  try { ecosystemList.value = await ecosystemService.getAll(); } catch(e) {}
  try { orgList.value = await orgService.getAll(); } catch(e) {}
  try { submissionList.value = await submissionService.getAll(); } catch(e) {}
};

const deleteSubmission = async (id) => {
  if (confirm('Are you sure you want to delete this submission and its attached file?')) {
    try {
      await submissionService.delete(id);
      await loadAll();
    } catch (e) {
      alert('Failed to delete submission.');
    }
  }
};

const toggleSubmissionStatus = async (sub) => {
  const nextStatus = sub.status === 'pending' ? 'reviewed' : sub.status === 'reviewed' ? 'completed' : 'pending';
  try {
    await submissionService.updateStatus(sub.id, nextStatus);
    await loadAll();
  } catch (e) {
    alert('Failed to update status.');
  }
};

onMounted(loadAll);

const handleLogout = async () => {
  await logout();
  router.push({ name: 'Login' });
};

// WYSIWYG Helper
const applyWysiwyg = (tag) => {
  const current = form.value.description || '';
  if (tag === 'b') form.value.description = current + '<strong>bold text</strong>';
  else if (tag === 'i') form.value.description = current + '<em>italic text</em>';
  else if (tag === 'h2') form.value.description = current + '<h2>Subheading Title</h2>';
  else if (tag === 'h3') form.value.description = current + '<h3>Section Header</h3>';
  else if (tag === 'p') form.value.description = current + '<p>Paragraph text here...</p>';
  else if (tag === 'ul') form.value.description = current + '<ul>\n  <li>List item 1</li>\n  <li>List item 2</li>\n</ul>';
};

// Modals
const openNewsModal = (item = null) => {
  editingId.value = item ? item.id : null;
  modalTitle.value = item ? 'Edit News Announcement' : 'Add New News Announcement';
  form.value = item ? { ...item } : { title: '', category: 'Announcement', date: '', description: '', image: '' };
  showModal.value = true;
};

const openCarouselModal = (slide = null) => {
  editingId.value = slide ? slide.id : null;
  modalTitle.value = slide ? 'Edit Hero Slide' : 'Add Hero Slide';
  form.value = slide ? { ...slide } : { title: '', description: '', image: '', sort_order: 1 };
  showModal.value = true;
};

const openCenterModal = (center = null) => {
  editingId.value = center ? center.id : null;
  modalTitle.value = center ? 'Edit Research Center' : 'Add Research Center';
  form.value = center ? { ...center } : { name: '', category: '', contact_email: '', description: '' };
  showModal.value = true;
};

const openEcosystemModal = (item = null) => {
  editingId.value = item ? item.id : null;
  modalTitle.value = item ? 'Edit Ecosystem Partner' : 'Add Ecosystem Partner';
  form.value = item ? { ...item } : { title: '', category: 'gov', description: '', link: '', image: '' };
  showModal.value = true;
};

const openOrgModal = (member = null) => {
  editingId.value = member ? member.id : null;
  modalTitle.value = member ? 'Edit Org Member' : 'Add Org Member';
  form.value = member ? { ...member } : { name: '', title: '', division: 'Research & Publication', role_type: 'node' };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingId.value = null;
  form.value = {};
};

const saveForm = async () => {
  try {
    if (activeTab.value === 'news') {
      if (editingId.value) await newsService.update(editingId.value, form.value);
      else await newsService.create(form.value);
    } else if (activeTab.value === 'carousel') {
      if (editingId.value) await carouselService.update(editingId.value, form.value);
      else await carouselService.create(form.value);
    } else if (activeTab.value === 'centers') {
      if (editingId.value) await centerService.update(editingId.value, form.value);
      else await centerService.create(form.value);
    } else if (activeTab.value === 'ecosystem') {
      if (editingId.value) await ecosystemService.update(editingId.value, form.value);
      else await ecosystemService.create(form.value);
    } else if (activeTab.value === 'org') {
      if (editingId.value) await orgService.update(editingId.value, form.value);
      else await orgService.create(form.value);
    }
    closeModal();
    await loadAll();
  } catch(e) {
    alert("Error saving record to Laravel backend.");
  }
};

const deleteNews = async (id) => { if (confirm("Delete news item?")) { await newsService.delete(id); loadAll(); } };
const deleteCarousel = async (id) => { if (confirm("Delete slide?")) { await carouselService.delete(id); loadAll(); } };
const deleteCenter = async (id) => { if (confirm("Delete center?")) { await centerService.delete(id); loadAll(); } };
const deleteEcosystem = async (id) => { if (confirm("Delete ecosystem partner?")) { await ecosystemService.delete(id); loadAll(); } };
const deleteOrg = async (id) => { if (confirm("Delete org member?")) { await orgService.delete(id); loadAll(); } };
const deleteContact = async (id) => { if (confirm("Delete inquiry?")) { await contactService.delete(id); loadAll(); } };
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Sidebar */
.admin-sidebar {
  width: 280px;
  background: #063018;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.05);
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
.brand-text h2 { margin: 0; font-family: 'Outfit', sans-serif; font-size: 1.25rem; }
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

/* Main Layout */
.admin-main { flex: 1; padding: 2.5rem; overflow-y: auto; }
.main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.header-title h1 { font-family: 'Outfit', sans-serif; margin: 0 0 0.25rem 0; color: #0f172a; font-size: 1.8rem; }
.header-title p { margin: 0; color: #64748b; font-size: 0.9rem; }
.btn-preview { background: #ffffff; color: #094A25; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; text-decoration: none; }

/* Dashboard Cards */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.stat-card { background: #fff; padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1.25rem; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.stat-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.stat-icon.green { background: #dcfce7; }
.stat-icon.blue { background: #dbeafe; }
.stat-icon.purple { background: #f3e8ff; }
.stat-icon.orange { background: #ffedd5; }
.stat-data h3 { margin: 0; font-size: 1.8rem; color: #0f172a; }
.stat-data p { margin: 0; font-size: 0.85rem; color: #64748b; }

.quick-overview-card { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.quick-overview-card h3 { margin: 0 0 0.75rem 0; color: #094A25; }

/* Data Tables */
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.table-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.data-table { width: 100%; border-collapse: collapse; text-align: left; }
.data-table th, .data-table td { padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }
.data-table th { background: #f8fafc; color: #475569; font-size: 0.85rem; text-transform: uppercase; }
.tag-badge { background: #e2e8f0; color: #334155; padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; }
.tag-badge.green { background: #dcfce7; color: #166534; }
.tag-badge.purple { background: #f3e8ff; color: #6b21a8; }
.tag-badge.blue { background: #dbeafe; color: #1e40af; }

.html-snippet { max-width: 250px; max-height: 60px; overflow: hidden; font-size: 0.8rem; opacity: 0.8; }
.table-img { width: 50px; height: 35px; object-fit: cover; border-radius: 4px; }
.btn-primary { background: #094A25; color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
.btn-sm { padding: 0.35rem 0.7rem; border-radius: 6px; border: none; font-weight: 700; cursor: pointer; margin-right: 0.4rem; }
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

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15,23,42,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: #fff; width: 100%; max-width: 650px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
.modal-header { padding: 1.25rem 1.5rem; background: #094A25; color: #fff; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 1.15rem; }
.modal-close { background: transparent; border: none; color: #fff; font-size: 1.2rem; cursor: pointer; }
.modal-form { padding: 1.5rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; margin-bottom: 0.4rem; font-weight: 700; color: #334155; font-size: 0.85rem; }
.form-group input, .form-group textarea { width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 8px; font-family: inherit; }

/* WYSIWYG Styling */
.wysiwyg-toolbar { display: flex; gap: 0.4rem; background: #f1f5f9; padding: 0.4rem; border-radius: 8px 8px 0 0; border: 1px solid #cbd5e1; border-bottom: none; }
.wysiwyg-toolbar button { background: #fff; border: 1px solid #cbd5e1; padding: 0.3rem 0.6rem; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 0.8rem; }
.wysiwyg-textarea { border-radius: 0 0 8px 8px !important; }

.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }
.btn-cancel { background: #f1f5f9; color: #475569; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
</style>
