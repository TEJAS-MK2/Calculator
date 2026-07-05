const display = document.getElementById('display');
const history = document.getElementById('display-history');
const memoryPill = document.getElementById('memory-pill');
const menuBtn = document.getElementById('menu-btn');
const menuPanel = document.getElementById('menu-panel');
const aboutBtn = document.getElementById('about-btn');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');
const aboutModal = document.getElementById('about-modal');
const modalCloseBtn = document.getElementById('modal-close');
let expression = '';
let currentTheme = localStorage.getItem('calculator-theme') || 'dark';
let memoryValue = 0;
let lastResult = 0;

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
  const sanitized = expr
    .replace(/π/g, String(Math.PI))
    .replace(/\be\b/g, String(Math.E))
    .replace(/\^/g, '**')
    .replace(/[^0-9.+\-*/()%^()]/g, '');
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

function insertAnswer() {
  const value = String(lastResult ?? 0);
  if (expression === '' || /[+\-*/]$/.test(expression)) {
    expression += value;
  } else {
    expression += value;
  }
  updateDisplay(expression);
  updateHistory(`Ans ${value}`);
}

function copyResult() {
  const value = display.textContent;
  if (!value || value === '0') {
    updateHistory('Nothing to copy');
    return;
  }

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(() => {
      updateHistory('Copied');
    }).catch(() => {
      updateHistory('Copy failed');
    });
  } else {
    updateHistory('Copy unavailable');
  }
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
  expression += 'π';
  updateDisplay(expression);
  updateHistory(expression);
}

function insertEuler() {
  expression += 'e';
  updateDisplay(expression);
  updateHistory(expression);
}

function insertPower() {
  expression += '^';
  updateDisplay(expression);
  updateHistory(expression);
}

function insertModulo() {
  expression += '%';
  updateDisplay(expression);
  updateHistory(expression);
}

function insertRandom() {
  expression = String(Math.random());
  updateDisplay(expression);
  updateHistory('Rand');
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
    } else if (action === 'exp') {
      nextValue = Math.exp(currentValue);
    } else if (action === 'factorial') {
      if (!Number.isInteger(currentValue) || currentValue < 0) {
        throw new Error('Invalid');
      }
      let fact = 1;
      for (let i = 2; i <= currentValue; i += 1) {
        fact *= i;
      }
      nextValue = fact;
    } else if (action === 'negate') {
      nextValue = -currentValue;
    } else if (action === 'sin') {
      nextValue = Math.sin((currentValue * Math.PI) / 180);
    } else if (action === 'cos') {
      nextValue = Math.cos((currentValue * Math.PI) / 180);
    } else if (action === 'tan') {
      nextValue = Math.tan((currentValue * Math.PI) / 180);
    } else if (action === 'log') {
      nextValue = Math.log10(currentValue);
    } else if (action === 'ln') {
      nextValue = Math.log(currentValue);
    } else if (action === 'abs') {
      nextValue = Math.abs(currentValue);
    } else if (action === 'tenx') {
      nextValue = Math.pow(10, currentValue);
    } else if (action === 'ans') {
      insertAnswer();
      return;
    }

    expression = String(nextValue);
    updateDisplay(expression);
    updateHistory(`${action} ${expression}`);
  } catch {
    updateDisplay('Error');
    updateHistory('Error');
  }
}

function clearEntry() {
  const match = expression.match(/(-?\d+(?:\.\d*)?)$/);
  if (match && match.index !== undefined) {
    expression = expression.slice(0, match.index);
  } else {
    expression = '';
  }
  updateDisplay(expression || '0');
  updateHistory(expression || '0');
}

function calculate() {
  try {
    const result = evaluateExpression(expression);
    lastResult = result;
    expression = String(result);
    updateDisplay(expression);
    updateHistory('= ' + expression);
  } catch {
    expression = '';
    updateDisplay('Error');
    updateHistory('Error');
  }
}

function openMenu() {
  menuPanel.classList.add('open');
  menuBtn.classList.add('active');
  menuBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  menuPanel.classList.remove('open');
  menuBtn.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
}

function openAboutModal() {
  aboutModal.classList.add('open');
  aboutModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeAboutModal() {
  aboutModal.classList.remove('open');
  aboutModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function showAbout() {
  openAboutModal();
  closeMenu();
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  localStorage.setItem('calculator-theme', theme);
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
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
  } else if (['sqrt', 'square', 'reciprocal', 'exp', 'factorial', 'negate', 'sin', 'cos', 'tan', 'log', 'ln', 'abs', 'tenx', 'ans'].includes(action)) {
    applyScientific(action);
  } else if (action === 'pi') {
    insertPi();
  } else if (action === 'euler') {
    insertEuler();
  } else if (action === 'power') {
    insertPower();
  } else if (action === 'mod') {
    insertModulo();
  } else if (action === 'random') {
    insertRandom();
  } else if (action === 'clear-entry') {
    clearEntry();
  } else if (action === 'copy-result') {
    copyResult();
  } else if (action === 'equals') {
    calculate();
  } else if (action === 'about') {
    showAbout();
  } else if (value !== undefined) {
    appendValue(value);
  }
}

document.querySelectorAll('.btn, .chip').forEach((button) => {
  button.addEventListener('click', handleButtonClick);
});

menuBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  if (menuPanel.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

aboutBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  showAbout();
});

copyBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  copyResult();
  closeMenu();
});

themeToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleTheme();
});

modalCloseBtn.addEventListener('click', () => {
  closeAboutModal();
});

aboutModal.addEventListener('click', (event) => {
  if (event.target === aboutModal) {
    closeAboutModal();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.menu-wrap')) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === 'Escape') {
    closeMenu();
    closeAboutModal();
    return;
  }
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
