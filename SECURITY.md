# Security Policy

## Scope

This repository contains a browser calculator and reusable calculation engines for JavaScript, Python, Ruby, Java, Gradle, and .NET.

Security reports are welcome for the calculator application, calculation engines, package build/release workflows, CI/CD configuration, and repository infrastructure.

## Supported versions

- `main` is the actively maintained development line.
- The latest published package version is the preferred version for users.
- Older package versions may not receive security fixes. Upgrade to the latest release when a security issue is resolved.

## Reporting a vulnerability

Please report suspected security vulnerabilities **privately through GitHub's repository security reporting mechanism**. Do not open a public issue for an undisclosed vulnerability.

A useful report should include:

1. A clear description of the vulnerability.
2. The affected package, component, workflow, or version.
3. Reproduction steps or a minimal proof of concept.
4. The expected behavior and the observed behavior.
5. The potential security impact.
6. Any relevant logs or screenshots that do not contain secrets.

**Never include passwords, API keys, access tokens, private keys, recovery codes, or other credentials in a report.** If a secret has been exposed, revoke or rotate it immediately and then report the incident privately.

## What to report

Examples of security issues include:

- Remote code execution or arbitrary code execution.
- Cross-site scripting (XSS) or unsafe HTML/DOM injection.
- Injection vulnerabilities in calculator expressions or package APIs.
- Authentication, authorization, or GitHub Actions permission bypasses.
- Secret or credential exposure.
- Malicious or unsafe package publishing behavior.
- Dependency or supply-chain vulnerabilities affecting releases.
- Service-worker or PWA behavior that creates a security boundary violation.
- Denial-of-service or resource-exhaustion issues in public calculation APIs.
- Vulnerabilities that allow calculator input to access unintended browser, filesystem, network, or process capabilities.

## Calculator data and privacy

Calculations are performed locally by the browser application. Calculation history is stored in the browser's `localStorage` and is not intentionally uploaded to the project by the calculator.

Do not enter passwords, API keys, financial credentials, private information, or other sensitive data into calculation history, especially when using a shared device or browser profile.

## Package and release security

Package publishing is restricted by the repository's release workflows. Ordinary pushes to `main` are intended to run tests without publishing packages.

Release workflows should use least-privilege GitHub permissions and protected credentials. Publishing credentials must never be committed to the repository or written into logs.

If a package, release artifact, or repository credential is suspected to be compromised, treat it as a security incident and report it privately. Do not publish replacement credentials in a public issue or pull request.

## Dependency and CI security

Security-sensitive dependency and workflow changes should be reviewed carefully before merging. CI failures must not be bypassed by weakening security checks, suppressing relevant errors, or removing validation solely to make a workflow pass.

GitHub Actions secrets must be supplied through GitHub's secret-management facilities and must not be hard-coded in workflow files or source code.

## Responsible disclosure

Please allow reasonable time for investigation and remediation before publicly disclosing a vulnerability. Coordinated disclosure helps protect users of the calculator and its published packages.

Thank you for helping improve the security and reliability of the project.