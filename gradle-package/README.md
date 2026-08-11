# pijush-calculator-gradle

A lightweight Java arithmetic library published to **GitHub Packages using Gradle** and Gradle's `maven-publish` plugin.

## Version

**0.1.0**

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit division-by-zero handling
- `BigDecimal` arithmetic with `DECIMAL128` precision
- Java 17
- JUnit 5 tests
- No runtime dependencies

## Package coordinates

```text
io.github.tejasmk2.gradle:pijush-calculator-gradle:0.1.0
```

## GitHub Packages

The package is published to the repository's Maven-compatible GitHub Packages registry:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

GitHub Actions publishes it with the workflow-provided `GITHUB_TOKEN` and `packages: write` permission. No credentials are stored in the repository.

## Usage

```java
import io.github.tejasmk2.gradle.calculator.Calculator;
import java.math.BigDecimal;

BigDecimal result = Calculator.add(
    new BigDecimal("2"),
    new BigDecimal("3")
);

System.out.println(result); // 5
```

## Development

From the `gradle-package` directory:

```bash
gradle test
gradle build
```

For local GitHub Packages publishing, configure `USERNAME` and `GITHUB_TOKEN` in the environment, then run:

```bash
gradle publish
```

## CI / Publishing

The repository workflow:

1. Sets up Java 17.
2. Sets up Gradle.
3. Runs the JUnit test suite.
4. Builds the package.
5. Publishes the Maven-compatible artifact to GitHub Packages.

## Links

- [Calculator repository](https://github.com/TEJAS-MK2/Calculator)
- [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages)
- [Live calculator](https://tejas-mk2.github.io/Calculator/)

## License

MIT
