// scripts/build-comments-index.mjs
// Generate src/data/comments-index.json from GitHub Discussions (Giscus backend).
// Per-comment record + parent page metadata. Run before astro build.
// Requires GITHUB_TOKEN env (with read:discussion). Falls back to empty list when missing.

import { writeFileSync, readFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DOCS_DIR = join(ROOT, 'src/content/docs');
const OUT_FILE = join(ROOT, 'src/data/comments-index.json');

const REPO_OWNER = process.env.COMMENTS_REPO_OWNER || 'nimto';
const REPO_NAME = process.env.COMMENTS_REPO_NAME || 'd4cute';
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const MAX_DISCUSSIONS = 200;
const PAGE_SIZE = 50;

function listDocs(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) listDocs(full, acc);
    else if (name.endsWith('.mdx') || name.endsWith('.md')) acc.push(full);
  }
  return acc;
}

function pathToUrl(relPath) {
  let p = relPath.split(sep).join('/').replace(/\.mdx?$/, '');
  if (p === 'index') return '/';
  if (p.endsWith('/index')) p = p.replace(/\/index$/, '');
  return '/' + p + '/';
}

function readFrontmatterTitle(file) {
  try {
    const content = readFileSync(file, 'utf8');
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

function buildPageMap() {
  if (!existsSync(DOCS_DIR)) return new Map();
  const files = listDocs(DOCS_DIR);
  const map = new Map();
  for (const f of files) {
    const rel = relative(DOCS_DIR, f);
    const url = pathToUrl(rel);
    const title = readFrontmatterTitle(f) || url;
    map.set(url, title);
  }
  return map;
}

async function graphql(query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'd4cute-build',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GraphQL HTTP ${res.status}: ${text.slice(0, 300)}`);
  }
  const data = await res.json();
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors).slice(0, 500)}`);
  }
  return data.data;
}

const Q = `
query($owner:String!, $name:String!, $first:Int!, $cursor:String) {
  repository(owner:$owner, name:$name) {
    discussions(first:$first, orderBy:{field:UPDATED_AT, direction:DESC}, after:$cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        title
        url
        createdAt
        updatedAt
        author { login avatarUrl url }
        comments(first:50) {
          totalCount
          nodes {
            id
            url
            bodyText
            createdAt
            author { login avatarUrl url }
            replies(first:30) {
              totalCount
              nodes {
                id
                url
                bodyText
                createdAt
                author { login avatarUrl url }
              }
            }
          }
        }
      }
    }
  }
}`;

async function fetchAllDiscussions() {
  let cursor = null;
  let collected = [];
  for (let i = 0; i < 10; i++) {
    const data = await graphql(Q, {
      owner: REPO_OWNER,
      name: REPO_NAME,
      first: PAGE_SIZE,
      cursor,
    });
    const conn = data?.repository?.discussions;
    if (!conn) break;
    collected = collected.concat(conn.nodes || []);
    if (collected.length >= MAX_DISCUSSIONS) break;
    if (!conn.pageInfo?.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
  }
  return collected.slice(0, MAX_DISCUSSIONS);
}

function authorRecord(a) {
  if (!a) return { login: 'ghost', avatarUrl: '', url: '' };
  return { login: a.login || 'ghost', avatarUrl: a.avatarUrl || '', url: a.url || '' };
}

function flatten(discussions, pageMap) {
  const items = [];
  for (const d of discussions) {
    const term = d.title || '';
    const pagePath = term.startsWith('/') ? (term.endsWith('/') ? term : term + '/') : null;
    const pageTitle = pagePath && pageMap.get(pagePath) ? pageMap.get(pagePath) : (pagePath || term || '기타');
    const exists = pagePath ? pageMap.has(pagePath) : false;

    const pushComment = (c, parentId = null) => {
      items.push({
        id: c.id,
        body: c.bodyText || '',
        author: authorRecord(c.author),
        createdAt: c.createdAt,
        commentUrl: c.url,
        discussionUrl: d.url,
        pagePath: pagePath || '',
        pageTitle,
        pageExists: exists,
        parentId,
      });
    };
    for (const c of d.comments?.nodes || []) {
      pushComment(c, null);
      for (const r of c.replies?.nodes || []) pushComment(r, c.id);
    }
  }
  return items;
}

async function main() {
  const pageMap = buildPageMap();

  const dataDir = dirname(OUT_FILE);
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

  if (!TOKEN) {
    console.warn('[comments-index] GITHUB_TOKEN missing — writing empty index.');
    writeFileSync(
      OUT_FILE,
      JSON.stringify({
        generatedAt: new Date().toISOString(),
        repo: `${REPO_OWNER}/${REPO_NAME}`,
        count: 0,
        discussionCount: 0,
        items: [],
        note: 'GITHUB_TOKEN missing at build time. Comments cannot be fetched without authentication. Set repo secret or local env to enable.',
      }, null, 2),
      'utf8'
    );
    return;
  }

  try {
    const discussions = await fetchAllDiscussions();
    const items = flatten(discussions, pageMap);
    items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    writeFileSync(
      OUT_FILE,
      JSON.stringify({
        generatedAt: new Date().toISOString(),
        repo: `${REPO_OWNER}/${REPO_NAME}`,
        count: items.length,
        discussionCount: discussions.length,
        items,
      }, null, 2),
      'utf8'
    );
    console.log(`[comments-index] ${items.length} comments across ${discussions.length} discussions → src/data/comments-index.json`);
  } catch (err) {
    console.warn('[comments-index] fetch failed:', err?.message || err);
    writeFileSync(
      OUT_FILE,
      JSON.stringify({
        generatedAt: new Date().toISOString(),
        repo: `${REPO_OWNER}/${REPO_NAME}`,
        count: 0,
        discussionCount: 0,
        items: [],
        error: String(err?.message || err).slice(0, 400),
      }, null, 2),
      'utf8'
    );
  }
}

main();
