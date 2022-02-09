ARG VITE_TRADES_HOST
FROM node:16-alpine as builder

RUN npm install -g pnpm

COPY . ./usr/app
WORKDIR /usr/app

RUN pnpm install --frozen-lockfile

ENV VITE_TRADES_HOST=${VITE_TRADES_HOST}
RUN echo aaaaaa ${VITE_TRADES_HOST}
RUN pnpm run build:dev
RUN pnpm prune --production

FROM node:16-alpine as runner
ENV NODE_ENV production

# Copy necessary build ouputs
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/build-node ./build-node

COPY ./startup.sh ./startup.sh
RUN chmod +x ./startup.sh

EXPOSE 3000

ENTRYPOINT ["sh", "./startup.sh", "${TRADES_HOST}"]
