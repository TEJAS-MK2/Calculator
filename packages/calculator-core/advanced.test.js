import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mean, median, variance, standardDeviation, correlation,
  combinations, permutations, gcd, lcm, isPrime, primeFactors,
  solveQuadratic, newtonRaphson, bisection, integrateSimpson,
  derivative, matrixAdd, matrixMultiply, determinant, transpose,
  geometricMean, harmonicMean, clamp, remap
} from './advanced.js';

test('advanced statistics', () => {
  assert.equal(mean([2, 4, 6]), 4);
  assert.equal(median([9, 1, 4]), 4);
  assert.equal(variance([2, 4, 6]), 8 / 3);
  assert.equal(standardDeviation([2, 4, 6]) > 1.63, true);
  assert.equal(correlation([1, 2, 3], [1, 2, 3]), 1);
  assert.equal(geometricMean([1, 4, 16]), 4);
  assert.equal(harmonicMean([1, 2]), 4 / 3);
});

test('number theory and combinatorics', () => {
  assert.equal(combinations(10, 3), 120);
  assert.equal(permutations(10, 3), 720);
  assert.equal(gcd(84, 30), 6);
  assert.equal(lcm(12, 18), 36);
  assert.equal(isPrime(97), true);
  assert.deepEqual(primeFactors(84), [2, 2, 3, 7]);
});

test('numerical solvers', () => {
  assert.deepEqual(solveQuadratic(1, -3, 2).roots, [1, 2]);
  assert.equal(newtonRaphson(x => x * x - 2, x => 2 * x, 1).converged, true);
  assert.equal(Math.abs(bisection(x => x * x - 2, 1, 2).root - Math.sqrt(2)) < 1e-10, true);
  assert.equal(Math.abs(integrateSimpson(Math.sin, 0, Math.PI, 1000) - 2) < 1e-9, true);
  assert.equal(Math.abs(derivative(x => x * x, 3) - 6) < 1e-6, true);
});

test('matrix operations', () => {
  assert.deepEqual(matrixAdd([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[6, 8], [10, 12]]);
  assert.deepEqual(matrixMultiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
  assert.deepEqual(transpose([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]);
  assert.equal(determinant([[1, 2], [3, 4]]), -2);
});

test('numeric mapping utilities', () => {
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(remap(5, 0, 10, 0, 100), 50);
});
