<script lang="ts">
  import { onMount } from 'svelte';
  import { RELATION_KINDS, RELATION_STYLE } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { relationColor } from '../theme';

  let scroller = $state<HTMLDivElement>();
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);

  function updateScrollState() {
    if (!scroller) return;
    canScrollLeft = scroller.scrollLeft > 2;
    canScrollRight = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2;
  }

  function onWheel(event: WheelEvent) {
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (delta === 0) return;
    event.preventDefault();
    scroller.scrollLeft += delta;
    updateScrollState();
  }

  function nudge(direction: -1 | 1) {
    if (!scroller) return;
    scroller.scrollBy({ left: direction * 200, behavior: 'smooth' });
  }

  $effect(() => {
    void atlas.language;
    queueMicrotask(updateScrollState);
  });

  onMount(() => {
    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    if (scroller) observer.observe(scroller);
    return () => observer.disconnect();
  });
</script>

<div class="legend" aria-label={atlas.strings.relationsLabel}>
  {#if canScrollLeft}
    <button
      type="button"
      class="scroll-btn left"
      onclick={() => nudge(-1)}
      aria-label={atlas.language === 'zh' ? '向左滚动关系类型' : 'Scroll relations left'}
    >
      ‹
    </button>
  {/if}

  <div
    class="scroll"
    class:fade-left={canScrollLeft}
    class:fade-right={canScrollRight}
    bind:this={scroller}
    onscroll={updateScrollState}
    onwheel={onWheel}
  >
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

  {#if canScrollRight}
    <button
      type="button"
      class="scroll-btn right"
      onclick={() => nudge(1)}
      aria-label={atlas.language === 'zh' ? '向右滚动关系类型' : 'Scroll relations right'}
    >
      ›
    </button>
  {/if}
</div>

<style>
  .legend {
    position: fixed;
    bottom: 18px;
    right: var(--panel-clearance);
    left: 72px;
    z-index: 20;
    display: flex;
    align-items: center;
    min-width: 0;
    pointer-events: auto;
  }

  .scroll {
    display: flex;
    flex: 1;
    min-width: 0;
    gap: 2px;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .scroll.fade-left {
    mask-image: linear-gradient(90deg, transparent, #000 28px);
  }

  .scroll.fade-right {
    mask-image: linear-gradient(90deg, #000 calc(100% - 28px), transparent);
  }

  .scroll.fade-left.fade-right {
    mask-image: linear-gradient(90deg, transparent, #000 28px, #000 calc(100% - 28px), transparent);
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    padding: 0;
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1;
    color: var(--canvas-ink-soft);
    background: color-mix(in srgb, var(--canvas) 88%, transparent);
    border: 1px solid var(--rule);
    border-radius: 999px;
    transform: translateY(-50%);
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .scroll-btn:hover {
    color: var(--canvas-ink);
    border-color: var(--canvas-ink-faint);
    background: var(--canvas-surface);
  }

  .scroll-btn.left {
    left: -4px;
  }

  .scroll-btn.right {
    right: -4px;
  }

  .legend-label {
    flex: none;
    margin-right: 7px;
    font-size: 9px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  .item {
    display: flex;
    flex: none;
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
    min-width: 8px;
  }

  .hint {
    flex: none;
    font-family: var(--font-sans);
    font-size: 9.5px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  .total {
    display: none;
    flex: none;
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
