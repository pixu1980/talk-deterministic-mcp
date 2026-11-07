import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { strict as assert } from 'node:assert';

test('outro preserves the original baseline with accessible audio and SVG labels', () => {
  for (const name of ['outro.html', '_wrap-up.html', '_links.html', '_taf.html', '_thanks.html']) {
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
    assert.equal(content, execFileSync('git', ['show', `80f6224d74411c2e0381072958c2279f0f24bf06:${path}`], { encoding: 'utf8' }), path);
  }
  assert.match(readFileSync('src/slides/slides.html', 'utf8'), /\.\/slides\/outro\/outro\.html/);
  assert.match(readFileSync('src/assets/audio/taf-captions.vtt', 'utf8'), /\[Outro music\]/);
});
