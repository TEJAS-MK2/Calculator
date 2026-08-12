# Modern Calculator

## 1. Overview

Modern Calculator is a responsive web calculator and a home for a growing collection of reusable calculation engines. The browser application provides the user-facing calculator experience, while the package ecosystem focuses on serious, portable mathematical computation.

**GitHub Pages:** https://tejas-mk2.github.io/Calculator/

<p align="center">
  <img src="calculator-demo-fixed.gif" alt="Modern Calculator demo" width="800">
</p>

## 2. UI

The calculator UI is designed to stay simple while keeping advanced functionality available when needed.

- Clean, responsive calculator layout
- Sidebar for advanced features instead of overcrowding the main keypad
- Dark, Light, and System themes
- Scientific and advanced-engine panels
- Persistent calculation history
- Responsive mobile layout
- Keyboard support
- Smooth Anime.js interactions
- Reduced-motion support through `prefers-reduced-motion`
- Installable PWA with offline application-shell caching

## 3. Features

### Core calculator

- Addition, subtraction, multiplication, and division
- Decimal calculations and parentheses
- Unary operators
- Backspace, Clear Entry, and Clear All
- Keyboard input
- Typed calculation errors

### Scientific mathematics

- `sin`, `cos`, `tan`
- Inverse and hyperbolic trigonometry
- `sqrt`, `cbrt`, roots
- `log`, `ln`, `log2`, `exp`, `pow`
- `abs`, `floor`, `ceil`, `round`
- `min`, `max`, `sum`, `product`, `mean`
- GCD, LCM, factorial, combinations, permutations
- DEG / RAD / GRAD angle modes
- π, e, τ, and φ constants

### Advanced calculation engines

- Exact rational arithmetic
- Statistics and regression
- Matrix operations, determinants, inverse, and transpose
- Numerical methods
- Number theory
- Combinatorics
- Vector utilities
- Polynomial utilities
- Scientific calculation helpers

### Security and reliability

- No `eval()`
- No `Function()` constructor for expression execution
- Strict expression parsing
- Mathematical domain validation
- Finite-number validation
- Explicit calculation errors

## 4. Packages

The project publishes reusable calculation engines and the calculator container across **7 package targets**.

**Package hub:** https://github.com/TEJAS-MK2/Calculator/packages

| # | Ecosystem | Package | Version | Engine | Package link |
|---|---|---|---|---|---|
| 1 | Docker / OCI | `ghcr.io/tejas-mk2/calculator` | latest / tagged | Nginx Alpine | https://github.com/TEJAS-MK2/Calculator/pkgs/container/calculator |
| 2 | npm | `@tejas-mk2/calculator-core` | 0.6.0 | Node.js 24+ | https://github.com/TEJAS-MK2/Calculator/packages |
| 3 | NuGet | `Pijush.Calculator` | 0.6.0 | .NET 10+ | https://github.com/TEJAS-MK2/Calculator/packages |
| 4 | Maven | `io.github.tejas-mk2:pijush-calculator` | 0.6.0 | Java 25+ | https://github.com/TEJAS-MK2/Calculator/packages |
| 5 | Gradle / Maven | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | 0.6.0 | Java 25+ / Gradle 9.6.1+ | https://github.com/TEJAS-MK2/Calculator/packages |
| 6 | PyPI | `pijush-calculator` | 0.6.0 | Python 3.14+ | https://pypi.org/project/pijush-calculator/ |
| 7 | RubyGems | `pijush-calculator` | 0.6.0 | Ruby 4.0+ | https://rubygems.org/gems/pijush-calculator |

### 4.1 Docker / OCI

Pull and run the calculator web application:

```bash
docker pull ghcr.io/tejas-mk2/calculator:latest
docker run --rm -p 8080:80 ghcr.io/tejas-mk2/calculator:latest
```

Open `http://localhost:8080`.

Build locally:

```bash
docker build -t calculator .
docker run --rm -p 8080:80 calculator
```

### 4.2 npm — `@tejas-mk2/calculator-core`

**Requirement:** Node.js 24+

Install:

```bash
npm install @tejas-mk2/calculator-core
```

Run/use it from JavaScript:

```js
import { evaluate, evaluateExact } from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));
console.log(evaluateExact('1 / 3 + 1 / 6').toString());
```

Run the package tests:

```bash
cd packages/calculator-core
npm install
npm test
```

Advanced API:

```js
import {
  median,
  variance,
  determinant,
  matrixInverse,
  linearRegression
} from '@tejas-mk2/calculator-core/advanced';
```

### 4.3 NuGet — `Pijush.Calculator`

**Requirement:** .NET 10+

GitHub Packages registry:

```text
https://nuget.pkg.github.com/TEJAS-MK2/index.json
```

Install:

```bash
dotnet add package Pijush.Calculator --version 0.6.0
```

Run/use from a .NET application:

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
Console.WriteLine(Calculator.Power(2m, 10));
```

Run the package tests:

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

### 4.4 Maven — `io.github.tejas-mk2:pijush-calculator`

**Requirement:** Java 25+

GitHub Packages registry:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

Add the dependency:

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.6.0</version>
</dependency>
```

Build and run tests:

```bash
cd java-package
mvn test
mvn package
```

### 4.5 Gradle — `io.github.tejasmk2.gradle:pijush-calculator-gradle`

**Requirement:** Java 25+ and Gradle 9.6.1+

GitHub Packages registry:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

Add the dependency:

```gradle
dependencies {
    implementation "io.github.tejasmk2.gradle:pijush-calculator-gradle:0.6.0"
}
```

Build and run tests:

```bash
cd gradle-package
gradle test
gradle build
```

### 4.6 PyPI — `pijush-calculator`

**Requirement:** Python 3.14+

Install:

```bash
pip install pijush-calculator==0.6.0
```

Use it:

```python
from pijush_calculator import add, square_root, factorial

print(add(2, 3))
print(square_root(144))
print(factorial(6))
```

Build and run tests from the repository:

```bash
cd python-package
python -m pip install -e .
python -m pytest
python -m build
```

### 4.7 RubyGems — `pijush-calculator`

**Requirement:** Ruby 4.0+

Install:

```bash
gem install pijush-calculator -v 0.6.0
```

Use it:

```ruby
require "pijush_calculator"

puts PijushCalculator.add(2, 3)
puts PijushCalculator.square_root(144)
puts PijushCalculator.factorial(6)
```

Build and run tests from the repository:

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
ruby -Ilib -Itest test/test_pijush_calculator.rb
```

### Package engine matrix

| Package | Minimum engine |
|---|---|
| npm / JavaScript | Node.js 24+ |
| PyPI / Python | Python 3.14+ |
| RubyGems / Ruby | Ruby 4.0+ |
| Maven / Java | Java 25+ |
| Gradle / Java | Java 25+ / Gradle 9.6.1+ |
| NuGet / .NET | .NET 10+ |
| Docker / OCI | Nginx Alpine |

## 5. Project purpose

**Modern Calculator is primarily a hobbyist project.** The browser calculator is the practical demonstration and user interface, but the main aim of the project is much bigger: **to create serious, powerful, reusable calculation engines**.

The long-term direction is to make these engines useful as independent building blocks for calculators, applications, CLIs, educational software, numerical tools, scientific utilities, and other projects that need reliable mathematical computation.

The UI is the front door. **The calculation engines are the main project.**

## License

The main calculator project is licensed under Apache-2.0. Individual packages document their own package licenses in their package directories.

<p align="center"><strong>Simple interface. Serious calculation engines.</strong></p>
