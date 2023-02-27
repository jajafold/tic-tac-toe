const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let isPlayerTurn = true;
let map = [];

let player = [];
let ii = [];



startGame();
addResetListener();

function startGame () {
    renderGrid(3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            map.push({
                X: i,
                Y: j
            });
        }
    }
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
function IITurn() {
    let choiceIndex = randomInteger(0, map.length - 1);
    let choice = map[choiceIndex];

    console.log(`II Choice: ${choice.X} ${choice.Y}`);
    renderSymbolInCell(CROSS, choice.X, choice.Y);
    removeCell(choice.X, choice.Y, ii);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function removeCell(row, col, source) {
    let candidate = {
        X: row,
        Y: col
    };

    let turn = map.splice(map.myIndexOf(candidate), 1);
    source.push(turn[0]);
}

function cellClickHandler (row, col) {
    if (map.myIndexOf({X: row, Y: col}) === -1) {
        return;
    }

    console.log(`Player Choice ${row} ${col}`)
    renderSymbolInCell(ZERO, row, col);
    removeCell(row, col, player);
    setTimeout(IITurn, 1000);
}

Array.prototype.myIndexOf = function myIndexOf(elem) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].X === elem.X && this[i].Y === elem.Y) {
            return i;
        }
    }

    return -1;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function isWin(player) {
    
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
