<script lang="ts">
  import type { Relation, Thinker } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { relationColor } from '../theme';

  let {
    relation,
    source,
    target,
    onselect = null,
  }: {
    relation: Relation;
    source: Thinker;
    target: Thinker;
    onselect?: ((id: string) => void) | null;
  } = $props();

  const color = $derived(relationColor(relation.kind, atlas.themeMode));
  const verb = $derived(atlas.strings.relationVerb(relation.kind));
</script>

<span class="phrase">
  {#if onselect}
    <button type="button" onclick={() => onselect(source.id)}>{source.name}</button>
  {:else}
    <b>{source.name}</b>
  {/if}

  {#if atlas.language === 'zh' && relation.kind === 'influences'}
    <span class="verb" style={`color:${color}`}>受</span>
    {#if onselect}
      <button type="button" onclick={() => onselect(target.id)}>{target.name}</button>
    {:else}
      <b>{target.name}</b>
    {/if}
    <span class="verb" style={`color:${color}`}>影响</span>
  {:else}
    <span class="verb" style={`color:${color}`}>{verb}</span>
    {#if onselect}
      <button type="button" onclick={() => onselect(target.id)}>{target.name}</button>
    {:else}
      <b>{target.name}</b>
    {/if}
  {/if}
</span>

<style>
  .phrase {
    display: inline;
    color: var(--ink);
  }

  b {
    font-weight: 600;
    color: var(--ink);
  }

  button {
    display: inline;
    padding: 0;
    font: inherit;
    font-weight: 600;
    color: var(--ink);
    text-align: left;
    transition: color 0.15s ease;
  }

  button:hover {
    color: var(--seal);
  }

  .verb {
    margin: 0 4px;
    font-size: 13px;
    font-weight: 400;
  }
</style>
