const container = document.querySelector(".container");
const button = document.querySelector("button");
const messageContainer = document.querySelector(".message-container");

let message;
let color;

function showMessgae() {
  if (messageContainer.children[0]) {
    messageContainer.children[0].remove();
  }

  const date = new Date();
  const hour = date.getHours();
  const span = document.createElement("span");

  if (hour >= 1 && hour <= 12) {
    message = "Good Morning. Have a nice day!";
    span.setAttribute("class", "morning-color");
  } else if (hour >= 12 && hour <= 7) {
    message = "Good Evening";
    span.setAttribute("class", "evening-color");
  } else {
    message = "Good Night! Sleep Tight";
    span.setAttribute("class", "night-color");
  }
  span.classList.add("text");
  span.textContent = message;
  messageContainer.appendChild(span);
}

button.addEventListener("click", showMessgae);
