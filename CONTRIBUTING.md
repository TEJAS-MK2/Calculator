# Contributing to Calculator

Thank you for contributing to the **TEJAS-MK2 Calculator** project.

This guide explains how to report problems, suggest improvements, and submit changes while keeping the project clean and maintainable.

## Code of Conduct

Please read [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md) before contributing. All contributors are expected to participate respectfully and constructively.

## Reporting Bugs

Before opening an issue:

1. Search existing issues to make sure the problem has not already been reported.
2. Confirm that you are testing the current version of the project.
3. Provide enough information for someone else to reproduce the problem.

A useful bug report should include:

- A clear title and description.
- Steps to reproduce the problem.
- Expected behavior.
- Actual behavior.
- Browser and device information when relevant.
- Screenshots or console errors when useful.

For security vulnerabilities, **do not open a public issue**. Follow [`SECURITY.md`](./SECURITY.md) instead.

## Suggesting Features

Feature requests are welcome. Open a GitHub issue and explain:

1. **Problem** — What problem would the feature solve?
2. **Proposal** — How should the feature work?
3. **Alternatives** — What other approaches or workarounds have you considered?
4. **Impact** — How would the change affect the existing calculator experience?

## Pull Requests

### 1. Create a branch

Create a focused branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. Make your changes

Keep changes focused and consistent with the existing codebase.

For this project in particular:

- Keep calculator logic in `script.js`.
- Keep presentation and responsive styling in `styles.css`.
- Keep page structure in `index.html`.
- Use Anime.js for new interface animations rather than introducing a second animation framework.
- Avoid unnecessary dependencies.
- Preserve keyboard accessibility and mobile responsiveness.
- Do not commit secrets, API keys, credentials, or personal information.

### 3. Test your changes

Before opening a pull request, verify:

- Basic arithmetic works correctly.
- Decimal input works correctly.
- Clear and backspace controls work.
- Keyboard controls still work.
- Division by zero is handled safely.
- The interface works on both mobile and desktop sizes.
- Animations do not interfere with calculator interaction.
- The browser console has no new errors.

### 4. Commit and push

Use a short, descriptive commit message:

```bash
git add .
git commit -m "fix: correct calculator input handling"
git push origin feature/your-feature-name
```

### 5. Open a Pull Request

Open a pull request against the `main` branch.

In the pull request description:

- Explain what changed.
- Explain why the change was needed.
- Mention relevant issues using `Closes #123` when appropriate.
- Include screenshots or a short demo for visual changes.

## Code Review

Maintainers may review code for correctness, accessibility, security, performance, maintainability, and consistency with the project.

Please respond to review feedback and keep follow-up commits focused. A pull request may be merged once the required review and checks are complete.

## Documentation Changes

Documentation improvements are welcome. Keep documentation accurate and consistent with the current application, GitHub Pages deployment, and repository structure.

## License

By contributing to this repository, you agree that your contributions are provided under the project's [`LICENSE`](./LICENSE).

Thank you for helping improve Calculator.
