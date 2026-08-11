# Contributing to Calculator

Thank you for contributing to **TEJAS-MK2 Calculator**. Contributions are welcome across the web application, calculation engine, JavaScript package, Ruby gem, Python package, tests, documentation, accessibility, performance, and developer tooling.

## Code of Conduct

Read [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) before contributing. Participate respectfully and constructively.

## Before You Start

1. Search existing issues and pull requests.
2. Read the relevant package and project documentation.
3. Keep changes focused and explain larger architectural changes before implementation when practical.
4. Never commit passwords, registry tokens, API keys, private keys, credentials, or personal information.
5. For security vulnerabilities, follow [`SECURITY.md`](./SECURITY.md) and do not open a public issue with sensitive details.

## Repository Areas

| Area | Purpose |
|---|---|
| `index.html` | Web calculator structure |
| `styles.css` | Layout, themes, responsive styling, visual effects |
| `script.js` | Remaining application/legacy UI behavior |
| `calculator-core-ui.js` | Web UI integration with the calculation engine |
| `packages/calculator-core/` | Reusable JavaScript calculation engine and tests |
| `ruby-gem/` | `pijush-calculator` Ruby gem |
| `python-package/` | `pijush-calculator` Python package |
| `.github/workflows/` | CI, deployment, and package publishing |
| `README.md` and package READMEs | User and developer documentation |

When changing mathematical behavior, prefer the reusable engine rather than duplicating calculation logic in the browser UI.

## Reporting Bugs

Before opening an issue:

1. Search existing issues.
2. Confirm the problem on the latest `main` branch or current published/deployed version.
3. Reduce it to the smallest reproducible case.

Include when relevant:

- Clear problem description.
- Steps to reproduce.
- Expected and actual behavior.
- Calculator expression or input sequence.
- Browser, operating system, device, Ruby, Python, or Node.js version as applicable.
- Console errors, stack traces, or test output.
- Screenshots or recordings for UI/animation problems.
- Which component is affected: web app, JavaScript package, Ruby gem, Python package, or CI.

## Feature Requests

Open an issue describing:

1. The problem being solved.
2. The proposed behavior.
3. Example inputs and outputs.
4. Alternatives considered.
5. Compatibility, accessibility, performance, and UI impact.

For public package APIs or expression syntax, document the proposed API clearly.

## Development Setup

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

The web app should be tested through a local HTTP server when using ES modules, service workers, or PWA features.

### JavaScript package

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

### Ruby gem

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
```

### Python package

```bash
cd python-package
python -m pip install -e .
python -m pytest
python -m build
```

Do not manually publish packages as part of a normal pull request. Releases are handled by the configured GitHub Actions workflows.

## Making Changes

### Web calculator

- Preserve responsive mobile and desktop behavior.
- Keep History, Clear, Theme, and calculator controls visually consistent.
- Preserve keyboard accessibility and visible focus states.
- Use the existing animation system rather than adding unnecessary animation frameworks.
- Respect `prefers-reduced-motion`.
- Avoid expensive layout-triggering animations and blocking main-thread work.

### JavaScript engine

- Keep expression parsing deterministic and free of `eval()` and `Function()` execution.
- Add tests for every new syntax rule or mathematical operation.
- Define explicit invalid-input and domain-error behavior.
- Preserve public APIs unless a breaking change is intentional and documented.
- Consider precedence, associativity, unary operators, implicit multiplication, percentages, modulo, and edge cases.
- Preserve exact arithmetic behavior where supported.

### Ruby gem

- Keep the API small and predictable.
- Add tests for new public behavior.
- Avoid unnecessary dependencies.
- Update the gem version for release changes.
- Keep the gemspec and README synchronized.

### Python package

- Keep the public API small and predictable.
- Add pytest coverage for new behavior.
- Avoid unnecessary runtime dependencies.
- Update `pyproject.toml`, package version, and README together for releases.
- Preserve Python 3.9+ compatibility unless a documented change is intentional.

## Testing Checklist

### Core calculations

- Basic arithmetic.
- Operator precedence.
- Nested parentheses.
- Decimal and scientific notation.
- Unary operators.
- Powers and percentages.
- Modulo, including `10 % 3`.
- Scientific functions and angle modes.
- Variables and constants.
- Exact fractions where supported.
- Division by zero and domain errors.

### UI

- Calculator buttons and keyboard input.
- Enter, Backspace, Escape, and Clear.
- History.
- Theme switching.
- Scientific controls.
- Responsive layout.
- Focus and accessibility states.
- Animation timing and reduced-motion behavior.
- Browser console errors.

### Packages

- JavaScript `npm test` passes.
- Ruby gem builds successfully.
- Python `pytest` passes and the package builds successfully.
- Package metadata, version, and README agree with the implementation.
- Public API changes are documented.

## Pull Requests

Keep pull requests focused and easy to review.

Include:

- What changed and why.
- Related issues.
- Tests for behavior changes.
- Screenshots or a recording for visual changes.
- Package/API version changes when applicable.
- Compatibility or migration notes for breaking changes.

Suggested commit messages:

```text
feat(core): add degree angle mode
fix(ui): prevent sidebar animation overlap
test(core): add modulo regression cases
docs: update package documentation
release(python): publish 0.1.1
```

## Code Review

Maintainers may review for correctness, test coverage, security, accessibility, performance, API compatibility, maintainability, documentation accuracy, and consistency with the project design.

Address review feedback constructively and keep follow-up changes relevant to the pull request.

## Documentation

Keep these synchronized with implementation changes:

- `README.md`
- `packages/calculator-core/README.md`
- `ruby-gem/README.md`
- `python-package/README.md`
- Package metadata and versions
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`

## Licensing

By contributing, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE) and any applicable package-specific license terms.

Thank you for helping make Calculator reliable, accessible, secure, and useful across its web and package ecosystems.
