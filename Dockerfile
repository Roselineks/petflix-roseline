# Étape 1: Construction de l'application React
FROM node:16-alpine as build
WORKDIR /app
COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src
COPY ./webpack.config.js ./webpack.config.js
COPY ./webpack.DefinePlugin ./webpack.DefinePlugin
COPY package.json package-lock.json ./
COPY ./custom.d.ts ./custom.d.ts
RUN npm install
RUN npm run build:prod

# Étape 2: Configuration de NGINX pour servir l'app React
FROM nginx:alpine
# Ajouter le gestionnaire de paquets pour Node.js (npm) et Node.js lui-même
RUN apk add --update nodejs npm
# Copie des fichiers build de React dans le dossier de NGINX
COPY --from=build /app/dist /usr/share/nginx/html
# Personnalisation de la configuration NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Exposition du port 80 pour NGINX
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]
