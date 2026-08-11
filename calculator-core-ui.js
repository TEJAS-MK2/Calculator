import {
  evaluate,
  evaluateExact,
  factorial,
  percentage
} from './packages/calculator-core/index.js';

(() => {
  const primary = () => document.getElementById('displayPrimary');
  const secondary = () => document.getElementById('displaySecondary');
  const preview = () => document.getElementById('expressionPreview');
  const historyList = () => document.getElementById('historyList');
  const historyCount = () => document.getElementById('historyCount');
  const memoryValue = () => document.getElementById('memoryValue');

  let expression = '';
  let justCalculated = false;
  let memory = Number(localStorage.getItem('calculatorMemory') || 0);

  const operators = new Set(['+', '-', '*', '/', '%', '^']);
  const actionOperators = { add: '+', subtract: '-', multiply: '*', divide: '/' };

  function format(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 'Error';
    if (Math.abs(n) >= 1e10 || (Math.abs(n) < 1e-8 && n !== 0)) return n.toExponential(8);
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

  function animate(target) {
    if (typeof anime !== 'function') return;
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    if (!node) return;
    anime.remove(node);
    anime({ targets: node, scale: [1, 0.985, 1], duration: 150, easing: 'easeOutCubic' });
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
    localStorage.setItem('calculatorHistory', JSON.stringify(items.slice(0, 50)));
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
    if (!items.length) {
      list.innerHTML = '<div class="history-empty">No calculations yet</div>';
      return;
    }
    list.innerHTML = '';
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
        display(format(item.result), 'History recall');
        animate(primary());
      });
      list.appendChild(button);
    }
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
    const tail = expression.split(/[+\-*/%^()]/).pop() || '';
    if (tail.includes('.')) return;
    expression += tail ? '.' : '0.';
    display(expression);
  }

  function appendOperator(operator) {
    if (!expression) return;
    justCalculated = false;
    if (operators.has(expression.at(-1))) expression = expression.slice(0, -1) + operator;
    else expression += operator;
    display(expression);
  }

  function calculate() {
    if (!expression) return;
    try {
      const source = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      const result = evaluate(source);
      addHistory(expression, result);
      display(format(result), `${expression} =`);
      expression = String(result);
      justCalculated = true;
      animate(primary());
    } catch (error) {
      display('Error', error?.message || 'Invalid expression');
      setTimeout(() => { if (!expression || primary()?.textContent === 'Error') clear(); }, 1800);
    }
  }

  function scientific(action) {
    if (!expression) return;
    try {
      const value = evaluate(expression);
      let result;
      switch (action) {
        case 'sin': result = Math.sin(value * Math.PI / 180); break;
        case 'cos': result = Math.cos(value * Math.PI / 180); break;
        case 'tan': {
          const radians = value * Math.PI / 180;
          if (Math.abs(Math.cos(radians)) < 1e-12) throw new Error('Undefined tan');
          result = Math.tan(radians);
          break;
        }
        case 'log': if (value <= 0) throw new Error('log requires > 0'); result = Math.log10(value); break;
        case 'ln': if (value <= 0) throw new Error('ln requires > 0'); result = Math.log(value); break;
        case 'sqrt': if (value < 0) throw new Error('√ requires ≥ 0'); result = Math.sqrt(value); break;
        case 'square': result = value ** 2; break;
        case 'reciprocal': if (value === 0) throw new Error('Cannot divide by zero'); result = 1 / value; break;
        case 'percent': result = percentage(value, 1); break;
        case 'factorial': result = factorial(value); break;
        case 'pi': result = Math.PI; break;
        case 'e': result = Math.E; break;
        default: return;
      }
      if (!Number.isFinite(result)) throw new Error('Result is not finite');
      addHistory(`${action}(${expression})`, result);
      expression = String(result);
      justCalculated = true;
      display(format(result), `${action}(${format(value)})`);
      animate(primary());
    } catch (error) {
      display('Error', error?.message || 'Invalid calculation');
    }
  }

  function memoryAction(action) {
    try {
      if (action === 'memory-clear') memory = 0;
      else if (action === 'memory-recall') {
        expression = String(memory);
        justCalculated = true;
        display(format(memory), 'Memory recall');
      } else {
        const value = evaluate(expression || '0');
        if (action === 'memory-add') memory += value;
        if (action === 'memory-subtract') memory -= value;
        if (action === 'memory-store') memory = value;
      }
      localStorage.setItem('calculatorMemory', String(memory));
      if (memoryValue()) memoryValue().textContent = format(memory);
    } catch (error) {
      display('Error', error?.message || 'Invalid memory value');
    }
  }

  function handleButton(button) {
    const number = button.dataset.number;
    const action = button.dataset.action;
    if (number !== undefined) return appendNumber(number);
    if (!action) return;
    if (action.startsWith('memory-')) return memoryAction(action);
    if (actionOperators[action]) return appendOperator(actionOperators[action]);
    if (action === 'decimal') return appendDecimal();
    if (action === 'equals') return calculate();
    if (action === 'clear' || action === 'clear-all') return clear();
    if (action === 'backspace') {
      if (!justCalculated) expression = expression.slice(0, -1);
      display(expression || '0');
      return;
    }
    if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'square', 'reciprocal', 'percent', 'factorial', 'pi', 'e'].includes(action)) return scientific(action);
  }

  function handleKeyboard(event) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key;
    if (/^[0-9]$/.test(key)) { event.preventDefault(); event.stopImmediatePropagation(); appendNumber(key); return; }
    if (key === '.') { event.preventDefault(); event.stopImmediatePropagation(); appendDecimal(); return; }
    if ('+-*/%^()'.includes(key)) { event.preventDefault(); event.stopImmediatePropagation(); appendOperator(key); return; }
    if (key === 'Enter' || key === '=') { event.preventDefault(); event.stopImmediatePropagation(); calculate(); return; }
    if (key === 'Backspace') { event.preventDefault(); event.stopImmediatePropagation(); expression = expression.slice(0, -1); display(expression || '0'); return; }
    if (key === 'Escape' || key.toLowerCase() === 'c') { event.preventDefault(); event.stopImmediatePropagation(); clear(); }
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.calculator .btn, .calculator .memory-button');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    handleButton(button);
    animate(button);
  }, true);

  document.addEventListener('keydown', handleKeyboard, true);

  window.CalculatorCoreUI = Object.freeze({ evaluate, evaluateExact });
  renderHistory();
  if (memoryValue()) memoryValue().textContent = format(memory);
})();
