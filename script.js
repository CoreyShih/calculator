function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
        case "×":
        case "x":
            return multiply(num1, num2);
        case "/":
        case "÷":
            return divide(num1, num2);
    }
}

let operator = null;
let prevNumber = null;
let currNumber = null;
let prevEntry = null;
let hasDecimal = false;

const display = document.querySelector(".display div");
const keypad = document.querySelector(".keypad");

function calculate() {
    [prevNumber, currNumber] = [operate(operator, prevNumber, currNumber), null];
    display.textContent = prevNumber;
}

function clear() {
    operator = prevNumber = currNumber = prevEntry = null;
    hasDecimal = false;
    display.textContent = "";
}

keypad.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        if (event.target.id === "key-clear") {
            clear();
        } else if (event.target.closest(".operands")) {
            // Pressing a digit after equals clears the result and starts a new calculation
            if (prevEntry === "EQUALS") {
                clear();
            }
            // Only allow one decimal point per number
            if (event.target.id !== "key-decimal" || !hasDecimal) {
                // Reset display to trim leading zeroes or start new number if previous entry was an operator
                if (display.textContent === "0" || prevEntry === "OPERATOR" || prevEntry === "EQUALS") {
                    display.textContent = event.target.textContent;
                } else {
                    display.textContent += event.target.textContent;
                }
                hasDecimal = (event.target.id === "key-decimal") || hasDecimal;
                currNumber = +display.textContent;
                prevEntry = "OPERAND";
            }   
        } else if (event.target.closest(".operators")) {
            if (prevEntry === "OPERAND") {
                // Calculate and display result if there are already two numbers stored, also handles equals functionality 
                if (prevNumber !== null && currNumber !== null) {
                    calculate();
                } else {
                    [prevNumber, currNumber] = [currNumber, null];
                }
            }
            if (event.target.id === "key-equals") {
                prevEntry = "EQUALS";
            } else {
                operator = event.target.textContent;
                prevEntry = "OPERATOR";
            }
            hasDecimal = false;
        }
    }
});