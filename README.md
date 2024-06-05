# 🎉 Petflix - Le Coin des Animaux Heureux 🐾

[![Actions Status](https://github.com/maxence-no-semifir/PetFlix-DEVOPS/actions/workflows/test-2-send-mail.yml/badge.svg)](https://github.com/maxence-no-semifir/PetFlix-DEVOPS/actions)
[![Actions Status](https://github.com/maxence-no-semifir/PetFlix-DEVOPS/actions/workflows/pr-mail.yml/badge.svg)](https://github.com/maxence-no-semifir/PetFlix-DEVOPS/actions)

Salut à toi, futur(e) sauveur(se) d'animaux ! Bienvenue dans l'univers de Petflix, où les vidéos d'adoption donnent vie à des histoires d'amour entre humains et animaux 🥰. C'est simple, c'est fun et surtout, ça change des vies !

## Ce qui te attend chez Petflix 🍿

- **Catalogue de vidéos d'adoption** : Fais défiler des vidéos canons et trouve ton coup de cœur ! 📺
- **Détails des animaux** : Appuie sur play, et tada ! Tu as toutes les infos sur ces boules de poils qui n'attendent que toi. 🐕💕
- **L'adoption facile** : Un animal te fait de l'œil ? Clique pour entamer l'aventure de l'adoption. 🏡
- **Des nouvelles post-adoption** : Reste en contact et vois comment ton nouveau compagnon prospère dans sa famille. 💌

## En route pour l'aventure Petflix ! 🚀

### Mise en route avec PowerShell 🧙‍♂️

Pour lancer le front et le back (notre super `petApi`), il suffit d'invoquer notre incantation moderne dans PowerShell :

```powershell
./start-dev.ps1
```

Ce grimoire digital va éveiller le projet pour toi, lançant tout ce qu'il faut pour commencer à développer ou juste pour explorer Petflix. 

### Mise à l'eau en production avec Docker 🐳

Quand tu es prêt(e) à faire naviguer Petflix sur les vastes mers d'Internet :

```sh
./start-prod.ps1
```

Lance cette commande et vois ton app partir à la conquête du web dans un Docker flambant neuf. 

## Configurer ton grimoire `.env` 📜

Petflix a besoin de sa potion magique pour fonctionner correctement - et cela passe par deux fichiers `.env` :

1. À la racine, le fichier `.env` s'occupe des réglages globaux. 🌍 Voici à quoi il devrait ressembler :

   ```
   API_KEY=ta_clef_api
   ```

   Remplace l'URL par celle où ton `petApi` s'éveille.

2. Dans le dossier `petApi`, le deuxième `.env` gère les secrets de l'API. 🗝️ Il devrait ressembler à ça :

   ```
   DB_HOST=localhost
   DB_USER=ton_utilisateur
   DB_PASS=ton_mot_de_passe
   DB_NAME=ta_base_de_donnees
   API_KEY=ta_cle_api_super_secrete
   ```

   Assure-toi de remplir les informations avec tes propres données de connexion à la base de données et ton API key.

## Toi + Petflix = ❤️

T'es prêt(e) à mettre tes supers pouvoirs au service des animaux ? Alors, clone le dépôt, lance-toi dans des modifications géniales et envoie-nous tes pull requests. Ensemble, faisons de Petflix le paradis des rencontres entre animaux et humains ! 🌟
Test team Github Action 3!