<template>
  <div class="admin-wrapper">
    <AdminSidebar
      :active-tab="activeTab"
      :open="sidebarOpen"
      @navigate="onSidebarNavigate"
      @close="sidebarOpen = false"
      @logout="handleLogout"
    />

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

      <AdminOverviewTab
        v-if="activeTab === 'overview'"
        :today-formatted="todayFormatted"
        :metrics="overviewMetrics"
        :donut-gradient="donutGradient"
        :submission-total="submissionList.length"
        :project-status-segments="projectStatusSegments"
        :funding-bars="fundingBars"
        :center-counts-list="centerCountsList"
        @open-sidebar="sidebarOpen = true"
        @filter-submissions="openSubmissionsFilter"
        @navigate-tab="activeTab = $event"
      />

      <AdminCrudTable
        v-if="activeTab === 'news'"
        :title="`News & Announcements catalog (${newsList.length})`"
        add-label="+ Add New Announcement"
        :page="pageState.news"
        :total-pages="totalPagesNews"
        :loading="dataLoading"
        :empty="!dataLoading && newsList.length === 0"
        empty-message="No news articles yet."
        @add="openNewsModal()"
        @update:page="pageState.news = $event"
      >
        <template #columns>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Date</th>
            <th>Rich Content Preview</th>
            <th>Actions</th>
          </tr>
        </template>
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
      </AdminCrudTable>

      <AdminCrudTable
        v-if="activeTab === 'carousel'"
        :title="`Hero Banner Carousel Slides (${carouselList.length})`"
        add-label="+ Add Hero Slide"
        :page="pageState.carousel"
        :total-pages="totalPagesCarousel"
        :loading="dataLoading"
        :empty="!dataLoading && carouselList.length === 0"
        empty-message="No carousel slides yet."
        @add="openCarouselModal()"
        @update:page="pageState.carousel = $event"
      >
        <template #columns>
          <tr>
            <th>Order</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image Preview</th>
            <th>Actions</th>
          </tr>
        </template>
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
      </AdminCrudTable>

      <AdminCrudTable
        v-if="activeTab === 'centers'"
        :title="`Highly Specialized Research Centers (${centerList.length})`"
        add-label="+ Add Research Center"
        :page="pageState.centers"
        :total-pages="totalPagesCenters"
        :loading="dataLoading"
        :empty="!dataLoading && centerList.length === 0"
        empty-message="No research centers yet."
        @add="openCenterModal()"
        @update:page="pageState.centers = $event"
      >
        <template #columns>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Contact Email</th>
            <th>Actions</th>
          </tr>
        </template>
        <tr v-for="center in paginatedCenters" :key="center.id">
          <td class="font-bold">{{ center.name }}</td>
          <td><span class="tag-badge green">{{ center.category || 'Center' }}</span></td>
          <td>{{ center.contact_email || 'N/A' }}</td>
          <td class="actions">
            <button class="btn-sm edit" @click="openCenterModal(center)">Edit</button>
            <button class="btn-sm delete" @click="deleteCenter(center.id)">Delete</button>
          </td>
        </tr>
      </AdminCrudTable>

      <AdminCrudTable
        v-if="activeTab === 'ecosystem'"
        :title="`RITE Ecosystem Directory Partners (${ecosystemList.length})`"
        add-label="+ Add Ecosystem Partner"
        :page="pageState.ecosystem"
        :total-pages="totalPagesEcosystem"
        :loading="dataLoading"
        :empty="!dataLoading && ecosystemList.length === 0"
        empty-message="No ecosystem partners yet."
        @add="openEcosystemModal()"
        @update:page="pageState.ecosystem = $event"
      >
        <template #columns>
          <tr>
            <th>Logo</th>
            <th>Partner Title</th>
            <th>Category</th>
            <th>External Link</th>
            <th>Actions</th>
          </tr>
        </template>
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
      </AdminCrudTable>

      <AdminCrudTable
        v-if="activeTab === 'org'"
        :title="`Organizational Structure Members (${orgList.length})`"
        add-label="+ Add Org Member"
        :page="pageState.org"
        :total-pages="totalPagesOrg"
        :loading="dataLoading"
        :empty="!dataLoading && orgList.length === 0"
        empty-message="No org members yet."
        @add="openOrgModal()"
        @update:page="pageState.org = $event"
      >
        <template #columns>
          <tr>
            <th>Member Name</th>
            <th>Title / Designation</th>
            <th>Division</th>
            <th>Role Type</th>
            <th>Actions</th>
          </tr>
        </template>
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
      </AdminCrudTable>

      <AdminCrudTable
        v-if="activeTab === 'contact'"
        :title="`Contact Inquiries & Submissions (${contactList.length})`"
        :page="pageState.contact"
        :total-pages="totalPagesContact"
        :loading="dataLoading"
        :empty="!dataLoading && contactList.length === 0"
        empty-message="No contact messages yet."
        @update:page="pageState.contact = $event"
      >
        <template #columns>
          <tr>
            <th>Sender Name</th>
            <th>Email Address</th>
            <th>Subject</th>
            <th>Message Body</th>
            <th>Actions</th>
          </tr>
        </template>
        <tr v-for="msg in paginatedContact" :key="msg.id">
          <td class="font-bold">{{ msg.name }}</td>
          <td>{{ msg.email }}</td>
          <td>{{ msg.subject || 'No Subject' }}</td>
          <td>{{ msg.message }}</td>
          <td class="actions">
            <button class="btn-sm delete" @click="deleteContact(msg.id)">Delete</button>
          </td>
        </tr>
      </AdminCrudTable>

      <AdminSubmissionsTab
        v-if="activeTab === 'submissions'"
        :filter="submissionFilter"
        :filtered-count="filteredSubmissions.length"
        :total-count="submissionList.length"
        :pub-printing-count="pubPrintingSubmissionsCount"
        :research-unit-count="researchUnitSubmissionsCount"
        :tech-transfer-count="techTransferSubmissionsCount"
        :center-count="centerSubmissionsCount"
        :center-counts-list="centerCountsList"
        :items="paginatedSubmissions"
        :page="pageState.submissions"
        :total-pages="totalPagesSubmissions"
        :show-status-modal="showStatusModal"
        :status-target="statusTarget"
        :status-form="statusForm"
        :statuses="SUBMISSION_STATUSES"
        :status-label="submissionStatusLabel"
        :status-badge-class="submissionStatusBadgeClass"
        @update:filter="onSubmissionFilterChange"
        @update:page="pageState.submissions = $event"
        @preview-file="openFilePreview"
        @update-status="openStatusModal"
        @archive="deleteSubmission"
        @close-status="closeStatusModal"
        @submit-status="submitStatusUpdate"
        @update:status-field="onStatusFieldUpdate"
      />

      <div v-if="activeTab === 'manage-public-homepage'" class="tab-content">
        <ManagePublicHomepage />
      </div>
    </div>

    <AdminEntityModal
      :show="showModal"
      :title="modalTitle"
      :entity-type="activeTab"
      :form="form"
      :ecosystem-preset-urls="ecosystemPresetUrls"
      @close="closeModal"
      @save="saveForm"
      @update:field="onFormFieldUpdate"
    />

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
import FilePreviewModal from '@/components/FilePreviewModal.vue';
import ManagePublicHomepage from '@/components/publicHomepage/ManagePublicHomepage.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import AdminOverviewTab from '@/components/admin/AdminOverviewTab.vue';
import AdminCrudTable from '@/components/admin/AdminCrudTable.vue';
import AdminEntityModal from '@/components/admin/AdminEntityModal.vue';
import AdminSubmissionsTab from '@/components/admin/AdminSubmissionsTab.vue';

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
const dataLoading = ref(true);
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
    action: { type: 'submissions', filter: 'research-unit' },
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
    action: { type: 'submissions', filter: 'publication-printing' },
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
    action: { type: 'submissions', filter: 'tech-transfer' },
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
    action: { type: 'tab', tab: 'centers' },
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
    action: { type: 'tab', tab: 'contact' },
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
    action: { type: 'tab', tab: 'carousel' },
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
    action: { type: 'tab', tab: 'ecosystem' },
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
    action: { type: 'tab', tab: 'ecosystem' },
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

