import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('outro preserves the original baseline with accessible audio and SVG labels', () => {
  const baseline = '80f6224d74411c2e0381072958c2279f0f24bf06';
  for (const name of ['_wrap-up.html', '_taf.html', '_thanks.html']) {
    const path = `src/slides/outro/${name}`;
    let content = readFileSync(path, 'utf8');
    if (name === '_wrap-up.html') {
      content = content.replace('<ul>', '<ol>').replace('</ul>', '</ol>');
    }
    if (name === '_taf.html') {
      assert.match(content, /<track kind="captions"/);
      assert.match(content, /<title>That’s all folks<\/title>/);
      content = content.replace(
        '  <audio data-autoplay src="./assets/audio/taf.mp3">\n    <track kind="captions" src="./assets/audio/taf-captions.vtt" srclang="en" label="English" default />\n  </audio>',
        '  <audio data-autoplay src="./assets/audio/taf.mp3"></audio>'
      );
      content = content.replace('      <title>That’s all folks</title>\n', '');
    }
    assert.equal(content, execFileSync('git', ['show', `${baseline}:${path}`], { encoding: 'utf8' }), path);
  }

  assert.match(readFileSync('src/slides/slides.html', 'utf8'), /\.\/slides\/outro\/outro\.html/);
  assert.match(readFileSync('src/assets/audio/taf-captions.vtt', 'utf8'), /\[Outro music\]/);
});

test('outro keeps the slides links panel active and the personal panels commented', () => {
  const links = readFileSync('src/slides/outro/_links.html', 'utf8');
  const active = links.replace(/<!--[\s\S]*?-->/g, '');
  // One live section (Slides Links); the personal and devdojo panels stay in comments.
  assert.match(active, /^<section data-transition="convex">/m);
  assert.equal((active.match(/<section\b/g) || []).length, 1);
  assert.equal((active.match(/<figcaption>/g) || []).length, 2);
  assert.match(active, /\.\/assets\/qrcodes\/slides\.png\?as=webp/);
  assert.match(active, /\.\/assets\/qrcodes\/slides-repo\.png\?as=webp/);
  assert.match(links, /<!--\s*<section data-transition="convex">\s*\n\s*<h4>Personal &amp; Project Links<\/h4>/);

  const outro = readFileSync('src/slides/outro/outro.html', 'utf8');
  assert.match(outro, /^\s*<include src="\.\/slides\/outro\/_links\.html"><\/include>$/m);
  assert.doesNotMatch(outro, /<!--\s*<include src="\.\/slides\/outro\/_links\.html"/);
});
