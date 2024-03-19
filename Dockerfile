FROM node:18.12.0-alpine as build

WORKDIR /app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.23.2-alpine as start

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

ENTRYPOINT ["ngix", "-g", "daemon off;"]