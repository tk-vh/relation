<script lang="ts">
  import graph, { RELATION_META, type Relation, type Thinker } from '../graph/model';
  import { atlas } from '../state.svelte';
  import RelationPhrase from './RelationPhrase.svelte';

  let {
    relations,
    direction,
    subject,
    limit = 6,
  }: { relations: Relation[]; direction: 'out' | 'in'; subject: Thinker; limit?: number } = $props();

  let expanded = $state(false);

  const order = ['presupposes', 'refutes', 'synthesizes', 'influences'];

  const rows = $derived(
    [...relations].sort((a, b) => {
      const kind = order.indexOf(a.kind) - order.indexOf(b.kind);
      if (kind !== 0) return kind;
      const otherA = graph.byId.get(direction === 'out' ? a.target : a.source);
      const otherB = graph.byId.get(direction === 'out' ? b.target : b.source);
      return (otherA?.eraIndex ?? 0) - (otherB?.eraIndex ?? 0);
    }),
  );

  const shown = $derived(expanded ? rows : rows.slice(0, limit));

  $effect(() => {
    subject.id;
    expanded = false;
  });

  function other(relation: Relation): Thinker | null {
    return graph.byId.get(direction === 'out' ? relation.target : relation.source) ?? null;
  }
</script>

{#if rows.length}
  <ul class="relations">
    {#each shown as relation (relation.source + relation.target)}
      {@const meta = RELATION_META[relation.kind]}
      {@const person = other(relation)}
      {#if person}
        <li>
          <button type="button" class="row" onclick={() => atlas.jumpTo(person.id)}>
            <span class="mark" style={`color:${meta.color};border-color:${meta.color}`}>
              {meta.glyph}
            </span>
            <span class="body">
              <span class="sentence">
                <RelationPhrase
                  relation={relation}
                  source={direction === 'out' ? subject : person}
                  target={direction === 'out' ? person : subject}
                />
              </span>
              <span class="reason">{relation.reason}</span>
            </span>
            <span class="kind" style={`color:${meta.color}`}>{meta.label}</span>
          </button>
        </li>
      {/if}
    {/each}
  </ul>
  {#if rows.length > limit}
    <button type="button" class="more" onclick={() => (expanded = !expanded)}>
      {expanded ? '收起' : `展开其余 ${rows.length - limit} 条`}
    </button>
  {/if}
{:else}
  <p class="none">暂无收录。</p>
{/if}

<style>
  .relations {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    margin: 0;
    list-style: none;
    border-top: 1px solid var(--rule);
  }

  li {
    border-bottom: 1px solid rgba(28, 25, 23, 0.1);
  }

  .row {
    display: grid;
    grid-template-columns: 24px 1fr auto;
    gap: 11px;
    align-items: start;
    width: 100%;
    padding: 12px 0 13px;
    text-align: left;
    transition: background 0.15s ease, padding 0.15s ease;
  }

  .row:hover {
    padding-right: 6px;
    padding-left: 6px;
    background: rgba(28, 25, 23, 0.035);
  }

  .mark {
    display: grid;
    width: 22px;
    height: 22px;
    margin-top: 1px;
    font-family: var(--font-serif);
    font-size: 12px;
    line-height: 1;
    place-items: center;
    border: 1px solid;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .sentence {
    font-size: 14.5px;
    line-height: 1.45;
    color: var(--ink);
  }

  .reason {
    font-size: 12.5px;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  .kind {
    padding-top: 2px;
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.08em;
    white-space: nowrap;
    opacity: 0.8;
  }

  .more {
    width: 100%;
    padding: 9px 0;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    text-align: left;
    border-bottom: 1px solid var(--rule);
  }

  .more:hover {
    color: var(--seal);
  }

  .none {
    margin: 0;
    padding: 10px 0;
    font-size: 13px;
    color: var(--ink-faint);
  }
</style>
