const display = document.getElementById('display');
const history = document.getElementById('display-history');
const memoryPill = document.getElementById('memory-pill');
let expression = '';
let memoryValue = 0;

function updateDisplay(value) {
  display.textContent = value;
}

function updateHistory(value) {
  history.textContent = value;
}

function updateMemoryPill() {
  memoryPill.textContent = `M: ${memoryValue === 0 ? '0' : memoryValue}`;
}

function evaluateExpression(expr) {
  const sanitized = expr.replace(/π/g, String(Math.PI)).replace(/[^0-9.+\-*/()]/g, '');
  if (!sanitized) {
    throw new Error('Empty');
  }

  const result = Function(`"use strict"; return (${sanitized})`)();
  if (!Number.isFinite(result)) {
    throw new Error('Invalid');
  }

  return result;
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

function insertPi() {
  if (!expression || /[+\-*/]$/.test(expression)) {
    expression += 'π';
  } else {
    expression += 'π';
  }
  updateDisplay(expression);
  updateHistory(expression);
}

function memoryClear() {
  memoryValue = 0;
  updateMemoryPill();
  updateHistory('MC');
}

function memoryRecall() {
  expression = String(memoryValue);
  updateDisplay(expression);
  updateHistory(`MR ${expression}`);
}

function memoryAdd() {
  try {
    const currentValue = Number(evaluateExpression(expression || '0'));
    memoryValue += currentValue;
    updateMemoryPill();
    updateHistory(`M+ ${currentValue}`);
  } catch {
    updateHistory('Error');
  }
}

function memorySubtract() {
  try {
    const currentValue = Number(evaluateExpression(expression || '0'));
    memoryValue -= currentValue;
    updateMemoryPill();
    updateHistory(`M- ${currentValue}`);
  } catch {
    updateHistory('Error');
  }
}

function applyScientific(action) {
  try {
    const currentValue = Number(evaluateExpression(expression || '0'));
    let nextValue = currentValue;

    if (action === 'sqrt') {
      nextValue = Math.sqrt(currentValue);
    } else if (action === 'square') {
      nextValue = currentValue * currentValue;
    } else if (action === 'reciprocal') {
      nextValue = 1 / currentValue;
    }

    expression = String(nextValue);
    updateDisplay(expression);
    updateHistory(`${action} ${expression}`);
  } catch {
    updateDisplay('Error');
    updateHistory('Error');
  }
}

function calculate() {
  try {
    const result = evaluateExpression(expression);
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
  } else if (action === 'memory-clear') {
    memoryClear();
  } else if (action === 'memory-recall') {
    memoryRecall();
  } else if (action === 'memory-add') {
    memoryAdd();
  } else if (action === 'memory-subtract') {
    memorySubtract();
  } else if (action === 'sqrt' || action === 'square' || action === 'reciprocal') {
    applyScientific(action);
  } else if (action === 'pi') {
    insertPi();
  } else if (action === 'equals') {
    calculate();
  } else if (value !== undefined) {
    appendValue(value);
  }
}

document.querySelectorAll('.btn, .chip').forEach((button) => {
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
      event.preventDefault();
      button.click();
    }
    return;
  }

  if (key === 'Backspace') {
    const button = document.querySelector('[data-action="backspace"]');
    if (button) {
      event.preventDefault();
      button.click();
    }
    return;
  }

  if (/^[0-9.+\-*/]$/.test(key)) {
    const button = document.querySelector(`[data-value="${key}"]`);
    if (button) {
      event.preventDefault();
      button.click();
    }
  }
});

updateMemoryPill();
