const container = document.createElement("div");
let commandsListContainer;
let commandsList = [];

function moveLeft() {
  let leftPosition = container.offsetLeft;
  container.style.left = leftPosition - 100 + "px";
}

function moveRight() {
  let rightPosition = container.offsetLeft;
  container.style.left = rightPosition + 100 + "px";
}

function moveTop() {
  let topPosition = container.offsetTop;
  container.style.top = topPosition - 100 + "px";
}

function moveBottom() {
  let bottomPosition = container.offsetTop;
  container.style.top = bottomPosition + 100 + "px";
}

function randomColor() {
  container.style.background = `#${Math.random().toString(16).substr(-6)}`;
}

function addKeyEvents(keyValue) {
  let span = document.createElement("span");
  span.textContent = `+${keyValue}`;
  span.style.padding = "10px";
  span.style.border = "1px solid #ddd";
  span.addEventListener("mouseover", function () {
    this.style.background = "red";
    this.style.color = "white";
  });
  span.addEventListener("mouseout", function () {
    this.style.background = "white";
    this.style.color = "black";
  });
  span.style.cursor = "pointer";
  span.addEventListener("click", function () {
    let currIndex = commandsList.indexOf(this);
    let eltToRemove = commandsList.splice(currIndex, 1);
    commandsListContainer.removeChild(this);
  });
  commandsList.push(span);
  commandsListContainer.appendChild(span);
}

function moveContainerThroughCommands() {
  if (commandsList.length) {
    const removedItem = commandsList.shift();
    const text = removedItem.textContent.replace("+", "");
    commandsListContainer.removeChild(removedItem);
    container.innerText = ` Moved: ${text}`;
    if (text === "left") moveLeft();
    else if (text === "bottom") moveBottom();
    else if (text === "top") moveTop();
    else if (text === "right") moveRight();
    else container.innerText = "Set Path";
  }
}

function moveContainer(pressedKeyCode) {
  randomColor();
  switch (pressedKeyCode) {
    case 40:
      addKeyEvents("bottom");
      break;
    case 38:
      addKeyEvents("top");
      break;
    case 37:
      addKeyEvents("left");
      break;
    case 39:
      addKeyEvents("right");
      break;
    case 13 || 32:
      moveContainerThroughCommands();
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  container.textContent = "Set Path";
  container.style.width = "100px";
  container.style.height = "100px";
  container.style.background = "rgba(202, 202, 202, 0.5)";
  container.style.lineHeight = "100px";
  container.style.textAlign = "center";
  container.style.borderRadius = "5px";
  container.style.position = "absolute";
  container.style.top = "100px";
  container.style.color = "white";
  container.style.left = "150px";
  document.body.appendChild(container);

  commandsListContainer = document.createElement("div");
  commandsListContainer.style.position = "absolute";
  commandsListContainer.style.top = "20px";
  document.body.appendChild(commandsListContainer);
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  const pressedKeyCode = e.keyCode;

  moveContainer(pressedKeyCode);
});
