namespace Pijush.Calculator;

/// <summary>Advanced decimal arithmetic engine for .NET applications.</summary>
public static class Calculator
{
    public static decimal Add(decimal a,decimal b)=>a+b;
    public static decimal Subtract(decimal a,decimal b)=>a-b;
    public static decimal Multiply(decimal a,decimal b)=>a*b;
    public static decimal Divide(decimal a,decimal b){if(b==0m)throw new DivideByZeroException("Cannot divide by zero.");return a/b;}
    public static decimal Modulo(decimal a,decimal b){if(b==0m)throw new DivideByZeroException("Cannot modulo by zero.");return a%b;}
    public static decimal Power(decimal value,int exponent){if(exponent==0)return 1m;var negative=exponent<0;var power=Math.Abs((long)exponent);var result=1m;var baseValue=value;while(power>0){if((power&1)==1)result*=baseValue;power>>=1;if(power>0)baseValue*=baseValue;}return negative?1m/result:result;}
    public static decimal Percentage(decimal value,decimal percent)=>value*percent/100m;
    public static decimal Absolute(decimal value)=>Math.Abs(value);
    public static decimal Minimum(params decimal[] values){if(values.Length==0)throw new ArgumentException("Minimum requires a value.");return values.Min();}
    public static decimal Maximum(params decimal[] values){if(values.Length==0)throw new ArgumentException("Maximum requires a value.");return values.Max();}
    public static decimal Average(params decimal[] values){if(values.Length==0)throw new ArgumentException("Average requires a value.");return values.Average();}
    public static decimal Sum(params decimal[] values)=>values.Sum();
    public static decimal Product(params decimal[] values)=>values.Aggregate(1m,(a,b)=>a*b);
    public static decimal Clamp(decimal value,decimal minimum,decimal maximum){if(minimum>maximum)throw new ArgumentException("minimum cannot exceed maximum");return Math.Clamp(value,minimum,maximum);}
    public static decimal Reciprocal(decimal value){if(value==0m)throw new DivideByZeroException("Cannot take reciprocal of zero.");return 1m/value;}
    public static decimal Square(decimal value)=>value*value;
    public static decimal Cube(decimal value)=>value*value*value;
    public static double SquareRoot(double value){if(value<0)throw new ArgumentException("Square root requires a non-negative value.");return Math.Sqrt(value);}
    public static double CubeRoot(double value)=>Math.Cbrt(value);
    public static double Sine(double value,bool degrees=false)=>Math.Sin(degrees?value*Math.PI/180:value);
    public static double Cosine(double value,bool degrees=false)=>Math.Cos(degrees?value*Math.PI/180:value);
    public static double Tangent(double value,bool degrees=false)=>Math.Tan(degrees?value*Math.PI/180:value);
    public static double Logarithm(double value,double baseValue=10){if(value<=0||baseValue<=0||baseValue==1)throw new ArgumentException("Invalid logarithm domain.");return Math.Log(value,baseValue);}
    public static double NaturalLog(double value){if(value<=0)throw new ArgumentException("Natural logarithm requires a positive value.");return Math.Log(value);}
    public static double Exponential(double value)=>Math.Exp(value);
    public static long GreatestCommonDivisor(long a,long b){a=Math.Abs(a);b=Math.Abs(b);while(b!=0){var t=a%b;a=b;b=t;}return a;}
    public static long LeastCommonMultiple(long a,long b){if(a==0||b==0)return 0;return Math.Abs(a/GreatestCommonDivisor(a,b)*b);}
    public static decimal Factorial(int n){if(n<0)throw new ArgumentException("Factorial requires a non-negative integer.");decimal result=1m;for(var i=2;i<=n;i++)result*=i;return result;}
}
