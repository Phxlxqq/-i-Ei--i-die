const puppeteer = require("puppeteer");

describe("E2E Tests für Lotto-Webseite", async () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true
        });
        page = await browser.newPage();
    });

    // Warten, bis der Server verfügbar ist
    await waitOn({
        resources: ['http://localhost:3000'],
        timeout: 10000,  // 10 Sekunden warten
    });

    afterAll(async () => {
        await browser.close();
    });

    test("Soll die Startseite laden und Links enthalten", async () => {
        await page.goto("http://localhost:3000/index.html");
        const title = await page.title();
        expect(title).toBe("Zufallszahlen Generator");

        const links = await page.$$eval("a", (anchors) => anchors.map(a => a.href));
        expect(links.some(link => link.includes("lotto.html"))).toBe(true);
        expect(links.some(link => link.includes("eurojackpot.html"))).toBe(true);
        expect(links.some(link => link.includes("custom.html"))).toBe(true);
    });

    test("Soll eine Lotto-Ziehung generieren", async () => {
        await page.goto("http://localhost:3000/lotto.html");
        await page.click("button");
        await page.waitForSelector("#result");
        const resultText = await page.$eval("#result", el => el.innerText);
        expect(resultText).toMatch(/\d+\. Ziehung: (\d+, )+\d+ - \d/);
    });

    test("Soll eine Eurojackpot-Ziehung generieren", async () => {
        await page.goto("http://localhost:3000/eurojackpot.html");
        await page.click("button");
        await page.waitForSelector("#result");
        const resultText = await page.$eval("#result", el => el.innerText);
        expect(resultText).toMatch(/\d+\. Ziehung: (\d+, )+\d+ - \d, \d/);
    });

    test("Soll eine benutzerdefinierte Ziehung generieren", async () => {
        await page.goto("http://localhost:3000/custom.html");
        await page.type('#drawCount', '5');
        await page.type('#totalNumbers', '10');
        await page.type('#drawSuperCount', '2');
        await page.type('#totalSuperNumbers', '10');
        await page.type('#anzahlZiehungen', '1');
        await page.click("button");
        await page.waitForSelector('.result');
        const resultText = await page.$eval("#result", el => el.innerText);
        expect(resultText).toMatch(/^\d+\.\sZiehung:\s(\d{1,2},\s){4}\d{1,2}\s-\s(\d{1,2},\s){1}\d{1,2}$/);
    });
});