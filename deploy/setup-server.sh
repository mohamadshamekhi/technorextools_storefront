#!/usr/bin/env bash
# One-time host setup for the storefront on the shared Ubuntu box that already
# runs the API (/root/projects/api). Idempotent. Run as root (or with sudo).
#   ./deploy/setup-server.sh
set -Eeuo pipefail

DOMAIN="technorextools.com"
WWW_DOMAIN="www.technorextools.com"
NGINX_CONF="/etc/nginx/sites-available/abzar-storefront"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log() { printf '\033[1;34m[setup]\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m[setup] %s\033[0m\n' "$*" >&2; exit 1; }

[[ $EUID -eq 0 ]] || die "run as root (or with sudo)"
command -v nginx >/dev/null || die "nginx not installed on the host"

# --- DNS preflight: certbot fails if A records don't point here yet ----------
SERVER_IP="$(curl -fsS --max-time 5 https://api.ipify.org || true)"
log "server IP: ${SERVER_IP:-unknown}"
for d in "$DOMAIN" "$WWW_DOMAIN"; do
  resolved="$(getent ahostsv4 "$d" | awk 'NR==1{print $1}' || true)"
  log "$d -> ${resolved:-<no A record>}"
  if [[ -n "$SERVER_IP" && "$resolved" != "$SERVER_IP" ]]; then
    log "WARNING: $d does not resolve to this server. Fix the A record before certbot."
  fi
done

command -v certbot >/dev/null || { log "installing certbot"; apt-get update -qq && apt-get install -y certbot python3-certbot-nginx; }

mkdir -p /var/www/html

if [[ -f "$NGINX_CONF" ]] && grep -q 'listen 443' "$NGINX_CONF"; then
  log "$NGINX_CONF already TLS-enabled — leaving it untouched"
else
  log "installing $NGINX_CONF"
  install -m 644 "$SRC_DIR/nginx/abzar-storefront.conf" "$NGINX_CONF"
  ln -sfn "$NGINX_CONF" /etc/nginx/sites-enabled/abzar-storefront
  nginx -t && systemctl reload nginx
  log "requesting certificate"
  certbot --nginx -d "$DOMAIN" -d "$WWW_DOMAIN" --redirect
fi

# ufw stays 22/80/443 only — the app binds 127.0.0.1:3000, no rule needed.
log "ufw untouched (app is loopback-only)"
nginx -t && systemctl reload nginx
log "done — now: cp deploy/env.production.example .env.production && ./deploy/deploy.sh"
