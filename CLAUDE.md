# d4cute — Claude 작업 규칙

## 생성형 산출물 위치 규칙

루트에 임시/생성 파일을 만들지 말 것. 모든 AI 생성 산출물은 `_work/` 아래 적절한 하위 폴더에 저장.

### 폴더 컨벤션

- `_work/screenshots/` — Playwright/dev 스크린샷, 이미지 산출물 (`transfig-*.png` 등)
- `_work/scripts/` — 일회성/임시 스크립트 (.ps1, .js, .py, .mjs)
- `_work/plan/` — 작업 계획서 (`/plan` skill 기본 경로)
- `_work/analysis/` — 분석 결과, 리포트, 로그
- `_work/notes/` — 메모, 조사 노트

### 규칙

- 새 카테고리 필요하면 `_work/<적절한-슬러그>/` 로 폴더 생성 후 그 안에 작업
- 루트에 `*.png`, `*.tmp`, 임시 `*.ps1` 등 절대 생성 금지
- `_work/` 는 `.gitignore` 에 등록되어 커밋되지 않음 (개인 작업 공간)
- 영구 자산 (실제 소스, public assets) 은 기존 위치 (`src/`, `public/`) 유지
