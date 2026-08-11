"""Advanced, dependency-free arithmetic engine for pijush-calculator."""
import math

def _finite(value):
    if isinstance(value, float) and not math.isfinite(value): raise ValueError("result must be finite")
    return value

def add(a,b): return _finite(a+b)
def subtract(a,b): return _finite(a-b)
def multiply(a,b): return _finite(a*b)
def divide(a,b):
    if b==0: raise ZeroDivisionError("cannot divide by zero")
    return _finite(a/b)
def modulo(a,b):
    if b==0: raise ZeroDivisionError("cannot modulo by zero")
    return _finite(a%b)
def power(a,b): return _finite(a**b)
def percentage(value,percent): return _finite(value*percent/100)
def absolute(value): return _finite(abs(value))
def minimum(*values):
    if not values: raise ValueError("minimum requires at least one value")
    return min(values)
def maximum(*values):
    if not values: raise ValueError("maximum requires at least one value")
    return max(values)
def average(*values):
    if not values: raise ValueError("average requires at least one value")
    return _finite(sum(values)/len(values))
def sum_values(*values): return _finite(sum(values))
def product(*values): return _finite(math.prod(values))
def clamp(value,minimum_value,maximum_value):
    if minimum_value>maximum_value: raise ValueError("minimum_value cannot exceed maximum_value")
    return min(maximum_value,max(minimum_value,value))
def reciprocal(value):
    if value==0: raise ZeroDivisionError("cannot take reciprocal of zero")
    return _finite(1/value)
def square(value): return _finite(value*value)
def cube(value): return _finite(value*value*value)
def square_root(value):
    if value<0: raise ValueError("square root requires a non-negative value")
    return _finite(math.sqrt(value))
def cube_root(value): return _finite(math.cbrt(value) if hasattr(math,"cbrt") else math.copysign(abs(value)**(1/3),value))
def factorial(value):
    if not isinstance(value,int) or value<0: raise ValueError("factorial requires a non-negative integer")
    return math.factorial(value)
def gcd(a,b): return math.gcd(int(a),int(b))
def lcm(a,b): return math.lcm(int(a),int(b))
def sine(value,degrees=False): return _finite(math.sin(math.radians(value) if degrees else value))
def cosine(value,degrees=False): return _finite(math.cos(math.radians(value) if degrees else value))
def tangent(value,degrees=False): return _finite(math.tan(math.radians(value) if degrees else value))
def logarithm(value,base=10):
    if value<=0 or base<=0 or base==1: raise ValueError("invalid logarithm domain")
    return _finite(math.log(value,base))
def natural_log(value):
    if value<=0: raise ValueError("natural logarithm requires a positive value")
    return _finite(math.log(value))
def exponential(value): return _finite(math.exp(value))
def combinations(n,r):
    n,r=int(n),int(r)
    if n<0 or r<0 or r>n: raise ValueError("invalid combination range")
    return math.comb(n,r)
def permutations(n,r):
    n,r=int(n),int(r)
    if n<0 or r<0 or r>n: raise ValueError("invalid permutation range")
    return math.perm(n,r)
