---
name: Public Dash Builder
overview: Add an admin “Manage Public Homepage” dashboard builder with drag-drop widget layout + per-widget public visibility, then render the same layout on the public homepage using only public-safe aggregated metrics. Also upgrade the admin news WYSIWYG to an ibibes-like media-bar editor and convert all uploaded images to WebP in Laravel uploads.
todos:
  - id: public-metrics-extend
    content: Extend `PublicMetricsController` to include quarter activity trend, submission status segments, center breakdown (9 slugs), and KPI counts (including contact submissions count). Keep existing response fields for compatibility.
    status: completed
  - id: public-layout-endpoint
    content: Add `PublicHomepageLayoutController` + `GET /api/public/homepage-layout` route reading `site_settings.public_homepage_layout_v1`, filtering to `isPublic=true`, and returning ordered widget instances.
    status: completed
  - id: media-to-webp
    content: Update `MediaController@store` to convert all uploads to WebP (resize longest side to 1600px; quality 82), store under `cms` with `.webp`, and return updated URL.
    status: completed
  - id: widget-registry-components
    content: Create widget registry + public dashboard presentational components (KPI grid, submission status donut, activity trend bars, centers breakdown panel).
    status: completed
  - id: home-render-dashboard
    content: Refactor `frontend/src/views/Home.vue` to replace the current hero pulse section with the configured public dashboard layout, loading `/api/public/homepage-layout` + `publicMetricsService`.
    status: completed
  - id: admin-manage-public-homepage-tab
    content: Add new `AdminDashboard.vue` tab `manage-public-homepage` and implement builder component for drag-drop widget ordering and per-widget `isPublic` toggles persisted to `POST /api/settings`.
    status: completed
  - id: drag-drop-dependency
    content: Install and wire a Vue3 drag-drop dependency (e.g. `vuedraggable`) to reorder widget lists within KPI/charts/panel areas.
    status: completed
  - id: editor-ibibes-like-ui
    content: Rewrite `ArticleEditor.vue` UI to match ibibes-style media bar + insertion of image/gallery with consistent wrapper markup and `content_style` CSS for WYSIWYG.
    status: completed
  - id: editor-insert-html
    content: Implement TinyMCE insertion hooks in `ArticleEditor.vue` so media bar uploads insert correct figure/gallery HTML at the cursor.
    status: completed
  - id: manual-verification
    content: "Manual QA: verify admin layout persistence + public filtering, dashboard data correctness, and WebP conversion + WYSIWYG rendering for featured image, inline images, and gallery."
    status: completed
isProject: false
---

## Backend: data + layout sources
- **Extend public metrics**
  - Update `[backend/app/Http/Controllers/Api/PublicMetricsController.php](backend/app/Http/Controllers/Api/PublicMetricsController.php)` to add *public-safe* aggregates needed for the dashboard widgets:
    - KPI counts for:
      - `research_unit` (submissions where `target_unit = research-unit`)
      - `publication_printing` (submissions where `target_unit = publication-printing`)
      - `tech_transfer` (submissions where `target_unit = tech-transfer`)
      - `research_centers` (centers count)
      - `extension_projects` (contact submissions count)
      - `commercialization` (carousel slides count)
      - `partnerships` (ecosystem items count)
      - `total_inquiries` (unit submissions count)
    - Chart data:
      - Submission status segments from `status` on `UnitSubmission` (labels using existing mapping in controller).
      - Activity trend buckets: submissions grouped by **last 6 quarters** from `UnitSubmission.created_at`.
    - Panel data:
      - Center inquiry breakdown for the same 9 center slugs already hardcoded in admin: return `[{ slug, title, count }]` aggregated from `UnitSubmission` rows where `target_unit = center:{slug}`.
  - Keep existing response fields (`counters`, `breakdowns`, and `series.submissions_last_14_days`) so current `Home.vue` logic doesn’t break while we refactor.

- **Add public homepage layout endpoint**
  - Create `PublicHomepageLayoutController` (new file) that reads the JSON layout from `site_settings` key `public_homepage_layout_v1`.
  - Return ONLY widgets marked `isPublic=true` (and keep ordering) so the public dashboard never tries to render admin-only widgets.
  - Add route in `[backend/routes/api.php](backend/routes/api.php)`:
    - `GET /api/public/homepage-layout` → controller.

- **Convert uploads to WebP (server-side)**
  - Update `[backend/app/Http/Controllers/Api/MediaController.php](backend/app/Http/Controllers/Api/MediaController.php)`:
    - After validation, always convert the uploaded image to **WebP**.
    - Resize so the longest side is capped at **1600px** (preserve aspect ratio) and export WebP with quality **82**.
    - Store under the same `cms` folder but force the final extension to `.webp`.
    - Return JSON `{ url, filename }` where `url` points to the `.webp`.

