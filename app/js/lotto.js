function generateLotto() {
    const ziehungen = parseInt(document.getElementById('anzahlZiehungen').value);
    let output = '';
    for (let i = 1; i <= ziehungen; i++) {
        // Lotto: 6 Hauptzahlen aus 1–49 und 1 Superzahl aus 0–9
        let mainNumbers = generateUniqueRandomNumbers(6, 1, 49);
        let superNumbers = generateUniqueRandomNumbers(1, 0, 9);
        output += i + '. Ziehung: ' + mainNumbers.join(', ');
        if (superNumbers.length > 0) {
            output += ' - ' + superNumbers.join(', ');
        }
        output += '<br>';
    }
    document.getElementById('result').innerHTML = output;
}
