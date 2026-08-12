# pijush-calculator — Apache Maven

Advanced, dependency-free Java numerical engine using `BigDecimal` with `MathContext.DECIMAL128` for core decimal arithmetic and `Math` for scientific operations.

## Requirements

- Java **25+**
- Maven 3.9+
- Zero runtime dependencies

## Features

- Arithmetic, percentages, powers, roots, and numeric utilities
- Factorial, GCD, LCM, combinations, and permutations
- Trigonometric, inverse, and hyperbolic functions
- Logarithms, exponentials, and `atan2`
- Median, variance, standard deviation, and range
- Explicit null, domain, and zero-division validation

## Coordinates

```text
io.github.tejas-mk2:pijush-calculator:0.6.0
```

## GitHub Packages

Repository:

```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/TEJAS-MK2/Calculator</url>
  </repository>
</repositories>
```

Dependency:

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.6.0</version>
</dependency>
```

## Usage

```java
BigDecimal sum = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
BigDecimal power = Calculator.power(new BigDecimal("2"), 10);
double angle = Calculator.sine(90, true);
```

## Development

```bash
cd java-package
mvn test
mvn package
```

GitHub Actions runs the Maven tests on Java 25 before publication.

## Publishing

GitHub Actions publishes to GitHub Packages with the workflow-provided `GITHUB_TOKEN`. Credentials are never stored in source code. Published versions are immutable.

## Links

- Repository: https://github.com/TEJAS-MK2/Calculator
- Packages: https://github.com/TEJAS-MK2/Calculator/packages

## License

MIT
