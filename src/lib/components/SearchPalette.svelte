<script lang="ts">
  import { tick } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import graph, { type Thinker } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';
  import Icon from './Icon.svelte';

  let input = $state<HTMLInputElement>();
  let dialog = $state<HTMLDivElement>();
  let query = $state('');
  let active = $state(0);

  const hubs = graph.thinkers
    .slice()
    .sort((a, b) => (graph.descendants.get(b.id) ?? 0) - (graph.descendants.get(a.id) ?? 0))
    .slice(0, 7);

  let results = $derived<Thinker[]>(query.trim() ? graph.search(query, 14) : hubs);

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
      aria-label="搜索思想家"
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
          placeholder="搜索人名、学派、命题"
          aria-label="搜索人名、学派、命题"
          autocomplete="off"
          spellcheck="false"
        />
        {#if query}
          <button type="button" class="clear" onclick={() => (query = '')} aria-label="清空">
            <Icon name="close" size={13} />
          </button>
        {/if}
        <button
          type="button"
          class="search-close"
          onclick={() => atlas.closeSearch()}
          aria-label="关闭搜索"
        >
          关闭
        </button>
      </div>

      <div class="results">
        <p class="micro heading" aria-live="polite">{query ? `找到 ${results.length} 位` : '思想的枢纽'}</p>
        {#if results.length}
          {#each results as person, index (person.id)}
            <button
              type="button"
              class="result"
              class:active={index === active}
              onmouseenter={() => (active = index)}
              onclick={() => choose(person)}
            >
              <span class="dot" style={`background:${eraColor(person.eraIndex)}`}></span>
              <span class="names">
                <span class="name">{person.name}</span>
                <span class="en">{person.nameEn}</span>
              </span>
              <span class="meta">
                <span>{person.era}</span>
                <span class="school">{person.schools}</span>
              </span>
              <span class="count">{graph.degree.get(person.id) ?? 0} 条线索</span>
            </button>
          {/each}
        {:else}
          <div class="empty">
            <p>没有找到「{query}」。</p>
            <p class="sub">试试中文名、英文名或学派。</p>
          </div>
        {/if}
      </div>

      <div class="foot">
        <span>↑↓ 选择</span>
        <span>↵ 打开</span>
        <span>ESC 关闭</span>
        <span class="foot-note">{graph.thinkers.length} 位思想家 · {graph.eras.length} 个时代</span>
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
    padding-top: min(16vh, 150px);
    background: rgba(10, 8, 6, 0.68);
    backdrop-filter: blur(3px);
  }

  .dialog {
    width: min(640px, calc(100vw - 32px));
    overflow: hidden;
    color: var(--ink);
    background: var(--paper);
    border: 1px solid rgba(28, 25, 23, 0.2);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
  }

  .input-row {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 16px 18px;
    border-bottom: 1px solid var(--rule);
  }

  .glass {
    color: var(--ink-faint);
  }

  input {
    flex: 1;
    min-width: 0;
    font-family: var(--font-serif);
    font-size: 19px;
    color: var(--ink);
    background: none;
    border: 0;
    outline: none;
  }

  input::placeholder {
    color: var(--ink-faint);
  }

  .clear {
    display: grid;
    width: 26px;
    height: 26px;
    color: var(--ink-faint);
    place-items: center;
  }

  .search-close {
    padding: 4px 2px 4px 10px;
    margin-left: -2px;
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
    border-left: 1px solid var(--rule);
  }

  .clear:hover,
  .search-close:hover {
    color: var(--ink);
  }

  .results {
    max-height: min(52vh, 440px);
    overflow-y: auto;
    padding: 8px;
  }

  .heading {
    margin: 8px 10px 6px;
    color: var(--ink-faint);
  }

  .result {
    display: flex;
    gap: 12px;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    text-align: left;
  }

  .result.active {
    background: var(--paper-deep);
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
    font-size: 10px;
    color: var(--ink-soft);
    white-space: nowrap;
  }

  .school {
    color: var(--ink-faint);
  }

  .count {
    display: none;
    width: 62px;
    font-family: var(--font-sans);
    font-size: 9px;
    color: var(--ink-faint);
    text-align: right;
  }

  .empty {
    padding: 28px 18px 34px;
  }

  .empty p {
    margin: 0;
    font-size: 15px;
  }

  .empty .sub {
    margin-top: 4px;
    font-size: 12.5px;
    color: var(--ink-faint);
  }

  .foot {
    display: flex;
    gap: 16px;
    padding: 10px 18px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.04em;
    color: var(--ink-faint);
    border-top: 1px solid var(--rule);
  }

  .foot-note {
    margin-left: auto;
  }

  @media (min-width: 1100px) {
    .count {
      display: block;
    }
  }

  @media (max-width: 640px) {
    .scrim {
      align-items: stretch;
      padding-top: 0;
      background: var(--paper);
      backdrop-filter: none;
    }

    .dialog {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border: 0;
      box-shadow: none;
    }

    .results {
      flex: 1;
      max-height: none;
    }

    .foot {
      margin-top: auto;
      padding-bottom: calc(10px + env(safe-area-inset-bottom));
    }

    .meta {
      display: none;
    }
  }
</style>
