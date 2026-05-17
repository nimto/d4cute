export type RuneRarity = 'magic' | 'rare' | 'legendary';
export type RuneType = 'ritual' | 'invocation';

export interface Rune {
  slug: string;
  name: string;       // 한국명
  rarity: RuneRarity;
  type: RuneType;
  resource: string;   // 요구/획득 자원 설명
  trigger: string;    // 조건 (트리거)
  effect: string;     // 효과
  cooldown?: string;  // 재사용 대기시간
  iconSrc: string;
  tooltipSrc: string;
}

const ICON = '/images/horadric-cube/runes/icons';
const TIP = '/images/horadric-cube/runes';

export const runes: Rune[] = [
  // 의식의 룬 — 전설
  { slug: 'bach', name: '바크', rarity: 'legendary', type: 'ritual',
    resource: '50 공물', trigger: '5미터 이동 시', effect: '자원 누적',
    iconSrc: `${ICON}/ritual-bach.webp`, tooltipSrc: `${TIP}/ritual/bach.webp` },
  { slug: 'igni', name: '이그니', rarity: 'legendary', type: 'ritual',
    resource: '25 공물', trigger: '0.3초마다 공물 저장 · 비기본 기술 시전 시 저장된 공물 획득', effect: '공물 누적 최대 500개',
    iconSrc: `${ICON}/ritual-igni.webp`, tooltipSrc: `${TIP}/ritual/igni.webp` },
  { slug: 'tam', name: '탐', rarity: 'legendary', type: 'ritual',
    resource: '25 공물', trigger: '정신을 집중하지 않는 핵심 기술 시전 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-tam.webp`, tooltipSrc: `${TIP}/ritual/tam.webp` },
  { slug: 'yul', name: '율', rarity: 'legendary', type: 'ritual',
    resource: '50 공물', trigger: '재사용 대기시간이 있는 기술 시전 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-yul.webp`, tooltipSrc: `${TIP}/ritual/yul.webp` },

  // 의식의 룬 — 희귀
  { slug: 'nagu', name: '나구', rarity: 'rare', type: 'ritual',
    resource: '100 공물', trigger: '최소 1마리 이상의 활성화된 소환수 5초 유지 시', effect: '최대 5마리까지 소환수당 공물 획득',
    iconSrc: `${ICON}/ritual-nagu.webp`, tooltipSrc: `${TIP}/ritual/nagu.webp` },
  { slug: 'neho', name: '네호', rarity: 'rare', type: 'ritual',
    resource: '200 공물', trigger: '전투 중 2초 동안 생명력 피해를 받지 않을 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-neho.webp`, tooltipSrc: `${TIP}/ritual/neho.webp` },
  { slug: 'nok', name: '녹', rarity: 'rare', type: 'ritual',
    resource: '5 공물', trigger: '군중 제어 효과 적용 시', effect: '오한이 아닌 경우 두 배의 공물 획득',
    iconSrc: `${ICON}/ritual-nok.webp`, tooltipSrc: `${TIP}/ritual/nok.webp` },
  { slug: 'pok', name: '포크', rarity: 'rare', type: 'ritual',
    resource: '5 공물', trigger: '최대 자원의 5% 소모 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-pok.webp`, tooltipSrc: `${TIP}/ritual/pok.webp` },
  { slug: 'jan', name: '잔', rarity: 'rare', type: 'ritual',
    resource: '200 공물', trigger: '궁극기 시전 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-jan.webp`, tooltipSrc: `${TIP}/ritual/jan.webp` },

  // 의식의 룬 — 마법
  { slug: 'chem', name: '쳄', rarity: 'magic', type: 'ritual',
    resource: '75 공물', trigger: '피해가 시전 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-chem.webp`, tooltipSrc: `${TIP}/ritual/chem.webp` },
  { slug: 'sir', name: '시르', rarity: 'magic', type: 'ritual',
    resource: '300 공물', trigger: '기술을 5번 시전하면 3초 동안 기진맥 진할 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-sir.webp`, tooltipSrc: `${TIP}/ritual/sir.webp` },
  { slug: 'moni', name: '모니', rarity: 'magic', type: 'ritual',
    resource: '100 공물', trigger: '기동력 또는 섭특힘 기술을 2번 시전 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-moni.webp`, tooltipSrc: `${TIP}/ritual/moni.webp` },
  { slug: 'ureu', name: '우르', rarity: 'magic', type: 'ritual',
    resource: '10 공물', trigger: '하수인 또는 동료가 적을 처치하거나 사망할 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-ureu.webp`, tooltipSrc: `${TIP}/ritual/ureu.webp` },
  { slug: 'yaks', name: '약스', rarity: 'magic', type: 'ritual',
    resource: '200 공물', trigger: '치유 물약을 마실 시', effect: '공물 누적',
    iconSrc: `${ICON}/ritual-yaks.webp`, tooltipSrc: `${TIP}/ritual/yaks.webp` },

  // 기원의 룬 — 전설
  { slug: 'eom', name: '에옴', rarity: 'legendary', type: 'invocation',
    resource: '100 공물 (재사용 대기시간 추가 감소)', trigger: '발동', effect: '재사용 대기 중인 기술의 재사용 대기시간 0.1초 감소', cooldown: '1.8초',
    iconSrc: `${ICON}/invocation-eom.webp`, tooltipSrc: `${TIP}/invocation/eom.webp` },
  { slug: 'ja', name: '자', rarity: 'legendary', type: 'invocation',
    resource: '350 공물 (어둠 공물 절감)', trigger: '발동', effect: '다음 피해가 원소수가 순간이동 기술로 대체되어 더 멀리 점멸하며 피해 후 적격불가 상태가 됨', cooldown: '3.5초',
    iconSrc: `${ICON}/invocation-ja.webp`, tooltipSrc: `${TIP}/invocation/ja.webp` },
  { slug: 'oum', name: '오움', rarity: 'legendary', type: 'invocation',
    resource: '600 공물 (지속시간 증가)', trigger: '발동', effect: '아멘유사가 천장의 합성 기술을 사용하여 플레이어가 주는 피해를 6초 동안 7.5% 증가시킴', cooldown: '2.5초',
    iconSrc: `${ICON}/invocation-oum.webp`, tooltipSrc: `${TIP}/invocation/oum.webp` },
  { slug: 'vex', name: '벡스', rarity: 'legendary', type: 'invocation',
    resource: '100 공물 (기술 등급이 최대 3까지 증가)', trigger: '발동', effect: '10초 동안 모든 기술 등급이 +1 상승', cooldown: '5초',
    iconSrc: `${ICON}/invocation-vex.webp`, tooltipSrc: `${TIP}/invocation/vex.webp` },
  { slug: 'yom', name: '윰', rarity: 'legendary', type: 'invocation',
    resource: '500 공물 (지속시간 증가)', trigger: '발동', effect: '드루이드의 색하 기술을 사용해 적을 거진시키고 추 자원을 회복함', cooldown: '5초',
    iconSrc: `${ICON}/invocation-yom.webp`, tooltipSrc: `${TIP}/invocation/yom.webp` },

  // 기원의 룬 — 희귀
  { slug: 'kel', name: '켈', rarity: 'rare', type: 'invocation',
    resource: '500 공물 (자원 증가)', trigger: '발동', effect: '성기사의 집결 기술을 발동하여 8초 동안 자원과 이동 속도를 획득', cooldown: '3.3초',
    iconSrc: `${ICON}/invocation-kel.webp`, tooltipSrc: `${TIP}/invocation/kel.webp` },
  { slug: 'rak', name: '라크', rarity: 'rare', type: 'invocation',
    resource: '400 공물 (지속시간 증가)', trigger: '발동', effect: '야만전사의 도전의 외침 기술을 사용해 적을 도발하고 플레이어가 받는 피해를 3.3초 동안 감소', cooldown: '1.3초',
    iconSrc: `${ICON}/invocation-rak.webp`, tooltipSrc: `${TIP}/invocation/rak.webp` },
  { slug: 'mot', name: '모트', rarity: 'rare', type: 'invocation',
    resource: '150 공물 (어둠 그림자 획득)', trigger: '발동', effect: '도적의 어둠의 장막 기술을 사용해 그림자를 1개 얻고 그림자 하나당 받는 피해가 감소', cooldown: '1초',
    iconSrc: `${ICON}/invocation-mot.webp`, tooltipSrc: `${TIP}/invocation/mot.webp` },
  { slug: 'kume', name: '쿠메', rarity: 'rare', type: 'invocation',
    resource: '300 공물 (지속시간 증가)', trigger: '발동', effect: '드루이드의 대지 방벽 기술을 사용해 3초 동안 자신에게 보호막을 부여', cooldown: '1초',
    iconSrc: `${ICON}/invocation-kume.webp`, tooltipSrc: `${TIP}/invocation/kume.webp` },
  { slug: 'jul', name: '주울', rarity: 'rare', type: 'invocation',
    resource: '250 공물 (최대 100%까지 범위 증가)', trigger: '발동', effect: '원소술사의 서릿발 기술을 사용해 적을 빙결시킴', cooldown: '2초',
    iconSrc: `${ICON}/invocation-jul.webp`, tooltipSrc: `${TIP}/invocation/jul.webp` },

  // 기원의 룬 — 마법
  { slug: 'wat', name: '와트', rarity: 'magic', type: 'invocation',
    resource: '100 공물 (지속시간 증가)', trigger: '발동', effect: '강면술사의 노화 기술을 사용해 적들을 약화시키고 감속', cooldown: '1초',
    iconSrc: `${ICON}/invocation-wat.webp`, tooltipSrc: `${TIP}/invocation/wat.webp` },
  { slug: 'seh', name: '세흐', rarity: 'magic', type: 'invocation',
    resource: '100 공물 (여러 늑대 소환)', trigger: '발동', effect: '늑대 동료를 소환해 적을 8초 동안 공격', cooldown: '1초',
    iconSrc: `${ICON}/invocation-seh.webp`, tooltipSrc: `${TIP}/invocation/seh.webp` },
  { slug: 'gar', name: '가르', rarity: 'magic', type: 'invocation',
    resource: '25 공물 (여러 중첩 획득)', trigger: '발동', effect: '5초 동안 극대화 확률을 2%만큼, 최대 10%까지 얻음', cooldown: '1초',
    iconSrc: `${ICON}/invocation-gar.webp`, tooltipSrc: `${TIP}/invocation/gar.webp` },
  { slug: 'krami', name: '크라미', rarity: 'magic', type: 'invocation',
    resource: '300 공물 (최대 100%까지 범위 증가)', trigger: '발동', effect: '혼령사의 와류 기술을 사용해 적에게 피해를 주고 끌어당김', cooldown: '3초',
    iconSrc: `${ICON}/invocation-krami.webp`, tooltipSrc: `${TIP}/invocation/krami.webp` },
  { slug: 'ner', name: '네르', rarity: 'magic', type: 'invocation',
    resource: '600 공물 (지속시간 증가)', trigger: '발동', effect: '도적의 운심 기술을 사용해 5초 동안 이동 속도를 얻고 적격 불가 및 은폐 상태를 얻음', cooldown: '6초',
    iconSrc: `${ICON}/invocation-ner.webp`, tooltipSrc: `${TIP}/invocation/ner.webp` },
  { slug: 'prid', name: '프리드', rarity: 'magic', type: 'invocation',
    resource: '250 공물 (어둠의 감속 지속시간 증가)', trigger: '발동', effect: '악마술사의 어둠의 감속 기술을 사용해 적들을 3초 동안 범위 내에 결박', cooldown: '3초',
    iconSrc: `${ICON}/invocation-prid.webp`, tooltipSrc: `${TIP}/invocation/prid.webp` },
  { slug: 'kuma', name: '쿠마', rarity: 'magic', type: 'invocation',
    resource: '50 공물 (지속시간 증가)', trigger: '발동', effect: '5초 동안 이동 속도를 10%만큼, 최대 50%까지 얻음', cooldown: '1초',
    iconSrc: `${ICON}/invocation-kuma.webp`, tooltipSrc: `${TIP}/invocation/kuma.webp` },
  { slug: 'teb', name: '테브', rarity: 'magic', type: 'invocation',
    resource: '100 공물 (공물당 피해 1% 증가)', trigger: '발동', effect: '강면술사의 가시 박힌 깊갑 기술을 사용해 적들에게 피해를 주고 적에게 피해를 받으면 반격', cooldown: '1.3초',
    iconSrc: `${ICON}/invocation-teb.webp`, tooltipSrc: `${TIP}/invocation/teb.webp` },
  { slug: 'chik', name: '치크', rarity: 'magic', type: 'invocation',
    resource: '200 공물 (공물당 피해 1% 증가)', trigger: '발동', effect: '혼령사의 뇌 흔들기 기술을 사용해 적에게 피해를 주고 넘어뜨림', cooldown: '1.3초',
    iconSrc: `${ICON}/invocation-chik.webp`, tooltipSrc: `${TIP}/invocation/chik.webp` },
];

export const ritualRunes = runes.filter((r) => r.type === 'ritual');
export const invocationRunes = runes.filter((r) => r.type === 'invocation');

export function byRarity(list: Rune[]): Record<RuneRarity, Rune[]> {
  return {
    legendary: list.filter((r) => r.rarity === 'legendary'),
    rare: list.filter((r) => r.rarity === 'rare'),
    magic: list.filter((r) => r.rarity === 'magic'),
  };
}
