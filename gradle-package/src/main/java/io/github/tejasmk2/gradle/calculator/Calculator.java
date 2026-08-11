package io.github.tejasmk2.gradle.calculator;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Objects;

/** Robust decimal arithmetic engine for Gradle applications. */
public final class Calculator {
    private static final MathContext MC = MathContext.DECIMAL128;

    private Calculator() {
    }

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

    public static BigDecimal percentage(BigDecimal value, BigDecimal percent) {
        return require(value).multiply(require(percent), MC).divide(BigDecimal.valueOf(100), MC);
    }

    private static BigDecimal require(BigDecimal value) {
        return Objects.requireNonNull(value, "value must not be null");
    }
}
