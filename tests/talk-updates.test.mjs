import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('experiment method and its list have separate slides', () => {
  const slide = readFileSync('src/slides/04-experiments/_01-method.html', 'utf8');
  assert.equal((slide.match(/<section\b/g) || []).length, 2);
});

test('active command labels use mark and the current setup command', () => {
  for (const file of ['06-solution/_03-cache', '06-solution/_04-flight-recorder', '06-solution/_08-guardrails', '06-solution/_10-installer', '08-contribute/_02-where']) {
    assert.doesNotMatch(readFileSync(`src/slides/${file}.html`, 'utf8'), /<code\b/);
  }
  const install = readFileSync('src/slides/08-contribute/_02-where.html', 'utf8');
  assert.match(install, /git clone https:\/\/github\.com\/pixu1980\/rule-mcp\.git\s+cd rule-mcp\s+pnpm setup/);
});

test('kicker text is twenty percent larger', () => {
  assert.match(readFileSync('src/styles/index.css', 'utf8'), /p\[data-kicker\]\s*\{[^}]*font-size:\s*0\.66em/s);
});

test('roadmap includes the proposed next steps', () => {
  const roadmap = readFileSync('src/slides/08-contribute/_03-roadmap.html', 'utf8');
  assert.match(roadmap, /<section\b/);
  for (const phrase of ['installer', 'test isolation', 'agent integrations', 'multilingual', 'Windows', 'benchmarks']) assert.match(roadmap, new RegExp(phrase, 'i'));
});
