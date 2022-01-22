const alphabet = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 'š', 'z', 'ž', 't', 'u', 'v', 'õ', 'ä', 'ö', 'ü'];
let words = [];
let correctWord = '';
const playAgain = document.querySelector('#play-again');
const notAWord = document.querySelector('#not-a-word');
const correctAnswer = document.querySelector('#correct-answer');
const cells = document.querySelectorAll('.letter');
const buttons = document.querySelectorAll('button');
let nextCellCoords = [0, 0];
let currentWord = '';

fetch('words.txt')
.then(response => response.text())
.then(data => {
    words = data.split('\n');

    initGame();
    
    document.addEventListener('keydown', e => {
        const key = e.key.toLocaleLowerCase();
        testKey(key);
    });

    Array.from(buttons).forEach(btn => {
        btn.addEventListener('click', e => {
            const key = e.currentTarget.dataset.key.toLocaleLowerCase();
            testKey(key);
        });
    });
});

playAgain.addEventListener('click', e => {
    initGame();
});

function initGame () {
    nextCellCoords = [0, 0];
    currentWord = '';

    Array.from(buttons).forEach(btn => {
        btn.classList.remove('correct-cell', 'present-cell', 'absent-cell');
    });

    Array.from(cells).forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('correct-cell', 'present-cell', 'absent-cell');
    });

    playAgain.style.visibility = 'hidden';

    correctAnswer.innerText = '';

    correctWord = words[Math.floor(Math.random() * words.length)];
}

function gameOver () {
    playAgain.style.visibility = 'visible';
    correctAnswer.innerText = 'Õige sõna: ' + correctWord.tou();
}

function testKey ( key ) {
    if ( alphabet.includes(key) && nextCellCoords[0] <= 4 ) {
        nextCell = document.querySelector(`.letter[data-x="${nextCellCoords[0]}"][data-y="${nextCellCoords[1]}"]`);
        nextCell.innerText = key.toLocaleUpperCase();
        nextCellCoords[0]++;
        currentWord += key;
    } else if ( key == 'enter' && nextCellCoords[0] == 5 ) {
        if ( words.includes(currentWord) ) {
            if ( testWord(correctWord, currentWord, nextCellCoords[1]) ) {
                gameOver();
            } else {
                nextCellCoords[0] = 0;
                nextCellCoords[1]++;
                currentWord = '';
            }
        } else {
            notAWord.classList.remove('visible');
            notAWord.offsetHeight;
            notAWord.classList.add('visible');
        }
    } else if ( key == 'backspace' && nextCellCoords[0] > 0 ) {
        nextCellCoords[0]--;
        nextCell = document.querySelector(`.letter[data-x="${nextCellCoords[0]}"][data-y="${nextCellCoords[1]}"]`);
        nextCell.innerText = '';
        currentWord = currentWord.slice(0, -1)
    }
}

function testWord ( correctW, playerW, y ) {
    let isGameOver = true;
    for ( let i = 0; i < playerW.length; i++ ) {
        let letter = playerW.charAt(i);
        const correctCell = document.querySelector(`.letter[data-x="${i}"][data-y="${y}"]`);
        const letterBtn = document.querySelector(`button[data-key="${letter}"]`);
        if ( letter == correctW.charAt(i) ) {
            correctCell.classList.add('correct-cell');
            letterBtn.classList.add('correct-cell');
        } else if ( correctW.includes(letter) ) {
            correctCell.classList.add('present-cell');
            letterBtn.classList.add('present-cell');
            isGameOver = false;
        } else {
            correctCell.classList.add('absent-cell');
            letterBtn.classList.add('absent-cell');
            isGameOver = false;
        }
    }

    if ( y == 5 ) {
        isGameOver = true;
    }

    return isGameOver;
}