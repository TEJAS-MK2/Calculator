# @tejas-mk2/calculator-core

A **lightweight, dependency-free JavaScript calculation engine** for web apps, Node.js tools, and other JavaScript projects.

It provides reusable calculation logic without a browser DOM, UI framework, or runtime dependencies.

## Features

- Arithmetic expressions
- Scientific functions
- `π` and `e`
- Variables through a scope object
- Factorials
- Percentages
- Temperature conversion
- Native ESM support
- Zero runtime dependencies
- No DOM dependencies
- Small, reusable API

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
  factorial,
  percentage,
  convertTemperature
} from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4')); // 14
console.log(evaluate('sin(pi / 2)')); // 1
console.log(evaluate('x^2 + 1', { x: 5 })); // 26
console.log(factorial(5)); // 120
console.log(percentage(250, 20)); // 50
console.log(convertTemperature(100, 'C', 'F')); // 212
```

## API

### `evaluate(expression, scope?)`

Evaluates a supported mathematical expression. An optional scope object provides variables.

```js
evaluate('x * 10', { x: 7 }); // 70
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

## Package information

- **Package:** `@tejas-mk2/calculator-core`
- **Current version:** `0.1.1`
- **Registry:** GitHub Packages
- **Runtime dependencies:** None
- **License:** MIT

## License

MIT
