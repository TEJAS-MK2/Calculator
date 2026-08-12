using System;
using Pijush.Calculator;
using Xunit;

namespace Pijush.Calculator.Tests;

public class CalculatorTests
{
    [Fact]
    public void Add_Works() => Assert.Equal(5m, Calculator.Add(2m, 3m));

    [Fact]
    public void Subtract_Works() => Assert.Equal(5m, Calculator.Subtract(8m, 3m));

    [Fact]
    public void Multiply_Works() => Assert.Equal(24m, Calculator.Multiply(4m, 6m));

    [Fact]
    public void Divide_Works() => Assert.Equal(4m, Calculator.Divide(20m, 5m));

    [Fact]
    public void Divide_ByZero_Throws() => Assert.Throws<DivideByZeroException>(() => Calculator.Divide(10m, 0m));

    [Theory]
    [InlineData(12.5, 7.5, 20.0)]
    [InlineData(-7.0, 2.0, -5.0)]
    public void Shared_Add_Conformance(double a, double b, double expected) =>
        Assert.Equal((decimal)expected, Calculator.Add((decimal)a, (decimal)b));

    [Fact]
    public void Shared_Subtract_Conformance() =>
        Assert.Equal(5.0m, Calculator.Subtract(12.5m, 7.5m));

    [Fact]
    public void Shared_Multiply_Conformance() =>
        Assert.Equal(100.0m, Calculator.Multiply(12.5m, 8.0m));

    [Fact]
    public void Shared_Divide_Conformance() =>
        Assert.Equal(5.0m, Calculator.Divide(12.5m, 2.5m));

    [Fact]
    public void Shared_Negative_Multiply_Conformance() =>
        Assert.Equal(12.0m, Calculator.Multiply(-3.0m, -4.0m));
}
