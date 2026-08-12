import test from 'node:test';
import assert from 'node:assert/strict';
import { ExactFraction, evaluateExact } from './exact.js';

test('exact arithmetic exceeds Number safe integer range', () => {
  assert.equal(evaluateExact('9007199254740993 + 1').toString(), '9007199254740994');
  assert.equal(evaluateExact('1 / 3 + 1 / 6').toString(), '1/2');
  assert.equal(evaluateExact('0.125 * 8').toString(), '1');
  assert.equal(evaluateExact('2^100').toString(), '1267650600228229401496703205376');
});

test('exact fraction rejects division by zero', () => {
  assert.throws(() => new ExactFraction(1n).divide(new ExactFraction(0n)), /Division by zero/);
});

test('exact exponentiation is resource-bounded', () => {
  assert.throws(() => evaluateExact('2^100001'), /Exact exponent must be between/);
  assert.equal(new ExactFraction(1n, 2n).toNumber(), 0.5);
});

test('exact parser rejects invalid characters instead of silently dropping them', () => {
  assert.throws(() => evaluateExact('1a'), /Invalid exact expression/);
  assert.throws(() => evaluateExact('1$2'), /Invalid character/);
  assert.throws(() => evaluateExact('2^^3'), /Expected exact number/);
  assert.throws(() => evaluateExact('unknown'), /Unknown identifier/);
});

test('exact parser consumes the complete expression', () => {
  assert.throws(() => evaluateExact('(1 + 2'), /Missing closing parenthesis/);
  assert.throws(() => evaluateExact('1 + 2)'), /Invalid exact expression/);
});

test('exact variables use the exact decimal representation', () => {
  assert.equal(evaluateExact('value + 1', { scope: { value: '9007199254740993' } }).toString(), '9007199254740994');
});
