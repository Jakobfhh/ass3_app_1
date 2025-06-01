const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
const retry = 5;  // Versuche es bis zu 5 Mal
let attempts = 0;


// Funktion, um die Datenbank zu verbinden und bei Bedarf erneut zu versuchen
function connectDB(callback) {
  const db = mysql.createConnection({
    host: 'mysql', // Der Name des MySQL-Services im docker-compose.yml
    user: 'root',
    password: 'secret',
    database: 'todos'
  });

  db.connect((err) => {
    if (err) {
      console.log('Fehler beim Verbinden mit der Datenbank:', err.message);
      if (attempts < retry) {
        attempts++;
        console.log(`Versuch ${attempts} von ${retry}...`);
        setTimeout(() => connectDB(callback), 5000); // 5 Sekunden warten und es erneut versuchen
      } else {
        console.log('Datenbankverbindung konnte nicht hergestellt werden.');
        process.exit(1); // Beende den Prozess, wenn die Verbindung nach mehreren Versuchen fehlschlägt
      }
    } else {
      console.log('Erfolgreich mit der Datenbank verbunden.');
      callback(db); // Übergib die Verbindung zurück an die Callback-Funktion
    }
  });
}

// Die Hauptfunktion, um die App und die Endpunkte zu starten
function startApp(db) {
  app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todo_items', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.post('/todos', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO todo_items (name) VALUES (?)', [name], (err, results) => {
      if (err) throw err;
      res.status(201).json({ id: results.insertId, name });
    });
  });

  app.listen(3000, () => {
    console.log('App is running on port 3000');
  });
}

// Initiale Verbindung zur Datenbank herstellen und die App starten
connectDB(startApp);
