# Modern Calculator

<p align="center">
  <strong>A modern, responsive calculator with a scientific calculation engine and reusable packages across JavaScript, Ruby, Python, and Java.</strong><br>
  HTML · CSS · JavaScript · Anime.js · npm · RubyGems · PyPI · Maven · Gradle
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a>
</p>

---

## Overview

Modern Calculator is a responsive Progressive Web App backed by a reusable calculation engine. It provides fast everyday calculations, scientific operations, history, memory, keyboard support, theme controls, and a package ecosystem for multiple programming languages.

The web calculator is designed to remain lightweight, responsive, and safe: expressions are parsed without `eval()` or `Function()`, and animations respect reduced-motion preferences.

## Highlights

- Modern responsive calculator interface
- History, Clear, and memory controls
- Dark, light, and system themes
- Keyboard support and mobile-friendly layout
- Operator precedence, nested parentheses, and implicit multiplication
- Scientific notation, variables, powers, percentages, and modulo
- Scientific functions and trigonometry
- DEG, RAD, and GRAD angle modes
- `π`, `e`, `τ`, and `φ` constants
- Exact rational arithmetic for supported expressions
- Explicit typed calculation errors
- Smooth Anime.js interactions with reduced-motion support
- PWA and service-worker support

## Packages

| Ecosystem | Package | Registry |
|---|---|---|
| JavaScript | `@tejas-mk2/calculator-core` | [npm](https://www.npmjs.com/package/@tejas-mk2/calculator-core) |
| Ruby | `pijush-calculator` | [RubyGems](https://rubygems.org/gems/pijush-calculator) |
| Python | `pijush-calculator` | [PyPI](https://pypi.org/project/pijush-calculator/) |
| Java / Maven | `io.github.tejas-mk2:pijush-calculator` | [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages) |
| Java / Gradle | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages) |

### Install

**JavaScript**

```bash
npm install @tejas-mk2/calculator-core
```

**Ruby**

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

**Python**

```bash
pip install pijush-calculator
```

**Maven**

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.1.0</version>
</dependency>
```

**Gradle**

```gradle
dependencies {
    implementation 'io.github.tejasmk2.gradle:pijush-calculator-gradle:0.1.0'
}
```

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

The interface uses consistent surfaces, borders, typography, spacing, and responsive controls across calculator features and the sidebar. Animations avoid unnecessary main-thread work and respect `prefers-reduced-motion`.

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
- Apache Maven package
- Gradle package

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

Gradle package:

```bash
cd gradle-package
gradle test
gradle build
```

## Documentation

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)
- [`packages/calculator-core/README.md`](./packages/calculator-core/README.md)
- [`ruby-gem/README.md`](./ruby-gem/README.md)
- [`python-package/README.md`](./python-package/README.md)
- [`java-package/README.md`](./java-package/README.md)
- [`gradle-package/README.md`](./gradle-package/README.md)

## License

The main calculator is licensed under the Apache License 2.0. Reusable packages retain the license documented in their respective package directories.

---

<p align="center"><strong>Calculate with style.</strong></p>
