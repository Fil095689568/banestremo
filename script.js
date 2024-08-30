let parole = [];
let currentPlayer = 0;
let timeLeft = 0;
let timerInterval = null;
let currentWord = '';

document.getElementById('numGiocatori').addEventListener('change', updatePlayerInputs);
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('submitParola').addEventListener('click', checkWord);

function updatePlayerInputs() {
    const numGiocatori = document.getElementById('numGiocatori').value;
    const giocatoriNomi = document.getElementById('giocatoriNomi');
    giocatoriNomi.innerHTML = '';

    for (let i = 1; i <= numGiocatori; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Nome del Giocatore ${i}`;
        input.id = `giocatore${i}`;
        giocatoriNomi.appendChild(input);
    }
}

function startGame() {
    const numGiocatori = document.getElementById('numGiocatori').value;
    const tempoPerGiocatore = document.getElementById('tempoPerGiocatore').value;

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

    fetch('parole.txt')
        .then(response => response.text())
        .then(data => {
            parole = data.split('\n').map(p => p.trim()).filter(p => p.length > 0);
            if (parole.length === 0) {
                alert('La lista delle parole è vuota.');
                return;
            }

            startRound(nomiGiocatori, tempoPerGiocatore);
        });
}

function startRound(nomiGiocatori, tempoPerGiocatore) {
    document.querySelector('.configurazione').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';

    currentPlayer = 0;
    startTurn(nomiGiocatori, tempoPerGiocatore);
}

function startTurn(nomiGiocatori, tempoPerGiocatore) {
    const nome = nomiGiocatori[currentPlayer];
    document.getElementById('nomeGiocatoreCorrente').innerText = `È il turno di: ${nome}`;
    timeLeft = tempoPerGiocatore;

    currentWord = parole[Math.floor(Math.random() * parole.length)];
    const indizio = currentWord[0] + '_'.repeat(currentWord.length - 1);
    document.getElementById('parolaIndizio').innerText = `Indizio: ${indizio}`;
    document.getElementById('inputParola').value = '';
    document.getElementById('risultato').innerText = '';

    startTimer(nomiGiocatori, tempoPerGiocatore);
}

function startTimer(nomiGiocatori, tempoPerGiocatore) {
    document.getElementById('timer').innerText = `Tempo rimanente: ${timeLeft} secondi`;

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0 && timeLeft <= tempoPerGiocatore / 2) {
            const indizioParziale = currentWord.substring(0, Math.ceil(currentWord.length / 2)) + '_'.repeat(Math.floor(currentWord.length / 2));
            document.getElementById('parolaIndizio').innerText = `Indizio: ${indizioParziale}`;
        }

        document.getElementById('timer').innerText = `Tempo rimanente: ${timeLeft} secondi`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('risultato').innerText = 'Tempo scaduto!';
            nextTurn(nomiGiocatori, tempoPerGiocatore);
        }
    }, 1000);
}

function checkWord() {
    const input = document.getElementById('inputParola').value.trim().toLowerCase();

    if (input === currentWord.toLowerCase()) {
        document.getElementById('risultato').innerText = 'Corretto!';
        clearInterval(timerInterval);
        nextTurn();
    } else {
        document.getElementById('risultato').innerText = 'Sbagliato! Prova ancora.';
    }
}

function nextTurn(nomiGiocatori, tempoPerGiocatore) {
    currentPlayer++;
    if (currentPlayer >= nomiGiocatori.length) {
        currentPlayer = 0;
    }
    startTurn(nomiGiocatori, tempoPerGiocatore);
}
let parole = [];
let currentPlayer = 0;
let timeLeft = 0;
let timerInterval = null;
let currentWord = '';

document.getElementById('numGiocatori').addEventListener('change', updatePlayerInputs);
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('submitParola').addEventListener('click', checkWord);

function updatePlayerInputs() {
    const numGiocatori = document.getElementById('numGiocatori').value;
    const giocatoriNomi = document.getElementById('giocatoriNomi');
    giocatoriNomi.innerHTML = '';

    for (let i = 1; i <= numGiocatori; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Nome del Giocatore ${i}`;
        input.id = `giocatore${i}`;
        giocatoriNomi.appendChild(input);
    }
}

function startGame() {
    const numGiocatori = document.getElementById('numGiocatori').value;
    const tempoPerGiocatore = document.getElementById('tempoPerGiocatore').value;

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

    fetch('parole.txt')
        .then(response => response.text())
        .then(data => {
            parole = data.split('\n').map(p => p.trim()).filter(p => p.length > 0);
            if (parole.length === 0) {
                alert('La lista delle parole è vuota.');
                return;
            }

            startRound(nomiGiocatori, tempoPerGiocatore);
        });
}

function startRound(nomiGiocatori, tempoPerGiocatore) {
    document.querySelector('.configurazione').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';

    currentPlayer = 0;
    startTurn(nomiGiocatori, tempoPerGiocatore);
}

function startTurn(nomiGiocatori, tempoPerGiocatore) {
    const nome = nomiGiocatori[currentPlayer];
    document.getElementById('nomeGiocatoreCorrente').innerText = `È il turno di: ${nome}`;
    timeLeft = tempoPerGiocatore;

    currentWord = parole[Math.floor(Math.random() * parole.length)];
    const indizio = currentWord[0] + '_'.repeat(currentWord.length - 1);
    document.getElementById('parolaIndizio').innerText = `Indizio: ${indizio}`;
    document.getElementById('inputParola').value = '';
    document.getElementById('risultato').innerText = '';

    startTimer(nomiGiocatori, tempoPerGiocatore);
}

function startTimer(nomiGiocatori, tempoPerGiocatore) {
    document.getElementById('timer').innerText = `Tempo rimanente: ${timeLeft} secondi`;

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft > 0 && timeLeft <= tempoPerGiocatore / 2) {
            const indizioParziale = currentWord.substring(0, Math.ceil(currentWord.length / 2)) + '_'.repeat(Math.floor(currentWord.length / 2));
            document.getElementById('parolaIndizio').innerText = `Indizio: ${indizioParziale}`;
        }

        document.getElementById('timer').innerText = `Tempo rimanente: ${timeLeft} secondi`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('risultato').innerText = 'Tempo scaduto!';
            nextTurn(nomiGiocatori, tempoPerGiocatore);
        }
    }, 1000);
}

function checkWord() {
    const input = document.getElementById('inputParola').value.trim().toLowerCase();

    if (input === currentWord.toLowerCase()) {
        document.getElementById('risultato').innerText = 'Corretto!';
        clearInterval(timerInterval);
        nextTurn();
    } else {
        document.getElementById('risultato').innerText = 'Sbagliato! Prova ancora.';
    }
}

function nextTurn(nomiGiocatori, tempoPerGiocatore) {
    currentPlayer++;
    if (currentPlayer >= nomiGiocatori.length) {
        currentPlayer = 0;
    }
    startTurn(nomiGiocatori, tempoPerGiocatore);
}
