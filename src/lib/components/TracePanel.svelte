<script lang="ts">
  import { RELATION_STYLE } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor, relationColor, withAlpha } from '../theme';
  import Icon from './Icon.svelte';
  import RelationPhrase from './RelationPhrase.svelte';
  import SheetHandle from './SheetHandle.svelte';

  let query = $state('');
  let scroller = $state<HTMLDivElement>();
  let dragHeight = $state<number | null>(null);

  const from = $derived(atlas.pathFrom ? (atlas.graph.byId.get(atlas.pathFrom) ?? null) : null);
  const to = $derived(atlas.pathTo ? (atlas.graph.byId.get(atlas.pathTo) ?? null) : null);
  const lineage = $derived(atlas.lineage);

  const results = $derived(
    query.trim()
      ? atlas.graph
          .search(query, 8)
          .filter((person) => person.id !== atlas.pathFrom && person.id !== atlas.pathTo)
      : [],
  );

  $effect(() => {
    if (to?.id && scroller) {
      scroller.scrollTop = 0;
    }
  });

  function pick(id: string) {
    query = '';
    atlas.select(id);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && results.length > 0) {
      event.preventDefault();
      pick(results[0]!.id);
    }
  }

  function stepNames(index: number) {
    const step = lineage?.steps[index];
    const first = lineage?.thinkers[index];
    const second = lineage?.thinkers[index + 1];
    if (!step || !first || !second) return null;
    return step.forward ? { source: first, target: second } : { source: second, target: first };
  }
</script>

<aside
  class="panel trace-panel"
  class:dragging={dragHeight !== null}
  data-detent={atlas.sheetDetent}
  style={dragHeight !== null ? `--drag-height:${dragHeight}px` : undefined}
  aria-label={atlas.strings.lineageHeader}
