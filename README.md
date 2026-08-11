# Modern Calculator

<p align="center">
  <strong>A compact, modern calculator focused on fast everyday arithmetic.</strong><br>
  HTML · CSS · JavaScript · PWA · npm · RubyGems · PyPI · Maven · Gradle · NuGet · Docker
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/packages">Packages</a>
</p>

---

## Overview

Modern Calculator is a responsive Progressive Web App built around a clean four-operation calculator interface. The current UI intentionally keeps the main calculator focused: **History, Clear, and Theme are available from the sidebar instead of taking space on the keypad.**

The interface uses a dark, compact visual system with rounded surfaces, subtle depth, responsive sizing, and reduced visual clutter.

## Features

- Addition, subtraction, multiplication, and division
- Decimal input and a clear `AC` control
- Calculation history in the sidebar
- Clear control in the sidebar
- Theme control in the sidebar
- Compact responsive layout
- Keyboard-friendly controls
- PWA/service-worker support
- No `eval()` or `Function()` based expression execution
- Modern dark visual design with subtle interaction feedback

## Interface

The main calculator contains only the calculation display and keypad. A compact menu opens the sidebar, which contains:

- **History** — view and reuse previous calculations
- **Clear** — clear calculator state
- **Theme** — change the calculator appearance

This separation keeps the keypad clean and makes the calculator easier to use on small screens.

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

Use a local HTTP server when testing ES modules, PWA behavior, or service workers.

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

## Project policies

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)

## License

The main calculator is licensed under Apache-2.0. Package directories document their applicable package licenses.

---

<p align="center"><strong>Simple calculations. Clean interface.</strong></p>
