// --------------- Declarations

const equals = document.querySelector('#equals');
const decimal = document.querySelector('#decimal');
const percent = document.querySelector('#percent');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
const number = document.querySelectorAll('.nums');
const displayValue = document.querySelector('#displayValue');
const previousValue = document.querySelector('#previousValue');
const operators = document.querySelectorAll('.operators');
let num1 = 0;
let num2 = 0;
let clickCount = 0;
let operator;

// ------------------- Mathematic Operations 

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return substract(num1, num2);
            break;
        case 'x':
            return multiply(num1, num2);
            break;
        case '/':
            if (num2 === 0) {
                return "Infinity";
                break;
            } else {
                return divide(num1, num2);
                break;
            }
    }

}

// ------------------- Clear Button

clear.addEventListener('click', () => {
    displayValue.style.cssText = 'font-size : 45px';
    previousValue.textContent = '';
    displayValue.textContent = '';
    decimal.disabled = false;
    percent.disabled = false;
    num1 = 0;
    num2 = 0;
    operator = '';
    clickCount = 0;
});

// ------------------- Delete button

del.addEventListener('click', () => {

    if (displayValue.textContent.length === 12) {
        displayValue.style.cssText = 'font-size: 45px';
    } 
    if (displayValue.textContent === "Infinity") {
        displayValue.textContent = '';
    } else {
        displayValue.textContent = displayValue.textContent.split('').slice(0, -1).join('');
    }
});

// ------------------- Entering Numbers

number.forEach(button => {
    button.addEventListener('click', () => {

        if (displayValue.textContent.length < 17) {
            if (displayValue.textContent === "Infinity") {
                displayValue.textContent = '';
                previousValue.textContent = '';
                num1 = 0;
                num2 = 0;
                operator = '';
                displayValue.textContent += button.textContent;
            } else {
                displayValue.textContent += button.textContent;
            }
        }

        if (displayValue.textContent.length === 12) {
            displayValue.style.cssText = 'font-size: 30px';
        }

        num2 = parseFloat(displayValue.textContent);

    });
});

// ------------------- Operators

let current;

operators.forEach(button => {
    button.addEventListener('click', () => {

        operator = button.textContent;

        if (displayValue.textContent === ''){
            previousValue.textContent = `${previousValue.textContent.split('').slice(0, -2).join('')} ${operator}`;
            current = operator;

        } else {
            clickCount++;
            displayValue.style.cssText = 'font-size: 45px';

            decimal.disabled = false;
            percent.disabled = false;

            if (clickCount === 1) {

                previousValue.textContent = `${displayValue.textContent} ${operator}`;
                current = operator;
                num1 = parseFloat(previousValue.textContent.split('').slice(0, -2).join(''));
                displayValue.textContent = '';

            } else {

                const result = parseFloat(operate(num1, current, num2));
                previousValue.textContent = `${result} ${operator}`;
                current = operator;
                num1 = parseFloat(previousValue.textContent.split('').slice(0, -2).join(''));
                displayValue.textContent = '';
        }
        }

    });
});

// ------------------- Equals 

equals.addEventListener('click', () => {

    clickCount = 0;

    if (previousValue.textContent === '') {
        previousValue.textContent = '';
    } else {
        previousValue.textContent = `${num1} ${operator} ${num2}`;
        displayValue.textContent = parseFloat(operate(num1, operator, num2));
        percent.disabled = false;
        decimal.disabled = true;
    }
    if (displayValue.textContent.length > 12) {
        displayValue.style.cssText = 'font-size: 30px';
    }

    if (displayValue.textContent.length > 17){
        displayValue.textContent = num1.toExponential(10);
    }
});

// ------------------- Percentage

percent.addEventListener('click', () => {
    if (displayValue.textContent === '') {
        displayValue.textContent = '0.0';
    } else {
        displayValue.textContent = displayValue.textContent / 100;
        num2 = parseFloat(displayValue.textContent);
    }
    percent.disabled = true;
    decimal.disabled = true;
});

// ------------------- Decimal

decimal.addEventListener('click', () => {
    if (displayValue.textContent === '') {
        displayValue.textContent = 0;
    }
    displayValue.textContent += '.';
    decimal.disabled = true;
    percent.disabled = true;
    
});