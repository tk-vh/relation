/** Era colours are ordered to match graph.eras. Muted inks on warm paper. */
export const ERA_COLORS = [
  '#8a7550',
  '#3f6070',
  '#755c78',
  '#a04a38',
  '#53634b',
  '#a06a3c',
  '#55707a',
  '#5d4e7c',
  '#8e3f42',
  '#3f6b63',
  '#465f85',
  '#6d5840',
  '#8a4a5c',
  '#5c5c66',
] as const;

export const PAPER = '#f3eee3';
export const INK = '#201d18';
export const SEAL = '#a33b2b';

export function eraColor(index: number): string {
  return ERA_COLORS[index] ?? '#6d6659';
}

export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
