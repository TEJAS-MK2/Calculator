# Pijush.Calculator — NuGet

Advanced, dependency-free C# numerical engine for .NET applications.

## Requirements

- **.NET 10+**
- Zero runtime dependencies

## Features

- Arithmetic: Add, Subtract, Multiply, Divide, Modulo, Power, Percentage
- Utilities: Absolute, Minimum, Maximum, Average, Sum, Product, Clamp, Reciprocal, Square, Cube
- Roots: SquareRoot and CubeRoot
- Number theory: Factorial, GCD, LCM, Combinations, Permutations
- Trigonometric, inverse, and hyperbolic functions
- Logarithms, exponentials, and multi-value Hypot
- Statistics: Median, Variance, StandardDeviation, Range
- Explicit argument, domain, and divide-by-zero validation

## Installation from GitHub Packages

```bash
dotnet nuget add source https://nuget.pkg.github.com/TEJAS-MK2/index.json \
  --name github \
  --username YOUR_GITHUB_USERNAME \
  --password YOUR_GITHUB_TOKEN \
  --store-password-in-clear-text
```

Then:

```bash
dotnet add package Pijush.Calculator --version 0.6.0
```

## Usage

```csharp
using Pijush.Calculator;

Console.WriteLine(Calculator.Add(2m, 3m));
Console.WriteLine(Calculator.Power(2m, 10));
Console.WriteLine(Calculator.Sine(90, true));
Console.WriteLine(Calculator.Median(9m, 2m, 7m, 4m));
```

## Development

```bash
cd nuget-package
dotnet test tests/Calculator.Tests.csproj
dotnet pack Pijush.Calculator.csproj -c Release
```

GitHub Actions validates the .NET 10 engine before publication.

## Publishing

GitHub Actions publishes the package to GitHub Packages NuGet with the repository `GITHUB_TOKEN`. Credentials are never committed. Published versions are immutable and duplicate versions are safely skipped by the release workflow.

## Package information

| Property | Value |
|---|---|
| Package | `Pijush.Calculator` |
| Version | `0.6.0` |
| Engine | .NET 10+ |
| Runtime dependencies | None |
| Registry | GitHub Packages NuGet |
| Repository | https://github.com/TEJAS-MK2/Calculator |
| Packages | https://github.com/TEJAS-MK2/Calculator/packages |
| License | MIT |

## License

MIT
