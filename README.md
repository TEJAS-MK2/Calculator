# Modern Calculator

<p align="center">
  <strong>A modern, responsive web calculator with a polished interface and reusable calculation engines.</strong><br>
  Built with HTML, CSS, JavaScript, Anime.js, and dedicated JavaScript and Ruby packages.
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Overview

Modern Calculator combines a polished responsive interface with reusable calculation engines. The web UI uses **`@tejas-mk2/calculator-core`** for expression parsing and evaluation, while the repository also includes **`pijush-calculator`**, a lightweight Ruby calculation gem.

## Highlights

- Modern glass-inspired responsive interface
- Precedence-aware expression evaluation
- Parentheses and implicit multiplication
- Scientific functions, variables, powers, percentages, and exact fractions
- Calculation history and memory
- Dark, light, and system themes
- Keyboard input and robust error handling
- Anime.js animations with reduced-motion support
- PWA/service-worker support
- JavaScript npm package and Ruby gem published through GitHub Packages

> The sidebar intentionally focuses on **History**, **Clear**, and **Change Theme**. These controls use the same visual system as the main calculator and open their functionality in the calculator interface.

## Calculation Engine

The main UI is powered by **`@tejas-mk2/calculator-core`**.

Phase 1 provides:

- Operator precedence and nested parentheses
- Implicit multiplication such as `2(5 + 3)`
- Unary operators
- Powers and percentages
- Variables and constants
- Scientific functions
- Exact rational arithmetic through `Fraction` and `evaluateExact`
- Explicit calculation errors
- No `eval()` or `Function()` constructor
- Zero runtime dependencies

Example expressions:

```text
(25 + 5) * 2
2(5 + 3) + 4^2
sin(pi / 2)^2 + cos(pi / 2)^2
x^2 + 1
1 / 3 + 1 / 6
```

## Packages

### JavaScript

**`@tejas-mk2/calculator-core` v0.2.1** is a framework-free, DOM-independent JavaScript calculation engine published through GitHub Packages.

```bash
npm install @tejas-mk2/calculator-core
```

### Ruby

**`pijush-calculator` v0.1.0** is a lightweight Ruby arithmetic engine published through the GitHub RubyGems registry.

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

Both packages are maintained independently from the browser UI. Package versions are immutable after publication, so releases use new versions.

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

The interface uses a unified visual system with layered surfaces, subtle depth, consistent borders, rounded controls, clear display hierarchy, responsive button sizing, and matched sidebar controls. Themes are shared across the calculator and feature controls so History, Clear, and Change Theme remain visually consistent.

## Tech Stack

- HTML5 and CSS3
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
```

## Contributing

Bug reports, feature requests, and pull requests are welcome. Test calculator interactions and check the UI on desktop and mobile-sized screens before submitting changes.

## License

The main calculator is licensed under Apache License 2.0. Each reusable package retains the license documented in its own directory.

---

<p align="center"><strong>Calculate with style.</strong></p>
