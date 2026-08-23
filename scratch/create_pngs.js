const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPng(width, height, r, g, b, a = 255) {
  // Signature
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image data with filter byte 0 at start of each scanline
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Border / interior fill
      const isBorder = (x === 0 || x === width - 1 || y === 0 || y === height - 1);
      if (isBorder) {
        rawData[pxOffset] = 0;     // R
        rawData[pxOffset + 1] = 224; // G
        rawData[pxOffset + 2] = 142; // B
        rawData[pxOffset + 3] = 255; // A
      } else {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = a;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc >>> 0, 8 + len);
  return buf;
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return crc ^ 0xffffffff;
}

const publicDir = path.join(__dirname, '../public');

const png16 = createPng(16, 16, 11, 15, 23); // #0b0f17 dark background with mint border
fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);

const png32 = createPng(32, 32, 11, 15, 23);
fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);

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
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), cleanSvg);

console.log('Successfully optimized favicon files! 16x16 size:', png16.length, 'bytes, 32x32 size:', png32.length, 'bytes');
