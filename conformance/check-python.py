import json
from pathlib import Path
from pijush_calculator import add, subtract, multiply, divide

vectors = json.loads((Path(__file__).with_name('vectors.json')).read_text())
operations = {'add': add, 'subtract': subtract, 'multiply': multiply, 'divide': divide}
for index, vector in enumerate(vectors, 1):
    actual = operations[vector['operation']](vector['a'], vector['b'])
    if abs(float(actual) - float(vector['expected'])) > 1e-12:
        raise AssertionError(f"Vector {index} failed: {actual} != {vector['expected']}")
print(f"Python conformance passed: {len(vectors)} vectors")
