# pijush-calculator

A **lightweight, dependency-free Python arithmetic engine** for reliable calculator operations and small reusable math utilities.

## Current release

**v0.1.2 — Python arithmetic engine**

The package is independent of the web calculator and exposes a small function-based API designed for Python applications and scripts.

## Features

- Addition, subtraction, multiplication, and division
- Explicit `ZeroDivisionError` handling
- Python 3.9+
- Zero runtime dependencies
- Framework-free API

## Installation

Install the published package from PyPI:

```bash
pip install pijush-calculator
```

## Usage

```python
from pijush_calculator import add, subtract, multiply, divide

print(add(2, 3))
print(subtract(8, 3))
print(multiply(4, 6))
print(divide(20, 5))
```

Division by zero raises `ZeroDivisionError`.

## API

| Function | Result |
|---|---|
| `add(a, b)` | Sum of two values |
| `subtract(a, b)` | Difference between two values |
| `multiply(a, b)` | Product of two values |
| `divide(a, b)` | Quotient; raises on zero divisor |

## Development

```bash
python -m pip install -e .
python -m pytest
python -m build
```

## Publishing

The package is published to PyPI through GitHub Actions using **PyPI Trusted Publishing (OIDC)** where configured. No long-lived PyPI API token is stored in the repository.

The workflow tests the package, builds source and wheel distributions, and publishes only after a successful build. PyPI releases are immutable, so future releases require a new version.

## Package information

| Property | Value |
|---|---|
| Package | `pijush-calculator` |
| Version | `0.1.2` |
| PyPI | `https://pypi.org/project/pijush-calculator/` |
| Repository | `https://github.com/TEJAS-MK2/Calculator` |
| Runtime dependencies | None |
| Supported Python | 3.9+ |
| License | MIT |

## License

MIT
