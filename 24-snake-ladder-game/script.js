const container = document.getElementById("grid-container");

let num = 100;

const createBoard = () => {
  for (let i = 10; i >= 1; i--) {
    for (let j = num; j <= i * 10; j++) {
      const box = document.createElement("span");
      box.innerHTML = num;
      container.appendChild(box);
      num--;
    }
  }
};

createBoard();
