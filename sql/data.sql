-- Insertion de données dans la table type
INSERT INTO type (nom_type)
VALUES
    ('Chien'),
    ('Chat'),
    ('Cheval'),
    ('Lapin'),
    ('Rongeur'),
    ('Oiseau');

-- Insertion de données dans la table membre
INSERT INTO membre (nom_membre, prenom_membre, email_membre, tel_membre, id_refuge,  id_dirigeant)
VALUES
    ('Dupont', 'Jean', 'jean.dupont@example.com', '1234567890', NULL, NULL),
    ('Durand', 'Marie', 'marie.durand@example.com', '9876543210', NULL, NULL),
    ('Martin', 'Pierre', 'pierre.martin@example.com', '1231231234', NULL, NULL),
    ('Leclerc', 'Sophie', 'sophie.leclerc@example.com', '4567891230', NULL, NULL);

-- Insertion de données dans la table refuge
INSERT INTO refuge (code_etablissement, nom_refuge, nbr_place, adresse_refuge, desc_refuge, id_gerant)
VALUES
    ('REF001', 'Refuge des Animaux', 50, '123 Rue des Animaux', 'Un refuge accueillant pour tous les animaux abandonnés.', 1),
    ('REF002', 'Sauvetage des Chiens', 30, '456 Avenue des Chiens', 'Un refuge spécialisé dans le sauvetage des chiens en danger.', 2),
    ('REF003', 'Refuge Félin', 40, '789 Boulevard des Chats', 'Un refuge dédié au bien-être des chats abandonnés.', 3);

-- SET REFUGE TO MEMBERS
UPDATE membre
SET id_refuge=1
WHERE id_membre=1;

UPDATE membre
SET id_refuge=2
WHERE id_membre=2;

UPDATE membre
SET id_refuge=3
WHERE id_membre=3;

UPDATE membre
SET id_refuge=1
WHERE id_membre=4;

-- Insertion de données dans la table adoptant
INSERT INTO adoptant (nom_adoptant, prenom_adoptant, email_adoptant, tel_adoptant, adresse_adoptant)
VALUES
    ('Tremblay', 'Jacques', 'jacques.tremblay@example.com', '1112223333', '1 Rue des Adoptants'),
    ('Gagnon', 'Isabelle', 'isabelle.gagnon@example.com', '4445556666', '2 Avenue des Amis des Animaux'),
    ('Roy', 'Sylvie', 'sylvie.roy@example.com', '7778889999', '3 Boulevard des Amoureux des Animaux');

-- Insertion de données dans la table animal
INSERT INTO animal (nom_animal, date_arrivee, age_animal, race_animal, desc_animal, frais_adoption, id_type, id_membre, id_refuge)
VALUES
    ('Bella', '2022-01-15', 3, 'Labrador', 'Une chienne joyeuse et joueuse, cherche une famille aimante.', 100.00, 1, 1, 1),
    ('Minou', '2022-02-20', 5, 'Siamois', 'Un chat câlin et sociable, parfait pour la vie en appartement.', 80.00, 2, 2, 2),
    ('Polly', '2022-03-10', 2, 'Perroquet', "Un perroquet bavard et coloré, idéal pour les amateurs d'oiseaux.", 150.00, 6, 3, 3),
  ('Flop', '2022-04-05', 1, 'Lapin nain', "Un adorable lapin nain, à la recherche d'un compagnon de jeux.", 60.00, 4, 4, 1),
    ('Spike', '2022-05-12', 4, 'Iguane', 'Un iguane calme et curieux, convient à un propriétaire expérimenté.', 120.00, 5, 3, 2),
    ('stuben', '2022-06-20', 3, 'Cheval', 'Un cheval de course, très rapide et en bonne santé.', 200.00, 3, 2, 3);

-- Insertion de données dans la table adopter
INSERT INTO adopter (id_adoptant, id_animal, somme_payee, date_debut_adoption, date_fin_adoption, date_controle)
VALUES
    (1, 1, 100.00, '2022-01-20', '2022-02-20', '2022-01-25'),
    (2, 2, 80.00, '2022-02-25', '2022-03-25', '2022-03-01'),
    (3, 3, 150.00, '2022-03-15', '2022-04-15', '2022-03-20'),
    (4, 4, 60.00, '2022-04-10', '2022-05-10', '2022-04-15'),
    (5, 5, 120.00, '2022-05-17', '2022-06-17', '2022-05-22'),
    (6, 6, 200.00, '2022-06-25', '2022-07-25', '2022-07-01');

-- Insertion de données dans la table video
INSERT INTO video (url_video, titre_video, desc_video, date_ajout)
VALUES
    ('https://www.youtube.com/shorts/vdfMFL5xAeY', 'Bella à adopter', 'Découvrez Bella, un adorable labrador à adopter dès maintenant !', '2022-01-10'),
    ('https://www.youtube.com/watch?v=603qfGnIhQQ', 'Minou cherche un foyer', "Rencontrez Minou, un chat siamois plein d'amour en attente de sa famille.", '2022-02-15'),
    ('https://www.youtube.com/shorts/0RXLL-GDHzk', 'Polly, le perroquet bavard', 'Polly, le perroquet bavard, vous fera rire avec ses répliques amusantes !', '2022-03-05'),
    ('https://www.youtube.com/shorts/AEV8vt9HhaM', 'Flop, le lapin nain', 'Flop, le lapin nain, cherche un compagnon de jeux pour s’amuser.', '2022-04-10'),
    ('https://www.youtube.com/shorts/M_3exm_1J_M', 'Spike, l’iguane curieux', 'Spike, l’iguane curieux, est à la recherche d’un propriétaire expérimenté.', '2022-05-15'),
    ('https://www.youtube.com/shorts/9KqfAN0dre0', 'Stuben, le cheval de course', 'Stuben, le cheval de course, est très rapide et en bonne santé.', '2022-06-25');
-- Insertion de données dans la table presenter
INSERT INTO presenter (id_video, id_animal)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6);

-- Insertion de données dans la table cohabiter
INSERT INTO cohabiter (id_animal, id_type)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5),
    (6, 3);
