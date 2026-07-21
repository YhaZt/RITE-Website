# Production deployment (FTP / Apache)

Production for this project remains a classic **build frontend → upload via FTP → Apache serves PHP + static assets** workflow. Docker Compose in this repo is **not** the production path.

## Typical layout

1. Build the SPA:

```bash
cd frontend
npm ci
npm run build
```

2. Upload `frontend/dist/*` to the public web root (or a subdirectory) via FTP.

3. Upload the Laravel `backend/` application (excluding `node_modules`, tests if desired). Point Apache document root for the API to `backend/public`, **or** reverse-proxy `/api` to `public/index.php`.

4. On the server:

```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate   # once
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan storage:link
```

5. Configure production `.env`:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL` / `FRONTEND_URL` to real HTTPS origins
- `SANCTUM_STATEFUL_DOMAINS` to the SPA host
- `SESSION_SECURE_COOKIE=true`
- Strong DB credentials and mail settings
- Change the seeded admin password immediately

## Apache

Use `backend/public/.htaccess` for Laravel. Ensure `mod_rewrite` is enabled. SPA history mode needs a fallback to `index.html` for frontend routes.

## Media upload limits (413 Content Too Large)

The SPA compresses images in the browser before upload, but the **API host** must still allow a reasonable POST body (galleries / uncompressed files).

**Nginx** (API vhost `server { }` block):

```nginx
client_max_body_size 50M;
```

Then: `sudo nginx -t && sudo systemctl reload nginx`

**PHP** (`php.ini` or FPM pool):

```ini
upload_max_filesize = 50M
post_max_size = 50M
```

Then restart PHP-FPM, e.g. `sudo systemctl restart php8.2-fpm`.

Laravel media validation allows up to 50MB; images are converted to WebP on the server.

## Security checklist

- [ ] `APP_DEBUG=false`
- [ ] HTTPS + secure cookies
- [ ] CORS origins locked to the real SPA host
- [ ] No `.env` in the web root / not downloadable
- [ ] Storage and uploads not executable as PHP
- [ ] `client_max_body_size` / PHP upload limits raised (see above)
