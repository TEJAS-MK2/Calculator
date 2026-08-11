# pijush-calculator — Apache Maven

A lightweight Java arithmetic library for calculator applications and small math utilities, published to **GitHub Packages through Apache Maven**.

## Version

**0.1.0**

## Features

- Addition
- Subtraction
- Multiplication
- Division
- `BigDecimal` arithmetic
- DECIMAL128 precision for operations
- Explicit division-by-zero handling
- Java 17+
- Zero runtime dependencies

## Package coordinates

```text
io.github.tejas-mk2:pijush-calculator:0.1.0
```

## Installation from GitHub Packages

Add the GitHub Packages Maven repository to your Maven project:

```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/TEJAS-MK2/Calculator</url>
  </repository>
</repositories>
```

Then add the dependency:

```xml
<dependency>
  <groupId>io.github.tejas-mk2</groupId>
  <artifactId>pijush-calculator</artifactId>
  <version>0.1.0</version>
</dependency>
```

GitHub Packages requires authentication for package access. In GitHub Actions, the repository `GITHUB_TOKEN` can be used with the required `packages: write` or `packages: read` permission.

## Usage

```java
import io.github.tejasmk2.calculator.Calculator;
import java.math.BigDecimal;

BigDecimal sum = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
BigDecimal product = Calculator.multiply(new BigDecimal("4"), new BigDecimal("6"));
BigDecimal quotient = Calculator.divide(new BigDecimal("20"), new BigDecimal("5"));
```

Division by zero raises `ArithmeticException`.

## API

| Method | Description |
|---|---|
| `Calculator.add(a, b)` | Adds two `BigDecimal` values |
| `Calculator.subtract(a, b)` | Subtracts the second value from the first |
| `Calculator.multiply(a, b)` | Multiplies two values |
| `Calculator.divide(a, b)` | Divides the first value by the second |

## Development

```bash
mvn test
mvn package
```

## Publishing

The package is published to the **GitHub Packages Maven registry** by GitHub Actions. The workflow uses the repository-provided `GITHUB_TOKEN`; package credentials are never committed to the repository.

## Links

- [Calculator repository](https://github.com/TEJAS-MK2/Calculator)
- [GitHub Packages](https://github.com/TEJAS-MK2/Calculator/packages)
- [Live calculator](https://tejas-mk2.github.io/Calculator/)

## License

MIT
