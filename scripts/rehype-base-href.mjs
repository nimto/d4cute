import { visit } from 'unist-util-visit';

/**
 * 마크다운 내 절대 경로 링크에 base prefix 자동 주입.
 * 입력: ('/horadric-cube/') → 출력: (`${base}/horadric-cube/`)
 * 이미 base 로 시작하거나, 외부 URL(http*), 프로토콜 상대(//), anchor(#), 메일/전화 링크는 건너뜀.
 *
 * 사용: rehypePlugins: [[rehypeBaseHref, '/d4cute']]
 */
export default function rehypeBaseHref(options) {
  const raw = typeof options === 'string' ? options : options?.base ?? '';
  const base = (raw || '').replace(/\/$/, '');
  return (tree) => {
    if (!base) return;
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string') return;
      if (!href.startsWith('/')) return;
      if (href.startsWith('//')) return;
      if (href.startsWith(base + '/') || href === base) return;
      node.properties.href = base + href;
    });
  };
}
