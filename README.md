# Modern Calculator

## 1. Overview

Modern Calculator is a responsive web calculator with a clean UI, scientific capabilities, an advanced calculation engine, persistent history, themes, PWA support, and smooth Anime.js motion.

**Live on GitHub Pages:**

**https://tejas-mk2.github.io/Calculator/**

### Demo

<p align="center">
  <img src="./calculator-demo-fixed.gif" alt="Modern Calculator demo" width="360">
</p>

The project is built with HTML, CSS, and JavaScript and is deployed using GitHub Pages.

---

## 2. UI

The UI is designed to keep the everyday calculator simple while making advanced functionality accessible from the sidebar.

- Clean, responsive calculator interface
- Sidebar-based feature navigation
- Feature modes transform the calculator instead of opening separate sidebar panels
- Dark, Light, and System themes
- Responsive mobile layout
- Keyboard support
- Calculation history
- Smooth Anime.js interactions
- Subtle result animations without answer jitter
- Ripple and button interaction effects
- `prefers-reduced-motion` support
- PWA/offline support

The main calculator stays focused on everyday calculations, while advanced tools are available when needed.

---

## 3. Features

### Core calculator

- Addition, subtraction, multiplication, and division
- Decimal calculations
- Parentheses
- Unary operators
- Backspace, Clear Entry, and Clear All
- Keyboard input
- Error handling

### Scientific calculator

- `sin`, `cos`, `tan`
- Inverse and hyperbolic trigonometry
- `sqrt`, `cbrt`, and roots
- `log`, `ln`, `log2`
- `exp`, `pow`
- `abs`, `floor`, `ceil`, `round`
- `min`, `max`, `sum`, `product`, `mean`
- GCD / LCM
- Factorial and percentage helpers
- DEG / RAD / GRAD angle modes
- Mathematical constants such as π, e, τ, and φ

### Advanced tools

- Exact rational arithmetic
- Statistics
- Mean, median, variance, and standard deviation
- Matrix operations
- Determinant, inverse, and transpose
- Numerical methods
- Regression
- Number theory
- Combinatorics
- Vector and matrix utilities
- Interpolation and polynomial utilities

### History & themes

- Persistent calculation history
- Quick result recall
- Dark, Light, and System themes
- Theme-aware feature panels and controls

### PWA

- Installable web application
- Service-worker support
- Offline application-shell caching

### Security

- No `eval()`
- No `Function()` constructor for expression execution
- Strict expression parsing
- Typed calculation errors
- Mathematical domain and finite-number validation

---

## 4. Packages

The repository has **6 published GitHub Packages entries** covering the web application container and reusable calculation engines across JavaScript, Java/Maven, Gradle, and .NET.

**All published packages:**

https://github.com/TEJAS-MK2/Calculator/packages

### 4.1 `calculator` — Docker / OCI container

Container image for the Modern Calculator web application, served by Nginx.

**Package:**

https://github.com/TEJAS-MK2/Calculator/packages

**Image:**

```text
ghcr.io/tejas-mk2/calculator:latest
```

**Pull:**

```bash
docker pull ghcr.io/tejas-mk2/calculator:latest
```

**Run:**

```bash
docker run --rm -p 8080:80 ghcr.io/tejas-mk2/calculator:latest
```

Then open `http://localhost:8080`.

**Build locally:**

```bash
docker build -t calculator .
docker run --rm -p 8080:80 calculator
```

The container exposes port `80` and contains the calculator UI plus the browser calculation engine.

---

### 4.2 `@tejas-mk2/calculator-core` — npm / JavaScript

The main reusable JavaScript/ESM calculation engine. It provides expression parsing, scientific functions, exact rational arithmetic, statistics, numerical methods, regression, vectors, matrices, and number theory.

**npm:**

https://www.npmjs.com/package/@tejas-mk2/calculator-core

**Source:**

https://github.com/TEJAS-MK2/Calculator/tree/main/packages/calculator-core

**GitHub Packages:**

https://github.com/TEJAS-MK2/Calculator/packages

**Install from npm:**

```bash
npm install @tejas-mk2/calculator-core
```

**Use it:**

```js
import { evaluate, evaluateExact } from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));
console.log(evaluateExact('1 / 3 + 1 / 6').toString());
```

**Advanced API:**

```js
import {
  median,
  variance,
  determinant,
  matrixInverse,
  linearRegression
} from '@tejas-mk2/calculator-core/advanced';
```

**Install from GitHub Packages:**

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

```bash
npm install @tejas-mk2/calculator-core
```

**Run tests:**

```bash
cd packages/calculator-core
npm install
npm test
```

**Inspect the package:**

```bash
npm pack --dry-run
```

---

### 4.3 `Pijush.Calculator` — NuGet / .NET

Dependency-free C# decimal/scientific calculation engine for .NET applications.

**Package:**

`Pijush.Calculator`

**GitHub Packages:**

https://github.com/TEJAS-MK2/Calculator/packages

**Registry:**

```text
https://nuget.pkg.github.com/TEJAS-MK2/index.json
```

**Requirements:** .NET 8+

**Configure the GitHub Packages source:**

