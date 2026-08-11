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
end
