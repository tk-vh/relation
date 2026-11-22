import { SvelteSet } from 'svelte/reactivity';
import graph, {
  type Lineage,
  type Relation,
  type RelationKind,
  type Thinker,
} from './graph/model';

const relationKey = (relation: Relation) => `${relation.source}|${relation.target}`;

class Atlas {
  selectedId = $state<string | null>(null);
  hoveredId = $state<string | null>(null);
  hiddenEras = new SvelteSet<string>();
  hiddenKinds = new SvelteSet<RelationKind>();
  pathMode = $state(false);
  pathFrom = $state<string | null>(null);
  pathTo = $state<string | null>(null);
  searchOpen = $state(false);

  get selected(): Thinker | null {
    return this.selectedId ? (graph.byId.get(this.selectedId) ?? null) : null;
  }

  get focusId(): string | null {
    return this.hoveredId ?? this.selectedId;
  }

  get lineage(): Lineage | null {
    if (!this.pathFrom || !this.pathTo) return null;
    return graph.lineage(this.pathFrom, this.pathTo, (relation) => this.isRelationVisible(relation));
  }

  get hasFilters(): boolean {
    return this.hiddenEras.size > 0 || this.hiddenKinds.size > 0;
  }

  isEraVisible(era: string): boolean {
    return !this.hiddenEras.has(era);
  }

  isRelationVisible(relation: Relation): boolean {
    if (this.hiddenKinds.has(relation.kind)) return false;
    const source = graph.byId.get(relation.source);
    const target = graph.byId.get(relation.target);
    if (!source || !target) return false;
    return this.isEraVisible(source.era) && this.isEraVisible(target.era);
  }

  /** Relation keys on the highlighted thread, plus every edge touching it. */
  get threadKeys(): Set<string> {
    const lineage = this.lineage;
    if (lineage) return new Set(lineage.steps.map((step) => relationKey(step.relation)));
    const id = this.focusId;
    if (!id) return new Set();
    const keys = new Set<string>();
    for (const relation of graph.outgoing.get(id) ?? []) {
      if (this.isRelationVisible(relation)) keys.add(relationKey(relation));
    }
    for (const relation of graph.incoming.get(id) ?? []) {
      if (this.isRelationVisible(relation)) keys.add(relationKey(relation));
    }
    return keys;
  }

  get threadNodes(): Set<string> {
    const lineage = this.lineage;
    if (lineage) return new Set(lineage.thinkers.map((thinker) => thinker.id));
    const id = this.focusId;
    if (!id) return new Set();
    const ids = new Set<string>([id]);
    for (const neighbour of graph.neighbours.get(id) ?? []) {
      if (this.isRelationVisible(neighbour.relation)) ids.add(neighbour.thinker.id);
    }
    return ids;
  }

  select(id: string): void {
    if (this.pathMode) {
      this.advanceTrace(id);
      return;
    }
    this.selectedId = id;
    this.writeHash(id);
  }

  clearSelection(): void {
    this.selectedId = null;
    this.writeHash(null);
  }

  /** Leave any trace and open a thinker, used by links inside the reading panel. */
  jumpTo(id: string): void {
    this.pathMode = false;
    this.pathFrom = null;
    this.pathTo = null;
    this.select(id);
  }

  hover(id: string | null): void {
    this.hoveredId = id;
  }

  toggleEra(era: string): void {
    if (this.hiddenEras.has(era)) this.hiddenEras.delete(era);
    else this.hiddenEras.add(era);
  }

  toggleKind(kind: RelationKind): void {
    if (this.hiddenKinds.has(kind)) this.hiddenKinds.delete(kind);
    else this.hiddenKinds.add(kind);
  }

  resetFilters(): void {
    this.hiddenEras.clear();
    this.hiddenKinds.clear();
  }

  beginTrace(): void {
    this.pathMode = true;
    this.pathFrom = this.selectedId;
    this.pathTo = null;
  }

  endTrace(): void {
    this.pathMode = false;
    this.pathFrom = null;
    this.pathTo = null;
  }

  private advanceTrace(id: string): void {
    if (!this.pathFrom) {
      this.pathFrom = id;
      this.pathTo = null;
      this.selectedId = id;
      return;
    }
    if (!this.pathTo && id !== this.pathFrom) {
      this.pathTo = id;
      this.selectedId = id;
      return;
    }
    this.pathFrom = id;
    this.pathTo = null;
    this.selectedId = id;
  }

  random(): Thinker {
    const pool = graph.thinkers.filter((thinker) => this.isEraVisible(thinker.era));
    const candidates = pool.length ? pool : [...graph.thinkers];
    return candidates[Math.floor(Math.random() * candidates.length)] ?? graph.thinkers[0]!;
  }

  openSearch(): void {
    this.searchOpen = true;
  }

  closeSearch(): void {
    this.searchOpen = false;
  }

  readHash(): void {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    if (id && graph.byId.has(id)) {
      this.selectedId = id;
    }
  }

  private writeHash(id: string | null): void {
    const next = id ? `#/${id}` : location.pathname + location.search;
    history.replaceState(null, '', next);
  }

  get kindCounts(): Record<RelationKind, number> {
    return graph.stats.kinds;
  }

  get totals(): { thinkers: number; relations: number; eras: number } {
    return {
      thinkers: graph.thinkers.length,
      relations: graph.relations.length,
      eras: graph.eras.length,
    };
  }
}

export const atlas = new Atlas();
