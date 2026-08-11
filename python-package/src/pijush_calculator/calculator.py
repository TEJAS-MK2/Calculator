"""Advanced, dependency-free numerical engine for pijush-calculator."""
import math
import statistics

def _finite(value):
    if isinstance(value, float) and not math.isfinite(value):
        raise ValueError("result must be finite")
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
    return _finite(statistics.fmean(values))
def mean(*values): return average(*values)
def sum_values(*values): return _finite(math.fsum(values))
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
def nth_root(value,n):
    if n==0: raise ValueError("root degree cannot be zero")
    if value<0 and int(n)%2==0: raise ValueError("even root requires a non-negative value")
    result=math.copysign(abs(value)**(1/float(n)),value) if value<0 else value**(1/float(n))
    return _finite(result)
def factorial(value):
    if not isinstance(value,int) or value<0: raise ValueError("factorial requires a non-negative integer")
    return math.factorial(value)
def gcd(a,b): return math.gcd(int(a),int(b))
def lcm(a,b): return math.lcm(int(a),int(b))
def sine(value,degrees=False): return _finite(math.sin(math.radians(value) if degrees else value))
def cosine(value,degrees=False): return _finite(math.cos(math.radians(value) if degrees else value))
def tangent(value,degrees=False): return _finite(math.tan(math.radians(value) if degrees else value))
def secant(value,degrees=False): return _finite(1/cosine(value,degrees))
def cosecant(value,degrees=False): return _finite(1/sine(value,degrees))
def cotangent(value,degrees=False): return _finite(1/tangent(value,degrees))
def arcsine(value,degrees=False): return _finite(math.degrees(math.asin(value)) if degrees else math.asin(value))
def arccosine(value,degrees=False): return _finite(math.degrees(math.acos(value)) if degrees else math.acos(value))
def arctangent(value,degrees=False): return _finite(math.degrees(math.atan(value)) if degrees else math.atan(value))
def atan2(y,x,degrees=False): return _finite(math.degrees(math.atan2(y,x)) if degrees else math.atan2(y,x))
def hyperbolic_sine(value): return _finite(math.sinh(value))
def hyperbolic_cosine(value): return _finite(math.cosh(value))
def hyperbolic_tangent(value): return _finite(math.tanh(value))
def logarithm(value,base=10):
    if value<=0 or base<=0 or base==1: raise ValueError("invalid logarithm domain")
    return _finite(math.log(value,base))
def log2(value):
    if value<=0: raise ValueError("log2 requires a positive value")
    return _finite(math.log2(value))
def log1p(value):
    if value<=-1: raise ValueError("log1p requires a value greater than -1")
    return _finite(math.log1p(value))
def expm1(value): return _finite(math.expm1(value))
def natural_log(value):
    if value<=0: raise ValueError("natural logarithm requires a positive value")
    return _finite(math.log(value))
def exponential(value): return _finite(math.exp(value))
def hypot(*values):
    if not values: raise ValueError("hypot requires at least one value")
    return _finite(math.hypot(*values))
def combinations(n,r):
    n,r=int(n),int(r)
    if n<0 or r<0 or r>n: raise ValueError("invalid combination range")
    return math.comb(n,r)
def permutations(n,r):
    n,r=int(n),int(r)
    if n<0 or r<0 or r>n: raise ValueError("invalid permutation range")
    return math.perm(n,r)
def median(*values):
    if not values: raise ValueError("median requires at least one value")
    return statistics.median(values)
def variance(*values):
    if not values: raise ValueError("variance requires at least one value")
    return _finite(statistics.pvariance(values))
def standard_deviation(*values): return _finite(math.sqrt(variance(*values)))
def range_values(*values):
    if not values: raise ValueError("range requires at least one value")
    return maximum(*values)-minimum(*values)
def is_close(a,b,rel_tol=1e-9,abs_tol=0.0): return math.isclose(a,b,rel_tol=rel_tol,abs_tol=abs_tol)
def approximately_equal(a,b,tolerance=1e-9): return abs(a-b)<=tolerance
