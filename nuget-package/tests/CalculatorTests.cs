using Pijush.Calculator;

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
}
