# frozen_string_literal: true

require_relative "lib/pijush_calculator"

Gem::Specification.new do |spec|
  spec.name = "pijush-calculator"
  spec.version = PijushCalculator::VERSION
  spec.authors = ["Pijush Chakraborty"]
  spec.summary = "A lightweight Ruby calculator engine."
  spec.description = "A small, dependency-free Ruby calculation engine for basic arithmetic, designed as part of the Modern Calculator project."
  spec.homepage = "https://github.com/TEJAS-MK2/Calculator"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.0"
  spec.files = Dir["lib/**/*.rb", "README.md", "LICENSE"]
  spec.require_paths = ["lib"]
  spec.metadata = {
    "github_repo" => "ssh://github.com/TEJAS-MK2/Calculator"
  }
end
