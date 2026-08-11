"""Lightweight, dependency-free calculator engine."""

from .calculator import (
    add, subtract, multiply, divide, modulo, power, percentage, absolute,
    minimum, maximum, average, mean, sum_values, product, clamp, reciprocal,
    square, cube, square_root, cube_root, nth_root, factorial, gcd, lcm,
    sine, cosine, tangent, secant, cosecant, cotangent,
    arcsine, arccosine, arctangent, atan2,
    hyperbolic_sine, hyperbolic_cosine, hyperbolic_tangent,
    logarithm, log2, log1p, expm1, natural_log, exponential, hypot,
    combinations, permutations, median, variance, standard_deviation,
    range_values, is_close, approximately_equal,
)

__all__ = [name for name in globals() if not name.startswith("_")]
__version__ = "0.2.0"
