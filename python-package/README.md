# pijush-calculator

Advanced, dependency-free Python numerical engine for calculator, scientific-math, statistics, and reusable application tooling.

## Engine capabilities

- Basic arithmetic: add, subtract, multiply, divide, modulo, power, percentage
- Numeric utilities: absolute, minimum, maximum, average/mean, sum, product, clamp, reciprocal, square, cube
- Roots: square root and cube root
- Number theory: factorial, GCD, LCM, combinations, permutations
- Trigonometry: sine, cosine, tangent, secant, cosecant, cotangent
- Inverse trigonometry: arcsine, arccosine, arctangent
- Hyperbolic sine, cosine, tangent
- Logarithms and exponentials
- Multi-value hypotenenuse calculation
- Statistics: median, population variance, standard deviation, range
- Floating-point comparison with configurable tolerance
- Explicit domain, finite-result, and zero-division validation
- Python 3.9+
- Zero runtime dependencies

## Installation

```bash
pip install pijush-calculator
```

## Usage

```python
from pijush_calculator import add, square_root, factorial, median

print(add(2, 3))
print(square_root(144))
print(factorial(6))
print(median(9, 2, 7, 4, 5))
```

## API groups

| Group | Functions |
|---|---|
| Arithmetic | `add`, `subtract`, `multiply`, `divide`, `modulo`, `power`, `percentage` |
| Utilities | `absolute`, `minimum`, `maximum`, `average`, `mean`, `sum_values`, `product`, `clamp`, `reciprocal` |
| Roots | `square_root`, `cube_root`, `square`, `cube` |
| Number theory | `factorial`, `gcd`, `lcm`, `combinations`, `permutations` |
| Trigonometry | `sine`, `cosine`, `tangent`, `secant`, `cosecant`, `cotangent` |
| Inverse trig | `arcsine`, `arccosine`, `arctangent` |
| Scientific | `logarithm`, `natural_log`, `exponential`, `hypot` |
| Statistics | `median`, `variance`, `standard_deviation`, `range_values` |

Division and modulo by zero raise `ZeroDivisionError`; invalid mathematical domains raise `ValueError`.

## Development

```bash
python -m pip install -e .
python -m pytest
python -m build
```

## Publishing

The package is published to PyPI through GitHub Actions using Trusted Publishing (OIDC) where configured. Published versions are immutable and require a new version for each release.

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
