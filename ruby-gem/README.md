# pijush-calculator

A **lightweight, dependency-free Ruby calculation engine** from the Modern Calculator project.

## Current release

**v0.1.1 — arithmetic engine**

The gem provides a small reusable arithmetic API that works independently of the web calculator.

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit `ZeroDivisionError` handling
- Ruby 3.0+
- Zero runtime dependencies
- Simple module-based API
- GitHub Packages RubyGems distribution

## Installation from GitHub Packages

The gem is distributed through the GitHub Packages RubyGems registry.

Registry:

```text
https://rubygems.pkg.github.com/TEJAS-MK2
```

Configure RubyGems authentication with an appropriate GitHub token, then install:

```bash
gem install pijush-calculator --source https://rubygems.pkg.github.com/TEJAS-MK2
```

## Usage

```ruby
require "pijush_calculator"

PijushCalculator.add(2, 3)       # 5
PijushCalculator.subtract(8, 3)  # 5
PijushCalculator.multiply(4, 6)   # 24
PijushCalculator.divide(20, 5)   # 4.0
```

Division by zero raises an explicit `ZeroDivisionError`:

```ruby
PijushCalculator.divide(10, 0)
# ZeroDivisionError: cannot divide by zero
```

## API

### `PijushCalculator.add(a, b)`

Returns the sum of two values.

### `PijushCalculator.subtract(a, b)`

Returns the difference between two values.

### `PijushCalculator.multiply(a, b)`

Returns the product of two values.

### `PijushCalculator.divide(a, b)`

Returns the quotient as a floating-point value and raises `ZeroDivisionError` when `b` is zero.

## Development

Build and inspect the gem locally:

```bash
gem build pijush-calculator.gemspec
gem specification pijush-calculator-0.1.1.gem
```

Install the locally built package:

```bash
gem install ./pijush-calculator-0.1.1.gem
```

## Publishing

Package publishing is handled by the repository's GitHub Actions workflow. Do not commit registry credentials or tokens to the repository.

RubyGems package versions are immutable after publication. The current release is **0.1.1**; future releases must use a new version such as `0.1.2`.

## Package Information

| Property | Value |
|---|---|
| Gem | `pijush-calculator` |
| Version | `0.1.1` |
| Registry | GitHub Packages RubyGems |
| Runtime dependencies | None |
| Supported Ruby | 3.0+ |
| License | MIT |

## License

MIT
