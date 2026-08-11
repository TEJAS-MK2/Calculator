# @tejas-mk2/calculator-core

A **lightweight, dependency-free JavaScript calculation engine** with a safe expression parser for web apps, Node.js tools, and other JavaScript projects.

## What's new in 0.2.0

Phase 1 adds a stronger calculation engine:

- Operator precedence and nested parentheses
- Implicit multiplication such as `2(5 + 3)`
- Unary `+` and `-`
- Powers and percentages
- Variables through a scope object
- `π` and `e` constants
- Scientific functions
- Explicit division-by-zero and invalid-expression errors
- Exact rational arithmetic through `Fraction` and `evaluateExact`
- No use of `eval()` or the `Function()` constructor
- Zero runtime dependencies

## Installation

This package is published to **GitHub Packages**.

Configure npm to use the GitHub Packages registry for the `@tejas-mk2` scope, then install:

```bash
npm install @tejas-mk2/calculator-core
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
console.log(evaluate('2(5 + 3) + 4^2')); // 32
console.log(evaluate('sin(pi / 2)^2 + cos(pi / 2)^2')); // 1
console.log(evaluate('x^2 + 1', { x: 5 })); // 26

console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(new Fraction(2, 3).multiply(new Fraction(3, 4)).toString()); // 1/2

console.log(factorial(5)); // 120
console.log(percentage(250, 20)); // 50
console.log(convertTemperature(100, 'C', 'F')); // 212
```

## Expression syntax

Supported operators:

```text
+  -  *  /  %  ^
```

Grouping and precedence:

```text
(2 + 3) * 4
```

Implicit multiplication:

```text
2(5 + 3)
3pi
2sin(pi / 2)
```

Variables:

```js
evaluate('2*x + y', { x: 5, y: 3 });
```

Scientific functions include `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `sqrt`, `abs`, `floor`, `ceil`, `round`, `log`, `ln`, and `exp`.

## Exact mode

`evaluate()` returns JavaScript numbers. For rational arithmetic where you want to preserve fractions, use `evaluateExact()`:

```js
const result = evaluateExact('1 / 3 + 1 / 6');
console.log(result.toString()); // 1/2
```

Exact mode supports rational arithmetic and integer powers. It intentionally does not approximate irrational constants or scientific functions.

## API

### `evaluate(expression, scope?)`

Parses and evaluates an expression using a tokenizer and recursive-descent parser.

### `evaluateExact(expression, scope?)`

Evaluates supported arithmetic using exact rational values and returns a `Fraction`.

### `Fraction(numerator, denominator?)`

Creates a normalized immutable rational number with `add`, `subtract`, `multiply`, `divide`, `pow`, and `toString` methods.

### `factorial(n)`

Calculates the factorial of an integer from `0` through `170`.

### `percentage(value, percent)`

Calculates a percentage of a value.

### `convertTemperature(value, from, to)`

Converts between `C`, `F`, and `K`.

## Development

From the package directory:

```bash
npm test
npm pack --dry-run
```

## Package information

- **Package:** `@tejas-mk2/calculator-core`
- **Current version:** `0.2.0`
- **Registry:** GitHub Packages
- **Runtime dependencies:** None
- **License:** MIT

## License

MIT
