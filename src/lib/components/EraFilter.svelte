<script lang="ts">
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';
</script>

<div class="era-filter" aria-label={atlas.strings.eraLabel}>
  <div class="scroll">
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

  <div class="controls">
    {#if atlas.hasFilters}
      <button type="button" class="reset" onclick={() => atlas.resetFilters()}>
        {atlas.language === 'zh' ? '全部' : 'All'}
      </button>
    {/if}

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
    right: 436px;
    left: 0;
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
    padding-left: 28px;
    padding-right: 8px;
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

  .reset {
    padding: 4px 8px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.05em;
    color: var(--canvas-ink-soft);
    border: 1px solid var(--rule);
    transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }

  .reset:hover {
    color: var(--canvas-ink);
    border-color: var(--canvas-ink-faint);
    background: color-mix(in srgb, var(--canvas-ink) 6%, transparent);
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
      top: 50px;
      right: 0;
    }

    .scroll {
      padding-left: 10px;
      mask-image: linear-gradient(90deg, #000 90%, transparent);
    }

    .filter-label,
    .count {
      display: none;
    }

    .chip {
      padding: 6px 8px;
      font-size: 10.5px;
    }

    .controls {
      padding-right: 10px;
    }
  }
</style>
