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
