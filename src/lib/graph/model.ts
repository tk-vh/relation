import graphZh from '../data/graph.json';
import graphEn from '../data/graph.en.json';
import layoutRaw from '../data/layout.json';

export type AtlasLanguage = 'zh' | 'en';

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
  language?: AtlasLanguage;
  eras: string[];
  thinkers: Thinker[];
  relations: Relation[];
  stats: { thinkers: number; relations: number; kinds: Record<RelationKind, number> };
};

export type LayoutNode = {
  id: string;
  x: number;
  y: number;
};

export type LayoutData = {
  width: number;
  height: number;
  nodes: LayoutNode[];
};

export type Neighbour = {
  thinker: Thinker;
  relation: Relation;
  outgoing: boolean;
};

export type PathStep = {
  relation: Relation;
  forward: boolean;
};

export type Lineage = {
  thinkers: Thinker[];
  steps: PathStep[];
};

export function relationKey(relation: Relation): string {
  return `${relation.source}|${relation.target}|${relation.kind}`;
}

export const RELATION_STYLE: Record<
  RelationKind,
  { glyph: string; dashed: boolean; dash: string }
> = {
  presupposes: { glyph: '∴', dashed: false, dash: '' },
  refutes: { glyph: '×', dashed: true, dash: '4 3' },
  synthesizes: { glyph: '⊕', dashed: false, dash: '' },
  influences: { glyph: '∼', dashed: true, dash: '4 3' },
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[·・\s\-—–]/g, '');

type SearchEntry = {
  thinker: Thinker;
  normalizedName: string;
  normalizedNameEn: string;
  searchableText: string;
};

export class PhilosophyGraph {
  readonly thinkers: readonly Thinker[];
  readonly eras: readonly string[];
  readonly relations: readonly Relation[];
  readonly byId: ReadonlyMap<string, Thinker>;
  readonly outgoing: ReadonlyMap<string, Relation[]>;
  readonly incoming: ReadonlyMap<string, Relation[]>;
  readonly neighbours: ReadonlyMap<string, Neighbour[]>;
  readonly stats: GraphData['stats'];
  readonly eraCounts: readonly number[];
  readonly hubs: readonly Thinker[];
  readonly degree: ReadonlyMap<string, number>;
  readonly ancestors: ReadonlyMap<string, number>;
  readonly descendants: ReadonlyMap<string, number>;
  private readonly searchEntries: readonly SearchEntry[];

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
    const eraCounts = new Array<number>(data.eras.length).fill(0);

    for (const thinker of data.thinkers) {
      outgoing.set(thinker.id, []);
      incoming.set(thinker.id, []);
      neighbours.set(thinker.id, []);
      degree.set(thinker.id, 0);
      ancestors.set(thinker.id, 0);
      descendants.set(thinker.id, 0);
      if (thinker.eraIndex >= 0 && thinker.eraIndex < eraCounts.length) {
        eraCounts[thinker.eraIndex] = (eraCounts[thinker.eraIndex] ?? 0) + 1;
      }
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
    this.eraCounts = eraCounts;
    this.degree = degree;
    this.ancestors = ancestors;
    this.descendants = descendants;
    this.hubs = [...data.thinkers].sort(
      (a, b) => (descendants.get(b.id) ?? 0) - (descendants.get(a.id) ?? 0),
    );
    this.searchEntries = data.thinkers.map((thinker) => ({
      thinker,
      normalizedName: normalize(thinker.name),
      normalizedNameEn: normalize(thinker.nameEn),
      searchableText: normalize(
        [
          thinker.name,
          thinker.nameEn,
          thinker.schools,
          thinker.era,
          ...thinker.ideas,
          ...thinker.books.flatMap((book) =>
            book.titleEn ? [book.title, book.titleEn] : [book.title],
          ),
        ].join(' '),
      ),
    }));
  }

  name(id: string): string {
    return this.byId.get(id)?.name ?? id;
  }

  nodeRadius(id: string): number {
    return (
      3.2 +
      Math.sqrt(this.descendants.get(id) ?? 0) * 1.75 +
      Math.sqrt(this.ancestors.get(id) ?? 0) * 0.55
    );
  }

  lifespan(person: Thinker): string {
    return [person.born, person.died]
      .filter((value) => value.length > 0 && value !== '不详' && value !== '—' && value !== '?')
      .join(' — ');
  }

  search(query: string, limit = 12): Thinker[] {
    const needle = normalize(query);
    if (!needle) return [];
    const scored: { thinker: Thinker; score: number }[] = [];
    for (const entry of this.searchEntries) {
      let score = -1;
      if (entry.normalizedName === needle || entry.normalizedNameEn === needle) score = 0;
      else if (entry.normalizedName.startsWith(needle) || entry.normalizedNameEn.startsWith(needle))
        score = 1;
      else if (entry.normalizedName.includes(needle) || entry.normalizedNameEn.includes(needle))
        score = 2;
      else if (entry.searchableText.includes(needle)) score = 3;
      if (score >= 0) scored.push({ thinker: entry.thinker, score });
    }
    return scored
      .sort((a, b) => a.score - b.score || b.thinker.eraIndex - a.thinker.eraIndex)
      .slice(0, limit)
      .map((entry) => entry.thinker);
  }

  /**
   * Undirected shortest walk so a reader can trace a thread even when some
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

export const graphs: Record<AtlasLanguage, PhilosophyGraph> = {
  zh: new PhilosophyGraph(graphZh as GraphData),
  en: new PhilosophyGraph(graphEn as GraphData),
};

export const layoutData: LayoutData = layoutRaw as LayoutData;
