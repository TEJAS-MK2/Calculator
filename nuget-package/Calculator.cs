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

    public static decimal Power(decimal value, int exponent)
    {
        if (exponent == 0) return 1m;
        var negative = exponent < 0;
        var power = Math.Abs((long)exponent);
        var result = 1m;
        var baseValue = value;
        while (power > 0)
        {
            if ((power & 1) == 1) result *= baseValue;
            power >>= 1;
            if (power > 0) baseValue *= baseValue;
        }
        return negative ? 1m / result : result;
    }

    public static decimal Percentage(decimal value, decimal percent) => value * percent / 100m;
}
