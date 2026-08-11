# Security Policy

## Scope

The **TEJAS-MK2 Calculator** project includes a client-side web application, calculation engines, JavaScript, Ruby, Python, Maven, Gradle, and NuGet packages, GitHub Actions workflows, GitHub Pages, service workers, and GitHub/PyPI package publishing infrastructure.

Security reports may concern application code, expression parsing, dependencies, package supply chain, CI/CD, registries, container images, workflow permissions, or repository configuration.

## Supported Versions

The latest version on `main` is the primary supported development version. Published package releases are immutable; security fixes to published artifacts should use a new package version.

## Reporting a Vulnerability

**Do not disclose an undisclosed security vulnerability publicly.** Do not put sensitive vulnerability details in a public issue, pull request, discussion, or social-media post.

If **GitHub Private Vulnerability Reporting** is enabled, use it. Otherwise, contact the project maintainer privately through the security/contact channel available from the repository.

If you are unsure whether a report is security-sensitive, report it privately first.

## What to Include

When safe to provide, include:

- Concise vulnerability description.
- Affected component, file, package, workflow, dependency, or configuration.
- Affected version or commit.
- Reproduction steps or minimal proof of concept.
- Expected and actual behavior.
- Security impact and realistic attack scenarios.
- Relevant logs or screenshots with sensitive values removed.
- Suggested mitigation, if known.

Never include passwords, API keys, access tokens, private keys, session credentials, or other sensitive personal information. Redact secrets from evidence.

## Security-Sensitive Areas

Examples include:

- XSS, HTML injection, unsafe DOM operations, or unsafe URL handling.
- Unsafe expression parsing or dynamic code execution.
- `eval()`, `Function()`, or similar dangerous execution mechanisms.
- Dependency vulnerabilities or compromised dependencies.
- npm, RubyGems, PyPI, Maven, Gradle, NuGet, or GitHub Packages publishing configuration.
- PyPI Trusted Publishing/OIDC configuration.
- GitHub Actions workflow injection or excessive permissions.
- Container/Docker image supply-chain issues.
- Accidental credential or secret exposure.
- Service-worker and cache behavior with security implications.
- GitHub Pages or repository configuration exposing protected resources.

## Out of Scope

Unless there is a security impact, these are normally ordinary issues:

- Cosmetic or visual bugs.
- Calculation mistakes.
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

Publishing should be automated and least-privilege wherever practical. GitHub Packages supports the project's npm, RubyGems, Maven/Gradle, NuGet, and container distribution workflows; Python releases use PyPI Trusted Publishing where configured.

Keep workflow permissions minimal, review publishing workflow changes carefully, and prefer short-lived workflow credentials or OIDC over long-lived secrets where the registry supports them.

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

## Coordinated Disclosure

Please allow reasonable time for investigation and remediation before public disclosure.

When a vulnerability involves a dependency, registry, hosting provider, or another project, maintainers may coordinate disclosure with the affected party.

Do not publish credentials, working exploits, or sensitive reproduction details while the issue remains unresolved.

## Responsible Research

Good-faith security research is welcome. Minimize disruption, avoid accessing data that does not belong to you, and stop testing if you encounter sensitive information.

Thank you for helping keep the Calculator application, libraries, packages, workflows, and community safer.
