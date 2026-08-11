# @tejas-mk2/calculator-core

**Advanced, dependency-free JavaScript/ESM calculation engine** for Node.js, browsers, PWAs, CLIs, and reusable math applications.

> This package is the **reference / extreme engine** of the Calculator project. The browser calculator intentionally exposes a smaller UI, while this package provides the full programmatic calculation API.

## What makes the npm engine advanced?

The engine is built around a tokenizer and recursive-descent parser instead of `eval()` or `Function()`. It supports operator precedence, right-associative powers, implicit multiplication, controlled variables, scientific notation, exact rational arithmetic, scientific functions, statistics, combinatorics, and typed calculation errors.

## Expression engine

Supported syntax includes:

```text
2 + 3 * 4
2(3 + 4)^2
2sin(pi / 2)
1.5e3 + 2.5e2
-(5 + 3)
50%
10 % 3
```

### Parser features

- Recursive-descent parsing
- Operator precedence
- Right-associative exponentiation
- Parentheses
- Unary `+` and `-`
- Implicit multiplication
- Scientific notation
- Binary modulo
- Postfix percentages
- Controlled variables / custom scopes
- Mathematical constants
- Strict tokenization and validation
- No `eval()`
- No `Function()` constructor

## Mathematical functions

### Trigonometry

- `sin`, `cos`, `tan`
- `sec`, `csc`, `cot`
- `asin`, `acos`, `atan`
- `asec`, `acsc`, `acot`
- `atan2`
- `sinh`, `cosh`, `tanh`
- `asinh`, `acosh`, `atanh`

### Roots, rounding, and logarithms

- `sqrt`, `cbrt`
- `abs`
- `floor`, `ceil`, `round`, `trunc`, `sign`
- `log`, `ln`, `log2`, `log1p`
- `exp`, `expm1`
- `hypot`

### Aggregation and statistics

- `min`
- `max`
- `sum`
- `product`
- `mean`
- Median
- Variance
- Standard deviation
- Range
- Approximate equality

### Number theory and combinatorics

- GCD
- LCM
- Factorial
- Combinations
- Permutations

## Constants

The expression engine provides:

| Name | Value |
|---|---|
| `pi` | π |
| `e` | Euler's number |
| `tau` | 2π |
| `phi` | Golden ratio |
| `sqrt2` | √2 |
| `ln2` | ln(2) |
| `ln10` | ln(10) |

Unicode `π` and `τ` are also normalized by the tokenizer.

## Angle modes

Trigonometric calculations support:

- `RAD` — radians, default
- `DEG` — degrees
- `GRAD` — gradians

```js
import { evaluate } from '@tejas-mk2/calculator-core';

console.log(evaluate('sin(pi / 2)')); // 1
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluate('sin(100)', {}, { angleMode: 'GRAD' })); // 1
```

## Variables

Variables are supplied through an explicit scope object.

```js
console.log(
  evaluate('2*x + y', { x: 5, y: 10 })
); // 20
```

Unknown identifiers and non-finite variable values are rejected.

## Exact rational arithmetic

The package includes an immutable `Fraction` implementation and a separate exact evaluator.

```js
import { evaluateExact, Fraction } from '@tejas-mk2/calculator-core';

const result = evaluateExact('1 / 3 + 1 / 6');
console.log(result.toString()); // 1/2

const fraction = new Fraction(2, 4);
console.log(fraction.toString()); // 1/2
```

Exact mode supports rational arithmetic, integer powers, modulo, unary operators, percentages, and scoped numeric variables. It deliberately refuses to silently approximate unsupported irrational operations.

## Utility API

```js
import {
  evaluate,
  evaluateExact,
  factorial,
  percentage,
  convertTemperature,
  absolute,
  minimum,
  maximum,
  average,
  mean,
  sum,
  Fraction,
  EvaluationError
} from '@tejas-mk2/calculator-core';

console.log(evaluate('sqrt(144) + 2^8')); // 400
console.log(factorial(5));                // 120
console.log(percentage(250, 20));         // 50
console.log(absolute(-42));               // 42
console.log(minimum(9, 2, 7));            // 2
console.log(maximum(9, 2, 7));            // 9
console.log(average(2, 4, 6));             // 4
console.log(sum(1, 2, 3, 4));             // 10
console.log(convertTemperature(100, 'C', 'F')); // 212
```

## Error model

The engine uses typed `EvaluationError` instances for important evaluation failures.

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

Important error categories include:

- `DIVISION_BY_ZERO`
- `EXPECTED_TOKEN`
- `EXPECTED_VALUE`
- `UNKNOWN_IDENTIFIER`
- `UNKNOWN_FUNCTION`
- `ARGUMENT_COUNT`
- `DOMAIN_ERROR`
- `INVALID_POWER`
- `INVALID_VARIABLE`
- `INVALID_FUNCTION_RESULT`
- `NON_FINITE_RESULT`

The engine validates logarithm/root domains, division and modulo by zero, invalid variables, invalid powers, and non-finite results.

## Installation

### npm

```bash
npm install @tejas-mk2/calculator-core
```

### GitHub Packages

Configure the npm scope:

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @tejas-mk2/calculator-core
```

## API overview

| API | Purpose |
|---|---|
| `evaluate()` | Full numeric expression evaluation |
| `evaluateExact()` | Exact rational expression evaluation |
| `Parser` | Reusable expression parser |
| `Fraction` | Immutable rational arithmetic |
| `factorial()` | Integer factorial |
| `percentage()` | Percentage calculation |
| `convertTemperature()` | Celsius/Fahrenheit/Kelvin conversion |
| `absolute()` | Absolute value |
| `minimum()` / `maximum()` | Variadic extrema |
| `average()` / `mean()` | Arithmetic mean |
| `sum()` / `product()` | Variadic aggregation |
| `EvaluationError` | Typed evaluation errors |
| `constants` | Mathematical constants |
| `normalizeAngleMode()` | Validate angle mode |
| `toRadians()` / `fromRadians()` | Angle conversion |

## Development

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

The test suite covers parser precedence, implicit multiplication, scientific notation, trigonometry, angle modes, variables, constants, percentages, modulo, factorial, exact fractions, conversion, malformed input, and typed errors.

Before publishing a new version, run:

```bash
npm test
npm pack --dry-run
```

## Publishing

The package is configured for GitHub Packages:

```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

Every published version must use a new semver version. Registry versions are immutable; do not attempt to overwrite an existing release.

## Package information

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| Current source version | `0.3.3` |
| npm | `https://www.npmjs.com/package/@tejas-mk2/calculator-core` |
| GitHub Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| Source | `https://github.com/TEJAS-MK2/Calculator/tree/main/packages/calculator-core` |
| Runtime dependencies | None |
| Module format | ES module |
| License | MIT |

## License

MIT
