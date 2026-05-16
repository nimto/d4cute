// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://nimto.github.io',
  base: process.env.GITHUB_ACTIONS ? '/d4cute' : '/',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: '디아블로4 시즌13 한국어 가이드',
      description: '심판의 시즌(Season of Reckoning) / 증오의 군주(Lord of Hatred) 확장팩 종합 헬퍼',
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
      ],
    }),
  ],
});
