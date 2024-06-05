const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes and origins
app.use(cors());

app.use(bodyParser.json());

// Configuration for MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'petflix'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database successfully!');
});

// Route to fetch all adoptions
app.get('/api/adoptions', (req, res) => {
    const query = `SELECT animal.nom_animal, adoptant.prenom_adoptant, adoptant.nom_adoptant, adopter.date_debut_adoption,
                   adopter.date_fin_adoption, adopter.date_controle, adopter.somme_payee
                   FROM adopter
                   JOIN animal ON adopter.id_animal = animal.id_animal
                   JOIN adoptant ON adopter.id_adoptant = adoptant.id_adoptant`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(results);
    });
});



// Route to fetch member information by ID
app.get('/api/members/:id', (req, res) => {
    const query = `SELECT * FROM members WHERE id_member = ${mysql.escape(req.params.id)}`;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});

// Route to fetch refuge information by ID
app.get('/api/refuge/:id', (req, res) => {
    const query = `SELECT * FROM refuge WHERE id_refuge = ${mysql.escape(req.params.id)}`;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// *****************************************************
// Pour le site internet afin de l'adapter au front 
// *****************************************************

// Route to fetch all animal types
app.get('/api/animal-types', (req, res) => {
    const query = "SELECT id_type, nom_type FROM type";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed: ' + error);
            return;
        }
        res.json(results);
    });
});

// Route to fetch unique names of adopters
app.get('/api/adopters/names', (req, res) => {
    const query = "SELECT DISTINCT nom_adoptant, prenom_adoptant FROM adoptant";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(results.map(adopter => `${adopter.prenom_adoptant} ${adopter.nom_adoptant}`));
    });
});


// Route to fetch animal names and adoption fees for the adoption form
app.get('/api/animals/adoption-fees', (req, res) => {
    const query = "SELECT nom_animal, frais_adoption FROM animal";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(results);
    });
});

// Route to fetch animal names and adoption fees for the adoption form
app.get('/api/controls', (req, res) => {
    const query = "SELECT DATE_FORMAT(a.date_controle, '%d/%m/%Y') AS 'date_controle', an.nom_animal, ad.nom_adoptant, ad.adresse_adoptant, m.nom_membre FROM adopter a INNER JOIN animal an ON a.id_animal = an.id_animal INNER JOIN adoptant ad ON a.id_adoptant = ad.id_adoptant INNER JOIN membre m ON an.id_membre = m.id_membre; ";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(results);
    });
});


// Route to add a new animal to the database
app.post('/api/add/animals', (req, res) => {
    const { nom_animal, date_arrivee, age_animal, race_animal, desc_animal, frais_adoption, id_type, id_membre, id_refuge } = req.body;
    const query = `
        INSERT INTO animal (nom_animal, date_arrivee, age_animal, race_animal, desc_animal, frais_adoption, id_type, id_membre, id_refuge)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [nom_animal, date_arrivee, age_animal, race_animal, desc_animal, frais_adoption, id_type, id_membre, id_refuge], (error, results) => {
        if (error) {
            res.status(500).send('Failed to add new animal: ' + error);
            return;
        }
        res.status(201).send('New animal added successfully');
    });
});

// Route to add a new video to the database
app.post('/api/add/videos', (req, res) => {
    const { url_video, titre_video, desc_video, date_ajout } = req.body;
    const query = `
        INSERT INTO video (url_video, titre_video, desc_video, date_ajout)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [url_video, titre_video, desc_video, date_ajout], (error, results) => {
        if (error) {
            res.status(500).send('Failed to add new video: ' + error);
            return;
        }
        res.status(201).send('New video added successfully');
    });
});


