# Contributing to Modern Calculator

Thank you for contributing to **TEJAS-MK2 Calculator**.

This project has two related goals:

1. Keep the browser calculator clean, reliable, accessible, and enjoyable to use.
2. Build **serious, powerful, reusable calculation engines** that developers can use in their own applications.

Contributions are welcome to the calculation engines, web UI, tests, documentation, accessibility, performance, package tooling, and CI/CD infrastructure.

## Before You Start

1. Check existing issues and pull requests before starting significant work.
2. Read the relevant package and project documentation.
3. Keep pull requests focused on one coherent change.
4. Never commit passwords, API keys, registry tokens, private keys, or other secrets.
5. Report security vulnerabilities privately according to [`SECURITY.md`](./SECURITY.md).
6. For large architectural changes, open an issue first when discussion would help establish the design.

## Repository Structure

| Area | Purpose |
|---|---|
| `index.html` / `styles.css` | Browser calculator structure and styling |
| `script.js` | Sidebar, theme, and page-level interaction |
| `calculator-core-ui.js` | Calculator UI and engine integration |
| `sw.js` / `manifest.json` | PWA and offline behavior |
| `packages/calculator-core/` | JavaScript calculation engine and exact arithmetic |
| `python-package/` | Python calculation package |
| `ruby-gem/` | Ruby calculation package |
| `java-package/` | Java/Maven calculation package |
| `gradle-package/` | Java/Gradle calculation package |
| `nuget-package/` | C#/.NET calculation package |
| `tests/` | Browser and integration tests |
| `conformance/` | Cross-language conformance tests |
| `.github/workflows/` | CI, testing, deployment, and publishing automation |

## Web UI Guidelines

- Keep the main calculator focused on everyday calculations.
- Keep advanced functionality accessible through the sidebar.
- Preserve the existing responsive mobile and desktop layouts.
- Preserve keyboard accessibility and visible focus states.
- Keep animations purposeful and lightweight.
- Respect `prefers-reduced-motion`.
- Avoid unnecessary layout-triggering animations and main-thread work.
- Do not introduce browser console errors.
- Test UI changes at both mobile and desktop viewport sizes.

## Calculation Engine Guidelines

The calculation engines are the primary technical focus of the project.

- Keep arithmetic behavior deterministic and well-defined.
- Do not use `eval()` or `Function()` for expression execution.
- Preserve the parser and validation model unless a deliberate redesign is being made.
- Add tests for every new public calculation behavior.
- Define explicit behavior for invalid input, domain errors, and division by zero.
- Validate finite numeric inputs where appropriate.
- Preserve public APIs unless a breaking change is intentional and documented.
- Clearly distinguish exact arithmetic from floating-point numerical algorithms.
- Document precision, tolerance, convergence, and domain limitations for numerical methods.
- Avoid unnecessary runtime dependencies in packages that are intended to remain dependency-free.

## Exact Arithmetic

The JavaScript exact-arithmetic engine uses `BigInt`-backed rational values.

When changing exact arithmetic:

- Do not silently convert exact values to `Number`.
- Add regression tests for large integers and rational values.
- Test division, modulo, powers, normalization, and division-by-zero behavior.
- Keep resource limits for potentially enormous exact calculations.
- Use explicit conversion APIs when floating-point output is intended.

## Package Guidelines

When changing a package:

- Update package documentation when public APIs or behavior change.
- Keep package metadata and installation instructions consistent with the implementation.
- Add tests for new or modified public APIs.
- Verify package contents before publishing.
- Never commit registry credentials or authentication files.
- Do not introduce runtime dependencies without documenting and testing them.
- Keep versions and package coordinates consistent across source, CI, and documentation.

### JavaScript

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

### Python

```bash
cd python-package
python -m pytest
```

### Ruby

```bash
cd ruby-gem
ruby -Ilib -Itest test/test_pijush_calculator.rb
```

### Java/Maven

```bash
cd java-package
mvn test
mvn package
```

### Java/Gradle

```bash
cd gradle-package
gradle test
gradle build
```

### .NET/NuGet

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

## Testing Checklist

### Web application

- Basic arithmetic works.
- Decimal input works.
- Parentheses and unary operators behave correctly.
- Clear and backspace work correctly.
- History opens, displays, and reuses calculations correctly.
- Sidebar opens and closes correctly.
- Theme controls work correctly.
- Advanced features remain usable.
- Keyboard input remains accessible.
- Mobile and desktop layouts work.
- No unexpected browser console errors occur.
- Local application assets load successfully.
- PWA/service-worker changes do not break navigation or offline behavior.

### Calculation engines

- New public functions have tests.
- Invalid arguments are rejected consistently.
- Domain errors are explicit.
- Division by zero is handled explicitly.
- Exact arithmetic retains exactness where promised.
- Numerical algorithms respect documented tolerance and precision expectations.
- Existing tests continue to pass.

### Cross-language behavior

When an operation is intended to behave consistently across languages:

- Add or update the shared conformance vectors.
- Verify JavaScript, Python, Ruby, Java/Maven, Java/Gradle, and .NET implementations where applicable.
- Document intentional language-specific differences instead of hiding them.

## CI/CD and Deployment

GitHub Actions is used for testing, cross-language validation, GitHub Pages deployment, and package publishing.

Workflow changes must:

- Use the minimum permissions required.
- Treat pull-request and issue-controlled input as untrusted.
- Never expose secrets in logs.
- Keep deployment and package publishing permissions separated where practical.
- Preserve browser tests against the actual deployment artifact.
- Avoid weakening tests or suppressing errors merely to make CI pass.

Do not add unrelated external deployment services without a clear project requirement.

## Local Setup

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

Use a local HTTP server when testing ES modules, service workers, or PWA behavior.

For example:

```bash
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

Do not commit generated build output, local credentials, editor-specific files, or unrelated artifacts.

## Pull Requests

A good pull request should include:

- What changed.
- Why the change was needed.
- Tests performed and their results.
- Screenshots or recordings for UI changes.
- Compatibility notes for breaking changes.
- Package/version information when public package behavior changes.

Before submitting, inspect the diff for:

- Secrets or credentials.
- Debugging code.
- Unrelated formatting changes.
- Generated files.
- Accidental API changes.

## Commit Messages

Clear conventional-style commit messages are preferred:

```text
feat(ui): add calculator interaction
fix(sidebar): align control actions
fix(core): handle division by zero
test(browser): cover sidebar behavior
test(conformance): add shared arithmetic vectors
docs: update package documentation
```

## Documentation

If public behavior changes, update the relevant documentation and examples.

Keep installation commands, package versions, API descriptions, and examples consistent with the actual implementation.

Do not document functionality that is not implemented or tested.

## Licensing

By contributing, you agree that your contributions are provided under the project's applicable license terms. Do not submit code, documentation, or assets that you do not have the right to contribute.

## Security

Do not report undisclosed security vulnerabilities through a public issue or pull request. Follow [`SECURITY.md`](./SECURITY.md) for private reporting and responsible disclosure.
