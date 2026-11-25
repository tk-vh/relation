import type { RelationKind } from './graph/model';

export type AtlasThemeMode = 'light' | 'dark';

export interface AtlasPalette {
  readonly isDark: boolean;
  readonly canvas: string;
  readonly canvasDeep: string;
  readonly canvasSurface: string;
  readonly canvasGuide: string;
  readonly sheet: string;
  readonly sheetDeep: string;
  readonly ink: string;
  readonly inkSoft: string;
  readonly inkFaint: string;
  readonly canvasInk: string;
  readonly canvasInkSoft: string;
  readonly canvasInkFaint: string;
  readonly rule: string;
  readonly seal: string;
  readonly sealSoft: string;
  readonly labelBg: string;
  readonly labelText: string;
  readonly labelTextStrong: string;
  readonly dimEdge: string;
  readonly dimEdgeAlpha: number;
  readonly sealBg: string;
  readonly sealStroke: string;
  readonly sealDot: string;
  readonly eraColors: readonly string[];
  readonly relationColors: Record<RelationKind, string>;
}

const LIGHT_PALETTE: AtlasPalette = {
  isDark: false,
  canvas: '#FCFBF8',
  canvasDeep: '#F4F1EA',
  canvasSurface: '#FFFFFF',
  canvasGuide: '#E7E2D8',
  sheet: '#FFFFFF',
  sheetDeep: '#F7F4EE',
  ink: '#141311',
  inkSoft: '#4A4640',
  inkFaint: '#7D776E',
  canvasInk: '#141311',
  canvasInkSoft: '#3D3A34',
  canvasInkFaint: '#7D776E',
  rule: '#E5E0D6',
  seal: '#B83B28',
  sealSoft: '#D14F3A',
  labelBg: '#FCFBF8',
  labelText: '#3A3732',
  labelTextStrong: '#141311',
  dimEdge: '#94A3B8',
  dimEdgeAlpha: 0.09,
  sealBg: '#141311',
  sealStroke: '#F4EFE6',
  sealDot: '#C8432B',
  eraColors: [
    '#C9A66B',
    '#3E5A6E',
    '#7A6382',
    '#A84232',
    '#3F6857',
    '#B56E45',
    '#477278',
    '#2B2E36',
    '#8C3B4A',
    '#567D73',
    '#4E678A',
    '#8A6948',
    '#8F4F64',
    '#5E626E',
  ],
  relationColors: {
    presupposes: '#2B5EA8',
    refutes: '#B83B28',
    synthesizes: '#B87314',
    influences: '#6B655D',
  },
};

const DARK_PALETTE: AtlasPalette = {
  isDark: true,
  canvas: '#0C0C0E',
  canvasDeep: '#08080A',
  canvasSurface: '#151518',
  canvasGuide: '#222228',
  sheet: '#141417',
  sheetDeep: '#1C1C21',
  ink: '#F4F2ED',
  inkSoft: '#B8B3AA',
  inkFaint: '#847F77',
  canvasInk: '#F4F2ED',
  canvasInkSoft: '#C7C2B9',
  canvasInkFaint: '#847F77',
  rule: '#28282E',
  seal: '#D9533D',
  sealSoft: '#EB6B54',
  labelBg: '#0C0C0E',
  labelText: '#D8D3CA',
  labelTextStrong: '#F8F6F1',
  dimEdge: '#94A3B8',
  dimEdgeAlpha: 0.045,
  sealBg: '#1B1A18',
  sealStroke: '#F4EFE6',
  sealDot: '#C8432B',
  eraColors: [
    '#D8B77C',
    '#6B8EA6',
    '#A389AD',
    '#CC604E',
    '#5D917B',
    '#D48B61',
    '#679AA1',
    '#D8D3C8',
    '#B85C6D',
    '#73A699',
    '#7492BA',
    '#B08C66',
    '#B87088',
    '#8D92A1',
  ],
  relationColors: {
    presupposes: '#6DA6D9',
    refutes: '#E0604B',
    synthesizes: '#E0A43B',
    influences: '#9C968D',
  },
};

export const PALETTES: Record<AtlasThemeMode, AtlasPalette> = {
  light: LIGHT_PALETTE,
  dark: DARK_PALETTE,
};

export function paletteFor(mode: AtlasThemeMode = 'light'): AtlasPalette {
  return PALETTES[mode];
}

export function eraColor(eraIndex: number, mode: AtlasThemeMode = 'light'): string {
  return PALETTES[mode].eraColors[eraIndex] ?? '#7D776E';
}

export function relationColor(kind: RelationKind, mode: AtlasThemeMode = 'light'): string {
  return PALETTES[mode].relationColors[kind];
}

export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
