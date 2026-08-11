# pijush-calculator-gradle

Advanced, dependency-free Java arithmetic engine published to GitHub Packages using Gradle and `maven-publish`.

## Engine capabilities

The Gradle engine uses `BigDecimal` with `MathContext.DECIMAL128` for predictable decimal arithmetic.

- Addition, subtraction, multiplication, division, modulo
- Integer power and percentage
- Absolute value, min/max, average, clamp, reciprocal
- Square and cube
- Null validation and division/modulo-by-zero protection
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

BigDecimal result = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
BigDecimal remainder = Calculator.modulo(new BigDecimal("20"), new BigDecimal("6"));
BigDecimal power = Calculator.power(new BigDecimal("2"), 8);
BigDecimal percent = Calculator.percentage(new BigDecimal("250"), new BigDecimal("20"));
```

## API

| Method | Purpose |
|---|---|
| `add`, `subtract`, `multiply`, `divide` | Basic arithmetic |
| `modulo`, `power`, `percentage` | Extended arithmetic |
| `absolute`, `minimum`, `maximum`, `average` | Numeric utilities |
| `clamp`, `reciprocal`, `square`, `cube` | Value transformations |

## Development

```bash
gradle test
gradle build
```

For local publishing, configure credentials through environment variables and run:

```bash
gradle publish
```

## CI / Publishing

GitHub Actions sets up Java 17, runs the JUnit suite, builds the artifact, and publishes the Maven-compatible package to GitHub Packages. Credentials are supplied through GitHub Actions and are never committed.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
