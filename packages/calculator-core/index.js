const FUNCTIONS = Object.freeze({
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  log: Math.log10,
  ln: Math.log,
  exp: Math.exp
});

const CONSTANTS = Object.freeze({ pi: Math.PI, e: Math.E });

function normalize(expression) {
  let source = String(expression ?? '').trim();
  if (!source) throw new Error('Expression is empty');

  source = source
    .replaceAll('π', 'pi')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\^/g, '**')
    .replace(/\bpi\b/g, 'Math.PI')
    .replace(/\be\b/g, 'Math.E');

  for (const name of Object.keys(FUNCTIONS)) {
    source = source.replace(new RegExp(`\\b${name}\\s*\\(`, 'g'), `Math.${name === 'ln' ? 'log' : name === 'log' ? 'log10' : name}(`);
  }

  if (!/^[0-9+\-*/%().,\sA-Za-z_]+$/.test(source)) {
    throw new Error('Invalid characters');
  }

  if (/\b(?:constructor|prototype|__proto__|Function|eval|window|globalThis|process|require|import)\b/i.test(source)) {
    throw new Error('Unsafe expression');
  }

  return source;
}

export function evaluate(expression, scope = {}) {
  const source = normalize(expression);
  const names = Object.keys(scope);
  const values = names.map(name => scope[name]);
  const fn = Function('Math', ...names, `"use strict"; return (${source});`);
  const result = fn(Math, ...values);
  if (typeof result !== 'number' || !Number.isFinite(result)) throw new Error('Result is not a finite number');
  return result;
}

export function factorial(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error('Factorial requires an integer from 0 to 170');
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export function percentage(value, percent) {
  return Number(value) * Number(percent) / 100;
}

export function convertTemperature(value, from, to) {
  const n = Number(value);
  const celsius = from === 'C' ? n : from === 'F' ? (n - 32) * 5 / 9 : n - 273.15;
  return to === 'C' ? celsius : to === 'F' ? celsius * 9 / 5 + 32 : celsius + 273.15;
}

export const constants = CONSTANTS;
