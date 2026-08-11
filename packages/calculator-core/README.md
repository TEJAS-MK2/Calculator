# @tejas-mk2/calculator-core

A lightweight, framework-free JavaScript calculation engine for the web calculator and other JavaScript applications.

## Why use it?

`@tejas-mk2/calculator-core` provides reusable calculation logic without requiring a browser DOM or UI framework. It can power a web calculator, Node.js tool, test suite, or future application.

## Features

- Arithmetic expressions
- Scientific functions
- `π` and `e`
- Variables through a scope object
- Factorials
- Percentages
- Temperature conversion
- ESM support
- Zero runtime dependencies
- No DOM dependencies
- Small and reusable API

## Usage

```js
import {
  evaluate,
  factorial,
  percentage,
  convertTemperature
} from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));
console.log(evaluate('sin(pi / 2)'));
console.log(evaluate('x^2 + 1', { x: 5 }));
console.log(factorial(5));
console.log(percentage(250, 20));
console.log(convertTemperature(100, 'C', 'F'));
```

## API

### `evaluate(expression, scope?)`

Evaluates a supported mathematical expression. An optional scope object can provide variables.

```js
 evaluate('x * 10', { x: 7 });
```

### `factorial(n)`

Calculates the factorial of a non-negative integer.

```js
factorial(5); // 120
```

### `percentage(value, percent)`

Calculates a percentage of a value.

```js
percentage(250, 20); // 50
```

### `convertTemperature(value, from, to)`

Converts between supported temperature units.

```js
convertTemperature(100, 'C', 'F'); // 212
```

## Development

From the package directory:

```bash
npm test
npm pack --dry-run
```

## Package registry

This package is configured for the GitHub Packages npm registry:

```text
https://npm.pkg.github.com
```

## License

MIT
