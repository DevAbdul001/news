const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // 'X' is the player, 'O' is the computer
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return gameBoard.includes('') ? null : 'Tie';
};

// Minimax Algorithm
const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner();
  if (winner === 'X') return -10; // Player X (human) wins
  if (winner === 'O') return 10;  // Computer O wins
  if (winner === 'Tie') return 0; // Tie

  const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
  if (emptyCells.length === 0) return 0; // No moves left

  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < emptyCells.length; i++) {
    const index = emptyCells[i];
    board[index] = isMaximizing ? 'O' : 'X'; // Make the move

    const score = minimax(board, depth + 1, !isMaximizing); // Recursively get the score
    board[index] = ''; // Undo the move

    if (isMaximizing) {
      bestScore = Math.max(score, bestScore); // Maximize for the computer
    } else {
      bestScore = Math.min(score, bestScore); // Minimize for the player
    }
  }

  return bestScore;
};

// Best move for the computer
const bestMove = () => {
  let bestScore = -Infinity;
  let move = -1;

  const emptyCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

  for (let i = 0; i < emptyCells.length; i++) {
    const index = emptyCells[i];
    gameBoard[index] = 'O'; // Make the move
    const score = minimax(gameBoard, 0, false); // Minimax with the computer's move
    gameBoard[index] = ''; // Undo the move

    if (score > bestScore) {
      bestScore = score;
      move = index;
    }
  }

  return move;
};

const handleCellClick = (e) => {
  const cellIndex = e.target.getAttribute('data-index');

  if (gameBoard[cellIndex] || !gameActive || currentPlayer === 'O') return;

  gameBoard[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winner = checkWinner();

  if (winner) {
    gameActive = false;
    if (winner === 'Tie') {
      status.textContent = "It's a tie!";
    } else {
      status.textContent =` ${winner} wins!`;
    }
  } else {
    currentPlayer = 'O'; // Switch to computer
    status.textContent = `Computer's turn...;`
    setTimeout(computerMove, 1000); // Delay for computer move
  }
};

const computerMove = () => {
  if (!gameActive) return;

  const move = bestMove(); // Get the best move for the computer
  gameBoard[move] = 'O';
  cells[move].textContent = 'O';

  const winner = checkWinner();

  if (winner) {
    gameActive = false;
    if (winner === 'Tie') {
      status.textContent = "It's a tie!";
    } else {
      status.textContent = `${winner} wins!`;
    }
  } else {
    currentPlayer = 'X'; // Switch back to player
    status.textContent =` Player X's turn`;
  }
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player X's turn`;
  cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

status.textContent =` Player X's turn`;