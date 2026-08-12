# @tejas-mk2/calculator-core

**Advanced, dependency-free JavaScript/ESM calculation engine** for Node.js, browsers, PWAs, CLIs, and reusable mathematical applications.

## What it provides

- Safe recursive-descent expression parsing
- Operator precedence, unary operators, parentheses, and implicit multiplication
- Scientific notation and postfix percentages
- Variables and configurable angle modes: `RAD`, `DEG`, `GRAD`
- Trigonometry, inverse/hyperbolic functions, logarithms, exponentials, roots, rounding, and constants
- Exact rational arithmetic through `Fraction` and `evaluateExact()`
- Statistics, number theory, combinatorics, numerical methods, interpolation, regression, matrices, and vectors
- Typed `EvaluationError` failures
- No `eval()`, no `Function()`, and no runtime dependencies

## Installation

The package is published to **GitHub Packages**.

Create or update an `.npmrc` file:

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @tejas-mk2/calculator-core
```

For a private GitHub Packages installation, authenticate npm with a GitHub token that has package read access according to your organization's GitHub Packages policy.

**Engine requirement:** Node.js **24+**.

## Quick start

```js
import { evaluate, evaluateExact } from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));                 // 14
console.log(evaluate('sin(90)', {}, { angleMode: 'DEG' })); // 1
console.log(evaluateExact('1 / 3 + 1 / 6').toString());     // 1/2
```

## Advanced API

The advanced numerical toolkit is available from the subpath:

```js
import {
  median,
  variance,
  combinations,
  determinant,
  matrixInverse,
  linearRegression,
  newtonRaphson
} from '@tejas-mk2/calculator-core/advanced';
```

### Statistics

- Mean, geometric mean, harmonic mean
- Median, quantiles, percentiles
- Population/sample variance and standard deviation
- Covariance, correlation, skewness, kurtosis, z-scores

### Number theory

- GCD / LCM
- Prime detection and factorization
- Factorial
- Combinations and permutations

### Numerical methods

- Newton-Raphson
- Secant and bisection root finding
- Fixed-point iteration
- Numerical derivatives
- Trapezoidal and Simpson integration
- Configurable tolerance and iteration limits

### Linear algebra

- Matrix addition/subtraction/multiplication
- Transpose and trace
- Determinant with pivoting
- Matrix inverse and integer powers
- Identity matrices
- Dot product, norm, distance, cosine similarity

### Regression and interpolation

- Linear interpolation and inverse interpolation
- Range remapping
- Horner polynomial evaluation
- Polynomial derivatives/antiderivatives
- Linear regression, prediction, correlation, and R²

## Exact arithmetic

```js
import { Fraction, evaluateExact } from '@tejas-mk2/calculator-core';

console.log(new Fraction(2, 4).toString());              // 1/2
console.log(evaluateExact('1 / 3 + 1 / 6').toString()); // 1/2
```

Exact mode preserves rational results instead of silently converting them to floating-point values.

## Expression examples

```text
2 + 3 * 4
2(3 + 4)^2
2sin(pi / 2)
1.5e3 + 2.5e2
-(5 + 3)
50%
10 % 3
```

## Error model

The engine uses typed errors for conditions such as:

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

## Development and testing

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

The package is tested in GitHub Actions on Node.js 24 before publication.

## Package information

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| Version | `0.6.0` |
| Engine | Node.js 24+ |
| Format | ES module |
| Runtime dependencies | None |
| Registry | GitHub Packages |
| GitHub Packages | https://github.com/TEJAS-MK2/Calculator/packages |
| Repository | https://github.com/TEJAS-MK2/Calculator |
| License | MIT |

## Publishing

GitHub Actions validates all calculation engines before publishing. Package publishing is restricted to semantic-version Git tags, and the release gate requires every package version to match the tag. GitHub Packages authentication uses the workflow `GITHUB_TOKEN`. Published package versions are immutable; release a new version instead of overwriting an existing one.

## License

MIT
