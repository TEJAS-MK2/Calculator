# pijush-calculator-gradle

Advanced, dependency-free Java numerical engine published to GitHub Packages with Gradle and `maven-publish`.

## Requirements

- Java **25+**
- Gradle **9.6.1+**
- JUnit 5 for tests
- Zero runtime dependencies

## Features

- Decimal arithmetic with `BigDecimal` / `DECIMAL128`
- Arithmetic, percentages, powers, roots, and numeric utilities
- Factorial, GCD, LCM, combinations, permutations
- Trigonometric, inverse, and hyperbolic functions
- Logarithms and exponentials
- Statistics including median, variance, standard deviation, and range
- Matrix/vector utilities and explicit domain validation

## Coordinates

```text
io.github.tejasmk2.gradle:pijush-calculator-gradle:0.6.0
```

Repository:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

## Gradle dependency

```gradle
dependencies {
    implementation "io.github.tejasmk2.gradle:pijush-calculator-gradle:0.6.0"
}
```

## Development

```bash
cd gradle-package
gradle test
gradle build
```

## CI and publishing

GitHub Actions tests the engine on Java 25 and Gradle 9.6.1, then publishes the Maven-compatible artifact to GitHub Packages. Credentials are provided by the workflow and are never committed.

Published versions are immutable. Existing versions are treated as safe duplicates by the release workflow.

## Links

- Repository: https://github.com/TEJAS-MK2/Calculator
- Packages: https://github.com/TEJAS-MK2/Calculator/packages

## License

MIT
