<template>
  <div class="admin-wrapper">
    <!-- Sidebar Navigation -->
    <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>
    <aside class="admin-sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
        <svg class="brand-logo-svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.12 2 9 0 4.4-3.6 8-8 8Z"></path><path d="M11 20v-9"></path></svg>
        <div class="brand-text">
          <h2>MinSU RITE</h2>
          <p>Intelligence System</p>
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
        <button :class="{ active: activeTab === 'manage-public-homepage' }" @click="activeTab = 'manage-public-homepage'">
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
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="admin-main">
      <header v-if="activeTab !== 'overview'" class="main-header">
        <button class="sidebar-toggle" type="button" @click="sidebarOpen = true" aria-label="Open navigation">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div class="header-title">
          <h1>{{ getTabTitle() }}</h1>
          <p>Manage real-time dynamic content across Mindoro State University RITE</p>
        </div>
        <div class="header-actions">
          <router-link to="/" class="btn-preview" target="_blank">View Public Site →</router-link>
        </div>
      </header>

      <!-- TAB 1: INSTITUTIONAL OVERVIEW DASHBOARD -->
      <div v-if="activeTab === 'overview'" class="tab-content overview-tab">
        <div class="overview-topbar">
          <div class="overview-topbar-left">
            <h1 class="overview-title">OVERVIEW</h1>
            <p class="overview-tagline">Real-time decision support across Mindoro State University RITE</p>
          </div>
          <div class="overview-topbar-right">
            <button class="sidebar-toggle" type="button" @click="sidebarOpen = true" aria-label="Open navigation">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span class="overview-date">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {{ todayFormatted }}
            </span>
            <router-link to="/" class="btn-preview overview-site-btn" target="_blank">View Public Site →</router-link>
          </div>
        </div>

        <div class="metric-grid">
          <button
            v-for="metric in overviewMetrics"
            :key="metric.id"
            type="button"
            class="metric-card"
            :title="`View ${metric.subtitle}`"
            @click="metric.onClick()"
          >
            <span class="metric-card-action">View details →</span>
            <div class="metric-card-head">
              <div class="metric-icon" :class="metric.tone">
                <span class="metric-icon-svg" v-html="metric.icon"></span>
              </div>
              <span class="metric-label">{{ metric.label }}</span>
            </div>
            <div class="metric-value">{{ metric.value }}</div>
            <div class="metric-sub">{{ metric.subtitle }}</div>
            <div v-if="metric.trend !== null" class="metric-trend">
              <span class="trend-up">↑ {{ metric.trend }}%</span>
              <span class="trend-period">{{ metric.trendLabel }}</span>
            </div>
          </button>
        </div>

        <div class="charts-row">
          <div class="chart-card">
            <h3 class="chart-title">Submission Status</h3>
            <div class="chart-body donut-layout">
              <div class="donut-wrap">
                <div class="donut-chart" :style="{ background: donutGradient }">
                  <div class="donut-hole">
                    <strong>{{ submissionList.length }}</strong>
                    <span>Total</span>
                  </div>
                </div>
              </div>
              <ul class="donut-legend">
                <li v-for="seg in projectStatusSegments" :key="seg.label">
                  <span class="legend-dot" :style="{ background: seg.color }"></span>
                  <span class="legend-label">{{ seg.label }}</span>
                  <span class="legend-pct">{{ seg.pct }}%</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="chart-card chart-card-wide">
            <h3 class="chart-title">Activity Trend (Submissions per Quarter)</h3>
            <div class="chart-body">
              <div class="bar-chart">
                <div v-for="bar in fundingBars" :key="bar.label" class="bar-col">
                  <div class="bar-track">
                    <div class="bar-fill" :style="{ height: bar.pct + '%' }">
                      <span v-if="bar.isPeak" class="bar-peak-label">{{ bar.display }}</span>
                    </div>
                  </div>
                  <span class="bar-label">{{ bar.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="centers-panel">
          <div class="centers-panel-head">
            <h3>9 Research Centers — Inquiry Breakdown</h3>
            <button type="button" class="centers-view-all" @click="openSubmissionsFilter('centers')">View all center submissions →</button>
          </div>
          <div class="centers-mini-grid">
            <button
              v-for="c in centerCountsList"
              :key="c.slug"
              type="button"
              class="center-mini-card"
              @click="openSubmissionsFilter('center:' + c.slug)"
            >
              <span class="center-mini-count">{{ c.count }}</span>
              <span class="center-mini-title">{{ c.title }}</span>
            </button>
          </div>
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
                    <button type="button" class="btn-link-preview" @click="openFilePreview(sub)">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:4px; vertical-align:middle;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      Preview {{ sub.file_name || 'Attachment' }}
                    </button>
                  </div>
                  <span v-else style="font-size:0.75rem; color:#94a3b8;">No file attached</span>
                </td>
                <td>
                  <span class="tag-badge" :class="submissionStatusBadgeClass(sub.status)">
                    {{ submissionStatusLabel(sub.status) }}
                  </span>
                </td>
                <td class="actions">
                  <button class="btn-sm edit" @click="openStatusModal(sub)">Update Status</button>
                  <button class="btn-sm delete" @click="deleteSubmission(sub.id)">Archive</button>
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

      <!-- TAB: MANAGE PUBLIC HOMEPAGE -->
      <div v-if="activeTab === 'manage-public-homepage'" class="tab-content">
        <ManagePublicHomepage />
      </div>
    </div>

    <!-- UNIVERSAL MODAL DIALOG WITH WYSIWYG EDITOR -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" :class="{ 'modal-content--wide': activeTab === 'news' }">
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button class="modal-close" @click="closeModal">✕</button>
        </div>
        <form @submit.prevent="saveForm" class="modal-form">
          <!-- NEWS FORM WITH ARTICLE EDITOR -->
          <div v-if="activeTab === 'news'">
            <ArticleEditor
              v-model:title="form.title"
              v-model:category="form.category"
              v-model:tags="form.tags"
              v-model:date-iso="form.dateIso"
              v-model:image="form.image"
              v-model:link="form.link"
              v-model:description="form.description"
            />
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
              <label>Slide Image</label>
              <ImageUploadField v-model="form.image" />
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
              <label>Center Image</label>
              <ImageUploadField v-model="form.image" />
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
                <label>Partner Logo</label>
                <ImageUploadField v-model="form.image" :preset-urls="ecosystemPresetUrls" />
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

    <!-- SUBMISSION STATUS WORKFLOW MODAL -->
    <div v-if="showStatusModal" class="modal-overlay" @click.self="closeStatusModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Update Submission Status</h3>
          <button class="modal-close" @click="closeStatusModal">✕</button>
        </div>
        <form @submit.prevent="submitStatusUpdate" class="modal-form">
          <div v-if="statusTarget" class="status-summary">
            <p><strong>Sender:</strong> {{ statusTarget.sender_name }} ({{ statusTarget.email }})</p>
            <p><strong>Subject:</strong> {{ statusTarget.subject }}</p>
            <p><strong>Unit:</strong> {{ statusTarget.target_unit }}</p>
            <p>
              <strong>Current status:</strong>
              <span class="tag-badge" :class="submissionStatusBadgeClass(statusTarget.status)">
                {{ submissionStatusLabel(statusTarget.status) }}
              </span>
            </p>
          </div>
          <div class="form-group">
            <label>New Status</label>
            <select v-model="statusForm.newStatus" required style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;">
              <option v-for="opt in SUBMISSION_STATUSES" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Message to Sender <span style="color:#dc2626;">*</span></label>
            <textarea v-model="statusForm.adminNote" rows="4" required placeholder="Write an update or comment that will be emailed to the sender..." style="width:100%; padding:0.65rem; border:1px solid #cbd5e1; border-radius:8px;"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="closeStatusModal">Cancel</button>
            <button type="submit" class="btn-primary">Send Update &amp; Save</button>
          </div>
        </form>
      </div>
    </div>

    <FilePreviewModal
      :visible="previewFile.show"
      :file-path="previewFile.path"
      :file-name="previewFile.name"
      @close="previewFile.show = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { newsService } from '@/services/newsService';
import { carouselService } from '@/services/carouselService';
import { centerService } from '@/services/centerService';
import { contactService } from '@/services/contactService';
import { ecosystemService } from '@/services/ecosystemService';
import { orgService } from '@/services/orgService';
import { submissionService } from '@/services/submissionService';
import {
  SUBMISSION_STATUSES,
  submissionStatusLabel,
  submissionStatusBadgeClass,
  SUBMISSION_STATUS_COLORS,
} from '@/constants/submissionStatuses';
import ArticleEditor from '@/components/ArticleEditor.vue';
import ImageUploadField from '@/components/ImageUploadField.vue';
import FilePreviewModal from '@/components/FilePreviewModal.vue';
import ManagePublicHomepage from '@/components/publicHomepage/ManagePublicHomepage.vue';

const ecosystemPresetUrls = [
  'https://tucst.edu.vn/icon/logo_dhvh.jpg',
  'https://file.vnua.edu.vn/data/6/images/2019/08/14/host/logo.png',
  'https://www.um.edu.my/images/img-logo-UM.png',
  '/ecosystem/SIU_logo_Head.png',
  '/ecosystem/national Research.png',
  'https://acef.da.gov.ph/wp-content/uploads/2018/03/DA-Logo.png',
  '/ecosystem/dost_mimaropa.png',
  '/ecosystem/BatStateU-NEU-Logo.png',
  '/ecosystem/mapua.png',
  '/ecosystem/nu-logo.webp',
  '/ecosystem/upd-logo-2021.jpg',
  'https://www.ust.edu.ph/wp-content/uploads/2019/07/logoustb.png',
  '/ecosystem/mansalay.png',
  '/ecosystem/Calapan_City_Logo-1.png',
  '/ecosystem/DENR-IV-A-CALABARZON.png',
  '/ecosystem/cropped-PGOM-100x100.png',
  '/ecosystem/DSWD.png',
  '/ecosystem/DAR.png',
  '/ecosystem/DTI.jpg',
];

const router = useRouter();
const { logout } = useAuth();

const sidebarOpen = ref(false);

const activeTab = ref('overview');
const newsList = ref([]);
const carouselList = ref([]);
const centerList = ref([]);
const contactList = ref([]);
const ecosystemList = ref([]);
const orgList = ref([]);
const submissionList = ref([]);
const submissionFilter = ref('all');

const todayFormatted = computed(() =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
);

const trendFromCount = (count) => (count > 0 ? Math.min(25, Math.max(5, Math.round((count / (count + 8)) * 22))) : null);

const overviewMetrics = computed(() => [
  {
    id: 'research',
    label: 'RESEARCH PROJECTS',
    value: researchUnitSubmissionsCount.value,
    subtitle: 'Active Projects',
    trend: trendFromCount(researchUnitSubmissionsCount.value),
    trendLabel: 'vs last quarter',
    tone: 'teal',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    onClick: () => openSubmissionsFilter('research-unit'),
  },
  {
    id: 'publications',
    label: 'PUBLICATIONS',
    value: pubPrintingSubmissionsCount.value,
    subtitle: 'Printing & Publication Unit',
    trend: trendFromCount(pubPrintingSubmissionsCount.value),
    trendLabel: 'vs last year',
    tone: 'green',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    onClick: () => openSubmissionsFilter('publication-printing'),
  },
  {
    id: 'patents',
    label: 'PATENTS',
    value: techTransferSubmissionsCount.value,
    subtitle: 'Tech Transfer Inquiries',
    trend: trendFromCount(techTransferSubmissionsCount.value),
    trendLabel: 'vs last year',
    tone: 'gold',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>',
    onClick: () => openSubmissionsFilter('tech-transfer'),
  },
  {
    id: 'technologies',
    label: 'TECHNOLOGIES',
    value: centerList.value.length,
    subtitle: 'Research Centers',
    trend: trendFromCount(centerList.value.length),
    trendLabel: 'vs last year',
    tone: 'teal',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>',
    onClick: () => { activeTab.value = 'centers'; },
  },
  {
    id: 'extension',
    label: 'EXTENSION PROJECTS',
    value: contactList.value.length,
    subtitle: 'Contact Inquiries',
    trend: trendFromCount(contactList.value.length),
    trendLabel: 'vs last quarter',
    tone: 'green',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    onClick: () => { activeTab.value = 'contact'; },
  },
  {
    id: 'commercialization',
    label: 'COMMERCIALIZATION',
    value: carouselList.value.length,
    subtitle: 'Active Hero Initiatives',
    trend: trendFromCount(carouselList.value.length),
    trendLabel: 'vs last quarter',
    tone: 'gold',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    onClick: () => { activeTab.value = 'carousel'; },
  },
  {
    id: 'funding',
    label: 'EXTERNAL FUNDING',
    value: `₱${fundingDisplay.value}M`,
    subtitle: 'Ecosystem Portfolio Value',
    trend: trendFromCount(ecosystemList.value.length),
    trendLabel: 'vs last year',
    tone: 'teal',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 10h.01M18 14h.01"/></svg>',
    onClick: () => { activeTab.value = 'ecosystem'; },
  },
  {
    id: 'partnerships',
    label: 'PARTNERSHIPS',
    value: ecosystemList.value.length,
    subtitle: 'Active Partnerships',
    trend: trendFromCount(ecosystemList.value.length),
    trendLabel: 'vs last quarter',
    tone: 'green',
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    onClick: () => { activeTab.value = 'ecosystem'; },
  },
]);

const fundingDisplay = computed(() => {
  const partners = ecosystemList.value.length;
  if (partners === 0) return '0.0';
  return (partners * 0.469).toFixed(1);
});

const projectStatusSegments = computed(() => {
  const total = submissionList.value.length;
  if (total === 0) {
    return [
      { label: 'Pending', pct: 40, color: '#094A25' },
      { label: 'Reviewing', pct: 25, color: '#0ea5e9' },
      { label: 'Reviewed', pct: 20, color: '#22c55e' },
      { label: 'Approve', pct: 15, color: '#15803d' },
    ];
  }
  const toPct = (n) => Math.round((n / total) * 100);
  const segments = SUBMISSION_STATUSES.map((opt) => {
    const count = submissionList.value.filter((s) => normalizeStatus(s.status) === opt.value).length;
    return {
      label: opt.label,
      pct: toPct(count),
      color: SUBMISSION_STATUS_COLORS[opt.label] || '#94a3b8',
    };
  }).filter((s) => s.pct > 0);
  const sum = segments.reduce((acc, s) => acc + s.pct, 0);
  if (sum < 100 && segments.length) segments[0].pct += 100 - sum;
  return segments;
});

const donutGradient = computed(() => {
  let cursor = 0;
  const parts = projectStatusSegments.value.map((seg, i, arr) => {
    const start = cursor;
    cursor += seg.pct;
    const end = i === arr.length - 1 ? 100 : cursor;
    return `${seg.color} ${start}% ${end}%`;
  });
  return `conic-gradient(${parts.join(', ')})`;
});

const fundingBars = computed(() => {
  const quarters = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i * 3, 1);
    const q = Math.floor(d.getMonth() / 3) + 1;
    quarters.push({
      key: `${d.getFullYear()}-Q${q}`,
      label: `Q${q} ${String(d.getFullYear()).slice(2)}`,
      count: 0,
    });
  }

  submissionList.value.forEach((sub) => {
    const created = sub.created_at ? new Date(sub.created_at) : null;
    if (!created || Number.isNaN(created.getTime())) return;
    const q = Math.floor(created.getMonth() / 3) + 1;
    const key = `${created.getFullYear()}-Q${q}`;
    const bucket = quarters.find((item) => item.key === key);
    if (bucket) bucket.count += 1;
  });

  const max = Math.max(...quarters.map((q) => q.count), 1);
  const peakIdx = quarters.reduce((best, q, idx, arr) => (q.count > arr[best].count ? idx : best), 0);

  return quarters.map((q, idx) => ({
    label: q.label,
    display: String(q.count),
    pct: Math.max(8, Math.round((q.count / max) * 100)),
    isPeak: idx === peakIdx && q.count > 0,
  }));
});

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

