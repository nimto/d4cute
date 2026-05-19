// scripts/build-live-status.mjs
// Server-side fetch of YouTube channel /live page to produce a static JSON
// summarizing live state + latest video. Runs in GitHub Actions cron and
// is committed to an orphan branch (live-status) so the client can read it
// via raw.githubusercontent.com without depending on flaky CORS proxies.

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const CHANNEL_ID = process.env.LIVE_CHANNEL_ID || 'UCSPPr4E6P1iGa25VDMJkFpQ';
const HANDLE = process.env.LIVE_CHANNEL_HANDLE || '삼촌안잔다잉';
const OUT_FILE = process.env.LIVE_STATUS_OUT || 'live-status.json';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.text();
}

function isLiveHtml(html) {
  return /"isLiveBroadcast"\s*:\s*true/.test(html)
    || /"isLive"\s*:\s*true/.test(html)
    || /"isLiveContent"\s*:\s*true/.test(html)
    || /"isLiveNow"\s*:\s*true/.test(html);
}

function extractLiveVideoId(html) {
  const m = html.match(/"videoDetails"\s*:\s*\{\s*"videoId"\s*:\s*"([A-Za-z0-9_-]{11})"/)
    || html.match(/<link rel="canonical"[^>]*href="https?:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})"/)
    || html.match(/"liveBroadcastDetails"[^}]*"videoId":"([A-Za-z0-9_-]{11})"/)
    || html.match(/"isLive"\s*:\s*true[\s\S]{0,4000}?"videoId":"([A-Za-z0-9_-]{11})"/);
  return m ? m[1] : null;
}

function extractLiveTitle(html) {
  const m = html.match(/<meta name="title" content="([^"]+)"/)
    || html.match(/<title>([^<]+)<\/title>/);
  if (!m) return null;
  return m[1].replace(/\s*-\s*YouTube\s*$/i, '').trim();
}

function extractLatestFromRss(xml) {
  const idMatch = xml.match(/<yt:videoId>([A-Za-z0-9_-]{11})<\/yt:videoId>/);
  const titleMatch = xml.match(/<entry>[\s\S]*?<title>([^<]+)<\/title>/);
  const publishedMatch = xml.match(/<entry>[\s\S]*?<published>([^<]+)<\/published>/);
  return {
    id: idMatch?.[1] || null,
    title: titleMatch?.[1] || null,
    publishedAt: publishedMatch?.[1] || null,
  };
}

async function main() {
  const now = new Date().toISOString();
  const liveUrl = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  let state = 'unknown';
  let liveVideoId = null;
  let liveTitle = null;
  let latestVideoId = null;
  let latestTitle = null;
  let latestPublishedAt = null;
  let error = null;

  try {
    const html = await fetchText(liveUrl);
    if (isLiveHtml(html)) {
      const id = extractLiveVideoId(html);
      if (id) {
        state = 'live';
        liveVideoId = id;
        liveTitle = extractLiveTitle(html);
      } else {
        state = 'offline';
      }
    } else {
      state = 'offline';
    }
  } catch (err) {
    error = String(err?.message || err);
  }

  try {
    const xml = await fetchText(rssUrl);
    const latest = extractLatestFromRss(xml);
    latestVideoId = latest.id;
    latestTitle = latest.title;
    latestPublishedAt = latest.publishedAt;
  } catch (err) {
    if (!error) error = String(err?.message || err);
  }

  const out = {
    schema: 1,
    generatedAt: now,
    channelId: CHANNEL_ID,
    handle: HANDLE,
    state,
    live: state === 'live' ? { videoId: liveVideoId, title: liveTitle } : null,
    latest: latestVideoId
      ? { videoId: latestVideoId, title: latestTitle, publishedAt: latestPublishedAt }
      : null,
    error,
  };

  const dir = dirname(OUT_FILE);
  if (dir && dir !== '.' && !existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(out, null, 2), 'utf8');
  console.log(`[live-status] state=${state} live=${liveVideoId || '-'} latest=${latestVideoId || '-'} → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error('[live-status] fatal:', err);
  process.exit(1);
});
