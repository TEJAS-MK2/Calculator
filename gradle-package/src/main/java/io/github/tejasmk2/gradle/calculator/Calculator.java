package io.github.tejasmk2.gradle.calculator;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Objects;

/** Advanced decimal arithmetic engine for Gradle applications. */
public final class Calculator {
    private static final MathContext MC=MathContext.DECIMAL128;
    private Calculator(){}
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
    public static BigDecimal average(BigDecimal... values){if(values.length==0)throw new IllegalArgumentException("average requires a value");BigDecimal total=BigDecimal.ZERO;for(BigDecimal v:values)total=add(total,v);return total.divide(BigDecimal.valueOf(values.length),MC);}
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
    public static double logarithm(double value,double base){if(value<=0||base<=0||base==1)throw new IllegalArgumentException("invalid logarithm domain");return Math.log(value)/Math.log(base);}
    public static double naturalLog(double value){if(value<=0)throw new IllegalArgumentException("natural logarithm requires a positive value");return Math.log(value);}
    public static double exponential(double value){return Math.exp(value);}
    public static long gcd(long a,long b){return java.math.BigInteger.valueOf(a).gcd(java.math.BigInteger.valueOf(b)).longValue();}
    public static long lcm(long a,long b){if(a==0||b==0)return 0;return Math.abs(a/gcd(a,b)*b);}
    public static BigDecimal factorial(int n){if(n<0)throw new IllegalArgumentException("factorial requires a non-negative integer");BigDecimal result=BigDecimal.ONE;for(int i=2;i<=n;i++)result=result.multiply(BigDecimal.valueOf(i),MC);return result;}
    private static BigDecimal minMax(BigDecimal[] values,boolean min){if(values.length==0)throw new IllegalArgumentException("requires a value");BigDecimal result=require(values[0]);for(int i=1;i<values.length;i++){BigDecimal v=require(values[i]);result=min?result.min(v):result.max(v);}return result;}
    private static BigDecimal require(BigDecimal value){return Objects.requireNonNull(value,"value must not be null");}
}
