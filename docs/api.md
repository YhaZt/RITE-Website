# API overview

Base path: `/api` (Laravel default API prefix).

All mutating admin endpoints require an authenticated Sanctum session (`auth:sanctum`). Unauthenticated calls return `401`.

## Auth

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| POST | `/login` | Public | Session login |
| POST | `/logout` | Auth | |
| GET | `/user` | Auth | `401` if guest (no user spoofing) |
| POST | `/forgot-password` | Public | Sends reset link |
| POST | `/reset-password` | Public | Token + new password |
| POST | `/user/password` | Auth | Change password |

Registration (`POST /register`) is **not** available.

## Public content (GET)

- `/news`, `/news/{id}`
- `/carousel`, `/carousel/{id}`
- `/centers`, `/centers/{id|slug}`
- `/org-members`, `/org-members/{id}`
- `/ecosystem`, `/ecosystem/{id}`
- `/public/metrics`
- `/public/homepage-layout`

## Public forms (POST)

- `/contact` — contact form
- `/submissions` — unit submission (+ optional attachment)

## Admin (auth required)

- News / carousel / centers / org-members / ecosystem: `POST`, `PUT|PATCH`, `DELETE`
- Contact: `GET`, `PUT|PATCH`, `DELETE` (list/manage inbox)
- Settings: full resource except update (uses store upsert)
- Submissions: `GET` list, `DELETE`, `PATCH /submissions/{id}/status`, `GET /submissions/attachment/preview`
- Media: `POST /media` (images → WebP)

## CORS / Sanctum

Configure:

- `FRONTEND_URL`
- `CORS_ALLOWED_ORIGINS` (optional, comma-separated)
- `SANCTUM_STATEFUL_DOMAINS`
