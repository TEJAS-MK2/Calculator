# frozen_string_literal: true

require "minitest/autorun"
require_relative "../lib/pijush_calculator"

class PijushCalculatorTest < Minitest::Test
  def test_add
    assert_equal 5, PijushCalculator.add(2, 3)
  end

  def test_subtract
    assert_equal 5, PijushCalculator.subtract(8, 3)
  end

  def test_multiply
    assert_equal 24, PijushCalculator.multiply(4, 6)
  end

  def test_divide
    assert_equal 4.0, PijushCalculator.divide(20, 5)
  end

  def test_divide_by_zero
    assert_raises(ZeroDivisionError) { PijushCalculator.divide(10, 0) }
  end

  def test_version
    refute_empty PijushCalculator::VERSION
  end

  def test_shared_conformance_vectors
    vectors = [
      [:add, 12.5, 7.5, 20.0],
      [:subtract, 12.5, 7.5, 5.0],
      [:multiply, 12.5, 8.0, 100.0],
      [:divide, 12.5, 2.5, 5.0],
      [:add, -7.0, 2.0, -5.0],
      [:multiply, -3.0, -4.0, 12.0]
    ]

    vectors.each do |operation, a, b, expected|
      actual = PijushCalculator.public_send(operation, a, b)
      assert_in_delta expected, actual, 1e-12, "#{operation}(#{a}, #{b})"
    end
  end
end
