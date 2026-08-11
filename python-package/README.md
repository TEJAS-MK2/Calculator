# pijush-calculator

A lightweight, dependency-free Python arithmetic engine for reusable calculator and math applications.

## Current engine

The Python package provides a predictable function-based arithmetic API with explicit error handling.

### Features

- Addition, subtraction, multiplication, division
- Modulo
- Power
- Percentage
- Absolute value, min/max, average, clamp, reciprocal, square, and cube helpers
- Explicit `ZeroDivisionError` handling
- Python 3.9+
- Zero runtime dependencies
- Framework-free API

## Installation

```bash
pip install pijush-calculator
```

## Usage

```python
from pijush_calculator import add, subtract, multiply, divide, modulo, power, percentage

print(add(2, 3))
print(subtract(8, 3))
print(multiply(4, 6))
print(divide(20, 5))
print(modulo(20, 6))
print(power(2, 8))
print(percentage(250, 20))
```

Division and modulo by zero raise `ZeroDivisionError`.

## API

| Function | Result |
|---|---|
| `add(a, b)` | Sum |
| `subtract(a, b)` | Difference |
| `multiply(a, b)` | Product |
| `divide(a, b)` | Quotient |
| `modulo(a, b)` | Remainder |
| `power(a, b)` | Power |
| `percentage(value, percent)` | Percentage value |

Additional utility helpers are available for common arithmetic operations.

## Development

```bash
python -m pip install -e .
python -m pytest
python -m build
```

## Publishing

The package is published to PyPI through GitHub Actions using PyPI Trusted Publishing (OIDC) where configured. No long-lived PyPI API token is stored in the repository. Published versions are immutable and require a new version for each release.

## Package information

| Property | Value |
|---|---|
| Package | `pijush-calculator` |
| PyPI | `https://pypi.org/project/pijush-calculator/` |
| Repository | `https://github.com/TEJAS-MK2/Calculator` |
| Runtime dependencies | None |
| Supported Python | 3.9+ |
| License | MIT |

## License

MIT
