# pijush-calculator — Apache Maven

A lightweight, dependency-free Java arithmetic library for calculator applications and small math utilities.

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

GitHub Packages requires authentication for Maven package access. For GitHub Actions, the repository `GITHUB_TOKEN` can be used for packages associated with the workflow repository. citeturn0search0

## Usage

```java
import io.github.tejas_mk2.calculator.Calculator;
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

The project uses GitHub Actions and GitHub Packages' Apache Maven registry. GitHub documents `distributionManagement` with `https://maven.pkg.github.com/OWNER/REPOSITORY` and `mvn deploy` for publishing Maven artifacts. citeturn0search0turn0search2

The publishing workflow uses the repository's `GITHUB_TOKEN`; no package credential should be committed to the repository. GitHub documents `GITHUB_TOKEN` as an authentication option for publishing packages associated with the workflow repository. citeturn0search0

## License

MIT
