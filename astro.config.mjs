// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeBaseHref from './scripts/rehype-base-href.mjs';

const BASE = process.env.GITHUB_ACTIONS ? '/d4cute' : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://nimto.github.io',
  base: BASE,
  trailingSlash: 'always',
  markdown: {
    rehypePlugins: [[rehypeBaseHref, BASE === '/' ? '' : BASE]],
  },
  integrations: [
    starlight({
      title: '디아블로4 시즌13 한국어 가이드',
      description: '심판의 시즌(Season of Reckoning) / 증오의 군주(Lord of Hatred) 확장팩 종합 헬퍼',
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://nimto.github.io/d4cute/app-icon-1024.png' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:width', content: '1024' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image:height', content: '1024' },
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: '한국어', lang: 'ko-KR' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nimto/d4cute' },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        MarkdownContent: './src/overrides/MarkdownContent.astro',
      },
      lastUpdated: true,
      pagination: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
      sidebar: [
        {
          label: '🎬 삼촌안잔다잉 채널',
          link: 'https://youtu.be/7xefDv5NCJ4',
          attrs: { target: '_blank', rel: 'noopener noreferrer' },
          badge: { text: 'YouTube', variant: 'tip' },
        },
        { label: '시작하기', link: '/quickstart/' },
        { label: '호라드림 큐브', collapsed: false, items: [{ autogenerate: { directory: 'horadric-cube' } }] },
        { label: '보석', collapsed: true, items: [{ autogenerate: { directory: 'gems' } }] },
        { label: '부적 & 인장', collapsed: true, items: [{ autogenerate: { directory: 'talismans' } }] },
        { label: '공물', collapsed: true, items: [{ autogenerate: { directory: 'tributes' } }] },
        { label: '전쟁 계획', collapsed: true, items: [{ autogenerate: { directory: 'war-plans' } }] },
        { label: '활동 스킬 트리', collapsed: true, items: [{ autogenerate: { directory: 'activity-tree' } }] },
        { label: '패치 노트', collapsed: true, items: [{ autogenerate: { directory: 'patch-notes' } }] },
        { label: '용어 사전', link: '/glossary/' },
        { label: '사이트 소개', link: '/about/' },
        {
          label: '법적 정보',
          collapsed: true,
          items: [
            { label: '개인정보처리방침', link: '/privacy/' },
            { label: '서비스 약관', link: '/terms/' },
            { label: '데이터 삭제 안내', link: '/data-deletion/' },
          ],
        },
      ],
    }),
  ],
});
