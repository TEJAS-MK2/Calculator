import fs from 'node:fs';
import { evaluate } from '../packages/calculator-core/index.js';

const vectors = JSON.parse(fs.readFileSync(new URL('./vectors.json', import.meta.url), 'utf8'));
const tolerance = 1e-12;

for (const [index, vector] of vectors.entries()) {
  const expression = `${vector.a} ${vector.operation === 'add' ? '+' : vector.operation === 'subtract' ? '-' : vector.operation === 'multiply' ? '*' : '/'} ${vector.b}`;
  const actual = evaluate(expression);
  if (!Number.isFinite(actual) || Math.abs(actual - vector.expected) > tolerance) {
    throw new Error(`Vector ${index + 1} failed: ${expression} => ${actual}, expected ${vector.expected}`);
  }
}

console.log(`JavaScript conformance passed: ${vectors.length} vectors`);
