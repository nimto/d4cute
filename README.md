# 디아블로4 시즌13 한국어 가이드 (d4cute)

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

심판의 시즌(Season of Reckoning) · 증오의 군주(Lord of Hatred) 확장팩을 위한 **비공식 한국어 종합 가이드**입니다. Astro Starlight + GitHub Pages + Pagefind(한국어 검색) + Giscus(GitHub Discussions 댓글)로 운영합니다.

## 빠른 시작 (5분 셋업)

```bash
git clone https://github.com/nimto/d4cute.git
cd d4cute
nvm use            # .nvmrc 기준 Node 22
npm install
cp .env.example .env   # PUBLIC_GISCUS_* 값 채우기 (선택)
npm run dev            # http://localhost:4321
```

`PUBLIC_GISCUS_*` 변수를 비워두면 댓글 위젯 자리에 안내 박스가 표시됩니다. 페이지 전체는 정상 동작합니다.

## 사이트 구조

```
.
├── astro.config.mjs           # Starlight 설정 (sidebar, locale, components)
├── .nvmrc                     # Node 22 LTS
├── .env.example               # PUBLIC_GISCUS_* 템플릿
├── .github/workflows/deploy.yml  # GitHub Pages 자동 배포
├── docker/
│   ├── Dockerfile             # Node 22 alpine
│   └── docker-compose.yml     # 로컬 개발 컨테이너
├── public/
│   ├── favicon.svg
│   └── images/                # 스크린샷 자리
├── src/
│   ├── content/docs/          # 모든 콘텐츠 (MDX)
│   │   ├── index.mdx          # 랜딩
│   │   ├── quickstart.mdx
│   │   ├── horadric-cube/     # 호라드림 큐브 (8 페이지)
│   │   ├── gems/              # 보석 (5 페이지)
│   │   ├── talismans/         # 부적 (6 페이지)
│   │   ├── tributes/          # 공물 (5 페이지)
│   │   ├── war-plans/         # 전쟁 계획 (6 페이지)
│   │   ├── activity-tree/     # 활동 스킬 트리 (9 페이지)
│   │   ├── patch-notes/       # 패치 노트 (3.0.0/3.0.1/3.0.2)
│   │   ├── glossary.mdx       # 영문↔한글 용어 대조표
│   │   └── about.mdx          # 사이트 소개 / 면책
│   ├── components/            # Giscus, RecipeCard, MaterialBadge, ActivityTreePath, SourceFooter
│   ├── overrides/             # Starlight MarkdownContent 슬롯 override (댓글 자동 삽입)
│   └── styles/custom.css      # Sanctuary 다크 테마
└── tsconfig.json
```

## 명령어

| 명령 | 설명 |
|------|------|
| `npm install` | 의존성 설치 |
| `npm run dev` | 개발 서버 (http://localhost:4321) |
| `npm run build` | 프로덕션 빌드 → `./dist/` |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run astro check` | TypeScript + 콘텐츠 스키마 검사 |

## Docker로 개발

```bash
cd docker
docker compose up
# → http://localhost:4321
```

## Giscus 설정 (댓글 활성화)

Giscus 는 GitHub Discussions 를 댓글 백엔드로 사용합니다. 광고 없음, 무료, 댓글 데이터는 본인 저장소에 보관됩니다.

### 1. GitHub Discussions 활성화

저장소 → **Settings → General → Features → Discussions** 체크박스 활성화.

### 2. Giscus 앱 설치

https://github.com/apps/giscus 접속 → **Install** → `nimto/d4cute` 저장소 선택.

### 3. Giscus 위저드에서 ID 발급

1. https://giscus.app 접속
2. 저장소 입력: `nimto/d4cute`
3. 페이지-Discussion 매핑: **`pathname`** 선택
4. Discussion 카테고리: GitHub Discussions 에서 만든 카테고리(예: `Comments`, Announcement 형식 권장)
5. 위저드 하단에 자동 생성된 `data-repo-id` · `data-category-id` 값 복사

### 4. 환경 변수 등록

**로컬**: `.env` 파일
```
PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxxxx
PUBLIC_GISCUS_CATEGORY=Comments
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxxxx
```

**GitHub Pages**: 저장소 **Settings → Secrets and variables → Actions → Variables → New repository variable**
- `PUBLIC_GISCUS_REPO_ID`
- `PUBLIC_GISCUS_CATEGORY`
- `PUBLIC_GISCUS_CATEGORY_ID`

### 5. 재배포

다음 푸시(또는 `gh workflow run`) 시점부터 자동 적용. 값을 채우지 않으면 댓글 위젯 자리에 안내 박스만 표시됩니다.

## GitHub Pages 배포 절차

1. GitHub에서 `d4cute` 저장소 생성 (Public)
2. 로컬에서 원격 연결 후 푸시:
   ```bash
   git remote add origin https://github.com/<your-id>/d4cute.git
   git branch -M main
   git push -u origin main
   ```
3. GitHub repo → **Settings → Pages → Source = GitHub Actions**
4. 푸시 시 `.github/workflows/deploy.yml` 워크플로가 자동으로 빌드 + 배포
5. 배포 URL: `https://<your-id>.github.io/d4cute/`

`astro.config.mjs` 의 `site` 와 `base` 값을 본인 계정에 맞게 수정해야 합니다:

```js
site: 'https://<your-id>.github.io',
base: '/d4cute',
```

## 콘텐츠 추가 방법

1. `src/content/docs/<섹션>/` 아래에 새 `.mdx` 파일 생성
2. 파일 상단에 frontmatter:
   ```yaml
   ---
   title: 페이지 제목
   description: 한 줄 설명 (SEO + 사이트맵)
   sidebar:
     order: 7
   ---
   ```
3. 본문에서 출처 컴포넌트 사용:
   ```jsx
   import SourceFooter from '../../../components/SourceFooter.astro';
   <SourceFooter sources={[{label: '...', url: '...'}]} lastUpdated="2026-05-16" />
   ```
4. 사이드바는 디렉토리 기준 자동 생성됨 (`sidebar.order`로 정렬)

## 한글 검색 (Pagefind)

Starlight 1.x 이상은 Pagefind 검색이 기본 활성화되어 있으며, **한국어 문자 인덱싱이 기본 지원됩니다**. 별도 설정 불필요.

## 면책

이 사이트는 **비공식 팬 가이드**입니다. 게임 내 정보는 블리자드 공식 패치노트가 우선합니다.

Diablo IV, Lord of Hatred, Season of Reckoning 등 명칭과 로고는 © Blizzard Entertainment의 상표입니다. 본 사이트는 어떤 게임 내 이미지/아트워크도 직접 호스팅하지 않습니다.

## 라이선스

코드(MDX/Astro/컴포넌트): MIT. 콘텐츠 텍스트: CC BY 4.0 (출처 표기 시 자유 사용).
