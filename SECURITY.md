# Security Policy

## Scope

The **TEJAS-MK2 Calculator** project includes the client-side calculator, calculation engine, GitHub Actions workflows, GitHub Pages deployment, service worker, and repository configuration.

Security reports may concern application code, calculation logic, dependencies, CI/CD, workflow permissions, cache behavior, or GitHub Pages configuration.

## Supported Versions

The latest version on `main` is the primary supported development version.

## Reporting a Vulnerability

**Do not disclose an undisclosed security vulnerability publicly.** Do not put sensitive vulnerability details in a public issue, pull request, discussion, or social-media post.

If GitHub Private Vulnerability Reporting is enabled, use it. Otherwise, contact the project maintainer privately through the security/contact channel available from the repository.

If you are unsure whether a report is security-sensitive, report it privately first.

## What to Include

When safe to provide, include:

- Concise vulnerability description.
- Affected component, file, workflow, dependency, or configuration.
- Affected version or commit.
- Reproduction steps or a minimal proof of concept.
- Expected and actual behavior.
- Security impact and realistic attack scenarios.
- Relevant logs or screenshots with secrets removed.

Never include passwords, API keys, access tokens, private keys, session credentials, or other sensitive personal information. Redact secrets from evidence.

## Security-Sensitive Areas

Examples include:

- XSS, HTML injection, unsafe DOM operations, or unsafe URL handling.
- Unsafe calculation/expression parsing or dynamic code execution.
- `eval()`, `Function()`, or similar dangerous execution mechanisms.
- Dependency vulnerabilities or compromised dependencies.
- GitHub Actions workflow injection or excessive permissions.
- Accidental credential or secret exposure.
- Service-worker and cache behavior with security implications.
- GitHub Pages or repository configuration exposing protected resources.

## Out of Scope

Unless there is a security impact, these are normally ordinary issues:

- Cosmetic or visual bugs.
- Calculation mistakes without a security consequence.
- Feature requests.
- General performance problems.
- Documentation errors.
- Ordinary accessibility or usability improvements.

## Credential and Secret Handling

If a credential or secret is accidentally committed:

1. Revoke or rotate it immediately.
2. Notify the maintainer privately.
3. Remove it from repository history when appropriate.
4. Inspect GitHub Actions and deployments for unauthorized use.
5. Do not assume deleting the file from the latest commit makes the secret safe.

Never commit tokens, private keys, passwords, or credentials to source code, documentation, or workflow files.

## GitHub Pages and Actions Security

The website uses GitHub Pages as its only deployment target. The deployment workflow should:

- Use `contents: read` rather than repository write access.
- Use only the Pages permissions required for deployment.
- Use the official GitHub Pages artifact/deployment actions.
- Avoid force-pushing deployment branches.
- Avoid unnecessary credentials and long-lived secrets.
- Validate application assets and tests before deployment.

## Response Process

When reasonably possible, maintainers will:

1. Acknowledge and review the report.
2. Validate and reproduce the issue.
3. Assess severity, exploitability, affected versions, and impact.
4. Determine whether immediate mitigation is required.
5. Develop and test a fix.
6. Deploy the fix to GitHub Pages when appropriate.
7. Notify affected users when appropriate.
8. Credit the reporter when requested and safe.

Response times depend on severity, complexity, evidence, and maintainer availability.

## Responsible Research

Good-faith security research is welcome. Minimize disruption, avoid accessing data that does not belong to you, and stop testing if you encounter sensitive information.
