# Modern Calculator

An advanced, dependency-free calculator with a browser UI and calculation engines for JavaScript, Python, Ruby, Java, Gradle, and .NET.

## Architecture

The browser UI loads three calculator-core modules:

- `packages/calculator-core/index.js` — standard expression evaluation.
- `packages/calculator-core/advanced.js` — floating-point numerical/statistical utilities.
- `packages/calculator-core/exact.js` — BigInt-backed exact rational arithmetic.

The exact engine intentionally has a smaller grammar: numeric literals, `+`, `-`, `*`, `/`, `%`, `^`, and parentheses. It does not silently fall back to floating point.

Exact exponentiation is resource-bounded; use `toNumber()` when an explicit floating-point conversion is required.

## CI and deployment

Browser tests fail on JavaScript errors, failed requests, and HTTP errors for local application assets. GitHub Pages builds `_site` first and runs the browser suite against that exact artifact before deployment, preventing missing-module regressions.

The PWA service worker caches all three calculator-core browser modules so the advanced and exact features remain available offline after installation.
