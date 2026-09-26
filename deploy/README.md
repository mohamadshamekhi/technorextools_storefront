# Deploy — abzar-storefront

Host: shared Ubuntu box with `abzar-api`. nginx + certbot run on the **host**;
this app runs in docker and binds `127.0.0.1:3000` only (ufw allows 22/80/443).

## First time

```bash
# on the server, as deploy
git clone <repo> /home/deploy/abzar-storefront
cd /home/deploy/abzar-storefront
cp .env.production.example .env.production   # fill in API_SERVICE_TOKEN + DOCUMENT_SIGNING_SECRET
sudo ./deploy/setup-server.sh                # nginx vhost + certbot (checks DNS first)
./deploy/deploy.sh
```

`API_SERVICE_TOKEN` must be byte-identical to the value in `abzar-api`'s
`.env.production` — it is sent as `X-Service-Token`; a mismatch rejects those routes.
`DOCUMENT_SIGNING_SECRET` must be >= 16 chars or the build fails (`config/env.ts`).

DNS: both `technorextools.com` and `www.technorextools.com` need A records on this
server's IP **before** certbot runs, otherwise issuance fails.

## Updates

```bash
cd /home/deploy/abzar-storefront && ./deploy/deploy.sh
```

Pulls, rebuilds, restarts, waits for `/api/health`, prints logs and aborts on failure.
`./deploy/deploy.sh --no-pull` to deploy the working tree as-is.

## Checks

```bash
curl -fsS http://127.0.0.1:3000/api/health            # container
curl -fsS https://www.technorextools.com/api/health   # through nginx/TLS
curl -fsS https://api.technorextools.com/health       # backend (un-versioned)
docker compose -f docker-compose.prod.yml --env-file .env.production logs -f web
```

## CORS

The API only allows `https://{,www.}technorextools.com` and
`https://{,www.}backoffice.technorextools.com`. Any preview/staging domain must be
added to the API's `CORS_ORIGIN` by the server owner first.
