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
  const animate = (targets, options) => { if (!animeReady()) return; window.anime.remove(targets); window.anime({ targets, ...options }); };
  let expression = '';
  let justCalculated = false;
  const operators = new Set(['+', '-', '*', '/']);
  const actionOperators = { add: '+', subtract: '-', multiply: '*', divide: '/' };

  function format(value) { const n = Number(value); if (!Number.isFinite(n)) return 'Error'; return n.toLocaleString('en-US', { maximumFractionDigits: 10, useGrouping: false }); }
  function display(text = expression || '0', sub = '') {
    if (primary()) primary().textContent = text;
    if (secondary()) secondary().textContent = sub;
    if (preview()) { preview().textContent = expression; preview().classList.toggle('active', Boolean(expression)); }
  }
  function animateDisplay(kind = 'input') {
    if (!animeReady()) return;
    const target = primary();
    if (!target) return;
    const settings = kind === 'result'
      ? { scale: [0.84, 1.06, 1], opacity: [0.5, 1, 1], translateY: [8, -2, 0], duration: 430, easing: 'easeOutElastic(1, .55)' }
      : kind === 'error'
        ? { translateX: [-10, 10, -7, 7, -3, 3, 0], duration: 360, easing: 'easeInOutSine' }
        : { scale: [0.985, 1], translateY: [2, 0], duration: 150, easing: 'easeOutQuad' };
    animate(target, settings);
    animate('.display-container', { scale: [0.996, 1], duration: 170, easing: 'easeOutQuad' });
  }
  function ripple(button, event) {
    if (!animeReady() || !button) return;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const dot = document.createElement('span');
    dot.className = 'anime-ripple';
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${(event?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2}px`;
    dot.style.top = `${(event?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2}px`;
    button.appendChild(dot);
    window.anime({ targets: dot, scale: [0, 1], opacity: [0.28, 0], duration: 420, easing: 'easeOutCubic', complete: () => dot.remove() });
  }
  function animateHistoryItem(button) { animate(button, { scale: [0.97, 1], translateX: [-8, 0], duration: 220, easing: 'easeOutCubic' }); }
  function readHistory() { try { const value = JSON.parse(localStorage.getItem('calculatorHistory') || '[]'); return Array.isArray(value) ? value.slice(0, 50) : []; } catch { return []; } }
  function saveHistory(items) { try { localStorage.setItem('calculatorHistory', JSON.stringify(items.slice(0, 50))); } catch {} }
  function addHistory(expr, result) { const items = readHistory(); items.unshift({ expression: expr, result: String(result), time: Date.now() }); saveHistory(items); renderHistory(); }
  function renderHistory() {
    const list = historyList(); const count = historyCount(); const items = readHistory();
    if (count) count.textContent = String(items.length);
    if (!list) return;
    list.replaceChildren();
    if (!items.length) { const empty = document.createElement('div'); empty.className = 'history-empty'; empty.textContent = 'No calculations yet'; list.appendChild(empty); return; }
    for (const item of items) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'history-item';
      const left = document.createElement('span'); const right = document.createElement('span'); left.className = 'history-expression'; right.className = 'history-result';
      left.textContent = item.expression; right.textContent = `= ${format(item.result)}`; button.append(left, right);
      button.addEventListener('click', () => { expression = String(item.result); justCalculated = true; display(format(item.result), 'History'); animateHistoryItem(button); animateDisplay('result'); });
      list.appendChild(button);
    }
    animate(list.querySelectorAll('.history-item'), { opacity: [0, 1], translateY: [7, 0], delay: window.anime?.stagger(30), duration: 180, easing: 'easeOutCubic' });
  }
  function clearHistory() { try { localStorage.removeItem('calculatorHistory'); } catch {} renderHistory(); }
  function clear() { expression = ''; justCalculated = false; display('0', ''); animate('.display-container', { scale: [0.965, 1], rotate: ['-0.5deg', '0deg'], duration: 240, easing: 'easeOutBack' }); animateDisplay(); }
  function clearEntry() {
    if (justCalculated) return clear();
    if (!expression) return;
    const match = expression.match(/^(.*?)([-+*/])(-?\d*\.?\d*)$/);
    if (match) expression = match[1] + match[2]; else expression = '';
    display(expression || '0'); animateDisplay();
  }
  function appendNumber(value) { if (justCalculated) expression = ''; justCalculated = false; expression += value; display(expression); animateDisplay(); }
  function appendDecimal() {
    if (justCalculated) expression = '';
    justCalculated = false;
    const match = expression.match(/(?:^|[+*/-])(-?\d*\.?\d*)$/);
    const tail = match ? match[1] : '';
    if (tail.includes('.')) return animate('.display-container', { translateX: [-3, 3, 0], duration: 180, easing: 'easeInOutSine' });
    if (!expression || operators.has(expression.at(-1))) expression += '0.'; else expression += '.';
    display(expression); animateDisplay();
  }
  function appendOperator(operator) {
    if (justCalculated) justCalculated = false;
    if (!expression) { if (operator === '-') expression = '-'; else return; display(expression); animateDisplay(); return; }
    const last = expression.at(-1);
    if (operators.has(last)) {
      if (operator === '-' && last !== '-') expression += '-';
      else if (last === '-' && expression.length > 1 && operators.has(expression.at(-2))) { if (operator !== '-') expression = expression.slice(0, -2) + operator; }
      else expression = expression.slice(0, -1) + operator;
    } else expression += operator;
    display(expression);
    animate('.display-container', { translateY: [1, 0], duration: 130, easing: 'easeOutQuad' });
  }
  function calculate() {
    if (!expression || operators.has(expression.at(-1)) || /[+*/]-$/.test(expression)) return animate('.display-container', { translateX: [-4, 4, 0], duration: 180, easing: 'easeInOutSine' });
    try {
      const result = evaluate(expression);
      addHistory(expression, result);
      display(format(result), `${expression} =`);
      expression = String(result);
      justCalculated = true;
      animate('.btn-equals', { scale: [0.88, 1.08, 1], rotate: ['-2deg', '2deg', '0deg'], duration: 360, easing: 'easeOutElastic(1, .6)' });
      animateDisplay('result');
      animate('.display-secondary', { opacity: [0.35, 1], translateY: [4, 0], duration: 260, easing: 'easeOutCubic' });
    } catch (error) {
      display('Error', error?.message || 'Invalid expression');
      animateDisplay('error');
      setTimeout(() => { if (primary()?.textContent === 'Error') clear(); }, 1500);
    }
  }
  function backspace() { if (justCalculated) return clear(); if (!expression) return; expression = expression.slice(0, -1); display(expression || '0'); animateDisplay(); animate('.btn-backspace', { rotate: [0, -8, 0], duration: 220, easing: 'easeOutBack' }); }
  function handleButton(button) {
    const number = button.dataset.number; const action = button.dataset.action;
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
    event.preventDefault(); event.stopImmediatePropagation();
    ripple(button, event);
    animate(button, { scale: [0.91, 1.04, 1], duration: 240, easing: 'easeOutBack' });
    handleButton(button);
  }, true);
  document.addEventListener('pointerover', event => {
    const button = event.target.closest('.calculator .btn');
    if (!button || button.contains(event.relatedTarget)) return;
    animate(button, { translateY: [-2, 0], duration: 180, easing: 'easeOutCubic' });
  }, true);
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
