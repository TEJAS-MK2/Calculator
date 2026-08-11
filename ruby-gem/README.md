# pijush-calculator

A lightweight, dependency-free Ruby arithmetic engine for reusable calculator and math applications.

## Current engine

The Ruby engine now provides a consistent arithmetic API with explicit error handling.

### Features

- Addition, subtraction, multiplication, division
- Modulo
- Power
- Percentage
- Absolute value, min/max, average, clamp, reciprocal, square, and cube helpers
- Explicit `ZeroDivisionError` handling
- Ruby 3.0+
- Zero runtime dependencies
- Simple module-based API

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

PijushCalculator.add(2, 3)        # 5
PijushCalculator.subtract(8, 3)   # 5
PijushCalculator.multiply(4, 6)   # 24
PijushCalculator.divide(20, 5)    # 4.0
PijushCalculator.modulo(20, 6)    # 2
PijushCalculator.power(2, 8)      # 256
PijushCalculator.percentage(250, 20) # 50.0
```

Division and modulo by zero raise `ZeroDivisionError`.

## API

| Method | Result |
|---|---|
| `add(a, b)` | Sum |
| `subtract(a, b)` | Difference |
| `multiply(a, b)` | Product |
| `divide(a, b)` | Quotient |
| `modulo(a, b)` | Remainder |
| `power(a, b)` | Power |
| `percentage(value, percent)` | Percentage value |

Additional utility helpers are available in the engine for common arithmetic operations.

## Development

```bash
gem build pijush-calculator.gemspec
gem test
```

## Publishing

Releases are handled through GitHub Actions. Registry credentials must never be committed to source code or workflow files. Published versions are immutable; every release requires a new version.

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
