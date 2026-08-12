const FUNCTIONS = Object.freeze({
  sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, asinh: Math.asinh, acosh: Math.acosh, atanh: Math.atanh,
  sec: x => 1 / Math.cos(x), csc: x => 1 / Math.sin(x), cot: x => 1 / Math.tan(x),
  asec: x => Math.acos(1 / x), acsc: x => Math.asin(1 / x), acot: x => Math.atan(1 / x),
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, floor: Math.floor, ceil: Math.ceil, round: Math.round,
  trunc: Math.trunc, sign: Math.sign, log: Math.log10, ln: Math.log, exp: Math.exp, log2: Math.log2,
  log1p: Math.log1p, expm1: Math.expm1, hypot: Math.hypot, min: Math.min, max: Math.max,
  sum: (...v) => v.reduce((a, b) => a + b, 0), product: (...v) => v.reduce((a, b) => a * b, 1),
  mean: (...v) => v.reduce((a, b) => a + b, 0) / v.length,
  gcd: (...v) => v.reduce((a, b) => gcd(a, b)), lcm: (...v) => v.reduce((a, b) => lcm(a, b)),
  atan2: (y, x) => Math.atan2(y, x),
});
const CONSTANTS = Object.freeze({ pi: Math.PI, e: Math.E, tau: Math.PI * 2, phi: (1 + Math.sqrt(5)) / 2, sqrt2: Math.SQRT2, ln2: Math.LN2, ln10: Math.LN10 });
const MULTI = new Set(['min', 'max', 'sum', 'product', 'mean', 'gcd', 'lcm']);
const TRIG = new Set(['sin', 'cos', 'tan', 'sec', 'csc', 'cot']);
const INV_TRIG = new Set(['asin', 'acos', 'atan', 'asec', 'acsc', 'acot']);

