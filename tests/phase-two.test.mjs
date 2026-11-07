import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('case study slides reference their screenshots', () => {
  for (const name of ['phonebook', 'bookmarks']) {
    const slide = readFileSync(`src/slides/07-case-studies/_0${name === 'phonebook' ? '1' : '2'}-${name}.html`, 'utf8');
    assert.match(slide, new RegExp(`assets/case-studies/${name}\\.png`));
  }
});

test('case studies and contribution chapters contain slide content', () => {
  for (const file of ['07-case-studies/_01-phonebook', '07-case-studies/_02-bookmarks', '07-case-studies/_04-insight', '08-contribute/_01-cta', '08-contribute/_02-where']) {
    assert.match(readFileSync(`src/slides/${file}.html`, 'utf8'), /<section\b/, file);
  }
});

test('solution slides contain content and source notes', () => {
  for (const file of ['_01-architecture', '_02-gateway', '_03-cache', '_04-flight-recorder', '_05-handoff', '_06-personas', '_07-areas', '_08-guardrails', '_09-surface', '_10-installer']) {
    const slide = readFileSync(`src/slides/06-solution/${file}.html`, 'utf8');
    assert.match(slide, /<section\b/, file);
    assert.match(slide, /<aside class="notes">/, file);
  }
});

test('idea slides have content and the agreed claim', () => {
  for (const file of ['_01-claim', '_02-principles', '_04-diagram']) {
    assert.match(readFileSync(`src/slides/05-idea/${file}.html`, 'utf8'), /<section\b/, file);
  }
  assert.match(readFileSync('src/slides/05-idea/_01-claim.html', 'utf8'), /Every Dev/);
});

test('experiment slides contain content and source notes', () => {
  for (const file of ['_01-method', '_02-phonebook', '_03-bookmarks', '_04-failures', '_05-poc']) {
    const slide = readFileSync(`src/slides/04-experiments/${file}.html`, 'utf8');
    assert.match(slide, /<section\b/, file);
    assert.match(slide, /docs\/research\/benchmark-evidence\.md/, file);
  }
});
