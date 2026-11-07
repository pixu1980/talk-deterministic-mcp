import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('phase one narrative slides include speaker notes', () => {
  for (const file of [
    '02-what-i-do/_01-role.html',
    '02-what-i-do/_02-company.html',
    '02-what-i-do/_03-community.html',
    '03-the-need/_01-simple-request.html',
    '03-the-need/_02-manual-workflow.html',
    '03-the-need/_03-weak-contracts.html',
  ]) {
    const slide = readFileSync(`src/slides/${file}`, 'utf8');
    assert.match(slide, /<aside class="notes">/, file);
  }
});

test('phase one labels the model comparison as illustrative', () => {
  const slide = readFileSync('src/slides/03-the-need/_03-weak-contracts.html', 'utf8');
  assert.match(slide, /illustrative example/i);
});
