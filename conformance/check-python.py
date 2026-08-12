import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'python-package' / 'src'))
from pijush_calculator import calculator

vectors = json.loads(Path(__file__).with_name('vectors.json').read_text())
ops = {'add': calculator.add, 'subtract': calculator.subtract, 'multiply': calculator.multiply, 'divide': calculator.divide}
for case in vectors:
    actual = ops[case['operation']](case['a'], case['b'])
    if abs(actual - case['expected']) > 1e-12:
        raise SystemExit(f"Python mismatch: {case} -> {actual}")
print(f'Python conformance passed: {len(vectors)} cases')
