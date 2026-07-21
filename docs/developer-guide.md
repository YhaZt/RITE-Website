# Developer guide

## Prerequisites

- PHP 8.2+, Composer
- Node 20+
- SQLite or MySQL

## Quality checks

Backend:

```bash
cd backend
vendor/bin/pint --test
php artisan test
```

Frontend:

```bash
cd frontend
npm run lint
npm test
npm run build
```

CI runs the same gates via [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

## Conventions

- Prefer FormRequests for write validation
- Keep public routes read-only except intentional forms
- Do not reintroduce open registration without an explicit product decision
- Prefer splitting large Vue views into `components/admin/` rather than growing god-components

## Environment

Never commit `.env`. Use `.env.example` templates in `backend/` and `frontend/`.
