import type { AtlasLanguage, RelationKind } from './graph/model';

export interface UiStrings {
  readonly language: AtlasLanguage;
  readonly seal: string;
  readonly brand: string;
  readonly brandLatin: string;
  readonly brandTagline: string;
  readonly trace: string;
  readonly exitTrace: string;
  readonly search: string;
  readonly searchPlaceholder: string;
  readonly languageToggle: string;
  readonly themeToggle: string;
  readonly counts: (thinkers: number, relations: number) => string;
  readonly eraLabel: string;
  readonly eraShortNames: readonly string[];
  readonly relationsLabel: string;
  readonly arrowHint: string;
  readonly total: (thinkers: number, relations: number) => string;
  readonly emptyRelations: string;
  readonly collapse: string;
  readonly expandRest: (count: number) => string;
  readonly randomOne: string;
  readonly share: string;
  readonly copiedLink: string;
  readonly closeArchive: string;
  readonly chapter: (index: number, lifespan: string) => string;
  readonly school: string;
  readonly birthplace: string;
  readonly nationality: string;
  readonly dependencies: (count: number) => string;
  readonly dependedOn: (count: number) => string;
  readonly traceLineage: string;
  readonly sources: string;
  readonly sourcesSub: (count: number) => string;
  readonly legacy: string;
  readonly legacySub: (count: number) => string;
  readonly keyIdeas: string;
  readonly selectedWork: string;
  readonly noWorks: string;
  readonly whereToBegin: string;
  readonly wikipedia: string;
  readonly quote: (text: string) => string;
  readonly introHeader: string;
  readonly introKicker: string;
  readonly introTitle: string;
  readonly introLede: (thinkers: number) => string;
  readonly thinkersUnit: string;
  readonly relationsUnit: string;
  readonly erasUnit: string;
  readonly fourRelations: string;
  readonly howToRead: string;
  readonly startWithHub: string;
  readonly hubDependents: (count: number) => string;
  readonly randomWalk: string;
  readonly introHint: string;
  readonly dataCredit: string;
  readonly influenceSummary: (influences: number, critiques: number) => string;
  readonly lineageHeader: string;
  readonly pickStart: string;
  readonly pickEnd: string;
  readonly pickerLede: string;
  readonly startEndpoint: string;
  readonly endEndpoint: string;
  readonly pending: string;
  readonly chooseStart: string;
  readonly chooseEnd: string;
  readonly noResults: (query: string) => string;
  readonly graphPickHint: string;
  readonly stepCount: (count: number) => string;
  readonly viewStart: string;
  readonly arrival: (name: string, era: string) => string;
  readonly deadTitle: string;
  readonly deadBody: string;
  readonly clearFiltersRetry: string;
  readonly chooseAnotherEnd: string;
  readonly reselect: string;
  readonly exitLineage: string;
  readonly close: string;
  readonly found: (count: number) => string;
  readonly hubs: string;
  readonly searchEmptyHint: string;
  readonly clueCount: (count: number) => string;
  readonly searchFooter: (thinkers: number, eras: number) => string;
  readonly tapResult: string;
  readonly graphDescription: (thinkers: number, relations: number) => string;
  readonly zoomIn: string;
  readonly zoomOut: string;
  readonly fit: string;
  readonly fullscreen: string;
  readonly exitFullscreen: string;
  eraShort(index: number): string;
  formatYear(year: number): string;
  relationLabel(kind: RelationKind): string;
  relationVerb(kind: RelationKind): string;
  relationPlain(kind: RelationKind): string;
}

type UiStringsData = Omit<
  UiStrings,
  'eraShort' | 'formatYear' | 'relationLabel' | 'relationVerb' | 'relationPlain'
>;

