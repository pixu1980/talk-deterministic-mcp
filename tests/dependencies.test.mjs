import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('manifest dependencies use exact versions', () => {
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
  for (const [name, version] of Object.entries({ ...manifest.dependencies, ...manifest.devDependencies })) {
    assert.match(version, /^(?:workspace:)?\d+\.\d+\.\d+(?:-[\w.-]+)?$/, `${name}: ${version}`);
  }
});
