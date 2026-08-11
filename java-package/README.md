# pijush-calculator — Apache Maven

A lightweight, dependency-free Java arithmetic engine published to GitHub Packages through Apache Maven.

## Engine

The engine uses `BigDecimal` with `MathContext.DECIMAL128` for predictable decimal arithmetic.

### Features

- Addition, subtraction, multiplication, division
- Modulo
- Integer power
- Percentage
- Explicit null validation
- Division/modulo-by-zero protection
- Java 17+
- Zero runtime dependencies

## Package coordinates

```text
io.github.tejas-mk2:pijush-calculator
```

## Installation from GitHub Packages

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
```

Invalid null values raise `NullPointerException`; division and modulo by zero raise `ArithmeticException`.

## API

| Method | Description |
|---|---|
| `add(a, b)` | Adds two values |
| `subtract(a, b)` | Subtracts two values |
| `multiply(a, b)` | Multiplies two values |
| `divide(a, b)` | Divides two values |
| `modulo(a, b)` | Calculates remainder |
| `power(a, exponent)` | Integer exponentiation |
| `percentage(value, percent)` | Calculates a percentage |

## Development

```bash
mvn test
mvn package
```

## Publishing

GitHub Actions publishes the package to GitHub Packages using the workflow-provided `GITHUB_TOKEN`. Package credentials are never committed to the repository. Published versions are immutable.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
