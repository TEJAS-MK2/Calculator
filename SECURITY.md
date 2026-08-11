# Security Policy

## Scope

The **TEJAS-MK2 Calculator** project includes the browser calculator, reusable calculation engines, GitHub Actions workflows, GitHub Pages deployment, service worker, package publishing configuration, container configuration, and repository configuration.

Security reports may concern application code, expression parsing, calculation logic, package supply-chain issues, dependencies, CI/CD, workflow permissions, service-worker behavior, deployment configuration, or accidental exposure of credentials and protected resources.

## Supported Versions

The latest version on `main` is the primary supported development version.

Published packages may have their own versioning and release lifecycle. Security fixes should be applied to the latest supported release of the affected package whenever practical.

## Reporting a Vulnerability

**Do not disclose an undisclosed security vulnerability publicly.** Do not put sensitive vulnerability details in a public issue, pull request, discussion, package review, or social-media post.

If GitHub Private Vulnerability Reporting is enabled for this repository, use it. Otherwise, contact the project maintainer privately through the security/contact channel available from the repository.

If you are unsure whether a report is security-sensitive, report it privately first.

Please do not create a public proof of concept that exposes users, credentials, infrastructure, or unpublished vulnerabilities.

## What to Include

When safe to provide, include:

- A concise vulnerability description.
- The affected component, package, file, workflow, dependency, or configuration.
- The affected version, release, or commit.
- Reproduction steps or a minimal proof of concept.
- Expected and actual behavior.
- Security impact and realistic attack scenarios.
- Relevant logs, screenshots, or traces with secrets removed.
- Any suggested mitigation, if known.

Never include passwords, API keys, access tokens, private keys, session credentials, personal data, or other secrets. Redact sensitive information from evidence before submitting it.

## Security-Sensitive Areas

Examples include:

- XSS, HTML injection, unsafe DOM operations, or unsafe URL handling.
- Unsafe expression parsing or unexpected code execution.
- Reintroduction of `eval()`, `Function()`, or similar dynamic execution mechanisms.
- Dependency vulnerabilities, malicious dependencies, or package supply-chain compromise.
- GitHub Actions workflow injection, untrusted input handling, or excessive permissions.
- Accidental credential, token, or secret exposure.
- Service-worker and cache behavior with security implications.
- GitHub Pages or repository configuration exposing protected resources.
- Package publishing or registry configuration that could allow unauthorized publication.
- Container configuration that creates an unexpected security boundary or exposes sensitive data.

## Out of Scope

Unless there is a security impact, these are normally ordinary issues rather than security vulnerabilities:

- Cosmetic or visual bugs.
- Calculation mistakes without a security consequence.
- Feature requests.
- General performance problems.
- Documentation errors.
- Ordinary accessibility or usability improvements.

Please use normal GitHub issues or pull requests for non-sensitive problems.

## Credential and Secret Handling

If a credential or secret is accidentally committed:

1. Revoke or rotate it immediately.
2. Notify the maintainer privately.
3. Remove it from repository history when appropriate.
4. Inspect GitHub Actions, packages, deployments, and other affected services for unauthorized use.
5. Do not assume that deleting the file from the latest commit makes the secret safe.

Never commit tokens, private keys, passwords, registry credentials, or other secrets to source code, documentation, test fixtures, package metadata, or workflow files.

## GitHub Actions and Deployment Security

Workflows should follow least-privilege principles. In particular:

- Grant only the permissions required by each job.
- Treat pull-request and issue-controlled input as untrusted.
- Do not execute untrusted content with write-capable credentials.
- Prefer short-lived GitHub-provided credentials over long-lived secrets.
- Use official GitHub Actions where practical and pin third-party actions appropriately for the project's risk level.
- Avoid unnecessary repository write access.
- Validate application assets and tests before deployment.
- Do not force-push deployment branches as part of normal deployment automation.

GitHub Pages is the website deployment target. Package publication to GitHub Packages is a separate release process and should use only the permissions required for the relevant package registry.

## Service Worker and PWA Security

Changes to the service worker, cache strategy, manifest, or offline assets should be reviewed for:

- Cache poisoning or unsafe caching behavior.
- Serving stale or modified application assets unexpectedly.
- Accidental caching of sensitive information.
- Unsafe navigation or URL handling.
- Unexpected behavior after application upgrades.

Do not cache credentials, authentication tokens, private user information, or other sensitive data in the service-worker cache.

## Responsible Research

Good-faith security research is welcome. Researchers should:

- Minimize disruption and traffic.
- Avoid accessing, modifying, or deleting data that does not belong to them.
- Avoid testing against other users or third-party infrastructure.
- Stop testing if sensitive information is encountered and report it privately.
- Avoid persistence, destructive actions, credential theft, or denial-of-service activity.
- Provide enough technical information for maintainers to reproduce and fix the issue safely.

## Response Process

When reasonably possible, maintainers will:

1. Acknowledge and review the report.
2. Validate and reproduce the issue.
3. Assess severity, exploitability, affected components, and impact.
4. Determine whether immediate mitigation is required.
5. Develop and test a fix.
6. Release or deploy the fix when appropriate.
7. Notify affected users when appropriate.
8. Credit the reporter when requested and safe.

Response times depend on severity, complexity, available evidence, and maintainer availability.

## Disclosure

The project will coordinate disclosure with the reporter when practical. Public disclosure should occur only after a fix or mitigation is available, or after the maintainer and reporter agree that disclosure is appropriate.

Please avoid publishing exploit details while a vulnerability remains unpatched and reasonably exploitable.
