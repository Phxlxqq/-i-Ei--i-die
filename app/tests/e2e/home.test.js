const puppeteer = require('puppeteer');

describe('Homepage Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/index.html');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Homepage lädt korrekt', async () => {
        const title = await page.title();
        expect(title).toBe('Zufallszahlen Generator'); // Passe den Titel ggf. an
    });

    test('Navigiert zum Eurojackpot Generator', async () => {
        await Promise.all([
            page.waitForNavigation(),  // Warte, bis die Navigation abgeschlossen ist
            await page.goto('http://localhost:3000/index.html'),
            page.click('a[href="eurojackpot.html"]')
        ]);
        expect(page.url()).toContain('/eurojackpot.html');
    });

    test('Navigiert zum Custom Generator', async () => {
        await Promise.all([
            page.waitForNavigation(),
            await page.goto('http://localhost:3000/index.html'),
            page.click('a[href="custom.html"]')
        ]);
        expect(page.url()).toContain('/custom.html');
    });

    test('Navigiert zum Lotto 6 aus 49 Generator', async () => {
        await Promise.all([
            page.waitForNavigation(),
            await page.goto('http://localhost:3000/index.html'),
            page.click('a[href="lotto.html"]')
        ]);
        expect(page.url()).toContain('/lotto.html');
    });
});