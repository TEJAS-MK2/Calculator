const display = document.getElementById('display');
const history = document.getElementById('display-history');
let expression = '';

function updateDisplay(value) {
  display.textContent = value;
}

function updateHistory(value) {
  history.textContent = value;
}

function clearDisplay() {
  expression = '';
  updateDisplay('0');
  updateHistory('0');
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay(expression || '0');
  updateHistory(expression || '0');
}

function appendValue(value) {
  const lastChar = expression.slice(-1);
  const isOperator = ['+', '-', '*', '/'].includes(value);

  if (expression === '' && value === '0') {
    return;
  }

  if (value === '.' && expression === '') {
    expression = '0.';
    updateDisplay(expression);
    updateHistory(expression);
    return;
  }

  if (value === '.' && /\d+\.\d*$/.test(expression)) {
    return;
  }

  if (value === '.' && /[+\-*/]$/.test(expression)) {
    expression += '0.';
    updateDisplay(expression);
    updateHistory(expression);
    return;
  }

  if (isOperator) {
    if (!expression || ['+', '-', '*', '/'].includes(lastChar)) {
      if (value === '-' && (expression === '' || ['+', '*', '/'].includes(lastChar))) {
        expression += value;
      } else if (expression && ['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1) + value;
      }
    } else {
      expression += value;
    }
    updateDisplay(expression);
    updateHistory(expression);
    return;
  }

  expression += value;
  updateDisplay(expression);
  updateHistory(expression);
}

function toggleSign() {
  if (!expression) {
    expression = '-';
  } else if (/[+\-*/]$/.test(expression)) {
    expression += '-';
  } else {
    const match = expression.match(/(-?\d+(?:\.\d*)?)$/);
    if (match) {
      const number = match[1];
      const nextValue = number.startsWith('-') ? number.slice(1) : `-${number}`;
      expression = expression.slice(0, match.index) + nextValue;
    }
  }

  updateDisplay(expression || '0');
  updateHistory(expression || '0');
}

function applyPercent() {
  if (!expression) {
    return;
  }

  const match = expression.match(/(-?\d+(?:\.\d*)?)$/);
  if (!match) {
    return;
  }

  const currentValue = parseFloat(match[1]);
  const nextValue = String(currentValue / 100);
  expression = expression.slice(0, match.index) + nextValue;

  updateDisplay(expression || '0');
  updateHistory(expression || '0');
}

function calculate() {
  try {
    const sanitized = expression.replace(/[^0-9.+\-*/]/g, '');
    if (!sanitized) {
      throw new Error('Empty');
    }
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (!Number.isFinite(result)) {
      throw new Error('Invalid');
    }
    expression = String(result);
    updateDisplay(expression);
    updateHistory('= ' + expression);
  } catch {
    expression = '';
    updateDisplay('Error');
    updateHistory('Error');
  }
}

function handleButtonClick(event) {
  const button = event.currentTarget;
  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === 'clear') {
    clearDisplay();
  } else if (action === 'backspace') {
    backspace();
  } else if (action === 'sign') {
    toggleSign();
  } else if (action === 'percent') {
    applyPercent();
  } else if (action === 'equals') {
    calculate();
  } else if (value !== undefined) {
    appendValue(value);
  }
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', handleButtonClick);
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  const keyMap = {
    Enter: 'equals',
    Escape: 'clear',
  };

  if (keyMap[key]) {
    const button = document.querySelector(`[data-action="${keyMap[key]}"]`);
    if (button) {
      button.click();
    }
    return;
  }

  if (key === 'Backspace') {
    const button = document.querySelector('[data-action="backspace"]');
    if (button) {
      button.click();
    }
    return;
  }

  if (/^[0-9.+\-*/]$/.test(key)) {
    const button = document.querySelector(`[data-value="${key}"]`);
    if (button) {
      button.click();
    }
  }
});
