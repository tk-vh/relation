<script module lang="ts">
  export type IconName =
    | 'search'
    | 'close'
    | 'trace'
    | 'plus'
    | 'minus'
    | 'fit'
    | 'arrow'
    | 'reset'
    | 'book'
    | 'seal'
    | 'sun'
    | 'moon'
    | 'fullscreen'
    | 'exit-fullscreen'
    | 'share'
    | 'random'
    | 'check';
</script>

<script lang="ts">
  let { name, size = 16, stroke = 1.5 }: { name: IconName; size?: number; stroke?: number } =
    $props();

  const paths: Record<IconName, string> = {
    search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.8-.2L20 21.5',
    close: 'M5 5l14 14M19 5L5 19',
    trace: 'M6 4v9a4 4 0 0 0 4 4h8M14 13l4 4-4 4M6 20h.01',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
    fit: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
    arrow: 'M4 12h15M14 7l5 5-5 5',
    reset: 'M4 10a8 8 0 1 1 2 6M4 4v6h6',
    book: 'M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4Zm0 12a4 4 0 0 1 4-4h10',
    seal: 'M7 3h10v7H7zM9 10v3M15 10v3M8 21h8v-5H8z',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6',
    moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5Z',
    fullscreen: 'M14 4h6v6M20 4l-6.5 6.5M10 20H4v-6M4 20l6.5-6.5',
    'exit-fullscreen': 'M14 10h6M14 10V4M20 4l-6 6M10 14H4M10 14v6M4 20l6-6',
    share: 'M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13',
    random: 'M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
    check: 'M4.5 12.5l5 5L19.5 7',
  };
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d={paths[name]} />
</svg>
