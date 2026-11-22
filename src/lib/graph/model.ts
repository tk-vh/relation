import raw from '../data/graph.json';

export const RELATION_KINDS = ['presupposes', 'refutes', 'synthesizes', 'influences'] as const;
export type RelationKind = (typeof RELATION_KINDS)[number];

export type Book = {
  title: string;
  year: number;
  note: string;
  titleEn: string;
};

export type Thinker = {
  id: string;
  name: string;
  nameEn: string;
  era: string;
  eraIndex: number;
  born: string;
  died: string;
  birthYear: number | null;
  deathYear: number | null;
  dateApproximate: boolean;
  birthplace: string;
  deathplace: string;
  nationality: string;
  schools: string;
  wiki: string;
  bio: string;
  ideas: string[];
  books: Book[];
  quote: string;
  start: string;
};

export type Relation = {
  source: string;
  target: string;
  kind: RelationKind;
  reason: string;
};

export type GraphData = {
  version: number;
  eras: string[];
  thinkers: Thinker[];
  relations: Relation[];
  stats: { thinkers: number; relations: number; kinds: Record<RelationKind, number> };
};

export type Neighbour = {
  thinker: Thinker;
  relation: Relation;
  /** True when the selected thinker does the depending, i.e. selected -> other. */
  outgoing: boolean;
};

export type PathStep = {
  relation: Relation;
  /** True when the walk follows the relation's source -> target direction. */
  forward: boolean;
};

export type Lineage = {
  thinkers: Thinker[];
  steps: PathStep[];
};

export const RELATION_META: Record<
  RelationKind,
  { label: string; verb: string; glyph: string; color: string; dash: string; plain: string }
> = {
  presupposes: {
    label: '预设前提',
    verb: '预设了',
    glyph: '∴',
    color: '#8fa7b8',
    dash: '',
    plain: '要成立，必须先接受',
  },
  refutes: {
    label: '批判',
    verb: '批判了',
    glyph: '×',
    color: '#d65a46',
    dash: '5 4',
    plain: '明确反对其论证或结论',
  },
  synthesizes: {
    label: '综合',
    verb: '综合了',
    glyph: '⊕',
    color: '#e0b05a',
    dash: '',
    plain: '把其纳入一个新的结构',
  },
  influences: {
    label: '受影响',
    verb: '受…影响',
    glyph: '∼',
    color: '#8b8174',
    dash: '1.5 3.5',
    plain: '受其启发，并非严格推导',
  },
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[·・\s\-—–]/g, '');

export class PhilosophyGraph {
  readonly thinkers: readonly Thinker[];
  readonly eras: readonly string[];
  readonly relations: readonly Relation[];
  readonly byId: ReadonlyMap<string, Thinker>;
  readonly outgoing: ReadonlyMap<string, Relation[]>;
  readonly incoming: ReadonlyMap<string, Relation[]>;
  readonly neighbours: ReadonlyMap<string, Neighbour[]>;
  readonly stats: GraphData['stats'];
  readonly degree: ReadonlyMap<string, number>;
  /** How many positions this thinker builds on. */
  readonly ancestors: ReadonlyMap<string, number>;
  /** How many later thinkers build on this one. */
  readonly descendants: ReadonlyMap<string, number>;
  private readonly searchIndex: ReadonlyMap<string, string>;

