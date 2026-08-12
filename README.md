# Modern Calculator

A modern calculator UI backed by serious, reusable calculation engines. The project provides a browser calculator plus calculation engines for JavaScript, Python, Ruby, Java, Gradle, and .NET.

## 1. Overview

Modern Calculator is the interactive front end for a broader calculation-engine project.

**Live GitHub Pages:** https://tejas-mk2.github.io/Calculator/

**Repository:** https://github.com/TEJAS-MK2/Calculator

The calculator is designed to be useful as a browser application while the underlying engines are designed to be reusable in programs, libraries, CLIs, and other applications.

### Demo

![Modern Calculator demo](./calculator-demo-fixed.gif)

## 2. UI

The web UI is a responsive calculator interface with the main calculator kept simple and advanced capabilities available from the sidebar.

The sidebar provides access to the engine and utility panels without overcrowding the main calculator.

The UI includes:

- Standard arithmetic calculator
- Responsive layout
- Dark/light theme support
- Calculation history
- Keyboard input
- Sidebar controls
- Scientific mode
- Statistics tools
- Matrix tools
- Exact arithmetic
- Advanced calculation-engine controls
- PWA/offline support
- Anime.js animation with a local fallback

## 3. Features

### Calculator

- Addition, subtraction, multiplication, and division
- Percentages
- Decimal input
- Backspace and clear controls
- Expression preview
- Keyboard support

### Scientific and advanced mathematics

- Trigonometric functions
- Inverse and hyperbolic functions
- Logarithms and exponentials
- Roots and powers
- Constants and variables
- Scientific notation
- Implicit multiplication
- Statistics
- Number theory
- Combinatorics
- Numerical methods
- Calculus utilities
- Regression and interpolation
- Matrices and vectors

### Exact arithmetic

The JavaScript package also provides a BigInt-backed exact rational arithmetic engine for calculations that should not silently lose integer precision through JavaScript `Number` arithmetic.

### Progressive Web App

The browser application includes a service worker and application shell caching so the calculator can continue to work offline after installation.

## 4. Packages

The repository contains six calculation-engine implementations. Each package is maintained as a reusable engine rather than simply being a copy of the browser calculator.

### JavaScript — `@tejas-mk2/calculator-core`

**Registry:** GitHub Packages — https://github.com/TEJAS-MK2/Calculator/packages  
**Source:** https://github.com/TEJAS-MK2/Calculator/tree/main/packages/calculator-core

Node.js **24+**.

Configure the `@tejas-mk2` npm scope:

```ini
@tejas-mk2:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @tejas-mk2/calculator-core
```

For GitHub Packages authentication, configure npm with a GitHub token that has package read access according to your GitHub Packages policy.

Run the package tests:

```bash
cd packages/calculator-core
npm test
```

Quick usage:

```js
import { evaluate } from '@tejas-mk2/calculator-core';

console.log(evaluate('2 + 3 * 4'));
```

The package also exposes `@tejas-mk2/calculator-core/advanced` and `@tejas-mk2/calculator-core/exact`.

### Python — `pijush-calculator`

**Package:** https://pypi.org/project/pijush-calculator/  
**Source:** https://github.com/TEJAS-MK2/Calculator/tree/main/python-package

Python **3.14+**.

Install:

```bash
pip install pijush-calculator==0.6.0
```

Run the package tests:

```bash
cd python-package
python -m pytest
```

Quick usage:

```python
from pijush_calculator import add

print(add(2, 3))
```

### Ruby — `pijush-calculator`

**Package:** https://rubygems.org/gems/pijush-calculator  
**Source:** https://github.com/TEJAS-MK2/Calculator/tree/main/ruby-gem

Ruby **4.0+**.

Install:

```bash
gem install pijush-calculator -v 0.6.0
```

Run the package tests:

```bash
cd ruby-gem
ruby -Ilib -Itest test/test_pijush_calculator.rb
```

Quick usage:

```ruby
require "pijush_calculator"

puts PijushCalculator.add(2, 3)
```

### Java — Maven — `io.github.tejas-mk2:pijush-calculator`

**Source:** https://github.com/TEJAS-MK2/Calculator/tree/main/java-package  
**GitHub Packages:** https://github.com/TEJAS-MK2/Calculator/packages

Java **25+** and Maven **3.9+**.

Coordinates:

```text
io.github.tejas-mk2:pijush-calculator:0.6.0
```

Add the GitHub Packages repository and dependency to Maven:

```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/TEJAS-MK2/Calculator</url>
  </repository>
</repositories>

<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.6.0</version>
</dependency>
```

Run the package tests:

```bash
cd java-package
mvn test
```

### Java — Gradle — `io.github.tejasmk2.gradle:pijush-calculator-gradle`

**Source:** https://github.com/TEJAS-MK2/Calculator/tree/main/gradle-package  
**GitHub Packages:** https://github.com/TEJAS-MK2/Calculator/packages

Java **25+** and Gradle **9.6.1+**.

Coordinates:

```text
io.github.tejasmk2.gradle:pijush-calculator-gradle:0.6.0
```

Dependency:

```gradle
dependencies {
    implementation "io.github.tejasmk2.gradle:pijush-calculator-gradle:0.6.0"
}
```

GitHub Packages repository:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

Run the package tests:

```bash
cd gradle-package
gradle test
gradle build
```

### .NET — NuGet — `Pijush.Calculator`

**Source:** https://github.com/TEJAS-MK2/Calculator/tree/main/nuget-package  
**GitHub Packages:** https://github.com/TEJAS-MK2/Calculator/packages

.NET **10+**.

Configure GitHub Packages:

```bash
dotnet nuget add source https://nuget.pkg.github.com/TEJAS-MK2/index.json \
  --name github \
  --username YOUR_GITHUB_USERNAME \
  --password YOUR_GITHUB_TOKEN \
  --store-password-in-clear-text
```

Install:

```bash
dotnet add package Pijush.Calculator --version 0.6.0
```

Run the package tests:

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
```

Quick usage:

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
```

## 5. Project Goal

This calculator application is **a hobbyist project**. It is not intended to compete with commercial calculator products or claim to be a production scientific-computing platform.

The main goal of the project is different:

> **Build serious, powerful, reusable calculation engines.**

The browser calculator is the practical demonstration and testing surface. The deeper objective is to develop calculation engines with strong expression parsing, numerical utilities, scientific functions, statistics, combinatorics, matrices, numerical methods, exact arithmetic, explicit error handling, and language-specific APIs.

The long-term direction is to make these engines increasingly capable, reliable, reusable, and useful to developers building their own applications.