```bash
dotnet nuget add source https://nuget.pkg.github.com/TEJAS-MK2/index.json \
  --name github \
  --username YOUR_GITHUB_USERNAME \
  --password YOUR_GITHUB_TOKEN \
  --store-password-in-clear-text
```

**Install:**

```bash
dotnet add package Pijush.Calculator --version YOUR_VERSION
```

**Use it:**

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
Console.WriteLine(Calculator.Power(2m, 10));
Console.WriteLine(Calculator.Sine(90, true));
```

**Test and build the package from this repository:**

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

**Run it in an application:**

```bash
dotnet run
```

The package is a library, so `dotnet run` is executed from a consuming console/application project after adding the package reference.

---

### 4.4 `pijush-calculator` — Apache Maven / Java

Advanced dependency-free Java decimal/scientific engine using `BigDecimal` with `DECIMAL128` precision.

**Coordinates:**

```text
io.github.tejas-mk2:pijush-calculator:0.1.1
```

**GitHub Packages:**

https://github.com/TEJAS-MK2/Calculator/packages

**Maven registry:**

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

**Requirements:** Java 17+

**Add the repository:**

```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/TEJAS-MK2/Calculator</url>
  </repository>
</repositories>
```

**Add the dependency:**

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.1.1</version>
</dependency>
```

**Build and test:**

```bash
cd java-package
mvn test
mvn package
```

**Run a consuming Java application:**

```bash
mvn compile
mvn exec:java -Dexec.mainClass="your.package.Main"
```

The package itself is a Java library; `mvn package` builds the JAR and `mvn exec:java` runs a consuming application when the Maven Exec plugin is configured.

---

### 4.5 `io.github.tejasmk2.gradle.pijush-calculator-gradle` — Gradle / Java

Gradle-published Java calculation engine. The GitHub Packages entry corresponds to the Gradle publication:

```text
io.github.tejasmk2.gradle:pijush-calculator-gradle:0.1.1
```

**GitHub Packages:**

https://github.com/TEJAS-MK2/Calculator/packages

**Maven-compatible registry:**

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

**Requirements:** Java 17+

**Add the repository:**

```gradle
repositories {
    maven {
        url = uri("https://maven.pkg.github.com/TEJAS-MK2/Calculator")
        credentials {
            username = System.getenv("USERNAME")
            password = System.getenv("GITHUB_TOKEN")
        }
    }
}
```

**Add the dependency:**

```gradle
dependencies {
    implementation "io.github.tejasmk2.gradle:pijush-calculator-gradle:0.1.1"
}
```

**Build and test:**

```bash
cd gradle-package
gradle test
gradle build
```

**Run a consuming Gradle application:**

```bash
gradle run
```

Use `gradle run` from a Gradle application project after adding the library dependency and configuring the `application` plugin/main class.

---

### 4.6 `io.github.tejas-mk2.pijush-calculator` — Java/Maven GitHub Packages entry

This is the GitHub Packages entry associated with the Java Maven publication of `pijush-calculator`.

**GitHub Packages:**

https://github.com/TEJAS-MK2/Calculator/packages

**Maven coordinates:**

```text
io.github.tejas-mk2:pijush-calculator:0.1.1
```

**Registry:**

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

**Install in Maven:**

```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/TEJAS-MK2/Calculator</url>
  </repository>
</repositories>
```

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.1.1</version>
</dependency>
```

**Build/test the source:**

```bash
cd java-package
mvn test
mvn package
```

This publication uses the same Java calculation engine and Maven registry; the package name shown by GitHub Packages can differ from the Maven group/artifact coordinate.

---

### Package summary

| Published package | Ecosystem | Install / build tool | Main purpose |
|---|---|---|---|
| `calculator` | Docker / OCI | Docker | Containerized web calculator |
| `@tejas-mk2/calculator-core` | npm | npm | JavaScript/ESM calculation engine |
| `Pijush.Calculator` | NuGet | .NET CLI | C# calculation engine |
| `pijush-calculator` | Maven | Maven | Java calculation engine |
| `io.github.tejasmk2.gradle.pijush-calculator-gradle` | Gradle/Maven | Gradle | Gradle-published Java engine |
| `io.github.tejas-mk2.pijush-calculator` | Maven/Java | Maven | Java GitHub Packages publication entry |

**Package hub:**

https://github.com/TEJAS-MK2/Calculator/packages

---

## 5. Project Purpose

This Calculator project is **primarily a hobbyist project**.

The browser calculator is a practical way to experiment with UI design, interaction, PWA development, testing, and JavaScript. However, the **main goal of the project is not to build the world's most advanced calculator UI**.

The main goal is to create **serious, powerful, reusable calculation engines**.

The calculation engine is intended to grow into a capable mathematical foundation for calculators, applications, CLIs, educational tools, numerical software, and other projects that need reliable mathematical computation.

The UI is the demonstration layer. The **calculation engine is the long-term focus**.

---

## License

The main calculator project is licensed under Apache-2.0. The `@tejas-mk2/calculator-core` package is licensed under MIT. The Java and .NET calculation packages document their own package licenses.

---

<p align="center"><strong>Simple interface. Serious calculation engine.</strong></p>
