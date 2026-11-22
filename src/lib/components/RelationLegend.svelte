<script lang="ts">
  import graph, { RELATION_META, type RelationKind } from '../graph/model';
  import { atlas } from '../state.svelte';

  const kinds = Object.entries(RELATION_META) as [
    RelationKind,
    (typeof RELATION_META)[RelationKind],
  ][];
</script>

<div class="legend" aria-label="按关系类型筛选">
  <span class="legend-label micro">关系</span>
  {#each kinds as [kind, meta]}
    <button
      type="button"
      class="item"
      class:off={atlas.hiddenKinds.has(kind)}
      aria-pressed={!atlas.hiddenKinds.has(kind)}
      onclick={() => atlas.toggleKind(kind)}
      title={`${meta.plain}，点击${atlas.hiddenKinds.has(kind) ? '显示' : '隐藏'}`}
    >
      <span class="glyph" style={`color:${meta.color}`}>{meta.glyph}</span>
      <span>{meta.label}</span>
      <span class="count">{atlas.kindCounts[kind]}</span>
    </button>
  {/each}
  <span class="hint">箭头指向被依赖的思想家</span>
  <span class="total">{graph.thinkers.length} 位 · {graph.relations.length} 条</span>
</div>

<style>
  .legend {
    position: fixed;
    bottom: 18px;
    right: 436px;
    left: 72px;
    z-index: 20;
    display: flex;
    gap: 4px;
    align-items: center;
    pointer-events: auto;
  }

  .legend-label {
    margin-right: 7px;
    font-size: 8.5px;
    color: #6e665b;
  }

  .item {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 5px 8px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.03em;
    color: #b6ad9f;
    transition: color 0.15s ease, opacity 0.15s ease;
  }

  .item:hover {
    color: #f6f1e7;
    background: rgba(236, 230, 216, 0.06);
  }

  .item.off {
    color: #5f594f;
    text-decoration: line-through;
    opacity: 0.7;
  }

  .glyph {
    font-size: 11px;
    line-height: 1;
  }

  .count {
    font-family: var(--font-latin);
    font-size: 9.5px;
    font-style: italic;
    color: #6e665b;
  }

  .hint {
    margin-left: auto;
    font-family: var(--font-sans);
    font-size: 9px;
    letter-spacing: 0.05em;
    color: #625b51;
  }

  .total {
    padding-left: 12px;
    margin-left: 4px;
    font-family: var(--font-serif);
    font-size: 9.5px;
    color: #6e665b;
    border-left: 1px solid rgba(236, 230, 216, 0.12);
  }

  @media (max-width: 1100px) {
    .hint {
      display: none;
    }
  }

  @media (max-width: 900px) {
    .legend {
      display: none;
    }
  }
</style>
