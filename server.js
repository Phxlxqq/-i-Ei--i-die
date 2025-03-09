const express = require('express');
const path = require('path');
const puppeteer = require("puppeteer");
const app = express();
const port = process.env.PORT || 3000;

beforeAll(async () => {
    console.log("Starte Server...");
    server = app.listen(3000);  // Server starten

    console.log("Warte auf Server...");
    try {
        await waitOn({
            resources: ['http://localhost:3000'],
            timeout: 60000,  // Timeout für 60 Sekunden
        });
        console.log("Server ist bereit!");  // Sicherstellen, dass der Server verfügbar ist
    } catch (error) {
        console.error("Server war nicht erreichbar: ", error);
        throw new Error("Server konnte nicht gestartet oder erreicht werden.");
    }

    console.log("Starte Puppeteer...");
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Sicherstellen, dass Puppeteer mit richtigen Argumenten läuft
    });
});

// Statische Dateien aus dem 'public'-Ordner servieren
app.use(express.static(path.join(__dirname, 'app')));

// Standardroute für die Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Der Pfad zu index.html muss relativ zu public sein
});

// Beispielroute für andere Seiten
app.get('/lotto', (req, res) => {
    res.sendFile(path.join(__dirname, 'lotto.html'));  // Auch hier den richtigen Pfad zur Lotto-Seite verwenden
});

// Fehlerbehandlung für unbekannte Routen
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
