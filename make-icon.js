const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const width = 512;
const height = 512;
const rawData = Buffer.alloc((width * 4 + 1) * height);

for (let y = 0; y < height; y++) {
  const rowStart = y * (width * 4 + 1);
  rawData.writeUInt8(0, rowStart);
  for (let x = 0; x < width; x++) {
    const px = rowStart + 1 + x * 4;
    const ratio = (x + y) / (width + height);
    let r = Math.round(22 - ratio * 6);
    let g = Math.round(138 - ratio * 36);
    let b = Math.round(64 - ratio * 14);

    const dx = x - 256;
    const dy = y - 256;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 175) {
      r = 255; g = 255; b = 255;
    }
    if (dy < -30 && dy > -105 && dist > 48 && dist < 66) {
      r = 21; g = 128; b = 61;
    }
    if (dy >= -30 && dy <= 85) {
      const halfWidth = 95 - (dy + 30) * 0.22;
      if (Math.abs(dx) <= halfWidth) {
        r = 21; g = 128; b = 61;
        if (dy >= 5 && dy <= 22) {
          r = 234; g = 179; b = 8;
        }
        if (dy >= 35 && dy <= 68 && (Math.abs(dx + 32) < 6 || Math.abs(dx) < 6 || Math.abs(dx - 32) < 6)) {
          r = 255; g = 255; b = 255;
        }
      }
    }

    rawData.writeUInt8(r, px);
    rawData.writeUInt8(g, px + 1);
    rawData.writeUInt8(b, px + 2);
    rawData.writeUInt8(255, px + 3);
  }
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf.readUInt8(i);
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
ihdr.writeUInt8(8, 8);
ihdr.writeUInt8(6, 9);

const sig = Buffer.from('89504e470d0a1a0a', 'hex');
const compressed = zlib.deflateSync(rawData);
const png = Buffer.concat([
  sig,
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

for (let i = 0; i < dirs.length; i++) {
  const dir = dirs.at(i);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'ic_launcher.png'), png);
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), png);
  fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), png);
}

const valuesDir = 'android/app/src/main/res/values';
fs.mkdirSync(valuesDir, { recursive: true });
fs.writeFileSync(
  path.join(valuesDir, 'ic_launcher_background.xml'),
  '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  <color name="ic_launcher_background">#15803D</color>\n</resources>\n'
);

console.log('Custom Kirana app icons generated successfully!');
