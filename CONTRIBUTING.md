# Contributing to Calculator

Thank you for contributing to **TEJAS-MK2 Calculator**. Contributions are welcome across the web application, reusable calculation engines, tests, documentation, accessibility, performance, package tooling, and GitHub Actions.

The project has two closely related goals: keep the browser calculator simple and reliable, and continue building serious, reusable calculation engines for JavaScript, Java, .NET, and related tooling.

## Before You Start

1. Search existing issues and pull requests before starting work.
2. Read the relevant documentation and package README.
3. Keep changes focused and explain significant design changes when practical.
4. Never commit passwords, registry tokens, API keys, private keys, or other secrets.
5. Report security vulnerabilities privately according to [`SECURITY.md`](./SECURITY.md).
6. For larger changes, open an issue first when discussion would help avoid duplicated work or incompatible designs.

## Repository Areas

| Area | Purpose |
|---|---|
| `index.html` / `styles.css` | Web calculator structure and styling |
| `script.js` | Sidebar, theme, and page-level interaction |
| `calculator-core-ui.js` | Calculator behavior and UI integration |
| `sw.js` / `manifest.json` | PWA and offline behavior |
| `packages/calculator-core/` | JavaScript/ESM calculation engine |
| `java-package/` | Java/Maven calculation package |
| `gradle-package/` | Java/Gradle calculation package |
| `nuget-package/` | C#/.NET calculation package |
| `tests/` | Browser and integration validation |
| `.github/workflows/` | Automated testing and GitHub Pages deployment |

## Web UI Guidelines

- Keep the main calculator focused on everyday arithmetic input and output.
- Keep advanced functionality accessible through the sidebar rather than overcrowding the main keypad.
- Keep **History, Clear, and Theme in the sidebar** where the existing UI design places them.
- Preserve the compact responsive layout and mobile usability.
- Preserve keyboard accessibility and visible focus states.
- Keep Anime.js and other animations purposeful and lightweight.
- Avoid unnecessary motion and respect `prefers-reduced-motion`.
- Avoid expensive layout-triggering animations and unnecessary main-thread work.
- Test both narrow mobile layouts and desktop layouts for UI changes.

## Calculation Engine Guidelines

- Keep arithmetic behavior deterministic and well-defined.
- Do not introduce `eval()` or `Function()`-based expression execution.
- Preserve the existing parser and validation model unless a deliberate design change is being made.
- Add tests for new public calculation behavior.
- Define explicit invalid-input, domain-error, and division-by-zero behavior.
- Validate finite numeric inputs where appropriate.
- Preserve existing public APIs unless a breaking change is intentional and documented.
- Keep package implementations dependency-free where the package currently promises zero runtime dependencies.
- Keep numerical algorithms clear about precision, tolerance, convergence, and domain limitations.

## Package Guidelines

The repository contains reusable calculation packages for multiple ecosystems. When changing a package:

- Update its package README when public APIs, installation, or behavior change.
- Keep package metadata, versioning, coordinates, and documentation consistent.
- Add or update tests for new or changed public APIs.
- Do not commit generated credentials or registry authentication configuration.
- Verify package contents before publishing.
- Do not silently introduce runtime dependencies into packages documented as dependency-free.

### JavaScript package

```bash
cd packages/calculator-core
npm test
npm pack --dry-run
```

### Java/Gradle package

```bash
cd gradle-package
gradle test
gradle build
```

### Java/Maven package

```bash
cd java-package
mvn test
mvn package
```

### .NET/NuGet package

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

## Testing Checklist

### Web calculator

- Basic arithmetic works correctly.
- Decimal input works correctly.
- Parentheses and unary operators behave correctly.
- Clear resets calculator state.
- Backspace behaves correctly.
- History opens, displays, and reuses calculations correctly.
- Theme control works from the sidebar.
- Sidebar opens and closes correctly.
- Advanced feature modes remain usable.
- Layout works on mobile and desktop sizes.
- Keyboard input remains accessible.
- No browser console errors are introduced.
- PWA/service-worker changes do not break normal navigation or offline behavior.

### Calculation engine

- New public functions have tests.
- Invalid arguments are rejected consistently.
- Domain errors are handled explicitly.
- Division by zero is handled explicitly.
- Numerical results remain within the documented precision and tolerance expectations.
- Existing tests continue to pass.

## GitHub Actions and Deployment

**GitHub Pages is the website deployment target.** Do not add workflows that publish the website to unrelated external hosting services or create unnecessary deployment branches.

Package publication is separate from website deployment. Changes to package publishing workflows must preserve least-privilege permissions and must not expose registry credentials.

Workflow changes should:

- Use the minimum permissions required.
- Treat pull-request and issue-controlled input as untrusted.
- Avoid executing untrusted content with write-capable credentials.
- Prefer GitHub-provided short-lived credentials where possible.
- Keep deployment actions and package publishing actions clearly separated.

## Development Setup

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

Use a local HTTP server when testing ES modules, service workers, or PWA behavior.

Do not commit generated build output, local credentials, editor-specific files, or unrelated artifacts unless the repository explicitly requires them.

## Pull Requests

Keep pull requests focused and easy to review. Include:

- What changed and why.
- Related issues when applicable.
- Tests performed and their results.
- Screenshots or recordings for UI changes.
- Compatibility notes for breaking changes.
- Package/versioning notes when public package behavior changes.

Before opening a pull request, review the diff for accidental secrets, debug code, unrelated formatting changes, and generated files.

## Commit Messages

Clear, conventional-style commit messages are preferred. Examples:

```text
feat(ui): add calculator interaction
fix(sidebar): align control actions
fix(core): handle division by zero
test(browser): cover sidebar behavior
docs: refresh calculator documentation
```

## Documentation

When changing public behavior, update the relevant documentation. Keep the root README, package READMEs, examples, installation instructions, and API descriptions consistent with the actual implementation.

Avoid documenting functionality that is not implemented or tested.

## Licensing

By contributing, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE) and applicable package-specific license terms. Do not submit code or documentation that you do not have the right to contribute.

## Security

Please do not report security vulnerabilities through a public pull request or issue. Follow [`SECURITY.md`](./SECURITY.md) for private reporting and responsible disclosure.