const showStatusModal = ref(false);
const statusTarget = ref(null);
const statusForm = ref({ newStatus: 'pending', adminNote: '' });

const previewFile = ref({ show: false, path: '', name: '' });

const parseDateToIso = (dateStr) => {
  if (!dateStr) return new Date().toISOString().slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString().slice(0, 10) : parsed.toISOString().slice(0, 10);
};

const formatDateForStorage = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const getTabTitle = () => {
  const titles = {
    overview: 'Console Dashboard Overview',
    news: 'Manage News & Announcements (WYSIWYG)',
    carousel: 'Manage Hero Carousel Slides',
    centers: 'Manage 9 Highly Specialized Research Centers',
    ecosystem: 'Manage RITE Ecosystem Directory',
    org: 'Manage Organizational Structure',
    contact: 'Manage Received Contact Messages',
    submissions: 'Manage Research, Printing & Center Submissions',
    'manage-public-homepage': 'Manage Public Homepage Dashboard',
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
  if (confirm('Archive this submission? It will be hidden from the list but files are retained.')) {
    try {
      await submissionService.delete(id);
      await loadAll();
    } catch (e) {
      alert('Failed to archive submission.');
    }
  }
};

const normalizeStatus = (status) => (status === 'completed' ? 'approve' : status);

const openStatusModal = (sub) => {
  statusTarget.value = sub;
  statusForm.value = { newStatus: normalizeStatus(sub.status), adminNote: '' };
  showStatusModal.value = true;
};

const closeStatusModal = () => {
  showStatusModal.value = false;
  statusTarget.value = null;
  statusForm.value = { newStatus: 'pending', adminNote: '' };
};

const submitStatusUpdate = async () => {
  if (!statusForm.value.adminNote.trim()) {
    alert('Please enter a message for the sender.');
    return;
  }
  try {
    await submissionService.updateStatus(
      statusTarget.value.id,
      statusForm.value.newStatus,
      statusForm.value.adminNote.trim()
    );
    closeStatusModal();
    await loadAll();
    alert('Status updated and email sent to sender.');
  } catch (e) {
    alert('Failed to update status.');
  }
};

const openFilePreview = (sub) => {
  previewFile.value = { show: true, path: sub.file_path, name: sub.file_name || 'Attachment' };
};

let realtimeInterval = null;
onMounted(async () => {
  await loadAll();
  // Free "real-time": lightweight polling (backend response cached for public endpoint; admin uses direct data).
  realtimeInterval = setInterval(loadAll, 15000);
});

onUnmounted(() => {
  if (realtimeInterval) clearInterval(realtimeInterval);
});

const handleLogout = async () => {
  await logout();
  router.push({ name: 'Login' });
};

// Modals
const openNewsModal = (item = null) => {
  editingId.value = item ? item.id : null;
  modalTitle.value = item ? 'Edit News Article' : 'Create Article';
  if (item) {
    form.value = {
      ...item,
      tags: item.tags || '',
      link: item.link || '',
      dateIso: parseDateToIso(item.date),
    };
  } else {
    form.value = {
      title: '',
      category: 'Announcement',
      date: '',
      dateIso: new Date().toISOString().slice(0, 10),
      description: '',
      image: '',
      tags: '',
      link: '',
    };
  }
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
  form.value = center ? { ...center } : { name: '', category: '', contact_email: '', description: '', image: '' };
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
      const payload = {
        title: form.value.title,
        category: form.value.category,
        tags: form.value.tags,
        description: form.value.description,
        image: form.value.image,
        link: form.value.link,
        date: formatDateForStorage(form.value.dateIso),
      };
      if (editingId.value) await newsService.update(editingId.value, payload);
      else await newsService.create(payload);
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
const deleteContact = async (id) => { if (confirm("Archive this inquiry?")) { await contactService.delete(id); loadAll(); } };
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

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  z-index: 1200;
}

.sidebar-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: #ffffff;
  color: #094A25;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
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

/* Main Layout */
.admin-main { flex: 1; padding: 2.5rem; overflow-y: auto; background: #edf5f2; }
.main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.header-title h1 { font-family: 'Outfit', sans-serif; margin: 0 0 0.25rem 0; color: #0f172a; font-size: 1.8rem; }
.header-title p { margin: 0; color: #64748b; font-size: 0.9rem; }
.btn-preview { background: #ffffff; color: #094A25; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; text-decoration: none; }

/* Institutional Overview Dashboard */
.overview-tab { padding: 0; }

.overview-topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.overview-title {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #0f2d1c;
}

.overview-tagline {
  margin: 0.35rem 0 0;
  color: #5b7268;
  font-size: 0.9rem;
}

.overview-topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.overview-date {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: #fff;
  border: 1px solid #cfe0d8;
  color: #334155;
  padding: 0.55rem 0.9rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
}

.overview-site-btn { font-size: 0.85rem; }

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  position: relative;
  background: #fff;
  border: 1px solid #d5e5dd;
  border-radius: 14px;
  padding: 1.1rem 1.15rem 1rem;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.04);
  overflow: hidden;
}

.metric-card-action {
  position: absolute;
  top: 0.85rem;
  right: 0.9rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: #059669;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
  border-color: #059669;
  background: #f8fffb;
  box-shadow: 0 14px 32px rgba(9, 74, 37, 0.14);
}

.metric-card:hover .metric-card-action {
  opacity: 1;
  transform: translateY(0);
}

.metric-card:hover .metric-value {
  color: #094A25;
}

.metric-card:active {
  transform: translateY(-1px);
}

.metric-card-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.85rem;
}

.metric-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon.teal { background: #e4f2ec; color: #094A25; }
.metric-icon.green { background: #e8f8ef; color: #15803d; }
.metric-icon.gold { background: #fff6dd; color: #b45309; }

.metric-icon-svg :deep(svg) { display: block; }

.metric-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #64748b;
  line-height: 1.2;
}

.metric-value {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: #0f2d1c;
  line-height: 1;
  margin-bottom: 0.3rem;
}

.metric-sub {
  font-size: 0.82rem;
  color: #64748b;
  margin-bottom: 0.55rem;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
}

.trend-up {
  color: #15803d;
  font-weight: 800;
}

.trend-period {
  color: #94a3b8;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.chart-card {
  background: #fff;
  border: 1px solid #d5e5dd;
  border-radius: 14px;
  padding: 1.15rem 1.25rem 1.25rem;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.chart-card:hover {
  transform: translateY(-2px);
  border-color: #94c4ad;
  box-shadow: 0 12px 28px rgba(9, 74, 37, 0.1);
}

.centers-panel {
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.centers-panel:hover {
  box-shadow: 0 10px 24px rgba(9, 74, 37, 0.08);
}

.chart-title {
  margin: 0 0 1rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f2d1c;
}

.donut-layout {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.donut-wrap { flex-shrink: 0; }

.donut-chart {
  width: 148px;
  height: 148px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-hole {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px #e2e8f0;
}

.donut-hole strong {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  color: #094A25;
  line-height: 1;
}

.donut-hole span {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.donut-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.donut-legend li {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #475569;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-pct {
  font-weight: 800;
  color: #0f2d1c;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.65rem;
  height: 190px;
  padding-top: 1.5rem;
}

.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar-track {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar-fill {
  width: 72%;
  max-width: 52px;
  background: linear-gradient(180deg, #3d6b52 0%, #094A25 100%);
  border-radius: 6px 6px 2px 2px;
  position: relative;
  min-height: 8px;
  transition: height 0.3s ease;
}

.bar-peak-label {
  position: absolute;
  top: -1.35rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.72rem;
  font-weight: 800;
  color: #b45309;
  white-space: nowrap;
}

.bar-label {
  margin-top: 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #64748b;
}

.centers-panel {
  background: #fff;
  border: 1px solid #d5e5dd;
  border-radius: 14px;
  padding: 1.15rem 1.25rem 1.25rem;
  box-shadow: 0 4px 14px rgba(9, 74, 37, 0.04);
}

.centers-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.centers-panel-head h3 {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f2d1c;
}

.centers-view-all {
  background: transparent;
  border: none;
  color: #094A25;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
}

.centers-mini-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.center-mini-card {
  background: #f4faf7;
  border: 1px solid #cfe0d8;
  border-radius: 12px;
  padding: 0.75rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.center-mini-card:hover {
  background: #dff3e8;
  border-color: #059669;
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(9, 74, 37, 0.12);
}

.center-mini-count {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 800;
  color: #094A25;
  line-height: 1;
}

.center-mini-title {
  font-size: 0.68rem;
  font-weight: 700;
  color: #475569;
  line-height: 1.2;
}

@media (max-width: 1200px) {
  .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .charts-row { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .metric-grid { grid-template-columns: 1fr; }
  .centers-mini-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .donut-layout { flex-direction: column; }
}

@media (max-width: 900px) {
  .sidebar-toggle { display: inline-flex; }

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

  .admin-main {
    padding: 1.5rem;
  }
}

/* Legacy stat cards (other tabs) */
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
.tag-badge.red { background: #fee2e2; color: #b91c1c; }
.tag-badge.gold { background: #fef3c7; color: #b45309; }

.html-snippet { max-width: 250px; max-height: 60px; overflow: hidden; font-size: 0.8rem; opacity: 0.8; }
.table-img { width: 50px; height: 35px; object-fit: cover; border-radius: 4px; }
.btn-primary { background: #094A25; color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
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

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15,23,42,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: #fff; width: 100%; max-width: 650px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
.modal-content--wide { max-width: 960px; max-height: 92vh; overflow-y: auto; }
.btn-link-preview { background: none; border: none; color: #059669; font-weight: 700; font-size: 0.85rem; text-decoration: underline; cursor: pointer; padding: 0; }
.status-summary { background: #f8fafc; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; font-size: 0.9rem; }
.status-summary p { margin: 0.35rem 0; }
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
