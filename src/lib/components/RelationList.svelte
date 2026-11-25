<script lang="ts">
  import {
    RELATION_KINDS,
    RELATION_STYLE,
    relationKey,
    type Relation,
    type Thinker,
  } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { relationColor, withAlpha } from '../theme';
  import RelationPhrase from './RelationPhrase.svelte';

  let {
    relations,
    direction,
    subject,
    limit = 6,
  }: { relations: Relation[]; direction: 'out' | 'in'; subject: Thinker; limit?: number } = $props();

  let expanded = $state(false);

  const rows = $derived(
    [...relations].sort((a, b) => {
      const kind = RELATION_KINDS.indexOf(a.kind) - RELATION_KINDS.indexOf(b.kind);
      if (kind !== 0) return kind;
      const otherA = atlas.graph.byId.get(direction === 'out' ? a.target : a.source);
      const otherB = atlas.graph.byId.get(direction === 'out' ? b.target : b.source);
      return (otherA?.eraIndex ?? 0) - (otherB?.eraIndex ?? 0);
    }),
  );

  const shown = $derived(expanded ? rows : rows.slice(0, limit));

  $effect(() => {
    subject.id;
    expanded = false;
  });

  function other(relation: Relation): Thinker | null {
    return atlas.graph.byId.get(direction === 'out' ? relation.target : relation.source) ?? null;
  }
</script>

{#if rows.length}
  <ul class="relations">
    {#each shown as relation (relationKey(relation))}
      {@const style = RELATION_STYLE[relation.kind]}
      {@const color = relationColor(relation.kind, atlas.themeMode)}
      {@const person = other(relation)}
      {#if person}
        <li>
          <button type="button" class="row" onclick={() => atlas.jumpTo(person.id)}>
            <span
              class="mark"
              style={`color:${color};background:${withAlpha(color, 0.12)};border-color:${withAlpha(color, 0.55)}`}
            >
              {style.glyph}
            </span>
            <span class="body">
              <span class="sentence">
                <RelationPhrase
                  relation={relation}
                  source={direction === 'out' ? subject : person}
                  target={direction === 'out' ? person : subject}
                />
              </span>
              {#if relation.reason}
                <span class="reason">{relation.reason}</span>
              {/if}
            </span>
            <span class="kind" style={`color:${color}`}>{atlas.strings.relationLabel(relation.kind)}</span>
          </button>
        </li>
      {/if}
    {/each}
  </ul>
  {#if rows.length > limit}
    <button type="button" class="more" onclick={() => (expanded = !expanded)}>
      {expanded ? atlas.strings.collapse : atlas.strings.expandRest(rows.length - limit)}
    </button>
  {/if}
{:else}
  <p class="none">{atlas.strings.emptyRelations}</p>
{/if}

<style>
  .relations {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    border-bottom: 1px solid color-mix(in srgb, var(--rule) 70%, transparent);
  }

  .row {
    display: grid;
    grid-template-columns: 24px 1fr auto;
    gap: 12px;
    align-items: start;
    width: 100%;
    padding: 13px 0;
    text-align: left;
    transition: background 0.15s ease, padding 0.15s ease;
  }

  .row:hover {
    padding-right: 6px;
    padding-left: 6px;
    background: var(--sheet-deep);
  }

  .mark {
    display: grid;
    width: 24px;
    height: 24px;
    margin-top: 1px;
    font-family: var(--font-serif);
    font-size: 13px;
    line-height: 1;
    place-items: center;
    border: 1px solid;
    border-radius: 3px;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .sentence {
    font-size: 15.5px;
    line-height: 1.5;
    color: var(--ink);
  }

  .reason {
    font-size: 14px;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .kind {
    padding-top: 2px;
    font-family: var(--font-sans);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  .more {
    width: 100%;
    padding: 11px 0;
    font-family: var(--font-sans);
    font-size: 11.5px;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    text-align: left;
    border-bottom: 1px solid var(--rule);
    transition: color 0.15s ease;
  }

  .more:hover {
    color: var(--seal);
  }

  .none {
    margin: 0;
    padding: 10px 0;
    font-size: 14px;
    color: var(--ink-faint);
  }

  @media (max-width: 959px) {
    .row {
      padding: 12px 0;
    }

    .sentence {
      font-size: 14.5px;
    }

    .reason {
      font-size: 13.5px;
    }
  }
</style>
