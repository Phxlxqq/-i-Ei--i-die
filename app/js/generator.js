// Gemeinsame Funktion zur Erzeugung einzigartiger Zufallszahlen
function generateUniqueRandomNumbers(count, min, max) {
    if (count > (max - min + 1)) {
        throw new Error('Fehler: Die Anzahl der zu ziehenden Zahlen ist größer als der Zahlenbereich.');
        return [];
    }
    let numbers = [];
    while (numbers.length < count) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (numbers.indexOf(num) === -1) {
            numbers.push(num);
        }
    }
    numbers.sort((a, b) => a - b);
    return numbers;
}

module.exports = { generateUniqueRandomNumbers };
