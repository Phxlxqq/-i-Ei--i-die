const puppeteer = require('puppeteer');

describe('Lotto Generator Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/lotto.html');
    }, 15000);

    afterAll(async () => {
        await browser.close();
    });

    const extractNumbersFromText = (text) => text.match(/\d+/g).slice(1).map(Number);

    test('Generiert gültige Lotto-Zahlen', async () => {
        await page.click("button");
        await page.waitForSelector('.result');

        const resultText = await page.$eval('.result', el => el.textContent);
        const numbers = extractNumbersFromText(resultText);
        //console.log("Extracted text:", resultText);
        //console.log("Extracted numbers:", numbers);
        expect(numbers.length).toBe(7); // 6 Hauptzahlen + 1 Superzahlen
        expect(new Set(numbers.slice(0, 6)).size).toBe(6);  // Keine Dopplung in der Ziehung
        expect(new Set([numbers[6]]).size).toBe(1); //genau eine Superzahl
    });

    test('Regenerieren erzeugt neue Zahlen', async () => {
        await page.click("button");
        const firstResult = await page.$eval('.result', el => el.textContent);

        await page.click("button");
        const secondResult = await page.$eval('.result', el => el.textContent);

        expect(firstResult).not.toBe(secondResult);
    }, 60000);

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
