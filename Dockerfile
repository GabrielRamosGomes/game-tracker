# syntax = docker/dockerfile:1

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /app

# Build
FROM base as build

RUN corepack enable

COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --production=false

COPY --link . .

RUN pnpm run build
RUN pnpm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /app/.output /app/.output

CMD [ "node", ".output/server/index.mjs" ]