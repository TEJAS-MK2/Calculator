# pijush-calculator

Advanced, dependency-free Python arithmetic engine for reusable calculator and math applications.

## Engine capabilities

- Addition, subtraction, multiplication, division, modulo, and power
- Percentage, absolute value, min/max, average, clamp, reciprocal
- Square, cube, square root, and cube root
- Factorial
- GCD and LCM
- Sine, cosine, tangent with optional degree mode
- Logarithm, natural logarithm, and exponential
- Combinations and permutations
- Variadic aggregation helpers such as `sum` and `product`
- Explicit domain and zero-division validation
- Python 3.9+
- Zero runtime dependencies

## Installation

```bash
pip install pijush-calculator
```

## Usage

```python
from pijush_calculator import (
    add, modulo, power, square_root, factorial,
    gcd, sine, combinations
)

print(add(2, 3))
print(modulo(20, 6))
print(power(2, 8))
print(square_root(144))
print(factorial(5))
print(gcd(84, 30))
print(sine(90, degrees=True))
print(combinations(5, 2))
```

## API

| Function | Purpose |
|---|---|
| `add`, `subtract`, `multiply`, `divide` | Basic arithmetic |
| `modulo`, `power`, `percentage` | Extended arithmetic |
| `absolute`, `minimum`, `maximum`, `average` | Numeric utilities |
| `sum`, `product` | Variadic aggregation |
| `clamp`, `reciprocal`, `square`, `cube` | Value transformations |
| `square_root`, `cube_root` | Root operations |
| `factorial` | Integer factorial |
| `gcd`, `lcm` | Integer number theory |
| `sine`, `cosine`, `tangent` | Trigonometry |
| `logarithm`, `natural_log`, `exponential` | Exponential/logarithmic math |
| `combinations`, `permutations` | Combinatorics |

Division and modulo by zero raise `ZeroDivisionError`; invalid mathematical domains raise `ValueError`.

## Development

```bash
python -m pip install -e .
python -m pytest
python -m build
```

## Publishing

The package is published to PyPI through GitHub Actions using Trusted Publishing (OIDC) where configured. No long-lived PyPI credential is committed to the repository. Published versions are immutable and require a new version for each release.

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
