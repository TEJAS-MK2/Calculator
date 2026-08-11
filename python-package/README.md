# pijush-calculator

A **lightweight, dependency-free Python arithmetic engine** for reliable calculator operations and small reusable math utilities.

## Current release

**v0.1.1 — Python arithmetic engine**

The package is independent of the web calculator and exposes a small function-based API.

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit `ZeroDivisionError` handling
- Python 3.9+
- Zero runtime dependencies
- Simple, framework-free API

## Installation

Install the published package from PyPI:

```bash
pip install pijush-calculator
```

## Usage

```python
from pijush_calculator import add, subtract, multiply, divide

print(add(2, 3))        # 5
print(subtract(8, 3))   # 5
print(multiply(4, 6))   # 24
print(divide(20, 5))    # 4.0
```

Division by zero raises `ZeroDivisionError`:

```python
divide(10, 0)
# ZeroDivisionError: cannot divide by zero
```

## API

### `add(a, b)`

Returns the sum of two values.

### `subtract(a, b)`

Returns the difference between two values.

### `multiply(a, b)`

Returns the product of two values.

### `divide(a, b)`

Returns the quotient and raises `ZeroDivisionError` when `b` is zero.

## Development

```bash
python -m pip install -e .
python -m pytest
python -m build
```

## Publishing

The package is published to PyPI through GitHub Actions using **PyPI Trusted Publishing (OIDC)**. No long-lived PyPI API token is stored in the repository.

The workflow tests the package, builds source and wheel distributions, and publishes them only after the build succeeds. PyPI release versions are immutable, so future releases must use a new version number.

## Package information

| Property | Value |
|---|---|
| Package | `pijush-calculator` |
| Version | `0.1.1` |
| Registry | PyPI |
| Runtime dependencies | None |
| Supported Python | 3.9+ |
| License | MIT |

## License

MIT
