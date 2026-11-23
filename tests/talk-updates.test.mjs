import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('experiment method and its list have separate slides', () => {
  const slide = readFileSync('src/slides/04-experiments/_01-method.html', 'utf8');
  assert.equal((slide.match(/<section\b/g) || []).length, 2);
});

test('setup guidance uses mark labels and no command block', () => {
  for (const file of ['06-solution/_03-cache', '06-solution/_04-flight-recorder', '06-solution/_08-guardrails', '06-solution/_10-installer', '08-contribute/_02-where']) {
    assert.doesNotMatch(readFileSync(`src/slides/${file}.html`, 'utf8'), /<code\b/);
  }
  const install = readFileSync('src/slides/08-contribute/_02-where.html', 'utf8');
  assert.doesNotMatch(install, /<pre\b/);
  assert.match(install, /See the getting-started guide before running <mark>pnpm setup<\/mark>\./);
  assert.match(install, /<a href="https:\/\/github\.com\/pixu1980\/rule-mcp">github\.com\/pixu1980\/rule-mcp<\/a>/);
  assert.match(install, /<img src="\.\/assets\/qrcodes\/rule-mcp\.png" alt="RuleMCP" \/>/);
});

test('kicker text is twenty percent larger', () => {
  assert.match(readFileSync('src/styles/index.css', 'utf8'), /p\[data-kicker\]\s*\{[^}]*font-size:\s*0\.66em/s);
});

test('get-started QR is square, capped at 40% of the viewport and centred', () => {
  const slide = readFileSync('src/slides/08-contribute/_02-where.html', 'utf8');
  assert.match(slide, /<figure data-layout="qr">/);

  const css = readFileSync('src/styles/index.css', 'utf8');
  assert.match(css, /figure\[data-layout='qr'\]\s*\{[^}]*justify-content:\s*center/s);
  assert.match(css, /figure\[data-layout='qr'\] img\s*\{[^}]*inline-size:\s*min\(40vw,[^}]*aspect-ratio:\s*1\s*;/s);
});

test('matrix veil adds no scrollable overflow, so reveal can centre the title', () => {
  const css = readFileSync('src/styles/index.css', 'utf8');
  assert.doesNotMatch(css, /section\[data-matrix\]::after/);
  assert.match(css, /section\[data-matrix\]\s*\{[^}]*background-image:\s*radial-gradient/s);
  assert.match(css, /section\[data-matrix\]\s*\{[^}]*background-size:\s*124% 210%/s);
});

test('roadmap includes the proposed next steps', () => {
  const roadmap = readFileSync('src/slides/08-contribute/_03-roadmap.html', 'utf8');
  assert.match(roadmap, /<section\b/);
  for (const phrase of ['installer', 'test isolation', 'agent integrations', 'multilingual', 'Windows', 'benchmarks']) assert.match(roadmap, new RegExp(phrase, 'i'));
});
