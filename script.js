// Dichiarazione globale della variabile parole
let parole = []; 

// Funzione per avviare il gioco
function startGame() {
    console.log('Start Game Clicked');
    
    const numGiocatori = document.getElementById('numGiocatori').value;
    const tempoPerGiocatore = document.getElementById('tempoPerGiocatore').value;

    console.log('Numero Giocatori:', numGiocatori);
    console.log('Tempo per Giocatore:', tempoPerGiocatore);

    // Verifica dei valori di input
    if (numGiocatori < 1 || tempoPerGiocatore < 10) {
        alert('Inserisci valori validi.');
        return;
    }

    const nomiGiocatori = [];
    for (let i = 1; i <= numGiocatori; i++) {
        const nome = document.getElementById(`giocatore${i}`).value;
        if (nome.trim() === '') {
            alert('Inserisci i nomi di tutti i giocatori.');
            return;
        }
        nomiGiocatori.push(nome);
    }

    console.log('Nomi Giocatori:', nomiGiocatori);

    // Caricamento delle parole dal file parole.txt
    fetch('parole.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file parole.txt');
            }
            return response.text();
        })
        .then(data => {
            parole = data.split('\n').map(p => p.trim()).filter(p => p.length > 0);
            if (parole.length === 0) {
                alert('La lista delle parole è vuota.');
                return;
            }
            console.log('Parole caricate:', parole);
            startRound(nomiGiocatori, tempoPerGiocatore);
        })
        .catch(error => {
            console.error('Errore nel caricamento del file parole.txt:', error);
            alert('Errore nel caricamento del file parole.txt');
        });
}

// Funzione per iniziare un round
function startRound(nomiGiocatori, tempoPerGiocatore) {
    let currentPlayerIndex = 0;

    function nextPlayer() {
        const giocatore = nomiGiocatori[currentPlayerIndex];
        const parola = parole[Math.floor(Math.random() * parole.length)];
        let parolaIniziale = parola[0]; // Inizialmente mostra solo la prima lettera
        let tempoRimanente = tempoPerGiocatore;

        console.log(`Giocatore corrente: ${giocatore}`);
        console.log(`Parola da indovinare: ${parola}`);

        const timerInterval = setInterval(() => {
            if (tempoRimanente > 0) {
                console.log(`Tempo rimanente per ${giocatore}: ${tempoRimanente} secondi`);
                tempoRimanente--;

                if (parolaIniziale.length < parola.length) {
                    parolaIniziale += parola[parolaIniziale.length];
                    console.log(`Nuovo suggerimento: ${parolaIniziale}`);
                }
            } else {
                clearInterval(timerInterval);
                alert(`Tempo scaduto! La parola era: ${parola}`);
                currentPlayerIndex = (currentPlayerIndex + 1) % nomiGiocatori.length;
                nextPlayer();
            }
        }, 1000);

        const risposta = prompt(`Giocatore ${giocatore}, indovina la parola: ${parolaIniziale}`);
        clearInterval(timerInterval);

        if (risposta && risposta.trim().toLowerCase() === parola.toLowerCase()) {
            alert(`Bravo ${giocatore}! Hai indovinato la parola: ${parola}`);
        } else {
            alert(`Peccato ${giocatore}, la parola corretta era: ${parola}`);
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % nomiGiocatori.length;
        nextPlayer();
    }

    nextPlayer();
}
