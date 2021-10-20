# NPM INSTALL
FROM node:14-alpine as dependencies
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install --no-progress

# Angular build
FROM dependencies as build
ARG ENV
COPY . /app
RUN npm run build

# Final image
FROM nginx:1.19.2-alpine
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build "/app/dist/heroesApp"  /usr/share/nginx/html