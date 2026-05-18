// scripts/build-recent-changes.mjs
// Generate src/data/recent-changes.json from git log.
// Per-doc latest update + commit subject. Run before astro build.

import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOCS_DIR = join(ROOT, 'src/content/docs');
const OUT_FILE = join(ROOT, 'src/data/recent-changes.json');
const MAX_ITEMS = 40;
const MAX_COMMITS = 200;

function getGitLog() {
  try {
    return execSync(
      `git log -${MAX_COMMITS} --name-status --no-renames --pretty=format:"COMMIT|||%H|||%aI|||%s"`,
      { encoding: 'utf8', cwd: ROOT, maxBuffer: 16 * 1024 * 1024 }
    );
  } catch (err) {
    console.warn('[recent-changes] git log failed:', err.message);
    return '';
  }
}

function readDocTitle(relMdxPath) {
  try {
    const fullPath = join(DOCS_DIR, relMdxPath);
    if (!existsSync(fullPath)) return null;
    const content = readFileSync(fullPath, 'utf8');
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return null;
    const fm = m[1];
    const titleM = fm.match(/^title:\s*(.+)$/m);
    if (!titleM) return null;
    return titleM[1].trim().replace(/^['"]|['"]$/g, '');
  } catch {
    return null;
  }
}

function pathToUrl(relPath) {
  // relPath: e.g. "horadric-cube/secret-recipes.mdx" or "index.mdx"
  let p = relPath.replace(/\.mdx?$/, '');
  if (p === 'index') return '/';
  if (p.endsWith('/index')) p = p.replace(/\/index$/, '');
  return '/' + p + '/';
}

function parseLog(log) {
  const docMap = new Map(); // url → { url, title, date, commit, hash }
  const blocks = log.split(/\nCOMMIT\|\|\|/);
  // first block may start with COMMIT||| prefix
  const first = blocks[0].replace(/^COMMIT\|\|\|/, '');
  blocks[0] = first;

  for (const block of blocks) {
    const lines = block.split('\n');
    const header = lines[0];
    const parts = header.split('|||');
    if (parts.length < 3) continue;
    const [hash, date, ...subjectParts] = parts;
    const subject = subjectParts.join('|||');

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      // Format: "M\tsrc/content/docs/foo.mdx" or "A\t..."
      const m = line.match(/^([AMRD])\s+(.+)$/);
      if (!m) continue;
      const status = m[1];
      const path = m[2];
      if (status === 'D') continue;
      if (!path.startsWith('src/content/docs/')) continue;
      if (!path.endsWith('.mdx')) continue;
      const relPath = path.replace('src/content/docs/', '');
      const url = pathToUrl(relPath);

      if (docMap.has(url)) continue; // already have newer entry

      const title = readDocTitle(relPath) || url;
      docMap.set(url, {
        url,
        title,
        date,
        commit: subject,
        hash: hash.slice(0, 7),
      });
    }
  }

  return Array.from(docMap.values()).slice(0, MAX_ITEMS);
}

function main() {
  const log = getGitLog();
  const items = log ? parseLog(log) : [];

  const dataDir = dirname(OUT_FILE);
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

  const output = {
    generatedAt: new Date().toISOString(),
    count: items.length,
    items,
  };
  writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), 'utf8');
  console.log(`[recent-changes] ${items.length} doc entries → src/data/recent-changes.json`);
}

main();
