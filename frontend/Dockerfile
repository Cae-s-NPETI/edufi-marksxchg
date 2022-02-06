FROM node:16-alpine as builder

RUN npm install -g pnpm

COPY . ./usr/app
WORKDIR /usr/app

RUN pnpm install --frozen-lockfile
RUN pnpm run build:dev
RUN pnpm prune --production

FROM node:16-alpine as runner
ENV NODE_ENV production

# Copy necessary build ouputs
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/build-node ./build-node
COPY --from=builder /usr/app/.svelte-kit ./.svelte-kit

EXPOSE 9160

ENTRYPOINT ["npm", "run", "preview"]
