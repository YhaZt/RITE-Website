# Announcement Card Redesign + Expiration + Animations

Redesign the announcement card to match the sketch layout (icon/QR left, title+date top-right, description bottom-right), add expiration date filtering, add a "Flicker Text" animation on the title, and show a "Shiny Pill" animated placeholder when no active announcements exist.

## User Review Required

> [!IMPORTANT]
> The Flicker Text and Shiny Pill animations are originally React/TypeScript components. They will be **ported to Vue 3 Composition API** (plain `<script setup>` with `ref`, `onMounted`, `onUnmounted`, `watch`). The animation logic will be adapted faithfully but written in Vue idioms — no React dependencies will be introduced.

> [!IMPORTANT]
> The sketch shows a QR-code–style icon on the left. Since announcements have an `icon` field (material icon name like `campaign`), we'll render a **large material icon** in that left section. If you want an actual QR code image, let me know and I'll add a QR code field instead.

## Open Questions

> [!NOTE]
> **Expiration Date Field**: The `end_date` column already exists in the database and admin form. Currently it's not used for filtering. I'll add server-side filtering so announcements past their `end_date` are excluded from the `/announcement/active` endpoint. Should expired announcements also be **auto-deactivated** (`is_active = false`), or just hidden from the public view while remaining "Active" in the admin list?

> [!NOTE]
> **"No Announcement" text**: You mentioned catchy text like "Wait for announcement" or "Something is Coming". I'll use **"Something is Coming..."** as the default Shiny Pill text. Let me know if you prefer a different phrase.

---

## Proposed Changes

### Backend — Expiration Filtering

#### [MODIFY] [Announcement.php](file:///c:/laragon/www/ibibes/backend/app/Models/Announcement.php)
- Update the `scopeActive` query scope to also filter by `end_date`: only return announcements where `end_date` is `null` OR `end_date >= today`.
- Add a `scopeNotExpired` scope for reuse.

#### [MODIFY] [AnnouncementController.php](file:///c:/laragon/www/ibibes/backend/app/Http/Controllers/AnnouncementController.php)
- Update the `getActive()` method to use the new `notExpired` scope, so expired announcements no longer appear on the homepage.
- The response will now return `null` data (no default fallback) when no active/non-expired announcement exists, so the frontend can show the Shiny Pill animation instead.

---

### Frontend — Admin Form (Add Expiration Date Label)

#### [MODIFY] [announcements.vue](file:///c:/laragon/www/ibibes/frontend/src/pages/Admin/announcements.vue)
- Rename the "End Date" label to **"Expiration Date"** for clarity.
- Add a hint text below the expiration date field: *"Announcement will auto-hide after this date"*.
- Show an "Expired" badge in the announcements list for items whose `end_date` is in the past.

---

### Frontend — Announcement Card Redesign + Animations

#### [MODIFY] [news-index.vue](file:///c:/laragon/www/ibibes/frontend/src/pages/Homepage/news-index.vue)

**Layout Redesign (matching sketch):**
```
┌──────────────────────────────────────────────┐
│  ┌─────────┐  ┌────────────────────────────┐ │
│  │         │  │ Title (flicker)     Date   │ │
│  │  ICON   │  ├────────────────────────────┤ │
│  │ (large) │  │                            │ │
│  │         │  │    Description / Info       │ │
│  └─────────┘  │                            │ │
│               └────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

The card will use a **CSS grid** or **flexbox** layout with:
- **Left section** (~20%): Large icon area with background accent, showing the announcement's material icon at ~48px.
- **Right section** (~80%): Two rows:
  - **Top row**: Dark header bar with the title (animated with Flicker Text effect) on the left and the date on the right.
  - **Bottom row**: Light/white area showing the announcement description/content rendered from HTML.

**Flicker Text Animation (Vue port):**
- Port the `cubicBezier`, `makeEaseFn`, `generateTimings`, `buildVisibleItems`, and `runAnimation` logic into a Vue composable: `useFlickerText()`.
- The composable will expose reactive state (`currentPhase`, `flickerLetters`, `moveX`) and a `start()` method.
- The title text in the announcement card header will use this composable for a letter-flicker opacity animation on mount.
- Configuration will use the provided `COMPONENT_DEFAULTS` preset (letter flicker mode: opacity, intensity: 10, duration: 2s, easeInOut).

**Shiny Pill "No Announcement" State (Vue port):**
- When `announcement.value.id === null` (no active announcement from API), show a Shiny Pill animation instead.
- Port the CSS `@keyframes shinyPillSweep` and the dual-layer text approach (base color + masked shine sweep).
- Display text: **"✦ Something is Coming... ✦"** with a green shine color (`#78FF83`) sweeping across white text.
- The card will still have the same dark gradient background but centered content.

**Announcement Interface update:**
- Add `content` (HTML string), `start_date`, `end_date`, and `type` fields to the frontend `Announcement` interface.
- Update `fetchAnnouncement()` to handle the case where no announcement is returned (show Shiny Pill).

---

## Verification Plan

### Manual Verification
1. **With active announcement**: The card shows the new layout — icon left, title (flickering) + date top-right, description bottom-right.
2. **Without active announcement**: The card shows the Shiny Pill "Something is Coming..." animation.
3. **Expired announcement**: Set an `end_date` in the past → the announcement should not appear; the Shiny Pill should show instead.
4. **Admin form**: "Expiration Date" label is shown; expired items have a badge in the list.
5. **Animations**: Flicker text plays on page load; Shiny Pill sweep loops continuously.
