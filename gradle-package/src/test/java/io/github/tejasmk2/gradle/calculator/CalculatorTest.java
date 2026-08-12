package io.github.tejasmk2.gradle.calculator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;

class CalculatorTest {
    @Test
    void add() {
        assertEquals(new BigDecimal("5"), Calculator.add(new BigDecimal("2"), new BigDecimal("3")));
    }

    @Test
    void subtract() {
        assertEquals(new BigDecimal("5"), Calculator.subtract(new BigDecimal("8"), new BigDecimal("3")));
    }

    @Test
    void multiply() {
        assertEquals(new BigDecimal("24"), Calculator.multiply(new BigDecimal("4"), new BigDecimal("6")));
    }

    @Test
    void divide() {
        assertEquals(new BigDecimal("4"), Calculator.divide(new BigDecimal("20"), new BigDecimal("5")));
    }

    @Test
    void divideByZero() {
        assertThrows(ArithmeticException.class,
                () -> Calculator.divide(new BigDecimal("10"), BigDecimal.ZERO));
    }

    @Test
    void sharedConformanceVectors() {
        assertEquals(0, Calculator.add(new BigDecimal("12.5"), new BigDecimal("7.5")).compareTo(new BigDecimal("20.0")));
        assertEquals(0, Calculator.subtract(new BigDecimal("12.5"), new BigDecimal("7.5")).compareTo(new BigDecimal("5.0")));
        assertEquals(0, Calculator.multiply(new BigDecimal("12.5"), new BigDecimal("8.0")).compareTo(new BigDecimal("100.0")));
        assertEquals(0, Calculator.divide(new BigDecimal("12.5"), new BigDecimal("2.5")).compareTo(new BigDecimal("5.0")));
        assertEquals(0, Calculator.add(new BigDecimal("-7.0"), new BigDecimal("2.0")).compareTo(new BigDecimal("-5.0")));
        assertEquals(0, Calculator.multiply(new BigDecimal("-3.0"), new BigDecimal("-4.0")).compareTo(new BigDecimal("12.0")));
    }
}
