# Modern Calculator

<p align="center">
  <strong>A modern, responsive web calculator with a polished UI and reusable calculation engines.</strong><br>
  HTML · CSS · JavaScript · Anime.js · GitHub Packages
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Overview

Modern Calculator combines a responsive, modern interface with a reusable calculation engine. The web application delegates expression evaluation to **`@tejas-mk2/calculator-core`**, while **`pijush-calculator`** provides a separate Ruby arithmetic API.

## Highlights

- Modern glass-inspired responsive interface
- Operator precedence and nested parentheses
- Implicit multiplication such as `2(5 + 3)`
- Scientific notation, variables, powers, and percentages
- Modulo with correct `%` handling
- Scientific functions and trigonometry
- DEG, RAD, and GRAD angle modes
- `π`, `e`, `τ`, and `φ` constants
- Exact rational arithmetic for supported expressions
- Calculation history and memory
- Dark, light, and system themes
- Keyboard support
- Typed and explicit calculation errors
- No `eval()` or `Function()` in the calculation engine
- Anime.js animations with reduced-motion support
- PWA/service-worker support
- JavaScript and Ruby packages distributed through GitHub Packages

> The sidebar focuses on **History**, **Clear**, and **Change Theme**. These controls share the calculator's visual system and open their functionality in the main interface.

## Calculation Engine

The main calculator uses **`@tejas-mk2/calculator-core` v0.3.1**.

Supported capabilities include:

- Arithmetic precedence and nested expressions
- Implicit multiplication
- Unary operators
- Powers, percentages, and modulo
- Variables and constants
- Scientific notation
- Scientific functions
- DEG/RAD/GRAD trigonometry
- Exact `Fraction` arithmetic
- Explicit error codes through `EvaluationError`
- Safe parsing without `eval()` or `Function()`

Example expressions:

```text
(25 + 5) * 2
2(5 + 3) + 4^2
1.5e2 + 2.5e1
10 % 3
sin(90)
x^2 + 1
1 / 3 + 1 / 6
```

## Packages

### JavaScript / GitHub Packages

**`@tejas-mk2/calculator-core` v0.3.1**

```bash
npm install @tejas-mk2/calculator-core
```

Registry:

```text
https://npm.pkg.github.com
```

### Ruby / GitHub Packages

**`pijush-calculator` v0.1.1**

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

The Ruby gem is a lightweight arithmetic API with no runtime dependencies.

## Calculator Controls

| Category | Operations |
|---|---|
| Arithmetic | `+` `−` `×` `÷` `%` |
| Input | `0–9` `.` |
| Controls | `AC` `C` `Backspace` `=` |
| Scientific | Functions, powers, constants, angle modes |
| Memory | `MC` `MR` `M+` `M−` `MS` |
| History | Open, reuse, and clear calculations |
| Theme | Dark, Light, System |

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `0–9` | Enter number |
| `+` `-` `*` `/` `%` | Operators |
| `.` | Decimal point |
| `Enter` / `=` | Calculate |
| `Backspace` | Delete last input |
| `Escape` | Clear all |
| `C` | Clear current input |

## Design and Performance

The interface uses layered surfaces, consistent borders, rounded controls, responsive sizing, and matched sidebar components. Animation effects respect `prefers-reduced-motion` and avoid unnecessary work during calculation.

The application is a static PWA and does not require a backend server for normal calculator operation.

## Tech Stack

- HTML5 / CSS3
- JavaScript ES6+
- Anime.js
- Font Awesome
- Service Worker / PWA
- `@tejas-mk2/calculator-core`
- `pijush-calculator`

## GitHub Pages

**Live:** https://tejas-mk2.github.io/Calculator/

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Use a local HTTP server when testing the PWA or ES modules.

JavaScript package:

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

Ruby gem:

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
```

## Testing

The JavaScript package has automated coverage for precedence, parentheses, implicit multiplication, scientific notation, variables, angle modes, percentages, modulo, exact fractions, domain validation, and typed errors.

```bash
cd packages/calculator-core
npm test
```

GitHub Actions also validates JavaScript syntax, package tests, manifest JSON, HTML references, and GitHub Pages deployment.

## Documentation and Contribution

See [`CONTRIBUTING.md`](./CONTRIBUTING.md), [`SECURITY.md`](./SECURITY.md), and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) before contributing.

## License

The main calculator is licensed under the Apache License 2.0. Each reusable package retains the license documented in its own directory.

---

<p align="center"><strong>Calculate with style.</strong></p>
