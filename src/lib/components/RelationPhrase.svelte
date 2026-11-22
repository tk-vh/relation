<script lang="ts">
  import { RELATION_META, type Relation, type Thinker } from '../graph/model';

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

  const meta = $derived(RELATION_META[relation.kind]);
</script>

<span class="phrase">
  {#if onselect}
    <button type="button" onclick={() => onselect(source.id)}>{source.name}</button>
  {:else}
    <b>{source.name}</b>
  {/if}

  {#if relation.kind === 'influences'}
    <span class="verb" style={`color:${meta.color}`}>受</span>
    {#if onselect}
      <button type="button" onclick={() => onselect(target.id)}>{target.name}</button>
    {:else}
      <b>{target.name}</b>
    {/if}
    <span class="verb" style={`color:${meta.color}`}>影响</span>
  {:else}
    <span class="verb" style={`color:${meta.color}`}>{meta.verb}</span>
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
  }

  b {
    font-weight: 600;
  }

  button {
    display: inline;
    padding: 0;
    font: inherit;
    font-weight: 600;
    color: inherit;
    text-align: left;
  }

  button:hover {
    color: var(--seal);
  }

  .verb {
    margin: 0 4px;
    font-size: 12.5px;
    font-weight: 400;
  }
</style>
