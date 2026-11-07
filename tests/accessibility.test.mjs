import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('social SVG assets contain an accessible title', () => {
  for (const name of ['codepen', 'github', 'linkedin', 'telegram', 'twitch', 'youtube']) {
    assert.match(readFileSync(`src/assets/logo/${name}.svg`, 'utf8'), /<title>[^<]+<\/title>/i, name);
  }
});

test('rendered example button has an explicit type', () => {
  assert.match(readFileSync('src/slides/_boilerplate/_04-code-and-output.html', 'utf8'), /<button type="button" data-state="ready">/);
});
