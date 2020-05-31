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
        alert('satu kali perhitungan. Silahkan tekan sama dengan atau clear');
    }
}

function calculate() {
    let result = 0;
    if (calculator.operator === "+") {
        result = Number(calculator.firstNumber) + Number(calculator.displayNumber);
    } else if (calculator.operator === "-") {
        result = Number(calculator.firstNumber) - Number(calculator.displayNumber);
    } else if (calculator.operator === "x") {
        result = Number(calculator.firstNumber) * Number(calculator.displayNumber);
    } else if (calculator.operator === "/") {
        let divide = Number(calculator.firstNumber) / Number(calculator.displayNumber);
        result = Math.round(divide * 100) / 100;
    } else {
        alert('eror calculate');
    }

    // objek untuk fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    saveHistory(history);
    calculator.displayNumber = result;
    renderHistory();
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