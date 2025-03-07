function generateCustom() {
    const totalNumbers = parseInt(document.getElementById('totalNumbers').value);
    const drawCount = parseInt(document.getElementById('drawCount').value);
    const totalSuperNumbers = parseInt(document.getElementById('totalSuperNumbers').value);
    const drawSuperCount = parseInt(document.getElementById('drawSuperCount').value);
    const ziehungen = parseInt(document.getElementById('anzahlZiehungen').value);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Fehlerüberprüfung
    if (drawCount > totalNumbers) {
        resultDiv.innerHTML = '<p class="error">Fehler: Die Anzahl der zu ziehenden Hauptzahlen ist größer als der Zahlenbereich.</p>';
        return;
    }
    if (drawSuperCount > totalSuperNumbers) {
        resultDiv.innerHTML = '<p class="error">Fehler: Die Anzahl der zu ziehenden Superzahlen ist größer als der Zahlenbereich der Superzahlen.</p>';
        return;
    }

    let output = '';
    for (let i = 1; i <= ziehungen; i++) {
        let mainNumbers = generateUniqueRandomNumbers(drawCount, 1, totalNumbers);
        let line = i + '. Ziehung: ' + mainNumbers.join(', ');
        if (drawSuperCount > 0) {
            let superNumbers = generateUniqueRandomNumbers(drawSuperCount, 1, totalSuperNumbers);
            line += ' - ' + superNumbers.join(', ');
        }
        output += line + '<br>';
    }
    resultDiv.innerHTML = output;
}
