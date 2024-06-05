CREATE DATABASE IF NOT EXISTS `petflix`;

USE `petflix`;

CREATE TABLE IF NOT EXISTS `type` (
    id_type INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom_type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `membre` (
    id_membre INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom_membre VARCHAR(255),
    prenom_membre VARCHAR(255),
    email_membre VARCHAR(255),
    tel_membre VARCHAR(20),
    id_refuge INTEGER,
    id_dirigeant INTEGER
);

CREATE TABLE IF NOT EXISTS `refuge` (
    id_refuge INTEGER PRIMARY KEY AUTO_INCREMENT,
    code_etablissement VARCHAR(255),
    nom_refuge VARCHAR(255),
    nbr_place INTEGER,
    adresse_refuge VARCHAR(255),
    desc_refuge TEXT,
    id_gerant INTEGER
);

CREATE TABLE IF NOT EXISTS `adoptant` (
 id_adoptant INTEGER PRIMARY KEY AUTO_INCREMENT,
 nom_adoptant VARCHAR(255),
    prenom_adoptant VARCHAR(255),
    email_adoptant VARCHAR(255),
    tel_adoptant VARCHAR(20),
    adresse_adoptant VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `animal` (
    id_animal INTEGER PRIMARY KEY AUTO_INCREMENT,
    nom_animal VARCHAR(255),
    date_arrivee DATETIME,
    age_animal INTEGER,
    race_animal VARCHAR(255),
    desc_animal TEXT,
    frais_adoption DOUBLE,
    id_type INTEGER,
    id_membre INTEGER,
    id_refuge INTEGER
);

CREATE TABLE IF NOT EXISTS `adopter` (
    id_adoptant INTEGER,
    id_animal INTEGER,
    somme_payee DOUBLE,
    date_debut_adoption DATETIME,
    date_fin_adoption DATETIME,
    date_controle DATETIME,
    PRIMARY KEY (id_adoptant, id_animal)
);

CREATE TABLE IF NOT EXISTS `presenter` (
    id_video INTEGER,
    id_animal INTEGER,
    PRIMARY KEY (id_video, id_animal)
);

CREATE TABLE IF NOT EXISTS `video` (
    id_video INTEGER PRIMARY KEY AUTO_INCREMENT,
    url_video VARCHAR(255),
    titre_video VARCHAR(255),
    desc_video TEXT,
    date_ajout DATETIME
);

CREATE TABLE IF NOT EXISTS `cohabiter` (
    id_animal INTEGER,
    id_type INTEGER,
    PRIMARY KEY (id_animal, id_type)
);

ALTER TABLE refuge
    ADD FOREIGN KEY (id_gerant) REFERENCES membre(id_membre);

ALTER TABLE membre
    ADD FOREIGN KEY (id_refuge) REFERENCES refuge(id_refuge),
    ADD FOREIGN KEY (id_dirigeant) REFERENCES membre(id_membre);

ALTER TABLE animal
    ADD FOREIGN KEY (id_type) REFERENCES type(id_type),
    ADD FOREIGN KEY (id_membre) REFERENCES membre(id_membre),
    ADD FOREIGN KEY (id_refuge) REFERENCES refuge(id_refuge);

ALTER TABLE adopter
    ADD FOREIGN KEY (id_adoptant) REFERENCES adoptant(id_adoptant),
    ADD FOREIGN KEY (id_animal) REFERENCES animal(id_animal);

ALTER TABLE presenter
    ADD FOREIGN KEY (id_video) REFERENCES video(id_video),
    ADD FOREIGN KEY (id_animal) REFERENCES animal(id_animal);

ALTER TABLE cohabiter
    ADD FOREIGN KEY (id_animal) REFERENCES animal(id_animal),
    ADD FOREIGN KEY (id_type) REFERENCES type(id_type);