const onSidebarNavigate = (tab) => {
  activeTab.value = tab;
};

const onSubmissionFilterChange = (value) => {
  submissionFilter.value = value;
};

const onFormFieldUpdate = ({ field, value }) => {
  form.value = { ...form.value, [field]: value };
};

const onStatusFieldUpdate = ({ field, value }) => {
  statusForm.value = { ...statusForm.value, [field]: value };
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
  const isInitial = dataLoading.value;
  if (isInitial) dataLoading.value = true;
  try {
    try { newsList.value = await newsService.getAll(); } catch (_e) {}
    try { carouselList.value = await carouselService.getAll(); } catch (_e) {}
    try { centerList.value = await centerService.getAll(); } catch (_e) {}
    try { contactList.value = await contactService.getAll(); } catch (_e) {}
    try { ecosystemList.value = await ecosystemService.getAll(); } catch (_e) {}
    try { orgList.value = await orgService.getAll(); } catch (_e) {}
    try { submissionList.value = await submissionService.getAll(); } catch (_e) {}
  } finally {
    dataLoading.value = false;
  }
};

const deleteSubmission = async (id) => {
  if (confirm('Archive this submission? It will be hidden from the list but files are retained.')) {
    try {
      await submissionService.delete(id);
      await loadAll();
    } catch (_e) {
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
  } catch (_e) {
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
  } catch (err) {
    const status = err?.response?.status;
    const apiMessage = err?.response?.data?.message || err?.response?.data?.error;
    if (status === 419) {
      alert(apiMessage || 'CSRF token mismatch (419). Pull latest backend, clear minsuibibes.com cookies, log in again, then retry.');
    } else if (status === 401) {
      alert('Not authorized (401). Log out, log in again, then retry Save.');
    } else if (status === 422) {
      const first = err?.response?.data?.errors
        ? Object.values(err.response.data.errors).flat()[0]
        : null;
      alert(first || apiMessage || 'Validation failed. Check required fields.');
    } else {
      alert(apiMessage || 'Error saving record to Laravel backend.');
    }
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

/* Main Layout */
.admin-main { flex: 1; padding: 2.5rem; overflow-y: auto; background: #edf5f2; }
.main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.header-title h1 { font-family: 'Outfit', sans-serif; margin: 0 0 0.25rem 0; color: #0f172a; font-size: 1.8rem; }
.header-title p { margin: 0; color: #64748b; font-size: 0.9rem; }
.btn-preview { background: #ffffff; color: #094A25; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem; border-radius: 8px; font-weight: 700; text-decoration: none; }

@media (max-width: 900px) {
  .sidebar-toggle { display: inline-flex; }

  .admin-main {
    padding: 1.5rem;
  }
}
</style>
