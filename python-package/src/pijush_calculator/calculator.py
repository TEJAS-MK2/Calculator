"""Core arithmetic engine for pijush-calculator.

The public functions deliberately use Python's numeric types so callers can
choose int, float, Decimal, or compatible numeric implementations.
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
