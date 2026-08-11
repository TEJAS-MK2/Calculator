# Pijush.Calculator — NuGet

A lightweight, dependency-free C# calculator library for .NET applications.

## Version

**0.1.0**

## Features

- Addition, subtraction, multiplication, and division
- Explicit `DivideByZeroException` handling
- .NET 8+
- Zero runtime dependencies
- Simple API for application and library use

## Installation from GitHub Packages

Add the GitHub Packages NuGet source:

```bash
dotnet nuget add source https://nuget.pkg.github.com/TEJAS-MK2/index.json \
  --name github \
  --username YOUR_GITHUB_USERNAME \
  --password YOUR_GITHUB_TOKEN \
  --store-password-in-clear-text
```

Then install:

```bash
dotnet add package Pijush.Calculator --version 0.1.0
```

GitHub Packages requires appropriate package read permission for package installation. citeturn0search10

## Usage

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
Console.WriteLine(Calculator.Subtract(8m, 3m));
Console.WriteLine(Calculator.Multiply(4m, 6m));
Console.WriteLine(Calculator.Divide(20m, 5m));
```

Division by zero throws `DivideByZeroException`.

## Development

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

## Publishing

GitHub Actions publishes the package to the GitHub Packages NuGet registry using the repository-provided `GITHUB_TOKEN` with `packages: write` permission. No long-lived package credential is committed to the repository.

## Package information

| Property | Value |
|---|---|
| Package | `Pijush.Calculator` |
| Version | `0.1.0` |
| Registry | GitHub Packages NuGet |
| Runtime dependencies | None |
| Target framework | .NET 8+ |
| Repository | `https://github.com/TEJAS-MK2/Calculator` |
| Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| License | MIT |

## License

MIT
