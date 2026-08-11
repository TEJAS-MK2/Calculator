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

Modern Calculator combines a clean responsive interface with reusable calculation engines. The browser application uses **`@tejas-mk2/calculator-core`** for expression parsing and evaluation, while **`pijush-calculator`** provides a separate Ruby arithmetic API.

## Highlights

- Modern glass-inspired responsive interface
- Operator precedence and nested parentheses
- Implicit multiplication such as `2(5 + 3)`
- Scientific notation, functions, variables, powers, and percentages
- DEG, RAD, and GRAD angle modes
- Advanced mathematical constants
- Exact rational arithmetic
- Calculation history and memory
- Dark, light, and system themes
- Keyboard support
- Explicit invalid-expression, domain, and division-by-zero handling
- Typed calculation errors in the JavaScript engine
- Anime.js animations with reduced-motion support
- PWA/service-worker support
- JavaScript and Ruby packages published through GitHub Packages

> The sidebar intentionally contains **History**, **Clear**, and **Change Theme**. All three controls share the calculator's visual system and open their functionality in the main interface.

## Calculation Engine

The main calculator is powered by **`@tejas-mk2/calculator-core` v0.3.1**.

The engine provides:

- Operator precedence and nested parentheses
- Implicit multiplication
- Unary `+` and `-`
- Powers and percentages
- Variables and constants
- Scientific notation
- Scientific functions and trigonometry
- DEG/RAD/GRAD angle modes
- `Fraction` and `evaluateExact()` for supported exact rational expressions
- Explicit and typed evaluation errors
- No `eval()` or `Function()` constructor
- Zero runtime dependencies

Example expressions:

```text
(25 + 5) * 2
2(5 + 3) + 4^2
1.5e2 + 2.5e1
sin(90)                 # with DEG mode
sin(pi / 2)^2 + cos(pi / 2)^2
x^2 + 1
1 / 3 + 1 / 6
```

## Packages

### JavaScript / GitHub Packages

**`@tejas-mk2/calculator-core` v0.3.1**

A framework-free, DOM-independent JavaScript calculation engine.

```bash
npm install @tejas-mk2/calculator-core
```

GitHub Packages registry:

```text
https://npm.pkg.github.com
```

### Ruby / GitHub Packages

**`pijush-calculator` v0.1.1**

A lightweight, dependency-free Ruby arithmetic engine with addition, subtraction, multiplication, division, and explicit `ZeroDivisionError` handling.

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

Package versions are immutable after publication; new releases use a new version number.

## Calculator Controls

| Category | Operations |
|---|---|
| Arithmetic | `+` `−` `×` `÷` |
| Input | `0–9` `.` |
| Controls | `AC` `C` `Backspace` `=` |
| Memory | `MC` `MR` `M+` `M−` `MS` |
| History | Open, reuse, and clear calculations |
| Theme | Dark, Light, System |

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `0–9` | Enter number |
| `+` `-` `*` `/` | Choose operator |
| `.` | Decimal point |
| `Enter` / `=` | Calculate |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |
| `C` | Clear current input |

## Design

The UI uses layered surfaces, subtle depth, consistent borders, rounded controls, clear display hierarchy, responsive sizing, and matched sidebar controls. Dark, light, and system themes share the same component styling.

## Tech Stack

- HTML5 / CSS3
- JavaScript ES6+
- Anime.js
- Font Awesome
- Service Worker / PWA
- `@tejas-mk2/calculator-core`
- `pijush-calculator`

## GitHub Pages

The calculator is deployed as a static website through GitHub Pages.

**Live:** https://tejas-mk2.github.io/Calculator/

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Open `index.html` locally or use a static HTTP server.

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
gem specification pijush-calculator-0.1.1.gem
```

## Testing

The JavaScript package includes automated tests for arithmetic precedence, implicit multiplication, scientific notation, angle modes, variables, percentages, exact fractions, error handling, and domain validation.

Run them with:

```bash
cd packages/calculator-core
npm test
```

## Contributing

Bug reports, feature requests, and pull requests are welcome. Test calculator interactions and check the UI on both desktop and mobile-sized screens before submitting changes.

## License

The main calculator is licensed under the Apache License 2.0. Each reusable package retains the license documented in its own directory.

---

<p align="center"><strong>Calculate with style.</strong></p>
