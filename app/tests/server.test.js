// const puppeteer = require('puppeteer');
// const waitOn = require('wait-on');
// const app = require('../../server');  // Hier importierst du die Express-Anwendung
//
// let browser;
// let page;
// let server;
//
// afterAll(async () => {
//     await browser.close();  // Schließe den Browser
//     server.close();  // Schließe den Server, wenn der Test vorbei ist
// });
//
// test('Server wird gestartet', async() => {
//     console.log("Starte Server...");
//     server = await new Promise(async (resolve, reject) => {
//         const s = await app.listen(3000, () => {
//             console.log('Server läuft auf http://localhost:3000');
//             resolve(s);  // Auf den erfolgreichen Start des Servers warten
//         });
//
//         s.on('error', (err) => {
//             reject(err);  // Fehler beim Starten des Servers
//         });
//     });
//
//     console.log("Warte auf Server...");
//     try {
//         await waitOn({
//             resources: ['http://localhost:3000'],
//             timeout: 10000,  // Timeout auf 10 Sekunden setzen
//         });
//         console.log("Server ist bereit!");  // Wenn der Server erreichbar ist, logge dies
//     } catch (error) {
//         console.error("Fehler beim Warten auf den Server: ", error);
//         throw new Error("Server konnte nicht gestartet oder erreicht werden.");
//     }
//
//     console.log("Starte Puppeteer...");
//     browser = await puppeteer.launch({
//         headless: true, // Teste im headless Mode
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],  // Diese Flags sind notwendig für das Ausführen von Puppeteer auf CI-Servern
//     });
//
//     page = await browser.newPage();
// });
