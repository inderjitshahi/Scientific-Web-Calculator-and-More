// Declaring Global Variablr

const calDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear_"); //not .clear or #clear used with getElementById
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;
let currentValue = 0;
let calculation = 0;

function sendNumbervalue(number) {
  //Replace current display value if first value is entered
  if (number === "π") number = Math.PI;
  if (number === "e") number = Math.E;
  if (awaitingNextValue) {
    calDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //If current value is 0, replace it,if not add number
    const displayValue = calDisplay.textContent;
    calDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
  // if (calDisplay.textContent.includes("sin")) {
  //   unioperator('sin');
  // }
}

function addDecimal() {
  //if operator pressed don't add decimal
  if (awaitingNextValue) return;
  if (!calDisplay.textContent.includes(".")) {
    calDisplay.textContent = `${calDisplay.textContent}.`;
  }
}
//Calculate first and 2nd value
const calculate = {
  "÷": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "×": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => (firstNumber = secondNumber),
  "%": (firstNumber, secondNumber) => (firstNumber * secondNumber) / 100,
  "^": (firstNumber, secondNumber) => Math.pow(firstNumber, secondNumber),
  // sin: (firstNumber, secondNumber) => Math.sin(secondNumber) + firstNumber,
};

const ucalculate = {
  sin: (currentValue) => Math.sin(currentValue),
  cos: (currentValue) => Math.cos(currentValue),
  tan: (currentValue) => Math.tan(currentValue),
  exp: (currentValue) => Math.exp(currentValue),
  ln: (currentValue) => Math.log(currentValue),
  log: (currentValue) => Math.log10(currentValue),
  "!": (currentValue) => {
    i = 1;
    let factorial = 1;
    while (i <= currentValue) {
      factorial = factorial * i++;
    }
    return factorial;
  },
  "√": (currentValue) => Math.sqrt(currentValue),
  square: (currentValue) => currentValue * currentValue,
  Reciprocal: (currentValue) => 1 / currentValue,
  cube: (currentValue) => currentValue * currentValue * currentValue,
  sin_inverse: (currentValue) => Math.asin(currentValue),
  cos_inverse: (currentValue) => Math.acos(currentValue),
  tan_inverse: (currentValue) => Math.atan(currentValue),
  degree: (radian) => {
    var pi = Math.PI;
    return radian * (180 / pi);
  },
  radian: (degree) => {
    var pi = Math.PI;
    return degree * (pi / 180);
  },
};

function useOperator(operator) {
  currentValue = Number(calDisplay.textContent); //Number funtion  converts string to number
  // let ucurrentValue = Number(calDisplay.textContent);
  if (isNaN(currentValue)) {
    currentValue = calculation;
  }

  //Prevent Multiple operator
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // Assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    calculation = calculate[operatorValue](firstValue, currentValue);
    calDisplay.textContent =
      firstValue + operatorValue + currentValue + "=" + calculation;
    firstValue = calculation;
  }
  //Ready for next value, store opetaror
  awaitingNextValue = true;
  operatorValue = operator;
}

//Unitary operator function
function unioperator(operator) {
  let ucurrentValue = Number(calDisplay.textContent);
  if (isNaN(ucurrentValue)) {
    ucurrentValue = calculation;
  }

  calculation = ucalculate[operator](ucurrentValue);

  calDisplay.textContent = operator + `(${ucurrentValue})= ` + calculation;
}
//Add event listner for number operator decimal button

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    //for numbers
    inputBtn.addEventListener("click", () => sendNumbervalue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    inputBtn.addEventListener("click", () => {
      if (inputBtn.textContent !== "=") {
        const displayValue = calDisplay.textContent;
        calDisplay.textContent = displayValue + inputBtn.textContent;
      }
    });
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  } else if (inputBtn.classList.contains("uoperator")) {
    inputBtn.addEventListener("click", () => unioperator(inputBtn.value));
    // inputBtn.addEventListener("click", () => {
    //   if (inputBtn.textContent !== "=") {
    //     const displayValue = calDisplay.textContent;
    //     calDisplay.textContent = displayValue + inputBtn.textContent;
    //   }
    // });
  }
});

//Reset  All value and Display

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calDisplay.textContent = "0";
}
//Event Listner
clearBtn.addEventListener("click", resetAll); //you mistakes as resetAll()
