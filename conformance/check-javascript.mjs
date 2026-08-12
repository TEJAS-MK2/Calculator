import fs from 'node:fs';
import { add, subtract, multiply, divide } from '../packages/calculator-core/index.js';

const vectors = JSON.parse(fs.readFileSync(new URL('./vectors.json', import.meta.url), 'utf8'));
const ops = { add, subtract, multiply, divide };
for (const test of vectors) {
  const actual = ops[test.operation](test.a, test.b);
  if (Math.abs(actual - test.expected) > 1e-12) throw new Error(`JavaScript mismatch: ${JSON.stringify(test)} -> ${actual}`);
}
console.log(`JavaScript conformance passed: ${vectors.length} cases`);