  constructor(data: GraphData) {
    this.thinkers = data.thinkers;
    this.eras = data.eras;
    this.relations = data.relations;
    this.stats = data.stats;
    this.byId = new Map(data.thinkers.map((thinker) => [thinker.id, thinker]));

    const outgoing = new Map<string, Relation[]>();
    const incoming = new Map<string, Relation[]>();
    const neighbours = new Map<string, Neighbour[]>();
    const degree = new Map<string, number>();
    const ancestors = new Map<string, number>();
    const descendants = new Map<string, number>();

    for (const thinker of data.thinkers) {
      outgoing.set(thinker.id, []);
      incoming.set(thinker.id, []);
      neighbours.set(thinker.id, []);
      degree.set(thinker.id, 0);
      ancestors.set(thinker.id, 0);
      descendants.set(thinker.id, 0);
    }

    for (const relation of data.relations) {
      const source = this.byId.get(relation.source);
      const target = this.byId.get(relation.target);
      if (!source || !target) continue;
      outgoing.get(source.id)!.push(relation);
      incoming.get(target.id)!.push(relation);
      neighbours.get(source.id)!.push({ thinker: target, relation, outgoing: true });
      neighbours.get(target.id)!.push({ thinker: source, relation, outgoing: false });
      degree.set(source.id, degree.get(source.id)! + 1);
      degree.set(target.id, degree.get(target.id)! + 1);
      ancestors.set(source.id, ancestors.get(source.id)! + 1);
      descendants.set(target.id, descendants.get(target.id)! + 1);
    }

    this.outgoing = outgoing;
    this.incoming = incoming;
    this.neighbours = neighbours;
    this.degree = degree;
    this.ancestors = ancestors;
    this.descendants = descendants;
    this.searchIndex = new Map(
      data.thinkers.map((thinker) => [
        thinker.id,
        normalize(
          [thinker.name, thinker.nameEn, thinker.schools, thinker.era, ...thinker.ideas].join(' '),
        ),
      ]),
    );
  }

  name(id: string): string {
    return this.byId.get(id)?.name ?? id;
  }

  search(query: string, limit = 12): Thinker[] {
    const needle = normalize(query);
    if (!needle) return [];
    const scored: { thinker: Thinker; score: number }[] = [];
    for (const thinker of this.thinkers) {
      const name = normalize(thinker.name);
      const nameEn = normalize(thinker.nameEn);
      const index = this.searchIndex.get(thinker.id) ?? '';
      let score = -1;
      if (name === needle || nameEn === needle) score = 0;
      else if (name.startsWith(needle) || nameEn.startsWith(needle)) score = 1;
      else if (name.includes(needle) || nameEn.includes(needle)) score = 2;
      else if (index.includes(needle)) score = 3;
      if (score >= 0) scored.push({ thinker, score });
    }
    return scored
      .sort((a, b) => a.score - b.score || b.thinker.eraIndex - a.thinker.eraIndex)
      .slice(0, limit)
      .map((entry) => entry.thinker);
  }

  /**
   * Undirected shortest walk, so a reader can trace a thread even when some
   * links point backwards in time. Filtered links are excluded.
   */
  lineage(from: string, to: string, allow: (relation: Relation) => boolean): Lineage | null {
    const start = this.byId.get(from);
    const end = this.byId.get(to);
    if (!start || !end) return null;
    if (from === to) return { thinkers: [start], steps: [] };

    const previous = new Map<string, { id: string; relation: Relation; forward: boolean }>();
    const seen = new Set([from]);
    const queue = [from];
    while (queue.length) {
      const current = queue.shift()!;
      for (const neighbour of this.neighbours.get(current) ?? []) {
        if (!allow(neighbour.relation)) continue;
        if (seen.has(neighbour.thinker.id)) continue;
        seen.add(neighbour.thinker.id);
        previous.set(neighbour.thinker.id, {
          id: current,
          relation: neighbour.relation,
          forward: neighbour.outgoing,
        });
        if (neighbour.thinker.id === to) {
          const ids = [to];
          const steps: PathStep[] = [];
          let cursor = to;
          while (cursor !== from) {
            const step = previous.get(cursor)!;
            steps.push({ relation: step.relation, forward: step.forward });
            ids.push(step.id);
            cursor = step.id;
          }
          ids.reverse();
          steps.reverse();
          return {
            thinkers: ids.map((id) => this.byId.get(id)!),
            steps,
          };
        }
        queue.push(neighbour.thinker.id);
      }
    }
    return null;
  }
}

const graph = new PhilosophyGraph(raw as GraphData);
export default graph;
