export type Slot =
  | 'head' | 'chest' | 'gloves' | 'pants' | 'boots'
  | 'ring' | 'amulet'
  | 'weapon-1h-slash' | 'weapon-2h-slash' | 'weapon-polearm'
  | 'weapon-1h-blunt' | 'weapon-2h-blunt'
  | 'weapon-ranged' | 'weapon-offhand';

export type MythicSource = 'crafted' | 'drop' | 'both';

export interface MythicRune {
  name: string;     // 한국명 (룬)
  qty: number;      // 필요 수량
}

export interface MythicItem {
  slug: string;
  name: string;           // 한국명
  enName?: string;        // 영문 통용명
  slot: Slot;
  slotKr: string;         // 한국 표기 (가슴 방어구 / 양손 도검 등)
  itemPower?: [number, number];  // 아이템 위력
  source: MythicSource;
  iconSrc?: string;       // 사이트 자체 아이콘 (있으면)
  tooltipSrc?: string;    // 사이트 자체 툴팁 (있으면)
  materials?: {           // 제작 가능 시
    sparklingThunderbolt?: number;  // 반짝이는 벼락불
    runes?: MythicRune[];
    goldCost?: number;
  };
  dropSource?: string;    // 드랍 시 출처 (보스/이벤트 등)
  passive?: string;       // 고유 패시브 한 줄 설명
}

const ICON = '/images/horadric-cube/mythic/icons/crafts';
const TIP = '/images/horadric-cube/mythic/crafts';

export const mythicItems: MythicItem[] = [
  // === 시즌13 큐브 제작 가능 (10) ===
  {
    slug: 'shroud-of-false-death',
    name: '거짓된 죽음의 수의',
    enName: 'Shroud of False Death',
    slot: 'chest', slotKr: '가슴 방어구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/shroud-of-false-death.webp`,
    tooltipSrc: `${TIP}/shroud-of-false-death.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '바크', qty: 6 }, { name: '녹', qty: 6 }, { name: '모니', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'doombringer',
    name: '궤멸자',
    enName: 'Doombringer',
    slot: 'weapon-1h-slash', slotKr: '한손 도검 (베는 무기)',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/doombringer.webp`,
    tooltipSrc: `${TIP}/doombringer.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '율', qty: 6 }, { name: '녹', qty: 6 }, { name: '쿠아', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'shattered-vow',
    name: '박살난 맹세',
    enName: 'Shattered Vow',
    slot: 'weapon-polearm', slotKr: '미늘창 (베는 무기)',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/shattered-vow.webp`,
    tooltipSrc: `${TIP}/shattered-vow.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '이그니', qty: 6 }, { name: '켈', qty: 6 }, { name: '테브', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'ring-of-starless-skies',
    name: '별 없는 하늘의 반지',
    enName: 'Ring of Starless Skies',
    slot: 'ring', slotKr: '반지',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/ring-of-starless-skies.webp`,
    tooltipSrc: `${TIP}/ring-of-starless-skies.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '오움', qty: 6 }, { name: '와트', qty: 6 }, { name: '쳄', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'melted-heart-of-selig',
    name: '셸리그의 녹은 심장',
    enName: 'Melted Heart of Selig',
    slot: 'amulet', slotKr: '목걸이',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/melted-heart-of-selig.webp`,
    tooltipSrc: `${TIP}/melted-heart-of-selig.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '벡스', qty: 6 }, { name: '주울', qty: 6 }, { name: '크라이', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'andariels-visage',
    name: '안다리엘의 두개골',
    enName: "Andariel's Visage",
    slot: 'head', slotKr: '투구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/andariels-visage.webp`,
    tooltipSrc: `${TIP}/andariels-visage.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '탐', qty: 6 }, { name: '잔', qty: 6 }, { name: '시르', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'heir-of-perdition',
    name: '영벌의 후예',
    enName: 'Heir of Perdition',
    slot: 'head', slotKr: '투구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/heir-of-perdition.webp`,
    tooltipSrc: `${TIP}/heir-of-perdition.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '자', qty: 6 }, { name: '쿠에', qty: 6 }, { name: '가르', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'tyraels-might',
    name: '티리엘의 권능',
    enName: "Tyrael's Might",
    slot: 'chest', slotKr: '가슴 방어구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/tyraels-might.webp`,
    tooltipSrc: `${TIP}/tyraels-might.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '윰', qty: 6 }, { name: '나구', qty: 6 }, { name: '치크', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'the-grandfather',
    name: '한마비',
    enName: 'The Grandfather',
    slot: 'weapon-2h-slash', slotKr: '양손 도검 (베는 무기)',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/the-grandfather.webp`,
    tooltipSrc: `${TIP}/the-grandfather.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '탐', qty: 6 }, { name: '모트', qty: 6 }, { name: '약스', qty: 6 }
    ], goldCost: 5000 },
  },
  {
    slug: 'harlequin-crest',
    name: '할리퀸 관모',
    enName: 'Harlequin Crest (Shako)',
    slot: 'head', slotKr: '투구',
    itemPower: [900, 900],
    source: 'crafted',
    iconSrc: `${ICON}/harlequin-crest.webp`,
    tooltipSrc: `${TIP}/harlequin-crest.webp`,
    materials: { sparklingThunderbolt: 2, runes: [
      { name: '에옴', qty: 6 }, { name: '라크', qty: 6 }, { name: '세흐', qty: 6 }
    ], goldCost: 5000 },
  },

  // === 드랍 전용 / 시즌 신규 (부분 정보 — 시즌13 메타 변동에 따라 추가/수정 필요) ===
  {
    slug: 'ahavarion-spear-of-lycander',
    name: '아하바리온, 라이샌더의 창',
    enName: 'Ahavarion, Spear of Lycander',
    slot: 'weapon-2h-slash', slotKr: '양손 무기',
    source: 'drop',
    dropSource: '둥지 보스 신화 풀, 비밀 레시피 보스 트로피 추첨',
  },
  {
    slug: 'nesekem-the-herald',
    name: '네세켐, 약탈자의 전령',
    enName: 'Nesekem, the Herald of Marauders',
    slot: 'weapon-2h-blunt', slotKr: '양손 둔기',
    source: 'drop',
    dropSource: '둥지 보스 신화 풀, 비밀 레시피 보스 트로피 추첨',
  },
  // 시즌13 새로 추가된 신화 아이템 목록은 패치 진행에 따라 갱신 (아래 비밀 레시피 페이지에서 추첨 가능)
];

export const craftedMythics = mythicItems.filter((m) => m.source === 'crafted' || m.source === 'both');
export const dropMythics = mythicItems.filter((m) => m.source === 'drop' || m.source === 'both');

export function groupBySlot(list: MythicItem[]): Record<string, MythicItem[]> {
  const out: Record<string, MythicItem[]> = {};
  for (const m of list) {
    (out[m.slotKr] = out[m.slotKr] ?? []).push(m);
  }
  return out;
}
