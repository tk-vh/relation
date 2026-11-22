<script lang="ts">
  import { onMount } from 'svelte';
  import { atlas } from './lib/state.svelte';
  import DetailPanel from './lib/components/DetailPanel.svelte';
  import EraFilter from './lib/components/EraFilter.svelte';
  import GraphStage from './lib/components/GraphStage.svelte';
  import IntroPanel from './lib/components/IntroPanel.svelte';
  import Masthead from './lib/components/Masthead.svelte';
  import RelationLegend from './lib/components/RelationLegend.svelte';
  import SearchPalette from './lib/components/SearchPalette.svelte';

  onMount(() => {
    atlas.readHash();

    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (atlas.searchOpen) atlas.closeSearch();
        else atlas.openSearch();
        return;
      }

      if (event.key === '/' && !typing) {
        event.preventDefault();
        atlas.openSearch();
        return;
      }

      if (event.key === 'Escape') {
        if (atlas.searchOpen) atlas.closeSearch();
        else if (atlas.pathMode) atlas.endTrace();
        else if (atlas.selectedId) atlas.clearSelection();
      }
    };

    const onHash = () => atlas.readHash();
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  });
</script>

<main>
  <GraphStage />
  <Masthead />
  <EraFilter />
  <RelationLegend />
  {#if atlas.pathMode || atlas.selected}
    <DetailPanel />
  {:else}
    <IntroPanel />
  {/if}
  <SearchPalette />
</main>

<style>
  main {
    position: relative;
    height: 100%;
  }
</style>
