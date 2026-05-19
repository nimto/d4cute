import { defineMiddleware } from 'astro:middleware';

const BASE = '/d4cute';

function rewriteBaseHrefs(html: string): string {
  return html.replace(/\s(href|src)="(\/[^"]*)"/g, (match, attr, url) => {
    if (url.startsWith('//')) return match;
    if (url.startsWith(BASE + '/') || url === BASE) return match;
    return ` ${attr}="${BASE}${url}"`;
  });
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const ct = response.headers.get('content-type') || '';
  if (!ct.toLowerCase().includes('text/html')) return response;
  const html = await response.text();
  const fixed = rewriteBaseHrefs(html);
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(fixed, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
