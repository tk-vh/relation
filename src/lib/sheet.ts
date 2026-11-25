import type { SheetDetent } from './state.svelte';

export type SheetKind = 'intro' | 'detail' | 'trace';

export const SHEET_MINIMIZED_PX = 68;

export const SHEET_DETENT_RATIO: Record<SheetKind, Record<'half' | 'expanded', number>> = {
  intro: { half: 0.44, expanded: 0.84 },
  detail: { half: 0.48, expanded: 0.86 },
  trace: { half: 0.52, expanded: 0.86 },
};

const DETENT_ORDER: readonly SheetDetent[] = ['minimized', 'half', 'expanded'];

export function sheetHeightPx(kind: SheetKind, detent: SheetDetent, viewportHeight: number): number {
  if (detent === 'minimized') return SHEET_MINIMIZED_PX;
  return Math.round(viewportHeight * SHEET_DETENT_RATIO[kind][detent]);
}

export function nextSheetDetent(current: SheetDetent): SheetDetent {
  return DETENT_ORDER[(DETENT_ORDER.indexOf(current) + 1) % DETENT_ORDER.length] ?? 'half';
}

export function snapSheetDetent(
  kind: SheetKind,
  heightPx: number,
  viewportHeight: number,
  velocityY: number,
): SheetDetent {
  const projected = heightPx - velocityY * 160;
  let best: SheetDetent = 'half';
  let bestDistance = Infinity;
  for (const detent of DETENT_ORDER) {
    const distance = Math.abs(projected - sheetHeightPx(kind, detent, viewportHeight));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = detent;
    }
  }
  return best;
}

export const DESKTOP_PANEL_GAP = 16;

export function desktopPanelWidth(viewportWidth: number): number {
  return Math.round(Math.min(540, Math.max(460, viewportWidth * 0.34)));
}

export function desktopPanelClearance(viewportWidth: number): number {
  return desktopPanelWidth(viewportWidth) + DESKTOP_PANEL_GAP * 2;
}
