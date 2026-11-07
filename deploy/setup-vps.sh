#!/usr/bin/env bash
# One-time (and re-runnable) setup of the Shellvia site on the VPS.
#
#   scp -r deploy you@72.61.199.143:/tmp/shellvia-deploy
#   scp shellvia_deploy.pub you@72.61.199.143:/tmp/shellvia-deploy/
#   ssh you@72.61.199.143
#   sudo bash /tmp/shellvia-deploy/setup-vps.sh /tmp/shellvia-deploy/shellvia_deploy.pub you@example.com
#
# Run it only once the six DNS names point to this server: certbot checks them.
# It adds one nginx site and one user; the other sites are left untouched.
set -euo pipefail

PUBKEY_FILE=${1:?usage: setup-vps.sh <deploy-public-key-file> <letsencrypt-email>}
EMAIL=${2:?usage: setup-vps.sh <deploy-public-key-file> <letsencrypt-email>}
HERE=$(cd "$(dirname "$0")" && pwd)
SITE_DIR=/var/www/shellvia
ACME_DIR=/var/www/letsencrypt
DEPLOY_USER=deploy
CERT_NAME=shellvia
DOMAINS=(shellvia.com www.shellvia.com shellvia.fr www.shellvia.fr shellvia.app www.shellvia.app)
SITE_CONF=/etc/nginx/sites-available/shellvia.conf

step() { printf '\n== %s\n' "$1"; }
die() { printf 'Error: %s\n' "$1" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "run with sudo"
grep -q '^ssh-ed25519 ' "$PUBKEY_FILE" || die "$PUBKEY_FILE is not an ed25519 public key"
command -v nginx >/dev/null || die "nginx is not installed"

step "Packages (certbot, rsync)"
apt-get update -qq
apt-get install -y -qq certbot rsync python3 >/dev/null
RRSYNC=$(command -v rrsync || true)
[ -n "$RRSYNC" ] || die "rrsync not found (expected with the rsync package)"

step "Folders"
id "$DEPLOY_USER" >/dev/null 2>&1 || useradd --create-home --shell /bin/sh "$DEPLOY_USER"
# '*' = no password login, but not a locked account (key login keeps working).
usermod -p '*' "$DEPLOY_USER"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 755 "$SITE_DIR"
install -d -m 755 "$ACME_DIR"

step "Deploy key: write-only rsync into $SITE_DIR, nothing else"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 700 "/home/$DEPLOY_USER/.ssh"
printf 'command="%s -wo %s",restrict %s\n' "$RRSYNC" "$SITE_DIR" "$(head -n1 "$PUBKEY_FILE")" \
  > "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
if grep -Eqi '^\s*AllowUsers' /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf 2>/dev/null; then
  echo "Warning: sshd has an AllowUsers list: add '$DEPLOY_USER' to it, then: systemctl reload ssh"
fi

step "nginx snippets"
install -m 644 "$HERE/nginx/shellvia-tls.conf" /etc/nginx/snippets/shellvia-tls.conf
install -m 644 "$HERE/nginx/shellvia-headers.conf" /etc/nginx/snippets/shellvia-headers.conf

if [ ! -f "/etc/letsencrypt/live/$CERT_NAME/fullchain.pem" ]; then
  step "Certificate (first run): temporary HTTP-only site for the challenge"
  cat > "$SITE_CONF" <<CONF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAINS[*]};
    location /.well-known/acme-challenge/ { root $ACME_DIR; }
    location / { return 404; }
}
CONF
  ln -sf "$SITE_CONF" /etc/nginx/sites-enabled/shellvia.conf
  nginx -t
  systemctl reload nginx
  certbot certonly --webroot -w "$ACME_DIR" --cert-name "$CERT_NAME" \
    --non-interactive --agree-tos -m "$EMAIL" \
    --deploy-hook "systemctl reload nginx" \
    $(printf -- '-d %s ' "${DOMAINS[@]}")
fi

step "nginx site"
install -m 644 "$HERE/nginx/shellvia.conf" "$SITE_CONF"
ln -sf "$SITE_CONF" /etc/nginx/sites-enabled/shellvia.conf
nginx -t
systemctl reload nginx

step "Done"
echo "Compare this fingerprint with deploy/known_hosts in the repository:"
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
echo "Renewal is automatic (certbot timer): systemctl list-timers | grep certbot"
