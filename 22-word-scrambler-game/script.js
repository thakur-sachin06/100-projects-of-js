const button = document.querySelector("button");
const mainContainer = document.querySelector(".message-container");
const messageContainer = document.querySelector(".message-container");
const textToGuess = document.querySelector(".text-to-guess");
const input = document.querySelector("input");

let isPlaying = false;
let guessedWord = "";
let wordToGuess;

const JUGGLEDWORDS = ["llheo", "ample"];

const WORDS = {
  llheo: "hello",
  ample: "empale",
};

// {
//   juggledWord: "llheo",
//   correctWord: "Hello",
// },
// {
//   juggledWord: "ample",
//   correctWord: "empale",
// },
// {
//   juggledWord: "llheo",
//   correctWord: "Hello",
// },
// {
//   juggledWord: "llheo",
//   correctWord: "Hello",
// },

function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    textToGuess.hidden = false;
    const randomNum = Math.floor(Math.random() * 10) % 2;
    textToGuess.textContent = JUGGLEDWORDS[randomNum];
    wordToGuess = textToGuess.innerText;
    input.hidden = false;
    button.textContent = "Guess";
  } else {
    const test = textToGuess.innerText;
    messageContainer.hidden = false;
    if (guessedWord === WORDS[test].toLowerCase()) {
      messageContainer.textContent = "You have guessed right word";
    } else {
      messageContainer.textContent = "You have guessed wrong word";
    }
  }
  debugger;
}

input.addEventListener("change", (e) => {
  guessedWord = e.target.value;
});

button.addEventListener("click", startGame);
