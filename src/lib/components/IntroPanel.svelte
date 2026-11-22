<script lang="ts">
  import graph, { RELATION_META, type RelationKind } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor } from '../theme';
  import Icon from './Icon.svelte';

  const hubs = ['aristotle', 'plato', 'kant', 'hegel', 'buddha', 'augustine']
    .map((id) => graph.byId.get(id))
    .filter((person) => person !== undefined);

  const totals = $derived(atlas.totals);
  const kinds = Object.entries(RELATION_META) as [
    RelationKind,
    (typeof RELATION_META)[RelationKind],
  ][];
</script>

<aside class="panel intro-panel" aria-label="图谱指南">
  <div class="panel-head">
    <span class="micro">ATLAS · 图谱指南</span>
    <button type="button" class="icon-btn" onclick={() => atlas.openSearch()} aria-label="搜索">
      <Icon name="search" size={15} />
    </button>
  </div>

  <div class="panel-scroll">
    <div class="intro">
      <p class="kicker">关系</p>
      <h1>每一个观念，<br />都是对某人的回答。</h1>
      <p class="lede">
        从泰勒斯到当代，两百三十四位思想家在这张图上彼此回应。线从依赖者指向被依赖者，标明谁预设了谁，谁批判了谁，谁又把两股思想综合成新的东西。
      </p>

      <div class="numbers">
        <div><b>{totals.thinkers}</b><span>位思想家</span></div>
        <div><b>{totals.relations}</b><span>条线索</span></div>
        <div><b>{totals.eras}</b><span>个时代</span></div>
      </div>

      <div class="mobile-kinds" aria-label="按关系类型筛选">
        {#each kinds as [kind, meta]}
          <button
            type="button"
            class:off={atlas.hiddenKinds.has(kind)}
            aria-pressed={!atlas.hiddenKinds.has(kind)}
            onclick={() => atlas.toggleKind(kind)}
          >
            <span class="mobile-glyph" style={`color:${meta.color}`}>{meta.glyph}</span>
            {meta.label}
          </button>
        {/each}
      </div>

      <section class="legend">
        <h2><span>四种关系</span><em>HOW TO READ A LINE</em></h2>
        {#each kinds as [kind, meta]}
          <button
            type="button"
            class="legend-row"
            class:muted={atlas.hiddenKinds.has(kind)}
            onclick={() => atlas.toggleKind(kind)}
          >
            <span class="glyph" style={`color:${meta.color};border-color:${meta.color}`}>{meta.glyph}</span>
            <span class="legend-body">
              <span class="legend-name">{meta.label}</span>
              <span class="legend-plain">{meta.plain}</span>
            </span>
            <span class="line-sample" style={`--line:${meta.color};--dash:${meta.dash || 'none'}`}></span>
            <span class="legend-count">{atlas.kindCounts[kind]}</span>
          </button>
        {/each}
      </section>

      <section class="hubs">
        <h2><span>从枢纽进入</span><em>START WITH A HUB</em></h2>
        <div class="hub-grid">
          {#each hubs as person}
            <button type="button" class="hub" onclick={() => atlas.select(person.id)}>
              <span class="hub-dot" style={`background:${eraColor(person.eraIndex)}`}></span>
              <span class="hub-name">{person.name}</span>
              <span class="hub-count">{graph.descendants.get(person.id) ?? 0} 人依赖</span>
            </button>
          {/each}
        </div>
      </section>

      <div class="actions">
        <button type="button" class="primary" onclick={() => atlas.select(atlas.random().id)}>
          随机漫步 <Icon name="arrow" size={14} />
        </button>
        <button type="button" class="secondary" onclick={() => atlas.beginTrace()}>
          <Icon name="trace" size={14} /> 追溯世系
        </button>
      </div>

      <p class="hint">箭头指向被依赖的思想家 · 拖动节点 · 滚轮缩放 · ⌘K 搜索</p>

      <footer class="colophon">
        <span>数据整理自公开哲学史资料</span>
        <span>{graph.stats.kinds.refutes} 条批判 · {graph.stats.kinds.synthesizes} 条综合</span>
      </footer>
    </div>
  </div>
</aside>

<style>
  .intro-panel {
    background: var(--paper);
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

  .intro {
    padding: 26px 26px 28px;
  }

  .kicker {
    margin: 0 0 12px;
    font-family: var(--font-sans);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3em;
    color: var(--seal);
  }

  h1 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    line-height: 1.55;
    letter-spacing: 0.005em;
    color: var(--ink);
  }

  .lede {
    margin: 14px 0 0;
    font-size: 13px;
    line-height: 1.95;
    color: var(--ink-soft);
    text-align: justify;
  }

  .numbers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 20px;
    padding: 13px 0;
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--rule);
  }

  .numbers div {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .numbers b {
    font-family: var(--font-latin);
    font-size: 26px;
    font-style: italic;
    font-weight: 500;
    line-height: 1;
    color: var(--ink);
  }

  .numbers span {
    font-family: var(--font-sans);
    font-size: 9px;
    letter-spacing: 0.08em;
    color: var(--ink-faint);
  }

  .mobile-kinds {
    display: none;
  }

  .mobile-kinds button {
    display: flex;
    flex: 1;
    gap: 4px;
    align-items: center;
    justify-content: center;
    padding: 7px 3px;
    font-family: var(--font-sans);
    font-size: 9px;
    color: var(--ink-soft);
    border: 1px solid var(--rule);
    border-right: 0;
  }

  .mobile-kinds button:last-child {
    border-right: 1px solid var(--rule);
  }

  .mobile-kinds button.off {
    opacity: 0.4;
    text-decoration: line-through;
  }

  .mobile-glyph {
    font-family: var(--font-serif);
    font-size: 11px;
    line-height: 1;
  }

  section {
    margin-top: 24px;
  }

  h2 {
    display: flex;
    gap: 10px;
    align-items: baseline;
    margin: 0 0 8px;
    padding-bottom: 6px;
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    border-bottom: 1px solid var(--rule);
  }

  h2 em {
    font-family: var(--font-latin);
    font-size: 11px;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--ink-faint);
  }

  .legend-row {
    display: grid;
    grid-template-columns: 22px 1fr 34px 25px;
    gap: 9px;
    align-items: center;
    width: 100%;
    padding: 7px 0;
    text-align: left;
    border-bottom: 1px solid rgba(28, 25, 23, 0.09);
    transition: opacity 0.15s ease;
  }

  .legend-row.muted {
    opacity: 0.34;
  }

  .glyph {
    display: grid;
    width: 20px;
    height: 20px;
    font-size: 11px;
    place-items: center;
    border: 1px solid;
  }

  .legend-body {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .legend-name {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--ink);
  }

  .legend-plain {
    font-family: var(--font-sans);
    font-size: 9.5px;
    line-height: 1.4;
    color: var(--ink-faint);
  }

  .line-sample {
    height: 0;
    border-top: 1.5px solid var(--line);
    border-top-style: var(--dash);
    opacity: 0.9;
  }

  .legend-count {
    font-family: var(--font-latin);
    font-size: 12px;
    font-style: italic;
    color: var(--ink-faint);
    text-align: right;
  }

  .hub-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
  }

  .hub {
    display: grid;
    grid-template-columns: 6px 1fr;
    gap: 2px 7px;
    align-items: center;
    padding: 9px 10px;
    text-align: left;
    background: var(--paper);
    transition: background 0.15s ease;
  }

  .hub:hover {
    background: var(--paper-deep);
  }

  .hub-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .hub-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
  }

  .hub-count {
    grid-column: 2;
    font-family: var(--font-sans);
    font-size: 8.5px;
    letter-spacing: 0.04em;
    color: var(--ink-faint);
  }

  .actions {
    display: flex;
    gap: 8px;
    margin-top: 24px;
  }

  .primary,
  .secondary {
    display: flex;
    flex: 1;
    gap: 7px;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    font-family: var(--font-sans);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    border: 1px solid var(--ink);
    transition: background 0.15s ease, color 0.15s ease;
  }

  .primary {
    color: var(--paper);
    background: var(--ink);
  }

  .primary:hover {
    background: var(--seal);
    border-color: var(--seal);
  }

  .secondary {
    color: var(--ink);
  }

  .secondary:hover {
    background: var(--paper-deep);
  }

  .hint {
    margin: 16px 0 0;
    font-family: var(--font-sans);
    font-size: 9px;
    letter-spacing: 0.06em;
    color: var(--ink-faint);
    text-align: center;
  }

  .colophon {
    display: flex;
    justify-content: space-between;
    margin-top: 18px;
    padding-top: 10px;
    font-family: var(--font-sans);
    font-size: 8.5px;
    letter-spacing: 0.03em;
    color: var(--ink-faint);
    border-top: 1px solid var(--rule);
  }

  @media (max-width: 900px) {
    .intro-panel {
      max-height: 47vh;
    }

    .intro {
      padding: 20px 20px 22px;
    }

    .kicker {
      margin-bottom: 8px;
      font-size: 9px;
    }

    h1 {
      font-size: 24px;
      line-height: 1.5;
    }

    .lede {
      display: -webkit-box;
      overflow: hidden;
      margin-top: 10px;
      font-size: 12px;
      line-height: 1.8;
      -webkit-box-orient: vertical;
      line-clamp: 3;
      -webkit-line-clamp: 3;
    }

    .numbers {
      margin-top: 14px;
      padding: 9px 0;
    }

    .numbers b {
      font-size: 21px;
    }

    .legend,
    .hubs,
    .hint,
    .colophon {
      display: none;
    }

    .mobile-kinds {
      display: flex;
      margin-top: 11px;
    }

    .actions {
      margin-top: 10px;
    }
  }
</style>
