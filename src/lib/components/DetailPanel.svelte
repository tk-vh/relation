<script lang="ts">
  import graph from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';
  import Icon from './Icon.svelte';
  import RelationList from './RelationList.svelte';
  import TracePanel from './TracePanel.svelte';

  const person = $derived(atlas.selected);
  let scroller = $state<HTMLDivElement>();

  $effect(() => {
    const id = person?.id;
    if (!id || !scroller) return;
    scroller.scrollTop = 0;
  });

  const outgoing = $derived(person ? (graph.outgoing.get(person.id) ?? []) : []);
  const incoming = $derived(person ? (graph.incoming.get(person.id) ?? []) : []);
  const primaryBook = $derived(person?.books[0] ?? null);

  const lifespan = $derived(
    person
      ? [person.born, person.died]
          .filter((value) => value && value !== '不详' && value !== '—')
          .join(' — ')
      : '',
  );

  const folio = $derived(person ? `第 ${String(person.eraIndex + 1).padStart(2, '0')} 章` : '');

  function formatYear(year: number): string {
    return year < 0 ? `前 ${-year} 年` : `${year} 年`;
  }
</script>

{#if atlas.pathMode}
  <TracePanel />
{:else if person}
  <aside class="panel" aria-label={`${person.name}的思想档案`}>
    <div class="panel-head">
      <span class="era" style={`--era:${eraColor(person.eraIndex)}`}>
        <span class="era-dot"></span>
        {person.era}
      </span>
      <div class="head-actions">
        <button
          type="button"
          class="icon-btn"
          onclick={() => atlas.select(atlas.random().id)}
          title="随机一位"
          aria-label="随机一位"
        >
          <Icon name="reset" size={14} />
        </button>
        <button type="button" class="icon-btn" onclick={() => atlas.clearSelection()} aria-label="关闭">
          <Icon name="close" size={15} />
        </button>
      </div>
    </div>

    <div class="panel-scroll" bind:this={scroller}>
      <article class="sheet">
        <header class="cover">
          <p class="folio micro">{folio} <span class="folio-sep">·</span> {lifespan}</p>
          <h1>{person.name}</h1>
          <p class="name-en">{person.nameEn}</p>

          <dl class="meta">
            <div>
              <dt>学派</dt>
              <dd>{person.schools}</dd>
            </div>
            <div>
              <dt>出生地</dt>
              <dd>{person.birthplace}</dd>
            </div>
            <div>
              <dt>国籍</dt>
              <dd>{person.nationality}</dd>
            </div>
          </dl>

          <div class="ledger-line">
            <span>依赖 <b>{outgoing.length}</b></span>
            <span class="ledger-rule"></span>
            <span>被依赖 <b>{incoming.length}</b></span>
            <button type="button" class="trace-link" onclick={() => atlas.beginTrace()}>
              <Icon name="trace" size={13} /> 追溯世系
            </button>
          </div>
        </header>

        <p class="bio">{person.bio}</p>

        <section class="relations-section">
          <h2><span>思想来源</span><em>TA 所依赖的 · {outgoing.length}</em></h2>
          <RelationList relations={outgoing} direction="out" subject={person} />
        </section>

        <section class="relations-section">
          <h2><span>思想去向</span><em>依赖 TA 的 · {incoming.length}</em></h2>
          <RelationList relations={incoming} direction="in" subject={person} />
        </section>

        {#if person.ideas.length}
          <section class="ideas">
            <h2><span>核心命题</span><em>KEY IDEAS</em></h2>
            <ol>
              {#each person.ideas as idea, index}
                <li>
                  <span class="num">{String(index + 1).padStart(2, '0')}</span>
                  <span>{idea}</span>
                </li>
              {/each}
            </ol>
          </section>
        {/if}

        {#if primaryBook}
          <section class="works">
            <h2><span>代表作</span><em>SELECTED WORK</em></h2>
            <div class="work">
              <div class="work-line">
                <span class="work-title">{primaryBook.title}</span>
                <span class="work-year">{formatYear(primaryBook.year)}</span>
              </div>
              <p class="work-note">{primaryBook.note}</p>
              <p class="work-en">{primaryBook.titleEn}</p>
            </div>
          </section>
        {/if}

        {#if person.quote}
          <blockquote>
            <span class="quote-mark">「</span>
            {person.quote}
            <span class="quote-mark">」</span>
          </blockquote>
        {/if}

        <section class="start">
          <h2><span>从何读起</span><em>WHERE TO BEGIN</em></h2>
          <p>{person.start}</p>
        </section>

        <footer class="colophon">
          <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(person.wiki)}`} target="_blank" rel="noreferrer">
            维基百科 <span>↗</span>
          </a>
          <span>{person.nameEn}</span>
        </footer>
      </article>
    </div>

    <div class="panel-foot">
      <span class="micro">关系 · RELATION</span>
      <span class="foot-count">{graph.relations.length} 条线索</span>
    </div>
  </aside>
{/if}

<style>
  .panel-head {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px 12px 24px;
    border-bottom: 1px solid var(--rule);
  }

  .era {
    display: flex;
    gap: 7px;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--ink-soft);
  }

  .era-dot {
    width: 5px;
    height: 5px;
    background: var(--era);
    border-radius: 50%;
  }

  .head-actions {
    display: flex;
    gap: 2px;
  }

  .icon-btn {
    display: grid;
    width: 28px;
    height: 28px;
    color: var(--ink-faint);
    place-items: center;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .icon-btn:hover {
    color: var(--ink);
    background: var(--paper-deep);
  }

  .sheet {
    padding: 22px 26px 30px;
  }

  .cover {
    padding-bottom: 17px;
    border-bottom: 1px solid var(--rule);
  }

  .folio {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 0 0 12px;
    color: var(--ink-faint);
  }

  .folio-sep {
    opacity: 0.5;
  }

  h1 {
    margin: 0;
    font-size: 37px;
    font-weight: 600;
    line-height: 1.18;
    letter-spacing: 0.01em;
    color: var(--ink);
  }

  .name-en {
    margin: 4px 0 0;
    font-family: var(--font-latin);
    font-size: 16px;
    font-style: italic;
    line-height: 1.3;
    color: var(--ink-soft);
  }

  .meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 18px;
    margin: 18px 0 0;
    padding-top: 13px;
    border-top: 1px solid rgba(28, 25, 23, 0.1);
  }

  .meta div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .meta div:last-child {
    grid-column: 1 / -1;
  }

  dt {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--ink-faint);
  }

  dd {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.5;
    color: var(--ink-soft);
  }

  .ledger-line {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 16px;
    font-family: var(--font-sans);
    font-size: 10.5px;
    color: var(--ink-soft);
  }

  .ledger-line b {
    font-family: var(--font-serif);
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
  }

  .ledger-rule {
    width: 18px;
    height: 1px;
    background: var(--rule);
  }

  .trace-link {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 5px 9px;
    margin-left: auto;
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 0.04em;
    color: var(--seal);
    border: 1px solid rgba(179, 70, 46, 0.36);
    transition: background 0.15s ease, color 0.15s ease;
  }

  .trace-link:hover {
    color: var(--paper);
    background: var(--seal);
  }

  .bio {
    margin: 18px 0 0;
    font-size: 14.5px;
    line-height: 1.9;
    color: var(--ink);
    text-align: justify;
  }

  section {
    margin-top: 26px;
  }

  h2 {
    display: flex;
    gap: 10px;
    align-items: baseline;
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--ink);
  }

  h2 em {
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.08em;
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
    grid-template-columns: 28px 1fr;
    gap: 8px;
    padding: 8px 0;
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--ink-soft);
    border-bottom: 1px solid rgba(28, 25, 23, 0.1);
  }

  .ideas .num {
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
  }

  .relations-section h2 {
    margin-bottom: 8px;
    padding-bottom: 7px;
    border-bottom: 2px solid var(--ink);
  }

  .work {
    padding-top: 3px;
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
  }

  .work-year {
    font-family: var(--font-latin);
    font-size: 13px;
    font-style: italic;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .work-note {
    margin: 5px 0 0;
    font-size: 12.5px;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .work-en {
    margin: 3px 0 0;
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
  }

  blockquote {
    position: relative;
    margin: 26px 0 0;
    padding: 18px 20px 19px;
    font-size: 16px;
    line-height: 1.8;
    color: var(--ink);
    background: var(--paper-deep);
    border-left: 2px solid var(--seal);
  }

  .quote-mark {
    font-size: 17px;
    color: var(--seal);
  }

  .start p {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.8;
    color: var(--ink-soft);
  }

  .colophon {
    display: flex;
    justify-content: space-between;
    margin-top: 28px;
    padding-top: 12px;
    font-family: var(--font-sans);
    font-size: 9px;
    letter-spacing: 0.05em;
    color: var(--ink-faint);
    border-top: 1px solid var(--rule);
  }

  .colophon a {
    color: var(--ink-faint);
    text-decoration: none;
  }

  .colophon a:hover {
    color: var(--seal);
  }

  .panel-foot {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    padding: 10px 22px;
    border-top: 1px solid var(--rule);
  }

  .panel-foot .micro {
    font-size: 8.5px;
    color: var(--ink-faint);
  }

  .foot-count {
    font-family: var(--font-serif);
    font-size: 10.5px;
    color: var(--ink-faint);
  }

  @media (max-width: 900px) {
    .sheet {
      padding: 18px 20px 26px;
    }

    h1 {
      font-size: 31px;
    }

    .bio {
      font-size: 14px;
      line-height: 1.85;
    }

    .panel-foot {
      display: none;
    }
  }
</style>
