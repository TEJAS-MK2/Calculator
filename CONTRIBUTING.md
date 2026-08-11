# Contributing to Calculator

Thank you for contributing to **TEJAS-MK2 Calculator**. Contributions are welcome across the web application, calculation engine, tests, documentation, accessibility, performance, and GitHub Actions.

## Before You Start

1. Search existing issues and pull requests.
2. Read the relevant documentation and package README.
3. Keep changes focused and explain significant design changes when practical.
4. Never commit passwords, registry tokens, API keys, private keys, or other secrets.
5. Report security vulnerabilities privately according to [`SECURITY.md`](./SECURITY.md).

## Repository Areas

| Area | Purpose |
|---|---|
| `index.html` / `styles.css` | Web calculator structure and styling |
| `script.js` | Sidebar, theme, and page-level interaction |
| `calculator-core-ui.js` | Calculator behavior and UI integration |
| `sw.js` / `manifest.json` | PWA and offline behavior |
| `packages/calculator-core/` | JavaScript calculation engine |
| `tests/` | Browser smoke tests |
| `.github/workflows/` | Browser validation and GitHub Pages deployment |

## Web UI Guidelines

- Keep the main calculator focused on arithmetic input and output.
- Keep **History, Clear, and Theme in the sidebar** rather than duplicating them on the main keypad.
- Preserve the compact responsive layout.
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

## Testing Checklist

### Web calculator

- Basic arithmetic works correctly.
- Decimal input works correctly.
- Clear resets calculator state.
- Backspace behaves correctly.
- History opens, displays, and reuses calculations correctly.
- About panel opens and closes correctly.
- Theme control works from the sidebar.
- Sidebar opens and closes correctly.
- Layout works on mobile and desktop sizes.
- Keyboard input remains accessible.
- No browser console errors.
- PWA/service-worker changes do not break normal navigation.

### Calculation engine

```bash
cd packages/calculator-core
npm test
```

## GitHub Pages

**GitHub Pages is the only deployment target.** Do not add workflows that publish the website to Docker registries, package registries, external hosting services, or custom deployment branches.

The Pages workflow must use least-privilege permissions and the official GitHub Pages artifact/deployment actions.

## Development Setup

```bash
git clone https://github.com/TEJAS-MK2/Calculator.git
cd Calculator
git checkout -b feature/your-feature-name
```

Use a local HTTP server when testing ES modules or service workers.

## Pull Requests

Keep pull requests focused and easy to review. Include:

- What changed and why.
- Related issues when applicable.
- Tests for behavior changes.
- Screenshots or recordings for UI changes.
- Compatibility notes for breaking changes.

Suggested commit messages:

```text
feat(ui): add calculator interaction
fix(sidebar): align control actions
fix(core): handle division by zero
test(browser): cover sidebar behavior
docs: refresh calculator documentation
```

## Licensing

By contributing, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE) and applicable package-specific license terms.
