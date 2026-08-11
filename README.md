# Modern Calculator

<p align="center">
  <strong>A compact, responsive scientific calculator with an advanced calculation engine, feature modes, history, themes, PWA support, and Anime.js motion.</strong><br>
  HTML · CSS · JavaScript · PWA · Anime.js · GitHub Pages
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Overview

Modern Calculator keeps the main keypad clean while exposing advanced capabilities through the sidebar. Selecting a feature **transforms the calculator into that mode** instead of opening a separate sidebar panel.

### Highlights

- Fast four-operation calculator
- Scientific functions and constants
- Advanced calculation engine
- Exact rational arithmetic
- Statistics tools
- 2×2 matrix tools
- Calculation history
- Dark, Light, and System themes
- Keyboard support
- Responsive mobile-first UI
- Anime.js animations and interaction feedback
- `prefers-reduced-motion` support
- PWA install/offline support
- No `eval()` or `Function()` expression execution
- Dependency-free calculation engine

## Feature sidebar

Open the sidebar to access:

| Feature | What it does |
|---|---|
| **Advanced Engine** | Opens the full advanced calculation interface inside the calculator |
| **Scientific** | Trigonometry, roots, logarithms, powers, constants, and scientific functions |
| **Statistics** | Mean, median, variance, and standard deviation |
| **Matrix** | 2×2 determinant, inverse, and transpose operations |
| **Exact Arithmetic** | Exact rational calculations using the `Fraction` engine |
| **History** | Persistent calculation history with quick result recall |
| **Clear** | Clears the current calculation and exits feature mode |
| **Theme** | Cycles Dark → Light → System themes |
| **About** | Project information and author details |

Feature panels are mounted **inside the calculator**, keeping the sidebar focused on navigation.

## Calculator demo

<p align="center">
  <img src="./calculator-demo-fixed.gif" alt="Animated calculator demo" width="360">
</p>

## Calculation engine

The browser UI uses the dependency-free JavaScript engine in `packages/calculator-core/`.

The engine supports:

- Recursive-descent expression parsing
- Operator precedence and right-associative powers
- Parentheses and unary operators
- Implicit multiplication
- Scientific notation
- Variables and controlled scopes
- Constants including `pi`, `e`, `tau`, and `phi`
- DEG / RAD / GRAD angle modes
- Trigonometric and inverse trigonometric functions
- Hyperbolic functions
- Roots, rounding, logarithms, and exponentials
- Variadic aggregation functions
- GCD / LCM
- Exact rational `Fraction` arithmetic
- `evaluateExact()`
- Factorial and percentage helpers
- Temperature conversion
- Typed `EvaluationError` codes
- Domain, range, overflow, and division-by-zero validation
- Advanced statistics, number theory, numerical methods, regression, vectors, and matrices
- Zero runtime dependencies

Example expressions:

```text
2 + 3 * 4
2(3 + 4)
sin(90)
sqrt(144) + 5^2
sum(1,2,3,4,5)
max(4,9,2,7)
(1/3) + (2/3)
```

## Themes & motion

The UI supports **Dark, Light, and System** themes. Theme-specific controls and feature panels are normalized for readable contrast.

Animations use Anime.js for:

- Calculator entrance
- Sidebar opening/closing
- Feature-panel transitions
- Button interaction feedback
- Ripple effects
- History transitions
- Result presentation

The result animation is intentionally subtle so the calculated answer does not jitter or overshoot. Users with reduced-motion enabled receive minimal/no motion.

## PWA & offline support

The project includes a web app manifest and service worker. The application shell and required local assets are cached for offline use, with controlled handling of external assets used by the UI.

## Deployment

**GitHub Pages is the only deployment target for this project.**

The site is deployed from `main` by `.github/workflows/deploy.yml` using GitHub Pages deployment actions.

Live site:

`https://tejas-mk2.github.io/Calculator/`

There is no custom domain or external hosting provider required for the website.

## Testing

### Calculator engine

```bash
cd packages/calculator-core
npm test
```

### Browser tests

The repository uses Playwright in GitHub Actions to test the UI before deployment.

The browser suite covers:

- Basic arithmetic
- Scientific feature mode
- Statistics
- Matrix operations
- Exact arithmetic
- Calculation history
- Sidebar open/close
- Feature-to-calculator transformation
- About mode
- Backspace
- Decimal input
- Sidebar Clear
- Theme switching
- Keyboard input
- Animation behavior
- Browser console errors

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Use a local HTTP server when testing ES modules or service-worker behavior.

## Project structure

```text
.
├── index.html
├── styles.css
├── script.js
├── calculator-core-ui.js
├── sw.js
├── manifest.json
├── tests/
│   └── browser-smoke.mjs
├── packages/
│   └── calculator-core/
└── .github/
    └── workflows/
        ├── browser-tests.yml
        └── deploy.yml
```

## Project policies

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)

## License

The main calculator is licensed under Apache-2.0. The calculation engine documents its own package license.

---

<p align="center"><strong>Clean interface. Advanced engine. Smooth interaction. GitHub Pages only.</strong></p>
