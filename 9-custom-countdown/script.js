const localStorage = window.localStorage;

const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const startCountdownButton = document.getElementById("start-countdown-button");
const resetCounterBtn = document.getElementById("reset-counter-button");

const titleInput = document.getElementById("title");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeCountdownInfo = document.getElementById("complete-info");
const completeCountdownBtn = document.getElementById("complete-button");

let countdownDate = "";
let countdownTitle = "";
let countdownValue = Date;

let countdownActive;
let savedCountdown = {};

const second = 1000; // 1sec = 1000ms.
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set min date for date element
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function enableStartCounterButton(event) {
  const { id, value } = event.target;
  if (id === "title") {
    countdownTitle = value;
  } else {
    countdownDate = value;
  }
  if (countdownDate && countdownTitle) {
    startCountdownButton.classList.replace("disabled-button", "enabled-button");
    startCountdownButton.disabled = false;
  }
}

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // if counter is complete
    if (distance < 0) {
      countdownEl.hidden = true;
      completeEl.hidden = false;
      clearInterval(countdownActive);
      dateEl.value = "";
      titleInput.value = "";
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = days;
      timeElements[1].textContent = hours;
      timeElements[2].textContent = minutes;
      timeElements[3].textContent = seconds;
      completeEl.hidden = true;
      inputContainer.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  countdownValue = new Date(countdownDate).getTime();
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdownObj", JSON.stringify(savedCountdown));
  updateDOM();
}

function startNewCounter() {
  clearInterval(countdownActive);
  dateEl.value = "";
  titleInput.value = "";
  countdownTitle = "";
  countdownDate = "";
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  startCountdownButton.classList.replace("enabled-button", "disabled-button");
  startCountdownButton.disabled = true;
  localStorage.removeItem("countdownObj");
}

function restoreCountdownFromLocalStorage() {
  if (localStorage.getItem("countdownObj")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdownObj"));
    countdownDate = savedCountdown.date;
    countdownTitle = savedCountdown.title;
    countdownValue = new Date(countdownDate).getTime(); // we have to set current time after browser refresh to be used in updateDOM()
    updateDOM();
  }
}

titleInput.addEventListener("input", enableStartCounterButton);
dateEl.addEventListener("input", enableStartCounterButton);
countdownForm.addEventListener("submit", updateCountdown);
resetCounterBtn.addEventListener("click", startNewCounter);
completeCountdownBtn.addEventListener("click", startNewCounter);

// on load checking local storage.
restoreCountdownFromLocalStorage();
