# pijush-calculator

A lightweight, dependency-free Python calculator engine from the Modern Calculator project.

## Version

**0.1.0**

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit division-by-zero handling
- Python 3.9+
- Zero runtime dependencies

## Installation

Once published to PyPI:

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

Division by zero raises `ZeroDivisionError`:

```python
divide(10, 0)
# ZeroDivisionError: cannot divide by zero
```

## Development

```bash
python -m pytest
python -m build
```

The CI workflow installs the package in editable mode before running the test suite so imports are tested against the package layout used for distribution.

## Publishing

Publishing is performed automatically through GitHub Actions using **PyPI Trusted Publishing (OIDC)**. No long-lived PyPI API token is stored in the repository.

The workflow runs the test suite and builds the package before attempting publication. Future package releases must use a new version number because PyPI releases are immutable.

## License

MIT
