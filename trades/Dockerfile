FROM node:16-alpine

RUN npm install -g pnpm

#WORKDIR /usr/app
COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY . ./
RUN pnpm install --frozen-lockfile

ENV NODE_ENV production
RUN pnpm run build

EXPOSE 9165
USER node

ENTRYPOINT ["pnpm", "run", "start:prod"]
