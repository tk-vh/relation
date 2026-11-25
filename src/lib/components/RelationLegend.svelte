<script lang="ts">
  import { RELATION_KINDS, RELATION_STYLE } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { relationColor } from '../theme';
</script>

<div class="legend" aria-label={atlas.strings.relationsLabel}>
  <span class="legend-label micro">{atlas.strings.relationsLabel}</span>
  {#each RELATION_KINDS as kind (kind)}
    {@const off = atlas.hiddenKinds.has(kind)}
    <button
      type="button"
      class="item"
      class:off
      aria-pressed={!off}
      onclick={() => atlas.toggleKind(kind)}
      title={atlas.strings.relationPlain(kind)}
    >
      <span class="glyph" style={`color:${relationColor(kind, atlas.themeMode)}`}>
        {RELATION_STYLE[kind].glyph}
      </span>
      <span class="label">{atlas.strings.relationLabel(kind)}</span>
      <span class="count">{atlas.kindCounts[kind] ?? 0}</span>
    </button>
  {/each}
  <span class="spacer"></span>
  <span class="hint">{atlas.strings.arrowHint}</span>
  <span class="total">{atlas.strings.total(atlas.totals.thinkers, atlas.totals.relations)}</span>
</div>

<style>
  .legend {
    position: fixed;
    bottom: 18px;
    right: var(--panel-clearance);
    left: 72px;
    z-index: 20;
    display: flex;
    gap: 2px;
    align-items: center;
    pointer-events: auto;
  }

  .legend-label {
    margin-right: 7px;
    font-size: 9px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  .item {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 5px 8px;
    font-family: var(--font-sans);
    font-size: 10px;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    transition: color 0.15s ease, opacity 0.15s ease, background 0.15s ease;
  }

  .item:hover {
    color: var(--canvas-ink);
    background: color-mix(in srgb, var(--canvas-ink) 5%, transparent);
  }

  .item.off {
    color: var(--canvas-ink-faint);
    opacity: 0.6;
  }

  .item.off .label {
    text-decoration: line-through;
  }

  .glyph {
    font-family: var(--font-serif);
    font-size: 11px;
    line-height: 1;
  }

  .count {
    font-family: var(--font-latin);
    font-size: 10px;
    font-style: italic;
    color: var(--canvas-ink-faint);
  }

  .spacer {
    flex: 1;
  }

  .hint {
    font-family: var(--font-sans);
    font-size: 9.5px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  .total {
    display: none;
    padding-left: 12px;
    margin-left: 12px;
    font-family: var(--font-serif);
    font-size: 10px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
    border-left: 1px solid var(--rule);
  }

  @media (min-width: 1500px) {
    .total {
      display: inline;
    }
  }

  @media (max-width: 1200px) {
    .hint {
      display: none;
    }
  }

  @media (max-width: 959px) {
    .legend {
      display: none;
    }
  }
</style>
