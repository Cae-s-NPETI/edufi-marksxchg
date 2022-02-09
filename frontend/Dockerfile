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
COPY --from=builder /usr/app/build-node ./build-node

EXPOSE 3000

ENTRYPOINT ["node", "build-node/index.js"]
