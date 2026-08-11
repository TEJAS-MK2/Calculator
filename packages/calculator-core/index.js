const FUNCTIONS = Object.freeze({
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  asinh: Math.asinh, acosh: Math.acosh, atanh: Math.atanh,
  sec: value => 1 / Math.cos(value), csc: value => 1 / Math.sin(value), cot: value => 1 / Math.tan(value),
  asec: value => Math.acos(1 / value), acsc: value => Math.asin(1 / value), acot: value => Math.atan(1 / value),
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs,
  floor: Math.floor, ceil: Math.ceil, round: Math.round,
  trunc: Math.trunc, sign: Math.sign,
  log: Math.log10, ln: Math.log, exp: Math.exp,
  log2: Math.log2, log1p: Math.log1p, expm1: Math.expm1,
  hypot: Math.hypot,
  min: Math.min, max: Math.max,
  sum: (...values) => values.reduce((a, b) => a + b, 0),
  product: (...values) => values.reduce((a, b) => a * b, 1),
  mean: (...values) => values.reduce((a, b) => a + b, 0) / values.length,
  gcd: (...values) => values.reduce((a, b) => gcd(a, b)),
  lcm: (...values) => values.reduce((a, b) => lcm(a, b)),
  atan2: (y, x) => Math.atan2(y, x),
});
const CONSTANTS = Object.freeze({ pi: Math.PI, e: Math.E, tau: Math.PI * 2, phi: (1 + Math.sqrt(5)) / 2, sqrt2: Math.SQRT2, ln2: Math.LN2, ln10: Math.LN10 });
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
function tokenize(expression) {
  const source = String(expression ?? '').trim().replaceAll('π', 'pi').replaceAll('τ', 'tau').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/\s+/g, '');
  if (!source) throw new Error('Expression is empty');
  const tokens = []; let i = 0;
  while (i < source.length) {
    const char = source[i];
    if (/\d|\./.test(char)) { const match = source.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/i); if (!match) throw new Error(`Invalid number near "${source.slice(i)}"`); const value = Number(match[0]); if (!Number.isFinite(value)) throw new Error('Number is outside the supported range'); tokens.push({ type: 'number', value }); i += match[0].length; continue; }
    if (/[A-Za-z_]/.test(char)) { const match = source.slice(i).match(/^[A-Za-z_][A-Za-z0-9_]*/); if (!IDENTIFIER.test(match[0])) throw new Error(`Invalid identifier "${match[0]}"`); tokens.push({ type: 'identifier', value: match[0] }); i += match[0].length; continue; }
    if ('+-*/%^(),'.includes(char)) { tokens.push({ type: char, value: char }); i++; continue; }
    throw new Error(`Invalid character "${char}"`);
  }
  return tokens;
}
const isValueEnd = token => token && (token.type === 'number' || token.type === 'identifier' || token.type === ')');
const isValueStart = token => token && (token.type === 'number' || token.type === 'identifier' || token.type === '(');
function addImplicitMultiplication(tokens) { const output = []; for (let i = 0; i < tokens.length; i++) { const current = tokens[i], next = tokens[i + 1]; output.push(current); if (isValueEnd(current) && isValueStart(next) && !(current.type === 'identifier' && next.type === '(' && FUNCTIONS[current.value])) output.push({ type: '*', value: '*' }); } return output; }
export class EvaluationError extends Error { constructor(message, code = 'EVALUATION_ERROR') { super(message); this.name = 'EvaluationError'; this.code = code; } }
export class Parser {
  constructor(tokens, scope = {}, angleMode = 'RAD') { this.tokens = addImplicitMultiplication(tokens); this.scope = scope; this.position = 0; this.angleMode = normalizeAngleMode(angleMode); }
  peek(type) { return this.tokens[this.position]?.type === type; }
  consume(type) { if (!this.peek(type)) throw new EvaluationError(`Expected ${type}`, 'EXPECTED_TOKEN'); return this.tokens[this.position++]; }
  parse() { const value = this.parseAdditive(); if (this.position !== this.tokens.length) throw new EvaluationError('Unexpected token in expression', 'UNEXPECTED_TOKEN'); return value; }
  parseAdditive() { let value = this.parseMultiplicative(); while (this.peek('+') || this.peek('-')) { const op = this.tokens[this.position++].type, right = this.parseMultiplicative(); value = op === '+' ? value + right : value - right; } return this.checkFinite(value); }
  parseMultiplicative() { let value = this.parsePower(); while (this.peek('*') || this.peek('/') || (this.peek('%') && isValueStart(this.tokens[this.position + 1]))) { const op = this.tokens[this.position++].type, right = this.parsePower(); if (op === '*') value *= right; else if (op === '/') { if (right === 0) throw new EvaluationError('Division by zero', 'DIVISION_BY_ZERO'); value /= right; } else { if (right === 0) throw new EvaluationError('Modulo by zero', 'DIVISION_BY_ZERO'); value %= right; } value = this.checkFinite(value); } return value; }
  parsePower() { let value = this.parseUnary(); if (this.peek('^')) { this.position++; value = this.checkFinite(value ** this.parsePower(), 'Invalid power operation', 'INVALID_POWER'); } return value; }
  parseUnary() { if (this.peek('+')) { this.position++; return +this.parseUnary(); } if (this.peek('-')) { this.position++; return -this.parseUnary(); } return this.parsePostfix(); }
  parsePostfix() { let value = this.parsePrimary(); while (this.peek('%') && !isValueStart(this.tokens[this.position + 1])) { this.position++; value /= 100; } return this.checkFinite(value); }
  parsePrimary() {
    if (this.peek('number')) return this.consume('number').value;
    if (this.peek('(')) { this.position++; const value = this.parseAdditive(); this.consume(')'); return value; }
    if (this.peek('identifier')) {
      const name = this.consume('identifier').value;
      if (this.peek('(')) {
        this.position++; const args = []; if (!this.peek(')')) { args.push(this.parseAdditive()); while (this.peek(',')) { this.position++; args.push(this.parseAdditive()); } } this.consume(')');
        const fn = FUNCTIONS[name]; if (!fn) throw new EvaluationError(`Unknown function "${name}"`, 'UNKNOWN_FUNCTION');
        const multi = ['min','max','sum','product','mean','gcd','lcm'].includes(name);
        const expected = name === 'atan2' ? 2 : 1;
        if ((multi && args.length < 1) || (!multi && args.length !== expected)) throw new EvaluationError(`Invalid argument count for ${name}`, 'ARGUMENT_COUNT');
        return this.checkFinite(applyFunction(name, fn, args, this.angleMode), `Invalid result from ${name}`, 'INVALID_FUNCTION_RESULT');
      }
      if (Object.hasOwn(CONSTANTS, name)) return CONSTANTS[name];
      if (Object.hasOwn(this.scope, name)) { const value = Number(this.scope[name]); if (!Number.isFinite(value)) throw new EvaluationError(`Variable "${name}" is not finite`, 'INVALID_VARIABLE'); return value; }
      throw new EvaluationError(`Unknown identifier "${name}"`, 'UNKNOWN_IDENTIFIER');
    }
    throw new EvaluationError('Expected a number, variable, function, or parenthesized expression', 'EXPECTED_VALUE');
  }
  checkFinite(value, message = 'Result is outside the supported number range', code = 'NON_FINITE_RESULT') { if (!Number.isFinite(value)) throw new EvaluationError(message, code); return value; }
}
export function normalizeAngleMode(mode = 'RAD') { const normalized = String(mode).toUpperCase(); if (!['DEG','RAD','GRAD'].includes(normalized)) throw new Error('Angle mode must be DEG, RAD, or GRAD'); return normalized; }
export function toRadians(value, mode = 'RAD') { const m = normalizeAngleMode(mode); return m === 'DEG' ? value * Math.PI / 180 : m === 'GRAD' ? value * Math.PI / 200 : value; }
export function fromRadians(value, mode = 'RAD') { const m = normalizeAngleMode(mode); return m === 'DEG' ? value * 180 / Math.PI : m === 'GRAD' ? value * 200 / Math.PI : value; }
function applyFunction(name, fn, args, mode) {
  if (['sin','cos','tan','sec','csc','cot'].includes(name)) return fn(toRadians(args[0], mode));
  if (['asin','acos','atan','asec','acsc','acot'].includes(name)) return fromRadians(fn(args[0]), mode);
  if (name === 'atan2') return fromRadians(fn(args[0], args[1]), mode);
  if (name === 'sqrt' && args[0] < 0) throw new EvaluationError('Square root requires a non-negative value', 'DOMAIN_ERROR');
  if (name === 'acosh' && args[0] < 1) throw new EvaluationError('acosh requires a value of at least 1', 'DOMAIN_ERROR');
  if (['log','ln','log2','log1p'].includes(name) && args[0] <= 0 && name !== 'log1p') throw new EvaluationError(`${name} requires a valid positive domain`, 'DOMAIN_ERROR');
  return ['min','max','sum','product','mean','gcd','lcm'].includes(name) ? fn(...args) : fn(args[0]);
}
export function evaluate(expression, scope = {}, options = {}) { if (!scope || typeof scope !== 'object' || Array.isArray(scope)) throw new Error('Scope must be an object'); const result = new Parser(tokenize(expression), scope, options.angleMode ?? 'RAD').parse(); if (typeof result !== 'number' || !Number.isFinite(result)) throw new EvaluationError('Result is not a finite number', 'NON_FINITE_RESULT'); return result; }
function gcd(a,b){a=Math.abs(Math.trunc(a));b=Math.abs(Math.trunc(b));while(b)[a,b]=[b,a%b];return a||1;}
function lcm(a,b){a=Math.trunc(a);b=Math.trunc(b);if(!a||!b)return 0;return Math.abs(a*b)/gcd(a,b);}
export class Fraction { constructor(numerator,denominator=1){if(!Number.isInteger(numerator)||!Number.isInteger(denominator)||denominator===0)throw new Error('Fraction requires integer numerator and non-zero denominator');const sign=denominator<0?-1:1,divisor=gcd(numerator,denominator);this.numerator=sign*numerator/divisor;this.denominator=sign*denominator/divisor;Object.freeze(this);} add(o){return new Fraction(this.numerator*o.denominator+o.numerator*this.denominator,this.denominator*o.denominator);} subtract(o){return new Fraction(this.numerator*o.denominator-o.numerator*this.denominator,this.denominator*o.denominator);} multiply(o){return new Fraction(this.numerator*o.numerator,this.denominator*o.denominator);} divide(o){if(o.numerator===0)throw new EvaluationError('Division by zero','DIVISION_BY_ZERO');return new Fraction(this.numerator*o.denominator,this.denominator*o.numerator);} modulo(o){if(o.numerator===0)throw new EvaluationError('Modulo by zero','DIVISION_BY_ZERO');return new Fraction((this.numerator*o.denominator)%(o.numerator*this.denominator),this.denominator*o.denominator);} pow(exponent){if(!Number.isInteger(exponent))throw new Error('Exact powers require an integer exponent');if(exponent<0){if(this.numerator===0)throw new EvaluationError('Division by zero','DIVISION_BY_ZERO');return new Fraction(this.denominator**-exponent,this.numerator**-exponent);}return new Fraction(this.numerator**exponent,this.denominator**exponent);} valueOf(){return this.numerator/this.denominator;} toString(){return this.denominator===1?String(this.numerator):`${this.numerator}/${this.denominator}`;} }
function decimalToFraction(value){if(!Number.isFinite(value))throw new Error('Invalid exact number');const text=String(value);if(text.includes('e')){const [coefficient,exponentText]=text.split('e'),exponent=Number(exponentText),base=decimalToFraction(Number(coefficient));return exponent>=0?base.multiply(new Fraction(10**exponent)):base.divide(new Fraction(10**-exponent));}const [whole,fraction='']=text.split('.');return new Fraction(Number(`${whole||'0'}${fraction}`),10**fraction.length);}
export function evaluateExact(expression,scope={}){return new ExactParser(tokenize(expression),scope).parse();}
class ExactParser extends Parser { parseAdditive(){let value=this.parseMultiplicative();while(this.peek('+')||this.peek('-')){const op=this.tokens[this.position++].type,right=this.parseMultiplicative();value=op==='+'?value.add(right):value.subtract(right);}return value;} parseMultiplicative(){let value=this.parsePower();while(this.peek('*')||this.peek('/')||(this.peek('%')&&isValueStart(this.tokens[this.position+1]))){const op=this.tokens[this.position++].type,right=this.parsePower();if(op==='*')value=value.multiply(right);else if(op==='/')value=value.divide(right);else value=value.modulo(right);}return value;} parsePower(){let value=this.parseUnary();if(this.peek('^')){this.position++;const exponent=this.parsePower();if(exponent.denominator!==1)throw new Error('Exact powers require an integer exponent');value=value.pow(exponent.numerator);}return value;} parseUnary(){if(this.peek('+')){this.position++;return this.parseUnary();}if(this.peek('-')){this.position++;return new Fraction(0).subtract(this.parseUnary());}return this.parsePostfix();} parsePostfix(){let value=this.parsePrimary();while(this.peek('%')&&!isValueStart(this.tokens[this.position+1])){this.position++;value=value.divide(new Fraction(100));}return value;} parsePrimary(){if(this.peek('number'))return decimalToFraction(this.consume('number').value);if(this.peek('(')){this.position++;const value=this.parseAdditive();this.consume(')');return value;}if(this.peek('identifier')){const name=this.consume('identifier').value;if(this.peek('('))throw new Error('Exact mode does not support functions');if(Object.hasOwn(CONSTANTS,name))throw new Error('Exact mode does not approximate irrational constants');if(!Object.hasOwn(this.scope,name))throw new Error(`Unknown identifier "${name}"`);return decimalToFraction(Number(this.scope[name]));}throw new Error('Expected an exact numeric value');} }
export function factorial(value){const n=Number(value);if(!Number.isInteger(n)||n<0||n>170)throw new Error('Factorial requires an integer from 0 to 170');let result=1;for(let i=2;i<=n;i++)result*=i;return result;}
export function percentage(value,percent){return Number(value)*Number(percent)/100;}
export function convertTemperature(value,from,to){const n=Number(value);if(!Number.isFinite(n))throw new Error('Temperature value must be finite');if(!['C','F','K'].includes(from)||!['C','F','K'].includes(to))throw new Error('Temperature unit must be C, F, or K');const celsius=from==='C'?n:from==='F'?(n-32)*5/9:n-273.15;return to==='C'?celsius:to==='F'?celsius*9/5+32:celsius+273.15;}
export function absolute(value){const n=Number(value);if(!Number.isFinite(n))throw new EvaluationError('Value is not finite','NON_FINITE_RESULT');return Math.abs(n);}
export function minimum(...values){if(!values.length)throw new EvaluationError('Minimum requires at least one value','ARGUMENT_COUNT');return Math.min(...values.map(Number));}
export function maximum(...values){if(!values.length)throw new EvaluationError('Maximum requires at least one value','ARGUMENT_COUNT');return Math.max(...values.map(Number));}
export function average(...values){if(!values.length)throw new EvaluationError('Average requires at least one value','ARGUMENT_COUNT');return values.reduce((sum,value)=>sum+Number(value),0)/values.length;}
export function mean(...values){return average(...values);}
export function sum(...values){return values.reduce((sum,value)=>sum+Number(value),0);}
export function product(...values){return values.reduce((result,value)=>result*Number(value),1);}
export function clamp(value,min,max){const v=Number(value),lo=Number(min),hi=Number(max);if([v,lo,hi].some(n=>!Number.isFinite(n)))throw new EvaluationError('Clamp values must be finite','NON_FINITE_RESULT');if(lo>hi)throw new EvaluationError('Minimum cannot exceed maximum','INVALID_RANGE');return Math.min(hi,Math.max(lo,v));}
export function reciprocal(value){const n=Number(value);if(!Number.isFinite(n))throw new EvaluationError('Value is not finite','NON_FINITE_RESULT');if(n===0)throw new EvaluationError('Cannot take reciprocal of zero','DIVISION_BY_ZERO');return 1/n;}
export function square(value){return Number(value)**2;}
export function cube(value){return Number(value)**3;}
export function cubeRoot(value){return Math.cbrt(Number(value));}
export function greatestCommonDivisor(a,b){return gcd(a,b);}
export function leastCommonMultiple(a,b){return lcm(a,b);}
export function combinations(n,r){n=Math.trunc(n);r=Math.trunc(r);if(n<0||r<0||r>n)throw new EvaluationError('Invalid combination range','INVALID_RANGE');r=Math.min(r,n-r);let result=1;for(let i=1;i<=r;i++)result=result*(n-r+i)/i;return result;}
export function permutations(n,r){n=Math.trunc(n);r=Math.trunc(r);if(n<0||r<0||r>n)throw new EvaluationError('Invalid permutation range','INVALID_RANGE');let result=1;for(let i=0;i<r;i++)result*=n-i;return result;}
export function median(...values){if(!values.length)throw new EvaluationError('Median requires at least one value','ARGUMENT_COUNT');const sorted=values.map(Number).sort((a,b)=>a-b),mid=Math.floor(sorted.length/2);return sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;}
export function variance(...values){if(!values.length)throw new EvaluationError('Variance requires at least one value','ARGUMENT_COUNT');const m=average(...values);return average(...values.map(v=>(Number(v)-m)**2));}
export function standardDeviation(...values){return Math.sqrt(variance(...values));}
export function range(...values){if(!values.length)throw new EvaluationError('Range requires at least one value','ARGUMENT_COUNT');return maximum(...values)-minimum(...values);}
export const constants=CONSTANTS;
