# frozen_string_literal: true

module PijushCalculator
  VERSION = "0.1.6"
  module_function
  def add(a,b)=a+b
  def subtract(a,b)=a-b
  def multiply(a,b)=a*b
  def divide(a,b);raise ZeroDivisionError,"cannot divide by zero" if b==0;a.to_f/b;end
  def modulo(a,b);raise ZeroDivisionError,"cannot modulo by zero" if b==0;a%b;end
  def power(a,b)=a**b
  def percentage(value,percent)=value*percent/100.0
  def absolute(value)=value.abs
  def minimum(*values);raise ArgumentError,"minimum requires a value" if values.empty?;values.min;end
  def maximum(*values);raise ArgumentError,"maximum requires a value" if values.empty?;values.max;end
  def average(*values);raise ArgumentError,"average requires a value" if values.empty?;values.sum.to_f/values.length;end
  def sum(*values)=values.sum
  def product(*values)=values.reduce(1,:*)
  def clamp(value,minimum_value,maximum_value);raise ArgumentError,"minimum cannot exceed maximum" if minimum_value>maximum_value;[[value,minimum_value].max,maximum_value].min;end
  def reciprocal(value);raise ZeroDivisionError,"cannot take reciprocal of zero" if value==0;1.0/value;end
  def square(value)=value*value
  def cube(value)=value*value*value
  def square_root(value);raise ArgumentError,"square root requires a non-negative value" if value<0;Math.sqrt(value);end
  def cube_root(value)=Math.cbrt(value)
  def factorial(value);n=Integer(value);raise ArgumentError,"factorial requires a non-negative integer" if n<0;(1..n).reduce(1,:*);end
  def gcd(a,b)=a.to_i.gcd(b.to_i)
  def lcm(a,b)=a.to_i.lcm(b.to_i)
  def sine(value,degrees=false)=Math.sin(degrees ? value*Math::PI/180 : value)
  def cosine(value,degrees=false)=Math.cos(degrees ? value*Math::PI/180 : value)
  def tangent(value,degrees=false)=Math.tan(degrees ? value*Math::PI/180 : value)
  def logarithm(value,base=10);raise ArgumentError,"invalid logarithm domain" if value<=0||base<=0||base==1;Math.log(value,base);end
  def natural_log(value);raise ArgumentError,"natural logarithm requires a positive value" if value<=0;Math.log(value);end
  def exponential(value)=Math.exp(value)
  def combinations(n,r);n=Integer(n);r=Integer(r);raise ArgumentError,"invalid combination range" if n<0||r<0||r>n;(n-r+1..n).reduce(1,:*)/(1..r).reduce(1,:*).to_f;end
  def permutations(n,r);n=Integer(n);r=Integer(r);raise ArgumentError,"invalid permutation range" if n<0||r<0||r>n;(n-r+1..n).reduce(1,:*);end
end
