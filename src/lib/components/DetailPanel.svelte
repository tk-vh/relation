<script lang="ts">
  import { atlas, type SheetDetent } from '../state.svelte';
  import { eraColor } from '../theme';
  import Icon from './Icon.svelte';
  import RelationList from './RelationList.svelte';
  import TracePanel from './TracePanel.svelte';

  const person = $derived(atlas.selected);
  let scroller = $state<HTMLDivElement>();
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    const id = atlas.selectedId;
    copied = false;
    if (copyTimer) {
      clearTimeout(copyTimer);
      copyTimer = null;
    }
    if (!id || !scroller) return;
    scroller.scrollTop = 0;
  });

  $effect(() => {
    return () => {
      if (copyTimer) clearTimeout(copyTimer);
    };
  });

  const outgoing = $derived(person ? (atlas.graph.outgoing.get(person.id) ?? []) : []);
  const incoming = $derived(person ? (atlas.graph.incoming.get(person.id) ?? []) : []);
  const lifespan = $derived(person ? atlas.graph.lifespan(person) : '');

  function cycleDetent() {
    const order: SheetDetent[] = ['minimized', 'half', 'expanded'];
    const next = order[(order.indexOf(atlas.sheetDetent) + 1) % order.length] ?? 'half';
    atlas.setSheetDetent(next);
  }

  async function shareCurrent() {
    if (!person) return;
    const url = `${location.origin}${location.pathname}#/${person.id}`;
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
        copyTimer = null;
      }, 1800);
    } catch {
      copied = false;
    }
  }
</script>