function tokenize(expression) {
  const source = String(expression ?? '').trim().replaceAll('π', 'pi').replaceAll('τ', 'tau').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/\s+/g, '');
  if (!source) throw new Error('Expression is empty');
  const tokens = [];
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (/\d|\./.test(c)) {
      const m = source.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
      if (!m) throw new Error(`Invalid number near "${source.slice(i)}"`);
      const value = Number(m[0]);
      if (!Number.isFinite(value)) throw new Error('Number is outside the supported range');
      tokens.push({ type: 'number', value }); i += m[0].length; continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      const m = source.slice(i).match(/^[A-Za-z_][A-Za-z0-9_]*/);
      tokens.push({ type: 'identifier', value: m[0] }); i += m[0].length; continue;
    }
    if ('+-*/%^(),'.includes(c)) { tokens.push({ type: c, value: c }); i++; continue; }
    throw new Error(`Invalid character "${c}"`);
  }
  return tokens;
}
const valueEnd = t => t && ['number', 'identifier', ')'].includes(t.type);
const valueStart = t => t && ['number', 'identifier', '('].includes(t.type);
function implicit(tokens) {
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const a = tokens[i], b = tokens[i + 1]; out.push(a);
    if (valueEnd(a) && valueStart(b) && !(a.type === 'identifier' && b.type === '(' && FUNCTIONS[a.value])) out.push({ type: '*', value: '*' });
  }
  return out;
}
export class EvaluationError extends Error { constructor(message, code = 'EVALUATION_ERROR') { super(message); this.name = 'EvaluationError'; this.code = code; } }
export class Parser {
  constructor(tokens, scope = {}, angleMode = 'RAD') { this.tokens = implicit(tokens); this.scope = scope; this.position = 0; this.angleMode = normalizeAngleMode(angleMode); }
  peek(t) { return this.tokens[this.position]?.type === t; }
  consume(t) { if (!this.peek(t)) throw new EvaluationError(`Expected ${t}`, 'EXPECTED_TOKEN'); return this.tokens[this.position++]; }
  parse() { const v = this.add(); if (this.position !== this.tokens.length) throw new EvaluationError('Unexpected token in expression', 'UNEXPECTED_TOKEN'); return v; }
  add() { let v = this.mul(); while (this.peek('+') || this.peek('-')) { const op = this.tokens[this.position++].type, r = this.mul(); v = op === '+' ? v + r : v - r; } return this.finite(v); }
  mul() {
    let v = this.signedPower();
    while (this.peek('*') || this.peek('/') || (this.peek('%') && valueStart(this.tokens[this.position + 1]))) {
      const op = this.tokens[this.position++].type, r = this.signedPower();
      if (op === '*') v *= r; else if (op === '/') { if (r === 0) throw new EvaluationError('Division by zero', 'DIVISION_BY_ZERO'); v /= r; }
      else { if (r === 0) throw new EvaluationError('Modulo by zero', 'DIVISION_BY_ZERO'); v %= r; }
      v = this.finite(v);
    }
    return v;
  }
  signedPower() {
    if (this.peek('+')) { this.position++; return this.signedPower(); }
    if (this.peek('-')) { this.position++; return -this.signedPower(); }
    let v = this.postfix();
    if (this.peek('^')) { this.position++; const exponent = this.signedPower(); v = this.finite(v ** exponent, 'Invalid power operation', 'INVALID_POWER'); }
    return v;
  }
  postfix() { let v = this.primary(); while (this.peek('%') && !valueStart(this.tokens[this.position + 1])) { this.position++; v /= 100; } return this.finite(v); }
  primary() {
    if (this.peek('number')) return this.consume('number').value;
    if (this.peek('(')) { this.position++; const v = this.add(); this.consume(')'); return v; }
    if (this.peek('identifier')) {
      const name = this.consume('identifier').value;
      if (this.peek('(')) {
        this.position++; const args = [];
        if (!this.peek(')')) { args.push(this.add()); while (this.peek(',')) { this.position++; args.push(this.add()); } }
        this.consume(')'); const fn = FUNCTIONS[name]; if (!fn) throw new EvaluationError(`Unknown function "${name}"`, 'UNKNOWN_FUNCTION');
        const expected = name === 'atan2' ? 2 : 1;
        if ((MULTI.has(name) && args.length < 1) || (!MULTI.has(name) && args.length !== expected)) throw new EvaluationError(`Invalid argument count for ${name}`, 'ARGUMENT_COUNT');
        return this.finite(applyFunction(name, fn, args, this.angleMode), `Invalid result from ${name}`, 'INVALID_FUNCTION_RESULT');
      }
      if (Object.hasOwn(CONSTANTS, name)) return CONSTANTS[name];
      if (Object.hasOwn(this.scope, name)) { const v = Number(this.scope[name]); if (!Number.isFinite(v)) throw new EvaluationError(`Variable "${name}" is not finite`, 'INVALID_VARIABLE'); return v; }
      throw new EvaluationError(`Unknown identifier "${name}"`, 'UNKNOWN_IDENTIFIER');
    }
    throw new EvaluationError('Expected a number, variable, function, or parenthesized expression', 'EXPECTED_VALUE');
  }
  finite(v, message = 'Result is outside the supported number range', code = 'NON_FINITE_RESULT') { if (!Number.isFinite(v)) throw new EvaluationError(message, code); return v; }
}
export function normalizeAngleMode(mode = 'RAD') { const m = String(mode).toUpperCase(); if (!['DEG', 'RAD', 'GRAD'].includes(m)) throw new Error('Angle mode must be DEG, RAD, or GRAD'); return m; }
export function toRadians(value, mode = 'RAD') { const m = normalizeAngleMode(mode); return m === 'DEG' ? value * Math.PI / 180 : m === 'GRAD' ? value * Math.PI / 200 : value; }
export function fromRadians(value, mode = 'RAD') { const m = normalizeAngleMode(mode); return m === 'DEG' ? value * 180 / Math.PI : m === 'GRAD' ? value * 200 / Math.PI : value; }
function applyFunction(name, fn, args, mode) {
  if (TRIG.has(name)) return fn(toRadians(args[0], mode));
  if (INV_TRIG.has(name)) return fromRadians(fn(args[0]), mode);
  if (name === 'atan2') return fromRadians(fn(args[0], args[1]), mode);
  if (name === 'sqrt' && args[0] < 0) throw new EvaluationError('Square root requires a non-negative value', 'DOMAIN_ERROR');
  if (name === 'acosh' && args[0] < 1) throw new EvaluationError('acosh requires a value of at least 1', 'DOMAIN_ERROR');
  if (['log', 'ln', 'log2'].includes(name) && args[0] <= 0) throw new EvaluationError(`${name} requires a valid positive domain`, 'DOMAIN_ERROR');
  if (name === 'log1p' && args[0] <= -1) throw new EvaluationError('log1p requires a value greater than -1', 'DOMAIN_ERROR');
  return MULTI.has(name) ? fn(...args) : fn(args[0]);
}
export function evaluate(expression, scope = {}, options = {}) { if (!scope || typeof scope !== 'object' || Array.isArray(scope)) throw new Error('Scope must be an object'); return new Parser(tokenize(expression), scope, options.angleMode ?? 'RAD').parse(); }
function gcd(a, b) { a = Math.abs(Math.trunc(a)); b = Math.abs(Math.trunc(b)); while (b) [a, b] = [b, a % b]; return a || 1; }
function lcm(a, b) { a = Math.trunc(a); b = Math.trunc(b); if (!a || !b) return 0; return Math.abs(a * b) / gcd(a, b); }
export { ExactFraction as Fraction, evaluateExact } from './exact.js';
export function factorial(value) { const n = Number(value); if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error('Factorial requires an integer from 0 to 170'); let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
export function percentage(value, percent) { return Number(value) * Number(percent) / 100; }
export function convertTemperature(value, from, to) { const n = Number(value); if (!Number.isFinite(n)) throw new Error('Temperature value must be finite'); if (!['C','F','K'].includes(from) || !['C','F','K'].includes(to)) throw new Error('Temperature unit must be C, F, or K'); const c = from === 'C' ? n : from === 'F' ? (n - 32) * 5 / 9 : n - 273.15; return to === 'C' ? c : to === 'F' ? c * 9 / 5 + 32 : c + 273.15; }
export function absolute(value) { const n = Number(value); if (!Number.isFinite(n)) throw new EvaluationError('Value is not finite', 'NON_FINITE_RESULT'); return Math.abs(n); }
export function minimum(...v) { if (!v.length) throw new EvaluationError('Minimum requires at least one value', 'ARGUMENT_COUNT'); return Math.min(...v.map(Number)); }
export function maximum(...v) { if (!v.length) throw new EvaluationError('Maximum requires at least one value', 'ARGUMENT_COUNT'); return Math.max(...v.map(Number)); }
export function average(...v) { if (!v.length) throw new EvaluationError('Average requires at least one value', 'ARGUMENT_COUNT'); return v.reduce((s, x) => s + Number(x), 0) / v.length; }
export const mean = (...v) => average(...v);
export const sum = (...v) => v.reduce((s, x) => s + Number(x), 0);
export const product = (...v) => v.reduce((r, x) => r * Number(x), 1);
export function clamp(value, min, max) { const v = Number(value), lo = Number(min), hi = Number(max); if ([v,lo,hi].some(n => !Number.isFinite(n))) throw new EvaluationError('Clamp values must be finite', 'NON_FINITE_RESULT'); if (lo > hi) throw new EvaluationError('Minimum cannot exceed maximum', 'INVALID_RANGE'); return Math.min(hi, Math.max(lo, v)); }
export function reciprocal(value) { const n = Number(value); if (!Number.isFinite(n)) throw new EvaluationError('Value is not finite', 'NON_FINITE_RESULT'); if (n === 0) throw new EvaluationError('Cannot take reciprocal of zero', 'DIVISION_BY_ZERO'); return 1 / n; }
export const square = value => Number(value) ** 2;
export const cube = value => Number(value) ** 3;
export const cubeRoot = value => Math.cbrt(Number(value));
export const greatestCommonDivisor = gcd;
export const leastCommonMultiple = lcm;
export function combinations(n, r) { n = Math.trunc(n); r = Math.trunc(r); if (n < 0 || r < 0 || r > n) throw new EvaluationError('Invalid combination range', 'INVALID_RANGE'); r = Math.min(r, n-r); let result = 1; for (let i = 1; i <= r; i++) result = result * (n-r+i) / i; return result; }
export function permutations(n, r) { n = Math.trunc(n); r = Math.trunc(r); if (n < 0 || r < 0 || r > n) throw new EvaluationError('Invalid permutation range', 'INVALID_RANGE'); let result = 1; for (let i = 0; i < r; i++) result *= n-i; return result; }
export function median(...v) { if (!v.length) throw new EvaluationError('Median requires at least one value', 'ARGUMENT_COUNT'); const s = v.map(Number).sort((a,b)=>a-b), m = Math.floor(s.length/2); return s.length%2 ? s[m] : (s[m-1]+s[m])/2; }
export function variance(...v) { if (!v.length) throw new EvaluationError('Variance requires at least one value', 'ARGUMENT_COUNT'); const m = average(...v); return average(...v.map(x => (Number(x)-m)**2)); }
export const standardDeviation = (...v) => Math.sqrt(variance(...v));
export function range(...v) { if (!v.length) throw new EvaluationError('Range requires at least one value', 'ARGUMENT_COUNT'); return maximum(...v)-minimum(...v); }
export const constants = CONSTANTS;
