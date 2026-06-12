const fs = require('fs');

const artifactsDir = 'C:/Users/redasalem/.gemini/antigravity-cli/brain/8fb694b1-b736-4625-9a9d-351e6b5c85b6';
const publicDir = 'E:/coding/ai profile/reda-website/public';

const copies = [
  { src: `${artifactsDir}/og_image_1781282945440.png`, dest: `${publicDir}/og-image.png` },
  { src: `${artifactsDir}/favicon_32_1781283856758.png`, dest: `${publicDir}/favicon-32x32.png` },
  { src: `${artifactsDir}/favicon_32_1781283856758.png`, dest: `${publicDir}/favicon-16x16.png` },
  { src: `${artifactsDir}/placeholder_project_1781283807791.png`, dest: `${publicDir}/images/placeholder.png` },
];

copies.forEach(({ src, dest }) => {
  try {
    fs.copyFileSync(src, dest);
    console.log(`OK: ${dest}`);
  } catch (e) {
    console.error(`FAIL: ${dest} - ${e.message}`);
  }
});

console.log('Done.');
