# @tejas-mk2/calculator-core

A **lightweight, dependency-free JavaScript calculation engine** with a safe expression parser for web apps, Node.js tools, and other JavaScript projects.

## Current release

**v0.3.1 — Phase 2 scientific calculation engine**

The package powers the expression-evaluation layer of the Modern Calculator while remaining independently reusable.

## Features

- Operator precedence and nested parentheses
- Implicit multiplication: `2(5 + 3)`, `3pi`, `2sin(pi / 2)`
- Unary `+` and `-`
- Powers, percentages, and modulo
- Variables through a scope object
- Scientific notation such as `1.5e2`
- Constants: `pi`, `e`, `tau`, and `phi`
- Scientific functions: trigonometry, logarithms, roots, rounding, and exponentials
- DEG, RAD, and GRAD angle modes
- Exact rational arithmetic with `Fraction` and `evaluateExact()`
- Explicit division-by-zero, domain, and invalid-expression errors
- Typed `EvaluationError` instances with error codes
- No `eval()` or `Function()` constructor
- Zero runtime dependencies
- Framework-free and DOM-independent
- ES module support

## Installation from GitHub Packages

Configure npm authentication for the GitHub Packages npm registry and the `@tejas-mk2` scope, then install:

```bash
npm install @tejas-mk2/calculator-core
```

Registry:

```text
https://npm.pkg.github.com
```

For a project-level `.npmrc`:

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
console.log(evaluate('2(5 + 3) + 4^2')); // 80
console.log(evaluate('10 % 3')); // 1
console.log(evaluate('1.5e2 + 2.5e1')); // 175
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluate('sin(pi / 2)^2 + cos(pi / 2)^2')); // 1
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

`%` is modulo in binary form:

```text
10 % 3       → 1
```

A postfix percentage is also supported:

```text
50%          → 0.5
```

### Grouping and precedence

```text
(2 + 3) * 4
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

### Angle Modes

```js
evaluate('sin(90)', {}, { angleMode: 'DEG' });
evaluate('sin(pi / 2)', {}, { angleMode: 'RAD' });
evaluate('sin(100)', {}, { angleMode: 'GRAD' });
```

### Scientific Functions

```text
sin  cos  tan
asin acos atan
sqrt abs
floor ceil round
log ln exp
```

## Exact Mode

`evaluate()` returns JavaScript numbers. For supported rational expressions, `evaluateExact()` preserves exact values:

```js
const result = evaluateExact('1 / 3 + 1 / 6');
console.log(result.toString()); // 1/2
```

Exact mode supports rational arithmetic and modulo but intentionally does not approximate irrational constants or scientific functions.

## API

### `evaluate(expression, scope?, options?)`

Evaluates an expression using a tokenizer and recursive-descent parser. `options.angleMode` accepts `RAD`, `DEG`, or `GRAD`.

### `evaluateExact(expression, scope?)`

Evaluates supported arithmetic using exact rational values and returns a `Fraction`.

### `Fraction(numerator, denominator?)`

Creates a normalized immutable rational number with `add`, `subtract`, `multiply`, `divide`, `pow`, `valueOf`, and `toString` operations.

### `factorial(n)`

Calculates the factorial of an integer from `0` through `170`.

### `percentage(value, percent)`

Calculates a percentage of a value.

### `convertTemperature(value, from, to)`

Converts between `C`, `F`, and `K`.

### `constants`

Exports the numeric values of `pi`, `e`, `tau`, and `phi`.

### `EvaluationError`

Typed evaluation error with a machine-readable `code` such as `DIVISION_BY_ZERO`, `DOMAIN_ERROR`, or `UNKNOWN_IDENTIFIER`.

## Error Handling

Invalid expressions are rejected rather than silently producing incorrect values.

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

## Development and Testing

```bash
npm test
npm pack --dry-run
```

Tests cover precedence, implicit multiplication, scientific notation, angle modes, variables, percentages, modulo, exact fractions, and error handling.

## Package Information

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| Version | `0.3.1` |
| Registry | GitHub Packages npm registry |
| Runtime dependencies | None |
| Module format | ES module |
| License | MIT |

## License

MIT
