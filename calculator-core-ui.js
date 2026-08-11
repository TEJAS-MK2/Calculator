import { evaluate } from './packages/calculator-core/index.js';

(() => {
  const $ = id => document.getElementById(id);
  const primary = () => $('displayPrimary');
  const secondary = () => $('displaySecondary');
  const preview = () => $('expressionPreview');
  const historyList = () => $('historyList');
  const historyCount = () => $('historyCount');
  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const animeReady = () => !reduceMotion() && typeof window.anime === 'function';
  const animate = (targets, options) => {
    if (!animeReady()) return;
    window.anime.remove(targets);
    window.anime({ targets, ...options });
  };

  let expression = '';
  let justCalculated = false;
  const operators = new Set(['+', '-', '*', '/']);
  const actionOperators = { add: '+', subtract: '-', multiply: '*', divide: '/' };

  function format(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 'Error';
    return n.toLocaleString('en-US', { maximumFractionDigits: 10, useGrouping: false });
  }

  function display(text = expression || '0', sub = '') {
    if (primary()) primary().textContent = text;
    if (secondary()) secondary().textContent = sub;
    if (preview()) {
      preview().textContent = expression;
      preview().classList.toggle('active', Boolean(expression));
    }
  }

  function animateDisplay(kind = 'input') {
    if (!animeReady()) return;
    const target = primary();
    if (!target) return;
    const settings = kind === 'result'
      ? { scale: [0.96, 1.02, 1], opacity: [0.75, 1, 1], translateY: [4, -1, 0], duration: 300, easing: 'easeOutCubic' }
      : kind === 'error'
        ? { translateX: [-8, 8, -5, 5, 0], duration: 300, easing: 'easeInOutSine' }
        : { scale: [0.99, 1], translateY: [1, 0], duration: 120, easing: 'easeOutQuad' };
    animate(target, settings);
  }

  function ripple(button, event) {
    if (!animeReady() || !button) return;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.7;
    const dot = document.createElement('span');
    Object.assign(dot.style, {
      position: 'absolute', pointerEvents: 'none', borderRadius: '50%',
      width: `${size}px`, height: `${size}px`,
      left: `${(event?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2}px`,
      top: `${(event?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2}px`,
      background: 'currentColor', transform: 'scale(0)', opacity: '0', zIndex: '0'
    });
    button.appendChild(dot);
    window.anime({
      targets: dot,
      scale: [0, 1],
      opacity: [0.2, 0],
      duration: 360,
      easing: 'easeOutCubic',
      complete: () => dot.remove()
    });
  }

  function animateHistoryItem(button) {
    animate(button, { scale: [0.985, 1], translateX: [-5, 0], duration: 180, easing: 'easeOutCubic' });
  }

  function readHistory() {
    try {
      const value = JSON.parse(localStorage.getItem('calculatorHistory') || '[]');
      return Array.isArray(value) ? value.slice(0, 50) : [];
    } catch {
      return [];
    }
  }

  function saveHistory(items) {
    try { localStorage.setItem('calculatorHistory', JSON.stringify(items.slice(0, 50))); } catch {}
  }

  function addHistory(expr, result) {
    const items = readHistory();
    items.unshift({ expression: expr, result: String(result), time: Date.now() });
    saveHistory(items);
    renderHistory();
  }

  function renderHistory() {
    const list = historyList();
    const count = historyCount();
    const items = readHistory();
    if (count) count.textContent = String(items.length);
    if (!list) return;
    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'history-empty';
      empty.textContent = 'No calculations yet';
      list.appendChild(empty);
      return;
    }
    for (const item of items) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'history-item';
      const left = document.createElement('span');
      const right = document.createElement('span');
      left.className = 'history-expression';
      right.className = 'history-result';
      left.textContent = item.expression;
      right.textContent = `= ${format(item.result)}`;
      button.append(left, right);
      button.addEventListener('click', () => {
        expression = String(item.result);
        justCalculated = true;
        display(format(item.result), 'History');
        animateHistoryItem(button);
        animateDisplay('result');
      });
      list.appendChild(button);
    }
    if (animeReady()) {
      window.anime({
        targets: list.querySelectorAll('.history-item'),
        opacity: [0, 1],
        translateY: [5, 0],
        delay: window.anime.stagger(25),
        duration: 160,
        easing: 'easeOutCubic'
      });
    }
  }

  function clearHistory() {
    try { localStorage.removeItem('calculatorHistory'); } catch {}
    renderHistory();
  }

  function clear() {
    expression = '';
    justCalculated = false;
    display('0', '');
    animate('.display-container', { scale: [0.98, 1], duration: 190, easing: 'easeOutQuad' });
  }

  function clearEntry() {
    if (justCalculated) return clear();
    if (!expression) return;
    const match = expression.match(/^(.*?)([-+*/])(-?\d*\.?\d*)$/);
    if (match) expression = match[1] + match[2]; else expression = '';
    display(expression || '0');
    animateDisplay();
  }

  function appendNumber(value) {
    if (justCalculated) expression = '';
    justCalculated = false;
    expression += value;
    display(expression);
    animateDisplay();
  }

  function appendDecimal() {
    if (justCalculated) expression = '';
    justCalculated = false;
    const match = expression.match(/(?:^|[+*/-])(-?\d*\.?\d*)$/);
    const tail = match ? match[1] : '';
    if (tail.includes('.')) {
      animate('.display-container', { translateX: [-3, 3, 0], duration: 160, easing: 'easeInOutSine' });
      return;
    }
    if (!expression || operators.has(expression.at(-1))) expression += '0.';
    else expression += '.';
    display(expression);
    animateDisplay();
  }

  function appendOperator(operator) {
    if (justCalculated) justCalculated = false;
    if (!expression) {
      if (operator !== '-') return;
      expression = '-';
      display(expression);
      animateDisplay();
      return;
    }
    const last = expression.at(-1);
    if (operators.has(last)) {
      if (operator === '-' && last !== '-') expression += '-';
      else if (last === '-' && expression.length > 1 && operators.has(expression.at(-2))) {
        if (operator !== '-') expression = expression.slice(0, -2) + operator;
      } else expression = expression.slice(0, -1) + operator;
    } else expression += operator;
    display(expression);
    animate('.display-container', { translateY: [1, 0], duration: 120, easing: 'easeOutQuad' });
  }

  function calculate() {
    if (!expression || operators.has(expression.at(-1)) || /[+*/]-$/.test(expression)) {
      animate('.display-container', { translateX: [-4, 4, -2, 2, 0], duration: 220, easing: 'easeInOutSine' });
      return;
    }
    try {
      const result = evaluate(expression);
      addHistory(expression, result);
      display(format(result), `${expression} =`);
      expression = String(result);
      justCalculated = true;
      animate('.btn-equals', { scale: [0.94, 1.04, 1], duration: 240, easing: 'easeOutBack' });
      animateDisplay('result');
      animate('.display-secondary', { opacity: [0.5, 1], translateY: [2, 0], duration: 180, easing: 'easeOutCubic' });
    } catch (error) {
      display('Error', error?.message || 'Invalid expression');
      animateDisplay('error');
      setTimeout(() => { if (primary()?.textContent === 'Error') clear(); }, 1500);
    }
  }

  function backspace() {
    if (justCalculated) return clear();
    if (!expression) return;
    expression = expression.slice(0, -1);
    display(expression || '0');
    animateDisplay();
    animate('.btn-backspace', { rotate: [0, -6, 0], duration: 180, easing: 'easeOutQuad' });
  }

  function handleButton(button) {
    const number = button.dataset.number;
    const action = button.dataset.action;
    if (number !== undefined) return appendNumber(number);
    if (!action) return;
    if (actionOperators[action]) return appendOperator(actionOperators[action]);
    if (action === 'decimal') return appendDecimal();
    if (action === 'equals') return calculate();
    if (action === 'clear-all') return clear();
    if (action === 'clear-entry') return clearEntry();
    if (action === 'backspace') return backspace();
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.calculator .btn');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    ripple(button, event);
    if (animeReady()) {
      window.anime.remove(button);
      window.anime({ targets: button, scale: [0.94, 1], duration: 150, easing: 'easeOutQuad' });
    }
    handleButton(button);
  }, true);

  // Do not animate on pointerover: browsers fire pointerover repeatedly when
  // entering child/icon nodes, which used to cancel the click animation.
  // CSS handles the lightweight hover state instead.

  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (/^\d$/.test(event.key)) { event.preventDefault(); appendNumber(event.key); return; }
    if (event.key === '.') { event.preventDefault(); appendDecimal(); return; }
    if (operators.has(event.key)) { event.preventDefault(); appendOperator(event.key); return; }
    if (event.key === 'Enter' || event.key === '=') { event.preventDefault(); calculate(); return; }
    if (event.key === 'Escape') { event.preventDefault(); clear(); return; }
    if (event.key === 'Backspace') { event.preventDefault(); backspace(); }
  });

  window.renderCalculatorHistory = renderHistory;
  window.clearCalculatorHistory = clearHistory;
  window.clearCalculator = clear;
  window.CalculatorCoreUI = Object.freeze({ evaluate });
  window.__calculatorCoreUIReady = true;
  renderHistory();
})();
