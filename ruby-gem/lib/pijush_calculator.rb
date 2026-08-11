# frozen_string_literal: true

module PijushCalculator
  VERSION = "0.1.5"

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
  def absolute(value) = value.abs
  def minimum(a, b) = [a, b].min
  def maximum(a, b) = [a, b].max
  def average(a, b) = (a + b) / 2.0

  def clamp(value, minimum_value, maximum_value)
    raise ArgumentError, "minimum_value cannot exceed maximum_value" if minimum_value > maximum_value
    [[value, minimum_value].max, maximum_value].min
  end

  def reciprocal(value)
    raise ZeroDivisionError, "cannot take reciprocal of zero" if value == 0
    1.0 / value
  end

  def square(value) = value * value
  def cube(value) = value * value * value
end
