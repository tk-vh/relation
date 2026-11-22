<script lang="ts">
  import graph from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';
  import Icon from './Icon.svelte';
  import RelationPhrase from './RelationPhrase.svelte';

  let query = $state('');

  const from = $derived(atlas.pathFrom ? (graph.byId.get(atlas.pathFrom) ?? null) : null);
  const to = $derived(atlas.pathTo ? (graph.byId.get(atlas.pathTo) ?? null) : null);
  const lineage = $derived(atlas.lineage);

  const results = $derived(
    query.trim()
      ? graph
          .search(query, 8)
          .filter((person) => person.id !== atlas.pathFrom && person.id !== atlas.pathTo)
      : [],
  );

  function pick(id: string) {
    query = '';
    atlas.select(id);
  }

  function stepNames(index: number) {
    const step = lineage?.steps[index];
    const first = lineage?.thinkers[index];
    const second = lineage?.thinkers[index + 1];
    if (!step || !first || !second) return null;
    return step.forward ? { source: first, target: second } : { source: second, target: first };
  }
</script>

<aside class="panel trace-panel" aria-label="追溯世系">
  <div class="panel-head">
    <span class="micro">LINEAGE · 追溯世系</span>
    <button type="button" class="icon-btn" onclick={() => atlas.endTrace()} aria-label="退出追溯">
      <Icon name="close" size={15} />
    </button>
  </div>

  <div class="panel-scroll">
    <div class="trace-body">
      <h1>顺着一条线索，<br />读回它的来路。</h1>
      <p class="lede">选择两端，看看思想如何一段段传到这里。连线会标出每一步的依赖关系，理由就写在下面。</p>

      <div class="endpoints">
        <div class="endpoint" class:empty={!from}>
          <span class="micro">起点</span>
          {#if from}
            <button type="button" class="person" onclick={() => atlas.jumpTo(from.id)}>
              <span class="dot" style={`background:${eraColor(from.eraIndex)}`}></span>
              <span class="p-name">{from.name}</span>
              <span class="p-era">{from.era}</span>
            </button>
          {:else}
            <span class="placeholder">在下方或图上选择</span>
          {/if}
        </div>

        <div class="connector" aria-hidden="true"><span></span><Icon name="arrow" size={13} /></div>

        <div class="endpoint" class:empty={!to}>
          <span class="micro">终点</span>
          {#if to}
            <button type="button" class="person" onclick={() => atlas.jumpTo(to.id)}>
              <span class="dot" style={`background:${eraColor(to.eraIndex)}`}></span>
              <span class="p-name">{to.name}</span>
              <span class="p-era">{to.era}</span>
            </button>
          {:else}
            <span class="placeholder">在下方或图上选择</span>
          {/if}
        </div>
      </div>

      {#if !to}
        <div class="picker">
          <div class="picker-input">
            <Icon name="search" size={15} />
            <input
              bind:value={query}
              placeholder={from ? '选择终点思想家' : '选择起点思想家'}
              aria-label={from ? '选择终点思想家' : '选择起点思想家'}
              autocomplete="off"
            />
          </div>
          {#if query}
            <ul>
              {#each results as person (person.id)}
                <li>
                  <button type="button" class="result" onclick={() => pick(person.id)}>
                    <span class="dot" style={`background:${eraColor(person.eraIndex)}`}></span>
                    <span class="r-name">{person.name}</span>
                    <span class="r-en">{person.nameEn}</span>
                    <span class="r-era">{person.era}</span>
                  </button>
                </li>
              {:else}
                <li class="no-result">没有找到「{query}」。</li>
              {/each}
            </ul>
          {:else}
            <p class="picker-hint">也可以直接在图上点选节点。选择后会自动寻找最短的一条依赖链。</p>
          {/if}
        </div>
      {/if}

      {#if lineage && lineage.steps.length}
        <div class="path">
          <div class="path-head">
            <span class="micro">一条线索 · {lineage.steps.length} 步</span>
            <button
              type="button"
              class="text-btn"
              onclick={() => from && atlas.jumpTo(from.id)}
            >查看起点</button>
          </div>
          <ol>
            {#each lineage.steps as step, index (step.relation.source + step.relation.target + index)}
              {@const names = stepNames(index)}
              {#if names}
                <li>
                  <span class="step-num">{String(index + 1).padStart(2, '0')}</span>
                  <div class="step-body">
                    <div class="step-sentence">
                      <RelationPhrase
                        relation={step.relation}
                        source={names.source}
                        target={names.target}
                        onselect={(id) => atlas.jumpTo(id)}
                      />
                    </div>
                    <p class="step-reason">{step.relation.reason}</p>
                  </div>
                </li>
              {/if}
            {/each}
          </ol>
          <div class="arrival">
            <span class="arrival-rule"></span>
            <p>抵达 <b>{to?.name}</b>。<span>{to?.era}</span></p>
          </div>
        </div>
      {:else if from && to}
        <div class="dead-end">
          <p class="dead-title">这两页之间，还没有收录的依赖链。</p>
          <p class="dead-body">
            他们可能属于不同的思想流域，也可能需要对中间人物做补充。这条图谱只呈现已经过整理的关系，不会凭空补上一段。
          </p>
          {#if atlas.hasFilters}
            <button type="button" class="solid-btn" onclick={() => atlas.resetFilters()}>清除筛选后重试</button>
          {/if}
          <button
            type="button"
            class="outline-btn"
            onclick={() => {
              atlas.pathTo = null;
              query = '';
            }}
          >换一个终点</button>
        </div>
      {/if}

      <div class="trace-actions">
        <button
          type="button"
          class="outline-btn"
          onclick={() => {
            atlas.pathFrom = null;
            atlas.pathTo = null;
            query = '';
          }}
        >
          重新选择
        </button>
        <button type="button" class="solid-btn" onclick={() => atlas.endTrace()}>退出追溯</button>
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
    padding: 14px 18px 12px 24px;
    border-bottom: 1px solid var(--rule);
  }

  .panel-head .micro {
    color: var(--ink-faint);
  }

  .icon-btn {
    display: grid;
    width: 28px;
    height: 28px;
    color: var(--ink-faint);
    place-items: center;
  }

  .icon-btn:hover {
    color: var(--ink);
    background: var(--paper-deep);
  }

  .trace-body {
    padding: 24px 26px 30px;
  }

  h1 {
    margin: 0;
    font-size: 27px;
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: 0.01em;
  }

  .lede {
    margin: 12px 0 0;
    font-size: 13px;
    line-height: 1.85;
    color: var(--ink-soft);
  }

  .endpoints {
    margin-top: 22px;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
  }

  .endpoint {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 11px 0;
  }

  .endpoint .micro {
    font-size: 8.5px;
    color: var(--ink-faint);
  }

  .person {
    display: flex;
    gap: 8px;
    align-items: baseline;
    text-align: left;
  }

  .dot {
    flex: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transform: translateY(-2px);
  }

  .p-name {
    font-size: 18px;
    font-weight: 600;
    color: var(--ink);
  }

  .p-era {
    font-family: var(--font-sans);
    font-size: 9px;
    color: var(--ink-faint);
  }

  .placeholder {
    font-family: var(--font-sans);
    font-size: 11px;
    color: var(--ink-faint);
  }

  .connector {
    display: flex;
    gap: 6px;
    align-items: center;
    padding-left: 2px;
    color: var(--seal);
  }

  .connector span {
    width: 28px;
    height: 1px;
    background: rgba(179, 70, 46, 0.4);
  }

  .picker {
    margin-top: 18px;
  }

  .picker-input {
    display: flex;
    gap: 9px;
    align-items: center;
    padding: 9px 11px;
    background: var(--paper-deep);
    border: 1px solid var(--rule);
  }

  .picker-input:focus-within {
    border-color: var(--ink-faint);
  }

  .picker-input :global(svg) {
    color: var(--ink-faint);
  }

  input {
    flex: 1;
    min-width: 0;
    font-family: var(--font-serif);
    font-size: 13.5px;
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
    margin: 6px 0 0;
    list-style: none;
    border: 1px solid var(--rule);
    border-top: 0;
  }

  .result {
    display: flex;
    gap: 8px;
    align-items: baseline;
    width: 100%;
    padding: 8px 11px;
    text-align: left;
    border-bottom: 1px solid rgba(28, 25, 23, 0.08);
  }

  .result:hover {
    background: var(--paper-deep);
  }

  .r-name {
    font-size: 14px;
    font-weight: 600;
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
    font-size: 8.5px;
    color: var(--ink-faint);
    white-space: nowrap;
  }

  .no-result {
    padding: 12px;
    font-size: 12px;
    color: var(--ink-faint);
  }

  .picker-hint {
    margin: 8px 0 0;
    font-size: 11.5px;
    line-height: 1.7;
    color: var(--ink-faint);
  }

  .path {
    margin-top: 22px;
  }

  .path-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--ink);
  }

  .path-head .micro {
    font-size: 8.5px;
    color: var(--ink-soft);
  }

  .text-btn {
    font-family: var(--font-sans);
    font-size: 9.5px;
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
    grid-template-columns: 26px 1fr;
    gap: 9px;
    padding: 13px 0;
    border-bottom: 1px solid rgba(28, 25, 23, 0.1);
  }

  .step-num {
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
  }

  .step-body {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .step-sentence {
    font-size: 14.5px;
    line-height: 1.45;
    color: var(--ink);
  }

  .step-reason {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .arrival {
    display: flex;
    gap: 10px;
    align-items: center;
    padding-top: 13px;
  }

  .arrival-rule {
    width: 22px;
    height: 1px;
    background: var(--seal);
  }

  .arrival p {
    margin: 0;
    font-family: var(--font-sans);
    font-size: 10.5px;
    color: var(--ink-soft);
  }

  .arrival b {
    font-family: var(--font-serif);
    font-size: 13px;
    color: var(--ink);
  }

  .arrival span {
    margin-left: 5px;
    color: var(--ink-faint);
  }

  .dead-end {
    margin-top: 22px;
    padding: 16px 16px 18px;
    background: var(--paper-deep);
    border-left: 2px solid var(--ink-faint);
  }

  .dead-title {
    margin: 0;
    font-size: 14.5px;
    font-weight: 600;
    line-height: 1.5;
  }

  .dead-body {
    margin: 7px 0 12px;
    font-size: 12px;
    line-height: 1.75;
    color: var(--ink-soft);
  }

  .trace-actions {
    display: flex;
    gap: 8px;
    margin-top: 26px;
  }

  .outline-btn,
  .solid-btn {
    padding: 9px 14px;
    font-family: var(--font-sans);
    font-size: 10.5px;
    letter-spacing: 0.04em;
    border: 1px solid var(--ink);
    transition: background 0.15s ease, color 0.15s ease;
  }

  .outline-btn {
    color: var(--ink);
  }

  .outline-btn:hover {
    background: var(--paper-deep);
  }

  .solid-btn {
    color: var(--paper);
    background: var(--ink);
  }

  .solid-btn:hover {
    background: var(--seal);
    border-color: var(--seal);
  }

  .dead-end .solid-btn,
  .dead-end .outline-btn {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  @media (max-width: 900px) {
    .trace-body {
      padding: 18px 20px 24px;
    }

    h1 {
      font-size: 23px;
    }
  }
</style>
