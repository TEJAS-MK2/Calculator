const display = document.getElementById('display');
const history = document.getElementById('display-history');
const memoryPill = document.getElementById('memory-pill');
const historyBtn = document.getElementById('history-btn');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');
const historyOverlay = document.getElementById('history-overlay');
const historyClose = document.getElementById('history-close');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const menuBtn = document.getElementById('menu-btn');
const menuPanel = document.getElementById('menu-panel');
const aboutBtn = document.getElementById('about-btn');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');
const aboutModal = document.getElementById('about-modal');
const modalCloseBtn = document.getElementById('modal-close');
const calculator = document.querySelector('.calculator');
const toast = document.getElementById('toast');

let expression = '';
let currentTheme = localStorage.getItem('calculator-theme') || 'dark';
let memoryValue = 0;
let lastResult = 0;
let calculationHistory = JSON.parse(localStorage.getItem('calc-history')) || [];

// Initialize anime.js timeline for animations
const animeTimeline = anime.timeline();

// Error Handling & Validation
class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CalculatorError';
  }
}

// Utility Functions
function showToast(message) {
  try {
    toast.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('show');
    
    anime({
      targets: toast,
      translateY: [-120, 0],
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutElastic(1, .6)'
    });

    setTimeout(() => {
      anime({
        targets: toast,
        translateY: [0, -120],
        opacity: [1, 0],
        duration: 400,
        easing: 'easeInQuad',
        complete: () => {
          toast.classList.remove('show');
          toast.setAttribute('aria-hidden', 'true');
        }
      });
    }, 2000);
  } catch (err) {
    console.error('Toast error:', err);
  }
}

function updateDisplay(value) {
  try {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new CalculatorError('Invalid display value');
    }
    display.textContent = String(value);
    animateDisplay();
  } catch (err) {
    console.error('Display update error:', err);
    display.textContent = 'Error';
  }
}

function animateDisplay() {
  anime.set(display, { scale: 1 });
  anime({
    targets: display,
    scale: [1.05, 1],
    duration: 300,
    easing: 'easeOutQuad'
  });
}

function updateHistory(value) {
  try {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new CalculatorError('Invalid history value');
    }
    history.textContent = String(value);
  } catch (err) {
    console.error('History update error:', err);
  }
}

function updateMemoryPill() {
  try {
    const displayValue = memoryValue === 0 ? '0' : memoryValue.toFixed(2);
    memoryPill.textContent = `M: ${displayValue}`;
    anime({
      targets: memoryPill,
      scale: [1.1, 1],
      duration: 300,
      easing: 'easeOutQuad'
    });
  } catch (err) {
    console.error('Memory pill update error:', err);
  }
}

function addToHistory(expression, result) {
  try {
    if (!expression || result === undefined) {
      throw new CalculatorError('Invalid history entry');
    }
    
    const entry = {
      expr: String(expression),
      result: String(result),
      timestamp: new Date().toLocaleTimeString()
    };
    
    calculationHistory.unshift(entry);
    if (calculationHistory.length > 50) {
      calculationHistory.pop();
    }
    
    localStorage.setItem('calc-history', JSON.stringify(calculationHistory));
    updateHistoryPanel();
  } catch (err) {
    console.error('History addition error:', err);
  }
}

