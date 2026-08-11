namespace Pijush.Calculator;

/// <summary>Lightweight arithmetic operations for .NET applications.</summary>
public static class Calculator
{
    public static decimal Add(decimal a, decimal b) => a + b;

    public static decimal Subtract(decimal a, decimal b) => a - b;

    public static decimal Multiply(decimal a, decimal b) => a * b;

    public static decimal Divide(decimal a, decimal b)
    {
        if (b == 0m)
            throw new DivideByZeroException("Cannot divide by zero.");

        return a / b;
    }
}
