# pijush-calculator — Apache Maven

Advanced, dependency-free Java decimal/scientific engine published to GitHub Packages through Apache Maven.

## Engine capabilities

Uses `BigDecimal` with `MathContext.DECIMAL128` for core decimal operations and `Math` for scientific functions.

- Arithmetic: add, subtract, multiply, divide, modulo, power, percentage
- Utilities: absolute, minimum, maximum, average/mean, sum, product, clamp, reciprocal, square, cube
- Roots: square root and cube root
- Number theory: factorial, GCD, LCM, combinations, permutations
- Trigonometry: sine, cosine, tangent, secant, cosecant, cotangent
- Inverse trigonometry and `atan2`
- Hyperbolic sine, cosine, tangent
- Logarithms, natural logarithm, exponentials
- Multi-value hypotenuse
- Statistics: median, population variance, standard deviation, range
- Explicit null, domain, and zero-division validation
- Java 17+
- Zero runtime dependencies

## Coordinates

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

## Usage

```java
BigDecimal sum = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
BigDecimal power = Calculator.power(new BigDecimal("2"), 10);
double angle = Calculator.sine(90, true);
BigDecimal median = Calculator.median(new BigDecimal("9"), new BigDecimal("2"), new BigDecimal("7"));
```

## Development

```bash
mvn test
mvn package
```

## Publishing

GitHub Actions publishes the package to GitHub Packages using the workflow-provided `GITHUB_TOKEN`. Published versions are immutable and credentials are never committed.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
