# Vérification et installation des dépendances du front-end avant de démarrer le serveur de développement
Write-Host "Construction du front-end..."
Start-Process PowerShell -ArgumentList "-NoExit", "-Command npm run start:dev;"
Write-Host "Démarrage du serveur de développement front-end..."

# Pause pour s'assurer que la commande précédente a le temps de s'exécuter correctement
Start-Sleep -Seconds 10

# Vérification et installation des dépendances du back-end avant de démarrer le serveur
Write-Host "Lancement de docker"
Start-Process PowerShell -ArgumentList "-NoExit", "-Command docker-compose up;"
Write-Host "Démarrage du docker..."

# Pause pour s'assurer que la commande précédente a le temps de s'exécuter correctement
Start-Sleep -Seconds 30

# Vérification et installation des dépendances du back-end avant de démarrer le serveur
Write-Host "Installation de l'api"
Start-Process PowerShell -ArgumentList "-NoExit", "-Command node server.js;"
Write-Host "Démarrage de l'api..."