// Route to add a new adopter to the database
app.post('/api/add/adopters', (req, res) => {
    const { nom_adoptant, prenom_adoptant, email_adoptant, tel_adoptant, adresse_adoptant } = req.body;
    const checkQuery = `SELECT * FROM adoptant WHERE email_adoptant = ?`;
    
    db.query(checkQuery, [email_adoptant], (checkError, checkResults) => {
        if (checkError) {
            res.status(500).send('Database query failed during check: ' + checkError);
            return;
        }
        if (checkResults.length > 0) {
            res.status(409).send('Adopter already exists in the database.');
            return;
        }

        const insertQuery = `
            INSERT INTO adoptant (nom_adoptant, prenom_adoptant, email_adoptant, tel_adoptant, adresse_adoptant)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(insertQuery, [nom_adoptant, prenom_adoptant, email_adoptant, tel_adoptant, adresse_adoptant], (insertError, insertResults) => {
            if (insertError) {
                res.status(500).send('Failed to add new adopter: ' + insertError);
                return;
            }
            res.status(201).send('New adopter added successfully');
        });
    });
});

// Route to add a new adoption record to the database
app.post('/api/add/adoptions', (req, res) => {
    const { id_adoptant, id_animal, somme_payee, date_debut_adoption, date_fin_adoption, date_controle } = req.body;
    const query = `
        INSERT INTO adopter (id_adoptant, id_animal, somme_payee, date_debut_adoption, date_fin_adoption, date_controle)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [id_adoptant, id_animal, somme_payee, date_debut_adoption, date_fin_adoption, date_controle], (error, results) => {
        if (error) {
            res.status(500).send('Failed to add adoption record: ' + error);
            return;
        }
        res.status(201).send('Adoption record added successfully');
    });
});



// Route to fetch names of all refuges
app.get('/api/refuges', (req, res) => {
    const query = "SELECT nom_refuge FROM refuge";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(results);
    });
});


// Route to fetch the names and surnames of all members associated with refuges
app.get('/api/members/names', (req, res) => {
    const query = `
        SELECT m.nom_membre, m.prenom_membre, r.nom_refuge
        FROM membre m
        JOIN refuge r ON m.id_refuge = r.id_refuge
        WHERE m.id_refuge IS NOT NULL
    `;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(results);
    });
});


// Route to fetch animal data by ID
app.get('/api/animal/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});

// Route to fetch animal data by ID
app.get('/api/dogs/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
    AND a.id_type = 1
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// Route to fetch animal data by ID
app.get('/api/cats/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
    AND a.id_type = 2
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// Route to fetch animal data by ID
app.get('/api/horses/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
    AND a.id_type = 3
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// Route to fetch animal data by ID
app.get('/api/rabbits/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
    AND a.id_type = 4
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// Route to fetch animal data by ID
app.get('/api/rodents/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
    AND a.id_type = 5
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// Route to fetch animal data by ID
app.get('/api/birds/:id', (req, res) => {
    const query = `SELECT
    a.id_animal AS 'id',
    a.nom_animal AS 'name',
    a.nom_animal AS 'original_name',
    a.desc_animal AS 'overview',
    DATE_FORMAT(a.date_arrivee, '%Y-%m-%d') AS 'first_air_date',
    JSON_ARRAY(a.id_type) AS 'genre_ids',  -- Wrap the id_type in a JSON array
    ROUND(RAND() * 1000, 2) AS 'popularity',  
    ROUND(RAND() * 10, 1) AS 'vote_average',  
    FLOOR(RAND() * 1000) AS 'vote_count',  
    JSON_ARRAY('FRA') AS 'origin_country',  
    'FR' AS 'original_language',  
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal LIMIT 1) AS 'poster_path',
    (SELECT url_video FROM video v JOIN presenter p ON v.id_video = p.id_video WHERE p.id_animal = a.id_animal ORDER BY v.date_ajout DESC LIMIT 1) AS 'backdrop_path',
    m.nom_membre AS 'nom_membre',
    m.prenom_membre AS 'prenom_membre',
    m.email_membre AS 'email_membre',
    m.tel_membre AS 'tel_membre'
FROM
    animal a
JOIN
    membre m ON a.id_membre = m.id_membre
WHERE
    a.id_animal IS NOT NULL  -- Assuming you meant to have a condition here
    AND a.id_type = 6
LIMIT 0, 25;

    `;
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send('Database query failed');
            return;
        }
        res.json(result);
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