function createStrings(data: UiStringsData): UiStrings {
  const isZh = data.language === 'zh';
  return {
    ...data,
    eraShort(index: number): string {
      return data.eraShortNames[index] ?? data.eraShortNames[data.eraShortNames.length - 1] ?? '';
    },
    formatYear(year: number): string {
      if (isZh) return year < 0 ? `前 ${-year} 年` : `${year} 年`;
      return year < 0 ? `${-year} BCE` : `${year}`;
    },
    relationLabel(kind: RelationKind): string {
      switch (kind) {
        case 'presupposes':
          return isZh ? '预设前提' : 'Presupposes';
        case 'refutes':
          return isZh ? '批判' : 'Critiques';
        case 'synthesizes':
          return isZh ? '综合' : 'Synthesizes';
        case 'influences':
          return isZh ? '受影响' : 'Influenced by';
      }
    },
    relationVerb(kind: RelationKind): string {
      switch (kind) {
        case 'presupposes':
          return isZh ? '预设了' : 'presupposed';
        case 'refutes':
          return isZh ? '批判了' : 'critiqued';
        case 'synthesizes':
          return isZh ? '综合了' : 'synthesized';
        case 'influences':
          return isZh ? '受…影响' : 'was influenced by';
      }
    },
    relationPlain(kind: RelationKind): string {
      switch (kind) {
        case 'presupposes':
          return isZh ? '要成立，必须先接受' : 'Requires accepting a prior claim';
        case 'refutes':
          return isZh ? '明确反对其论证或结论' : 'Opposes its argument or conclusion';
        case 'synthesizes':
          return isZh ? '把其纳入一个新的结构' : 'Folds it into a new structure';
        case 'influences':
          return isZh ? '受其启发，并非严格推导' : 'Inspired by it, not strict derivation';
      }
    },
  };
}

