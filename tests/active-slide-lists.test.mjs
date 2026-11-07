import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('active ordered lists are rendered as unordered lists', () => {
  for (const path of ['src/slides/02-what-i-do/_02-company.html', 'src/slides/03-the-need/_02-manual-workflow.html', 'src/slides/08-contribute/_01-cta.html', 'src/slides/outro/_wrap-up.html'])
    assert.doesNotMatch(readFileSync(path, 'utf8'), /<ol\b/, path);
});

test('manual workflow has room to breathe across two slides', () => {
  const slide = readFileSync('src/slides/03-the-need/_02-manual-workflow.html', 'utf8');
  assert.equal((slide.match(/<section\b/g) || []).length, 2);
});
