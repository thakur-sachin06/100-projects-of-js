const inputElt = document.querySelector("input");
const button = document.querySelector("button");
const output = document.querySelector(".output");

let cost;
let totalTip;

function setInputValue(e) {
  cost = e.target.value;
}

function calculateTip() {
  if (cost <= 0) {
    alert("Please input valid cost");
    return;
  }
  totalTip = Math.floor(cost * 0.25);
  output.textContent = `You Should Tip ₹${totalTip} on ₹${cost}`;
  output.style.visibility = "unset";
}

inputElt.addEventListener("change", setInputValue);
button.addEventListener("click", calculateTip);
