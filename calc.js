//my first project
const display = document.querySelector(".display");
const currentAnswer = document.querySelector(".currentResult");
const buttons = document.querySelectorAll("button");
let expression = "";
let store = "";

function calculate(exp) {
  try {
    if (exp.indexOf("//") != -1 || exp.indexOf("**") != -1) {
      display.value = "Syntax Error";
      currentAnswer.value = "Syntax Error";
      return "Syntax Error";
    } else return eval(exp);
  } catch (err) {
    display.value = "Syntax Error";
    currentAnswer.value = "Syntax Error";
    expression = "";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let temp;
    if (display.value === "Syntax Error") {
      store = "";
      expression = "";
      display.value = "";
      currentAnswer.value = "";
    }
    if (button.id === "=") {
      display.value = currentAnswer.value;
      currentAnswer.value = "";
      expression = display.value.trim();
      store = expression;
      if (display.value === "undefined") {
        display.value = "";
        currentAnswer.value = "";
        expression = "";
      }
    } else if (
      button.id === "ac" ||
      (button.id === "del" &&
        (display.value === "Infinity" ||
          display.value === "Syntax Error" ||
          display.value === "NaN"))
    ) {
      store = "";
      expression = "";
      display.value = "";
      currentAnswer.value = "";
    } else if (button.id === "del") {
      if (isNaN(display.value[display.value.length - 2])) {
        store = store.slice(0, store.length - 1);
        expression = expression.slice(0, expression.length - 1);
        display.value = store.trim();
        currentAnswer.value = "";
      } else {
        store = store.slice(0, store.length - 1);
        expression = expression.slice(0, expression.length - 1);
        display.value = store.trim();
        temp = expression;
        try {
          if (isNaN(temp)) currentAnswer.value = calculate(temp);
        } catch (err) {
          currentAnswer.value = "";
        }
      }
    } else {
      expression += button.id;
      temp = expression;
      if (
        button.id != "*" &&
        button.id != "-" &&
        button.id != "+" &&
        button.id != "/" &&
        button.id != "%"
      )
        if (isNaN(temp)) currentAnswer.value = calculate(temp);
      store += button.innerText;
      display.value = store.trim();
    }
  });
});
