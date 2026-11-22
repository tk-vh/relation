<script lang="ts">
  import graph from '../graph/model';
  import { atlas } from '../state.svelte';
  import Icon from './Icon.svelte';

  function trace() {
    if (atlas.pathMode) atlas.endTrace();
    else atlas.beginTrace();
  }
</script>

<header class="masthead">
  <button
    type="button"
    class="brand"
    onclick={() => {
      atlas.endTrace();
      atlas.clearSelection();
    }}
    aria-label="返回图谱"
  >
    <span class="seal" aria-hidden="true"><span>关</span><span>系</span></span>
    <span class="brand-text">
      <span class="wordmark">关系</span>
      <span class="latin">RELATION</span>
    </span>
    <span class="tagline">一部哲学依赖图谱</span>
  </button>

  <div class="actions">
    <button
      type="button"
      class="action"
      class:active={atlas.pathMode}
      onclick={trace}
      aria-label={atlas.pathMode ? '退出追溯' : '追溯世系'}
    >
      <Icon name="trace" size={14} />
      <span class="action-label">{atlas.pathMode ? '退出追溯' : '追溯'}</span>
    </button>
    <button
      type="button"
      class="search"
      onclick={() => atlas.openSearch()}
      aria-label="搜索思想家"
    >
      <Icon name="search" size={14} />
      <span class="search-label">搜索思想家、学派或命题</span>
      <kbd>⌘K</kbd>
    </button>
  </div>

  <span class="counts">
    {graph.thinkers.length} 位思想家 <span>·</span> {graph.relations.length} 条线索
  </span>
</header>

<style>
  .masthead {
    position: fixed;
    top: 0;
    right: 436px;
    left: 0;
    z-index: 25;
    display: flex;
    gap: 20px;
    align-items: center;
    height: 62px;
    padding: 0 28px;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(16, 14, 11, 0.86), rgba(16, 14, 11, 0));
  }

  .brand {
    display: flex;
    flex: none;
    gap: 11px;
    align-items: center;
    padding: 0;
    pointer-events: auto;
    text-align: left;
  }

  .seal {
    display: flex;
    gap: 1px;
    align-items: center;
    justify-content: center;
    width: 31px;
    height: 31px;
    font-family: var(--font-serif);
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    color: #f6f1e7;
    background: var(--seal);
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(246, 241, 231, 0.12) inset;
  }

  .seal span {
    display: block;
    writing-mode: vertical-rl;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .wordmark {
    font-size: 22px;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: 0.14em;
    color: #f6f1e7;
  }

  .latin {
    margin-top: 1px;
    font-family: var(--font-latin);
    font-size: 8.5px;
    letter-spacing: 0.34em;
    color: #8d857a;
  }

  .tagline {
    padding-left: 15px;
    margin-left: 3px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.08em;
    color: #8d857a;
    border-left: 1px solid rgba(236, 230, 216, 0.16);
  }

  .actions {
    display: flex;
    gap: 7px;
    align-items: center;
    margin-left: auto;
    pointer-events: auto;
  }

  .action {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 6px 10px;
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 0.05em;
    color: #b6ad9f;
    border: 1px solid rgba(236, 230, 216, 0.16);
    transition: color 0.15s ease, background 0.15s ease;
  }

  .action:hover,
  .action.active {
    color: #f6f1e7;
    background: rgba(236, 230, 216, 0.08);
  }

  .action.active {
    color: #f0c7bc;
    border-color: rgba(214, 90, 70, 0.5);
  }

  .search {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 245px;
    padding: 7px 9px 7px 11px;
    font-size: 10px;
    color: #857c6f;
    text-align: left;
    border-bottom: 1px solid rgba(236, 230, 216, 0.2);
    transition: border-color 0.15s ease, color 0.15s ease;
  }

  .search:hover {
    color: #cfc7b9;
    border-bottom-color: rgba(236, 230, 216, 0.45);
  }

  .search-label {
    flex: 1;
    overflow: hidden;
    font-family: var(--font-serif);
    font-size: 11.5px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  kbd {
    font-family: var(--font-sans);
    font-size: 8.5px;
    letter-spacing: 0.06em;
    color: #6e665b;
  }

  .counts {
    margin-left: 14px;
    font-family: var(--font-sans);
    font-size: 9px;
    letter-spacing: 0.05em;
    color: #6e665b;
    white-space: nowrap;
  }

  .counts span {
    margin: 0 4px;
    opacity: 0.6;
  }

  @media (max-width: 1180px) {
    .counts {
      display: none;
    }

    .tagline {
      display: none;
    }

    .search {
      width: 200px;
    }
  }

  @media (max-width: 900px) {
    .masthead {
      right: 0;
      height: 54px;
      padding: 0 14px;
      background: linear-gradient(180deg, rgba(16, 14, 11, 0.94), rgba(16, 14, 11, 0));
    }

    .seal {
      width: 27px;
      height: 27px;
      font-size: 9px;
    }

    .wordmark {
      font-size: 19px;
    }

    .latin,
    .search-label {
      display: none;
    }

    .action-label {
      display: inline;
      font-size: 9px;
    }

    .actions {
      gap: 4px;
    }

    .action {
      width: auto;
      height: 32px;
      justify-content: center;
      padding: 0 7px;
      border: 0;
    }

    .search {
      width: auto;
      padding: 7px;
      border: 0;
    }

    kbd {
      display: none;
    }
  }
</style>
