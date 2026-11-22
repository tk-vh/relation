<script lang="ts">
  import graph from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';

  const counts = new Map<string, number>();
  for (const person of graph.thinkers) {
    counts.set(person.era, (counts.get(person.era) ?? 0) + 1);
  }

  const short: Record<string, string> = {
    前苏格拉底: '前苏',
    古典希腊: '古典',
    希腊化与罗马: '希腊化',
    东方: '东方',
    中世纪: '中世',
    文艺复兴与早期近代: '文艺复兴',
    启蒙运动: '启蒙',
    德国唯心主义: '德国唯心',
    '19世纪': '19世纪',
    现象学与存在主义: '现象学',
    分析哲学: '分析',
    政治与保守主义: '政治',
    批判理论与战后: '批判',
    后结构主义: '后结构',
  };
</script>

<div class="era-filter" aria-label="按时代筛选">
  <div class="scroll">
    <span class="filter-label micro">时代</span>
    {#each graph.eras as era, index (era)}
      {@const visible = atlas.isEraVisible(era)}
      <button
        type="button"
        class="chip"
        class:off={!visible}
        aria-pressed={visible}
        onclick={() => atlas.toggleEra(era)}
        title={visible ? `隐藏${era}` : `显示${era}`}
      >
        <span class="dot" style={`background:${eraColor(index)}`}></span>
        <span class="name">{short[era] ?? era}</span>
        <span class="count">{counts.get(era) ?? 0}</span>
      </button>
    {/each}
  </div>
  {#if atlas.hasFilters}
    <button type="button" class="reset" onclick={() => atlas.resetFilters()}>全部</button>
  {/if}
</div>

<style>
  .era-filter {
    position: fixed;
    top: 74px;
    right: 436px;
    left: 28px;
    z-index: 20;
    display: flex;
    gap: 8px;
    align-items: center;
    pointer-events: none;
  }

  .scroll {
    display: flex;
    flex: 1;
    gap: 0;
    align-items: center;
    overflow-x: auto;
    pointer-events: auto;
    scrollbar-width: none;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .filter-label {
    flex: none;
    padding-right: 10px;
    font-size: 8px;
    color: #625b51;
  }

  .chip {
    display: flex;
    flex: none;
    gap: 6px;
    align-items: center;
    padding: 5px 9px 5px 0;
    margin-right: 7px;
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 0.03em;
    color: #cfc7b9;
    white-space: nowrap;
    border-bottom: 1px solid transparent;
    transition: color 0.15s ease, opacity 0.15s ease;
  }

  .chip:hover {
    color: #f6f1e7;
    border-bottom-color: rgba(236, 230, 216, 0.35);
  }

  .chip.off {
    color: #6c655b;
    opacity: 0.55;
  }

  .chip.off .dot {
    background: transparent !important;
    border: 1px solid #6c655b;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    transition: background 0.15s ease;
  }

  .count {
    font-family: var(--font-latin);
    font-size: 10px;
    font-style: italic;
    color: #7e766a;
  }

  .chip.off .count {
    color: #5c564e;
  }

  .reset {
    flex: none;
    padding: 5px 9px;
    pointer-events: auto;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.06em;
    color: #cfc7b9;
    border: 1px solid rgba(236, 230, 216, 0.24);
  }

  .reset:hover {
    color: #16130f;
    background: #ece6d8;
  }

  @media (max-width: 1180px) {
    .count {
      display: none;
    }
  }

  @media (max-width: 900px) {
    .era-filter {
      top: 58px;
      right: 8px;
      left: 8px;
    }

    .chip {
      padding-right: 8px;
      font-size: 9.5px;
    }

    .filter-label {
      display: none;
    }

    .chip:first-child {
      padding-left: 4px;
    }

    .scroll {
      mask-image: linear-gradient(90deg, #000 88%, transparent);
    }
  }
</style>
