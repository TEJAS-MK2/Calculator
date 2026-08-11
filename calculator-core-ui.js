import { evaluate } from './packages/calculator-core/index.js';

(() => {
  const $ = id => document.getElementById(id);
  const primary = () => $('displayPrimary');
  const secondary = () => $('displaySecondary');
  const preview = () => $('expressionPreview');
  const historyList = () => $('historyList');
  const historyCount = () => $('historyCount');

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
      });
      list.appendChild(button);
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
  }

  function appendNumber(value) {
    if (justCalculated) expression = '';
    justCalculated = false;
    expression += value;
    display(expression);
  }

  function appendDecimal() {
    if (justCalculated) expression = '';
    justCalculated = false;
    const last = expression.at(-1);
    if (last === ')') return;
    const tail = expression.split(/[+\-*/]/).pop() || '';
    if (tail.includes('.')) return;
    expression += tail ? '.' : '0.';
    display(expression);
  }

  function appendOperator(operator) {
    if (!expression) return;
    if (operators.has(expression.at(-1))) {
      expression = expression.slice(0, -1) + operator;
    } else {
      expression += operator;
    }
    justCalculated = false;
    display(expression);
  }

  function calculate() {
    if (!expression || operators.has(expression.at(-1))) return;
    try {
      const result = evaluate(expression);
      addHistory(expression, result);
      display(format(result), `${expression} =`);
      expression = String(result);
      justCalculated = true;
    } catch (error) {
      display('Error', error?.message || 'Invalid expression');
      setTimeout(() => {
        if (primary()?.textContent === 'Error') clear();
      }, 1500);
    }
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
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.calculator .btn');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    handleButton(button);
  }, true);

  window.renderCalculatorHistory = renderHistory;
  window.clearCalculatorHistory = clearHistory;
  window.CalculatorCoreUI = Object.freeze({ evaluate });
  window.__calculatorCoreUIReady = true;
  renderHistory();
})();
