# Local Docker (development only)

This Compose stack is for **local development**. Production continues to use FTP/Apache (or your existing host). Do not deploy this Compose file as the production runtime.

## Services

- `api` — Laravel (`php artisan serve` on port 8000)
- `frontend` — Vite dev server on port 5173
- `mysql` — MySQL 8 (optional; switch backend `.env` to mysql)

## Quick start

```bash
# From repo root
cp backend/.env.example backend/.env
# Edit backend/.env: set APP_KEY (or generate after first container start),
# FRONTEND_URL=http://localhost:5173, and DB_* for mysql service if used.

cp frontend/.env.example frontend/.env
# VITE_API_BASE_URL=http://localhost:8000

docker compose up --build
```

Then open http://localhost:5173 and API http://localhost:8000.

Run migrations inside the API container:

```bash
docker compose exec api php artisan key:generate
docker compose exec api php artisan migrate --seed
```

## Notes

- Mounts source code for live reload
- Media files live under `backend/storage`
- For Laragon-native workflows, Docker is optional — see root README
