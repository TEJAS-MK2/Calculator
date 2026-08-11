# Pijush.Calculator — NuGet

A lightweight, dependency-free C# arithmetic engine for .NET applications.

## Engine

The current engine provides a compact arithmetic API using .NET `decimal` values with explicit error handling.

### Features

- Addition, subtraction, multiplication, division
- Modulo
- Integer power
- Percentage
- Absolute value, min/max, average, clamp, reciprocal, square, and cube helpers
- Explicit `DivideByZeroException` handling
- .NET 8+
- Zero runtime dependencies

## Installation from GitHub Packages

```bash
dotnet nuget add source https://nuget.pkg.github.com/TEJAS-MK2/index.json \
  --name github \
  --username YOUR_GITHUB_USERNAME \
  --password YOUR_GITHUB_TOKEN \
  --store-password-in-clear-text
```

Then install a published version:

```bash
dotnet add package Pijush.Calculator --version YOUR_VERSION
```

## Usage

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
Console.WriteLine(Calculator.Modulo(20m, 6m));
Console.WriteLine(Calculator.Power(2m, 8));
Console.WriteLine(Calculator.Percentage(250m, 20m));
```

Division and modulo by zero throw `DivideByZeroException`.

## API

| Method | Description |
|---|---|
| `Add(a, b)` | Adds values |
| `Subtract(a, b)` | Subtracts values |
| `Multiply(a, b)` | Multiplies values |
| `Divide(a, b)` | Divides values |
| `Modulo(a, b)` | Calculates remainder |
| `Power(value, exponent)` | Integer exponentiation |
| `Percentage(value, percent)` | Calculates a percentage |

## Development

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

## Publishing

GitHub Actions publishes the package to GitHub Packages NuGet using the repository-provided `GITHUB_TOKEN` with `packages: write` permission. No long-lived package credential is committed to the repository. Published versions are immutable.

## Package information

| Property | Value |
|---|---|
| Package | `Pijush.Calculator` |
| Registry | GitHub Packages NuGet |
| Runtime dependencies | None |
| Target framework | .NET 8+ |
| Repository | `https://github.com/TEJAS-MK2/Calculator` |
| Packages | `https://github.com/TEJAS-MK2/Calculator/packages` |
| License | MIT |

## License

MIT
