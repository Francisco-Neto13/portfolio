#!/usr/bin/env bash
# Puts origin/main in production. Runs as root through /usr/local/sbin/portfolio-deploy (see
# configurar-deploy.sh), always the version of this file that is on origin/main.
# Arguments: <project path> <dry-run: true|false>
set -euo pipefail

CODIGO="${1:?project path}"
DRY_RUN="${2:-false}"

exec 9>/run/portfolio-deploy.lock
flock -w 900 9

if ! systemctl is-active --quiet docker.service; then
  echo "FALHA: o Docker está parado (o servidor reiniciou?). Suba o Docker e rode o deploy de novo." >&2
  exit 1
fi

cd "$CODIGO"
git fetch --quiet origin
COMPOSE="docker compose -f docker-compose.prod.yml"

if [ "$DRY_RUN" = "true" ]; then
  echo "[dry-run] Versão atual: $(git log --oneline -1 HEAD | cut -c1-72)"
  echo "[dry-run] Commits que seriam aplicados:"
  git log --oneline HEAD..origin/main | cut -c1-72
  $COMPOSE config -q
  echo "[dry-run] SSH, Docker e Compose OK. Nada foi alterado."
  exit 0
fi

git reset --quiet --hard origin/main

# The network shared with the reverse proxy
docker network inspect borda > /dev/null 2>&1 || docker network create borda > /dev/null

# Stops before replacing the container if the build fails: the running version stays up
$COMPOSE build
$COMPOSE up -d --wait

# Only images of this project
docker image prune --force --filter label=app=portfolio > /dev/null
echo "Deploy concluído: $(git log --oneline -1 HEAD | cut -c1-72)"
