# Pijush.Calculator — NuGet

A lightweight, dependency-free C# calculator library for .NET applications.

## Version

**0.1.0**

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Explicit division-by-zero handling
- .NET 8+
- Zero runtime dependencies

## Installation

Once published to GitHub Packages, add the GitHub Packages NuGet source:

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

The package is published to **GitHub Packages — NuGet registry** through GitHub Actions using the repository-provided `GITHUB_TOKEN` with `packages: write` permission. No long-lived package credential is committed to the repository.

## License

MIT
