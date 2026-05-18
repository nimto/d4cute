export type Slot =
  | 'head' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'ring' | 'amulet'
  | 'weapon-1h-sword' | 'weapon-2h-sword'
  | 'weapon-1h-blunt' | 'weapon-2h-blunt'
  | 'weapon-polearm' | 'weapon-glaive'
  | 'weapon-staff'
  | 'weapon-ranged' | 'weapon-offhand';

export type MythicSource = 'crafted' | 'drop-only';

export interface MythicRune {
  name: string;
  qty: number;
}

export interface MythicItem {
  slug: string;
  name: string;
  enName: string;
  slot: Slot;
  slotKr: string;
  itemPower?: [number, number];
  source: MythicSource;       // 'crafted' = 큐브 제작 가능 + 보스 드랍 둘 다 / 'drop-only' = 큐브 제작 불가
  iconSrc?: string;
  tooltipSrc?: string;
  isNewInSeason13?: boolean;
  materials?: {
    sparklingThunderbolt?: number;
    runes?: MythicRune[];
    goldCost?: number;
  };
  dropSource?: string;
  passive?: string;
}

const ICON_CRAFT = '/images/horadric-cube/mythic/icons/crafts';
const ICON_DROP = '/images/horadric-cube/mythic/icons/drops';
const TIP_CRAFT = '/images/horadric-cube/mythic/crafts';

// === 시즌13 신화 유니크 (장비) 전체 13종 ===
// 모두 큐브 jeweler 에서 specific 제작 가능 (반짝이는 벼락불 × 2 + 룬 3종 × 6 + 골드)
// 모두 보스 드랍으로도 획득 가능 (Belial / general mythic pool / Resplendent Spark 2 → random mythic)
export const mythicItems: MythicItem[] = [
  // 시즌13 신규 신화
  {
    slug: 'eldruin',
    name: '정의의 검 엘드루인',
    enName: "El'druin, Sword of Justice",
    slot: 'weapon-1h-sword', slotKr: '한손 도검',
    itemPower: [900, 900],
    source: 'crafted', isNewInSeason13: true,
    iconSrc: `${ICON_DROP}/eldruin.webp`,
    passive: '정예 처치 시 모든 기술 재사용 대기시간 10초 감소 (12초 지속)',
  },

  // 캡처 확보된 큐브 제작 신화 (10)
  {
    slug: 'andariels-visage',
    name: '안다리엘의 두개골',
    enName: "Andariel's Visage",
    slot: 'head', slotKr: '투구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/andariels-visage.webp`,
    tooltipSrc: `${TIP_CRAFT}/andariels-visage.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '탐', qty: 6 }, { name: '잔', qty: 6 }, { name: '시르', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'doombringer',
    name: '궤멸자',
    enName: 'Doombringer',
    slot: 'weapon-1h-sword', slotKr: '한손 도검',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/doombringer.webp`,
    tooltipSrc: `${TIP_CRAFT}/doombringer.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '율', qty: 6 }, { name: '녹', qty: 6 }, { name: '쿠아', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'harlequin-crest',
    name: '할리퀸 관모',
    enName: 'Harlequin Crest (Shako)',
    slot: 'head', slotKr: '투구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/harlequin-crest.webp`,
    tooltipSrc: `${TIP_CRAFT}/harlequin-crest.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '에옴', qty: 6 }, { name: '라크', qty: 6 }, { name: '세흐', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'heir-of-perdition',
    name: '영벌의 후예',
    enName: 'Heir of Perdition',
    slot: 'head', slotKr: '투구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/heir-of-perdition.webp`,
    tooltipSrc: `${TIP_CRAFT}/heir-of-perdition.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '자', qty: 6 }, { name: '쿠에', qty: 6 }, { name: '가르', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'melted-heart-of-selig',
    name: '셸리그의 녹은 심장',
    enName: 'Melted Heart of Selig',
    slot: 'amulet', slotKr: '목걸이',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/melted-heart-of-selig.webp`,
    tooltipSrc: `${TIP_CRAFT}/melted-heart-of-selig.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '벡스', qty: 6 }, { name: '주울', qty: 6 }, { name: '크라이', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'ring-of-starless-skies',
    name: '별 없는 하늘의 반지',
    enName: 'Ring of Starless Skies',
    slot: 'ring', slotKr: '반지',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/ring-of-starless-skies.webp`,
    tooltipSrc: `${TIP_CRAFT}/ring-of-starless-skies.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '오움', qty: 6 }, { name: '와트', qty: 6 }, { name: '쳄', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'shattered-vow',
    name: '박살난 맹세',
    enName: 'Shattered Vow',
    slot: 'weapon-polearm', slotKr: '미늘창',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/shattered-vow.webp`,
    tooltipSrc: `${TIP_CRAFT}/shattered-vow.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '이그니', qty: 6 }, { name: '켈', qty: 6 }, { name: '테브', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'shroud-of-false-death',
    name: '거짓된 죽음의 수의',
    enName: 'Shroud of False Death',
    slot: 'chest', slotKr: '가슴 방어구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/shroud-of-false-death.webp`,
    tooltipSrc: `${TIP_CRAFT}/shroud-of-false-death.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '바크', qty: 6 }, { name: '녹', qty: 6 }, { name: '모니', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'the-grandfather',
    name: '한마비',
    enName: 'The Grandfather',
    slot: 'weapon-2h-sword', slotKr: '양손 도검',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/the-grandfather.webp`,
    tooltipSrc: `${TIP_CRAFT}/the-grandfather.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '탐', qty: 6 }, { name: '모트', qty: 6 }, { name: '약스', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'tyraels-might',
    name: '티리엘의 권능',
    enName: "Tyrael's Might",
    slot: 'chest', slotKr: '가슴 방어구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_CRAFT}/tyraels-might.webp`,
    tooltipSrc: `${TIP_CRAFT}/tyraels-might.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '윰', qty: 6 }, { name: '나구', qty: 6 }, { name: '치크', qty: 6 }
    ], goldCost: 5000 },
  },

  // 사용자 캡처 미확보 — 위키 자료 (이미지 wiki 사이트에서 확보)
  {
    slug: 'nesekem-the-herald',
    name: '네세켐 (전령)',
    enName: 'Nesekem, the Herald',
    slot: 'weapon-glaive', slotKr: '글레이브 (양손, 정수술사 전용)',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_DROP}/nesekem-the-herald.webp`,
    passive: '정수술사 전용 양손 글레이브 — 패시브는 룬과 문양 동기화 기반',
  },
  {
    slug: 'ahavarion-spear-of-lycander',
    name: '리캔더의 창 아하바리온',
    enName: 'Ahavarion, Spear of Lycander',
    slot: 'weapon-staff', slotKr: '지팡이 (원소술사·드루이드)',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON_DROP}/ahavarion-spear-of-lycander.webp`,
    passive: '정예 처치 시 무작위 사당(Shrine) 효과 20초 부여',
  },
];

export const allMythics = mythicItems;
export const newMythics = mythicItems.filter((m) => m.isNewInSeason13);
export const existingMythics = mythicItems.filter((m) => !m.isNewInSeason13);

export function groupBySlot(list: MythicItem[]): Record<string, MythicItem[]> {
  const out: Record<string, MythicItem[]> = {};
  for (const m of list) {
    (out[m.slotKr] = out[m.slotKr] ?? []).push(m);
  }
  return out;
}
