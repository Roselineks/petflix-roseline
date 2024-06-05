# Vérification et installation des dépendances du front-end avant de démarrer le serveur de développement
echo "Construction du front-end..."
npm run build:prod
echo "Démarrage du serveur de développement front-end..."

# Pause pour s'assurer que la commande précédente a le temps de s'exécuter correctement
sleep 10

# Vérification et installation des dépendances du back-end avant de démarrer le serveur
echo "Lancement de docker"
docker-compose up -d
echo "Démarrage du docker..."

# Pause pour s'assurer que la commande précédente a le temps de s'exécuter correctement
sleep 30

# Installation des dépendances du back-end et démarrage du serveur
echo "Installation de l'api"
docker exec -it petflix-nginx-1 apk add --update nodejs npm
docker cp ./petApi/. petflix-nginx-1:/usr/share/nginx/html/api
docker exec -it petflix-nginx-1 /bin/sh -c 'cd /usr/share/nginx/html/api && node app.js'
echo "Démarrage de l'api..."
