const rows = 6;
const columns = 7;
const board = Array.from({ length: rows }, () => Array(columns).fill(null));
let currentPlayer = 'red';
const resetButton = document.getElementById('reset-button'); // Reference to the reset button

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    // Clear the existing board cells
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
    
    resetButton.style.display = 'none'; // Hide the reset button initially
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
                    showResetButton(); // Show the reset button when the game is over
                }, 100); // Short delay to ensure the alert shows before resetting
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
        cell.className = 'cell'; // Reset the class
        if (board[row][col]) {
            cell.classList.add(board[row][col]); // Add the player's class
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
        let winningCells = [[row, col]]; // Store the winning cells
        // Check in one direction
        for (let i = 1; i < 4; i++) {
            const newRow = row + rDir * i;
            const newCol = col + cDir * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && board[newRow][newCol] === currentPlayer) {
                count++;
                winningCells.push([newRow, newCol]); // Store this cell
            } else {
                break;
            }
        }
        // Check in the opposite direction
        for (let i = 1; i < 4; i++) {
            const newRow = row - rDir * i;
            const newCol = col - cDir * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns && board[newRow][newCol] === currentPlayer) {
                count++;
                winningCells.push([newRow, newCol]); // Store this cell
            } else {
                break;
            }
        }
        if (count >= 4) {
            highlightWinningCells(winningCells);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(cells) {
    cells.forEach(([row, col]) => {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.add('win');
    });
}

function resetBoard() {
    // Clear the board array
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c] = null;
        }
    }
    currentPlayer = 'red'; // Reset to the first player
    createBoard(); // Recreate the board
}

function showResetButton() {
    resetButton.style.display = 'block'; // Show the reset button
}

// Attach an event listener to the reset button
resetButton.addEventListener('click', resetBoard);

// Create the game board when the page loads
createBoard();
