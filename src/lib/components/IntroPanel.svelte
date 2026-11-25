<script lang="ts">
  import { RELATION_KINDS, RELATION_STYLE } from '../graph/model';
  import { atlas, type SheetDetent } from '../state.svelte';
  import { eraColor, relationColor, withAlpha } from '../theme';
  import Icon from './Icon.svelte';

  const HUB_IDS = ['aristotle', 'plato', 'kant', 'hegel', 'buddha', 'augustine'] as const;

  const hubs = $derived(
    HUB_IDS.map((id) => atlas.graph.byId.get(id)).filter((person) => person !== undefined),
  );

  const visibleKinds = $derived(
    RELATION_KINDS.filter((kind) => (atlas.kindCounts[kind] ?? 0) > 0),
  );

  const totals = $derived(atlas.totals);

  function cycleDetent() {
    const order: SheetDetent[] = ['minimized', 'half', 'expanded'];
    const next = order[(order.indexOf(atlas.sheetDetent) + 1) % order.length] ?? 'half';
    atlas.setSheetDetent(next);
  }
</script>

<aside
  class="panel intro-panel"
  data-detent={atlas.sheetDetent}
  aria-label={atlas.strings.introHeader}
>
  <button
    type="button"
    class="sheet-handle"
    onclick={cycleDetent}
    aria-label={atlas.strings.introHeader}
  >
    <span class="sheet-handle-bar" aria-hidden="true"></span>
  </button>

  <div class="panel-head">
    <span class="micro">{atlas.strings.introHeader}</span>
    <button
      type="button"
      class="icon-btn"
      onclick={() => atlas.openSearch()}
      aria-label={atlas.strings.search}
      title={atlas.strings.search}
    >
      <Icon name="search" size={15} />
    </button>
  </div>

  <div class="panel-scroll">
    <div class="intro">
      <p class="kicker">{atlas.strings.introKicker}</p>
      <h1>{atlas.strings.introTitle}</h1>
      <p class="lede">{atlas.strings.introLede(totals.thinkers)}</p>

      <div class="numbers">
        <div><b>{totals.thinkers}</b><span>{atlas.strings.thinkersUnit}</span></div>
        <div><b>{totals.relations}</b><span>{atlas.strings.relationsUnit}</span></div>
        <div><b>{totals.eras}</b><span>{atlas.strings.erasUnit}</span></div>
      </div>

      <section class="legend">
        <h2>
          <span>{atlas.strings.fourRelations}</span>
          <em>{atlas.strings.howToRead}</em>
        </h2>
        {#each visibleKinds as kind (kind)}
          {@const style = RELATION_STYLE[kind]}
          {@const color = relationColor(kind, atlas.themeMode)}
          {@const hidden = atlas.hiddenKinds.has(kind)}
          <button
            type="button"
            class="legend-row"
            class:muted={hidden}
            aria-pressed={!hidden}
            onclick={() => atlas.toggleKind(kind)}
          >
            <span
              class="glyph"
              style={`color:${color};background:${withAlpha(color, 0.12)};border-color:${withAlpha(color, 0.55)}`}
            >
              {style.glyph}
            </span>
            <span class="legend-body">
              <span class="legend-name">{atlas.strings.relationLabel(kind)}</span>
              <span class="legend-plain">{atlas.strings.relationPlain(kind)}</span>
            </span>
            <svg class="line-sample" width="34" height="10" viewBox="0 0 34 10" aria-hidden="true">
              <line
                x1="0"
                y1="5"
                x2="34"
                y2="5"
                stroke={color}
                stroke-width="1.5"
                stroke-dasharray={style.dashed ? style.dash : undefined}
              />
            </svg>
            <span class="legend-count">{atlas.kindCounts[kind]}</span>
          </button>
        {/each}
      </section>

      <section class="hubs">
        <h2>
          <span>{atlas.strings.startWithHub}</span>
          {#if atlas.language === 'zh'}
            <em>START WITH A HUB</em>
          {/if}
        </h2>
        <div class="hub-grid">
          {#each hubs as person (person.id)}
            <button type="button" class="hub" onclick={() => atlas.select(person.id)}>
              <span
                class="hub-dot"
                style={`background:${eraColor(person.eraIndex, atlas.themeMode)}`}
              ></span>
              <span class="hub-body">
                <span class="hub-name">{person.name}</span>
                <span class="hub-count">
                  {atlas.strings.hubDependents(atlas.graph.descendants.get(person.id) ?? 0)}
                </span>
              </span>
            </button>
          {/each}
        </div>
      </section>

      <div class="actions">
        <button type="button" class="primary" onclick={() => atlas.select(atlas.random().id)}>
          <span>{atlas.strings.randomWalk}</span>
          <Icon name="arrow" size={14} />
        </button>
        <button type="button" class="secondary" onclick={() => atlas.beginTrace()}>
          <Icon name="trace" size={14} />
          <span>{atlas.strings.traceLineage}</span>
        </button>
      </div>

      <p class="hint">{atlas.strings.introHint}</p>

      <footer class="colophon">
        <span>{atlas.strings.dataCredit}</span>
        <span>
          {atlas.strings.influenceSummary(atlas.kindCounts.influences, atlas.kindCounts.refutes)}
        </span>
      </footer>
    </div>
  </div>
</aside>

<style>
  .intro-panel {
    background: var(--sheet);
  }

  .sheet-handle {
    display: none;
  }

  .panel-head {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 10px 22px;
    border-bottom: 1px solid var(--rule);
  }

  .panel-head .micro {
    color: var(--ink-faint);
  }

  .icon-btn {
    display: grid;
    width: 30px;
    height: 30px;
    color: var(--ink-soft);
    place-items: center;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .icon-btn:hover {
    color: var(--ink);
    background: var(--sheet-deep);
  }

  .intro {
    padding: 20px 24px 26px;
  }

  .kicker {
    margin: 0 0 8px;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    color: var(--seal);
  }

  h1 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    line-height: 1.48;
    letter-spacing: 0.005em;
    color: var(--ink);
    white-space: pre-line;
  }

  .lede {
    margin: 12px 0 0;
    font-size: 13.5px;
    line-height: 1.85;
    color: var(--ink-soft);
    text-align: justify;
  }

  .numbers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 18px;
    padding: 12px 0;
    border-bottom: 1px solid var(--ink);
  }

  .numbers div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .numbers b {
    font-family: var(--font-latin);
    font-size: 26px;
    font-style: italic;
    font-weight: 500;
    line-height: 1.05;
    color: var(--ink);
  }

  .numbers span {
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
  }

  section {
    margin-top: 22px;
  }

  h2 {
    display: flex;
    gap: 10px;
    align-items: baseline;
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--ink);
  }

  h2 em {
    font-family: var(--font-latin);
    font-size: 11.5px;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
  }

  .legend-row {
    display: grid;
    grid-template-columns: 22px 1fr 34px 28px;
    gap: 10px;
    align-items: center;
    width: 100%;
    padding: 9px 0;
    text-align: left;
    border-bottom: 1px solid color-mix(in srgb, var(--rule) 70%, transparent);
    transition: opacity 0.15s ease;
  }

  .legend-row.muted {
    opacity: 0.5;
  }

  .legend-row.muted .legend-name {
    text-decoration: line-through;
  }

  .glyph {
    display: grid;
    width: 22px;
    height: 22px;
    font-family: var(--font-serif);
    font-size: 12px;
    line-height: 1;
    place-items: center;
    border: 1px solid;
    border-radius: 3px;
  }

  .legend-body {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .legend-name {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
  }

  .legend-plain {
    font-size: 12px;
    line-height: 1.45;
    color: var(--ink-faint);
  }

  .line-sample {
    display: block;
    flex: none;
  }

  .legend-count {
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
    text-align: right;
  }

  .hub-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .hub {
    display: flex;
    gap: 7px;
    align-items: center;
    padding: 9px 10px;
    text-align: left;
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: 0;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .hub:hover {
    background: var(--sheet-deep);
    border-color: var(--ink-faint);
  }

  .hub-dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .hub-body {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .hub-name {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink);
  }

  .hub-count {
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.04em;
    color: var(--ink-faint);
  }

  .actions {
    display: flex;
    gap: 8px;
    margin-top: 22px;
  }

  .primary,
  .secondary {
    display: flex;
    flex: 1;
    gap: 7px;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 0.05em;
    border: 1px solid var(--ink);
    border-radius: 0;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .primary {
    color: var(--sheet);
    background: var(--ink);
  }

  .primary:hover {
    color: var(--sheet);
    background: var(--seal);
    border-color: var(--seal);
  }

  .secondary {
    color: var(--ink);
    background: transparent;
  }

  .secondary:hover {
    background: var(--sheet-deep);
  }

  .hint {
    margin: 18px 0 0;
    font-family: var(--font-sans);
    font-size: 9.5px;
    line-height: 1.7;
    letter-spacing: 0.04em;
    color: var(--ink-faint);
  }

  .colophon {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 10px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.03em;
    color: var(--ink-faint);
    border-top: 1px solid var(--rule);
  }

  @media (max-width: 959px) {
    .intro-panel {
      transition: height 0.24s var(--ease), max-height 0.24s var(--ease);
    }

    .intro-panel[data-detent='minimized'] {
      height: 62px;
      max-height: 62px;
    }

    .intro-panel[data-detent='half'] {
      height: 36vh;
      max-height: 36vh;
    }

    .intro-panel[data-detent='expanded'] {
      height: 80vh;
      max-height: 80vh;
    }

    .sheet-handle {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 10px 0 4px;
    }

    .sheet-handle-bar {
      width: 34px;
      height: 3.5px;
      background: var(--rule);
      border-radius: 999px;
    }

    .panel-head {
      padding: 2px 12px 8px 22px;
    }

    .intro {
      padding: 16px 20px 24px;
    }

    h1 {
      font-size: 26px;
      line-height: 1.44;
    }
  }
</style>
