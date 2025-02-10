function generateNumbers() {
    const lottoType = document.getElementById("lotto-type").value;
    let numbers = [];

    if (lottoType === "6aus49") {
        // 6 aus 49
        while (numbers.length < 6) {
            let num = Math.floor(Math.random() * 49) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
    } else if (lottoType === "eurojackpot") {
        // EuroJackpot (5 aus 50 + 2 aus 10)
        let mainNumbers = [];
        while (mainNumbers.length < 5) {
            let num = Math.floor(Math.random() * 50) + 1;
            if (!mainNumbers.includes(num)) {
                mainNumbers.push(num);
            }
        }

        let euroNumbers = [];
        while (euroNumbers.length < 2) {
            let num = Math.floor(Math.random() * 10) + 1;
            if (!euroNumbers.includes(num)) {
                euroNumbers.push(num);
            }
        }

        numbers = mainNumbers.concat(euroNumbers);
    } else if (lottoType === "powerball") {
        // Powerball (5 aus 69 + 1 aus 26)
        let mainNumbers = [];
        while (mainNumbers.length < 5) {
            let num = Math.floor(Math.random() * 69) + 1;
            if (!mainNumbers.includes(num)) {
                mainNumbers.push(num);
            }
        }

        let powerball = Math.floor(Math.random() * 26) + 1;
        numbers = mainNumbers.concat([powerball]);
    }

    // Anzeige der Zahlen
    document.getElementById("lotto-results").innerHTML = `Generierte Zahlen: ${numbers.join(", ")}`;
}
