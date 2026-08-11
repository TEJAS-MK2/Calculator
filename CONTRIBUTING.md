# Contributing to Calculator

Thank you for contributing to the **TEJAS-MK2 Calculator** project. Contributions of all sizes are welcome, including bug fixes, performance improvements, accessibility fixes, documentation, tests, UI improvements, and new calculator capabilities.

This guide explains how to propose changes while keeping the application, calculation engines, packages, and documentation reliable and maintainable.

## Code of Conduct

Please read [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) before contributing. All contributors are expected to participate respectfully and constructively.

## Before You Start

1. Check existing issues and pull requests to avoid duplicating work.
2. Read the relevant documentation before changing an API or package.
3. Keep changes focused. Large changes should be discussed in an issue first when practical.
4. Never commit passwords, tokens, API keys, private keys, credentials, or personal information.

## Repository Areas

The repository contains several related parts:

| Area | Purpose |
|---|---|
| `index.html` | Calculator page structure and UI markup |
| `styles.css` | Layout, themes, responsive styling, and visual effects |
| `script.js` | Legacy/application UI behavior that remains in the web app |
| `calculator-core-ui.js` | Integration between the web UI and the calculation engine |
| `packages/calculator-core/` | Reusable JavaScript calculation engine and its tests |
| `ruby-gem/` | Ruby `pijush-calculator` gem |
| `.github/workflows/` | CI, deployment, and package publishing workflows |
| `README.md` and docs | User and developer documentation |

When changing calculation behavior, prefer updating the reusable calculation engine rather than duplicating mathematical logic in the browser UI.

## Reporting Bugs

Before opening an issue:

1. Search existing issues for the same problem.
2. Confirm the issue still exists on the latest `main` branch or deployed version.
3. Reduce the problem to the smallest reproducible example.

Include, when relevant:

- A clear description of the problem.
- Steps to reproduce it.
- Expected behavior.
- Actual behavior.
- Calculator expression or input sequence.
- Browser, operating system, and device information.
- Console errors or stack traces.
- Screenshots or screen recordings for visual/animation problems.
- Whether the issue affects the web calculator, JavaScript package, Ruby gem, or more than one component.

For security vulnerabilities, **do not open a public issue**. Follow [`SECURITY.md`](./SECURITY.md) instead.

## Suggesting Features

Feature requests are welcome. Open an issue with:

1. **Problem** — What problem does the feature solve?
2. **Proposal** — What should it do?
3. **Examples** — Give example inputs and outputs where applicable.
4. **Alternatives** — What alternatives have you considered?
5. **Impact** — How could it affect compatibility, performance, accessibility, or the existing UI?

For changes to the calculation engine or public package APIs, include the proposed API or expression syntax when possible.

## Development Setup

Clone the repository and create a focused branch:

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

The web calculator is a static application. You can preview it with any local HTTP server. A local HTTP server is recommended because service workers and ES modules behave differently when opened directly from `file://` URLs.

For the JavaScript package:

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

For the Ruby gem:

```bash
cd ruby-gem
gem build pijush-calculator.gemspec
```

Do not publish packages manually as part of an ordinary pull request. Package publishing is handled by the repository's configured GitHub Actions workflows.

## Making Changes

### Calculator UI

- Preserve responsive behavior on mobile and desktop.
- Keep History, Clear, Theme, and calculator controls visually consistent.
- Preserve keyboard accessibility and visible focus states.
- Use the existing animation system for UI animations rather than introducing another animation framework.
- Respect `prefers-reduced-motion`.
- Avoid unnecessary layout-triggering animations that can cause jank.
- Do not introduce blocking work on the main thread.

### JavaScript Calculation Engine

- Keep the parser deterministic and free of `eval()` and `Function()` execution.
- Add tests for every new mathematical operation or syntax rule.
- Define explicit behavior for invalid input and domain errors.
- Preserve existing public APIs unless a breaking change is intentional and documented.
- Consider precedence, associativity, unary operators, implicit multiplication, percentages, and edge cases when changing the parser.
- Keep exact arithmetic behavior separate from floating-point approximations where appropriate.

### Ruby Gem

- Keep the gem API small and predictable.
- Add tests for new public behavior.
- Avoid unnecessary runtime dependencies.
- Update the gemspec version when making a release.
- Keep the Ruby README synchronized with the actual gem API.

## Testing Checklist

Before opening a pull request, run the relevant automated tests and manually verify the application.

### Core calculations

- Basic arithmetic.
- Operator precedence.
- Parentheses and nested expressions.
- Decimal and scientific notation.
- Unary `+` and `-`.
- Powers and percentages.
- Modulo, including `10 % 3`.
- Scientific functions and angle modes.
- Variables and constants.
- Exact fractions where supported.
- Division by zero and other domain errors.

### UI

- Number and operator buttons.
- Enter, Backspace, Escape, and keyboard input.
- History and Clear.
- Theme switching.
- Scientific controls.
- Responsive layout.
- Focus states and accessibility.
- Animation timing and reduced-motion behavior.
- Browser console for new errors.

### Packages

- JavaScript package tests pass with `npm test`.
- Package metadata and README match the implementation.
- Ruby gem builds successfully with `gem build`.
- Public API changes are documented.

## Pull Requests

Keep pull requests focused and easy to review.

A useful pull request should:

- Explain what changed and why.
- Link related issues.
- Include tests for behavior changes.
- Include screenshots or a short recording for visual changes.
- Mention any package/API version changes.
- Mention compatibility or migration concerns for breaking changes.
- Avoid unrelated formatting or file changes.

Example commit messages:

```text
feat(core): add degree angle mode
fix(ui): prevent sidebar animation overlap
test(core): add modulo regression cases
docs: update package installation guide
```

## Code Review

Maintainers may review changes for:

- Correctness and test coverage.
- Security.
- Accessibility.
- Performance and animation smoothness.
- API compatibility.
- Maintainability.
- Documentation accuracy.
- Consistency with the existing design and architecture.

Please address review feedback constructively. Additional changes should remain focused on the pull request's purpose.

## Documentation

Keep the following documentation synchronized with implementation changes:

- Main `README.md`.
- `packages/calculator-core/README.md`.
- `ruby-gem/README.md`.
- Package version and API documentation.
- Contribution, security, and code-of-conduct guidance when relevant.

## Licensing

By contributing to this repository, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE) and any applicable package-specific license terms.

Thank you for helping make Calculator more reliable, accessible, and useful.