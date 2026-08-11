# Modern Calculator

<p align="center">
  <strong>A compact, modern calculator for fast everyday arithmetic.</strong><br>
  HTML · CSS · JavaScript · PWA · Anime.js · npm · RubyGems · PyPI · Maven · Gradle · NuGet · Docker
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/packages">Packages</a>
</p>

---

## Overview

Modern Calculator is a responsive Progressive Web App built for simple, fast arithmetic. The interface deliberately keeps the keypad focused on calculation while placing secondary controls in a compact sidebar.

The current UI provides **addition, subtraction, multiplication, division, decimals, AC, History, Clear, and Theme**. It uses a modern dark-first visual system with responsive sizing, rounded surfaces, subtle depth, and lightweight motion.

## Features

- Addition, subtraction, multiplication, and division
- Decimal input
- **AC** button directly on the keypad
- **History** in the sidebar
- **Clear** in the sidebar
- **Theme** in the sidebar
- Compact responsive layout
- Keyboard-friendly interaction
- Anime.js-powered UI motion
- `prefers-reduced-motion` support
- PWA and service-worker support
- Persistent calculation history using local storage
- No `eval()` or `Function()` based expression execution

## Interface

The main calculator contains the display and keypad. The sidebar keeps secondary controls out of the keypad area:

| Control | Location | Purpose |
|---|---|---|
| AC | Main keypad | Immediately reset the current calculation |
| History | Sidebar | Open and reuse previous calculations |
| Clear | Sidebar | Reset the calculator state |
| Theme | Sidebar | Cycle through Dark, Light, and System themes |

The sidebar is designed as an overlay on small screens and shifts the calculator safely on larger screens so the menu button does not collide with the calculator.

## Animation

The interface uses [Anime.js](https://animejs.com/) for lightweight UI motion, including calculator entrance, keypad interactions, sidebar transitions, history presentation, and result feedback.

Animations respect the user's `prefers-reduced-motion` setting.

## Package ecosystem

| Ecosystem | Package | Distribution |
|---|---|---|
| JavaScript | `@tejas-mk2/calculator-core` | npm / GitHub Packages |
| Ruby | `pijush-calculator` | RubyGems / GitHub Packages |
| Python | `pijush-calculator` | PyPI |
| Java / Maven | `io.github.tejas-mk2:pijush-calculator` | GitHub Packages |
| Java / Gradle | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | GitHub Packages |
| .NET / NuGet | `Pijush.Calculator` | GitHub Packages |
| Container | `ghcr.io/tejas-mk2/calculator` | GitHub Container Registry |

The package libraries provide reusable arithmetic APIs independently of the browser UI.

## Installation

### JavaScript

```bash
npm install @tejas-mk2/calculator-core
```

### Ruby

```bash
gem install pijush-calculator
```

### Python

```bash
pip install pijush-calculator
```

### Maven

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.1.0</version>
</dependency>
```

### Gradle

```gradle
dependencies {
    implementation 'io.github.tejasmk2.gradle:pijush-calculator-gradle:0.1.0'
}
```

### NuGet

```bash
dotnet add package Pijush.Calculator --version 0.1.0
```

### Docker

```bash
docker pull ghcr.io/tejas-mk2/calculator:latest
```

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Use a local HTTP server when testing ES modules, PWA behavior, service workers, or the browser UI.

### JavaScript package

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

### Ruby

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
```

### Python

```bash
cd python-package
python -m pip install -e .
python -m pytest
python -m build
```

### Maven

```bash
cd java-package
mvn test
mvn package
```

### Gradle

```bash
cd gradle-package
gradle test
gradle build
```

### NuGet

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

## Project structure

```text
Calculator/
├── index.html                 # Calculator UI
├── styles.css                 # Current visual system
├── script.js                  # Sidebar and theme controls
├── calculator-core-ui.js      # Calculator UI state and history
├── packages/                  # JavaScript calculator core
├── ruby-gem/                  # Ruby package
├── python-package/            # Python package
├── java-package/              # Maven package
├── gradle-package/            # Gradle package
├── nuget-package/             # NuGet package
├── .github/workflows/         # CI/CD and registry publishing
└── Dockerfile                 # Container image
```

## Project policies

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)

## License

The main calculator is licensed under Apache-2.0. Package directories document their applicable package licenses.

---

<p align="center"><strong>Simple calculations. Clean interface.</strong></p>
