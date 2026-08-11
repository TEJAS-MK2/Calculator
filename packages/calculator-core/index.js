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
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;

function tokenize(expression) {
  const source = String(expression ?? '')
    .trim()
    .replaceAll('π', 'pi')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\s+/g, '');

  if (!source) throw new Error('Expression is empty');

  const tokens = [];
  let i = 0;
  while (i < source.length) {
    const char = source[i];
    if (/\d|\./.test(char)) {
      const match = source.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i);
      if (!match) throw new Error(`Invalid number near "${source.slice(i)}"`);
      tokens.push({ type: 'number', value: Number(match[0]) });
      i += match[0].length;
      continue;
    }
    if (/[A-Za-z_]/.test(char)) {
      const match = source.slice(i).match(/^[A-Za-z_][A-Za-z0-9_]*/);
      tokens.push({ type: 'identifier', value: match[0] });
      i += match[0].length;
      continue;
    }
    if ('+-*/%^(),'.includes(char)) {
      tokens.push({ type: char, value: char });
      i += 1;
      continue;
    }
    throw new Error(`Invalid character "${char}"`);
  }
  return tokens;
}

function isValueEnd(token) {
  return token && (token.type === 'number' || token.type === 'identifier' || token.type === ')' || token.type === '%');
}

function isValueStart(token) {
  return token && (token.type === 'number' || token.type === 'identifier' || token.type === '(');
}

function addImplicitMultiplication(tokens) {
  const output = [];
  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i];
    const next = tokens[i + 1];
    output.push(current);
    if (isValueEnd(current) && isValueStart(next)) {
      // identifier followed by '(' is a function call when the identifier is known.
      if (!(current.type === 'identifier' && next.type === '(' && FUNCTIONS[current.value])) {
        output.push({ type: '*', value: '*' });
      }
    }
  }
  return output;
}

class Parser {
  constructor(tokens, scope) {
    this.tokens = addImplicitMultiplication(tokens);
    this.scope = scope;
    this.position = 0;
  }

  peek(type) {
    return this.tokens[this.position]?.type === type;
  }

  consume(type) {
    if (!this.peek(type)) throw new Error(`Expected ${type}`);
    return this.tokens[this.position++];
  }

  parse() {
    const value = this.parseAdditive();
    if (this.position !== this.tokens.length) throw new Error('Unexpected token in expression');
    return value;
  }

  parseAdditive() {
    let value = this.parseMultiplicative();
    while (this.peek('+') || this.peek('-')) {
      const operator = this.tokens[this.position++].type;
      const right = this.parseMultiplicative();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  }

  parseMultiplicative() {
    let value = this.parsePower();
    while (this.peek('*') || this.peek('/') || this.peek('%')) {
      const operator = this.tokens[this.position++].type;
      const right = this.parsePower();
      if (operator === '*') value *= right;
      else if (operator === '/') {
        if (right === 0) throw new Error('Division by zero');
        value /= right;
      } else value %= right;
      if (!Number.isFinite(value)) throw new Error('Result is outside the supported number range');
    }
    return value;
  }

  parsePower() {
    let value = this.parseUnary();
    if (this.peek('^')) {
      this.position++;
      const exponent = this.parsePower();
      value = value ** exponent;
      if (!Number.isFinite(value)) throw new Error('Invalid power operation');
    }
    return value;
  }

  parseUnary() {
    if (this.peek('+')) {
      this.position++;
      return +this.parseUnary();
    }
    if (this.peek('-')) {
      this.position++;
      return -this.parseUnary();
    }
    return this.parsePostfix();
  }

  parsePostfix() {
    let value = this.parsePrimary();
    while (this.peek('%')) {
      this.position++;
      value /= 100;
    }
    return value;
  }

  parsePrimary() {
    if (this.peek('number')) return this.consume('number').value;

    if (this.peek('(')) {
      this.position++;
      const value = this.parseAdditive();
      this.consume(')');
      return value;
    }

    if (this.peek('identifier')) {
      const name = this.consume('identifier').value;
      if (this.peek('(')) {
        this.position++;
        const args = [];
        if (!this.peek(')')) {
          args.push(this.parseAdditive());
          while (this.peek(',')) {
            this.position++;
            args.push(this.parseAdditive());
          }
        }
        this.consume(')');
        const fn = FUNCTIONS[name];
        if (!fn) throw new Error(`Unknown function "${name}"`);
        if (args.length !== 1) throw new Error(`Function "${name}" expects one argument`);
        const result = fn(args[0]);
        if (!Number.isFinite(result)) throw new Error(`Invalid result from ${name}`);
        return result;
      }

      if (Object.hasOwn(CONSTANTS, name)) return CONSTANTS[name];
      if (Object.hasOwn(this.scope, name)) {
        const value = Number(this.scope[name]);
        if (!Number.isFinite(value)) throw new Error(`Variable "${name}" is not finite`);
        return value;
      }
      throw new Error(`Unknown identifier "${name}"`);
    }

    throw new Error('Expected a number, variable, function, or parenthesized expression');
  }
}

/** Evaluate a mathematical expression without using eval() or Function(). */
export function evaluate(expression, scope = {}) {
  if (!scope || typeof scope !== 'object' || Array.isArray(scope)) throw new Error('Scope must be an object');
  const result = new Parser(tokenize(expression), scope).parse();
  if (typeof result !== 'number' || !Number.isFinite(result)) throw new Error('Result is not a finite number');
  return result;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

export class Fraction {
  constructor(numerator, denominator = 1) {
    if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator === 0) {
      throw new Error('Fraction requires integer numerator and non-zero denominator');
    }
    const sign = denominator < 0 ? -1 : 1;
    const divisor = gcd(numerator, denominator);
    this.numerator = sign * numerator / divisor;
    this.denominator = sign * denominator / divisor;
    Object.freeze(this);
  }

  add(other) { return new Fraction(this.numerator * other.denominator + other.numerator * this.denominator, this.denominator * other.denominator); }
  subtract(other) { return new Fraction(this.numerator * other.denominator - other.numerator * this.denominator, this.denominator * other.denominator); }
  multiply(other) { return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator); }
  divide(other) {
    if (other.numerator === 0) throw new Error('Division by zero');
    return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
  }
  pow(exponent) {
    if (!Number.isInteger(exponent)) throw new Error('Exact powers require an integer exponent');
    if (exponent < 0) return new Fraction(this.denominator ** -exponent, this.numerator ** -exponent);
    return new Fraction(this.numerator ** exponent, this.denominator ** exponent);
  }
  valueOf() { return this.numerator / this.denominator; }
  toString() { return this.denominator === 1 ? String(this.numerator) : `${this.numerator}/${this.denominator}`; }
}

