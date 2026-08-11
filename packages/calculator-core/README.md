# @tejas-mk2/calculator-core

A **safe, dependency-free JavaScript expression engine** for calculator applications, scientific tools, and Node.js projects.

## Current release

**v0.3.2 — Phase 2 scientific calculation engine**

## Why use it?

`@tejas-mk2/calculator-core` provides deterministic expression evaluation without a DOM dependency or dynamic JavaScript execution. It is designed to be reusable outside the Modern Calculator web application.

## Features

- Operator precedence and nested parentheses
- Implicit multiplication such as `2(5 + 3)` and `3pi`
- Unary `+` and `-`
- Powers, percentages, and modulo
- Variables through a scope object
- Scientific notation
- `pi`, `e`, `tau`, and `phi` constants
- Trigonometric and scientific functions
- DEG, RAD, and GRAD angle modes
- Exact rational arithmetic with `Fraction`
- `evaluateExact()` for supported exact expressions
- Typed `EvaluationError` instances with machine-readable codes
- Explicit division-by-zero and domain validation
- No `eval()` or `Function()` constructor
- Zero runtime dependencies
- Framework- and DOM-independent ES module

## Installation

The package is published to GitHub Packages:

```bash
npm install @tejas-mk2/calculator-core
```

Configure the GitHub Packages npm registry for the `@tejas-mk2` scope:

```text
@tejas-mk2:registry=https://npm.pkg.github.com
```

## Usage

```js
import {
  evaluate,
  evaluateExact,
  factorial,
  percentage,
  Fraction,
  convertTemperature
} from '@tejas-mk2/calculator-core';

console.log(evaluate('(25 + 5) * 2')); // 60
console.log(evaluate('10 % 3')); // 1
console.log(evaluate('1.5e2 + 2.5e1')); // 175
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluate('x^2 + 1', { x: 5 })); // 26
console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(new Fraction(2, 3).multiply(new Fraction(3, 4)).toString()); // 1/2
console.log(factorial(5)); // 120
console.log(percentage(250, 20)); // 50
console.log(convertTemperature(100, 'C', 'F')); // 212
```

## Expression Syntax

### Operators

```text
+  -  *  /  %  ^
```

Binary `%` performs modulo:

```text
10 % 3  →  1
```

Postfix `%` converts a value to a decimal percentage:

```text
50%  →  0.5
```

### Implicit multiplication

```text
2(5 + 3)
3pi
2sin(pi / 2)
```

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

### Scientific functions

```text
sin cos tan
asin acos atan
sqrt abs
floor ceil round
log ln exp
```

## Exact arithmetic

For supported rational expressions, `evaluateExact()` preserves the exact fraction instead of returning a floating-point approximation:

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

Common error codes include `DIVISION_BY_ZERO`, `DOMAIN_ERROR`, `UNKNOWN_IDENTIFIER`, `UNKNOWN_FUNCTION`, and `EXPECTED_VALUE`.

## API

| API | Purpose |
|---|---|
| `evaluate()` | Floating-point expression evaluation |
| `evaluateExact()` | Exact rational expression evaluation |
| `Fraction` | Immutable normalized rational values |
| `factorial()` | Integer factorial from 0 through 170 |
| `percentage()` | Percentage calculation |
| `convertTemperature()` | C/F/K conversion |
| `constants` | `pi`, `e`, `tau`, `phi` |
| `EvaluationError` | Typed calculation errors |

## Development

```bash
npm test
npm pack --dry-run
```

Tests cover precedence, scientific notation, implicit multiplication, variables, angle modes, percentages, modulo, exact fractions, and error handling.

## Package information

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| Version | `0.3.2` |
| Registry | GitHub Packages npm registry |
| Runtime dependencies | None |
| Module format | ES module |
| License | MIT |

## License

MIT
