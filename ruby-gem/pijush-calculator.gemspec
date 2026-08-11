# frozen_string_literal: true

require_relative "lib/pijush_calculator"

Gem::Specification.new do |spec|
  spec.name = "pijush-calculator"
  spec.version = PijushCalculator::VERSION
  spec.authors = ["Pijush Chakraborty"]
  spec.summary = "A lightweight Ruby arithmetic engine for reusable calculator operations."
  spec.description = "A dependency-free Ruby arithmetic API providing predictable addition, subtraction, multiplication, and division with explicit division-by-zero handling."
  spec.homepage = "https://github.com/TEJAS-MK2/Calculator"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.0"
  spec.files = Dir["lib/**/*.rb", "README.md", "LICENSE"]
  spec.require_paths = ["lib"]
  spec.metadata = {
    "github_repo" => "https://github.com/TEJAS-MK2/Calculator"
  }
end
