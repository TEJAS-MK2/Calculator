# pijush-calculator

Advanced, dependency-free Python numerical engine for calculator, scientific mathematics, statistics, combinatorics, and reusable applications.

## Requirements

- Python **3.14+**
- Zero runtime dependencies

## Features

- Arithmetic: add, subtract, multiply, divide, modulo, power, percentage
- Utilities: absolute, minimum, maximum, average/mean, sum, product, clamp, reciprocal, square, cube
- Roots: square root and cube root
- Number theory: factorial, GCD, LCM, combinations, permutations
- Trigonometry and inverse/hyperbolic trigonometry
- Logarithms and exponentials
- Multi-value hypotenuse calculation
- Statistics: median, population variance, standard deviation, range
- Floating-point comparison with configurable tolerance
- Explicit domain, finite-result, and zero-division validation

## Installation

```bash
pip install pijush-calculator==0.6.0
```

## Usage

```python
from pijush_calculator import add, square_root, factorial, median

print(add(2, 3))
print(square_root(144))
print(factorial(6))
print(median(9, 2, 7, 4, 5))
```

## Development

```bash
python -m pip install -e .
python -m pytest
python -m build
```

## CI and publishing

GitHub Actions runs the Python test suite on Python 3.14 and validates all six calculation engines before publishing. PyPI releases use **Trusted Publishing (OIDC)**; no PyPI API token is required.

Published versions are immutable. Release a new version instead of attempting to overwrite an existing release.

## Package information

| Property | Value |
|---|---|
| Package | `pijush-calculator` |
| Version | `0.6.0` |
| Engine | Python 3.14+ |
| Runtime dependencies | None |
| PyPI | https://pypi.org/project/pijush-calculator/ |
| Repository | https://github.com/TEJAS-MK2/Calculator |
| License | MIT |

## License

MIT