{#if atlas.pathMode}
  <TracePanel />
{:else if person}
  <aside
    class="panel detail-panel"
    data-detent={atlas.sheetDetent}
    aria-label={person.name}
  >
    <button
      type="button"
      class="sheet-handle"
      onclick={cycleDetent}
      aria-label={person.name}
    >
      <span class="sheet-handle-bar" aria-hidden="true"></span>
    </button>

    <div class="panel-head">
      <span class="era" style={`--era:${eraColor(person.eraIndex, atlas.themeMode)}`}>
        <span class="era-dot"></span>
        {person.era}
      </span>
      <div class="head-actions">
        <button
          type="button"
          class="icon-btn"
          onclick={() => atlas.select(atlas.random().id)}
          title={atlas.strings.randomOne}
          aria-label={atlas.strings.randomOne}
        >
          <Icon name="random" size={15} />
        </button>
        <button
          type="button"
          class="icon-btn"
          class:copied
          onclick={shareCurrent}
          title={copied ? atlas.strings.copiedLink : atlas.strings.share}
          aria-label={copied ? atlas.strings.copiedLink : atlas.strings.share}
        >
          <Icon name={copied ? 'check' : 'share'} size={15} />
        </button>
        <button
          type="button"
          class="icon-btn"
          onclick={() => atlas.clearSelection()}
          title={atlas.strings.closeArchive}
          aria-label={atlas.strings.closeArchive}
        >
          <Icon name="close" size={15} />
        </button>
      </div>
    </div>

    <div class="panel-scroll" bind:this={scroller}>
      <article class="sheet">
        <header class="cover">
          <p class="folio micro">{atlas.strings.chapter(person.eraIndex, lifespan)}</p>
          <h1>{person.name}</h1>
          {#if person.nameEn}
            <p class="name-en">{person.nameEn}</p>
          {/if}

          <dl class="meta">
            <div>
              <dt>{atlas.strings.school}</dt>
              <dd>{person.schools || '—'}</dd>
            </div>
            <div>
              <dt>{atlas.strings.birthplace}</dt>
              <dd>{person.birthplace || '—'}</dd>
            </div>
            <div>
              <dt>{atlas.strings.nationality}</dt>
              <dd>{person.nationality || '—'}</dd>
            </div>
          </dl>

          <div class="ledger-line">
            <span>{atlas.strings.dependencies(outgoing.length)}</span>
            <span class="ledger-rule" aria-hidden="true"></span>
            <span>{atlas.strings.dependedOn(incoming.length)}</span>
            <button type="button" class="trace-link" onclick={() => atlas.beginTrace()}>
              <Icon name="trace" size={13} />
              <span>{atlas.strings.traceLineage}</span>
            </button>
          </div>
        </header>

        <p class="bio">{person.bio}</p>

        {#if person.quote}
          <blockquote>{atlas.strings.quote(person.quote)}</blockquote>
        {/if}

        <section class="ruled-section">
          <h2>
            <span>{atlas.strings.sources}</span>
            <em>{atlas.strings.sourcesSub(outgoing.length)}</em>
          </h2>
          <RelationList relations={outgoing} direction="out" subject={person} />
        </section>

        <section class="ruled-section">
          <h2>
            <span>{atlas.strings.legacy}</span>
            <em>{atlas.strings.legacySub(incoming.length)}</em>
          </h2>
          <RelationList relations={incoming} direction="in" subject={person} />
        </section>

        {#if person.ideas.length}
          <section class="ruled-section ideas">
            <h2>
              <span>{atlas.strings.keyIdeas}</span>
              {#if atlas.language === 'zh'}
                <em>KEY IDEAS</em>
              {/if}
            </h2>
            <ol>
              {#each person.ideas as idea, index (index)}
                <li>
                  <span class="num">{String(index + 1).padStart(2, '0')}</span>
                  <span>{idea}</span>
                </li>
              {/each}
            </ol>
          </section>
        {/if}

        <section class="ruled-section works">
          <h2>
            <span>{atlas.strings.selectedWork}</span>
            {#if atlas.language === 'zh'}
              <em>SELECTED WORKS</em>
            {/if}
          </h2>
          {#if person.books.length}
            <div class="book-list">
              {#each person.books as book, index (book.title + index)}
                <div class="work">
                  <div class="work-line">
                    <span class="work-title">{book.title}</span>
                    {#if book.year !== 0}
                      <span class="work-year">{atlas.strings.formatYear(book.year)}</span>
                    {/if}
                  </div>
                  {#if book.titleEn}
                    <p class="work-en">{book.titleEn}</p>
                  {/if}
                  {#if book.note}
                    <p class="work-note">{book.note}</p>
                  {/if}
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-works">{atlas.strings.noWorks}</p>
          {/if}
        </section>

        {#if person.start}
          <section class="ruled-section start">
            <h2>
              <span>{atlas.strings.whereToBegin}</span>
              {#if atlas.language === 'zh'}
                <em>WHERE TO BEGIN</em>
              {/if}
            </h2>
            <p>{person.start}</p>
          </section>
        {/if}

        {#if person.wiki}
          <footer class="colophon">
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(person.wiki)}`}
              target="_blank"
              rel="noreferrer"
            >
              {atlas.strings.wikipedia}
            </a>
            {#if person.nameEn}
              <span class="colophon-en">{person.nameEn}</span>
            {/if}
          </footer>
        {/if}
      </article>
    </div>
  </aside>
{/if}

<style>
  .sheet-handle {
    display: none;
  }

  .panel-head {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    padding: 12px 12px 10px 22px;
    border-bottom: 1px solid var(--rule);
  }

  .era {
    display: flex;
    gap: 8px;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--ink-soft);
  }

  .era-dot {
    width: 6px;
    height: 6px;
    background: var(--era);
    border-radius: 50%;
  }

  .head-actions {
    display: flex;
    gap: 2px;
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

  .icon-btn.copied {
    color: var(--seal);
  }

  .sheet {
    padding: 20px 24px 30px;
  }

  .cover {
    padding-bottom: 18px;
  }

  .folio {
    margin: 0 0 8px;
    color: var(--ink-faint);
  }

  h1 {
    margin: 0;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.22;
    letter-spacing: 0.01em;
    color: var(--ink);
  }

  .name-en {
    margin: 4px 0 0;
    font-family: var(--font-latin);
    font-size: 16px;
    font-style: italic;
    line-height: 1.35;
    color: var(--ink-soft);
  }

  .meta {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px 14px;
    margin: 16px 0 0;
    padding-top: 12px;
    border-top: 1px solid var(--rule);
  }

  .meta div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  dt {
    font-family: var(--font-sans);
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.11em;
    color: var(--ink-faint);
  }

  dd {
    margin: 0;
    font-size: 13px;
    line-height: 1.48;
    color: var(--ink-soft);
    overflow-wrap: anywhere;
  }

  .ledger-line {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-top: 16px;
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--ink-soft);
  }

  .ledger-rule {
    width: 16px;
    height: 1px;
    background: var(--rule);
  }

  .trace-link {
    display: flex;
    gap: 5px;
    align-items: center;
    padding: 5px 10px;
    margin-left: auto;
    font-family: var(--font-sans);
    font-size: 10.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--seal);
    border: 1px solid color-mix(in srgb, var(--seal) 50%, transparent);
    border-radius: 0;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .trace-link:hover {
    color: var(--sheet);
    background: var(--seal);
    border-color: var(--seal);
  }

  .bio {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.82;
    color: var(--ink);
    text-align: justify;
  }

  blockquote {
    margin: 22px 0 0;
    padding: 14px 18px;
    font-size: 15.5px;
    line-height: 1.8;
    color: var(--ink);
    background: var(--sheet-deep);
    border-left: 2.5px solid var(--seal);
  }

  .ruled-section {
    margin-top: 26px;
    padding-top: 10px;
    border-top: 2px solid var(--ink);
  }

  h2 {
    display: flex;
    gap: 10px;
    align-items: baseline;
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.02em;
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

  .ideas ol {
    padding: 0;
    margin: 0;
    list-style: none;
    border-top: 1px solid var(--rule);
  }

  .ideas li {
    display: grid;
    grid-template-columns: 26px 1fr;
    gap: 8px;
    padding: 9px 0;
    font-size: 13.5px;
    line-height: 1.62;
    color: var(--ink-soft);
    border-bottom: 1px solid color-mix(in srgb, var(--rule) 70%, transparent);
  }

  .ideas .num {
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
  }

  .book-list {
    border-top: 1px solid var(--rule);
  }

  .work {
    padding: 11px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--rule) 70%, transparent);
  }

  .work:last-child {
    border-bottom: 0;
  }

  .work-line {
    display: flex;
    gap: 12px;
    align-items: baseline;
    justify-content: space-between;
  }

  .work-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
  }

  .work-year {
    font-family: var(--font-latin);
    font-size: 12.5px;
    font-style: italic;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .work-en {
    margin: 2px 0 0;
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
  }

  .work-note {
    margin: 5px 0 0;
    font-size: 13px;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .no-works {
    margin: 0;
    padding-top: 10px;
    font-size: 13px;
    line-height: 1.7;
    color: var(--ink-soft);
    border-top: 1px solid var(--rule);
  }

  .start p {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .colophon {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    padding-top: 14px;
    font-family: var(--font-sans);
    font-size: 10.5px;
    color: var(--ink-soft);
    border-top: 1px solid var(--rule);
  }

  .colophon a {
    color: var(--ink-soft);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .colophon a:hover {
    color: var(--seal);
  }

  .colophon-en {
    font-family: var(--font-latin);
    font-size: 11px;
    font-style: italic;
    color: var(--ink-faint);
  }

  @media (max-width: 959px) {
    .detail-panel {
      transition: height 0.24s var(--ease), max-height 0.24s var(--ease);
    }

    .detail-panel[data-detent='minimized'] {
      height: 62px;
      max-height: 62px;
    }

    .detail-panel[data-detent='half'] {
      height: 45vh;
      max-height: 45vh;
    }

    .detail-panel[data-detent='expanded'] {
      height: 86vh;
      max-height: 86vh;
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

    .sheet {
      padding: 18px 20px 26px;
    }

    h1 {
      font-size: 32px;
    }

    .bio {
      font-size: 14px;
      line-height: 1.8;
    }
  }
</style>
