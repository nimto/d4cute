#!/usr/bin/env node
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/convert-screenshots.mjs <outDir> <mapping.json>');
  console.error('mapping.json: [{ "src": "path", "out": "name", "maxSize": 900, "quality": 80 }]');
  process.exit(1);
}

const [outDir, mappingPath] = args;
const mapping = JSON.parse(await readFile(mappingPath, 'utf-8'));

if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });

let okCount = 0;
for (const item of mapping) {
  const maxSize = item.maxSize ?? 900;
  const quality = item.quality ?? 80;
  const outPath = path.join(outDir, `${item.out}.webp`);

  try {
    const meta = await sharp(item.src).metadata();
    const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
    const needsResize = longest > maxSize;

    let pipeline = sharp(item.src);
    if (needsResize) {
      pipeline = pipeline.resize({
        width: meta.width >= meta.height ? maxSize : null,
        height: meta.height > meta.width ? maxSize : null,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    await pipeline.webp({ quality, effort: 6 }).toFile(outPath);

    const outMeta = await sharp(outPath).metadata();
    console.log(`  ${item.out}.webp  ${outMeta.width}x${outMeta.height}  (src ${meta.width}x${meta.height})`);
    okCount++;
  } catch (e) {
    console.error(`  FAIL ${item.out}: ${e.message}`);
  }
}

console.log(`\nDone: ${okCount}/${mapping.length} converted to ${outDir}`);
