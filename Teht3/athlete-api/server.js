const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mariadb = require('mysql2');

// Luo Express-sovellus
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Luo yhteys MariaDB:hen
// Huomioi, että päähakemistosta löytyy Tietokanta.sql -tiedosto, jolla voit luoda tietokannan ja taulun
const db = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'sports_db'
});

// Yhteyden tarkistus
db.connect(err => {
    if (err) {
        console.log('Virhe, ei yhdistnyt:', err);
    } else {
        console.log('Yhdistynyt MariaDB');
    }
});

// REST-rajapinnan toteutus

// Hae kaikki urheilijat
app.get('/api/athletes', (req, res) => {
    db.query('SELECT * FROM athletes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Hae yksittäinen urheilija ID:n perusteella
app.get('/api/athletes/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM athletes WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result[0]);
    });
});

// Lisää uusi urheilija
app.post('/api/athletes', (req, res) => {
    const { firstName, lastName, nickname, birthDate, weight, imageUrl, sport, achievements } = req.body;
    db.query(
        'INSERT INTO athletes (firstName, lastName, nickname, birthDate, weight, imageUrl, sport, achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [firstName, lastName, nickname, birthDate, weight, imageUrl, sport, achievements],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

// Päivitä urheilija
app.put('/api/athletes/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, nickname, birthDate, weight, imageUrl, sport, achievements } = req.body;
    db.query(
        'UPDATE athletes SET firstName = ?, lastName = ?, nickname = ?, birthDate = ?, weight = ?, imageUrl = ?, sport = ?, achievements = ? WHERE id = ?',
        [firstName, lastName, nickname, birthDate, weight, imageUrl, sport, achievements, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id, ...req.body });
        }
    );
});

// Poista urheilija
app.delete('/api/athletes/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM athletes WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Urheilija poistettu' });
    });
});

// Palvelimen käynnistys
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
