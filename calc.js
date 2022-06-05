const display = document.querySelector(".display");
const currentAnswer = document.querySelector(".currentResult");
const buttons = document.querySelectorAll("button");
let expression = "";
let store = "";

function commaAdder(string) {
    let newString = "";
    let convertedString = `${string}`;
    let ctr = 0;

    if (convertedString === "Infinity")
        return convertedString;

    if (convertedString.indexOf(".") == -1) {
        for (let i = convertedString.length - 1; i >= 0; i--) {
            ctr++;
            if (ctr === 4) {
                newString = convertedString[i] + "," + newString;
                ctr = 1;
            }
            else {
                newString = convertedString[i] + newString;
            }
        }
    }
    else {
        for (let i = convertedString.indexOf(".") - 1; i >= 0; i--) {
            ctr++;
            if (ctr === 4) {
                newString = convertedString[i] + "," + newString;
                ctr = 1;
            }
            else {
                newString = convertedString[i] + newString;
            }
        }
        newString += convertedString.slice(convertedString.indexOf("."));
    }
    return newString;
}

function commify(string) {
    let newString = "";
    let convertedString = `${string}`;
    let st = 0, end = 0;
    for (let i = 0; i < convertedString.length; i++) {
        if (convertedString[i] === "×" || convertedString[i] === "-" || convertedString[i] === "+" || convertedString[i] === "÷" || convertedString[i] === "%" || i === convertedString.length - 1) {
            if (i === convertedString.length - 1 && (convertedString[i] === "×" || convertedString[i] === "-" || convertedString[i] === "+" || convertedString[i] === "÷" || convertedString[i] === "%")) {
                newString += commaAdder(convertedString.slice(st, i)) + convertedString[i];
            }
            else if (i === convertedString.length - 1 && !(convertedString[i] === "×" || convertedString[i] === "-" || convertedString[i] === "+" || convertedString[i] === "÷" || convertedString[i] === "%")) {
                newString += commaAdder(convertedString.slice(st, i + 1));
            }
            else {
                end = i;
                newString += commaAdder(convertedString.slice(st, end)) + convertedString[i];
                st = i + 1;
            }
        }
    }
    return newString;
}

buttons.forEach((button) => {

    button.addEventListener("click", () => {
        try {
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
                expression = display.value.replace(",", "").trim();
                store = expression;
                if (display.value === "undefined") {
                    display.value = "";
                    currentAnswer.value = "";
                    expression = "";
                }
            }
            else if (button.id === "ac" || (button.id === "del" && (display.value === "Infinity" || display.value === "Syntax Error" || display.value === "NaN"))) {
                store = "";
                expression = "";
                display.value = "";
                currentAnswer.value = "";
            }
            else if (button.id === "del") {
                store = store.slice(0, store.length - 1);
                expression = expression.slice(0, expression.length - 1);
                display.value = commify(store.replace(",", "").trim());
                temp = expression;
                try {
                    if (isNaN(temp))
                        currentAnswer.value = commify(eval(temp));
                }
                catch (err) {
                    currentAnswer.value = "";
                }
            }
            else {
                expression += button.id;
                temp = expression;
                if (button.id != "*" && button.id != "-" && button.id != "+" && button.id != "/" && button.id != "%")
                    if (isNaN(temp))
                        currentAnswer.value = commify(eval(temp));
                store += button.innerText;
                display.value = commify(store.replace(",", "").trim());
            }
        }
        catch (err) {
            display.value = "Syntax Error";
            currentAnswer.value = "Syntax Error";
            expression = "";
        }
    });
});