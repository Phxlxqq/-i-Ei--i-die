const puppeteer = require('puppeteer');
const waitOn = require('wait-on');

describe('Custom Lottozahlen Generator Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        console.log("Warte auf Server...");
        try {
            await waitOn({
                resources: ['http://localhost:3000'],
                timeout: 10000,  // Timeout auf 10 Sekunden setzen
            });
            console.log("Server ist bereit!");  // Wenn der Server erreichbar ist, logge dies
        } catch (error) {
            console.error("Fehler beim Warten auf den Server: ", error);
            throw new Error("Server konnte nicht gestartet oder erreicht werden.");
        }

        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/custom.html');
    }, 15000);

    afterAll(async () => {
        await browser.close();
    });

    const extractNumbersFromText = (text) => text.match(/\d+/g).slice(1).map(Number);

    test('Generiert gültige Custom-Zahlen', async () => {

        await page.type('#drawCount', '5');
        await page.type('#totalNumbers', '10');
        await page.type('#drawSuperCount', '2');
        await page.type('#totalSuperNumbers', '10');
        await page.type('#anzahlZiehungen', '1');
        await page.click("button");
        await page.waitForSelector('.result');

        const resultText = await page.$eval('.result', el => el.textContent);
        const numbers = extractNumbersFromText(resultText);

        expect(numbers.length).toBe(7); // 5 Hauptzahlen + 2 Superzahlen
        expect(new Set(numbers.slice(0, 5)).size).toBe(5);
        expect(new Set(numbers.slice(5)).size).toBe(2);
    });

    test("Zeigt Fehler, wenn mehr Hauptzahlen als verfügbar gewählt werden", async () => {
        await page.type("#drawCount", "10");
        await page.type("#totalNumbers", "5");
        await page.type('#anzahlZiehungen', '1');
        await page.click("button");

        await page.waitForSelector(".error", { timeout: 3000 });

        const errorText = await page.$eval(".error", el => el.textContent);
        expect(errorText).toContain("Fehler: Die Anzahl der zu ziehenden Hauptzahlen ist größer als der Zahlenbereich.");
    });

    test("Zeigt Fehler, wenn mehr Superzahlen als verfügbar gewählt werden", async () => {
        await page.type("#drawCount", "5");
        await page.type("#totalNumbers", "10");
        await page.type("#drawSuperCount", "10");
        await page.type("#totalSuperNumbers", "5");
        await page.type('#anzahlZiehungen', '1');
        await page.click("button");

        await page.waitForSelector(".error", { timeout: 3000 });

        const errorText = await page.$eval(".error", el => el.textContent);
        expect(errorText).toContain("Fehler: Die Anzahl der zu ziehenden Superzahlen ist größer als der Zahlenbereich der Superzahlen.");
    });


    test('Regenerieren erzeugt neue Zahlen', async () => {
        await page.goto('http://localhost:3000/custom.html');
        await page.type('#drawCount', '6');
        await page.type('#totalNumbers', '49');
        await page.type('#totalSuperNumbers', '10');
        await page.type('#drawSuperCount', '3');
        await page.type('#anzahlZiehungen', '3');

        await page.click("button");
        const firstResult = await page.$eval('.result', el => el.textContent);

        await page.click("button");
        const secondResult = await page.$eval('.result', el => el.textContent);

        expect(firstResult).not.toBe(secondResult);
    });

    test('Zurück zur Homepage funktioniert', async () => {
        // Klicke auf den "Zurück zur Homepage"-Link
        await Promise.all([
            await page.goto('http://localhost:3000/custom.html'),
            page.waitForNavigation(),  // Warte, bis die Navigation abgeschlossen ist
            page.click('a[href="index.html"]')  // Suche nach dem Link, der zur Homepage führt
        ]);

        // Überprüfe, ob die URL korrekt ist
        expect(page.url()).toBe('http://localhost:3000/index.html');
    });
});
