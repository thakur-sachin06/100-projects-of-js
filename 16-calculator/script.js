const inputBtns = document.querySelectorAll("button");
const display = document.querySelector("h1");
const clear = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendInputValues(value) {
  // replace display value when first value is entered and operator is clicked
  if (awaitingNextValue) {
    display.textContent = value;
    awaitingNextValue = false;
  } else {
    const currentValue = display.textContent;
    if (currentValue === "0") {
      display.textContent = value;
    } else {
      display.textContent += value;
    }
  }
}

function resetDisplayValue() {
  display.textContent = 0;
  firstValue = "";
  awaitingNextValue = false;
  operatorValue = "";
}

function addDecimal(value) {
  if (awaitingNextValue) {
    return;
  }
  if (!display.textContent.includes(value)) {
    return (display.textContent += value);
  }
}

const calculate = {
  "÷": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "×": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(display.textContent);
  // preventing multiple operators select at same time.
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculationResult = calculate[operatorValue](
      firstValue,
      currentValue
    );
    display.textContent = calculationResult;
    firstValue = calculationResult;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener("click", () => sendInputValues(btn.value)); // value attribute we have given in html
  } else if (btn.classList.contains("operators")) {
    btn.addEventListener("click", () => useOperator(btn.value));
  } else if (btn.classList.contains("decimal")) {
    btn.addEventListener("click", () => addDecimal(btn.value));
  }
});

clear.addEventListener("click", resetDisplayValue);
