# @tejas-mk2/calculator-core

An advanced, dependency-free JavaScript/ESM calculation engine for Node.js, browsers, PWAs, and serious reusable math tooling.

## Extreme engine

The npm engine is the reference implementation and the most advanced engine in the project.

### Expression parser

- Recursive-descent parser with operator precedence
- Parentheses and unary operators
- Implicit multiplication: `2pi`, `3(4+5)`, `2sin(pi/2)`
- Scientific notation
- Binary modulo and postfix percentage
- Controlled variables/scope
- Typed `EvaluationError` codes
- No `eval()` or `Function()` constructor

### Mathematical functions

- Trigonometry: `sin`, `cos`, `tan`, `sec`, `csc`, `cot`
- Inverse trigonometry: `asin`, `acos`, `atan`, `asec`, `acsc`, `acot`, `atan2`
- Hyperbolic: `sinh`, `cosh`, `tanh`, `asinh`, `acosh`, `atanh`
- Roots: `sqrt`, `cbrt`
- Rounding: `floor`, `ceil`, `round`, `trunc`, `sign`
- Logs: `log`, `ln`, `log2`, `log1p`
- Exponentials: `exp`, `expm1`
- `hypot`
- Aggregation: `min`, `max`, `sum`, `product`, `mean`
- GCD and LCM

### Exact and advanced utilities

- Immutable exact `Fraction` arithmetic
- `evaluateExact()` for rational expressions
- Factorial
- Combinations and permutations
- Median, variance, standard deviation, range
- Clamp, reciprocal, square, cube, cube root
- Temperature conversion
- Mathematical constants: `pi`, `e`, `tau`, `phi`, `sqrt2`, `ln2`, `ln10`
- DEG, RAD, and GRAD angle modes
- Explicit domain, range, overflow, and division-by-zero checks
- Zero runtime dependencies

## Installation

```bash
npm install @tejas-mk2/calculator-core
```

GitHub Packages:

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

## Examples

```js
import { evaluate, evaluateExact, median, standardDeviation } from '@tejas-mk2/calculator-core';

console.log(evaluate('2(3 + 4)^2')); // 98
console.log(evaluate('sin(90) + sqrt(144)', {}, { angleMode: 'DEG' })); // 13
console.log(evaluate('hypot(3, 4, 12)')); // 13
console.log(evaluate('gcd(84, 30)')); // 6
console.log(evaluate('combinations(10, 3)')); // 120
console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(median(9, 2, 7, 4, 5)); // 5
console.log(standardDeviation(2, 4, 6));
```

## Exact arithmetic

```js
const exact = evaluateExact('(2 / 3) + (5 / 6)');
console.log(exact.toString()); // 3/2
```

Exact mode never silently approximates irrational constants or unsupported functions.

## Error handling

```js
try {
  evaluate('1 / 0');
} catch (error) {
  console.log(error.code); // DIVISION_BY_ZERO
}
```

## API

| API | Purpose |
|---|---|
| `evaluate()` | Full expression evaluation |
| `evaluateExact()` | Exact rational evaluation |
| `Fraction` | Immutable rational arithmetic |
| `factorial()` | Integer factorial |
| `percentage()` | Percentage calculation |
| `convertTemperature()` | C/F/K conversion |
| `median()` / `variance()` / `standardDeviation()` | Statistics |
| `combinations()` / `permutations()` | Combinatorics |
| `constants` | Mathematical constants |
| `EvaluationError` | Typed calculation errors |

## Development

```bash
npm test
npm pack --dry-run
```

Add regression tests for parser precedence, exact arithmetic, domains, overflow, edge cases, and every public function before publishing.

## Package information

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| npm | `https://www.npmjs.com/package/@tejas-mk2/calculator-core` |
| GitHub Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| Runtime dependencies | None |
| Module format | ES module |
| License | MIT |

## License

MIT