export const ZhStrings: UiStrings = createStrings({
  language: 'zh',
  seal: '哲',
  brand: '哲学家图谱',
  brandLatin: 'PHILOSOPHER ATLAS',
  brandTagline: '一部哲学家依赖图谱',
  trace: '追溯',
  exitTrace: '退出追溯',
  search: '搜索思想家',
  searchPlaceholder: '搜索思想家、学派或命题',
  languageToggle: '切换到英文',
  themeToggle: '切换明暗主题',
  counts: (thinkers, relations) => `${thinkers} 位思想家 · ${relations} 条线索`,
  eraLabel: '时代',
  eraShortNames: [
    '前苏',
    '古典',
    '希腊化',
    '东方',
    '中世',
    '文艺复兴',
    '启蒙',
    '德国唯心',
    '19世纪',
    '现象学',
    '分析',
    '政治',
    '批判',
    '后结构',
  ],
  relationsLabel: '关系',
  arrowHint: '箭头指向被依赖的思想家',
  total: (thinkers, relations) => `${thinkers} 位 · ${relations} 条`,
  emptyRelations: '暂无收录。',
  collapse: '收起',
  expandRest: (count) => `展开其余 ${count} 条`,
  randomOne: '随机一位',
  share: '分享',
  copiedLink: '已复制链接',
  closeArchive: '关闭档案',
  chapter: (index, lifespan) => `第 ${String(index + 1).padStart(2, '0')} 章 · ${lifespan}`,
  school: '学派',
  birthplace: '出生地',
  nationality: '国籍',
  dependencies: (count) => `依赖 ${count}`,
  dependedOn: (count) => `被依赖 ${count}`,
  traceLineage: '追溯世系',
  sources: '思想来源',
  sourcesSub: (count) => `TA 所依赖的 · ${count}`,
  legacy: '思想去向',
  legacySub: (count) => `依赖 TA 的 · ${count}`,
  keyIdeas: '核心命题',
  selectedWork: '代表作',
  noWorks: '无完整著作传世；仅有残篇或后人记载。',
  whereToBegin: '从何读起',
  wikipedia: '维基百科 ↗',
  quote: (text) => `「${text}」`,
  introHeader: 'ATLAS · 图谱指南',
  introKicker: '关系',
  introTitle: '每一个观念，\n都是对某人的回答。',
  introLede: (thinkers) =>
    `从泰勒斯到当代，${thinkers} 位思想家在这张图上彼此回应。线从依赖者指向被依赖者，标明谁预设了谁，谁批判了谁，谁又把两股思想综合成新的东西。`,
  thinkersUnit: '位思想家',
  relationsUnit: '条线索',
  erasUnit: '个时代',
  fourRelations: '关系类型',
  howToRead: 'HOW TO READ A LINE',
  startWithHub: '从枢纽进入',
  hubDependents: (count) => `${count} 人依赖`,
  randomWalk: '随机漫步',
  introHint: '箭头指向被依赖者 · 点击节点看档案 · 拖动平移 · 拖动节点 · 滚轮缩放 · 右上角全屏',
  dataCredit: '数据整理自公开哲学史资料',
  influenceSummary: (influences, critiques) => `${influences} 条影响 · ${critiques} 条批判`,
  lineageHeader: 'LINEAGE · 追溯世系',
  pickStart: '选择起点思想家',
  pickEnd: '选择终点思想家',
  pickerLede: '从两端各选一位，图谱会找出最短的可见依赖链，并逐跳写出理由。',
  startEndpoint: '起点',
  endEndpoint: '终点',
  pending: '待选',
  chooseStart: '选择起点思想家',
  chooseEnd: '选择终点思想家',
  noResults: (query) => `没有找到「${query}」。`,
  graphPickHint: '也可以直接在图上点选节点。选择后会自动寻找最短的一条依赖链。',
  stepCount: (count) => `一条线索 · ${count} 步`,
  viewStart: '查看起点',
  arrival: (name, era) => `抵达 ${name}。${era}`,
  deadTitle: '这两页之间，还没有收录的依赖链。',
  deadBody:
    '他们可能属于不同的思想流域，也可能需要对中间人物做补充。这条图谱只呈现已经过整理的关系，不会凭空补上一段。',
  clearFiltersRetry: '清除筛选后重试',
  chooseAnotherEnd: '换一个终点',
  reselect: '重新选择',
  exitLineage: '退出追溯',
  close: '关闭',
  found: (count) => `找到 ${count} 位`,
  hubs: '思想的枢纽',
  searchEmptyHint: '试试中文名、英文名或学派。',
  clueCount: (count) => `${count} 条线索`,
  searchFooter: (thinkers, eras) => `${thinkers} 位思想家 · ${eras} 个时代`,
  tapResult: '点击结果打开档案',
  graphDescription: (thinkers, relations) =>
    `哲学依赖关系图，${thinkers} 位思想家，${relations} 条关系`,
  zoomIn: '放大',
  zoomOut: '缩小',
  fit: '适应画布',
  fullscreen: '全屏图谱',
  exitFullscreen: '退出全屏',
});

