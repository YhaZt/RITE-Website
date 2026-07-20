/**
 * Widget registry for public homepage dashboard builder.
 * Admin labels can differ; public labels are honest aggregates only.
 * Never include fabricated External Funding as a public widget.
 */

export const WIDGET_AREAS = ['kpi', 'charts', 'panel'];

export const WIDGET_REGISTRY = {
  research_unit: {
    widgetKey: 'research_unit',
    renderArea: 'kpi',
    adminLabel: 'Research Unit Inquiries',
    publicLabel: 'Research Unit Inquiries',
    subtitle: 'Unit submissions',
    tone: 'teal',
    counterKey: 'research_unit',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  },
  publication_printing: {
    widgetKey: 'publication_printing',
    renderArea: 'kpi',
    adminLabel: 'Publication & Printing',
    publicLabel: 'Publication & Printing',
    subtitle: 'Unit submissions',
    tone: 'green',
    counterKey: 'publication_printing',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  },
  tech_transfer: {
    widgetKey: 'tech_transfer',
    renderArea: 'kpi',
    adminLabel: 'Tech Transfer Inquiries',
    publicLabel: 'Tech Transfer Inquiries',
    subtitle: 'Unit submissions',
    tone: 'gold',
    counterKey: 'tech_transfer',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>',
  },
  research_centers: {
    widgetKey: 'research_centers',
    renderArea: 'kpi',
    adminLabel: 'Research Centers',
    publicLabel: 'Research Centers',
    subtitle: 'Active centers',
    tone: 'teal',
    counterKey: 'research_centers',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>',
  },
  extension_projects: {
    widgetKey: 'extension_projects',
    renderArea: 'kpi',
    adminLabel: 'Contact Inquiries',
    publicLabel: 'Contact Inquiries',
    subtitle: 'Extension contact messages',
    tone: 'green',
    counterKey: 'extension_projects',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
  commercialization: {
    widgetKey: 'commercialization',
    renderArea: 'kpi',
    adminLabel: 'Hero Initiatives',
    publicLabel: 'Hero Initiatives',
    subtitle: 'Carousel slides',
    tone: 'gold',
    counterKey: 'commercialization',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  },
  partnerships: {
    widgetKey: 'partnerships',
    renderArea: 'kpi',
    adminLabel: 'Partnerships',
    publicLabel: 'Partnerships',
    subtitle: 'Ecosystem partners',
    tone: 'green',
    counterKey: 'partnerships',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  },
  total_inquiries: {
    widgetKey: 'total_inquiries',
    renderArea: 'kpi',
    adminLabel: 'Total Inquiries',
    publicLabel: 'Total Inquiries',
    subtitle: 'All unit submissions',
    tone: 'teal',
    counterKey: 'total_inquiries',
    allowPublic: true,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  },
  // Admin-only fabricated metric — never allowed on public site
  external_funding: {
    widgetKey: 'external_funding',
    renderArea: 'kpi',
    adminLabel: 'External Funding (admin only)',
    publicLabel: 'External Funding',
    subtitle: 'Not shareable publicly',
    tone: 'teal',
    counterKey: null,
    allowPublic: false,
    icon: '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>',
  },
  submission_status: {
    widgetKey: 'submission_status',
    renderArea: 'charts',
    adminLabel: 'Submission Status',
    publicLabel: 'Submission Status',
    allowPublic: true,
  },
  activity_trend_quarters: {
    widgetKey: 'activity_trend_quarters',
    renderArea: 'charts',
    adminLabel: 'Activity Trend (Submissions per Quarter)',
    publicLabel: 'Activity Trend (Submissions per Quarter)',
    allowPublic: true,
  },
  centers_inquiry_breakdown: {
    widgetKey: 'centers_inquiry_breakdown',
    renderArea: 'panel',
    adminLabel: 'Research Centers — Inquiry Breakdown',
    publicLabel: 'Research Centers — Inquiry Breakdown',
    allowPublic: true,
  },
};

export function getWidgetDef(key) {
  return WIDGET_REGISTRY[key] || null;
}

export function widgetsForArea(area) {
  return Object.values(WIDGET_REGISTRY).filter((w) => w.renderArea === area);
}

export function defaultLayout() {
  return {
    kpi: [
      { id: 'kpi-research-unit', widgetKey: 'research_unit', isPublic: true },
      { id: 'kpi-publication', widgetKey: 'publication_printing', isPublic: true },
      { id: 'kpi-tech-transfer', widgetKey: 'tech_transfer', isPublic: true },
      { id: 'kpi-centers', widgetKey: 'research_centers', isPublic: true },
      { id: 'kpi-extension', widgetKey: 'extension_projects', isPublic: true },
      { id: 'kpi-commercialization', widgetKey: 'commercialization', isPublic: true },
      { id: 'kpi-partnerships', widgetKey: 'partnerships', isPublic: true },
      { id: 'kpi-inquiries', widgetKey: 'total_inquiries', isPublic: true },
    ],
    charts: [
      { id: 'chart-status', widgetKey: 'submission_status', isPublic: true },
      { id: 'chart-trend', widgetKey: 'activity_trend_quarters', isPublic: true },
    ],
    panel: [
      { id: 'panel-centers', widgetKey: 'centers_inquiry_breakdown', isPublic: true },
    ],
  };
}

export function makeWidgetInstance(widgetKey) {
  const def = getWidgetDef(widgetKey);
  return {
    id: `${widgetKey}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    widgetKey,
    isPublic: def ? !!def.allowPublic : false,
  };
}

export const STATUS_COLORS = {
  Pending: '#094A25',
  Reviewing: '#0ea5e9',
  Reviewed: '#22c55e',
  Decline: '#ef4444',
  Approve: '#15803d',
  Suggestion: '#eab308',
};

export const LAYOUT_SETTING_KEY = 'public_homepage_layout_v1';
