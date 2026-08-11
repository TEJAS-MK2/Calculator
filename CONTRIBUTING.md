# Contributing to Calculator

Thank you for contributing to **TEJAS-MK2 Calculator**. Contributions are welcome across the web application, calculation libraries, tests, documentation, accessibility, performance, and CI/CD workflows.

## Code of Conduct

Read [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) before contributing. Keep discussions respectful, constructive, and focused on the project.

## Before You Start

1. Search existing issues and pull requests.
2. Read the relevant documentation and package README.
3. Keep changes focused and explain significant design changes before implementation when practical.
4. Never commit passwords, registry tokens, API keys, private keys, or other secrets.
5. Report security vulnerabilities privately according to [`SECURITY.md`](./SECURITY.md).

## Repository Areas

| Area | Purpose |
|---|---|
| `index.html` / `styles.css` | Web calculator structure and styling |
| `reference-theme.css` | Modern compact visual theme and responsive layout |
| `script.js` / `calculator-core-ui.js` | Calculator behavior and UI integration |
| `packages/calculator-core/` | JavaScript calculation engine |
| `ruby-gem/` | Ruby package |
| `python-package/` | Python package |
| `java-package/` | Maven package |
| `gradle-package/` | Gradle package |
| `nuget-package/` | .NET package |
| `.github/workflows/` | CI and package publishing workflows |

## Web UI Guidelines

- Keep the main calculator focused on arithmetic input and output.
- Keep **History, Clear, and Theme in the sidebar** rather than duplicating them on the main keypad.
- Preserve the compact responsive layout.
- Match the existing dark visual system, spacing, borders, and rounded surfaces.
- Preserve keyboard accessibility and visible focus states.
- Keep animations subtle and avoid unnecessary motion.
- Respect `prefers-reduced-motion`.
- Avoid expensive layout-triggering animations and unnecessary main-thread work.

## Calculation Behavior

- Keep arithmetic behavior deterministic.
- Do not introduce `eval()` or `Function()` based execution.
- Add tests for new public calculation behavior.
- Define explicit invalid-input and division-by-zero behavior.
- Preserve existing public APIs unless a breaking change is intentional and documented.

## Package Libraries

For JavaScript, Ruby, Python, Maven, Gradle, and NuGet packages:

- Keep public APIs small and predictable.
- Add tests for behavior changes.
- Avoid unnecessary runtime dependencies.
- Keep package metadata, versions, READMEs, and implementation synchronized.
- Use a new package version for published changes; do not attempt to overwrite an existing immutable release.
- Never commit registry credentials.

## Testing Checklist

### Web calculator

- Basic arithmetic works correctly.
- Decimal input works correctly.
- Clear resets calculator state.
- History opens, displays, and reuses calculations correctly.
- Theme control works from the sidebar.
- Sidebar opens and closes correctly.
- Main calculator remains clean without duplicate History/Clear/Theme controls.
- Layout works on mobile and desktop sizes.
- Keyboard input and focus behavior remain accessible.
- No browser console errors.

### Packages

- JavaScript tests pass.
- Ruby gem builds and tests pass.
- Python tests and build pass.
- Maven tests/package build pass.
- Gradle tests/build pass.
- NuGet tests/package build pass.
- Package metadata agrees with implementation.
- Publishing workflows use least-privilege permissions.

## Development Setup

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

Use a local HTTP server when testing ES modules, PWA behavior, or service workers.

## Pull Requests

Keep pull requests focused and easy to review. Include:

- What changed and why.
- Related issues when applicable.
- Tests for behavior changes.
- Screenshots or recordings for UI changes.
- Package/API version changes when applicable.
- Compatibility or migration notes for breaking changes.

Suggested commit messages:

```text
feat(ui): modernize compact calculator
fix(sidebar): align control actions
fix(core): handle division by zero
release(python): publish package update
docs: refresh calculator documentation
```

## Documentation

Keep `README.md`, package READMEs, package metadata, `SECURITY.md`, and `CODE_OF_CONDUCT.md` synchronized with implementation changes.

## Licensing

By contributing, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE) and applicable package-specific license terms.
