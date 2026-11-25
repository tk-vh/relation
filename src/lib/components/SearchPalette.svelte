<script lang="ts">
  import { tick } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import type { Thinker } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';
  import Icon from './Icon.svelte';

  let input = $state<HTMLInputElement>();
  let dialog = $state<HTMLDivElement>();
  let query = $state('');
  let active = $state(0);

  let results = $derived<Thinker[]>(
    query.trim() ? atlas.graph.search(query, 16) : atlas.graph.hubs.slice(0, 8),
  );

  $effect(() => {
    if (!atlas.searchOpen) return;
    query = '';
    active = 0;
    tick().then(() => input?.focus());
  });

  function choose(person: Thinker) {
    atlas.closeSearch();
    atlas.jumpTo(person.id);
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      active = Math.min(results.length - 1, active + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      active = Math.max(0, active - 1);
    } else if (event.key === 'Enter') {
      const person = results[active];
      if (person) choose(person);
    } else if (event.key === 'Escape') {
      atlas.closeSearch();
    }
  }

  function backdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) atlas.closeSearch();
  }

  function trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !dialog) return;
    const focusable = [...dialog.querySelectorAll<HTMLElement>('button, input, a[href]')].filter(
      (element) => !element.hasAttribute('disabled') && element.offsetParent !== null,
    );
    if (!focusable.length) return;
    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
</script>

{#if atlas.searchOpen}
  <div
    class="scrim"
    role="presentation"
    onclick={backdrop}
    transition:fade={{ duration: 160 }}
  >
    <div
      class="dialog"
      bind:this={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={atlas.strings.search}
      tabindex="-1"
      onkeydown={trapFocus}
      transition:scale={{ duration: 180, start: 0.985 }}
    >
      <div class="input-row">
        <span class="glass"><Icon name="search" size={18} /></span>
        <input
          bind:this={input}
          bind:value={query}
          oninput={() => (active = 0)}
          onkeydown={onKey}
          placeholder={atlas.strings.searchPlaceholder}
          aria-label={atlas.strings.searchPlaceholder}
          autocomplete="off"
          spellcheck="false"
        />
        {#if query}
          <button
            type="button"
            class="clear"
            onclick={() => {
              query = '';
              active = 0;
              input?.focus();
            }}
            aria-label={atlas.strings.close}
          >
            <Icon name="close" size={13} />
          </button>
        {/if}
        <button
          type="button"
          class="search-close"
          onclick={() => atlas.closeSearch()}
          aria-label={atlas.strings.close}
        >
          {atlas.strings.close}
        </button>
      </div>

      <div class="results">
        <p class="micro heading" aria-live="polite">
          {query.trim() ? atlas.strings.found(results.length) : atlas.strings.hubs}
        </p>
        {#if results.length}
          {#each results as person, index (person.id)}
            <button
              type="button"
              class="result"
              class:active={index === active}
              onmouseenter={() => (active = index)}
              onclick={() => choose(person)}
            >
              <span
                class="dot"
                style={`background:${eraColor(person.eraIndex, atlas.themeMode)}`}
              ></span>
              <span class="names">
                <span class="name">{person.name}</span>
                {#if person.nameEn}
                  <span class="en">{person.nameEn}</span>
                {/if}
              </span>
              <span class="meta">
                <span class="era">{person.era}</span>
                {#if person.schools}
                  <span class="school">{person.schools}</span>
                {/if}
              </span>
              <span class="count">
                {atlas.strings.clueCount(atlas.graph.degree.get(person.id) ?? 0)}
              </span>
            </button>
          {/each}
        {:else}
          <div class="empty">
            <p>{atlas.strings.noResults(query)}</p>
            <p class="sub">{atlas.strings.searchEmptyHint}</p>
          </div>
        {/if}
      </div>

      <div class="foot">
        <span>{atlas.strings.searchFooter(atlas.totals.thinkers, atlas.totals.eras)}</span>
        <span class="foot-note">{atlas.strings.tapResult}</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 104px 16px 16px;
    background: color-mix(in srgb, var(--canvas-deep) 72%, transparent);
    backdrop-filter: blur(3px);
  }

  .dialog {
    display: flex;
    flex-direction: column;
    width: min(640px, 100%);
    max-height: calc(100vh - 136px);
    overflow: hidden;
    color: var(--ink);
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: 4px;
    box-shadow: var(--panel-shadow);
  }

  .input-row {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid var(--rule);
  }

  .glass {
    display: flex;
    color: var(--ink-faint);
  }

  input {
    flex: 1;
    min-width: 0;
    font-family: var(--font-serif);
    font-size: 18px;
    color: var(--ink);
    background: none;
    border: 0;
    outline: none;
    caret-color: var(--seal);
  }

  input::placeholder {
    color: var(--ink-faint);
  }

  .clear {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    color: var(--ink-soft);
  }

  .search-close {
    padding: 4px 2px 4px 10px;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    border-left: 1px solid var(--rule);
  }

  .clear:hover,
  .search-close:hover {
    color: var(--ink);
  }

  .results {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 8px 10px;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thumb) transparent;
  }

  .heading {
    margin: 6px 10px;
    color: var(--ink-faint);
  }

  .result {
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    text-align: left;
    border-radius: 2px;
    transition: background 0.12s ease;
  }

  .result.active {
    background: var(--sheet-deep);
  }

  .dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .names {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    font-family: var(--font-serif);
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
  }

  .en {
    font-family: var(--font-latin);
    font-size: 12.5px;
    font-style: italic;
    color: var(--ink-faint);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: var(--font-sans);
    white-space: nowrap;
  }

  .era {
    font-size: 10.5px;
    color: var(--ink-soft);
  }

  .school {
    font-size: 9.5px;
    color: var(--ink-faint);
  }

  .count {
    width: 64px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    color: var(--ink-faint);
    text-align: right;
    white-space: nowrap;
  }

  .empty {
    padding: 26px 14px;
  }

  .empty p {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 15px;
    color: var(--ink);
  }

  .empty .sub {
    margin-top: 4px;
    font-size: 12.5px;
    color: var(--ink-faint);
  }

  .foot {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 10px 18px;
    font-family: var(--font-sans);
    font-size: 10px;
    color: var(--ink-faint);
    border-top: 1px solid var(--rule);
  }

  .foot-note {
    margin-left: auto;
  }

  @media (max-width: 959px) {
    .scrim {
      align-items: stretch;
      padding: 0;
      background: var(--sheet);
      backdrop-filter: none;
    }

    .dialog {
      width: 100%;
      height: 100%;
      max-height: none;
      border: 0;
      border-radius: 0;
      box-shadow: none;
    }

    .school,
    .count {
      display: none;
    }

    .foot {
      padding-bottom: calc(10px + env(safe-area-inset-bottom));
    }
  }
</style>
