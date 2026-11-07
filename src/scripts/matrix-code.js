/**
 * FILE: matrix-code.js
 * USAGE: Animated character rain painted behind the title slide
 * SCOPE: <matrix-code> element
 */

/* Paused while the title slide is off screen, so the deck keeps its frames. */
let running = true;

function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}

function pick(...args) {
  return args[r(0, args.length - 1)];
}

function getChar() {
  return String.fromCharCode(pick(r(0x3041, 0x30ff), r(0x2000, 0x206f), r(0x0020, 0x003f)));
}

function loop(fn, delay) {
  let stamp = Date.now();
  function _loop() {
    if (running && Date.now() - stamp >= delay) {
      fn();
      stamp = Date.now();
    }
    requestAnimationFrame(_loop);
  }
  requestAnimationFrame(_loop);
}

class Char {
  constructor() {
    this.element = document.createElement('span');
    this.mutate();
  }

  mutate() {
    this.element.textContent = getChar();
  }
}

class Trail {
  constructor(list = [], options) {
    this.list = list;
    this.options = Object.assign({ size: 10, offset: 0 }, options);
    this.body = [];
    this.move();
  }

  traverse(fn) {
    this.body.forEach((n, i) => {
      const last = i === this.body.length - 1;
      if (n) fn(n, i, last);
    });
  }

  move() {
    this.body = [];
    const { offset, size } = this.options;
    for (let i = 0; i < size; ++i) {
      const item = this.list[offset + i - size + 1];
      this.body.push(item);
    }
    this.options.offset = (offset + 1) % (this.list.length + size - 1);
  }
}

class Rain {
  constructor({ target, row }) {
    this.element = document.createElement('p');
    this.build(row);
    if (target) {
      target.appendChild(this.element);
    }
    this.drop();
  }

  build(row = 20) {
    const root = document.createDocumentFragment();
    const chars = [];
    for (let i = 0; i < row; ++i) {
      const c = new Char();
      root.appendChild(c.element);
      chars.push(c);
      if (Math.random() < 0.5) {
        loop(() => c.mutate(), r(1e3, 5e3));
      }
    }
    this.trail = new Trail(chars, { size: r(10, 30), offset: r(0, 100) });
    this.element.appendChild(root);
  }

  drop() {
    const trail = this.trail;
    const len = trail.body.length;
    const delay = r(10, 100);
    loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        c.element.style = `
          color: hsl(136, 100%, ${(85 / len) * (i + 1)}%)
        `;
        if (last) {
          c.mutate();
          c.element.style = `
            color: hsl(136, 100%, 85%);
            text-shadow:
              0 0 .5em #fff,
              0 0 .5em currentColor;
          `;
        }
      });
    }, delay);
  }
}

const matrixCode = document.querySelector('matrix-code');
const titleSlide = document.querySelector('section[data-matrix]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (matrixCode && titleSlide && !reduceMotion) {
  new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
    matrixCode.hidden = !entry.isIntersecting;
  }).observe(titleSlide);

  for (let i = 0; i < 200; ++i) {
    new Rain({ target: matrixCode, row: 60 });
  }
}
