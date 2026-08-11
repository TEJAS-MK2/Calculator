import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, evaluateExact, Fraction, factorial, percentage, convertTemperature } from './index.js';

test('respects arithmetic precedence', () => assert.equal(evaluate('2 + 3 * 4'), 14));
test('supports nested parentheses', () => assert.equal(evaluate('(2 + 3) * (4 - 1)'), 15));
test('supports implicit multiplication', () => assert.equal(evaluate('2(5 + 3) + 4^2'), 32));
test('supports scientific expressions', () => assert.ok(Math.abs(evaluate('sin(pi / 2)^2 + cos(pi / 2)^2') - 1) < 1e-12));
test('supports variables and constants', () => assert.equal(evaluate('2*x + pi - pi', { x: 5 }), 10));
test('supports unary operators and percentages', () => assert.equal(evaluate('-50 + 20% * 250'), 0));
test('calculates factorial', () => assert.equal(factorial(5), 120));
test('calculates percentage', () => assert.equal(percentage(250, 20), 50));
test('converts temperature', () => assert.equal(convertTemperature(100, 'C', 'F'), 212));
test('returns exact fractions', () => assert.equal(evaluateExact('1 / 3 + 1 / 6').toString(), '1/2'));
test('supports exact powers', () => assert.equal(evaluateExact('(2 / 3)^2').toString(), '4/9'));
test('normalizes fractions', () => assert.deepEqual(new Fraction(2, 4), new Fraction(1, 2)));
test('rejects division by zero', () => assert.throws(() => evaluate('10 / (5 - 5)'), /Division by zero/));
test('rejects unknown identifiers', () => assert.throws(() => evaluate('unknown + 1'), /Unknown identifier/));
test('rejects invalid characters', () => assert.throws(() => evaluate('2 @ 3'), /Invalid character/));
