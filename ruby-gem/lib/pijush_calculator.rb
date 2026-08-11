# frozen_string_literal: true

module PijushCalculator
  VERSION = "0.1.4"

  module_function

  def add(a, b) = a + b
  def subtract(a, b) = a - b
  def multiply(a, b) = a * b

  def divide(a, b)
    raise ZeroDivisionError, "cannot divide by zero" if b == 0

    a.to_f / b
  end

  def modulo(a, b)
    raise ZeroDivisionError, "cannot modulo by zero" if b == 0

    a % b
  end

  def power(a, b) = a**b
  def percentage(value, percent) = value * percent / 100.0
end
