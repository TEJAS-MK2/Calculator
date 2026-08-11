package io.github.tejasmk2.calculator;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.Objects;

/** Lightweight arithmetic operations for Java applications. */
public final class Calculator {
    private static final MathContext MATH_CONTEXT = MathContext.DECIMAL128;

    private Calculator() {
        // Utility class.
    }

    public static BigDecimal add(BigDecimal a, BigDecimal b) {
        return require(a).add(require(b), MATH_CONTEXT);
    }

    public static BigDecimal subtract(BigDecimal a, BigDecimal b) {
        return require(a).subtract(require(b), MATH_CONTEXT);
    }

    public static BigDecimal multiply(BigDecimal a, BigDecimal b) {
        return require(a).multiply(require(b), MATH_CONTEXT);
    }

    public static BigDecimal divide(BigDecimal a, BigDecimal b) {
        require(a);
        require(b);
        if (b.compareTo(BigDecimal.ZERO) == 0) {
            throw new ArithmeticException("cannot divide by zero");
        }
        return a.divide(b, MATH_CONTEXT);
    }

    private static BigDecimal require(BigDecimal value) {
        return Objects.requireNonNull(value, "value must not be null");
    }
}
