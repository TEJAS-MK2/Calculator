# @tejas-mk2/calculator-core

**Advanced, dependency-free JavaScript/ESM calculation engine** for Node.js, browsers, PWAs, CLIs, and reusable math applications.

> This package is the **reference / extreme engine** of the Calculator project. The browser calculator intentionally exposes a smaller UI, while this package provides the serious programmatic calculation layer.

## Engine architecture

The npm engine has two complementary layers:

1. **Expression engine** — safely parses and evaluates calculator-style mathematical expressions.
2. **Advanced numerical toolkit** — provides statistics, number theory, numerical methods, interpolation, linear algebra, vector algebra, regression, and numerical utilities.

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

- `sqrt`, `cbrt`, `root`, `nthRoot`
- `abs`
- `floor`, `ceil`, `round`, `trunc`, `sign`
- `log`, `ln`, `log2`, `log1p`
- `exp`, `expm1`
- `hypot`
- `pow`
- `gamma`, `erf`

### Aggregation and arithmetic

- `min`, `max`
- `sum`, `product`, `mean`, `average`
- GCD / LCM
- `clamp`, `reciprocal`, `square`, `cube`
- `percentage`, `factorial`

## Exact arithmetic

The engine includes immutable rational arithmetic and an exact evaluator:

```js
import { evaluateExact, Fraction } from '@tejas-mk2/calculator-core';

console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
console.log(new Fraction(2, 4).toString());              // 1/2
```

Exact mode supports rational arithmetic, integer powers, modulo, unary operators, percentages, and numeric variables without silently converting rational results to floating point.

## Advanced numerical toolkit

The advanced API is available from the `@tejas-mk2/calculator-core/advanced` subpath.

```js
import {
  median,
  variance,
  correlation,
  combinations,
  primeFactors,
  newtonRaphson,
  bisection,
  matrixMultiply,
  matrixInverse,
  determinant,
  linearRegression
} from '@tejas-mk2/calculator-core/advanced';
```

### Statistics

- Arithmetic, geometric, and harmonic mean
- Median, quantiles, percentiles
- Population/sample variance
- Population/sample standard deviation
- Covariance and Pearson correlation
- Skewness and excess kurtosis
- Z-scores
- Covariance matrices
- Sum and product

### Number theory and combinatorics

- GCD / LCM
- Prime detection
- Next-prime search
- Prime factorization
- Factorial
- Combinations / permutations

### Numerical methods

- Quadratic equation solver
- Newton-Raphson root finding
- Secant root finding
- Bisection root finding
- Fixed-point iteration
- Numerical first and second derivatives
- Trapezoidal integration
- Simpson integration
- Configurable tolerance and iteration limits
- Explicit convergence results

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

### Interpolation, polynomials, and regression

- Linear interpolation (`lerp`)
- Inverse interpolation (`inverseLerp`)
- Range remapping (`remap`)
- Horner polynomial evaluation
- Polynomial derivatives
- Polynomial antiderivatives
- Simple linear regression
- Prediction, correlation, and R²

```js
const model = linearRegression([1, 2, 3, 4], [3, 5, 7, 9]);
console.log(model.slope);       // 2
console.log(model.intercept);   // 1
console.log(model.predict(5));  // 11
```

### Matrix and vector algebra

- Matrix validation
- Matrix addition/subtraction
- Matrix multiplication
- Transpose
- Trace
- Determinant with pivoting
- Matrix inverse
- Integer matrix powers
- Identity matrices
- Dot product
- Vector norm
- Euclidean distance
- Cosine similarity

```js
const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];

matrixMultiply(A, B); // [[19, 22], [43, 50]]
determinant(A);       // -2
matrixInverse(A);     // [[-2, 1], [1.5, -0.5]]
```

### Numerical utility layer

- Stable sigmoid
- Logit with domain validation
- Softmax with max-shift stabilization
- Configurable root-finding tolerances
- Explicit singular-matrix detection
- Dimension validation
- Finite-number validation

### Numerical constants

The advanced module exposes:

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

The advanced numerical APIs also validate inputs, matrix dimensions, root brackets, convergence limits, singular matrices, and mathematical domains.

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
| `advanced` subpath | Statistics, solvers, calculus, matrices, vectors, regression, number theory, interpolation |

## Development

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

The test suite should cover the core parser and advanced numerical toolkit, including statistics, combinatorics, number theory, numerical solvers, integration, derivatives, interpolation, regression, vector algebra, and matrix operations.

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
