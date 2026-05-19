// D4 한국 공식 용어집 (시즌13 증오의 군주)
// verified=true 는 wowhead/blizzard/공식 패치노트로 확정.
// verified=false 는 커뮤니티/추정. 추가 확인 필요.

export interface GlossaryTerm {
  id: string;            // URL slug + lookup key
  kr: string;            // 한국 공식 명칭 (또는 추정)
  en: string;            // 영문 원어
  verified: boolean;     // wowhead 등 공식 출처 확인 여부
  category: 'dust' | 'prism' | 'item' | 'boss' | 'activity' | 'system' | 'currency' | 'stat';
  short: string;         // 한 줄 설명 (툴팁 헤드)
  desc: string;          // 상세 설명 (툴팁 본문 — HTML 허용)
  image?: string;        // 로컬 이미지 (public/ 기준)
  externalImage?: string; // 외부 URL (wowhead 등)
  source?: string;       // 출처 URL
}

export const glossary: Record<string, GlossaryTerm> = {
  // ===== 가루 (Primordial Dust) — 호라드림의 함 변성 자원 (총 8종, 모두 wowhead 공식 명칭) =====
  'raw-dust': {
    id: 'raw-dust',
    kr: '미가공 태고의 가루',
    en: 'Raw Primordial Dust',
    verified: true,
    category: 'dust',
    short: '가장 기본 가루 (Raw)',
    desc: '호라드림의 함 거의 모든 작업의 부재료. <strong>가장 흔하게 드랍</strong>되는 가루. 정예·우두머리·시즌 보상에서 다량 누적.',
    source: 'https://www.wowhead.com/diablo-4/item/raw-primordial-dust-2502409',
  },
  'coarse-dust': {
    id: 'coarse-dust',
    kr: '거친 태고의 가루',
    en: 'Coarse Primordial Dust',
    verified: true,
    category: 'dust',
    short: '어픽스 추가용 (Greater Affix)',
    desc: '아이템에 무작위 어픽스를 추가하거나 일반 어픽스를 <strong>상급 어픽스(Greater Affix)</strong>로 격상시킬 때 사용. 전쟁 계획 보상 활동에서 누적.',
    source: 'https://www.wowhead.com/diablo-4/item/coarse-primordial-dust-2502432',
  },
  'refined-dust': {
    id: 'refined-dust',
    kr: '정제된 태고의 가루',
    en: 'Refined Primordial Dust',
    verified: true,
    category: 'dust',
    short: '일반 변성 작업의 표준 자원',
    desc: '호라드림의 함에서 어픽스 제거·카테고리 재롤 등 표준 작업에 사용. <strong>가장 자주 쓰이는 가루</strong>. 시즌 활동 보상함에서 가장 흔하게 등장.',
    source: 'https://www.wowhead.com/diablo-4/item/refined-primordial-dust-2502435',
  },
  'attuned-dust': {
    id: 'attuned-dust',
    kr: '조율된 태고의 가루',
    en: 'Attuned Primordial Dust',
    verified: true,
    category: 'dust',
    short: '카테고리 지향 변성에 사용',
    desc: '<strong>같은 카테고리 재롤(Focused Reroll)</strong> 작업의 핵심 재료. 변성 결과를 좁히는 분광경과 함께 사용. 시즌 활동 후반에 누적 필요.',
    source: 'https://www.wowhead.com/diablo-4/item/attuned-primordial-dust-2530719',
  },
  'resonant-dust': {
    id: 'resonant-dust',
    kr: '공명하는 태고의 가루',
    en: 'Resonant Primordial Dust',
    verified: true,
    category: 'dust',
    short: '신화 등급 가루 (현재 미활성)',
    desc: '<strong>wowhead 데이터마이닝(item ID 2530723)</strong> 으로 존재 확인. 영문 설명: "무작위 어픽스 → 강력한 어픽스(Greater Affix) 업그레이드". <strong>2026-05 기준 인벤토리 미반영 버그 + 큐브 레시피 미공개</strong> — 시즌 14 추정 활성화 stub. <a href="/horadric-cube/materials/#9-공명하는-태고의-가루-resonant-primordial-dust">상세</a>.',
    source: 'https://www.wowhead.com/diablo-4/item/resonant-primordial-dust-2530723',
  },
  'enhanced-dust': {
    id: 'enhanced-dust',
    kr: '향상된 태고의 가루',
    en: 'Enhanced Primordial Dust',
    verified: true,
    category: 'dust',
    short: '중급 변성 자원',
    desc: '고유(Unique) 아이템 제작 변환에 사용하는 중급 가루. 시즌 중반 ~ 후반 핵심.',
    source: 'https://www.wowhead.com/diablo-4/item/enhanced-primordial-dust-2530716',
  },
  'volatile-dust': {
    id: 'volatile-dust',
    kr: '일촉즉발의 태고의 가루',
    en: 'Volatile Primordial Dust',
    verified: true,
    category: 'dust',
    short: '재제련 전용 자원',
    desc: '<strong>재제련(Transfigure Item)</strong> 레시피의 핵심 재료. 전설/고유/신화 아이템에 강력한 무작위 변형 적용 시 소모. 빌드 마감 단계 자원.',
    source: 'https://www.wowhead.com/diablo-4/item/volatile-primordial-dust-2502440',
  },
  'pure-dust': {
    id: 'pure-dust',
    kr: '순수한 태고의 가루',
    en: 'Pure Primordial Dust',
    verified: true,
    category: 'dust',
    short: '최고급 변성 자원',
    desc: '호라드림의 함에서 가장 비싼 가루 중 하나. 최상위 변성·신화 추첨 등에 사용. 시즌 후반 누적이 빌드 완성의 척도.',
    source: 'https://www.wowhead.com/diablo-4/item/pure-primordial-dust-2502443',
  },
  'primordial-dust': {
    id: 'primordial-dust',
    kr: '태고의 가루',
    en: 'Primordial Dust',
    verified: true,
    category: 'dust',
    short: '태고의 가루 전체 종류 통칭',
    desc: '호라드림의 함에서 사용하는 가루 8종 통칭. 정확한 이름은 <strong>미가공·거친·정제된·일촉즉발의·순수한·조율된·향상된·공명하는</strong> 태고의 가루.',
  },

  // ===== 분광경 (Tuning Prism) — 변성 결과 좁히는 소비용품 =====
  'tuning-prism': {
    id: 'tuning-prism',
    kr: '조율의 분광경',
    en: 'Tuning Prism',
    verified: true,
    category: 'prism',
    short: '변성 결과를 좁히는 소비용품',
    desc: '재제련 시 결과 풀을 한 방향으로 좁히는 핵심 자원. 종류별로 카테고리(공격/방어/실용/풍족) 또는 등급별로 효과가 다름.',
    source: 'https://www.wowhead.com/diablo-4/item/aggressive-tuning-prism-2533710',
  },
  'entropic-prism': {
    id: 'entropic-prism',
    kr: '엔트로피의 조율의 분광경',
    en: 'Entropic Tuning Prism',
    verified: true,
    category: 'prism',
    short: '결과를 영구 잠금 (가장 위험)',
    desc: '<span style="color:#c01020">변성 결과를 카테고리 단위로 영구 잠금</span>. 이후 어떤 분광경으로도 카테고리 재롤 불가. 빌드 완전 확정 후에만 사용.',
    source: 'https://www.wowhead.com/diablo-4/item/entropic-tuning-prism-2533731',
  },
  'chromatic-prism': {
    id: 'chromatic-prism',
    kr: '다채로운 조율의 분광경',
    en: 'Chromatic Tuning Prism',
    verified: true,
    category: 'prism',
    short: '범용 분광경 (좁히지 않음)',
    desc: '같은 카테고리 안 모든 어픽스를 후보로 둔다. 클래스 핵심 어픽스 외에도 다양한 옵션 노릴 때 사용.',
    source: 'https://www.wowhead.com/diablo-4/item/chromatic-tuning-prism-2533724',
  },
  'aggressive-prism': {
    id: 'aggressive-prism',
    kr: '공격적인 조율의 분광경',
    en: 'Aggressive Tuning Prism',
    verified: true,
    category: 'prism',
    short: '공격 카테고리 어픽스 노림',
    desc: '변성 결과 풀을 <strong>공격 카테고리</strong>로만 좁힘. 피해·치명타·취약 등 DPS 어픽스 노림용.',
    source: 'https://www.wowhead.com/diablo-4/item/aggressive-tuning-prism-2533710',
  },

  // ===== 호라드림의 함 (시즌13 신규 시스템) =====
  'horadric-vessel': {
    id: 'horadric-vessel',
    kr: '호라드림의 함',
    en: 'Horadric Vessel',
    verified: true,
    category: 'system',
    short: '시즌13 신규 아이템 제작 시스템',
    desc: '증오의 군주(시즌13) 캠페인 완료 후 잠금해제. 스코보스 군도 <strong>테미스</strong>에서 사용. 어픽스 추가·재롤·재제련 등 모든 변성 작업의 중심.',
  },

  // ===== 시즌13 활동 =====
  'echoing-hatred': {
    id: 'echoing-hatred',
    kr: '메아리치는 증오',
    en: 'Echoing Hatred',
    verified: true,
    category: 'activity',
    short: '시즌13 끝없는 웨이브 활동',
    desc: '지옥불 군세의 확장 모드. 종료 조건 없이 적이 끝없이 강해지는 끝장 도전. <strong>메아리의 흔적</strong> 보상.',
    source: 'https://news.blizzard.com/ko-kr/article/24267729',
  },
  'trace-of-echoes': {
    id: 'trace-of-echoes',
    kr: '메아리의 흔적',
    en: 'Trace of Echoes',
    verified: true,
    category: 'currency',
    short: '시즌13 메아리치는 증오 보상권',
    desc: '메아리치는 증오에서 획득. 10개 모아 <strong>메피스토의 메아리</strong> 보스방 입장권으로 변환. 호라드림의 함에서 통합 가능.',
    source: 'https://www.wowhead.com/diablo-4/item/trace-of-echoes-2409389',
  },
  'echo-of-mephisto': {
    id: 'echo-of-mephisto',
    kr: '메피스토의 메아리',
    en: 'Echo of Mephisto',
    verified: true,
    category: 'activity',
    short: '시즌13 최종 보스방',
    desc: '메피스토와 1:1 대전. 메아리의 흔적 10개 통합으로 입장권 획득. 신화 고유 + 시즌 보상.',
  },

  // ===== 아이템 등급/타입 =====
  'mythic-unique': {
    id: 'mythic-unique',
    kr: '신화 고유',
    en: 'Mythic Unique',
    verified: true,
    category: 'item',
    short: '디아블로4 최상위 등급 고유 아이템',
    desc: '시즌13 기준 총 <strong>13종</strong>. 고정 추가 옵션 +4, 신화 고유 위상 +1. 우두머리 처치 시 약 1.5% 드랍, 또는 호라드림의 함에서 반짝이는 벼락불 2개 + 룬으로 제작.',
    source: 'https://cloudlog.kr/blog/game/pc/diablo/diablo4-mythic-unique-rune-crafting-info/',
  },
  'ancestral': {
    id: 'ancestral',
    kr: '선조',
    en: 'Ancestral',
    verified: true,
    category: 'item',
    short: '최상위 아이템 등급',
    desc: '고난도 1단계 이상에서 드랍하는 상급 아이템 풀. 어픽스 슬롯·수치 상한이 가장 높음.',
  },
  'forgotten-soul': {
    id: 'forgotten-soul',
    kr: '잊힌 영혼',
    en: 'Forgotten Soul',
    verified: true,
    category: 'currency',
    short: '명품화/제작 핵심 재료',
    desc: '전설/고유 아이템 제작·명품화에 사용하는 희귀 자원. 헬타이드·우두머리 처치 시 드랍.',
    source: 'https://www.wowhead.com/diablo-4/item/forgotten-soul-1205842',
  },
  'resplendent-spark': {
    id: 'resplendent-spark',
    kr: '반짝이는 벼락불',
    en: 'Resplendent Spark',
    verified: true,
    category: 'currency',
    short: '신화 고유 제작 재료',
    desc: '신화 고유 아이템 제작의 핵심 재료. 우두머리 처치·시즌 도전 보상 등으로 획득. <strong>2개</strong>로 무작위 신화 고유 1개 제작.',
  },

  // ===== 보스 / 활동 보상 =====
  'boss-trophy': {
    id: 'boss-trophy',
    kr: '우두머리 소환 재료',
    en: 'Boss Summoning Material',
    verified: true,
    category: 'currency',
    short: '보스별 고유 부산물 (공물·재료)',
    desc: '우두머리 처치 시 부산물로 드랍. 보스별로 종류 다름 — 그리구아르 = <strong>살아있는 강철</strong>, 바르샨 = <strong>악의 심장</strong>, 얼음속의 야수 = <strong>정제된 공포</strong> 등. 보스방 재입장 또는 다른 보스 소환에 사용.',
  },
  'mythic-offering': {
    id: 'mythic-offering',
    kr: '신화 공물',
    en: 'Mythic Offering',
    verified: true,
    category: 'currency',
    short: '쿠라스트 지하도시 신화 풀 공물',
    desc: '쿠라스트 지하도시 입장 시 사용하는 공물 종류 중 신화 풀. 야외 우두머리(월드 보스) 또는 메아리치는 증오에서 고블린 처치 시 획득.',
  },

  // ===== 시스템 =====
  'masterworking': {
    id: 'masterworking',
    kr: '명품화',
    en: 'Masterworking',
    verified: true,
    category: 'system',
    short: '아이템 최종 강화 시스템',
    desc: '총 12회 강화. 4/8/12단계마다 무작위 1개 옵션이 25% 추가 상향. 잊힌 영혼 등 고급 재료 소모.',
  },
  'glyph': {
    id: 'glyph',
    kr: '문양',
    en: 'Glyph',
    verified: true,
    category: 'system',
    short: '정복자 보드 강화 룬',
    desc: '정복자 보드 노드에 장착하는 강화 룬. 최대 21레벨까지 강화. 나락(균열)에서 경험치 획득.',
    source: 'https://www.wowhead.com/diablo-4/paragon-glyph/undaunted-1027096',
  },
  'sigil': {
    id: 'sigil',
    kr: '인장',
    en: 'Sigil',
    verified: true,
    category: 'currency',
    short: '악몽 던전 입장 인장',
    desc: '악몽 던전 입장에 사용. 던전 위치·강화 효과·도전 조건이 무작위 부여. 트리 노드로 드랍률 향상 가능.',
  },
  'pit': {
    id: 'pit',
    kr: '나락',
    en: 'The Pit',
    verified: true,
    category: 'activity',
    short: '5층 균열 활동',
    desc: '시즌13에서 5층 구조로 개편. 사망 페널티 없음. 주된 문양 경험치 활동.',
  },
  'helltide': {
    id: 'helltide',
    kr: '지옥물결',
    en: 'Helltide',
    verified: true,
    category: 'activity',
    short: '주기적 야외 활동',
    desc: '특정 시간마다 지역에 발생. 시즌 가루·잊힌 영혼 등 핵심 자원 누적. 보물 고블린 등장 빈도 ↑.',
  },
  'treasure-goblin': {
    id: 'treasure-goblin',
    kr: '보물 고블린',
    en: 'Treasure Goblin',
    verified: true,
    category: 'system',
    short: '도주하는 보물 몬스터',
    desc: '보물을 들고 도주. 처치 시 가루·잊힌 영혼 다량 드랍. 헬타이드/악몽 던전에서 자주 등장.',
    source: 'https://namu.wiki/w/%EB%B3%B4%EB%AC%BC%20%EA%B3%A0%EB%B8%94%EB%A6%B0',
  },
};

export function getTerm(id: string): GlossaryTerm | undefined {
  return glossary[id];
}

export function getAllTerms(): GlossaryTerm[] {
  return Object.values(glossary);
}

export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return getAllTerms().filter((t) => t.category === category);
}
