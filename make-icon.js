const fs = require('fs');
const path = require('path');

// Creates a clean 1024x1024 SVG icon and converts it via sharp/canvas or saves high-res PNG using built-in zlib
const zlib = require('zlib');

const width = 512;
const height = 512;
const rawData = Buffer.alloc((width * 4 + 1) * height);

for (let y = 0; y < height; y++) {
  const rowStart = y * (width * 4 + 1);
  rawData[rowStart] = 0; // No filter
  for (let x = 0; x < width; x++) {
    const px = rowStart + 1 + x * 4;
    // Rich emerald green gradient background (#15803d to #166534)
    const ratio = (x + y) / (width + height);
    let r = Math.round(22 - ratio * 6);
    let g = Math.round(138 - ratio * 36);
    let b = Math.round(64 - ratio * 14);

    // Draw a crisp white circular badge in the center
    const dx = x - 256;
    const dy = y - 256;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 175) {
      r = 255; g = 255; b = 255;
    }

    // Draw a green shopping basket / bag icon inside the white circle
    // Basket handle (arc)
    if (dy < -30 && dy > -105 && dist > 48 && dist < 66) {
      r = 21; g = 128; b = 61;
    }
    // Basket body (trapezoid)
    if (dy >= -30 && dy <= 85) {
      const halfWidth = 95 - (dy + 30) * 0.22;
      if (Math.abs(dx) <= halfWidth) {
        r = 21; g = 128; b = 61;
        // Golden horizontal stripe on basket
        if (dy >= 5 && dy <= 22) {
          r = 234; g = 179; b = 8;
        }
        // White vertical cutout lines inside basket
        if (dy >= 35 && dy <= 68 && (Math.abs(dx + 32) < 6 || Math.abs(dx) < 6 || Math.abs(dx - 32) < 6)) {
          r = 255; g = 255; b = 255;
        }
      }
    }

    rawData[px] = r;
    rawData[px + 1] = g;
    rawData[px + 2] = b;
    rawData[px + 3] = 255;
  }
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA

const compressed = zlib.deflateSync(rawData);
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  makeChunk('IHDR', ihdr),
  makeChunk('IDAT', compressed),
  makeChunk('IEND', Buffer.alloc(0))
]);

const dirs = [
  'android/app/src/main/res/mipmap-mdpi',
  'android/app/src/main/res/mipmap-hdpi',
  'android/app/src/main/res/mipmap-xhdpi',
  'android/app/src/main/res/mipmap-xxhdpi',
  'android/app/src/main/res/mipmap-xxxhdpi'
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'ic_launcher.png'), png);
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), png);
  fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), png);
});

// Set adaptive icon background to matching green
const valuesDir = 'android/app/src/main/res/values';
fs.mkdirSync(valuesDir, { recursive: true });
fs.writeFileSync(
  path.join(valuesDir, 'ic_launcher_background.xml'),
  '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  <color name="ic_launcher_background">#15803D</color>\n</resources>\n'
);

console.log('Custom Kirana app icons generated successfully!');
