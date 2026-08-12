export class ExactFraction {
  constructor(numerator, denominator = 1n) {
    let n = BigInt(numerator), d = BigInt(denominator);
    if (d === 0n) throw new RangeError('Denominator cannot be zero');
    if (d < 0n) { n = -n; d = -d; }
    let a = n < 0n ? -n : n, b = d;
    while (b) [a, b] = [b, a % b];
    this.numerator = a === 0n ? 0n : n / a;
    this.denominator = a === 0n ? 1n : d / a;
    Object.freeze(this);
  }
  add(x) { return new ExactFraction(this.numerator * x.denominator + x.numerator * this.denominator, this.denominator * x.denominator); }
  subtract(x) { return new ExactFraction(this.numerator * x.denominator - x.numerator * this.denominator, this.denominator * x.denominator); }
  multiply(x) { return new ExactFraction(this.numerator * x.numerator, this.denominator * x.denominator); }
  divide(x) { if (x.numerator === 0n) throw new RangeError('Division by zero'); return new ExactFraction(this.numerator * x.denominator, this.denominator * x.numerator); }
  modulo(x) { if (x.numerator === 0n) throw new RangeError('Modulo by zero'); return new ExactFraction((this.numerator * x.denominator) % (x.numerator * this.denominator), this.denominator * x.denominator); }
  pow(e, { maxExponent = 100000n } = {}) {
    e = BigInt(e);
    if (e < 0n && this.numerator === 0n) throw new RangeError('Division by zero');
    if (e < -maxExponent || e > maxExponent) throw new RangeError(`Exact exponent must be between ${-maxExponent} and ${maxExponent}`);
    return e < 0n ? new ExactFraction(this.denominator ** -e, this.numerator ** -e) : new ExactFraction(this.numerator ** e, this.denominator ** e);
  }
  toString() { return this.denominator === 1n ? String(this.numerator) : `${this.numerator}/${this.denominator}`; }
  toNumber() { return Number(this.numerator) / Number(this.denominator); }
}

function tokenize(expression) {
  const source = String(expression ?? '').trim().replace(/\s+/g, '');
  if (!source) throw new SyntaxError('Expression is empty');
  const tokens = [];
  let i = 0;
  while (i < source.length) {
    const rest = source.slice(i);
    const number = rest.match(/^\d+(?:\.\d+)?/);
    if (number) {
      tokens.push(number[0]);
      i += number[0].length;
      continue;
    }
    const identifier = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (identifier) {
      tokens.push(identifier[0]);
      i += identifier[0].length;
      continue;
    }
    if ('()+-*/%^'.includes(source[i])) {
      tokens.push(source[i]);
      i++;
      continue;
    }
    throw new SyntaxError(`Invalid character "${source[i]}"`);
  }
  return tokens;
}

export function evaluateExact(expression, options = {}) {
  const scope = options.scope && typeof options.scope === 'object' && !Array.isArray(options.scope) ? options.scope : {};
  const tokens = tokenize(expression);
  let i = 0;
  const primary = () => {
    if (tokens[i] === '(') {
      i++;
      const value = add();
      if (tokens[i++] !== ')') throw new SyntaxError('Missing closing parenthesis');
      return value;
    }
    if (tokens[i] && /^\d/.test(tokens[i])) return decimal(tokens[i++]);
    if (tokens[i] && /^[A-Za-z_]/.test(tokens[i])) {
      const name = tokens[i++];
      if (!Object.hasOwn(scope, name)) throw new SyntaxError(`Unknown identifier "${name}"`);
      return decimal(String(scope[name]));
    }
    throw new SyntaxError('Expected exact number');
  };
  const unary = () => {
    if (tokens[i] === '-') {
      i++;
      return new ExactFraction(0n).subtract(unary());
    }
    if (tokens[i] === '+') {
      i++;
      return unary();
    }
    const value = primary();
    // Consume one postfix percent. A second '%' remains available to the
    // multiplicative parser as the modulo operator (for example 50% % 3).
    return tokens[i] === '%' ? (i++, value.divide(new ExactFraction(100n))) : value;
  };
  const power = () => {
    let v = unary();
    if (tokens[i] === '^') {
      i++;
      const e = power();
      if (e.denominator !== 1n) throw new SyntaxError('Exact exponent must be an integer');
      v = v.pow(e.numerator, options);
    }
    return v;
  };
  const mul = () => {
    let v = power();
    while ('*/%'.includes(tokens[i])) {
      const op = tokens[i++], r = power();
      v = op === '*' ? v.multiply(r) : op === '/' ? v.divide(r) : v.modulo(r);
    }
    return v;
  };
  const add = () => {
    let v = mul();
    while ('+-'.includes(tokens[i])) {
      const op = tokens[i++], r = mul();
      v = op === '+' ? v.add(r) : v.subtract(r);
    }
    return v;
  };
  const result = add();
  if (i !== tokens.length) throw new SyntaxError('Invalid exact expression');
  return result;
}

function decimal(text) {
  const m = String(text).match(/^(-?)(\d+)(?:\.(\d+))?$/);
  if (!m) throw new SyntaxError(`Invalid exact number: ${text}`);
  const digits = BigInt(`${m[1] === '-' ? '-' : ''}${m[2]}${m[3] || ''}`);
  return new ExactFraction(digits, 10n ** BigInt((m[3] || '').length));
}
