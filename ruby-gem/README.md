# pijush-calculator

Advanced, dependency-free Ruby numerical engine for arithmetic, scientific mathematics, statistics, combinatorics, and reusable applications.

## Requirements

- Ruby **4.0+**
- Zero runtime dependencies

## Features

- Arithmetic, modulo, powers, percentages, and numeric utilities
- Square/cube roots and rounding helpers
- Factorial, GCD, LCM, combinations, permutations
- Trigonometric, inverse, and hyperbolic functions
- Logarithms, exponentials, and hypotenuse calculation
- Median, variance, standard deviation, range, and approximate equality
- Explicit domain and zero-division validation

## Installation

```bash
gem install pijush-calculator -v 0.6.0
```

## Usage

```ruby
require "pijush_calculator"

puts PijushCalculator.add(2, 3)
puts PijushCalculator.square_root(144)
puts PijushCalculator.factorial(6)
puts PijushCalculator.median(9, 2, 7, 4, 5)
puts PijushCalculator.sine(90, true)
```

## Development

```bash
gem build pijush-calculator.gemspec
ruby -Ilib -Itest test/test_pijush_calculator.rb
```

## CI and publishing

GitHub Actions tests the gem on Ruby 4.0 as part of the six-engine test matrix. RubyGems authentication is supplied through a GitHub Actions secret and is never committed to the repository.

Published gem versions are immutable. Release a new version instead of republishing an existing version.

## Package information

| Property | Value |
|---|---|
| Gem | `pijush-calculator` |
| Version | `0.6.0` |
| Engine | Ruby 4.0+ |
| Runtime dependencies | None |
| RubyGems | https://rubygems.org/gems/pijush-calculator |
| Repository | https://github.com/TEJAS-MK2/Calculator |
| License | MIT |

## License

MIT
