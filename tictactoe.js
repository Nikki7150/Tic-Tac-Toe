const prompt = require('prompt-sync')();

const emojiOptions = ["❌", "⭕", "📚", "💋", "🎀", "🌼", "🐇", "👾", "✨", "😪"]

console.log("Choose your emoji: ");
emojiOptions.forEach((emoji, index) => {
    console.log(`${index + 1}: ${emoji}`);
});

const player1Choice = parseInt(prompt("Player 1, enter the number of your emoji choice: ")) - 1;
let player1 = emojiOptions[player1Choice] || "";

const player2Choice = parseInt(prompt("Player 2, enter the number of your emoji choice: ")) - 1;
let player2 = emojiOptions[player2Choice] || "";

let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = player1;
let gameActive = true;

function printBoard() {
  console.log(`
    ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
    ---------
    ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
    ---------
    ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
  `);
}

function checkWin() {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return conditions.some(condition => {
    const [a, b, c] = condition;
    return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
  });
}

function resetGame() {
    gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    gameActive = true;
}

function askPlayAgain() {
    while(true) {
        const answer = prompt("Do you want to play again?: ");
        if (answer === "yes") {
            resetGame();
            return true;
        }else if (answer === "no") {
            console.log("Thans for Playing!");
            gameActive = false;
            return false;
        }else {
            console.log("Please answer yes or no.");
        }
    }
}

function handleMove(position) {
    if (gameBoard[position] === " ") {
        gameBoard[position] = currentPlayer;
    } else {
        console.log("Cell already taken! Choose another cell.");
        return false;
    }
    
    if (checkWin()) {
        printBoard();
        console.log(`Player ${currentPlayer} wins!`);
        askPlayAgain();
        if (!askPlayAgain) {
            return true;
        }
        return false;
    }

    if (gameBoard.every(cell => cell !== " ")) {
        printBoard();
        console.log("It's a DRAW!");
        askPlayAgain();
        if (!askPlayAgain) {
            return true;
        }
        return false;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return true;
}



while (gameActive) {
    printBoard();
    const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `);

    if (position >= 0 && position <= 8) {
        const moveResult = handleMove(parseInt(position));
        if (moveResult === true) {
            continue;
        } else {
            continue;
        }
    }else {
        console.log("Invalid position. Enter a number between 0 and 8.");
    }
}
