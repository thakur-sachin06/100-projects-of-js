const container = document.getElementById("grid-container");

let num = 1;

const createBoard = () => {
  for (let i = 1; i <= 10; i++) {
    const boxContainer = document.createElement("div");
    container.appendChild(boxContainer);
    for (let j = num; j <= i * 10; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = num;
      boxContainer.appendChild(box);
      num++;
    }
  }
};

createBoard();
