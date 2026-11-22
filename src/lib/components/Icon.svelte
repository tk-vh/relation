<script lang="ts">
  type IconName =
    | 'search'
    | 'close'
    | 'trace'
    | 'plus'
    | 'minus'
    | 'fit'
    | 'arrow'
    | 'reset'
    | 'book'
    | 'seal';

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
