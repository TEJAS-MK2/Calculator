package io.github.tejasmk2.calculator;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Objects;

/** Advanced decimal and scientific arithmetic engine for Java applications. */
public final class Calculator {
    private static final MathContext MC = MathContext.DECIMAL128;
    private Calculator() {}
    public static BigDecimal add(BigDecimal a,BigDecimal b){return require(a).add(require(b),MC);}
    public static BigDecimal subtract(BigDecimal a,BigDecimal b){return require(a).subtract(require(b),MC);}
    public static BigDecimal multiply(BigDecimal a,BigDecimal b){return require(a).multiply(require(b),MC);}
    public static BigDecimal divide(BigDecimal a,BigDecimal b){require(a);require(b);if(b.signum()==0)throw new ArithmeticException("cannot divide by zero");return a.divide(b,MC);}
    public static BigDecimal modulo(BigDecimal a,BigDecimal b){require(a);require(b);if(b.signum()==0)throw new ArithmeticException("cannot modulo by zero");return a.remainder(b,MC);}
    public static BigDecimal power(BigDecimal a,int exponent){return require(a).pow(exponent,MC);}
    public static BigDecimal percentage(BigDecimal value,BigDecimal percent){return require(value).multiply(require(percent),MC).divide(BigDecimal.valueOf(100),MC);}
    public static BigDecimal absolute(BigDecimal value){return require(value).abs(MC);}
    public static BigDecimal minimum(BigDecimal... values){return minMax(values,true);}
    public static BigDecimal maximum(BigDecimal... values){return minMax(values,false);}
    public static BigDecimal average(BigDecimal... values){if(values.length==0)throw new IllegalArgumentException("average requires a value");return sum(values).divide(BigDecimal.valueOf(values.length),MC);}
    public static BigDecimal mean(BigDecimal... values){return average(values);}
    public static BigDecimal sum(BigDecimal... values){BigDecimal total=BigDecimal.ZERO;for(BigDecimal v:values)total=add(total,v);return total;}
    public static BigDecimal product(BigDecimal... values){BigDecimal total=BigDecimal.ONE;for(BigDecimal v:values)total=multiply(total,v);return total;}
    public static BigDecimal clamp(BigDecimal value,BigDecimal minimum,BigDecimal maximum){require(value);require(minimum);require(maximum);if(minimum.compareTo(maximum)>0)throw new IllegalArgumentException("minimum cannot exceed maximum");return value.max(minimum).min(maximum);}
    public static BigDecimal reciprocal(BigDecimal value){require(value);if(value.signum()==0)throw new ArithmeticException("cannot take reciprocal of zero");return BigDecimal.ONE.divide(value,MC);}
    public static BigDecimal square(BigDecimal value){return multiply(value,value);}
    public static BigDecimal cube(BigDecimal value){return multiply(square(value),value);}
    public static double squareRoot(double value){if(value<0)throw new IllegalArgumentException("square root requires a non-negative value");return Math.sqrt(value);}
    public static double cubeRoot(double value){return Math.cbrt(value);}
    public static double sine(double value,boolean degrees){return Math.sin(degrees?Math.toRadians(value):value);}
    public static double cosine(double value,boolean degrees){return Math.cos(degrees?Math.toRadians(value):value);}
    public static double tangent(double value,boolean degrees){return Math.tan(degrees?Math.toRadians(value):value);}
    public static double secant(double value,boolean degrees){return 1.0/cosine(value,degrees);}
    public static double cosecant(double value,boolean degrees){return 1.0/sine(value,degrees);}
    public static double cotangent(double value,boolean degrees){return 1.0/tangent(value,degrees);}
    public static double arcsine(double value,boolean degrees){double r=Math.asin(value);return degrees?Math.toDegrees(r):r;}
    public static double arccosine(double value,boolean degrees){double r=Math.acos(value);return degrees?Math.toDegrees(r):r;}
    public static double arctangent(double value,boolean degrees){double r=Math.atan(value);return degrees?Math.toDegrees(r):r;}
    public static double atan2(double y,double x,boolean degrees){double r=Math.atan2(y,x);return degrees?Math.toDegrees(r):r;}
    public static double hyperbolicSine(double value){return Math.sinh(value);}
    public static double hyperbolicCosine(double value){return Math.cosh(value);}
    public static double hyperbolicTangent(double value){return Math.tanh(value);}
    public static double logarithm(double value,double base){if(value<=0||base<=0||base==1)throw new IllegalArgumentException("invalid logarithm domain");return Math.log(value)/Math.log(base);}
    public static double naturalLog(double value){if(value<=0)throw new IllegalArgumentException("natural logarithm requires a positive value");return Math.log(value);}
    public static double exponential(double value){return Math.exp(value);}
    public static double hypot(double... values){if(values.length==0)throw new IllegalArgumentException("hypot requires a value");double sum=0;for(double v:values)sum+=v*v;return Math.sqrt(sum);}
    public static long gcd(long a,long b){return java.math.BigInteger.valueOf(a).gcd(java.math.BigInteger.valueOf(b)).longValue();}
    public static long lcm(long a,long b){if(a==0||b==0)return 0;return Math.abs(a/gcd(a,b)*b);}
    public static BigDecimal factorial(int n){if(n<0)throw new IllegalArgumentException("factorial requires a non-negative integer");BigDecimal result=BigDecimal.ONE;for(int i=2;i<=n;i++)result=result.multiply(BigDecimal.valueOf(i),MC);return result;}
    public static BigDecimal combinations(int n,int r){if(n<0||r<0||r>n)throw new IllegalArgumentException("invalid combination range");r=Math.min(r,n-r);BigDecimal result=BigDecimal.ONE;for(int i=1;i<=r;i++)result=result.multiply(BigDecimal.valueOf(n-r+i),MC).divide(BigDecimal.valueOf(i),MC);return result;}
    public static BigDecimal permutations(int n,int r){if(n<0||r<0||r>n)throw new IllegalArgumentException("invalid permutation range");BigDecimal result=BigDecimal.ONE;for(int i=0;i<r;i++)result=result.multiply(BigDecimal.valueOf(n-i),MC);return result;}
    public static BigDecimal median(BigDecimal... values){if(values.length==0)throw new IllegalArgumentException("median requires a value");BigDecimal[] copy=values.clone();java.util.Arrays.sort(copy);int mid=copy.length/2;return copy.length%2==1?copy[mid]:copy[mid-1].add(copy[mid],MC).divide(BigDecimal.valueOf(2),MC);}
    public static BigDecimal variance(BigDecimal... values){if(values.length==0)throw new IllegalArgumentException("variance requires a value");BigDecimal mean=average(values);BigDecimal total=BigDecimal.ZERO;for(BigDecimal v:values){BigDecimal d=v.subtract(mean,MC);total=total.add(d.multiply(d,MC),MC);}return total.divide(BigDecimal.valueOf(values.length),MC);}
    public static double standardDeviation(BigDecimal... values){return Math.sqrt(variance(values).doubleValue());}
    public static BigDecimal range(BigDecimal... values){return maximum(values).subtract(minimum(values),MC);}
    private static BigDecimal minMax(BigDecimal[] values,boolean min){if(values.length==0)throw new IllegalArgumentException("requires a value");BigDecimal result=require(values[0]);for(int i=1;i<values.length;i++){BigDecimal v=require(values[i]);result=min?result.min(v):result.max(v);}return result;}
    private static BigDecimal require(BigDecimal value){return Objects.requireNonNull(value,"value must not be null");}
}
