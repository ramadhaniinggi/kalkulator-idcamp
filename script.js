// objek kalkulator
const calculator = {
    displayNumber: "0",
    operator: null,
    firstNumber: null,
    waitingforSecondNumber: false
};

function updateDisplay() {
    document.getElementById('displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingforSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.waitingforSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
}

function inversNumber() {
    if (calculator.displayNumber === '0') {
        return;
    } else {
        calculator.displayNumber = calculator.displayNumber * -1;
    }
}

function percentNumber() {
    if (calculator.displayNumber === '0') {
        return;
    } else {
        calculator.displayNumber = calculator.displayNumber / 100;
    }
}

function handleOperand(operand) {
    if (!calculator.waitingforSecondNumber) {
        calculator.waitingforSecondNumber = true;
        calculator.operator = operand;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('eror handle');
    }
}

function calculate() {
    let result = 0;
    if (calculator.operator === "+") {
        return calculator.displayNumber = Number(calculator.firstNumber) + Number(calculator.displayNumber);
    } else if (calculator.operator === "-") {
        return calculator.displayNumber = Number(calculator.firstNumber) - Number(calculator.displayNumber);
    } else if (calculator.operator === "x") {
        return calculator.displayNumber = Number(calculator.firstNumber) * Number(calculator.displayNumber);
    } else if (calculator.operator === "/") {
        let result = Number(calculator.firstNumber) / Number(calculator.displayNumber);
        return calculator.displayNumber = Math.round(result * 100) / 100;
    } else {
        alert('eror calculate');
    }
}

const buttons = document.querySelectorAll('.number,.operator');

for (let button of buttons) {
    button.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inversNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('percent')) {
            percentNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operand')) {
            handleOperand(target.innerText);
            updateDisplay();
            return;
        }

        if (target.classList.contains('equal')) {
            calculate();
            updateDisplay();
            return;
        }


        inputDigit(target.innerText);
        updateDisplay();
    });
}