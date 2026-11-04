# Standalone build: the final image has only the server and its traced dependencies, without
# sources or the full node_modules.
FROM node:24-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
# NEXT_PUBLIC_* is written into the bundle and the static routes during the build
ARG NEXT_PUBLIC_SITE_URL=https://chiconeto.dev
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM node:24-slim
WORKDIR /app
LABEL app=portfolio
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
# Docker sets HOSTNAME to the container id, and the server would listen only on that address
ENV HOSTNAME=0.0.0.0

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
