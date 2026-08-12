import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const tag = process.env.GITHUB_REF_NAME ?? '';
const version = tag.startsWith('v') ? tag.slice(1) : '';

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`Release must use a semantic version tag such as v0.7.0; received ${tag || '(none)'}`);
}

const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const versions = new Map([
  ['JavaScript', JSON.parse(read('packages/calculator-core/package.json')).version],
  ['Python', read('python-package/pyproject.toml').match(/^version\s*=\s*"([^"]+)"/m)?.[1]],
  ['Ruby', read('ruby-gem/lib/pijush_calculator.rb').match(/VERSION\s*=\s*"([^"]+)"/)?.[1]],
  ['Maven', read('java-package/pom.xml').match(/<artifactId>pijush-calculator<\/artifactId>\s*<version>([^<]+)<\/version>/)?.[1]],
  ['Gradle', read('gradle-package/build.gradle').match(/^version\s*=\s*'([^']+)'/m)?.[1]],
  ['NuGet', read('nuget-package/Pijush.Calculator.csproj').match(/<Version>([^<]+)<\/Version>/)?.[1]],
]);

const failures = [];
for (const [name, actual] of versions) {
  if (!actual) failures.push(`${name}: version could not be detected`);
  else if (actual !== version) failures.push(`${name}: ${actual} != ${version}`);
}

if (failures.length) {
  throw new Error(`Release version mismatch:\n${failures.join('\n')}`);
}

console.log(`Release version gate passed: all packages are ${version}`);
