# pijush-calculator-gradle

A lightweight Java arithmetic library published to **GitHub Packages using Gradle**.

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

Repository:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

GitHub's Gradle registry publishes Java artifacts using Gradle's `maven-publish` plugin and the `gradle publish` task. The repository-scoped package uses the workflow's `GITHUB_TOKEN` for publishing. citeturn1search2turn1search7

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
gradle publish
```

For GitHub Packages authentication, configure `USERNAME` and `GITHUB_TOKEN` in the environment when publishing locally. GitHub Actions can use the workflow-provided `GITHUB_TOKEN` with `packages: write`. citeturn0search0turn1search2

## License

MIT
