# pijush-calculator-gradle

A lightweight Java arithmetic library published to **GitHub Packages using Gradle** and Gradle's `maven-publish` plugin.

## Version

**0.1.0**

## Features

- Addition, subtraction, multiplication, and division
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

GitHub's Gradle registry is Maven-compatible and uses repository-scoped permissions for Gradle packages. citeturn0search1turn0search8

## Usage

```java
import io.github.tejasmk2.gradle.calculator.Calculator;
import java.math.BigDecimal;

BigDecimal result = Calculator.add(
    new BigDecimal("2"),
    new BigDecimal("3")
);
```

## Development

```bash
gradle test
gradle build
```

For local publishing, configure `USERNAME` and `GITHUB_TOKEN`, then run:

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

No package credentials are committed to the repository.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