function updateHistoryPanel() {
  try {
    if (!historyList) return;
    
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
      historyList.innerHTML = '<p class="empty-history">No calculations yet</p>';
      return;
    }

    calculationHistory.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-item-expr">${item.expr}</div>
        <div class="history-item-result">= ${item.result}</div>
        <small style="color: var(--muted); font-size: 0.75rem;">${item.timestamp}</small>
      `;
      historyItem.style.cursor = 'pointer';
      historyItem.addEventListener('click', () => {
        expression = item.result;
        updateDisplay(expression);
        closeHistory();
      });

      anime({
        targets: historyItem,
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 300,
        delay: index * 50,
        easing: 'easeOutQuad'
      });

      historyList.appendChild(historyItem);
    });
  } catch (err) {
    console.error('History panel update error:', err);
  }
}

function clearHistory() {
  try {
    calculationHistory = [];
    localStorage.removeItem('calc-history');
    updateHistoryPanel();
    showToast('History cleared');
  } catch (err) {
    console.error('History clear error:', err);
    showToast('Error clearing history');
  }
}

function evaluateExpression(expr) {
  try {
    if (!expr || typeof expr !== 'string') {
      throw new CalculatorError('Invalid expression');
    }

    const sanitized = expr
      .replace(/π/g, String(Math.PI))
      .replace(/\be\b/g, String(Math.E))
      .replace(/\^/g, '**')
      .replace(/[^0-9.+\-*/()%^]/g, '');
    
    if (!sanitized) {
      throw new CalculatorError('Empty expression');
    }

    const result = Function(`"use strict"; return (${sanitized})`)();
    
    if (!Number.isFinite(result)) {
      throw new CalculatorError('Invalid result');
    }

    return result;
  } catch (err) {
    console.error('Evaluation error:', err);
    throw err;
  }
}

function clearDisplay() {
  try {
    expression = '';
    updateDisplay('0');
    updateHistory('0');
  } catch (err) {
    console.error('Clear display error:', err);
  }
}

function insertAnswer() {
  try {
    const value = String(lastResult ?? 0);
    if (expression === '' || /[+\-*/]$/.test(expression)) {
      expression += value;
    } else {
      expression += value;
    }
    updateDisplay(expression);
    updateHistory(`Ans ${value}`);
  } catch (err) {
    console.error('Insert answer error:', err);
  }
}

function copyResult() {
  try {
    const value = display.textContent;
    if (!value || value === '0' || value === 'Error') {
      showToast('Nothing to copy');
      return;
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(() => {
        showToast('✓ Copied');
      }).catch(() => {
        showToast('Copy failed');
      });
    } else {
      showToast('Copy unavailable');
    }
  } catch (err) {
    console.error('Copy error:', err);
    showToast('Copy failed');
  }
}

function backspace() {
  try {
    expression = expression.slice(0, -1);
    updateDisplay(expression || '0');
    updateHistory(expression || '0');
  } catch (err) {
    console.error('Backspace error:', err);
  }
}

function appendValue(value) {
  try {
    if (value === undefined) {
      throw new CalculatorError('Invalid value');
    }

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
  } catch (err) {
    console.error('Append value error:', err);
  }
}

function toggleSign() {
  try {
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
  } catch (err) {
    console.error('Toggle sign error:', err);
  }
}

function applyPercent() {
  try {
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
  } catch (err) {
    console.error('Percent error:', err);
  }
}

function insertPi() {
  try {
    expression += 'π';
    updateDisplay(expression);
    updateHistory(expression);
  } catch (err) {
    console.error('Insert pi error:', err);
  }
}

function insertEuler() {
  try {
    expression += 'e';
    updateDisplay(expression);
    updateHistory(expression);
  } catch (err) {
    console.error('Insert euler error:', err);
  }
}

function insertPower() {
  try {
    expression += '^';
    updateDisplay(expression);
    updateHistory(expression);
  } catch (err) {
    console.error('Insert power error:', err);
  }
}

function insertModulo() {
  try {
    expression += '%';
    updateDisplay(expression);
    updateHistory(expression);
  } catch (err) {
    console.error('Insert modulo error:', err);
  }
}

function insertRandom() {
  try {
    expression = String(Math.random().toFixed(4));
    updateDisplay(expression);
    updateHistory('Rand');
  } catch (err) {
    console.error('Random error:', err);
  }
}

function memoryClear() {
  try {
    memoryValue = 0;
    updateMemoryPill();
    updateHistory('MC');
    showToast('Memory cleared');
  } catch (err) {
    console.error('Memory clear error:', err);
  }
}

function memoryRecall() {
  try {
    expression = String(memoryValue);
    updateDisplay(expression);
    updateHistory(`MR ${expression}`);
  } catch (err) {
    console.error('Memory recall error:', err);
  }
}

function memoryAdd() {
  try {
    const currentValue = Number(evaluateExpression(expression || '0'));
    memoryValue += currentValue;
    updateMemoryPill();
    updateHistory(`M+ ${currentValue}`);
    showToast(`M+ ${currentValue}`);
  } catch (err) {
    console.error('Memory add error:', err);
    updateHistory('Error');
  }
}

function memorySubtract() {
  try {
    const currentValue = Number(evaluateExpression(expression || '0'));
    memoryValue -= currentValue;
    updateMemoryPill();
    updateHistory(`M- ${currentValue}`);
    showToast(`M- ${currentValue}`);
  } catch (err) {
    console.error('Memory subtract error:', err);
    updateHistory('Error');
  }
}

function applyScientific(action) {
  try {
    const currentValue = Number(evaluateExpression(expression || '0'));
    let nextValue = currentValue;

    if (action === 'sqrt') {
      if (currentValue < 0) throw new CalculatorError('Cannot sqrt negative');
      nextValue = Math.sqrt(currentValue);
    } else if (action === 'square') {
      nextValue = currentValue * currentValue;
    } else if (action === 'reciprocal') {
      if (currentValue === 0) throw new CalculatorError('Division by zero');
      nextValue = 1 / currentValue;
    } else if (action === 'exp') {
      nextValue = Math.exp(currentValue);
    } else if (action === 'factorial') {
      if (!Number.isInteger(currentValue) || currentValue < 0) {
        throw new CalculatorError('Invalid factorial');
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
      if (currentValue <= 0) throw new CalculatorError('Invalid log value');
      nextValue = Math.log10(currentValue);
    } else if (action === 'ln') {
      if (currentValue <= 0) throw new CalculatorError('Invalid ln value');
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
  } catch (err) {
    console.error('Scientific operation error:', err);
    updateDisplay('Error');
    updateHistory('Error');
    showToast(err.message || 'Calculation error');
  }
}

function clearEntry() {
  try {
    const match = expression.match(/(-?\d+(?:\.\d*)?)$/);
    if (match && match.index !== undefined) {
      expression = expression.slice(0, match.index);
    } else {
      expression = '';
    }
    updateDisplay(expression || '0');
    updateHistory(expression || '0');
  } catch (err) {
    console.error('Clear entry error:', err);
  }
}

function calculate() {
  try {
    if (!expression) {
      throw new CalculatorError('Empty expression');
    }

    const result = evaluateExpression(expression);
    lastResult = result;
    
    addToHistory(expression, result);
    
    expression = String(result);
    updateDisplay(expression);
    updateHistory('= ' + expression);
  } catch (err) {
    console.error('Calculation error:', err);
    expression = '';
    updateDisplay('Error');
    updateHistory('Error');
    showToast(err.message || 'Calculation error');
  }
}

function openMenu() {
  try {
    menuPanel.classList.add('open');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    
    anime({
      targets: menuPanel,
      opacity: [0, 1],
      translateY: [-10, 0],
      duration: 300,
      easing: 'easeOutQuad'
    });
  } catch (err) {
    console.error('Open menu error:', err);
  }
}

function closeMenu() {
  try {
    menuPanel.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  } catch (err) {
    console.error('Close menu error:', err);
  }
}

function openHistory() {
  try {
    historyPanel.classList.add('open');
    historyOverlay.classList.add('open');
    historyPanel.setAttribute('aria-hidden', 'false');
    historyOverlay.setAttribute('aria-hidden', 'false');
    
    anime({
      targets: historyPanel,
      right: ['-360px', '0px'],
      duration: 400,
      easing: 'easeOutQuad'
    });
    
    anime({
      targets: historyOverlay,
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutQuad'
    });
  } catch (err) {
    console.error('Open history error:', err);
  }
}

function closeHistory() {
  try {
    historyPanel.classList.remove('open');
    historyOverlay.classList.remove('open');
    historyPanel.setAttribute('aria-hidden', 'true');
    historyOverlay.setAttribute('aria-hidden', 'true');
    
    anime({
      targets: historyPanel,
      right: ['0px', '-360px'],
      duration: 400,
      easing: 'easeOutQuad'
    });
    
    anime({
      targets: historyOverlay,
      opacity: [1, 0],
      duration: 300,
      easing: 'easeOutQuad'
    });
  } catch (err) {
    console.error('Close history error:', err);
  }
}

function openAboutModal() {
  try {
    closeMenu();
    setTimeout(() => {
      aboutModal.classList.add('open');
      aboutModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      
      anime({
        targets: '.about-card',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 400,
        easing: 'easeOutQuad'
      });
    }, 0);
  } catch (err) {
    console.error('Open about modal error:', err);
  }
}

function closeAboutModal() {
  try {
    anime({
      targets: '.about-card',
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        aboutModal.classList.remove('open');
        aboutModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }
    });
  } catch (err) {
    console.error('Close about modal error:', err);
  }
}

function showAbout() {
  try {
    openAboutModal();
    closeMenu();
  } catch (err) {
    console.error('Show about error:', err);
  }
}

function applyTheme(theme) {
  try {
    if (!['dark', 'light'].includes(theme)) {
      throw new CalculatorError('Invalid theme');
    }
    
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    localStorage.setItem('calculator-theme', theme);
    
    anime({
      targets: themeToggle,
      rotate: [0, 360],
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    });
  } catch (err) {
    console.error('Apply theme error:', err);
  }
}

function toggleTheme() {
  try {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  } catch (err) {
    console.error('Toggle theme error:', err);
  }
}

function handleButtonClick(event) {
  try {
    const button = event.target.closest('button');
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    const value = button.dataset.value;

    // Animate button press
    anime({
      targets: button,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: 'easeOutQuad'
    });

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
  } catch (err) {
    console.error('Button click error:', err);
  }
}

// Event Listeners
try {
  calculator.addEventListener('click', handleButtonClick);
  
  historyBtn.addEventListener('click', () => {
    if (historyPanel.classList.contains('open')) {
      closeHistory();
    } else {
      openHistory();
    }
  });

  historyClose.addEventListener('click', closeHistory);
  historyOverlay.addEventListener('click', closeHistory);
  clearHistoryBtn.addEventListener('click', clearHistory);

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menuPanel.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  aboutBtn.addEventListener('click', showAbout);
  copyBtn.addEventListener('click', copyResult);
  themeToggle.addEventListener('click', toggleTheme);
  modalCloseBtn.addEventListener('click', closeAboutModal);
  
  aboutModal.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
      closeAboutModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeHistory();
      closeAboutModal();
      return;
    }

    const keyMap = {
      Enter: 'equals',
      Escape: 'clear',
    };

    if (keyMap[event.key]) {
      const button = document.querySelector(`[data-action="${keyMap[event.key]}"]`);
      if (button) {
        event.preventDefault();
        button.click();
      }
      return;
    }

    if (event.key === 'Backspace') {
      const button = document.querySelector('[data-action="backspace"]');
      if (button) {
        event.preventDefault();
        button.click();
      }
      return;
    }

    if (/^[0-9.+\-*/]$/.test(event.key)) {
      const button = document.querySelector(`[data-value="${event.key}"]`);
      if (button) {
        event.preventDefault();
        button.click();
      }
    }
  });

  document.addEventListener('click', (event) => {
    if (!menuPanel.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMenu();
    }
  });

  // Animate calculator on load
  anime({
    targets: calculator,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutQuad'
  });

  // Initialize
  applyTheme(currentTheme);
  updateMemoryPill();
  updateHistoryPanel();

  // Animate page glow
  anime({
    targets: calculator,
    boxShadow: [
      '0 0 0 0 rgba(34, 211, 238, 0.16), 0 24px 90px rgba(2, 6, 23, 0.44), 0 0 90px rgba(34, 211, 238, 0.16)',
      '0 0 0 1px rgba(34, 211, 238, 0.24), 0 24px 90px rgba(2, 6, 23, 0.44), 0 0 120px rgba(34, 211, 238, 0.24)'
    ],
    duration: 4000,
    easing: 'easeInOutQuad',
    loop: true,
    direction: 'alternate'
  });
} catch (err) {
  console.error('Initialization error:', err);
  showToast('Initialization error');
}
