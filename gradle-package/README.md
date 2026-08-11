# pijush-calculator-gradle

Advanced, dependency-free Java decimal/scientific engine published to GitHub Packages using Gradle and `maven-publish`.

## Engine capabilities

- Arithmetic: add, subtract, multiply, divide, modulo, power, percentage
- Utilities: absolute, minimum, maximum, average/mean, sum, product, clamp, reciprocal, square, cube
- Roots: square root and cube root
- Number theory: factorial, GCD, LCM, combinations, permutations
- Trigonometry and inverse trigonometry
- Secant, cosecant, cotangent, `atan2`
- Hyperbolic functions
- Logarithms and exponentials
- Hypotenuse calculation
- Statistics: median, variance, standard deviation, range
- `BigDecimal` core arithmetic with `DECIMAL128`
- Null and domain validation
- Java 17 and JUnit 5
- No runtime dependencies

## Coordinates

```text
io.github.tejasmk2.gradle:pijush-calculator-gradle
```

Registry:

```text
https://maven.pkg.github.com/TEJAS-MK2/Calculator
```

## Usage

```java
BigDecimal result = Calculator.add(new BigDecimal("2"), new BigDecimal("3"));
BigDecimal combinations = Calculator.combinations(10, 3);
double angle = Calculator.sine(90, true);
```

## Development

```bash
gradle test
gradle build
```

For local publishing, configure credentials through environment variables and run `gradle publish`.

## CI / Publishing

GitHub Actions runs the JUnit suite, builds the artifact, and publishes the Maven-compatible package to GitHub Packages. Credentials are supplied by the workflow and are never committed.

## Links

- Repository: `https://github.com/TEJAS-MK2/Calculator`
- Packages: `https://github.com/TEJAS-MK2/Calculator/packages`
- Live calculator: `https://tejas-mk2.github.io/Calculator/`

## License

MIT
