# RITE Website

Public website and admin CMS for **Mindoro State University - Research, Innovation, Technology & Extension (RITE)**.

## Stack

| Layer | Tech | Folder |
| --- | --- | --- |
| Frontend SPA | Vue 3 + Vite | [`frontend/`](frontend/) |
| Backend API | Laravel 12 + Sanctum (cookie sessions) | [`backend/`](backend/) |

The SPA calls `/api/*` with credentialed cookies.

- **Public:** read CMS content; submit contact and unit forms
- **Admin:** login required for all CMS create/update/delete and media uploads

```text
Browser (rite.minsuibibes.com)
        |  HTTPS + cookies
API (api.rite.minsuibibes.com)
        |
     Database
```

## Quick start (local)

### 1. Backend

```bash
cd backend
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

API default: http://127.0.0.1:8000

**Local admin (change before any shared use)**

| Field | Value |
| --- | --- |
| Email | `admin@rite.edu.ph` |
| Password | `password` (or `ADMIN_SEED_PASSWORD` in `.env`) |

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

SPA default: http://localhost:5173

In `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

In `backend/.env`, match the Vite origin:

```env
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173,127.0.0.1,127.0.0.1:5173
```

## Production deploy (FTP / Apache)

Production stays **git pull + build + Apache** (or FTP). **Do not** use Docker Compose in production.

### After every pull on the server

```bash
# Frontend
cd /var/www/rite/frontend
cp -n .env.example .env   # only if missing; keep your real VITE_API_BASE_URL
npm ci                    # or: npm install
npm run build

# Backend
cd /var/www/rite/backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan storage:link
```

### Required API `.env` (CORS + cookies)

On the **API** host (`backend/.env`), set:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.rite.minsuibibes.com

FRONTEND_URL=https://rite.minsuibibes.com
CORS_ALLOWED_ORIGINS=https://rite.minsuibibes.com,https://www.rite.minsuibibes.com
SANCTUM_STATEFUL_DOMAINS=rite.minsuibibes.com,www.rite.minsuibibes.com,api.rite.minsuibibes.com

SESSION_DOMAIN=.minsuibibes.com
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
```

Then:

```bash
php artisan config:cache
```

`frontend/.env` is **not** committed. Keep production:

```env
VITE_API_BASE_URL=https://api.rite.minsuibibes.com
```

and rebuild after changing it (`npm run build`).

### Media uploads (413 errors)

Phone photos of a few MB can still fail if nginx defaults to `client_max_body_size 1m`. The SPA compresses images before upload; also set API host limits to **50M** (nginx + PHP). See [docs/deployment-apache.md](docs/deployment-apache.md#media-upload-limits-413-content-too-large).

More detail: [docs/deployment-apache.md](docs/deployment-apache.md)

## Optional local Docker

For local development only:

- [docs/local-docker.md](docs/local-docker.md)
- Root [docker-compose.yml](docker-compose.yml)

## Docs

| Doc | Purpose |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | How the system fits together |
| [docs/api.md](docs/api.md) | Public vs auth API routes |
| [docs/developer-guide.md](docs/developer-guide.md) | Tests, lint, CI |
| [docs/local-docker.md](docs/local-docker.md) | Local Compose |
| [docs/deployment-apache.md](docs/deployment-apache.md) | Production Apache / FTP notes |

## Common commands

**Backend**

```bash
cd backend
php artisan test
vendor/bin/pint
```

**Frontend**

```bash
cd frontend
npm run dev
npm run build
npm test
npm run lint
```

CI runs these gates via [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Security

- Open registration is **disabled** (admins via seed / ops only)
- CMS write endpoints require Sanctum session auth
- Never commit `.env` files (frontend and backend `.env` are gitignored)
- Change the seeded admin password on any non-local environment

## Repo layout

```text
RITE-Website/
├── frontend/          Vue SPA
├── backend/           Laravel API
├── docs/              Guides
├── docker-compose.yml Local Docker only
└── .github/workflows  CI
```