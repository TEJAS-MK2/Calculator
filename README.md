# Modern Calculator

<p align="center">
  <strong>A compact modern calculator UI with a powerful multi-language arithmetic engine family.</strong><br>
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

Modern Calculator is a responsive Progressive Web App for fast everyday calculations, backed by reusable engines for JavaScript, Python, Ruby, Java, Gradle, and .NET.

The browser UI intentionally stays compact: **AC** is on the keypad, while **History, Clear, and Theme** live in the sidebar. The interface uses solid surfaces, responsive spacing, Anime.js motion, persistent history, and reduced-motion support.

The package engines are more capable than the intentionally minimal browser keypad and can be used independently in applications, scripts, services, and build systems.

## UI features

- Addition, subtraction, multiplication, and division
- Decimal input
- **AC** button on the main keypad
- **History** in the sidebar
- **Clear** in the sidebar
- **Theme** in the sidebar
- Dark, Light, and System themes
- Compact responsive layout
- Keyboard-friendly interaction
- Anime.js-powered motion
- `prefers-reduced-motion` support
- PWA and service-worker support
- Persistent calculation history
- No `eval()` or `Function()` based expression execution
- No gradients in the current calculator visual system

## Animation

The UI uses Anime.js for lightweight calculator entrance, keypad, sidebar, history, and result animations. Motion is reduced automatically when the user's `prefers-reduced-motion` setting is enabled.

## Engine family

All package engines now expose a substantially broader arithmetic API. The **npm engine is the most advanced** and includes a real tokenizer/parser, operator precedence, implicit multiplication, variables, constants, angle modes, exact fractions, domain-aware functions, and variadic aggregate functions.

### Common capabilities

- Add / subtract / multiply / divide
- Modulo
- Powers
- Percentages
- Absolute value
- Minimum / maximum
- Average
- Sum / product
- Clamp
- Reciprocal
- Square / cube
- Square root / cube root
- Factorial
- GCD / LCM
- Trigonometric operations
- Logarithms and natural logarithm
- Exponential
- Combinations / permutations

### npm engine — advanced mode

`@tejas-mk2/calculator-core` provides the deepest expression engine in the project:

- Tokenizer with scientific notation
- Recursive-descent parser
- Operator precedence
- Parentheses and unary operators
- Implicit multiplication
- Variables and custom scopes
- `π`, `e`, `τ`, and `φ`
- DEG / RAD / GRAD angle modes
- `sin`, `cos`, `tan`
- Inverse and hyperbolic trigonometry
- `sqrt`, `cbrt`, `abs`, `floor`, `ceil`, `round`, `trunc`, `sign`
- `log`, `log2`, `ln`, `exp`
- Variadic `min`, `max`, `sum`, and `product`
- Exact rational arithmetic through `Fraction`
- `evaluateExact()` for exact numeric expressions
- Typed `EvaluationError` error codes
- Division/modulo/domain/range protection
- Reusable utility APIs for factorial, conversions, GCD/LCM, combinations, and permutations

Example expressions supported by the npm parser include:

```text
2 + 3 * 4
2(3 + 4)
sin(90)
sqrt(144) + 5^2
sum(1,2,3,4,5)
max(4,9,2,7)
(1/3) + (2/3)
```

The browser UI does not expose every engine feature directly; the advanced engine is available to package consumers.

## Package ecosystem

| Ecosystem | Package | Distribution | Engine focus |
|---|---|---|---|
| JavaScript | `@tejas-mk2/calculator-core` | npm / GitHub Packages | Full expression parser + advanced math |
| Ruby | `pijush-calculator` | RubyGems / GitHub Packages | Extended arithmetic + trig + statistics |
| Python | `pijush-calculator` | PyPI | Extended arithmetic + math utilities |
| Java / Maven | `io.github.tejas-mk2:pijush-calculator` | GitHub Packages | BigDecimal arithmetic + math helpers |
| Java / Gradle | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | GitHub Packages | BigDecimal arithmetic + math helpers |
| .NET / NuGet | `Pijush.Calculator` | GitHub Packages | Decimal arithmetic + math helpers |
| Container | `ghcr.io/tejas-mk2/calculator` | GitHub Container Registry | Application/container distribution |

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
├── styles.css                 # Current solid-surface visual system
├── script.js                  # Sidebar and theme controls
├── calculator-core-ui.js      # Calculator UI state and history
├── packages/calculator-core/  # Advanced JavaScript engine
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

<p align="center"><strong>Simple interface. Serious calculation engine.</strong></p>
