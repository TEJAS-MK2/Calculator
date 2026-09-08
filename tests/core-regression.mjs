import assert from 'node:assert/strict';
import { evaluate } from '../packages/calculator-core/index.js';
import { evaluateExact } from '../packages/calculator-core/exact.js';

const cases = [
  ['-2^2', -4], ['(-2)^2', 4], ['2^-2', 0.25], ['2^3^2', 512],
  ['2(3+4)', 14], ['2pi', 2 * Math.PI], ['50%', 0.5], ['10%2', 0],
  ['1e3 + .5', 1000.5], ['sin(30)', Math.sin(30)],
];
for (const [expression, expected] of cases) assert.ok(Math.abs(evaluate(expression) - expected) < 1e-12, `${expression} failed`);
assert.throws(() => evaluate('1/0'), /Division by zero/);
assert.throws(() => evaluate('sqrt(-1)'), /non-negative/);
assert.throws(() => evaluate('log(0)'), /positive domain/);
assert.throws(() => evaluate('1..2'), /Invalid number/);
assert.throws(() => evaluate('1e999'), /supported range/);
assert.equal(evaluateExact('-2^2').toString(), '-4');
assert.equal(evaluateExact('(-2)^2').toString(), '4');
assert.equal(evaluateExact('1/3 + 1/6').toString(), '1/2');
assert.equal(evaluateExact('0.1 + 0.2').toString(), '3/10');
assert.equal(evaluateExact('9007199254740993 + 1').toString(), '9007199254740994');
assert.equal(evaluateExact('50%').toString(), '1/2');
assert.equal(evaluateExact('10%2').toString(), '0');
console.log('Calculator core regression tests passed.');
