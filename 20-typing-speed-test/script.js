const typingResult = document.querySelector(".result");
const textAreaElt = document.querySelector("textarea");
const button = document.querySelector("button");

let isTyping = false;
let previousTypingTextNum;
let startTime, endTime, timeTakenToType;
let typingResultText;
let currentTextToTestSpeed;

const SENTENCES = [
  "Test your typing skills online with our free typing speed test. Check how fast you can type.",
  "The faster you type, the faster you communicate with others. With our free typing speed test",
  "The recent emergence of several competitive typing websites has allowed several fast typists on computer keyboards",
  "Hope you are having fun. This is a simple game to test your typing speed.",
];

let typedText = "";

function updateText(e) {
  typedText = e.target.value;
}

function playGame() {
  const currentTypingTextNum = Math.floor(Math.random() * 4);
  if (previousTypingTextNum === currentTypingTextNum) {
    playGame();
  }
  previousTypingTextNum = currentTypingTextNum;
  currentTextToTestSpeed = SENTENCES[currentTypingTextNum];
  typingResult.textContent = currentTextToTestSpeed;
  textAreaElt.disabled = false;
  textAreaElt.focus();
  let date = new Date();
  startTime = date.getTime();
}

function countNumOfTypedWords() {
  let wordsTyped = typedText.split(" ").length;
  return wordsTyped;
}

function countWrongInput(wordsPerMinute) {
  const str1 = currentTextToTestSpeed.split(" ");
  const str2 = textAreaElt.value.split(" ");
  let numOfCorrectWords = 0;
  str1.forEach((word, index) => {
    if (word === str2[index]) {
      numOfCorrectWords++;
    }
  });
  const accuracy = Math.floor((numOfCorrectWords / str1.length) * 100);
  typingResultText = `Your typing speed is ${wordsPerMinute} words per minute and your accuracy is ${accuracy}%.`;
}

function stopPlay() {
  let date = new Date();
  endTime = date.getTime();
  timeTakenToType = (endTime - startTime) / 1000; // gives number of seconds we played the game.
  numOfWordsTyped = countNumOfTypedWords();
  let wordsPerMinute = Math.round((numOfWordsTyped / timeTakenToType) * 60);
  countWrongInput(wordsPerMinute);
  typingResult.textContent = typingResultText;
  textAreaElt.value = "";
}

function startTyping() {
  if (!isTyping) {
    button.textContent = "Done";
    playGame();
    isTyping = true;
  } else {
    button.textContent = "Start Typing";
    isTyping = false;
    textAreaElt.disabled = true;
    stopPlay();
  }
}

textAreaElt.addEventListener("change", updateText);
button.addEventListener("click", startTyping);
