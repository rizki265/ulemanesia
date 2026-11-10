import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcData = Buffer.concat([typeBuf, data]);
  const crc = crc32(crcData);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function trimPng(inputPath, outputPath) {
  const buf = fs.readFileSync(inputPath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);

  let pos = 8;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
    pos += 12 + len;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = width * 4 + 1;

  // Find content bounds with alpha > 10
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    const rowStart = y * stride + 1;
    for (let x = 0; x < width; x++) {
      const a = decompressed[rowStart + x * 4 + 3];
      if (a > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add small 10px padding for safety
  minX = Math.max(0, minX - 10);
  minY = Math.max(0, minY - 10);
  maxX = Math.min(width - 1, maxX + 10);
  maxY = Math.min(height - 1, maxY + 10);

  const newWidth = maxX - minX + 1;
  const newHeight = maxY - minY + 1;
  console.log(`Original: ${width}x${height} -> Trimmed: ${newWidth}x${newHeight}`);

  const newStride = newWidth * 4 + 1;
  const newRaw = Buffer.alloc(newStride * newHeight);

  for (let y = 0; y < newHeight; y++) {
    const origY = minY + y;
    const origRowStart = origY * stride + 1;
    const newRowStart = y * newStride;

    newRaw[newRowStart] = 0; // Filter: None
    const srcStart = origRowStart + minX * 4;
    const srcEnd = srcStart + newWidth * 4;
    decompressed.copy(newRaw, newRowStart + 1, srcStart, srcEnd);
  }

  const newIdatData = zlib.deflateSync(newRaw, { level: 9 });

  // Build new PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR: 13 bytes
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(newWidth, 0);
  ihdrData.writeUInt32BE(newHeight, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', newIdatData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const outBuf = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, outBuf);
  console.log(`Saved trimmed PNG to ${outputPath} (${outBuf.length} bytes)`);
}

// Backup original first
if (!fs.existsSync('public/logo-original.png')) {
  fs.copyFileSync('public/logo.png', 'public/logo-original.png');
}

trimPng('public/logo-original.png', 'public/logo.png');
trimPng('public/logo-original.png', 'public/logo-ulemanesia.png');

