# Modern Calculator

Modern Calculator is a responsive web calculator with a clean UI, scientific capabilities, reusable calculation engines, persistent history, themes, PWA support, and smooth Anime.js motion.

<p align="center">
  <img src="calculator-demo-fixed.gif" alt="Modern Calculator demo" width="800">
</p>

**Live:** https://tejas-mk2.github.io/Calculator/

## Features

### Core calculator

- Addition, subtraction, multiplication, and division
- Decimal calculations and parentheses
- Unary operators
- Backspace, Clear Entry, and Clear All
- Keyboard support
- Typed error handling

### Scientific calculator

- `sin`, `cos`, `tan`, inverse and hyperbolic trigonometry
- `sqrt`, `cbrt`, roots, `log`, `ln`, `log2`, `exp`, and `pow`
- `abs`, `floor`, `ceil`, `round`
- `min`, `max`, `sum`, `product`, `mean`
- GCD, LCM, factorial, and percentage helpers
- DEG / RAD / GRAD angle modes
- π, e, τ, and φ constants

### Advanced tools

- Exact rational arithmetic
- Statistics and regression
- Matrix operations, determinants, inverse, and transpose
- Numerical methods
- Number theory and combinatorics
- Vector and polynomial utilities

### UI and PWA

- Sidebar-based advanced features
- Dark, Light, and System themes
- Responsive mobile layout
- Persistent calculation history
- Smooth Anime.js interactions
- `prefers-reduced-motion` support
- Installable PWA and offline application-shell caching

### Security

- No `eval()`
- No `Function()` constructor for expression execution
- Strict expression parsing
- Typed calculation errors
- Mathematical domain and finite-number validation

## Packages

The repository currently publishes **7 package targets** through GitHub Actions: Docker/OCI, npm, NuGet, Maven, Gradle/Maven, PyPI, and RubyGems. The reusable calculation engines are versioned at **0.6.0**.

**Package hub:** https://github.com/TEJAS-MK2/Calculator/packages

### 1. Docker / OCI — `calculator`

Container image for the Modern Calculator web application, served by Nginx.

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

### 2. npm / JavaScript — `@tejas-mk2/calculator-core`

Advanced dependency-free JavaScript/ESM calculation engine.

**Version:** `0.6.0`

Install:

```bash
npm install @tejas-mk2/calculator-core
```

Use:

```js
import { evaluate, evaluateExact } from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));
console.log(evaluateExact('1 / 3 + 1 / 6').toString());
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

Test:

```bash
cd packages/calculator-core
npm install
npm test
```

### 3. NuGet / .NET — `Pijush.Calculator`

Dependency-free C# decimal/scientific calculation engine.

**Version:** `0.6.0`  
**Requirement:** .NET 8+

GitHub Packages source:

```text
https://nuget.pkg.github.com/TEJAS-MK2/index.json
```

Install:

```bash
dotnet add package Pijush.Calculator --version 0.6.0
```

Example:

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
Console.WriteLine(Calculator.Power(2m, 10));
Console.WriteLine(Calculator.Sine(90, true));
```

Test and pack:

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

### 4. Maven / Java — `io.github.tejas-mk2:pijush-calculator`

Advanced dependency-free Java engine using `BigDecimal` and `DECIMAL128` precision.

**Version:** `0.6.0`  
**Requirement:** Java 17+

Repository:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

Maven dependency:

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.6.0</version>
</dependency>
```

Build and test:

```bash
cd java-package
mvn test
mvn package
```

### 5. Gradle / Java — `io.github.tejasmk2.gradle:pijush-calculator-gradle`

Gradle-published Java calculation engine.

**Version:** `0.6.0`  
**Requirement:** Java 17+

Repository:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

Gradle dependency:

```gradle
dependencies {
    implementation "io.github.tejasmk2.gradle:pijush-calculator-gradle:0.6.0"
}
```

Build and test:

```bash
cd gradle-package
gradle test
gradle build
```

### 6. PyPI / Python — `pijush-calculator`

Advanced dependency-free Python numerical engine with scientific functions, statistics, combinatorics, and reusable mathematical utilities.

**Version:** `0.6.0`  
**Requirement:** Python 3.9+

Install:

```bash
pip install pijush-calculator==0.6.0
```

Build and test from source:

```bash
cd python-package
python -m pip install -e .
python -m pytest
python -m build
```

### 7. RubyGems / Ruby — `pijush-calculator`

Dependency-free Ruby calculation engine with arithmetic, scientific functions, statistics, combinatorics, and explicit error handling.

**Version:** `0.6.0`  
**Requirement:** Ruby 3.0+

Install:

```bash
gem install pijush-calculator -v 0.6.0
```

Build and test from source:

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
ruby -Ilib -Itest test/test_pijush_calculator.rb
```

## Package summary

| Target | Ecosystem | Package | Version | Build / install |
|---|---|---|---|---|
| Calculator container | Docker / OCI | `ghcr.io/tejas-mk2/calculator` | `latest` / tagged | Docker |
| Calculator core | npm | `@tejas-mk2/calculator-core` | `0.6.0` | npm |
| C# engine | NuGet | `Pijush.Calculator` | `0.6.0` | .NET CLI |
| Java engine | Maven | `io.github.tejas-mk2:pijush-calculator` | `0.6.0` | Maven |
| Java engine | Gradle/Maven | `io.github.tejasmk2.gradle:pijush-calculator-gradle` | `0.6.0` | Gradle |
| Python engine | PyPI | `pijush-calculator` | `0.6.0` | pip |
| Ruby engine | RubyGems | `pijush-calculator` | `0.6.0` | gem |

## Development

Run the browser application locally using a static server or the project's development workflow. Package-specific commands are documented above.

Before publishing a release, all calculation engines must pass their test suites. GitHub Actions validates the engines before publishing packages.

## Project purpose

This Calculator project is primarily a hobbyist project. The browser calculator is the demonstration layer; the long-term focus is building serious, powerful, reusable calculation engines for calculators, applications, CLIs, educational tools, numerical software, and other projects that need reliable mathematical computation.

## License

The main calculator project is licensed under Apache-2.0. The `@tejas-mk2/calculator-core` package, Java package, and .NET package document their own package licenses. The Python and Ruby packages are MIT licensed.

<p align="center"><strong>Simple interface. Serious calculation engine.</strong></p>
