# Modern Calculator

<p align="center">
  <strong>A modern, responsive calculator with a reusable scientific calculation engine and packages for JavaScript, Ruby, Python, Java, and .NET.</strong><br>
  HTML · CSS · JavaScript · Anime.js · npm · RubyGems · PyPI · Maven · Gradle · NuGet · Docker
</p>

<p align="center">
  <a href="https://tejas-mk2.github.io/Calculator/">Live Demo</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/issues">Report a Bug</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/pulls">Contribute</a> ·
  <a href="https://github.com/TEJAS-MK2/Calculator/packages">GitHub Packages</a>
</p>

---

## Overview

Modern Calculator is a responsive Progressive Web App backed by reusable calculation libraries. It provides everyday arithmetic, scientific operations, history, memory, keyboard input, themes, responsive controls, and package integrations across multiple ecosystems.

The calculator avoids `eval()` and `Function()` for expression execution and respects `prefers-reduced-motion` for accessible animations.

## Highlights

- Modern mobile-first calculator UI
- Dark, light, and system themes
- History, memory, clear, and keyboard controls
- Operator precedence, nested parentheses, implicit multiplication, percentages, modulo, powers, and scientific notation
- Scientific functions, constants, variables, and DEG/RAD/GRAD angle modes
- Exact rational arithmetic where supported
- Typed calculation errors and explicit division-by-zero handling
- Anime.js interactions with reduced-motion support
- PWA and service-worker support
- Reusable packages with automated CI and publishing workflows

## Package ecosystem

| Ecosystem | Package | Registry / distribution |
|---|---|---|
| JavaScript | `@tejas-mk2/calculator-core` | [npm](https://www.npmjs.com/package/@tejas-mk2/calculator-core) / [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages) |
| Ruby | `pijush-calculator` | [RubyGems](https://rubygems.org/gems/pijush-calculator) / GitHub Packages RubyGems |
| Python | `pijush-calculator` | [PyPI](https://pypi.org/project/pijush-calculator/) |
| Java / Maven | `io.github.tejas-mk2:pijush-calculator` | [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages) |
| Java / Gradle | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages) |
| .NET / NuGet | `Pijush.Calculator` | [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages) |
| Container | `ghcr.io/tejas-mk2/calculator` | [GitHub Container Registry](https://github.com/TEJAS-MK2/Calculator/packages) |

GitHub Packages officially supports npm, RubyGems, Maven, Gradle, NuGet, and container images; Maven and Gradle use the Maven-compatible GitHub Packages registry. citeturn0search0turn0search1

## Installation

### JavaScript

```bash
npm install @tejas-mk2/calculator-core
```

For GitHub Packages:

```text
@tejas-mk2:registry=https://npm.pkg.github.com
```

### Ruby

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
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

Repository:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
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

## Calculator controls

| Category | Operations |
|---|---|
| Arithmetic | `+` `−` `×` `÷` `%` |
| Input | `0–9` `.` |
| Controls | `AC` `C` `Backspace` `=` |
| Scientific | Functions, powers, constants, angle modes |
| Memory | `MC` `MR` `M+` `M−` `MS` |
| History | Open, reuse, and clear calculations |
| Theme | Dark, Light, System |

## Keyboard shortcuts

| Key | Action |
|---|---|
| `0–9` | Enter number |
| `+` `-` `*` `/` `%` | Operators |
| `.` | Decimal point |
| `Enter` / `=` | Calculate |
| `Backspace` | Delete last input |
| `Escape` | Clear all |
| `C` | Clear current input |

## Development

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
```

Use a local HTTP server when testing ES modules, PWA behavior, or service workers.

### JavaScript

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

## Documentation and policies

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`SECURITY.md`](./SECURITY.md)
- [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md)
- [`packages/calculator-core/README.md`](./packages/calculator-core/README.md)
- [`ruby-gem/README.md`](./ruby-gem/README.md)
- [`python-package/README.md`](./python-package/README.md)
- [`java-package/README.md`](./java-package/README.md)
- [`gradle-package/README.md`](./gradle-package/README.md)
- [`nuget-package/README.md`](./nuget-package/README.md)

## License

The main calculator is licensed under Apache-2.0. Each package directory documents its applicable package license.

---

<p align="center"><strong>Calculate with style.</strong></p>
