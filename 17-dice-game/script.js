const button = document.querySelector("button");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const resultArea = document.getElementById("result");

let winner;
const diceFace = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
const diceDotPosition = [
  [5],
  [1, 9],
  [1, 5, 9],
  [1, 3, 7, 9],
  [1, 3, 5, 7, 9],
  [1, 3, 4, 6, 7, 9],
];

// function to show dice face using hex code

// function rollDice() {
//   winner = "";
//   let rolls = [roll(), roll()];
//   if (rolls[0] > rolls[1]) {
//     winner = "Player 1 wins";
//   } else if (rolls[1] > rolls[0]) {
//     winner = "Player 2 wins";
//   } else winner = "It's a Draw";

//   player1.textContent = `${diceFace[rolls[0]]}`;
//   player2.textContent = `${diceFace[rolls[1]]}`;

//   resultArea.textContent = winner;
// }

// Showing dice faces using JS only.

function roll() {
  return Math.floor(Math.random() * 6) + 1;
}

function buildDice(diceNumber) {
  let dice = document.createElement("div");

  // die array will contain an array of positions where we want to show dots on dice.
  let dieArray = diceDotPosition[diceNumber - 1];
  console.log(diceNumber, dieArray);

  // to show dots on dice at specific position
  for (let diceDots = 1; diceDots < 10; diceDots++) {
    let dot = document.createElement("div");
    dot.setAttribute("class", "dice-dot");
    if (dieArray.includes(diceDots)) {
      dot.classList.add("black-dot");
    }
    dice.appendChild(dot);
  }

  dice.setAttribute("class", "dice-container");
  return dice;
}

function showWinner(player1DiceNum, player2DiceNum) {
  if (player1DiceNum > player2DiceNum) {
    winner = "Player 1 wins";
  } else if (player2DiceNum > player1DiceNum) {
    winner = "Player 2 wins";
  } else winner = "It's a Draw";
}

function rollDice() {
  if (player1.children[0]) {
    player1.children[0].remove();
  }

  if (player2.children[0]) {
    player2.children[0].remove();
  }

  let player1DiceNum = roll();
  let player2DiceNum = roll();

  let player1Dice = buildDice(player1DiceNum);
  let player2Dice = buildDice(player2DiceNum);

  showWinner(player1DiceNum, player2DiceNum);
  resultArea.textContent = winner;
  player1.appendChild(player1Dice);
  player2.appendChild(player2Dice);
}

button.addEventListener("click", rollDice);
