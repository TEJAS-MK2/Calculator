# Modern Calculator

<p align="center">
  <strong>A modern, responsive calculator with a clean UI, scientific calculation engine, and reusable package ecosystem.</strong><br>
  HTML · CSS · JavaScript · Anime.js · npm · RubyGems · PyPI · Apache Maven
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Overview

Modern Calculator is a responsive Progressive Web App backed by a reusable JavaScript calculation engine. The project also ships lightweight calculator libraries for JavaScript, Ruby, Python, and Java.

The web calculator focuses on fast everyday calculations while the JavaScript core provides the advanced expression parser used by the scientific features.

## Highlights

- Modern responsive calculator interface
- History, Clear, memory, and theme controls
- Dark, light, and system themes
- Keyboard support and responsive mobile layout
- Operator precedence and nested parentheses
- Implicit multiplication
- Scientific notation, variables, powers, percentages, and modulo
- Scientific functions and trigonometry
- DEG, RAD, and GRAD angle modes
- `π`, `e`, `τ`, and `φ` constants
- Exact rational arithmetic for supported expressions
- Explicit, typed calculation errors
- Safe expression parsing without `eval()` or `Function()`
- Smooth Anime.js interactions with reduced-motion support
- PWA and service-worker support

## Calculation Engine

The web calculator uses **`@tejas-mk2/calculator-core` v0.3.2**.

It supports:

- Arithmetic precedence
- Parentheses and implicit multiplication
- Unary operators
- Powers, percentages, and modulo
- Variables and constants
- Scientific notation
- Trigonometric and scientific functions
- DEG/RAD/GRAD angle modes
- Exact `Fraction` arithmetic
- Typed `EvaluationError` codes

Examples:

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

### JavaScript — GitHub Packages

**`@tejas-mk2/calculator-core` v0.3.2**

A safe, dependency-free expression engine for JavaScript applications.

```bash
npm install @tejas-mk2/calculator-core
```

Registry: `https://npm.pkg.github.com`

### Ruby — GitHub Packages

**`pijush-calculator` v0.1.2**

A lightweight Ruby arithmetic library with explicit division-by-zero handling and no runtime dependencies.

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

### Python — PyPI

**`pijush-calculator` v0.1.2**

A dependency-free Python arithmetic engine for reliable calculator operations and reusable math utilities.

```bash
pip install pijush-calculator
```

### Java — Apache Maven / GitHub Packages

**`io.github.tejas-mk2:pijush-calculator` v0.1.0**

A lightweight Java arithmetic library using `BigDecimal` and DECIMAL128 precision.

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.1.0</version>
</dependency>
```

Repository: `https://maven.pkg.github.com/TEJAS-MK2/Calculator`

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

The interface uses consistent surfaces, borders, typography, spacing, and responsive controls across calculator features and the sidebar. Animations respect `prefers-reduced-motion` and avoid unnecessary main-thread work.

The calculator is a static PWA and does not require a backend server for normal operation.

## Tech Stack

- HTML5 / CSS3
- JavaScript ES modules
- Anime.js
- Font Awesome
- PWA / Service Worker
- `@tejas-mk2/calculator-core`
- `pijush-calculator` Ruby gem
- `pijush-calculator` Python package
- `io.github.tejas-mk2:pijush-calculator` Maven package

## GitHub Pages

**Live:** https://tejas-mk2.github.io/Calculator/

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Use a local HTTP server when testing PWA features or ES modules.

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

Python package:

```bash
cd python-package
python -m pip install -e .
python -m pytest
python -m build
```

Maven package:

```bash
cd java-package
mvn test
mvn package
```

## Testing

The JavaScript engine tests precedence, parentheses, implicit multiplication, scientific notation, variables, angle modes, percentages, modulo, exact fractions, domain validation, and typed errors.

Python, Ruby, and Maven packages have their own package-level tests/build checks, while GitHub Actions validates the project and publishing workflows.

## Documentation

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)
- [`packages/calculator-core/README.md`](./packages/calculator-core/README.md)
- [`ruby-gem/README.md`](./ruby-gem/README.md)
- [`python-package/README.md`](./python-package/README.md)
- [`java-package/README.md`](./java-package/README.md)

## License

The main calculator is licensed under the Apache License 2.0. Reusable packages retain the license documented in their respective package directories.

---

<p align="center"><strong>Calculate with style.</strong></p>
