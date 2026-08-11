# pijush-calculator — Apache Maven

A lightweight, dependency-free Java arithmetic library for calculator applications and small math utilities, published to **GitHub Packages through Apache Maven**.

## Version

**0.1.0**

## Features

- Addition, subtraction, multiplication, and division
- `BigDecimal` arithmetic
- DECIMAL128 precision
- Explicit division-by-zero handling
- Java 17+
- Zero runtime dependencies

## Package coordinates

```text
io.github.tejas-mk2:pijush-calculator:0.1.0
```

## Installation from GitHub Packages

Add the repository:

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

GitHub Packages Maven artifacts are repository-scoped; package access requires appropriate GitHub authentication and permissions. citeturn0search1

## Usage

```java
import io.github.tejasmk2.calculator.Calculator;
import java.math.BigDecimal;

BigDecimal sum = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
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

GitHub Actions publishes the package to the GitHub Packages Maven registry with the workflow-provided `GITHUB_TOKEN`. Package credentials are never committed to the repository.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
