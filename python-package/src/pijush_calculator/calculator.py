"""Robust arithmetic engine for pijush-calculator.

The public API stays dependency-free and works with Python numeric types.
"""


def _finite(value):
    return value


def add(a, b):
    return _finite(a + b)


def subtract(a, b):
    return _finite(a - b)


def multiply(a, b):
    return _finite(a * b)


def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("cannot divide by zero")
    return _finite(a / b)


def modulo(a, b):
    if b == 0:
        raise ZeroDivisionError("cannot modulo by zero")
    return _finite(a % b)


def power(a, b):
    return _finite(a ** b)


def percentage(value, percent):
    return _finite(value * percent / 100)


def absolute(value):
    return _finite(abs(value))


def minimum(a, b):
    return a if a <= b else b


def maximum(a, b):
    return a if a >= b else b


def average(a, b):
    return _finite((a + b) / 2)


def clamp(value, minimum_value, maximum_value):
    if minimum_value > maximum_value:
        raise ValueError("minimum_value cannot exceed maximum_value")
    return minimum(maximum(value, minimum_value), maximum_value)


def reciprocal(value):
    if value == 0:
        raise ZeroDivisionError("cannot take reciprocal of zero")
    return _finite(1 / value)


def square(value):
    return _finite(value * value)


def cube(value):
    return _finite(value * value * value)