>
  <SheetHandle
    kind="trace"
    label={atlas.strings.lineageHeader}
    ondragheight={(heightPx) => (dragHeight = heightPx)}
  />

  <div class="panel-head">
    <span class="micro">{atlas.strings.lineageHeader}</span>
    <button
      type="button"
      class="icon-btn"
      onclick={() => atlas.endTrace()}
      aria-label={atlas.strings.exitTrace}
      title={atlas.strings.exitTrace}
    >
      <Icon name="close" size={15} />
    </button>
  </div>

  <div class="panel-scroll" bind:this={scroller}>
    <div class="trace-body">
      {#if !from || !to}
        <h1>{!from ? atlas.strings.pickStart : atlas.strings.pickEnd}</h1>
        <p class="lede">{atlas.strings.pickerLede}</p>
      {/if}

      <div class="endpoints">
        <div class="endpoint" class:empty={!from}>
          <span class="micro">{atlas.strings.startEndpoint}</span>
          {#if from}
            <button type="button" class="person" onclick={() => atlas.jumpTo(from.id)}>
              <span class="dot" style={`background:${eraColor(from.eraIndex, atlas.themeMode)}`}></span>
              <span class="p-name">{from.name}</span>
            </button>
          {:else}
            <span class="placeholder">{atlas.strings.pending}</span>
          {/if}
        </div>

        <span class="connector" aria-hidden="true">
          <Icon name="arrow" size={14} />
        </span>

        <div class="endpoint" class:empty={!to}>
          <span class="micro">{atlas.strings.endEndpoint}</span>
          {#if to}
            <button type="button" class="person" onclick={() => atlas.jumpTo(to.id)}>
              <span class="dot" style={`background:${eraColor(to.eraIndex, atlas.themeMode)}`}></span>
              <span class="p-name">{to.name}</span>
            </button>
          {:else}
            <span class="placeholder">{atlas.strings.pending}</span>
          {/if}
        </div>
      </div>

      {#if !from || !to}
        <div class="picker">
          <div class="picker-input">
            <Icon name="search" size={15} />
            <input
              bind:value={query}
              onkeydown={handleKeydown}
              placeholder={!from ? atlas.strings.chooseStart : atlas.strings.chooseEnd}
              aria-label={!from ? atlas.strings.chooseStart : atlas.strings.chooseEnd}
              autocomplete="off"
            />
          </div>
          {#if query.trim()}
            <ul>
              {#each results as person (person.id)}
                <li>
                  <button type="button" class="result" onclick={() => pick(person.id)}>
                    <span class="dot" style={`background:${eraColor(person.eraIndex, atlas.themeMode)}`}></span>
                    <span class="r-name">{person.name}</span>
                    {#if person.nameEn}
                      <span class="r-en">{person.nameEn}</span>
                    {:else}
                      <span class="r-en"></span>
                    {/if}
                    <span class="r-era">{person.era}</span>
                  </button>
                </li>
              {:else}
                <li class="no-result">{atlas.strings.noResults(query.trim())}</li>
              {/each}
            </ul>
          {:else}
            <p class="picker-hint">{atlas.strings.graphPickHint}</p>
          {/if}
        </div>
      {:else if lineage && lineage.steps.length}
        <div class="path">
          <div class="path-head">
            <span class="micro">{atlas.strings.stepCount(lineage.steps.length)}</span>
            <button
              type="button"
              class="text-btn"
              onclick={() => atlas.jumpTo(from.id)}
            >
              {atlas.strings.viewStart}
            </button>
          </div>
          <ol>
            {#each lineage.steps as step, index (step.relation.source + step.relation.target + index)}
              {@const names = stepNames(index)}
              {@const style = RELATION_STYLE[step.relation.kind]}
              {@const color = relationColor(step.relation.kind, atlas.themeMode)}
              {#if names}
                <li>
                  <span class="step-num">{String(index + 1).padStart(2, '0')}</span>
                  <span
                    class="step-glyph"
                    style={`color:${color};background:${withAlpha(color, 0.12)};border-color:${withAlpha(color, 0.55)}`}
                  >
                    {style.glyph}
                  </span>
                  <div class="step-body">
                    <div class="step-sentence">
                      <RelationPhrase
                        relation={step.relation}
                        source={names.source}
                        target={names.target}
                        onselect={(id) => atlas.jumpTo(id)}
                      />
                    </div>
                    {#if step.relation.reason}
                      <p class="step-reason">{step.relation.reason}</p>
                    {/if}
                  </div>
                </li>
              {/if}
            {/each}
          </ol>
          <div class="arrival">
            <span class="arrival-rule" aria-hidden="true"></span>
            <p>{atlas.strings.arrival(to.name, to.era)}</p>
          </div>
        </div>
      {:else}
        <div class="dead-end">
          <p class="dead-title">{atlas.strings.deadTitle}</p>
          <p class="dead-body">{atlas.strings.deadBody}</p>
          <div class="dead-actions">
            {#if atlas.hasFilters}
              <button type="button" class="solid-btn" onclick={() => atlas.resetFilters()}>
                {atlas.strings.clearFiltersRetry}
              </button>
            {/if}
            <button
              type="button"
              class="outline-btn"
              onclick={() => {
                atlas.clearTraceEnd();
                query = '';
              }}
            >
              {atlas.strings.chooseAnotherEnd}
            </button>
          </div>
        </div>
      {/if}

      <div class="trace-actions">
        <button
          type="button"
          class="outline-btn"
          onclick={() => {
            atlas.reselectTrace();
            query = '';
          }}
        >
          {atlas.strings.reselect}
        </button>
        <button type="button" class="solid-btn" onclick={() => atlas.endTrace()}>
          {atlas.strings.exitLineage}
        </button>
      </div>
    </div>
  </div>
</aside>

<style>
  .trace-panel {
    color: var(--ink);
  }

  .panel-head {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    padding: 13px 14px 11px 28px;
    border-bottom: 1px solid var(--rule);
  }

  .panel-head .micro {
    color: var(--ink-faint);
  }

  .icon-btn {
    display: grid;
    width: 32px;
    height: 32px;
    color: var(--ink-soft);
    place-items: center;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .icon-btn:hover {
    color: var(--ink);
    background: var(--sheet-deep);
  }

  .trace-body {
    padding: 24px 28px 30px;
  }

  h1 {
    margin: 0;
    font-size: 25px;
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: 0.01em;
    color: var(--ink);
  }

  .lede {
    margin: 6px 0 14px;
    font-size: 13px;
    line-height: 1.75;
    color: var(--ink-soft);
  }

  .endpoints {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 8px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid var(--rule);
    border-radius: 0;
  }

  .endpoint {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .endpoint .micro {
    font-size: 9px;
    color: var(--ink-faint);
  }

  .person {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 0;
    text-align: left;
  }

  .dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .p-name {
    overflow: hidden;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .person:hover .p-name {
    color: var(--seal);
  }

  .placeholder {
    font-family: var(--font-sans);
    font-size: 10.5px;
    color: var(--ink-faint);
  }

  .connector {
    display: grid;
    color: var(--seal);
    place-items: center;
  }

  .picker {
    margin-top: 14px;
  }

  .picker-input {
    display: flex;
    gap: 9px;
    align-items: center;
    padding: 10px 11px;
    background: var(--sheet-deep);
    border: 1px solid var(--rule);
    border-radius: 0;
  }

  .picker-input:focus-within {
    border-color: var(--ink-faint);
  }

  .picker-input :global(svg) {
    flex: none;
    color: var(--ink-faint);
  }

  input {
    flex: 1;
    min-width: 0;
    font-family: var(--font-serif);
    font-size: 14px;
    color: var(--ink);
    background: none;
    border: 0;
    outline: none;
  }

  input::placeholder {
    color: var(--ink-faint);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    border: 1px solid var(--rule);
    border-top: 0;
  }

  .result {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 100%;
    padding: 9px 11px;
    text-align: left;
    border-bottom: 1px solid color-mix(in srgb, var(--rule) 70%, transparent);
    transition: background 0.15s ease;
  }

  li:last-child .result {
    border-bottom: 0;
  }

  .result:hover {
    background: var(--sheet-deep);
  }

  .r-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    white-space: nowrap;
  }

  .r-en {
    flex: 1;
    overflow: hidden;
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .r-era {
    font-family: var(--font-sans);
    font-size: 9.5px;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .no-result {
    padding: 12px;
    font-size: 12.5px;
    color: var(--ink-faint);
  }

  .picker-hint {
    margin: 8px 0 0;
    font-size: 12px;
    line-height: 1.7;
    color: var(--ink-faint);
  }

  .path {
    margin-top: 20px;
  }

  .path-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 7px;
    border-bottom: 2px solid var(--ink);
  }

  .path-head .micro {
    font-size: 9.5px;
    color: var(--ink-soft);
  }

  .text-btn {
    padding: 0;
    font-family: var(--font-sans);
    font-size: 10.5px;
    color: var(--seal);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .path li {
    display: grid;
    grid-template-columns: 22px 22px 1fr;
    gap: 9px;
    align-items: start;
    padding: 12px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--rule) 70%, transparent);
  }

  .step-num {
    padding-top: 2px;
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
  }

  .step-glyph {
    display: grid;
    width: 22px;
    height: 22px;
    margin-top: 1px;
    font-family: var(--font-serif);
    font-size: 12px;
    line-height: 1;
    place-items: center;
    border: 1px solid;
    border-radius: 3px;
  }

  .step-body {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .step-sentence {
    font-size: 14.5px;
    line-height: 1.5;
    color: var(--ink);
  }

  .step-reason {
    margin: 0;
    font-size: 13px;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .arrival {
    display: flex;
    gap: 9px;
    align-items: center;
    padding-top: 13px;
  }

  .arrival-rule {
    flex: none;
    width: 22px;
    height: 1px;
    background: var(--seal);
  }

  .arrival p {
    margin: 0;
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--ink-soft);
  }

  .dead-end {
    margin-top: 20px;
    padding: 16px;
    background: var(--sheet-deep);
    border-left: 2px solid var(--ink-faint);
  }

  .dead-title {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--ink);
  }

  .dead-body {
    margin: 6px 0 12px;
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .dead-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .trace-actions {
    display: flex;
    gap: 8px;
    margin-top: 22px;
  }

  .outline-btn,
  .solid-btn {
    padding: 9px 15px;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    border: 1px solid var(--ink);
    border-radius: 0;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .outline-btn {
    color: var(--ink);
    background: transparent;
  }

  .outline-btn:hover {
    background: var(--sheet-deep);
  }

  .solid-btn {
    color: var(--sheet);
    background: var(--ink);
  }

  .solid-btn:hover {
    color: var(--sheet);
    background: var(--seal);
    border-color: var(--seal);
  }

  @media (max-width: 959px) {
    .trace-panel {
      transition: height 0.24s var(--ease), max-height 0.24s var(--ease);
    }

    .trace-panel[data-detent='minimized'] {
      height: calc(68px + env(safe-area-inset-bottom));
      max-height: calc(68px + env(safe-area-inset-bottom));
    }

    .trace-panel[data-detent='half'] {
      height: 52vh;
      height: 52dvh;
      max-height: 52vh;
      max-height: 52dvh;
    }

    .trace-panel[data-detent='expanded'] {
      height: 86vh;
      height: 86dvh;
      max-height: 86vh;
      max-height: 86dvh;
    }

    .panel-head {
      padding: 2px 12px 8px 20px;
    }

    .icon-btn {
      width: 36px;
      height: 36px;
    }

    .trace-body {
      padding: 16px 20px calc(24px + env(safe-area-inset-bottom));
    }

    h1 {
      font-size: 22px;
    }

    input {
      font-size: 16px;
    }
  }
</style>
