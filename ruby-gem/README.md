# pijush-calculator

Advanced, dependency-free Ruby arithmetic engine for reusable calculator and math applications.

## Engine capabilities

- Addition, subtraction, multiplication, division, modulo, and power
- Percentage, absolute value, min/max, average, clamp, reciprocal
- Square, cube, square root, and cube root
- Factorial
- GCD and LCM
- Sine, cosine, tangent with optional degree mode
- Logarithm, natural logarithm, and exponential
- Combinations and permutations
- Explicit validation and `ZeroDivisionError` handling
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

PijushCalculator.add(2, 3)                 # 5
PijushCalculator.modulo(20, 6)             # 2
PijushCalculator.power(2, 8)               # 256
PijushCalculator.square_root(144)          # 12.0
PijushCalculator.factorial(5)              # 120
PijushCalculator.gcd(84, 30)               # 6
PijushCalculator.sine(90, true)            # 1.0
PijushCalculator.combinations(5, 2)        # 10.0
```

## API

| Method | Purpose |
|---|---|
| `add`, `subtract`, `multiply`, `divide` | Basic arithmetic |
| `modulo`, `power`, `percentage` | Extended arithmetic |
| `absolute`, `minimum`, `maximum`, `average` | Numeric utilities |
| `clamp`, `reciprocal`, `square`, `cube` | Value transformations |
| `square_root`, `cube_root` | Root operations |
| `factorial` | Integer factorial |
| `gcd`, `lcm` | Integer number theory |
| `sine`, `cosine`, `tangent` | Trigonometry |
| `logarithm`, `natural_log`, `exponential` | Exponential/logarithmic math |
| `combinations`, `permutations` | Combinatorics |

## Development

```bash
gem build pijush-calculator.gemspec
gem test
```

## Publishing

Releases are handled through GitHub Actions. Registry credentials must never be committed. Published versions are immutable; every release requires a new version.

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
