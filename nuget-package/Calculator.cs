namespace Pijush.Calculator;

/// <summary>Advanced decimal and scientific arithmetic engine for .NET applications.</summary>
public static class Calculator
{
    public static decimal Add(decimal a,decimal b)=>a+b;
    public static decimal Subtract(decimal a,decimal b)=>a-b;
    public static decimal Multiply(decimal a,decimal b)=>a*b;
    public static decimal Divide(decimal a,decimal b){if(b==0m)throw new DivideByZeroException("Cannot divide by zero.");return a/b;}
    public static decimal Modulo(decimal a,decimal b){if(b==0m)throw new DivideByZeroException("Cannot modulo by zero.");return a%b;}
    public static decimal Power(decimal value,int exponent){if(exponent==0)return 1m;if(exponent<0&&value==0m)throw new DivideByZeroException("Cannot raise zero to a negative power.");var negative=exponent<0;var power=Math.Abs((long)exponent);var result=1m;var baseValue=value;while(power>0){if((power&1)==1)result*=baseValue;power>>=1;if(power>0)baseValue*=baseValue;}return negative?1m/result:result;}
    public static decimal Percentage(decimal value,decimal percent)=>value*percent/100m;
    public static decimal Absolute(decimal value)=>Math.Abs(value);
    public static decimal Minimum(params decimal[] values){if(values.Length==0)throw new ArgumentException("Minimum requires a value.");return values.Min();}
    public static decimal Maximum(params decimal[] values){if(values.Length==0)throw new ArgumentException("Maximum requires a value.");return values.Max();}
    public static decimal Average(params decimal[] values){if(values.Length==0)throw new ArgumentException("Average requires a value.");return values.Average();}
    public static decimal Mean(params decimal[] values)=>Average(values);
    public static decimal Sum(params decimal[] values)=>values.Sum();
    public static decimal Product(params decimal[] values)=>values.Aggregate(1m,(a,b)=>a*b);
    public static decimal Clamp(decimal value,decimal minimum,decimal maximum){if(minimum>maximum)throw new ArgumentException("minimum cannot exceed maximum");return Math.Clamp(value,minimum,maximum);}
    public static decimal Reciprocal(decimal value){if(value==0m)throw new DivideByZeroException("Cannot take reciprocal of zero.");return 1m/value;}
    public static decimal Square(decimal value)=>value*value;
    public static decimal Cube(decimal value)=>value*value*value;
    public static double SquareRoot(double value){if(value<0)throw new ArgumentException("Square root requires a non-negative value.");return Math.Sqrt(value);}
    public static double CubeRoot(double value)=>Math.Cbrt(value);
    public static double NthRoot(double value,int degree){if(degree==0)throw new ArgumentException("Root degree cannot be zero.");if(value<0&&degree%2==0)throw new ArgumentException("Even root requires a non-negative value.");var result=value<0?-Math.Pow(-value,1.0/degree):Math.Pow(value,1.0/degree);return result;}
    public static double Sine(double value,bool degrees=false)=>Math.Sin(degrees?value*Math.PI/180:value);
    public static double Cosine(double value,bool degrees=false)=>Math.Cos(degrees?value*Math.PI/180:value);
    public static double Tangent(double value,bool degrees=false)=>Math.Tan(degrees?value*Math.PI/180:value);
    public static double Secant(double value,bool degrees=false)=>1.0/Cosine(value,degrees);
    public static double Cosecant(double value,bool degrees=false)=>1.0/Sine(value,degrees);
    public static double Cotangent(double value,bool degrees=false)=>1.0/Tangent(value,degrees);
    public static double Arcsine(double value,bool degrees=false){var r=Math.Asin(value);return degrees?r*180/Math.PI:r;}
    public static double Arccosine(double value,bool degrees=false){var r=Math.Acos(value);return degrees?r*180/Math.PI:r;}
    public static double Arctangent(double value,bool degrees=false){var r=Math.Atan(value);return degrees?r*180/Math.PI:r;}
    public static double Atan2(double y,double x,bool degrees=false){var r=Math.Atan2(y,x);return degrees?r*180/Math.PI:r;}
    public static double HyperbolicSine(double value)=>Math.Sinh(value);
    public static double HyperbolicCosine(double value)=>Math.Cosh(value);
    public static double HyperbolicTangent(double value)=>Math.Tanh(value);
    public static double Logarithm(double value,double baseValue=10){if(value<=0||baseValue<=0||baseValue==1)throw new ArgumentException("Invalid logarithm domain.");return Math.Log(value,baseValue);}
    public static double Log2(double value){if(value<=0)throw new ArgumentException("Log2 requires a positive value.");return Math.Log2(value);}
    public static double NaturalLog(double value){if(value<=0)throw new ArgumentException("Natural logarithm requires a positive value.");return Math.Log(value);}
    public static double Exponential(double value)=>Math.Exp(value);
    public static double Hypot(params double[] values){if(values.Length==0)throw new ArgumentException("Hypot requires a value.");return Math.Sqrt(values.Sum(v=>v*v));}
    public static long GreatestCommonDivisor(long a,long b){a=Math.Abs(a);b=Math.Abs(b);while(b!=0){var t=a%b;a=b;b=t;}return a;}
    public static long LeastCommonMultiple(long a,long b){if(a==0||b==0)return 0;return Math.Abs(a/GreatestCommonDivisor(a,b)*b);}
    public static decimal Factorial(int n){if(n<0)throw new ArgumentException("Factorial requires a non-negative integer.");decimal result=1m;for(var i=2;i<=n;i++)result*=i;return result;}
    public static decimal Combinations(int n,int r){if(n<0||r<0||r>n)throw new ArgumentException("Invalid combination range.");r=Math.Min(r,n-r);decimal result=1m;for(var i=1;i<=r;i++)result=result*(n-r+i)/i;return result;}
    public static decimal Permutations(int n,int r){if(n<0||r<0||r>n)throw new ArgumentException("Invalid permutation range.");decimal result=1m;for(var i=0;i<r;i++)result*=n-i;return result;}
    public static decimal Median(params decimal[] values){if(values.Length==0)throw new ArgumentException("Median requires a value.");var copy=values.ToArray();Array.Sort(copy);var mid=copy.Length/2;return copy.Length%2==1?copy[mid]:(copy[mid-1]+copy[mid])/2m;}
    public static decimal Variance(params decimal[] values){if(values.Length==0)throw new ArgumentException("Variance requires a value.");var mean=Average(values);return values.Select(v=>(v-mean)*(v-mean)).Average();}
    public static double StandardDeviation(params decimal[] values)=>Math.Sqrt((double)Variance(values));
    public static decimal Range(params decimal[] values)=>Maximum(values)-Minimum(values);
    public static bool ApproximatelyEqual(double a,double b,double tolerance=1e-9)=>Math.Abs(a-b)<=tolerance;
}
