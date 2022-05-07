let user = 1,
  firstUserClicks = [],
  secondUserClicks = [];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart-button");
const winner = document.querySelector(".winner");

function declareWinner() {
  winner.innerText = `Player-${user} won`;
  winner.style.color = "green";
  restartBtn.innerText = "Start new game";
  cells.forEach((elt) => elt.removeEventListener("click", handleCellClick));
}

let isWinner = false;

function checkForWinner() {
  winningConditions.map((elt) => {
    if (user == 1) {
      isWinner =
        new Set([...elt, ...firstUserClicks]).size === firstUserClicks.length;
      if (isWinner) {
        declareWinner();
        return;
      }
    } else {
      isWinner =
        new Set([...elt, ...secondUserClicks]).size === secondUserClicks.length;
      if (isWinner) {
        declareWinner();
        return;
      }
    }
  });
}

function handleCellClick(e) {
  const clickedCell = parseInt(e.target.getAttribute("data-cell-index"));
  if (
    firstUserClicks.indexOf(clickedCell) >= 0 ||
    secondUserClicks.indexOf(clickedCell) >= 0
  ) {
    return;
  }
  if (user === 1) {
    firstUserClicks.push(clickedCell);
    e.target.innerText = "0";
    if (firstUserClicks.length + secondUserClicks.length >= 4) {
      checkForWinner();
      if (isWinner) {
        return;
      }
    }
    user = 2;
  } else {
    secondUserClicks.push(clickedCell);
    e.target.innerText = "X";
    if (firstUserClicks.length + secondUserClicks.length >= 4) {
      checkForWinner();
      if (isWinner) {
        return;
      }
    }
    user = 1;
  }
  if (firstUserClicks.length + secondUserClicks.length === 9) {
    winner.innerText = `Game draw`;
    winner.style.color = "red";
    restartBtn.innerText = "Start new game";
    cells.forEach((elt) => elt.removeEventListener("click", handleCellClick));
  }
}

function restartGame() {
  cells.forEach((elt) => (elt.innerText = null));
  winner.innerText = "";
  restartBtn.innerText = "Restart game";
  cells.forEach((elt) => elt.addEventListener("click", handleCellClick));
  firstUserClicks = [];
  secondUserClicks = [];
  user = 1;
}

cells.forEach((elt) => elt.addEventListener("click", handleCellClick));

restartBtn.addEventListener("click", restartGame);
