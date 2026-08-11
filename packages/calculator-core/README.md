# @tejas-mk2/calculator-core

**Advanced, dependency-free JavaScript/ESM calculation engine** for Node.js, browsers, PWAs, CLIs, and reusable math applications.

> This package is the **reference / extreme engine** of the Calculator project. The browser calculator intentionally exposes a smaller UI, while this package provides the serious programmatic calculation layer.

## Engine architecture

The npm engine now has two complementary layers:

1. **Expression engine** — parses and evaluates calculator-style mathematical expressions safely.
2. **Advanced numerical toolkit** — provides statistics, number theory, combinatorics, numerical methods, interpolation, and matrix operations through explicit APIs.

Both layers are dependency-free and avoid `eval()` and `Function()`.

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
- Parentheses and unary operators
- Implicit multiplication
- Scientific notation
- Binary modulo
- Postfix percentages
- Controlled variables / custom scopes
- Strict tokenization and validation
- Typed evaluation errors
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

### Aggregation

- `min`, `max`
- `sum`, `product`, `mean`
- GCD / LCM

## Exact arithmetic

The engine includes immutable rational arithmetic and an exact evaluator:

```js
import { evaluateExact, Fraction } from '@tejas-mk2/calculator-core';

console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(new Fraction(2, 4).toString());              // 1/2
```

Exact mode supports rational arithmetic, integer powers, modulo, unary operators, percentages, and numeric variables without silently converting rational results to floating point.

## Advanced numerical toolkit

The new advanced API is available from the `@tejas-mk2/calculator-core/advanced` subpath.

```js
import {
  median,
  variance,
  standardDeviation,
  correlation,
  combinations,
  primeFactors,
  solveQuadratic,
  newtonRaphson,
  bisection,
  integrateSimpson,
  derivative,
  matrixMultiply,
  determinant
} from '@tejas-mk2/calculator-core/advanced';
```

### Statistics

- Arithmetic, geometric, and harmonic mean
- Median
- Quantiles
- Population/sample variance
- Population/sample standard deviation
- Covariance
- Pearson correlation
- Sum and product

### Number theory

- GCD / LCM
- Prime detection
- Next-prime search
- Prime factorization
- Factorial
- Combinations
- Permutations

### Numerical methods

- Quadratic equation solver
- Newton-Raphson root finding
- Bisection root finding
- Numerical derivative
- Simpson numerical integration
- Configurable tolerance and iteration limits
- Explicit convergence results instead of silently returning a questionable root

Example:

```js
const result = newtonRaphson(
  x => x * x - 2,
  x => 2 * x,
  1
);

console.log(result.root);       // approximately sqrt(2)
console.log(result.converged);  // true
```

### Interpolation and mapping

- Linear interpolation (`lerp`)
- Inverse interpolation (`inverseLerp`)
- Range remapping (`remap`)
- Safe clamping (`clamp`)

### Matrix operations

- Matrix validation
- Matrix addition
- Matrix multiplication
- Transpose
- Determinant calculation with pivoting
- Dimension and square-matrix validation

```js
const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];

matrixMultiply(A, B); // [[19, 22], [43, 50]]
determinant(A);       // -2
```

### Numerical constants

The advanced module exposes common constants including:

- `PI`
- `E`
- `TAU`
- `PHI`
- `SQRT2`
- `SQRT3`
- `LN2`
- `LN10`
- `LOG2E`
- `LOG10E`

## Angle modes

The expression engine supports `RAD`, `DEG`, and `GRAD`:

```js
import { evaluate } from '@tejas-mk2/calculator-core';

console.log(evaluate('sin(pi / 2)')); // 1
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluate('sin(100)', {}, { angleMode: 'GRAD' })); // 1
```

## Variables

```js
console.log(evaluate('2*x + y', { x: 5, y: 10 })); // 20
```

Unknown identifiers and non-finite variables are rejected.

## Error model

Important typed `EvaluationError` codes include:

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

The advanced numerical APIs also validate inputs, matrix dimensions, root brackets, convergence limits, and mathematical domains.

## Installation

```bash
npm install @tejas-mk2/calculator-core
```

For the advanced numerical toolkit:

```js
import { determinant } from '@tejas-mk2/calculator-core/advanced';
```

### GitHub Packages

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

## API overview

| API | Purpose |
|---|---|
| `evaluate()` | Full numeric expression evaluation |
| `evaluateExact()` | Exact rational evaluation |
| `Parser` | Reusable expression parser |
| `Fraction` | Immutable rational arithmetic |
| `factorial()` | Integer factorial |
| `percentage()` | Percentage calculation |
| `convertTemperature()` | Temperature conversion |
| `EvaluationError` | Typed evaluation errors |
| `advanced` subpath | Statistics, numerical methods, matrices, number theory, interpolation |

## Development

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

The test suite covers the core parser and the advanced numerical toolkit, including statistics, combinatorics, number theory, numerical solvers, integration, derivatives, interpolation, and matrix operations.

Before publishing:

```bash
npm test
npm pack --dry-run
```

## Package information

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| Current source version | `0.4.0` |
| npm | `https://www.npmjs.com/package/@tejas-mk2/calculator-core` |
| GitHub Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| Runtime dependencies | None |
| Module format | ES module |
| License | MIT |

## License

MIT
