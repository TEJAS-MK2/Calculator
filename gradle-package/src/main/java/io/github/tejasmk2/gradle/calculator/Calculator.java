package io.github.tejasmk2.gradle.calculator;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Objects;

/** Robust decimal arithmetic engine for Gradle applications. */
public final class Calculator {
    private static final MathContext MC = MathContext.DECIMAL128;

    private Calculator() {}

    public static BigDecimal add(BigDecimal a, BigDecimal b) { return require(a).add(require(b), MC); }
    public static BigDecimal subtract(BigDecimal a, BigDecimal b) { return require(a).subtract(require(b), MC); }
    public static BigDecimal multiply(BigDecimal a, BigDecimal b) { return require(a).multiply(require(b), MC); }

    public static BigDecimal divide(BigDecimal a, BigDecimal b) {
        require(a); require(b);
        if (b.signum() == 0) throw new ArithmeticException("cannot divide by zero");
        return a.divide(b, MC);
    }

    public static BigDecimal modulo(BigDecimal a, BigDecimal b) {
        require(a); require(b);
        if (b.signum() == 0) throw new ArithmeticException("cannot modulo by zero");
        return a.remainder(b, MC);
    }

    public static BigDecimal power(BigDecimal a, int exponent) { return require(a).pow(exponent, MC); }
    public static BigDecimal percentage(BigDecimal value, BigDecimal percent) { return require(value).multiply(require(percent), MC).divide(BigDecimal.valueOf(100), MC); }
    public static BigDecimal absolute(BigDecimal value) { return require(value).abs(MC); }
    public static BigDecimal minimum(BigDecimal a, BigDecimal b) { return require(a).min(require(b)); }
    public static BigDecimal maximum(BigDecimal a, BigDecimal b) { return require(a).max(require(b)); }
    public static BigDecimal average(BigDecimal a, BigDecimal b) { return add(a, b).divide(BigDecimal.valueOf(2), MC); }

    public static BigDecimal clamp(BigDecimal value, BigDecimal minimum, BigDecimal maximum) {
        require(value); require(minimum); require(maximum);
        if (minimum.compareTo(maximum) > 0) throw new IllegalArgumentException("minimum cannot exceed maximum");
        return value.max(minimum).min(maximum);
    }

    public static BigDecimal reciprocal(BigDecimal value) {
        require(value);
        if (value.signum() == 0) throw new ArithmeticException("cannot take reciprocal of zero");
        return BigDecimal.ONE.divide(value, MC);
    }

    public static BigDecimal square(BigDecimal value) { return multiply(value, value); }
    public static BigDecimal cube(BigDecimal value) { return multiply(square(value), value); }

    private static BigDecimal require(BigDecimal value) { return Objects.requireNonNull(value, "value must not be null"); }
}
