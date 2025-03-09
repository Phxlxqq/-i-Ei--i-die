const { generateUniqueRandomNumbers } = require("../../js/generator.js");


describe("generateUniqueRandomNumbers", () => {
    test("soll eine sortierte Liste mit einzigartigen Zufallszahlen zurückgeben", () => {
        const numbers = generateUniqueRandomNumbers(6, 1, 49);
        expect(numbers.length).toBe(6);
        expect(new Set(numbers).size).toBe(6);
        expect(numbers).toEqual(numbers.slice().sort((a, b) => a - b));
    });

    test("soll Fehler auslösen, wenn zu viele Zahlen verlangt werden", () => {
        expect(() => generateUniqueRandomNumbers(10, 1, 5)).toThrow();
    });
});
