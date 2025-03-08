const puppeteer = require("puppeteer");

describe("E2E Tests für Lotto-Webseite", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test("Soll die Startseite laden und Links enthalten", async () => {
        await page.goto("http://localhost:3000/app");
        const title = await page.title();
        expect(title).toBe("Zufallszahlen Generator");

        const links = await page.$$eval("a", (anchors) => anchors.map(a => a.href));
        expect(links.some(link => link.includes("lotto.html"))).toBe(true);
        expect(links.some(link => link.includes("eurojackpot.html"))).toBe(true);
        expect(links.some(link => link.includes("custom.html"))).toBe(true);
    });

    test("Soll eine Lotto-Ziehung generieren", async () => {
        await page.goto("http://localhost:3000/app/lotto");
        await page.click("button");
        await page.waitForSelector("#result");
        const resultText = await page.$eval("#result", el => el.innerText);
        expect(resultText).toMatch(/\d+\. Ziehung: (\d+, )+\d+ - \d/);
    });

    test("Soll eine Eurojackpot-Ziehung generieren", async () => {
        await page.goto("http://localhost:3000/app/eurojackpot");
        await page.click("button");
        await page.waitForSelector("#result");
        const resultText = await page.$eval("#result", el => el.innerText);
        expect(resultText).toMatch(/\d+\. Ziehung: (\d+, )+\d+ - \d, \d/);
    });

    test("Soll eine benutzerdefinierte Ziehung generieren", async () => {
        await page.goto("http://localhost:3000/app/custom");
        await page.type('#drawCount', '5');
        await page.type('#totalNumbers', '10');
        await page.type('#drawSuperCount', '2');
        await page.type('#totalSuperNumbers', '10');
        await page.type('#anzahlZiehungen', '1');
        await page.click("button");
        await page.waitForSelector('.result');
        const resultText = await page.$eval("#result", el => el.innerText);
        //console.log("Extracted text:", resultText);
        expect(resultText).toMatch(/^\d+\.\sZiehung:\s(\d{1,2},\s){4}\d{1,2}\s-\s(\d{1,2},\s){1}\d{1,2}$/);
    });
});