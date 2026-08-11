# Modern Calculator

## 1. Overview

Modern Calculator is a responsive web calculator with a clean UI, scientific capabilities, an advanced calculation engine, persistent history, themes, PWA support, and smooth Anime.js motion.

**Live on GitHub Pages:**

**https://tejas-mk2.github.io/Calculator/**

### Demo

<p align="center">
  <img src="./calculator-demo-fixed.gif" alt="Modern Calculator demo" width="360">
</p>

The project is built with HTML, CSS, and JavaScript and is deployed using GitHub Pages.

---

## 2. UI

The UI is designed to keep the everyday calculator simple while making advanced functionality accessible from the sidebar.

- Clean, responsive calculator interface
- Sidebar-based feature navigation
- Feature modes transform the calculator instead of opening separate sidebar panels
- Dark, Light, and System themes
- Responsive mobile layout
- Keyboard support
- Calculation history
- Smooth Anime.js interactions
- Subtle result animations without answer jitter
- Ripple and button interaction effects
- `prefers-reduced-motion` support
- PWA/offline support

The main calculator stays focused on everyday calculations, while advanced tools are available when needed.

---

## 3. Features

### Core calculator

- Addition, subtraction, multiplication, and division
- Decimal calculations
- Parentheses
- Unary operators
- Backspace, Clear Entry, and Clear All
- Keyboard input
- Error handling

### Scientific calculator

- `sin`, `cos`, `tan`
- Inverse and hyperbolic trigonometry
- `sqrt`, `cbrt`, and roots
- `log`, `ln`, `log2`
- `exp`, `pow`
- `abs`, `floor`, `ceil`, `round`
- `min`, `max`, `sum`, `product`, `mean`
- GCD / LCM
- Factorial and percentage helpers
- DEG / RAD / GRAD angle modes
- Mathematical constants such as π, e, τ, and φ

### Advanced tools

- Exact rational arithmetic
- Statistics
- Mean, median, variance, and standard deviation
- Matrix operations
- Determinant, inverse, and transpose
- Numerical methods
- Regression
- Number theory
- Combinatorics
- Vector and matrix utilities
- Interpolation and polynomial utilities

### History & themes

- Persistent calculation history
- Quick result recall
- Dark, Light, and System themes
- Theme-aware feature panels and controls

### PWA

- Installable web application
- Service-worker support
- Offline application-shell caching

### Security

- No `eval()`
- No `Function()` constructor for expression execution
- Strict expression parsing
- Typed calculation errors
- Mathematical domain and finite-number validation

---

## 4. Packages

The main reusable package is the calculation engine:

### `@tejas-mk2/calculator-core`

**npm:**

https://www.npmjs.com/package/@tejas-mk2/calculator-core

**GitHub:**

https://github.com/TEJAS-MK2/Calculator/tree/main/packages/calculator-core

**GitHub Packages:**

https://github.com/TEJAS-MK2/Calculator/packages

The package is dependency-free and provides the serious calculation layer behind the browser UI.

### Install from npm

```bash
npm install @tejas-mk2/calculator-core
```

### Use the main engine

```js
import { evaluate, evaluateExact } from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));
console.log(evaluateExact('1 / 3 + 1 / 6').toString());
```

### Use the advanced package API

```js
import {
  median,
  variance,
  determinant,
  matrixInverse,
  linearRegression
} from '@tejas-mk2/calculator-core/advanced';
```

### Install from GitHub Packages

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @tejas-mk2/calculator-core
```

GitHub Packages authentication may be required depending on package visibility and account configuration.

### Run the package tests

From the package directory:

```bash
cd packages/calculator-core
npm install
npm test
```

To inspect the package contents before publishing:

```bash
npm pack --dry-run
```

### Package details

| Property | Value |
|---|---|
| Package | `@tejas-mk2/calculator-core` |
| Version | `0.4.0` |
| Runtime dependencies | None |
| Module format | ES module |
| License | MIT |
| npm | [@tejas-mk2/calculator-core](https://www.npmjs.com/package/@tejas-mk2/calculator-core) |
| GitHub Packages | [Calculator packages](https://github.com/TEJAS-MK2/Calculator/packages) |
| Source | [calculator-core](https://github.com/TEJAS-MK2/Calculator/tree/main/packages/calculator-core) |

---

## 5. Project Purpose

This Calculator project is **primarily a hobbyist project**.

The browser calculator is a practical way to experiment with UI design, interaction, PWA development, testing, and JavaScript. However, the **main goal of the project is not to build the world's most advanced calculator UI**.

The main goal is to create **serious, powerful, reusable calculation engines**.

The calculation engine is intended to grow into a capable mathematical foundation for calculators, applications, CLIs, educational tools, numerical software, and other projects that need reliable mathematical computation.

The UI is the demonstration layer. The **calculation engine is the long-term focus**.

---

## License

The main calculator project is licensed under Apache-2.0. The `@tejas-mk2/calculator-core` package is licensed under MIT.

---

<p align="center"><strong>Simple interface. Serious calculation engine.</strong></p>
