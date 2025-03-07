function generateEurojackpot() {
    const ziehungen = parseInt(document.getElementById('anzahlZiehungen').value);
    let output = '';
    for (let i = 1; i <= ziehungen; i++) {
        // Eurojackpot: 5 Hauptzahlen aus 1–50 und 2 Eurozahlen aus 1–10
        let mainNumbers = generateUniqueRandomNumbers(5, 1, 50);
        let euroNumbers = generateUniqueRandomNumbers(2, 1, 10);
        output += i + '. Ziehung: ' + mainNumbers.join(', ');
        if (euroNumbers.length > 0) {
            output += ' - ' + euroNumbers.join(', ');
        }
        output += '<br>';
    }
    document.getElementById('result').innerHTML = output;
}
