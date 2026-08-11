# Pijush.Calculator — NuGet

Advanced, dependency-free C# decimal/scientific engine for .NET applications.

## Engine capabilities

- Arithmetic: Add, Subtract, Multiply, Divide, Modulo, Power, Percentage
- Utilities: Absolute, Minimum, Maximum, Average/Mean, Sum, Product, Clamp, Reciprocal, Square, Cube
- Roots: SquareRoot and CubeRoot
- Number theory: Factorial, GreatestCommonDivisor, LeastCommonMultiple, Combinations, Permutations
- Trigonometry: Sine, Cosine, Tangent, Secant, Cosecant, Cotangent
- Inverse trigonometry and Atan2
- Hyperbolic functions
- Logarithms and exponentials
- Multi-value Hypot
- Statistics: Median, population Variance, StandardDeviation, Range
- Explicit argument and divide-by-zero validation
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

Then:

```bash
dotnet add package Pijush.Calculator --version YOUR_VERSION
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

## Publishing

GitHub Actions publishes the package to GitHub Packages NuGet using the repository `GITHUB_TOKEN` with package write permission. Published versions are immutable and credentials are never committed.

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
