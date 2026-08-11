# pijush-calculator

A lightweight, dependency-free Ruby calculator engine from the Modern Calculator project.

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit division-by-zero errors
- Ruby 3.0+
- Zero runtime dependencies

## Usage

```ruby
require "pijush_calculator"

PijushCalculator.add(2, 3)       # 5
PijushCalculator.subtract(8, 3)  # 5
PijushCalculator.multiply(4, 6)   # 24
PijushCalculator.divide(20, 5)    # 4.0
```

## GitHub Packages

This gem is designed to be published to the GitHub RubyGems registry at:

```text
https://rubygems.pkg.github.com/TEJAS-MK2
```

GitHub Actions can publish the gem using the repository `GITHUB_TOKEN` when the package is associated with this repository. GitHub documents `GITHUB_TOKEN` publishing for packages from Actions workflows. See the official GitHub Packages RubyGems documentation for authentication and registry details.

## Development

```bash
gem build pijush-calculator.gemspec
gem install ./pijush-calculator-0.1.0.gem
```

## License

MIT
