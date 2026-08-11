# @tejas-mk2/calculator-core

A dependency-free JavaScript calculation engine for Node.js, browser applications, and reusable math tooling.

## Engine

The current engine supports both simple arithmetic and advanced expression evaluation.

### Core operations

- Addition, subtraction, multiplication, division
- Modulo
- Powers
- Percentages
- Absolute value, min/max, average, clamp, reciprocal, square, and cube helpers

### Expression engine

- Operator precedence and nested parentheses
- Implicit multiplication
- Unary `+` and `-`
- Scientific notation
- Variables
- `pi`, `e`, `tau`, and `phi`
- Trigonometric and inverse trigonometric functions
- `sqrt`, `abs`, `floor`, `ceil`, `round`, `log`, `ln`, and `exp`
- DEG, RAD, and GRAD angle modes
- Exact rational arithmetic with `Fraction`
- `evaluateExact()` for supported exact expressions
- Factorial and temperature conversion helpers
- Typed `EvaluationError` instances
- Explicit division-by-zero and domain validation
- No `eval()` or `Function()` constructor
- Zero runtime dependencies

## Installation

```bash
npm install @tejas-mk2/calculator-core
```

GitHub Packages is also supported:

```text
@tejas-mk2:registry=https://npm.pkg.github.com
```

## Usage

```js
import {
  evaluate,
  evaluateExact,
  percentage,
  Fraction,
  factorial,
  convertTemperature
} from '@tejas-mk2/calculator-core';

console.log(evaluate('(25 + 5) * 2')); // 60
console.log(evaluate('10 % 3')); // 1
console.log(evaluate('2^8')); // 256
console.log(evaluate('20%')); // 0.2
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluate('x^2 + 1', { x: 5 })); // 26
console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(percentage(250, 20)); // 50
console.log(factorial(5)); // 120
console.log(convertTemperature(100, 'C', 'F')); // 212
```

## Expression syntax

```text
+  -  *  /  %  ^  ( )  ,
```

Binary `%` performs modulo. Postfix `%` converts a value to a decimal percentage.

### Variables

```js
evaluate('2*x + y', { x: 5, y: 3 }); // 13
```

### Angle modes

```js
evaluate('sin(90)', {}, { angleMode: 'DEG' });
evaluate('sin(pi / 2)', {}, { angleMode: 'RAD' });
evaluate('sin(100)', {}, { angleMode: 'GRAD' });
```

## Exact arithmetic

```js
const result = evaluateExact('1 / 3 + 1 / 6');
console.log(result.toString()); // 1/2
```

## Error handling

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
| `evaluate()` | Numeric expression evaluation |
| `evaluateExact()` | Exact rational expression evaluation |
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

Add regression tests for every parser rule and mathematical operation.

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
