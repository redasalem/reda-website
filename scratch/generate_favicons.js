const fs = require('fs');
const path = require('path');

// We can create a crisp, minimal SVG favicon and 16x16 / 32x32 PNGs using canvas or pure 1x1/minimal base64 png if canvas isn't available, or simple 16x16/32x32 PNG buffer.
// Let's create a clean SVG favicon first:
const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00e08e"/>
      <stop offset="100%" stop-color="#00b872"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="#0b0f17"/>
  <rect x="1" y="1" width="30" height="30" rx="7" fill="none" stroke="url(#g)" stroke-width="1.5"/>
  <text x="16" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="url(#g)" text-anchor="middle">R</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), cleanSvg);
console.log('Wrote clean SVG');
