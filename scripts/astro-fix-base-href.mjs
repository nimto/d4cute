import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * astro:build:done 후처리.
 * dist 내 .html 의 base 미적용 site-internal href/src 를 일괄 prefix.
 * dev mode 는 src/middleware.ts 의 Astro middleware 가 처리.
 * 외부, 프로토콜 상대(//), anchor(#), data:, mailto:, tel: 는 건너뜀.
 */
export default function fixBaseHref(rawBase) {
  const base = (rawBase || '').replace(/\/$/, '');

  const rewriteHtml = (html) => {
    let changed = false;
    const out = html.replace(/\s(href|src)="(\/[^"]*)"/g, (match, attr, url) => {
      if (url.startsWith('//')) return match;
      if (url.startsWith(base + '/') || url === base) return match;
      changed = true;
      return ` ${attr}="${base}${url}"`;
    });
    return { out, changed };
  };

  return {
    name: 'fix-base-href',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!base) return;
        const root = fileURLToPath(dir);

        let fixedFiles = 0;
        let fixedCount = 0;
        const walk = async (d) => {
          const entries = await fs.readdir(d, { withFileTypes: true });
          for (const e of entries) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) { await walk(p); continue; }
            if (!e.isFile() || !e.name.endsWith('.html')) continue;
            const content = await fs.readFile(p, 'utf-8');
            const { out, changed } = rewriteHtml(content);
            if (changed) {
              await fs.writeFile(p, out, 'utf-8');
              fixedFiles++;
              fixedCount += (content.match(/\s(?:href|src)="\/(?!\/)[^"]*"/g) || []).length;
            }
          }
        };
        await walk(root);
        const msg = `[fix-base-href] base="${base}" — patched ${fixedFiles} file(s)`;
        if (logger && typeof logger.info === 'function') logger.info(msg); else console.log(msg);
      },
    },
  };
}
