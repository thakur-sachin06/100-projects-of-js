// RED for Player-1. Green for Player-2.

let playerTurn = 0;
let num = 100;
let playersPosition = [0, 0];

const container = document.getElementById("grid-container");
const redDot = document.getElementById("red-dot");
const greenDot = document.getElementById("green-dot");
const rollDiceBtn = document.getElementById("roll-dice-btn");

function removePlayer() {
  const position = playersPosition[playerTurn];
  const box = document.getElementById(position);
  let child;
  if (playerTurn === 0) {
    child = document.getElementsByClassName("red-dot");
  } else {
    child = document.getElementsByClassName("green-dot");
  }
  if (child.length) {
    box.removeChild(child[0]);
  }
}

function movePlayer() {
  const position = playersPosition[playerTurn];
  const box = document.getElementById(position);
  const dot = document.createElement("span");
  if (playerTurn === 0) {
    dot.classList.add("circle", "red-dot");
    dot.innerHTML = "P1";
  } else {
    dot.classList.add("circle", "green-dot");
    dot.innerHTML = "P2";
  }
  box.appendChild(dot);
}

function rollDice() {
  const diceNum = Math.floor(Math.random() * 6) + 1;
  if (playersPosition[playerTurn] === 0) {
    if (diceNum === 1 || diceNum === 6) {
      playersPosition[playerTurn] = 1;
      movePlayer();
    } else {
      playerTurn = playerTurn === 0 ? 1 : 0;
    }
  } else {
    removePlayer();
    playersPosition[playerTurn] = playersPosition[playerTurn] + diceNum;
    movePlayer();
    if (diceNum !== 6) {
      playerTurn = playerTurn === 0 ? 1 : 0;
    }
  }
}

const createBoard = () => {
  const frag = document.createDocumentFragment();
  for (let i = 9; i >= 0; i--) {
    const boxContainer = document.createElement("div");
    frag.appendChild(boxContainer);
    boxContainer.style.display = "flex";
    if (i % 2 === 0) {
      boxContainer.style.flexDirection = "row-reverse";
    }
    for (let j = num; j > i * 10; j--) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.setAttribute("id", num);
      box.innerHTML = num;
      boxContainer.appendChild(box);
      num--;
    }
  }
  container.appendChild(frag);
};

rollDiceBtn.addEventListener("click", rollDice);

createBoard();
// movePlayer();