export const EnStrings: UiStrings = createStrings({
  language: 'en',
  seal: 'φ',
  brand: 'Philosopher Atlas',
  brandLatin: 'A PHILOSOPHY ATLAS',
  brandTagline: 'a map of philosophical dependence',
  trace: 'Trace',
  exitTrace: 'Exit trace',
  search: 'Search thinkers',
  searchPlaceholder: 'Search thinkers, schools or ideas',
  languageToggle: 'Switch to Chinese',
  themeToggle: 'Switch light or dark theme',
  counts: (thinkers, relations) => `${thinkers} thinkers · ${relations} relations`,
  eraLabel: 'Era',
  eraShortNames: [
    'Pre-Soc.',
    'Classical',
    'Hellenistic',
    'Eastern',
    'Medieval',
    'Renaissance',
    'Enlight.',
    'Ger. Ideal.',
    '19th c.',
    'Phenom.',
    'Analytic',
    'Political',
    'Critical',
    'Post-struct.',
  ],
  relationsLabel: 'Relations',
  arrowHint: 'Arrows point to the thinker depended on',
  total: (thinkers, relations) => `${thinkers} thinkers · ${relations} relations`,
  emptyRelations: 'No recorded relations.',
  collapse: 'Collapse',
  expandRest: (count) => `Show ${count} more`,
  randomOne: 'Random thinker',
  share: 'Share',
  copiedLink: 'Link copied',
  closeArchive: 'Close archive',
  chapter: (index, lifespan) => `Chapter ${String(index + 1).padStart(2, '0')} · ${lifespan}`,
  school: 'School',
  birthplace: 'Birthplace',
  nationality: 'Nationality',
  dependencies: (count) => `Depends on ${count}`,
  dependedOn: (count) => `Depended on by ${count}`,
  traceLineage: 'Trace lineage',
  sources: 'Sources',
  sourcesSub: (count) => `What they drew on · ${count}`,
  legacy: 'Legacy',
  legacySub: (count) => `Who drew on them · ${count}`,
  keyIdeas: 'Key ideas',
  selectedWork: 'Selected work',
  noWorks: 'No complete writings survive; only fragments and later reports.',
  whereToBegin: 'Where to begin',
  wikipedia: 'Wikipedia ↗',
  quote: (text) => `“${text}”`,
  introHeader: 'ATLAS · GUIDE',
  introKicker: 'PHILOSOPHY',
  introTitle: 'Every idea is\nan answer to someone.',
  introLede: (thinkers) =>
    `From Thales to the present, ${thinkers} thinkers answer one another across this map. Lines run from the thinker who depends to the thinker they depend on, marking who presupposed whom, who critiqued whom, and who folded two traditions into something new.`,
  thinkersUnit: 'thinkers',
  relationsUnit: 'relations',
  erasUnit: 'eras',
  fourRelations: 'Kinds of relation',
  howToRead: 'HOW TO READ A LINE',
  startWithHub: 'START WITH A HUB',
  hubDependents: (count) => `${count} depend on them`,
  randomWalk: 'Random walk',
  introHint:
    'Arrows point to the thinker depended on · Click a node for the archive · Drag to pan · Drag a node to move · Scroll to zoom · Fullscreen at top right',
  dataCredit: 'Compiled from public histories of philosophy',
  influenceSummary: (influences, critiques) => `${influences} influences · ${critiques} critiques`,
  lineageHeader: 'LINEAGE',
  pickStart: 'Choose a starting thinker',
  pickEnd: 'Choose an ending thinker',
  pickerLede:
    'Choose two thinkers. The atlas finds the shortest visible chain and highlights each step.',
  startEndpoint: 'Start',
  endEndpoint: 'End',
  pending: 'Not chosen',
  chooseStart: 'Choose a starting thinker',
  chooseEnd: 'Choose an ending thinker',
  noResults: (query) => `No match for “${query}”.`,
  graphPickHint:
    'You can also tap nodes on the graph. The shortest visible chain is found automatically.',
  stepCount: (count) => `A thread · ${count} steps`,
  viewStart: 'View start',
  arrival: (name, era) => `Arrives at ${name}. ${era}`,
  deadTitle: 'No recorded chain between these two pages.',
  deadBody:
    'They may belong to different traditions, or the middle figures may not be recorded. The atlas only shows curated links; it does not invent a missing step.',
  clearFiltersRetry: 'Clear filters and retry',
  chooseAnotherEnd: 'Choose another end',
  reselect: 'Choose again',
  exitLineage: 'Exit lineage',
  close: 'Close',
  found: (count) => `${count} found`,
  hubs: 'Hubs',
  searchEmptyHint: 'Try a Chinese name, English name, or school.',
  clueCount: (count) => `${count} links`,
  searchFooter: (thinkers, eras) => `${thinkers} thinkers · ${eras} eras`,
  tapResult: 'Tap a result to open',
  graphDescription: (thinkers, relations) =>
    `Philosophy dependency graph, ${thinkers} thinkers, ${relations} relations`,
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  fit: 'Fit',
  fullscreen: 'Fullscreen graph',
  exitFullscreen: 'Exit fullscreen',
});

export function stringsFor(language: AtlasLanguage): UiStrings {
  return language === 'en' ? EnStrings : ZhStrings;
}
