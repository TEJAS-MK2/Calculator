# Modern Calculator

<p align="center">
  <strong>A hobbyist calculator UI built around a serious multi-language calculation-engine project.</strong><br>
  HTML · CSS · JavaScript · PWA · Anime.js · npm · RubyGems · PyPI · Maven · Gradle · NuGet · Docker
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/packages">Packages</a>
</p>

---

## Project purpose

**The calculator UI is a hobbyist project. The main aim of this repository is to develop serious, reusable calculation engines.**

The browser calculator is intentionally a small, practical demonstration and a place to experiment with UI design, interaction, animation, PWA behavior, and integration with the engines. It is not intended to compete with professional scientific or financial calculator applications.

The core engineering focus is the package ecosystem: reusable calculation libraries for **JavaScript, Python, Ruby, Java/Maven, Java/Gradle, and .NET/NuGet**. These engines are developed with an emphasis on correctness, predictable behavior, validation, reusable APIs, testing, and progressively more capable mathematical functionality.

The npm package is currently the reference implementation and has the most advanced expression parser and mathematical feature set.

## Browser calculator

The UI is deliberately compact and simple:

- Addition, subtraction, multiplication, and division
- Decimal input
- **AC** button on the main keypad
- **History** in the sidebar
- **Clear** in the sidebar
- **Theme** in the sidebar
- Dark, Light, and System themes
- Keyboard-friendly interaction
- Responsive layout
- Persistent calculation history
- PWA and service-worker support
- Anime.js-powered motion
- `prefers-reduced-motion` support
- No `eval()` or `Function()` based expression execution
- No gradients in the current visual system

### Calculator demo

<p align="center">
  <img src="./calculator-demo-fixed.gif" alt="Animated calculator demo" width="360">
</p>

The browser UI does **not** expose every advanced engine capability. That separation is intentional: the UI remains approachable while the underlying libraries can evolve into substantially more capable calculation engines.

## Serious calculation engines

The package engines are the primary technical focus of this project.

### Common engine capabilities

Depending on the implementation, the engines provide increasingly broad support for:

- Addition / subtraction / multiplication / division
- Modulo
- Powers and percentages
- Absolute value
- Minimum / maximum / average
- Sum / product
- Clamp and reciprocal
- Square / cube
- Square root / cube root
- Factorial
- GCD / LCM
- Trigonometry
- Logarithms and exponentials
- Combinations / permutations
- Statistics and mathematical utilities
- Explicit validation and error handling

### npm — reference engine

`@tejas-mk2/calculator-core` is the most advanced implementation in the repository. It provides a real expression engine rather than a collection of simple arithmetic wrappers.

It includes:

- Tokenization with scientific notation
- Recursive-descent parsing
- Operator precedence
- Right-associative powers
- Parentheses and unary operators
- Implicit multiplication
- Variables and controlled scopes
- Mathematical constants including `pi`, `e`, `tau`, and `phi`
- DEG / RAD / GRAD angle modes
- Direct and inverse trigonometry
- Hyperbolic functions
- Roots and rounding functions
- Logarithms and exponentials
- `hypot`
- Variadic aggregation functions
- GCD / LCM
- Exact rational `Fraction` arithmetic
- `evaluateExact()`
- Factorial
- Combinations / permutations
- Statistics helpers
- Temperature conversion
- Typed `EvaluationError` codes
- Domain, range, overflow, and division-by-zero checks
- Zero runtime dependencies

Example expressions include:

```text
2 + 3 * 4
2(3 + 4)
sin(90)
sqrt(144) + 5^2
sum(1,2,3,4,5)
max(4,9,2,7)
(1/3) + (2/3)
```

## Package ecosystem

| Ecosystem | Package | Distribution | Main focus |
|---|---|---|---|
| JavaScript | `@tejas-mk2/calculator-core` | npm / GitHub Packages | Reference expression engine |
| Ruby | `pijush-calculator` | RubyGems / GitHub Packages | Reusable advanced math API |
| Python | `pijush-calculator` | PyPI | Reusable arithmetic/math API |
| Java / Maven | `io.github.tejas-mk2:pijush-calculator` | GitHub Packages | BigDecimal calculation engine |
| Java / Gradle | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | GitHub Packages | BigDecimal calculation engine |
| .NET / NuGet | `Pijush.Calculator` | GitHub Packages | Decimal calculation engine |
| Container | `ghcr.io/tejas-mk2/calculator` | GitHub Container Registry | Application distribution |

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

Use a local HTTP server when testing the browser/PWA layer.

### npm engine

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

### Ruby

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
gem test
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

## Project philosophy

This repository is primarily an **engineering and learning project**. The goal is not to pretend that the browser calculator is a production-grade replacement for established calculator software. Instead, the UI provides a useful front end while the package engines provide the deeper engineering challenge.

The long-term direction is to make the engines more robust, mathematically capable, portable, well-tested, and useful as standalone libraries.

## Project policies

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)

## License

The main calculator is licensed under Apache-2.0. Package directories document their applicable package licenses.

---

<p align="center"><strong>Hobbyist UI. Serious calculation engines.</strong></p>
