const rows = 6;
const columns = 7;
const board = Array.from({ length: rows }, () => Array(columns).fill(null));
let currentPlayer = 'red';

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    // Clear the existing board if it exists
    gameBoard.innerHTML = '';
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    // Find the lowest empty cell in the selected column
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][col] === null) {
            board[r][col] = currentPlayer;
            updateBoard();
            if (checkWin(r, col)) {
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                    resetBoard();
                }, 100); // Short delay before resetting to show the winning alert
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            return;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.className = 'cell';
        if (board[row][col]) {
            cell.classList.add(board[row][col]);
        }
    });
}

function checkWin(row, col) {
    const directions = [
        { r: 1, c: 0 }, // Vertical
        { r: 0, c: 1 }, // Horizontal
        { r: 1, c: 1 }, // Diagonal /
        { r: 1, c: -1 } // Diagonal \
    ];
    for (const { r: rDir, c: cDir } of directions) {
        let count = 1;
        for (let i = 1; i < 4; i++) {
            const newRow = row + rDir * i;
            const newCol = col + cDir * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 4; i++) {
            const newRow = row - rDir * i;
            const newCol = col - cDir * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function resetBoard() {
    // Clear the board array
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c] = null;
        }
    }
    // Clear the visual board
    createBoard(); // This will recreate the board from scratch
}

createBoard();
