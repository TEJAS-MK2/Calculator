# Security Policy

## Supported Versions

The **latest version on `main`** is the primary supported version for security fixes. Released package versions may have their own support lifecycle as documented in the relevant package directory.

This repository contains a client-side web application, a JavaScript calculation package, and a Ruby gem. Security issues may therefore affect application code, package code, dependencies, GitHub Actions, GitHub Pages, package publishing, or repository configuration.

## Reporting a Vulnerability

**Please do not disclose security vulnerabilities publicly in a GitHub issue, discussion, pull request, or social-media post.** Public disclosure can expose users before a fix is available.

If **GitHub Private Vulnerability Reporting** is enabled for this repository, use that mechanism to submit the report. Otherwise, contact the project maintainer privately through the security/contact channel available on the repository's GitHub profile.

Do not use a public issue for an undisclosed vulnerability.

## What to Include

A useful security report should include, when available:

- A concise description of the vulnerability.
- The affected component, file, package, workflow, dependency, or configuration.
- The affected version or commit.
- Clear reproduction steps.
- Expected and actual behavior.
- Security impact and realistic attack scenarios.
- A minimal proof of concept or test case, when safe to provide.
- Relevant logs, screenshots, or stack traces with sensitive information removed.
- A suggested mitigation or fix, if you have one.

**Never include secrets or sensitive personal information in a report.** Redact passwords, access tokens, API keys, private keys, session credentials, personal addresses, and other sensitive values before submitting evidence.

## Security-Sensitive Areas

Reports may involve, but are not limited to:

- Unsafe DOM manipulation, HTML injection, or cross-site scripting (XSS).
- Unsafe handling of user-controlled expressions or input.
- Use of dangerous JavaScript execution mechanisms.
- Dependency vulnerabilities or compromised dependencies.
- Supply-chain and package-publishing issues.
- GitHub Actions workflow permissions or workflow injection.
- GitHub Packages authentication and publishing configuration.
- Accidental exposure of credentials or secrets.
- Service-worker or cache behavior with security implications.
- GitHub Pages or repository configuration that creates a security risk.
- Vulnerabilities in the JavaScript calculation package or Ruby gem.

## Out of Scope

The following should normally be reported as ordinary GitHub Issues rather than security vulnerabilities:

- Cosmetic or visual bugs with no security impact.
- Ordinary calculation errors.
- Feature requests.
- Performance problems without a security impact.
- Documentation issues.
- General usability problems.

If you are unsure whether something is security-sensitive, report it privately rather than publishing technical details publicly.

## Response Process

After receiving a security report, the maintainer will, when reasonably possible:

1. Acknowledge receipt and review the report.
2. Validate and reproduce the reported behavior.
3. Assess severity, exploitability, affected versions, and potential impact.
4. Determine whether immediate mitigation is necessary.
5. Develop, test, and review an appropriate fix.
6. Release or deploy the fix and update affected package versions when necessary.
7. Notify affected users or package consumers when appropriate.
8. Credit the reporter if they request attribution and doing so does not create a security or privacy concern.

Response and remediation times depend on severity, complexity, available evidence, and maintainer availability. A lack of immediate acknowledgement should not be interpreted as permission to publicly disclose the vulnerability.

## Coordinated Disclosure

Please allow reasonable time for investigation and remediation before publicly disclosing vulnerability details.

If a vulnerability requires coordinated disclosure with a dependency, package registry, hosting provider, or other affected project, the maintainer may coordinate disclosure timing with the relevant parties.

Please do not publish a working exploit, sensitive evidence, credentials, or detailed reproduction steps while the issue remains unresolved.

## Credential and Secret Handling

If you accidentally commit a secret:

1. **Do not** simply delete it from the latest commit and assume it is safe.
2. Revoke or rotate the exposed credential immediately.
3. Notify the maintainer privately.
4. Remove the secret from the repository history when appropriate.
5. Check workflows, package publishing credentials, and deployments for unauthorized use.

Never commit secrets to source files, configuration committed to Git, GitHub Actions logs, package artifacts, or documentation.

## Third-Party Dependencies

Security reports affecting a third-party dependency should include the dependency name and affected version. When appropriate, the maintainer may coordinate with the upstream project rather than independently disclosing an upstream vulnerability.

## Package Security

The JavaScript package and Ruby gem are distributed through package registries. Package releases should be generated through the repository's controlled publishing workflows whenever possible.

Contributors must not add registry tokens, publishing credentials, or other secrets to package source code or workflow files. Changes to package metadata, publishing workflows, permissions, or release automation should receive particular security scrutiny.

## Responsible Disclosure

We appreciate responsible security research and good-faith reports. Please provide enough information for the maintainer to understand and reproduce the issue while minimizing unnecessary exposure of sensitive details.

Thank you for helping keep the Calculator project, its packages, and its users safer.