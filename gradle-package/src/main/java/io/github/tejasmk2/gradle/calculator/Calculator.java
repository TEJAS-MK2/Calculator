package io.github.tejasmk2.gradle.calculator;

import java.math.BigDecimal;
import java.math.MathContext;

/** Lightweight arithmetic API for the Gradle package. */
public final class Calculator {
    private static final MathContext MC = MathContext.DECIMAL128;

    private Calculator() {
    }

    public static BigDecimal add(BigDecimal a, BigDecimal b) {
        return a.add(b, MC);
    }

    public static BigDecimal subtract(BigDecimal a, BigDecimal b) {
        return a.subtract(b, MC);
    }

    public static BigDecimal multiply(BigDecimal a, BigDecimal b) {
        return a.multiply(b, MC);
    }

    public static BigDecimal divide(BigDecimal a, BigDecimal b) {
        if (b.signum() == 0) {
            throw new ArithmeticException("cannot divide by zero");
        }
        return a.divide(b, MC);
    }
}
