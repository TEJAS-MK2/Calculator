# Security Policy

## Scope

The **TEJAS-MK2 Calculator** project includes a client-side web application, a JavaScript calculation package, a Ruby gem, a Python package, GitHub Actions workflows, and package-publishing automation.

Security reports may therefore concern application code, expression parsing, dependencies, package supply chain, GitHub Pages, service workers, GitHub Actions, GitHub Packages, PyPI Trusted Publishing, or repository configuration.

## Supported Versions

The latest version on `main` is the primary supported development version. Released package versions should be updated to a new version when a security fix changes published package contents because package registry releases are immutable.

## Reporting a Vulnerability

**Do not disclose an undisclosed security vulnerability publicly.** Do not put sensitive vulnerability details in a public issue, pull request, discussion, or social-media post.

If **GitHub Private Vulnerability Reporting** is enabled for this repository, use it. Otherwise, contact the project maintainer privately through the security/contact channel available from the repository.

If you are unsure whether a report is security-sensitive, report it privately first.

## What to Include

When safe to provide, include:

- A concise description of the vulnerability.
- The affected component, file, package, workflow, dependency, or configuration.
- The affected version or commit.
- Reproduction steps or a minimal proof of concept.
- Expected and actual behavior.
- Security impact and realistic attack scenarios.
- Relevant logs or screenshots with sensitive values removed.
- A suggested mitigation, if known.

**Never include secrets or sensitive personal information.** Redact passwords, API keys, access tokens, private keys, session credentials, addresses, and other private data before submitting evidence.

## Security-Sensitive Areas

Examples include:

- XSS, HTML injection, unsafe DOM operations, or unsafe URL handling.
- Unsafe handling or evaluation of calculator expressions.
- Use of `eval()`, `Function()`, or other dangerous dynamic execution mechanisms.
- Dependency vulnerabilities or compromised dependencies.
- Package supply-chain attacks or malicious package contents.
- npm, RubyGems, PyPI, or GitHub Packages publishing configuration.
- PyPI Trusted Publishing/OIDC configuration and workflow permissions.
- GitHub Actions workflow injection or excessive permissions.
- Accidental credential or secret exposure.
- Service-worker and cache behavior with security implications.
- GitHub Pages or repository configuration that exposes protected resources.
- Vulnerabilities in the JavaScript, Ruby, or Python calculation libraries.

## Out of Scope

Unless there is a security impact, these should normally be reported as ordinary issues:

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
3. Remove the secret from repository history when appropriate.
4. Inspect GitHub Actions, package registries, and deployments for unauthorized use.
5. Do not assume deleting the file from the latest commit makes the secret safe.

Never commit registry tokens, PyPI tokens, GitHub tokens, private keys, passwords, or other credentials to source code, package artifacts, documentation, or workflow files.

## Package and Release Security

Package publishing is automated wherever practical:

- JavaScript packages use GitHub Packages.
- Ruby gems use GitHub Packages RubyGems.
- Python packages use PyPI Trusted Publishing through GitHub Actions OIDC.

Publishing workflow changes should receive additional review. Keep permissions minimal and never replace short-lived trusted publishing with a hard-coded credential.

## Response Process

When reasonably possible, maintainers will:

1. Acknowledge and review the report.
2. Validate and reproduce the issue.
3. Assess severity, exploitability, affected versions, and impact.
4. Determine whether immediate mitigation is required.
5. Develop and test a fix.
6. Release or deploy the fix and update affected package versions when necessary.
7. Notify affected users or consumers when appropriate.
8. Credit the reporter when requested and when doing so does not create a security or privacy concern.

Response times depend on severity, complexity, evidence, and maintainer availability.

## Coordinated Disclosure

Please allow reasonable time for investigation and remediation before publicly disclosing vulnerability details.

When a vulnerability involves a dependency, registry, hosting provider, or another project, maintainers may coordinate disclosure with the affected party.

Do not publish credentials, working exploits, or sensitive reproduction details while the issue remains unresolved.

## Responsible Research

Good-faith security research is welcome. Please minimize disruption, avoid accessing data that does not belong to you, and stop testing if you encounter sensitive information.

Thank you for helping keep the Calculator application, libraries, package infrastructure, and community safer.
