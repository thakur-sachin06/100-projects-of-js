// RED for Player-1. Green for Player-2.

let playerTurn = 0;
let num = 100;
let playersPosition = [0, 0];

const diceFace = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
const diceDotPosition = [
  [5],
  [1, 9],
  [1, 5, 9],
  [1, 3, 7, 9],
  [1, 3, 5, 7, 9],
  [1, 3, 4, 6, 7, 9],
];

let snakesLadders = {
  2: {
    type: "ladder",
    to: 23,
  },
  7: {
    type: "ladder",
    to: 29,
  },
  22: {
    type: "ladder",
    to: 41,
  },
  27: {
    type: "snake",
    to: 7,
  },
  28: {
    type: "ladder",
    to: 77,
  },
  30: {
    type: "ladder",
    to: 32,
  },
  35: {
    type: "snake",
    to: 5,
  },
  39: {
    type: "snake",
    to: 3,
  },
  44: {
    type: "ladder",
    to: 58,
  },
  59: {
    type: "snake",
    to: 46,
  },
  66: {
    type: "snake",
    to: 24,
  },
  70: {
    type: "ladder",
    to: 90,
  },
  80: {
    type: "ladder",
    to: 83,
  },
  87: {
    type: "ladder",
    to: 93,
  },
  89: {
    type: "snake",
    to: 67,
  },
  97: {
    type: "snake",
    to: 86,
  },
  99: {
    type: "snake",
    to: 26,
  },
};

let snakeLadderBoxes = Object.keys(snakesLadders);

const container = document.getElementById("board-container");
const redDot = document.getElementById("red-dot");
const greenDot = document.getElementById("green-dot");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const player = document.getElementById("player-turn");
const diceContainer = document.getElementById("dice-container");

function buildDice() {
  let dice = document.createElement("div");
  // die array will contain an array of positions where we want to show dots on dice.
  // to show dots on dice at specific position
  for (let diceDots = 1; diceDots < 10; diceDots++) {
    let dot = document.createElement("div");
    dot.setAttribute("class", "dice-dot");
    dot.setAttribute("id", diceDots);
    dice.appendChild(dot);
  }
  dice.setAttribute("class", "dice-container");
  diceContainer.appendChild(dice);
}

function paintDice(diceNumber) {
  // die array will contain an array of positions where we want to show dots on dice.
  let dieArray = diceDotPosition[diceNumber - 1];
  const childDots = document.getElementsByClassName("dice-dot");
  childDotsArr = Array.from(childDots);
  // to show dots on dice at specific position
  childDotsArr.forEach((elt) => {
    const diceId = elt.getAttribute("id");
    if (dieArray.includes(diceId)) {
      elt.classList.add("white-dot");
    }
  });
  // for (let diceDots = 1; diceDots < 10; diceDots++) {
  //   if (dieArray.includes(diceDots)) {
  //     dot.classList.add("white-dot");
  //   }
  //   dice.appendChild(dot);
  // }
  // dice.setAttribute("class", "dice-container");
}

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

function checkLadderOrSnake(diceNum) {
  const index = snakeLadderBoxes.indexOf(diceNum.toString());
  if (index >= 0) {
    const ladderOrSnake = snakesLadders[diceNum];
    playersPosition[playerTurn] =
      playersPosition[playerTurn] + ladderOrSnake.to;
  } else {
    playersPosition[playerTurn] = playersPosition[playerTurn] + diceNum;
  }
}

function rollDice() {
  const diceNum = Math.floor(Math.random() * 6) + 1;
  buildDice(diceNum);
  if (playersPosition[playerTurn] === 0) {
    if (diceNum === 1 || diceNum === 6) {
      playersPosition[playerTurn] = 1;
      movePlayer();
    } else {
      playerTurn = playerTurn === 0 ? 1 : 0;
      player.innerHTML = `Player ${playerTurn + 1}`;
    }
  } else {
    removePlayer();
    checkLadderOrSnake(diceNum);
    movePlayer();
    if (diceNum !== 6) {
      playerTurn = playerTurn === 0 ? 1 : 0;
      player.innerHTML = `Player ${playerTurn + 1}`;
    }
  }
}

const paintBoxSnakeLadder = (box) => {
  const item = snakesLadders[num];
  if (item.type === "ladder") {
    box.style.background = "#7ee57e";
  } else {
    box.style.background = "#ee7474";
  }
};

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

      // paint boxif snake or ladder is there
      const index = snakeLadderBoxes.indexOf(num.toString());
      if (index >= 0) {
        paintBoxSnakeLadder(box);
      }

      boxContainer.appendChild(box);
      num--;
    }
  }
  container.appendChild(frag);
};

rollDiceBtn.addEventListener("click", rollDice);

createBoard();
buildDice();
