import pytest

from pijush_calculator import add, subtract, multiply, divide


def test_add():
    assert add(2, 3) == 5


def test_subtract():
    assert subtract(8, 3) == 5


def test_multiply():
    assert multiply(4, 6) == 24


def test_divide():
    assert divide(20, 5) == 4


def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)
