FROM node:lts-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:lts-alpine3.20

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

RUN npm i -g serve

CMD [ "serve", "-s", "dist" ]

EXPOSE 3000
