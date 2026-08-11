# @tejas-mk2/calculator-core

A small, framework-free JavaScript calculation engine extracted from the Aesthetic Calculator project.

## Features

- Arithmetic expressions
- Scientific functions
- `π` and `e`
- Variables through a scope object
- Factorials
- Percentages
- Temperature conversion
- ESM with zero runtime dependencies

## Usage

```js
import { evaluate, factorial, percentage, convertTemperature } from '@tejas-mk2/calculator-core';

evaluate('2 + 3 * 4');
evaluate('sin(pi / 2)');
evaluate('x^2 + 1', { x: 5 });
factorial(5);
percentage(250, 20);
convertTemperature(100, 'C', 'F');
```

The package has no DOM dependencies, so it can be used by the web calculator, Node.js tools, tests, or future applications.
