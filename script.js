document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/USD`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Taux de change récupérés', data.rates); // Correct ici
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des taux de change:', error);  
        });
});

// Écouteur d'événement pour le bouton Convertir
document.getElementById('convertButton').addEventListener('click', convertCurrency);

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Validation des entrées
    if (isNaN(amount) || amount <= 0) {
        alert("Veuillez entrer un montant valide.");
        return;
    }

    // Requête pour obtenir les taux de change
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)   
    .then(response => response.json())
    .then(data => {
        const rate = data.rates[toCurrency];
        
        // Vérification du taux de conversion
        if (!rate) {
            document.getElementById('result').textContent = "Taux de conversion non disponible.";
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        displayResults(amount, fromCurrency, convertedAmount, toCurrency);   
    }) 
    .catch(error => {
        console.error('Erreur', error);
        document.getElementById('result').textContent = "Erreur lors de la récupération des taux de change.";
    });
}

    
    
  /*  if (exchangeRates && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
        const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]; // Calcul du taux de conversion
        const convertedAmount = amount * conversionRate; // Effectue la conversion
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`; // Affiche le résultat
    } else {
        document.getElementById('result').textContent = 'Erreur : Taux de change non disponible.';
    }
*/
    
// Appel de la fonction pour afficher les résultats
function displayResults(amount, fromCurrency, convertedAmount, toCurrency) {
    const resultElement = document.getElementById('resultText');
    resultElement.textContent = `${amount} ${fromCurrency} équivaut à ${convertedAmount} ${toCurrency}`; 
}











