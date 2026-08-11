# Modern Calculator

<p align="center">
  <strong>A compact, responsive calculator with history, themes, PWA support, and Anime.js motion.</strong><br>
  HTML · CSS · JavaScript · PWA · GitHub Pages
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Deployment

**GitHub Pages is the only deployment target for this project.**

The site is deployed from `main` by `.github/workflows/deploy.yml` using the official GitHub Pages artifact/deployment actions. There is no custom domain, external hosting provider, Docker registry deployment, or package-publishing workflow required for the website.

Live site:

`https://tejas-mk2.github.io/Calculator/`

## Browser calculator

The UI is deliberately compact and focused:

- Addition, subtraction, multiplication, and division
- Decimal input
- AC, C, and Backspace controls
- **History** in the sidebar
- **Clear** in the sidebar
- **Theme** in the sidebar
- **About** panel in the sidebar
- Dark, Light, and System themes
- Keyboard-friendly interaction
- Responsive layout
- Persistent calculation history
- PWA and service-worker support
- Offline caching of the application shell and required CDN assets
- Anime.js-powered motion
- `prefers-reduced-motion` support
- No `eval()` or `Function()` based expression execution
- No gradients in the current visual system

### Calculator demo

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

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Use a local HTTP server when testing ES modules or service-worker behavior.

### Calculator engine

```bash
cd packages/calculator-core
npm test
```

### Browser smoke tests

The repository uses Playwright in GitHub Actions to test the live UI behavior before deployment.

The browser suite covers:

- Basic arithmetic
- Calculation history
- Sidebar open/close
- About panel
- Backspace
- Decimal input
- Sidebar Clear
- Theme switching
- Keyboard input
- Browser console errors

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

<p align="center"><strong>Simple UI. Serious calculation engine. GitHub Pages only.</strong></p>
