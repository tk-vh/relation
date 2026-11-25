import { SvelteSet } from 'svelte/reactivity';
import {
  graphs,
  relationKey,
  type AtlasLanguage,
  type Lineage,
  type PhilosophyGraph,
  type Relation,
  type RelationKind,
  type Thinker,
} from './graph/model';
import { stringsFor, type UiStrings } from './strings';
import { paletteFor, type AtlasPalette, type AtlasThemeMode } from './theme';

export type SheetDetent = 'minimized' | 'half' | 'expanded';

const LANGUAGE_KEY = 'atlas.language';
const THEME_KEY = 'atlas.theme';

function readStoredLanguage(): AtlasLanguage {
  try {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(LANGUAGE_KEY) : null;
    if (stored === 'zh' || stored === 'en') return stored;
  } catch {}
  return 'zh';
}

function readStoredTheme(): AtlasThemeMode {
  try {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(THEME_KEY) : null;
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return 'light';
}

function persist(key: string, value: string): void {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
  } catch {}
}

class Atlas {
  language = $state<AtlasLanguage>(readStoredLanguage());
  themeMode = $state<AtlasThemeMode>(readStoredTheme());
  selectedId = $state<string | null>(null);
  hoveredId = $state<string | null>(null);
  hiddenEras = new SvelteSet<number>();
  hiddenKinds = new SvelteSet<RelationKind>();
  pathMode = $state(false);
  pathFrom = $state<string | null>(null);
  pathTo = $state<string | null>(null);
  searchOpen = $state(false);
  graphFullscreen = $state(false);
  sheetDetent = $state<SheetDetent>('half');

  get graph(): PhilosophyGraph {
    return graphs[this.language];
  }

  get strings(): UiStrings {
    return stringsFor(this.language);
  }

  get palette(): AtlasPalette {
    return paletteFor(this.themeMode);
  }

  get selected(): Thinker | null {
    return this.selectedId ? (this.graph.byId.get(this.selectedId) ?? null) : null;
  }

  get focusId(): string | null {
    return this.hoveredId ?? this.selectedId;
  }

  get lineage(): Lineage | null {
    if (!this.pathFrom || !this.pathTo) return null;
    return this.graph.lineage(this.pathFrom, this.pathTo, (relation) =>
      this.isRelationVisible(relation),
    );
  }

  get hasFilters(): boolean {
    return this.hiddenEras.size > 0 || this.hiddenKinds.size > 0;
  }

  get anyEraVisible(): boolean {
    return this.hiddenEras.size < this.graph.eras.length;
  }

  get threadKeys(): Set<string> {
    const lineage = this.lineage;
    if (lineage) return new Set(lineage.steps.map((step) => relationKey(step.relation)));
    const id = this.focusId;
    if (!id) return new Set();
    const keys = new Set<string>();
    for (const relation of this.graph.outgoing.get(id) ?? []) {
      if (this.isRelationVisible(relation)) keys.add(relationKey(relation));
    }
    for (const relation of this.graph.incoming.get(id) ?? []) {
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
    for (const neighbour of this.graph.neighbours.get(id) ?? []) {
      if (this.isRelationVisible(neighbour.relation)) ids.add(neighbour.thinker.id);
    }
    return ids;
  }

  get kindCounts(): Record<RelationKind, number> {
    return this.graph.stats.kinds;
  }

  get totals(): { thinkers: number; relations: number; eras: number } {
    return {
      thinkers: this.graph.thinkers.length,
      relations: this.graph.relations.length,
      eras: this.graph.eras.length,
    };
  }

  toggleLanguage(): void {
    this.setLanguage(this.language === 'zh' ? 'en' : 'zh');
  }

  setLanguage(lang: AtlasLanguage): void {
    this.language = lang;
    persist(LANGUAGE_KEY, lang);
  }

  toggleTheme(): void {
    this.setTheme(this.themeMode === 'light' ? 'dark' : 'light');
  }

  setTheme(mode: AtlasThemeMode): void {
    this.themeMode = mode;
    persist(THEME_KEY, mode);
  }

  isEraVisible(eraIndex: number): boolean {
    return !this.hiddenEras.has(eraIndex);
  }

  toggleEra(eraIndex: number): void {
    if (this.hiddenEras.has(eraIndex)) this.hiddenEras.delete(eraIndex);
    else this.hiddenEras.add(eraIndex);
  }

  toggleAllEras(): void {
    if (this.anyEraVisible) {
      for (let i = 0; i < this.graph.eras.length; i += 1) {
        this.hiddenEras.add(i);
      }
    } else {
      this.hiddenEras.clear();
    }
  }

  toggleKind(kind: RelationKind): void {
    if (this.hiddenKinds.has(kind)) this.hiddenKinds.delete(kind);
    else this.hiddenKinds.add(kind);
  }

  resetFilters(): void {
    this.hiddenEras.clear();
    this.hiddenKinds.clear();
  }

  isRelationVisible(relation: Relation): boolean {
    if (this.hiddenKinds.has(relation.kind)) return false;
    const source = this.graph.byId.get(relation.source);
    const target = this.graph.byId.get(relation.target);
    if (!source || !target) return false;
    return this.isEraVisible(source.eraIndex) && this.isEraVisible(target.eraIndex);
  }

  select(id: string): void {
    if (this.pathMode) {
      this.advanceTrace(id);
      return;
    }
    this.selectedId = id;
    this.graphFullscreen = false;
    this.sheetDetent = 'half';
    this.writeHash(id);
  }

  clearSelection(): void {
    this.selectedId = null;
    this.writeHash(null);
  }

  jumpTo(id: string): void {
    this.pathMode = false;
    this.pathFrom = null;
    this.pathTo = null;
    this.select(id);
  }

  hover(id: string | null): void {
    this.hoveredId = id;
  }

  beginTrace(): void {
    this.pathMode = true;
    this.pathFrom = this.selectedId;
    this.pathTo = null;
    this.graphFullscreen = false;
    this.sheetDetent = 'half';
  }

  endTrace(): void {
    this.pathMode = false;
    this.pathFrom = null;
    this.pathTo = null;
  }

  reselectTrace(): void {
    this.pathFrom = null;
    this.pathTo = null;
  }

  clearTraceEnd(): void {
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
    const pool = this.graph.thinkers.filter((thinker) => this.isEraVisible(thinker.eraIndex));
    const candidates = pool.length ? pool : [...this.graph.thinkers];
    return candidates[Math.floor(Math.random() * candidates.length)] ?? this.graph.thinkers[0]!;
  }

  openSearch(): void {
    this.searchOpen = true;
  }

  closeSearch(): void {
    this.searchOpen = false;
  }

  exitFullscreen(): void {
    this.graphFullscreen = false;
  }

  toggleFullscreen(): void {
    this.graphFullscreen = !this.graphFullscreen;
  }

  setSheetDetent(detent: SheetDetent): void {
    this.sheetDetent = detent;
  }

  handleEscape(): boolean {
    if (this.searchOpen) {
      this.closeSearch();
      return true;
    }
    if (this.graphFullscreen) {
      this.exitFullscreen();
      return true;
    }
    if (this.pathMode) {
      this.endTrace();
      return true;
    }
    if (this.selectedId) {
      this.clearSelection();
      return true;
    }
    return false;
  }

  readHash(): void {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    this.pathMode = false;
    this.pathFrom = null;
    this.pathTo = null;
    this.selectedId = id && this.graph.byId.has(id) ? id : null;
  }

  private writeHash(id: string | null): void {
    const next = id ? `#/${id}` : location.pathname + location.search;
    history.replaceState(null, '', next);
  }
}

export const atlas = new Atlas();
