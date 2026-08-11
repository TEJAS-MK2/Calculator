# pijush-calculator

A **lightweight, dependency-free Ruby arithmetic library** for reusable calculator operations.

## Current release

**v0.1.2 — Ruby arithmetic engine**

This gem is independent of the web UI and provides a small, predictable API for basic arithmetic.

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit `ZeroDivisionError` handling
- Ruby 3.0+
- Zero runtime dependencies
- Simple module-based API

## Installation

The gem is distributed through GitHub Packages RubyGems:

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
```

Division by zero is explicit:

```ruby
PijushCalculator.divide(10, 0)
# ZeroDivisionError: cannot divide by zero
```

## API

### `PijushCalculator.add(a, b)`

Returns `a + b`.

### `PijushCalculator.subtract(a, b)`

Returns `a - b`.

### `PijushCalculator.multiply(a, b)`

Returns `a * b`.

### `PijushCalculator.divide(a, b)`

Returns the quotient as a floating-point value. Raises `ZeroDivisionError` when `b` is zero.

## Development

Build the gem locally:

```bash
gem build pijush-calculator.gemspec
```

Inspect the built metadata:

```bash
gem specification pijush-calculator-0.1.2.gem
```

Install the local build:

```bash
gem install ./pijush-calculator-0.1.2.gem
```

## Publishing

Releases are handled through the repository's GitHub Actions publishing workflow. Registry credentials and tokens must never be committed to source code or workflow files.

Published RubyGems package versions are immutable, so future releases must use a new version number.

## Package information

| Property | Value |
|---|---|
| Gem | `pijush-calculator` |
| Version | `0.1.2` |
| Registry | GitHub Packages RubyGems |
| Runtime dependencies | None |
| Supported Ruby | 3.0+ |
| License | MIT |

## License

MIT
