#!/usr/bin/env node
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/convert-screenshots.mjs <outDir> <mapping.json>');
  console.error('mapping.json item: { src, out, maxSize?, quality?, icon?: { out, rightOffset?, topOffset?, cropSize?, outSize? } }');
  process.exit(1);
}

const [outDir, mappingPath] = args;
const mapping = JSON.parse(await readFile(mappingPath, 'utf-8'));

const ensure = async (p) => { if (!existsSync(p)) await mkdir(p, { recursive: true }); };
await ensure(outDir);

let okMain = 0;
let okIcon = 0;
for (const item of mapping) {
  const maxSize = item.maxSize ?? 900;
  const quality = item.quality ?? 80;

  // 1) 메인 (툴팁 전체)
  try {
    const outPath = path.join(outDir, `${item.out}.webp`);
    await ensure(path.dirname(outPath));
    const meta = await sharp(item.src).metadata();
    const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
    let pipeline = sharp(item.src);
    if (longest > maxSize) {
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
    okMain++;
  } catch (e) {
    console.error(`  FAIL main ${item.out}: ${e.message}`);
  }

  // 2) 아이콘 (옵션 — 우측 상단 영역 크롭)
  if (item.icon) {
    try {
      const ic = item.icon;
      const rightOffset = ic.rightOffset ?? 10;
      const topOffset = ic.topOffset ?? 10;
      const cropSize = ic.cropSize ?? 220;
      const outSize = ic.outSize ?? 200;
      const iconQuality = ic.quality ?? quality;
      const iconOut = path.join(outDir, `${ic.out}.webp`);
      await ensure(path.dirname(iconOut));

      const meta = await sharp(item.src).metadata();
      const left = Math.max(0, (meta.width ?? 0) - cropSize - rightOffset);
      const top = Math.max(0, topOffset);
      await sharp(item.src)
        .extract({ left, top, width: cropSize, height: cropSize })
        .resize(outSize, outSize, { fit: 'inside' })
        .webp({ quality: iconQuality, effort: 6 })
        .toFile(iconOut);
      const iMeta = await sharp(iconOut).metadata();
      console.log(`    icon ${ic.out}.webp  ${iMeta.width}x${iMeta.height}  (crop ${left},${top} ${cropSize}x${cropSize})`);
      okIcon++;
    } catch (e) {
      console.error(`  FAIL icon ${item.out}: ${e.message}`);
    }
  }
}

console.log(`\nDone: ${okMain}/${mapping.length} main, ${okIcon} icons converted to ${outDir}`);
