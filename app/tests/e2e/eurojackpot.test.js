const puppeteer = require('puppeteer');

describe('Eurojackpot Generator Tests', async () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({headless: true});
        page = await browser.newPage();
        await page.goto('http://localhost:3000/eurojackpot.html');
    });

    // Warten, bis der Server verfügbar ist
    await waitOn({
        resources: ['http://localhost:3000'],
        timeout: 10000,  // 10 Sekunden warten
    });

    afterAll(async () => {
        await browser.close();
    });

    const extractNumbersFromText = (text) => text.match(/\d+/g).slice(1).map(Number);

    test('Generiert gültige Eurojackpot-Zahlen', async () => {
        await page.click("button");
        await page.waitForSelector('.result');

        const resultText = await page.$eval('.result', el => el.textContent);
        const numbers = extractNumbersFromText(resultText);

        expect(numbers.length).toBe(7); // 5 Hauptzahlen + 2 Superzahlen
        expect(new Set(numbers.slice(0, 5)).size).toBe(5);
        expect(new Set(numbers.slice(5)).size).toBe(2);
    });

    test('Regenerieren erzeugt neue Zahlen', async () => {
        await page.click("button");
        const firstResult = await page.$eval('.result', el => el.textContent);

        await page.click("button");
        const secondResult = await page.$eval('.result', el => el.textContent);

        expect(firstResult).not.toBe(secondResult);
    });

    test('Zurück zur Homepage funktioniert', async () => {
        // Klicke auf den "Zurück zur Homepage"-Link
        await Promise.all([
            page.waitForNavigation(),  // Warte, bis die Navigation abgeschlossen ist
            page.click('a[href="index.html"]')  // Suche nach dem Link, der zur Homepage führt
        ]);

        // Überprüfe, ob die URL korrekt ist
        expect(page.url()).toBe('http://localhost:3000/index.html');
    });
});