## Frontend: Public homepage dashboard (image 2 layout)
- **Add widget registry + renderers**
  - Implement a small widget system:
    - `frontend/src/publicHomepage/widgetRegistry.js` with definitions for widget keys:
      - KPI: `research_unit`, `publication_printing`, `tech_transfer`, `research_centers`, `extension_projects`, `commercialization`, `partnerships`, `total_inquiries`
      - Charts: `submission_status`, `activity_trend_quarters`
      - Panel: `centers_inquiry_breakdown`
    - Each widget definition has:
      - `adminLabel`/`publicLabel`
      - `publicDataPath` (or compute function)
      - `renderArea` (`kpi`, `charts`, `panel`)
  - Build presentational components (or one component with subcomponents):
    - KPI grid card(s), status donut (CSS `conic-gradient`), activity trend bars, and 9-center panel.

- **Modify the public homepage to show the dashboard instead of the old hero pulse strip**
  - Update `[frontend/src/views/Home.vue](frontend/src/views/Home.vue)`:
    - Replace the current `hero-section` contents with the new dashboard layout (matching image 2):
      - top title bar with `OVERVIEW` + `todayFormatted` (and/or the metrics `generated_at` time)
      - KPI grid
      - Submission Status donut
      - Activity Trend bars (last 6 quarters)
      - Centers breakdown panel
    - Load data by calling:
      - `publicMetricsService.get()` (existing)
      - `GET /api/public/homepage-layout` (new)
    - Render only widgets returned by the layout endpoint.

## Frontend: Admin “Manage Public Homepage” (drag-drop + visibility toggle)
- **Add a new sidebar tab**
  - Update `[frontend/src/views/AdminDashboard.vue](frontend/src/views/AdminDashboard.vue)`:
    - Add a sidebar button and `activeTab` branch for `manage-public-homepage`.

- **Implement the builder UI**
  - Create `frontend/src/components/publicHomepage/ManagePublicHomepage.vue`:
    - Load layout from `GET /api/settings` for key `public_homepage_layout_v1`.
    - If missing, initialize with a default layout that matches image 2 structure but with public-safe widgets (no external funding).
    - Provide 3 drag-drop lists (areas):
      - `kpi` (metric-card grid)
      - `charts` (status donut + activity trend)
      - `panel` (centers breakdown)
    - Add/remove widgets from a palette of widget keys.
    - Each widget instance has:
      - `id` (uuid-like)
      - `widgetKey`
      - `isPublic` boolean (toggle label: “Visible on public homepage”).
      - For `kpi_external_funding` (fabricated), do **not include** in the public palette / disable public toggle (always `isPublic=false`).
    - Drag-drop ordering updates the in-memory layout.
    - Save button:
      - `POST /api/settings` with `{ key: 'public_homepage_layout_v1', value: JSON.stringify(layout) }`.

- **Dependencies**
  - Install a Vue3 drag-drop helper (e.g. `vuedraggable`) in `frontend/package.json` so we can reorder widget lists.

## Frontend: Ibibes-like WYSIWYG editor + WebP images (image 4)
- **Upgrade the existing TinyMCE-based editor UI**
  - Update `[frontend/src/components/ArticleEditor.vue](frontend/src/components/ArticleEditor.vue)` to match the ibibes editor layout in image 4 as closely as possible while still using TinyMCE for rich-text.
  - Changes inside the editor component:
    - Keep the current progress bar + top fields (title/category/tags/date/stats).
    - Add an ibibes-like **media bar** above TinyMCE with:
      - Image layout mode selector (full/wide/left/right)
      - Caption input
      - “Insert Image” button (opens file picker, uploads via `mediaService.uploadImage`, inserts HTML wrapper into TinyMCE)
      - “Insert Gallery” button (multi-select files, uploads all, inserts gallery grid HTML)
    - Ensure TinyMCE `init.content_style` includes CSS for:
      - `.news-figure.news-figure--left|--right|--wide|--full`
      - `.news-gallery` and its grid columns
    - Use TinyMCE editor instance insertion (via the `@init` event) to insert wrapper markup that produces consistent WYSIWYG output.

- **Ensure uploaded images are WebP**
  - Since TinyMCE image upload and `ImageUploadField` both go through `/api/media`, the MediaController WebP conversion will automatically apply.

## Verification plan
- **Admin Manage Public Homepage**
  - Add multiple KPI cards, drag to reorder, toggle “Visible on public homepage”, and Save.
  - Confirm the public homepage immediately reflects the layout (after refresh) and hides widgets with `isPublic=false`.

- **Public dashboard rendering**
  - Confirm:
    - KPI values show aggregated counts only.
    - Submission Status donut uses `UnitSubmission.status` segments.
    - Activity Trend bars show last 6 quarters counts.
    - Centers breakdown panel shows 9 center cards with aggregated inquiry counts.

- **WebP upload + WYSIWYG**
  - Upload images from:
    - Featured Image dropzone (`ImageUploadField`)
    - TinyMCE inline upload (images_upload_handler)
    - New media bar “Insert Image / Insert Gallery”
  - Confirm stored files are `.webp` under `storage/app/public/cms` and the editor + news cards show them correctly.
  - Confirm the rendered HTML wrappers match the look of image 4 (figure/layout styling).