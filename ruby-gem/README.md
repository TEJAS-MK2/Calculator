# pijush-calculator

A **lightweight, dependency-free Ruby arithmetic library** for reusable calculator operations.

## Current release

**v0.1.2 — Ruby arithmetic engine**

The gem is independent of the web UI and exposes a small, predictable API for basic arithmetic.

## Features

- Addition, subtraction, multiplication, and division
- Explicit `ZeroDivisionError` handling
- Ruby 3.0+
- Zero runtime dependencies
- Simple module-based API

## Installation

From RubyGems.org:

```bash
gem install pijush-calculator
```

From GitHub Packages RubyGems:

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

GitHub Packages RubyGems uses the `rubygems.pkg.github.com` registry and requires authentication for package access.

## Usage

```ruby
require "pijush_calculator"

PijushCalculator.add(2, 3)        # 5
PijushCalculator.subtract(8, 3)   # 5
PijushCalculator.multiply(4, 6)   # 24
PijushCalculator.divide(20, 5)    # 4.0
```

Division by zero raises `ZeroDivisionError`.

## API

| Method | Result |
|---|---|
| `PijushCalculator.add(a, b)` | `a + b` |
| `PijushCalculator.subtract(a, b)` | `a - b` |
| `PijushCalculator.multiply(a, b)` | `a * b` |
| `PijushCalculator.divide(a, b)` | Floating-point quotient; raises on zero divisor |

## Development

```bash
gem build pijush-calculator.gemspec
gem specification pijush-calculator-0.1.2.gem
gem install ./pijush-calculator-0.1.2.gem
```

## Publishing

Releases are handled through GitHub Actions. Registry credentials and tokens must never be committed to source code or workflow files.

Published package versions are immutable, so future releases must use a new version number.

## Package information

| Property | Value |
|---|---|
| Gem | `pijush-calculator` |
| Version | `0.1.2` |
| RubyGems | `https://rubygems.org/gems/pijush-calculator` |
| GitHub Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| Runtime dependencies | None |
| Supported Ruby | 3.0+ |
| License | MIT |

## License

MIT
