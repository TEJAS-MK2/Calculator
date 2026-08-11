# pijush-calculator

Advanced, dependency-free Ruby numerical engine for calculator, scientific-math, statistics, and reusable application tooling.

## Engine capabilities

- Basic arithmetic: add, subtract, multiply, divide, modulo, power, percentage
- Utilities: absolute, min/max, average/mean, sum, product, clamp, reciprocal, square, cube
- Roots: square root and cube root
- Number theory: factorial, GCD, LCM, combinations, permutations
- Trigonometry: sine, cosine, tangent, secant, cosecant, cotangent
- Inverse trigonometry with optional degree output
- Hyperbolic sine, cosine, tangent
- Logarithms and exponentials
- Multi-value hypotenuse calculation
- Statistics: median, population variance, standard deviation, range
- Approximate equality helper with configurable tolerance
- Explicit domain and zero-division validation
- Ruby 3.0+
- Zero runtime dependencies

## Installation

```bash
gem install pijush-calculator
```

GitHub Packages:

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

## Usage

```ruby
require "pijush_calculator"

PijushCalculator.add(2, 3)              # 5
PijushCalculator.square_root(144)       # 12.0
PijushCalculator.factorial(6)           # 720
PijushCalculator.median(9, 2, 7, 4, 5) # 5
PijushCalculator.sine(90, true)         # 1.0
```

## API

| Group | Methods |
|---|---|
| Arithmetic | `add`, `subtract`, `multiply`, `divide`, `modulo`, `power`, `percentage` |
| Utilities | `absolute`, `minimum`, `maximum`, `average`, `mean`, `sum`, `product`, `clamp`, `reciprocal` |
| Roots | `square_root`, `cube_root`, `square`, `cube` |
| Number theory | `factorial`, `gcd`, `lcm`, `combinations`, `permutations` |
| Trigonometry | `sine`, `cosine`, `tangent`, `secant`, `cosecant`, `cotangent` |
| Inverse trig | `arcsine`, `arccosine`, `arctangent` |
| Scientific | `logarithm`, `natural_log`, `exponential`, `hypot` |
| Statistics | `median`, `variance`, `standard_deviation`, `range` |

## Development

```bash
gem build pijush-calculator.gemspec
gem test
```

## Publishing

Releases are handled through GitHub Actions. Published versions are immutable; every release requires a new version. Credentials must never be committed.

## Package information

| Property | Value |
|---|---|
| Gem | `pijush-calculator` |
| RubyGems | `https://rubygems.org/gems/pijush-calculator` |
| GitHub Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| Runtime dependencies | None |
| Supported Ruby | 3.0+ |
| License | MIT |

## License

MIT
