# Security Policy

## Scope

The **TEJAS-MK2 Calculator** project includes the client-side calculator, calculation libraries, package registries, GitHub Actions workflows, GitHub Pages deployment, service worker, and container image.

Security reports may concern application code, calculation logic, dependencies, package supply chain, CI/CD, registry configuration, container images, workflow permissions, or repository configuration.

## Supported Versions

The latest version on `main` is the primary supported development version. Published package versions are immutable; security fixes for published artifacts should use a new package version.

## Reporting a Vulnerability

**Do not disclose an undisclosed security vulnerability publicly.** Do not put sensitive vulnerability details in a public issue, pull request, discussion, or social-media post.

If GitHub Private Vulnerability Reporting is enabled, use it. Otherwise, contact the project maintainer privately through the security/contact channel available from the repository.

If you are unsure whether a report is security-sensitive, report it privately first.

## What to Include

When safe to provide, include:

- Concise vulnerability description.
- Affected component, file, package, workflow, dependency, or configuration.
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
- npm, RubyGems, PyPI, Maven, Gradle, NuGet, or GitHub Packages configuration.
- GitHub Actions workflow injection or excessive permissions.
- Container/Docker image supply-chain issues.
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
4. Inspect Actions, package registries, containers, and deployments for unauthorized use.
5. Do not assume deleting the file from the latest commit makes the secret safe.

Never commit registry tokens, PyPI tokens, GitHub tokens, private keys, passwords, or credentials to source code, package artifacts, documentation, or workflow files.

## Package and Release Security

Publishing should be automated and least-privilege wherever practical. Review package and workflow changes carefully, keep versions synchronized with source changes, and use short-lived credentials or OIDC where supported.

Package releases are immutable. Security fixes should be released under a new version rather than attempting to replace an existing artifact.

## Response Process

When reasonably possible, maintainers will:

1. Acknowledge and review the report.
2. Validate and reproduce the issue.
3. Assess severity, exploitability, affected versions, and impact.
4. Determine whether immediate mitigation is required.
5. Develop and test a fix.
6. Release/deploy the fix and update affected package versions.
7. Notify affected users or consumers when appropriate.
8. Credit the reporter when requested and safe.

Response times depend on severity, complexity, evidence, and maintainer availability.

## Responsible Research

Good-faith security research is welcome. Minimize disruption, avoid accessing data that does not belong to you, and stop testing if you encounter sensitive information.

Thank you for helping keep the Calculator application, libraries, packages, workflows, and community safer.