function decimalToFraction(value) {
  if (!Number.isFinite(value)) throw new Error('Invalid exact number');
  const text = String(value);
  if (text.includes('e')) {
    const [coefficient, exponentText] = text.split('e');
    const exponent = Number(exponentText);
    const base = decimalToFraction(Number(coefficient));
    return exponent >= 0 ? base.multiply(new Fraction(10 ** exponent)) : base.divide(new Fraction(10 ** -exponent));
  }
  const [whole, fraction = ''] = text.split('.');
  return new Fraction(Number(`${whole || '0'}${fraction}`), 10 ** fraction.length);
}

/** Exact rational evaluation for arithmetic expressions. Functions/constants are intentionally rejected. */
export function evaluateExact(expression, scope = {}) {
  const tokens = tokenize(expression);
  const parser = new ExactParser(tokens, scope);
  return parser.parse();
}

class ExactParser extends Parser {
  constructor(tokens, scope) { super(tokens, scope); }

  parseAdditive() {
    let value = this.parseMultiplicative();
    while (this.peek('+') || this.peek('-')) {
      const op = this.tokens[this.position++].type;
      const right = this.parseMultiplicative();
      value = op === '+' ? value.add(right) : value.subtract(right);
    }
    return value;
  }

  parseMultiplicative() {
    let value = this.parsePower();
    while (this.peek('*') || this.peek('/')) {
      const op = this.tokens[this.position++].type;
      const right = this.parsePower();
      value = op === '*' ? value.multiply(right) : value.divide(right);
    }
    return value;
  }

  parsePower() {
    let value = this.parseUnary();
    if (this.peek('^')) {
      this.position++;
      const exponent = this.parsePower();
      if (exponent.denominator !== 1) throw new Error('Exact powers require an integer exponent');
      value = value.pow(exponent.numerator);
    }
    return value;
  }

  parseUnary() {
    if (this.peek('+')) { this.position++; return this.parseUnary(); }
    if (this.peek('-')) { this.position++; return new Fraction(0).subtract(this.parseUnary()); }
    return this.parsePostfix();
  }

  parsePostfix() {
    let value = this.parsePrimary();
    while (this.peek('%')) { this.position++; value = value.divide(new Fraction(100)); }
    return value;
  }

  parsePrimary() {
    if (this.peek('number')) return decimalToFraction(this.consume('number').value);
    if (this.peek('(')) {
      this.position++;
      const value = this.parseAdditive();
      this.consume(')');
      return value;
    }
    if (this.peek('identifier')) {
      const name = this.consume('identifier').value;
      if (this.peek('(')) throw new Error('Exact mode does not support functions');
      if (name === 'pi' || name === 'e') throw new Error('Exact mode does not approximate irrational constants');
      if (!Object.hasOwn(this.scope, name)) throw new Error(`Unknown identifier "${name}"`);
      return decimalToFraction(Number(this.scope[name]));
    }
    throw new Error('Expected an exact numeric value');
  }
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
  if (!Number.isFinite(n)) throw new Error('Temperature value must be finite');
  if (!['C', 'F', 'K'].includes(from) || !['C', 'F', 'K'].includes(to)) throw new Error('Temperature unit must be C, F, or K');
  const celsius = from === 'C' ? n : from === 'F' ? (n - 32) * 5 / 9 : n - 273.15;
  return to === 'C' ? celsius : to === 'F' ? celsius * 9 / 5 + 32 : celsius + 273.15;
}

export const constants = CONSTANTS;
