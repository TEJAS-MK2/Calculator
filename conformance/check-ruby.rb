require 'json'

# Run conformance against the checked-out Ruby engine rather than a
# separately installed/published gem. This keeps CI deterministic and
# ensures the vectors exercise the exact source under test.
ruby_root = File.expand_path('../ruby-gem/lib', __dir__)
$LOAD_PATH.unshift(ruby_root) unless $LOAD_PATH.include?(ruby_root)
require 'pijush_calculator'

vectors = JSON.parse(File.read(File.join(__dir__, 'vectors.json')))
operations = {
  'add' => ->(a, b) { PijushCalculator.add(a, b) },
  'subtract' => ->(a, b) { PijushCalculator.subtract(a, b) },
  'multiply' => ->(a, b) { PijushCalculator.multiply(a, b) },
  'divide' => ->(a, b) { PijushCalculator.divide(a, b) }
}

vectors.each_with_index do |vector, index|
  actual = operations.fetch(vector['operation']).call(vector['a'], vector['b'])
  expected = vector['expected']
  raise "Vector #{index + 1} failed: #{actual} != #{expected}" if (actual.to_f - expected.to_f).abs > 1e-12
end

puts "Ruby conformance passed: #{vectors.length} vectors"
