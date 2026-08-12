import fs from 'node:fs';
import { evaluate } from '../packages/calculator-core/index.js';

const vectors = JSON.parse(fs.readFileSync(new URL('./vectors.json', import.meta.url), 'utf8'));
const expressions = {
  add: (a, b) => `${a}+${b}`,
  subtract: (a, b) => `${a}-${b}`,
  multiply: (a, b) => `${a}*${b}`,
  divide: (a, b) => `${a}/${b}`,
};

for (const test of vectors) {
  const buildExpression = expressions[test.operation];
  if (!buildExpression) throw new Error(`Unknown conformance operation: ${test.operation}`);
  const actual = evaluate(buildExpression(test.a, test.b));
  if (Math.abs(actual - test.expected) > 1e-12) {
    throw new Error(`JavaScript mismatch: ${JSON.stringify(test)} -> ${actual}`);
  }
}

console.log(`JavaScript conformance passed: ${vectors.length} cases`);
