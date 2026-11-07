import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('readme documents the current slide composition', () => {
  const readme = readFileSync('README.md', 'utf8');
  for (const path of ['01-introductions', '04-experiments', '06-solution', '07-case-studies', '08-contribute', 'outro']) assert.ok(readme.includes(path), path);
});

test('slide map references existing active slide files', () => {
  const map = readFileSync('docs/research/slide-map.md', 'utf8');
  for (const path of map.matchAll(/`(src\/slides\/[^`]+\.html)`/g)) assert.ok(existsSync(path[1]), path[1]);
});
