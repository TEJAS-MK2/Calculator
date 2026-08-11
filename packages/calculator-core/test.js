import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, factorial, percentage, convertTemperature } from './index.js';

test('evaluates arithmetic', () => assert.equal(evaluate('2 + 3 * 4'), 14));
test('evaluates scientific expressions', () => assert.ok(Math.abs(evaluate('sin(pi / 2)') - 1) < 1e-12));
test('supports variables', () => assert.equal(evaluate('x^2 + 1', { x: 5 }), 26));
test('calculates factorial', () => assert.equal(factorial(5), 120));
test('calculates percentage', () => assert.equal(percentage(250, 20), 50));
test('converts temperature', () => assert.equal(convertTemperature(100, 'C', 'F'), 212));
