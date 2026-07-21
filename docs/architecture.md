# Architecture

## Overview

RITE is a monorepo SPA + API:

```
Browser (Vue SPA)
    |  cookie session + CSRF
Laravel API (/api)
    |  Eloquent
SQLite / MySQL
```

## Frontend (`frontend/src`)

- `views/` — public pages and admin shell
- `components/` — shared UI (navbar, forms, admin pieces)
- `services/` — Axios API clients
- `composables/useAuth.js` — session user state
- `data/` — static marketing/content modules
- `router/` — vue-router with `requiresAuth` / `requiresGuest`

## Backend (`backend/app`)

- `Http/Controllers/Api/` — REST controllers
- `Http/Requests/` — FormRequest validation
- `Models/` — Eloquent models (news, carousel, centers, contact, submissions, settings, etc.)
- Auth via Laravel session + Sanctum `statefulApi()` for SPA cookies

## Auth model

1. `GET /sanctum/csrf-cookie`
2. `POST /api/login`
3. Subsequent requests send session cookie
4. Mutating CMS routes use `auth:sanctum`
5. Public reads + contact/submission POSTs remain open

Registration is disabled. Password reset emails use `MAIL_MAILER` (default `log` locally) and link to `{FRONTEND_URL}/reset-password`.
