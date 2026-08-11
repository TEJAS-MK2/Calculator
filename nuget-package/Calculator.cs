namespace Pijush.Calculator;

/// <summary>Robust decimal arithmetic engine for .NET applications.</summary>
public static class Calculator
{
    public static decimal Add(decimal a, decimal b) => a + b;
    public static decimal Subtract(decimal a, decimal b) => a - b;
    public static decimal Multiply(decimal a, decimal b) => a * b;

    public static decimal Divide(decimal a, decimal b)
    {
        if (b == 0m) throw new DivideByZeroException("Cannot divide by zero.");
        return a / b;
    }

    public static decimal Modulo(decimal a, decimal b)
    {
        if (b == 0m) throw new DivideByZeroException("Cannot modulo by zero.");
        return a % b;
    }

    public static decimal Power(decimal a, int exponent) => decimal.Pow(a, exponent);
    public static decimal Percentage(decimal value, decimal percent) => value * percent / 100m;
}
