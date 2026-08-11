# Modern Calculator

<p align="center">
  <strong>A modern, responsive web calculator with a clean UI and a powerful calculation engine.</strong><br>
  Built with HTML, CSS, JavaScript, Anime.js, and a reusable calculation core.
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Overview

Modern Calculator combines a polished, responsive interface with a reusable JavaScript calculation engine. The main calculator UI is powered by **`@tejas-mk2/calculator-core`**, keeping expression parsing and mathematical evaluation separate from presentation.

## Demo

<p align="center">
  <img src="./calculator-demo-fixed.gif" alt="Modern Calculator demo" width="720">
</p>

## Features

- **Modern responsive UI** — clean glass-inspired surfaces, refined spacing, and responsive sizing.
- **Advanced calculation engine** — precedence-aware expressions, parentheses, implicit multiplication, variables, scientific functions, and exact fractions.
- **History** — stores calculations locally and lets you reuse results.
- **Memory** — supports calculator memory operations.
- **Theme system** — dark, light, and system themes.
- **Keyboard support** — numbers, operators, Enter, Backspace, Escape, and C.
- **Error handling** — explicit handling for invalid expressions and division by zero.
- **Smooth animations** — Anime.js interaction and transition effects with reduced-motion support.
- **PWA support** — service-worker caching for an app-like experience.
- **Mobile-friendly** — optimized for desktop, tablet, and small screens.

> The sidebar stays intentionally focused on **History**, **Clear**, and **Change Theme**. Selecting a feature opens or controls the relevant calculator functionality in the main interface.

## Calculator Engine

The calculator UI uses **`@tejas-mk2/calculator-core`** for expression evaluation.

Phase 1 provides:

- Operator precedence and nested parentheses
- Implicit multiplication such as `2(5 + 3)`
- Unary `+` and `-`
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

The interface uses a restrained visual system built around:

- Layered surfaces and subtle depth
- Consistent borders and rounded controls
- Clear calculator/display hierarchy
- Responsive button sizing
- Unified sidebar controls
- Dark, light, and system themes
- Lightweight interaction feedback

## Tech Stack

- **HTML5** — structure and accessibility
- **CSS3** — responsive layout, themes, glass-inspired surfaces, and visual effects
- **JavaScript (ES6+)** — UI state and calculator integration
- **Anime.js** — animations and micro-interactions
- **Font Awesome** — interface icons
- **Service Worker** — application-shell caching
- **`@tejas-mk2/calculator-core`** — calculation and expression engine

## Animations

Anime.js is used for controlled motion including calculator entrance, button feedback, display transitions, result transitions, history interactions, theme transitions, and sidebar motion.

Animations respect `prefers-reduced-motion` where supported.

## Themes

The calculator supports:

- **Dark**
- **Light**
- **System** — follows the operating system preference

Theme state is stored locally and applied through shared CSS variables so the calculator and sidebar remain visually consistent.

## Performance

The application is designed to keep interaction responsive through lightweight DOM updates, local persistence, animation cleanup, reduced-motion support, and service-worker caching.

## GitHub Pages

The calculator is deployed as a static website through GitHub Pages.

**Live:** https://tejas-mk2.github.io/Calculator/

## Calculator Core Package

The repository includes **`@tejas-mk2/calculator-core`**, a lightweight, dependency-free JavaScript calculation engine.

```text
@tejas-mk2/calculator-core@0.2.0
```

It is configured for **GitHub Packages** and released through GitHub Actions after package tests and verification pass.

Source:

```text
packages/calculator-core/
```

## Development

Clone the repository:

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Open `index.html` for a simple local preview, or use any static HTTP server for a production-like environment.

For the calculation engine:

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

## Contributing

Contributions, bug reports, and feature requests are welcome. Please open an issue or submit a pull request.

Before submitting changes, test calculator interactions and check the UI on both desktop and mobile-sized screens.

## License

Licensed under the Apache License 2.0. See [`LICENSE`](./LICENSE) for details.

## About

Built by **Pijush Chakraborty** as a modern web calculator focused on simplicity, usability, performance, and polished interaction.

---

<p align="center"><strong>Calculate with style.</strong></p>
