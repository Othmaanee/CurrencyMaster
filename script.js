document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '337159cefa16dbefb4277093'; 
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Liste des 20 devises les plus populaires
    const popularCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'DZD', 'SAR'];

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates); 

            // Ne garder que les devises présentes dans le tableau `popularCurrencies`
            const filteredCurrencies = currencies.filter(currency => popularCurrencies.includes(currency));

            const fromCurrencySelect = document.getElementById('fromCurrency');
            const toCurrencySelect = document.getElementById('toCurrency');

            // Ajouter les options filtrées
            filteredCurrencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                fromCurrencySelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                toCurrencySelect.appendChild(optionTo);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des taux de change:', error);  
        });

    // Reste du code inchangé
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');

    amountInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {  
            convertButton.click();     
        }
    });
});


// Écouteur d'événement pour le bouton Convertir
document.getElementById('convertButton').addEventListener('click', convertCurrency);

const apiKey = '337159cefa16dbefb4277093';

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Validation des entrées
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('errorText').textContent = "Veuillez entrer un montant valide.";
        return;
    } else {
        document.getElementById('errorText').textContent = ""; 
    }    

    // Requête pour obtenir le taux de conversion
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
        const rate = data.conversion_rates[toCurrency]; 

        // Vérification du taux de conversion
        if (!rate) {
            document.getElementById('resultText').textContent = "Taux de conversion non disponible."; 
            document.getElementById('errorText').textContent = "Le taux de conversion entre ces devises n'est pas disponible."; 
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        displayResults(amount, fromCurrency, convertedAmount, toCurrency);   
    }) 
    .catch(error => {
        console.error('Erreur', error);
        document.getElementById('resultText').textContent = "Erreur lors de la récupération des taux de change.";
        document.getElementById('errorText').textContent = "Une erreur est survenue. Veuillez réessayer."; 
    });
}

// Appel de la fonction pour afficher les résultats
function displayResults(amount, fromCurrency, convertedAmount, toCurrency) {
    const resultElement = document.getElementById('resultText');
    resultElement.textContent = `${amount} ${fromCurrency} équivaut à ${convertedAmount} ${toCurrency}`; 
    document.getElementById('result').classList.add('show'); // Affiche le résultat
}