# Contributing to Calculator

Thank you for contributing to **TEJAS-MK2 Calculator**. Contributions are welcome across the web application, calculation engine, JavaScript package, Ruby gem, Python package, Maven/Gradle libraries, NuGet library, container workflow, tests, documentation, accessibility, performance, and CI/CD tooling.

## Code of Conduct

Read [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) before contributing. Participate respectfully and constructively.

## Before You Start

1. Search existing issues and pull requests.
2. Read the relevant package README and project documentation.
3. Keep changes focused and explain larger architectural changes before implementation when practical.
4. Never commit passwords, registry tokens, API keys, private keys, credentials, or personal information.
5. For security vulnerabilities, follow [`SECURITY.md`](./SECURITY.md) and do not open a public issue with sensitive details.

## Repository Areas

| Area | Purpose |
|---|---|
| `index.html` / `styles.css` | Web calculator structure and visual system |
| `script.js` / `calculator-core-ui.js` | Calculator UI behavior and engine integration |
| `packages/calculator-core/` | JavaScript calculation engine and tests |
| `ruby-gem/` | `pijush-calculator` Ruby gem |
| `python-package/` | `pijush-calculator` Python package |
| `java-package/` | Apache Maven Java library |
| `gradle-package/` | Gradle Java library |
| `nuget-package/` | `Pijush.Calculator` .NET library |
| `.github/workflows/` | CI, Pages, package publishing, and container workflows |
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
- Browser, operating system, device, Ruby, Python, Node.js, Java, or .NET version as applicable.
- Console errors, stack traces, workflow logs, or test output.
- Screenshots or recordings for UI/animation problems.
- Which component is affected: web app, package, registry, container, or CI workflow.

## Feature Requests

Open an issue describing:

1. The problem being solved.
2. The proposed behavior.
3. Example inputs and outputs.
4. Alternatives considered.
5. Compatibility, accessibility, performance, API, and UI impact.

For public package APIs or expression syntax, document the proposed API clearly.

## Development Setup

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

Test the web app through a local HTTP server when using ES modules, service workers, or PWA features.

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

### Maven package

```bash
cd java-package
mvn test
mvn package
```

### Gradle package

```bash
cd gradle-package
gradle test
gradle build
```

### NuGet package

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

Do not manually publish packages as part of a normal pull request. Releases are handled by the configured GitHub Actions workflows.

## Making Changes

### Web calculator

- Preserve responsive mobile and desktop behavior.
- Keep History, Clear, Theme, and calculator controls visually consistent.
- Preserve keyboard accessibility and visible focus states.
- Use the existing animation system and avoid unnecessary animation frameworks.
- Respect `prefers-reduced-motion`.
- Avoid expensive layout-triggering animations and blocking main-thread work.

### Calculation engine

- Keep expression parsing deterministic and free of `eval()` and `Function()` execution.
- Add tests for every new syntax rule or mathematical operation.
- Define explicit invalid-input and domain-error behavior.
- Preserve public APIs unless a breaking change is intentional and documented.
- Test precedence, associativity, unary operators, implicit multiplication, percentages, modulo, scientific notation, and edge cases.
- Preserve exact arithmetic behavior where supported.

### Package libraries

For JavaScript, Ruby, Python, Maven, Gradle, and NuGet packages:

- Keep public APIs small and predictable.
- Add tests for new public behavior.
- Avoid unnecessary runtime dependencies.
- Keep package metadata, versions, READMEs, and implementation synchronized.
- Document breaking changes and migration steps.
- Do not commit registry credentials.

## Testing Checklist

### Core calculations

- Basic arithmetic and operator precedence.
- Nested parentheses and implicit multiplication.
- Decimal and scientific notation.
- Unary operators.
- Powers, percentages, modulo, and constants.
- Scientific functions and angle modes.
- Variables and exact fractions where supported.
- Division by zero and domain errors.

### UI

- Calculator buttons and keyboard input.
- Enter, Backspace, Escape, and Clear.
- History and memory.
- Theme switching.
- Responsive layout and the reference visual style.
- Focus and accessibility states.
- Animation timing and reduced-motion behavior.
- Browser console errors.

### Packages

- JavaScript `npm test` passes.
- Ruby gem builds successfully.
- Python tests and build pass.
- Maven tests/package build pass.
- Gradle tests/build pass.
- NuGet tests/package build pass.
- Package metadata, version, description, and README agree with implementation.
- Publishing workflows use least-privilege permissions.

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
fix(ui): align calculator controls
fix(nuget): correct package build workflow
docs: refresh package documentation
test(core): add modulo regression cases
release(python): publish 0.1.3
```

## Code Review

Maintainers may review for correctness, test coverage, security, accessibility, performance, API compatibility, maintainability, documentation accuracy, package metadata, and consistency with the project design.

## Documentation

Keep these synchronized with implementation changes:

- `README.md`
- Package READMEs under `packages/`, `ruby-gem/`, `python-package/`, `java-package/`, `gradle-package/`, and `nuget-package/`
- Package metadata and versions
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`

## Licensing

By contributing, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE) and any applicable package-specific license terms.

Thank you for helping make Calculator reliable, accessible, secure, and useful across its web, library, and package ecosystems.
