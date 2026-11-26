// Japan in Numbers — entry program for make.fun's
// best-national-statistics-site-20261126-0539.
//
// The site itself lives in app/ and its screenshots in screenshots/; both are
// committed next to this file. My job is small but strict: copy them to the
// output directory, refuse to hand in a screenshot that breaks the
// competition's caps (wrong format, too big, or the wrong size), and write
// /output/dossier.json with buildDossier from vendor/makefun-frontend.ts.
// If anything is off I fail loudly with exit code 1 instead of handing in a
// broken entry. The copy is byte for byte, so two runs write the same bytes.
//
// Run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Node 22, standard library only.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The competition's caps for screenshots: 3 or 4 images, each at most
// 256 KiB, long side at most 1280 px, short side at least 360 px.
const MAX_SHOTS = 4;
const MAX_SHOT_BYTES = 262144;
const MAX_LONG_SIDE = 1280;
const MIN_SHORT_SIDE = 360;

function fail(message: string): never {
  console.error(`japan-in-numbers: ${message}`);
  process.exit(1);
}

function isPng(bytes: Buffer): boolean {
  return bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
}

function isJpeg(bytes: Buffer): boolean {
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

// Dimensions, read from the image headers (never from the file name):
// PNG stores width/height as big-endian uint32s at offsets 16/20 of the
// IHDR chunk; JPEG keeps them in the first Start Of Frame segment.
function pngDimensions(bytes: Buffer): { width: number; height: number } | null {
  if (bytes.length < 24 || bytes.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function jpegDimensions(bytes: Buffer): { width: number; height: number } | null {
  let at = 2; // skip the SOI marker the signature check already confirmed
  while (at + 3 < bytes.length) {
    if (bytes[at] !== 0xff) return null;
    const marker = bytes[at + 1]!;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) { at += 2; continue; }
    const length = bytes.readUInt16BE(at + 2);
    if (length < 2) return null;
    if (marker >= 0xc0 && marker <= 0xc2) {
      if (at + 9 > bytes.length) return null;
      return { height: bytes.readUInt16BE(at + 5), width: bytes.readUInt16BE(at + 7) };
    }
    at += 2 + length;
  }
  return null;
}

// Check every screenshot in screenshots/ before anything is copied: format
// by magic bytes (not by file name), file size, and count.
const shotDir = join(here, 'screenshots');
const shots = readdirSync(shotDir).filter((name) => !name.startsWith('.')).sort();
if (shots.length < 3 || shots.length > MAX_SHOTS) {
  fail(`expected 3 or 4 screenshots, found ${shots.length}`);
}
for (const name of shots) {
  const path = join(shotDir, name);
  if (!statSync(path).isFile()) fail(`screenshots/${name} is not a regular file`);
  const bytes = readFileSync(path);
  if (bytes.length === 0) fail(`screenshots/${name} is empty`);
  if (bytes.length > MAX_SHOT_BYTES) {
    fail(`screenshots/${name} is ${bytes.length} bytes, over the ${MAX_SHOT_BYTES}-byte cap`);
  }
  if (!isPng(bytes) && !isJpeg(bytes)) {
    fail(`screenshots/${name} starts with neither the PNG nor the JPEG signature`);
  }
  const dims = isPng(bytes) ? pngDimensions(bytes) : jpegDimensions(bytes);
  if (dims === null) fail(`screenshots/${name} has no readable dimensions`);
  const longSide = Math.max(dims.width, dims.height);
  const shortSide = Math.min(dims.width, dims.height);
  if (longSide > MAX_LONG_SIDE) {
    fail(`screenshots/${name} is ${dims.width}x${dims.height}, long side over ${MAX_LONG_SIDE}`);
  }
  if (shortSide < MIN_SHORT_SIDE) {
    fail(`screenshots/${name} is ${dims.width}x${dims.height}, short side under ${MIN_SHORT_SIDE}`);
  }
}

// Ship it: the whole site, the screenshots, and the dossier the kit's
// library builds from them.
mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(shotDir)) cpSync(shotDir, join(out, 'screenshots'), { recursive: true });

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

console.log(
  `japan-in-numbers: ${shots.length} screenshots checked, app/ + screenshots/ copied -> ${out}`,
);
