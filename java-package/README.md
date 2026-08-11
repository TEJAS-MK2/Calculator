# pijush-calculator — Apache Maven

Advanced, dependency-free Java arithmetic engine published to GitHub Packages through Apache Maven.

## Engine capabilities

The engine uses `BigDecimal` with `MathContext.DECIMAL128` for predictable decimal arithmetic.

- Addition, subtraction, multiplication, division, modulo
- Integer power and percentage
- Absolute value, min/max, average, clamp, reciprocal
- Square and cube
- Explicit null validation
- Division/modulo-by-zero protection
- Java 17+
- Zero runtime dependencies

## Package coordinates

```text
io.github.tejas-mk2:pijush-calculator
```

## Installation

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
  <version>YOUR_VERSION</version>
</dependency>
```

GitHub Packages Maven artifacts are repository-scoped and require appropriate authentication and package permissions.

## Usage

```java
import io.github.tejasmk2.calculator.Calculator;
import java.math.BigDecimal;

BigDecimal sum = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
BigDecimal remainder = Calculator.modulo(new BigDecimal("20"), new BigDecimal("6"));
BigDecimal power = Calculator.power(new BigDecimal("2"), 8);
BigDecimal percent = Calculator.percentage(new BigDecimal("250"), new BigDecimal("20"));
BigDecimal clamped = Calculator.clamp(new BigDecimal("120"), BigDecimal.ZERO, new BigDecimal("100"));
```

## API

| Method | Purpose |
|---|---|
| `add`, `subtract`, `multiply`, `divide` | Basic arithmetic |
| `modulo`, `power`, `percentage` | Extended arithmetic |
| `absolute`, `minimum`, `maximum`, `average` | Numeric utilities |
| `clamp`, `reciprocal`, `square`, `cube` | Value transformations |

Null values raise `NullPointerException`; division and modulo by zero raise `ArithmeticException`.

## Development

```bash
mvn test
mvn package
```

## Publishing

GitHub Actions publishes the artifact to GitHub Packages using the workflow-provided `GITHUB_TOKEN`. Credentials are never committed. Published versions are immutable.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
