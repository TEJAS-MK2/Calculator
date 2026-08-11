# Pijush.Calculator — NuGet

Advanced, dependency-free C# arithmetic engine for .NET applications.

## Engine capabilities

The engine uses .NET `decimal` values with explicit validation and safe arithmetic operations.

- Addition, subtraction, multiplication, division, modulo
- Integer power and percentage
- Absolute value, min/max, average, clamp, reciprocal
- Square and cube
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
Console.WriteLine(Calculator.Clamp(120m, 0m, 100m));
```

Division and modulo by zero throw `DivideByZeroException`. Invalid clamp ranges throw `ArgumentException`.

## API

| Method | Purpose |
|---|---|
| `Add`, `Subtract`, `Multiply`, `Divide` | Basic arithmetic |
| `Modulo`, `Power`, `Percentage` | Extended arithmetic |
| `Absolute`, `Minimum`, `Maximum`, `Average` | Numeric utilities |
| `Clamp`, `Reciprocal`, `Square`, `Cube` | Value transformations |

## Development

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

## Publishing

GitHub Actions publishes the package to GitHub Packages NuGet using the repository-provided `GITHUB_TOKEN` with `packages: write` permission. No long-lived package credential is committed. Published versions are immutable.

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
