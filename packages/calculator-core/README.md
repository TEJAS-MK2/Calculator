# @tejas-mk2/calculator-core

Advanced, dependency-free JavaScript/ESM calculation engine for Node.js, browsers, PWAs, and reusable math tooling.

## Engine capabilities

The npm package is the most feature-rich engine in this project.

### Expression engine

- Recursive-descent parser
- Operator precedence
- Parentheses and unary operators
- Implicit multiplication
- Scientific notation
- Binary modulo and postfix percentage syntax
- Variables through a controlled scope object
- Mathematical constants: `pi`, `e`, `tau`, `phi`
- DEG, RAD, and GRAD angle modes
- No `eval()` or `Function()` constructor

### Functions

- `sin`, `cos`, `tan`
- `asin`, `acos`, `atan`
- `sqrt`, `abs`, `floor`, `ceil`, `round`
- `log`, `ln`, `exp`

### Exact and mathematical utilities

- Immutable `Fraction` arithmetic
- `evaluateExact()` for supported exact rational expressions
- Factorial
- Temperature conversion
- Percentage
- Absolute value
- Minimum / maximum
- Average
- Clamp
- Reciprocal
- Square / cube
- Typed `EvaluationError` codes
- Explicit domain and division-by-zero validation
- Zero runtime dependencies

## Installation

```bash
npm install @tejas-mk2/calculator-core
```

GitHub Packages:

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

## Usage

```js
import {
  evaluate,
  evaluateExact,
  percentage,
  factorial,
  Fraction,
  convertTemperature
} from '@tejas-mk2/calculator-core';

console.log(evaluate('(25 + 5) * 2')); // 60
console.log(evaluate('2^8')); // 256
console.log(evaluate('10 % 3')); // 1
console.log(evaluate('20%')); // 0.2
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluate('x^2 + 1', { x: 5 })); // 26
console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(percentage(250, 20)); // 50
console.log(factorial(5)); // 120
console.log(convertTemperature(100, 'C', 'F')); // 212
```

## Exact arithmetic

```js
const result = evaluateExact('1 / 3 + 1 / 6');
console.log(result.toString()); // 1/2
```

Exact mode intentionally rejects unsupported irrational constants and functions rather than silently approximating them.

## Errors

```js
import { evaluate, EvaluationError } from '@tejas-mk2/calculator-core';

try {
  evaluate('1 / 0');
} catch (error) {
  if (error instanceof EvaluationError) {
    console.log(error.code); // DIVISION_BY_ZERO
  }
}
```

## API

| API | Purpose |
|---|---|
| `evaluate()` | Advanced numeric expression evaluation |
| `evaluateExact()` | Exact rational evaluation |
| `Fraction` | Immutable rational values |
| `percentage()` | Percentage calculation |
| `factorial()` | Integer factorial |
| `convertTemperature()` | C/F/K conversion |
| `constants` | Mathematical constants |
| `EvaluationError` | Typed calculation errors |

## Development

```bash
npm test
npm pack --dry-run
```

Add regression tests for parser rules, domain errors, edge cases, and every public helper before publishing.

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
