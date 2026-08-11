import { evaluate, evaluateExact } from './packages/calculator-core/index.js';
import { mean, median, variance, standardDeviation, matrixInverse, determinant } from './packages/calculator-core/advanced.js';

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
  let angleMode = 'RAD';
  let exactMode = false;
  const operators = new Set(['+', '-', '*', '/']);
  const actionOperators = { add: '+', subtract: '-', multiply: '*', divide: '/' };

  function format(value) {
    if (typeof value === 'string') return value;
    const n = Number(value);
    if (!Number.isFinite(n)) return 'Error';
    return n.toLocaleString('en-US', { maximumFractionDigits: 10, useGrouping: false });
  }
  function display(text = expression || '0', sub = '') {
    if (primary()) primary().textContent = text;
    if (secondary()) secondary().textContent = sub;
    if (preview()) { preview().textContent = expression; preview().classList.toggle('active', Boolean(expression)); }
  }
  function animateDisplay(kind = 'input') {
    if (!animeReady()) return;
    const target = primary(); if (!target) return;
    // Keep the result animation on the compositor without changing scale. Scaling
    // the text while its content width changes causes a visible snap/jitter on mobile.
    const settings = kind === 'result'
      ? { opacity: [0.86, 1], translateY: [3, 0], duration: 180, easing: 'easeOutCubic' }
      : kind === 'error'
        ? { translateX: [-6, 6, -4, 4, 0], duration: 260, easing: 'easeInOutSine' }
        : { opacity: [0.94, 1], translateY: [1, 0], duration: 100, easing: 'easeOutQuad' };
    animate(target, settings);
  }
  function ripple(button, event) {
    if (!animeReady() || !button) return;
    const rect = button.getBoundingClientRect(), size = Math.max(rect.width, rect.height) * 1.7, dot = document.createElement('span');
    Object.assign(dot.style, { position: 'absolute', pointerEvents: 'none', borderRadius: '50%', width: `${size}px`, height: `${size}px`, left: `${(event?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2}px`, top: `${(event?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2}px`, background: 'currentColor', transform: 'scale(0)', opacity: '0', zIndex: '0' });
    button.appendChild(dot); window.anime({ targets: dot, scale: [0, 1], opacity: [0.2, 0], duration: 360, easing: 'easeOutCubic', complete: () => dot.remove() });
  }
  function readHistory() { try { const value = JSON.parse(localStorage.getItem('calculatorHistory') || '[]'); return Array.isArray(value) ? value.slice(0, 50) : []; } catch { return []; } }
  function saveHistory(items) { try { localStorage.setItem('calculatorHistory', JSON.stringify(items.slice(0, 50))); } catch {} }
  function addHistory(expr, result) { const items = readHistory(); items.unshift({ expression: expr, result: String(result), time: Date.now() }); saveHistory(items); renderHistory(); }
  function renderHistory() {
    const list = historyList(), count = historyCount(), items = readHistory(); if (count) count.textContent = String(items.length); if (!list) return; list.replaceChildren();
    if (!items.length) { const empty = document.createElement('div'); empty.className = 'history-empty'; empty.textContent = 'No calculations yet'; list.appendChild(empty); return; }
    for (const item of items) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'history-item';
      const left = document.createElement('span'), right = document.createElement('span'); left.className = 'history-expression'; right.className = 'history-result'; left.textContent = item.expression; right.textContent = `= ${format(item.result)}`;
      button.append(left, right);
      button.addEventListener('click', () => { expression = String(item.result); justCalculated = true; display(format(item.result), 'History'); animateDisplay('result'); });
      list.appendChild(button);
    }
    if (animeReady()) window.anime({ targets: list.querySelectorAll('.history-item'), opacity: [0, 1], translateY: [5, 0], delay: window.anime.stagger(25), duration: 160, easing: 'easeOutCubic' });
  }
  function clearHistory() { try { localStorage.removeItem('calculatorHistory'); } catch {} renderHistory(); }
  function clear() { expression = ''; justCalculated = false; display('0', ''); animate('.display-container', { scale: [0.98, 1], duration: 190, easing: 'easeOutQuad' }); }
  function clearEntry() { if (justCalculated) return clear(); if (!expression) return; const match = expression.match(/^(.*?)([-+*/])(-?\d*\.?\d*)$/); expression = match ? match[1] + match[2] : ''; display(expression || '0'); animateDisplay(); }
  function appendNumber(value) { if (justCalculated) expression = ''; justCalculated = false; expression += value; display(expression); animateDisplay(); }
  function appendDecimal() { if (justCalculated) expression = ''; justCalculated = false; const match = expression.match(/(?:^|[+*/-])(-?\d*\.?\d*)$/), tail = match ? match[1] : ''; if (tail.includes('.')) return; if (!expression || operators.has(expression.at(-1)) || expression.at(-1) === '(' || expression.at(-1) === ',') expression += '0.'; else expression += '.'; display(expression); animateDisplay(); }
  function appendOperator(operator) { if (justCalculated) justCalculated = false; if (!expression) { if (operator !== '-') return; expression = '-'; display(expression); return; } const last = expression.at(-1); if (last === '(' || last === ',') { if (operator === '-') expression += '-'; return; } if (operators.has(last)) { if (operator === '-' && last !== '-') expression += '-'; else if (last === '-' && expression.length > 1 && operators.has(expression.at(-2))) { if (operator !== '-') expression = expression.slice(0, -2) + operator; } else expression = expression.slice(0, -1) + operator; } else expression += operator; display(expression); }
  function calculate() {
    if (!expression || operators.has(expression.at(-1)) || /[+*/]-$/.test(expression)) return;
    const source = expression;
    try {
      const result = exactMode ? evaluateExact(source).toString() : evaluate(source, {}, { angleMode });
      addHistory(source, result); display(format(result), `${source} =`); expression = String(result); justCalculated = true; animateDisplay('result');
    } catch (error) { display('Error', error?.message || 'Invalid expression'); animateDisplay('error'); setTimeout(() => { if (primary()?.textContent === 'Error') clear(); }, 1500); }
  }
  function backspace() { if (justCalculated) return clear(); if (!expression) return; expression = expression.slice(0, -1); display(expression || '0'); animateDisplay(); }
  function insertToken(token) {
    if (justCalculated) expression = '';
    justCalculated = false;
    if (token === '(') {
      const last = expression.at(-1);
      if (last && (/[,\d)]/.test(last) || last === 'π')) expression += '*';
    }
    if (token === ')' && (!expression || expression.at(-1) === '(' || operators.has(expression.at(-1)) || expression.split('(').length <= expression.split(')').length)) return;
    if (token === ',' && (!expression || expression.at(-1) === '(' || operators.has(expression.at(-1)) || expression.at(-1) === ',')) return;
    expression += token;
    display(expression); animateDisplay();
  }

  function setupEnginePanel() {
    const panel = $('enginePanel'); if (!panel) return;
    const functions = ['sin(', 'cos(', 'tan(', 'sqrt(', 'cbrt(', 'log(', 'ln(', 'abs(', 'exp(', 'floor(', 'ceil(', 'round(', 'min(', 'max(', 'mean(', 'sum(', 'product(', 'gcd(', 'lcm(', 'atan2(', 'π', 'e', 'tau', '^', '%', '(', ')', ','];
    const chips = $('functionChips');
    functions.forEach(token => { const button = document.createElement('button'); button.type = 'button'; button.textContent = token; button.setAttribute('aria-label', token === '(' ? 'Open parenthesis' : token === ')' ? 'Close parenthesis' : token === ',' ? 'Comma' : token); button.addEventListener('click', () => insertToken(token)); chips?.appendChild(button); });
    document.querySelectorAll('[data-angle]').forEach(button => button.addEventListener('click', () => { angleMode = button.dataset.angle; document.querySelectorAll('[data-angle]').forEach(item => item.classList.toggle('active', item === button)); updateModeLabel(); }));
    document.querySelectorAll('[data-stat]').forEach(button => button.addEventListener('click', () => {
      try { const values = String($('statsInput')?.value || '').split(',').map(Number).filter(Number.isFinite); if (!values.length) throw new Error('Enter comma-separated numbers'); const type = button.dataset.stat; const result = type === 'mean' ? mean(values) : type === 'median' ? median(values) : type === 'variance' ? variance(values) : standardDeviation(values); $('statsOutput').textContent = `${type}: ${format(result)}`; } catch (error) { $('statsOutput').textContent = `Error: ${error.message}`; }
    }));
    document.querySelectorAll('[data-matrix]').forEach(button => button.addEventListener('click', () => {
      try { const A = [['m00','m01'],['m10','m11']].map(row => row.map(id => Number($(id)?.value))); if (A.flat().some(v => !Number.isFinite(v))) throw new Error('Matrix values must be numbers'); const op = button.dataset.matrix; let result; if (op === 'det') result = determinant(A); else if (op === 'inverse') result = matrixInverse(A); else result = [[A[0][0], A[1][0]], [A[0][1], A[1][1]]]; $('matrixOutput').textContent = JSON.stringify(result); } catch (error) { $('matrixOutput').textContent = `Error: ${error.message}`; }
    }));
    $('exactEvaluate')?.addEventListener('click', () => { try { $('exactOutput').textContent = `${expression || '1 / 3 + 1 / 6'} → ${evaluateExact(expression || '1 / 3 + 1 / 6').toString()}`; } catch (error) { $('exactOutput').textContent = `Error: ${error.message}`; } });
  }
  function updateModeLabel() { const label = $('engineModeLabel'); if (label) label.textContent = exactMode ? 'Exact' : angleMode; }

  function handleButton(button) { const number = button.dataset.number, action = button.dataset.action; if (number !== undefined) return appendNumber(number); if (!action) return; if (actionOperators[action]) return appendOperator(actionOperators[action]); if (action === 'decimal') return appendDecimal(); if (action === 'equals') return calculate(); if (action === 'clear-all') return clear(); if (action === 'clear-entry') return clearEntry(); if (action === 'backspace') return backspace(); }
  document.addEventListener('click', event => { const button = event.target.closest('.calculator .btn'); if (!button) return; event.preventDefault(); event.stopImmediatePropagation(); ripple(button, event); if (animeReady()) window.anime({ targets: button, scale: [0.94, 1], duration: 150, easing: 'easeOutQuad' }); handleButton(button); }, true);
  document.addEventListener('keydown', event => { if (event.ctrlKey || event.metaKey || event.altKey) return; if (/^\d$/.test(event.key)) { event.preventDefault(); appendNumber(event.key); return; } if (event.key === '.') { event.preventDefault(); appendDecimal(); return; } if (operators.has(event.key)) { event.preventDefault(); appendOperator(event.key); return; } if (event.key === '(' || event.key === ')' || event.key === ',') { event.preventDefault(); insertToken(event.key); return; } if (event.key === 'Enter' || event.key === '=') { event.preventDefault(); calculate(); return; } if (event.key === 'Escape') { event.preventDefault(); clear(); return; } if (event.key === 'Backspace') { event.preventDefault(); backspace(); } });

  window.renderCalculatorHistory = renderHistory;
  window.clearCalculatorHistory = clearHistory;
  window.clearCalculator = clear;
  window.CalculatorCoreUI = Object.freeze({ evaluate, evaluateExact, getExpression: () => expression, setAngleMode: mode => { angleMode = String(mode).toUpperCase(); updateModeLabel(); }, setExactMode: enabled => { exactMode = Boolean(enabled); updateModeLabel(); } });
  window.__calculatorCoreUIReady = true;
  setupEnginePanel(); renderHistory();
})();
