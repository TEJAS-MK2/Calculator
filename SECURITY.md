# Security Policy

## Supported versions

The `main` branch is the supported development line. Released package versions should be upgraded promptly when a security fix is published.

## Reporting a vulnerability

Please report security vulnerabilities privately through GitHub's repository security reporting mechanism rather than opening a public issue. Include a clear description, affected component/version, reproduction steps, and the potential impact.

Do not include passwords, API keys, access tokens, or other secrets in a report.

## Release security

Publishing workflows require an explicit version tag or an explicit manual publish input. Ordinary pushes to `main` run tests only and do not publish packages.

GitHub Actions publishing jobs use least-privilege package permissions. RubyGems publication also requires its configured credential to be present.

## Browser application security

The calculator performs calculations locally in the browser. History is stored in browser `localStorage`; it is not uploaded by the calculator application. Do not store sensitive information in calculation history on shared devices.
