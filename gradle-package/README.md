# pijush-calculator-gradle

A lightweight Java arithmetic engine published to GitHub Packages using Gradle and `maven-publish`.

## Engine

The Gradle package uses `BigDecimal` with `MathContext.DECIMAL128` for predictable decimal arithmetic.

### Features

- Addition, subtraction, multiplication, division
- Modulo
- Integer power
- Percentage
- Null validation
- Division/modulo-by-zero protection
- Java 17
- JUnit 5 tests
- No runtime dependencies

## Package coordinates

```text
io.github.tejasmk2.gradle:pijush-calculator-gradle
```

GitHub Packages Maven-compatible registry:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

## Usage

```java
import io.github.tejasmk2.gradle.calculator.Calculator;
import java.math.BigDecimal;

BigDecimal result = Calculator.add(
    new BigDecimal("2"),
    new BigDecimal("3")
);

BigDecimal remainder = Calculator.modulo(
    new BigDecimal("20"),
    new BigDecimal("6")
);
```

## API

| Method | Description |
|---|---|
| `add(a, b)` | Adds values |
| `subtract(a, b)` | Subtracts values |
| `multiply(a, b)` | Multiplies values |
| `divide(a, b)` | Divides values |
| `modulo(a, b)` | Calculates remainder |
| `power(a, exponent)` | Integer exponentiation |
| `percentage(value, percent)` | Calculates a percentage |

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

The workflow sets up Java 17, runs the JUnit suite, builds the artifact, and publishes the Maven-compatible package to GitHub Packages. Credentials are supplied through GitHub Actions and are not committed to the repository.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
