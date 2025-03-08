const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Statische Dateien aus dem 'public'-Ordner servieren
app.use(express.static(path.join(__dirname, 'app')));

// Standardroute für die Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Beispielroute für andere Seiten
app.get('/lotto', (req, res) => {
    res.sendFile(path.join(__dirname, 'lotto.html'));
});

// Fehlerbehandlung für unbekannte Routen
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
