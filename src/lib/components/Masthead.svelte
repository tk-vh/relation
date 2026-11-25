<script lang="ts">
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
    class:zh={atlas.language === 'zh'}
    onclick={() => {
      atlas.endTrace();
      atlas.clearSelection();
    }}
    aria-label={atlas.strings.brand}
  >
    <svg class="seal" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="27"
        height="27"
        rx="3"
        fill="var(--seal-bg)"
        stroke={atlas.themeMode === 'dark' ? 'var(--rule)' : 'none'}
        stroke-width="1"
      />
      <circle cx="14" cy="14" r="5.9" stroke="var(--seal-stroke)" stroke-width="1.85" />
      <line x1="14" y1="5.27" x2="14" y2="22.73" stroke="var(--seal-stroke)" stroke-width="1.85" />
      <line
        x1="10.94"
        y1="5.27"
        x2="17.06"
        y2="5.27"
        stroke="var(--seal-stroke)"
        stroke-width="1.48"
      />
      <line
        x1="10.94"
        y1="22.73"
        x2="17.06"
        y2="22.73"
        stroke="var(--seal-stroke)"
        stroke-width="1.48"
      />
      <circle cx="14" cy="14" r="2.4" fill="var(--seal-bg)" />
      <circle cx="14" cy="14" r="1.64" fill="var(--seal-dot)" />
    </svg>
    <span class="wordmark">{atlas.strings.brand}</span>
    <span class="latin">{atlas.strings.brandLatin}</span>
    <span class="divider" aria-hidden="true"></span>
    <span class="tagline">{atlas.strings.brandTagline}</span>
  </button>

  <div class="actions">
    <button
      type="button"
      class="icon-btn"
      data-testid="theme-toggle"
      onclick={() => atlas.toggleTheme()}
      aria-label={atlas.strings.themeToggle}
      title={atlas.strings.themeToggle}
    >
      <Icon name={atlas.themeMode === 'dark' ? 'sun' : 'moon'} size={17} />
    </button>

    <button
      type="button"
      class="icon-btn lang-btn"
      data-testid="lang-toggle"
      onclick={() => atlas.toggleLanguage()}
      aria-label={atlas.strings.languageToggle}
      title={atlas.strings.languageToggle}
    >
      {atlas.language === 'zh' ? 'EN' : '中'}
    </button>

    <button
      type="button"
      class="trace-btn"
      class:active={atlas.pathMode}
      onclick={trace}
      aria-label={atlas.strings.traceLineage}
      aria-pressed={atlas.pathMode}
    >
      <Icon name="arrow" size={13} />
      <span class="trace-label">{atlas.pathMode ? atlas.strings.exitTrace : atlas.strings.trace}</span>
    </button>

    <button
      type="button"
      class="search-btn"
      onclick={() => atlas.openSearch()}
      aria-label={atlas.strings.search}
    >
      <Icon name="search" size={15} />
      <span class="search-label">{atlas.strings.searchPlaceholder}</span>
      <kbd>⌘K</kbd>
    </button>

    <span class="counts">
      {atlas.strings.counts(atlas.totals.thinkers, atlas.totals.relations)}
    </span>
  </div>
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
    height: 58px;
    padding: 0 28px;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--canvas) 92%, transparent) 0%,
      color-mix(in srgb, var(--canvas) 0%, transparent) 100%
    );
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
    flex: none;
    width: 28px;
    height: 28px;
    display: block;
  }

  .wordmark {
    font-family: var(--font-serif);
    font-size: 21px;
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: 0.1px;
    color: var(--canvas-ink);
    white-space: nowrap;
  }

  .brand.zh .wordmark {
    letter-spacing: 1px;
  }

  .latin {
    display: none;
    font-family: var(--font-latin);
    font-style: italic;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  .divider {
    display: none;
    width: 1px;
    height: 14px;
    margin-left: 3px;
    background: var(--rule);
  }

  .tagline {
    display: none;
    font-family: var(--font-sans);
    font-size: 9.5px;
    letter-spacing: 0.6px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  .actions {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-left: auto;
    pointer-events: auto;
  }

  .icon-btn {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
    color: var(--canvas-ink-soft);
    border-radius: 3px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .icon-btn:hover {
    color: var(--canvas-ink);
    background: color-mix(in srgb, var(--canvas-ink) 7%, transparent);
  }

  .lang-btn {
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .trace-btn {
    display: flex;
    gap: 5px;
    align-items: center;
    height: 32px;
    padding: 0 11px;
    font-family: var(--font-sans);
    font-size: 11px;
    font-weight: 500;
    color: var(--canvas-ink-soft);
    border: 1px solid var(--rule);
    border-radius: 0;
    white-space: nowrap;
    transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .trace-btn:hover {
    color: var(--canvas-ink);
    background: color-mix(in srgb, var(--canvas-ink) 5%, transparent);
  }

  .trace-btn.active {
    color: var(--seal);
    border-color: color-mix(in srgb, var(--seal) 70%, transparent);
    background: color-mix(in srgb, var(--seal) 7%, transparent);
  }

  .search-btn {
    display: flex;
    gap: 8px;
    align-items: center;
    width: 184px;
    padding: 7px 4px;
    color: var(--canvas-ink-faint);
    text-align: left;
    border-bottom: 1px solid var(--rule);
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .search-btn:hover {
    color: var(--canvas-ink-soft);
    border-bottom-color: var(--canvas-ink-faint);
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
    flex: none;
    font-family: var(--font-sans);
    font-size: 8.5px;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-faint);
  }

  .counts {
    display: none;
    margin-left: 6px;
    font-family: var(--font-sans);
    font-size: 9.5px;
    color: var(--canvas-ink-faint);
    white-space: nowrap;
  }

  @media (min-width: 1500px) {
    .latin,
    .divider,
    .tagline,
    .counts {
      display: inline-block;
    }

    .search-btn {
      width: 245px;
    }
  }

  @media (max-width: 959px) {
    .masthead {
      right: 0;
      gap: 8px;
      height: 48px;
      padding: 0 14px;
    }

    .brand {
      gap: 8px;
    }

    .seal {
      width: 24px;
      height: 24px;
    }

    .wordmark {
      font-size: 16.5px;
    }

    .brand.zh .wordmark {
      font-size: 17.5px;
    }

    .actions {
      gap: 2px;
    }

    .trace-btn {
      padding: 0 7px;
      border-color: transparent;
    }

    .trace-btn.active {
      border-color: color-mix(in srgb, var(--seal) 70%, transparent);
    }

    .search-btn {
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      color: var(--canvas-ink-soft);
      border-bottom: 0;
    }

    .search-label,
    kbd {
      display: none;
    }
  }
</style>
