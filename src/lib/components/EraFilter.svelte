<script lang="ts">
  import { onMount } from 'svelte';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';

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
    scroller.scrollBy({ left: direction * 240, behavior: 'smooth' });
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

<div class="era-filter" aria-label={atlas.strings.eraLabel}>
  <div class="rail">
    {#if canScrollLeft}
      <button
        type="button"
        class="scroll-btn left"
        onclick={() => nudge(-1)}
        aria-label={atlas.language === 'zh' ? '向左滚动时代' : 'Scroll eras left'}
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
      <span class="filter-label micro">{atlas.strings.eraLabel}</span>
      {#each atlas.graph.eras as era, index (index)}
        {@const visible = atlas.isEraVisible(index)}
        <button
          type="button"
          class="chip"
          class:off={!visible}
          aria-pressed={visible}
          onclick={() => atlas.toggleEra(index)}
          title={era}
        >
          <span
            class="dot"
            style={visible ? `background:${eraColor(index, atlas.themeMode)}` : undefined}
          ></span>
          <span class="name">{atlas.strings.eraShort(index)}</span>
          <span class="count">{atlas.graph.eraCounts[index] ?? 0}</span>
        </button>
      {/each}
    </div>

    {#if canScrollRight}
      <button
        type="button"
        class="scroll-btn right"
        onclick={() => nudge(1)}
        aria-label={atlas.language === 'zh' ? '向右滚动时代' : 'Scroll eras right'}
      >
        ›
      </button>
    {/if}
  </div>

  <div class="controls">
    <button
      type="button"
      class="era-switch"
      role="switch"
      aria-checked={atlas.anyEraVisible}
      aria-label={atlas.strings.eraLabel}
      onclick={() => atlas.toggleAllEras()}
    >
      <span class="track" class:on={atlas.anyEraVisible}>
        <span class="thumb"></span>
      </span>
    </button>
  </div>
</div>

<style>
  .era-filter {
    position: fixed;
    top: 62px;
    right: var(--panel-clearance);
    left: 0;
    z-index: 20;
    display: flex;
    gap: 4px;
    align-items: center;
    pointer-events: none;
  }

  .rail {
    position: relative;
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
    pointer-events: auto;
  }

  .scroll {
    display: flex;
    flex: 1;
    min-width: 0;
    gap: 0;
    align-items: center;
    padding-left: 28px;
    padding-right: 12px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .scroll.fade-left {
    mask-image: linear-gradient(90deg, transparent, #000 32px);
  }

  .scroll.fade-right {
    mask-image: linear-gradient(90deg, #000 calc(100% - 32px), transparent);
  }

  .scroll.fade-left.fade-right {
    mask-image: linear-gradient(90deg, transparent, #000 32px, #000 calc(100% - 32px), transparent);
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    font-family: var(--font-sans);
    font-size: 16px;
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
    left: 6px;
  }

  .scroll-btn.right {
    right: 2px;
  }

  .filter-label {
    flex: none;
    padding-right: 10px;
    font-size: 8.5px;
    color: var(--canvas-ink-faint);
  }

  .chip {
    display: flex;
    flex: none;
    gap: 5px;
    align-items: center;
    padding: 6px 9px;
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    transition: color 0.15s ease, opacity 0.15s ease;
  }

  .chip:hover {
    color: var(--canvas-ink);
  }

  .chip.off {
    color: var(--canvas-ink-faint);
    opacity: 0.45;
  }

  .dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transition: background 0.15s ease, border-color 0.15s ease;
  }

  .chip.off .dot {
    background: transparent;
    border: 1px solid var(--canvas-ink-faint);
  }

  .count {
    font-family: var(--font-latin);
    font-size: 10px;
    font-style: italic;
    color: var(--canvas-ink-faint);
  }

  .controls {
    display: flex;
    flex: none;
    gap: 6px;
    align-items: center;
    padding-right: 28px;
    pointer-events: auto;
  }

  .era-switch {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
  }

  .track {
    position: relative;
    display: block;
    width: 26px;
    height: 14px;
    background: var(--rule);
    border-radius: 999px;
    transition: background 0.14s ease;
  }

  .track.on {
    background: var(--seal);
  }

  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    background: var(--canvas-ink-faint);
    border-radius: 50%;
    transition: transform 0.14s ease, background 0.14s ease;
  }

  .track.on .thumb {
    background: #ffffff;
    transform: translateX(12px);
  }

  @media (max-width: 959px) {
    .era-filter {
      top: calc(50px + env(safe-area-inset-top));
      right: 0;
      padding: 2px 0;
      background: color-mix(in srgb, var(--canvas) 82%, transparent);
      backdrop-filter: blur(6px);
    }

    .scroll {
      padding-left: 10px;
    }

    .scroll-btn {
      display: none;
    }

    .filter-label,
    .count {
      display: none;
    }

    .chip {
      padding: 7px 10px;
      font-size: 11.5px;
    }

    .controls {
      padding-right: 10px;
    }

    .era-switch {
      width: 36px;
      height: 36px;
    }
  }
</style>
