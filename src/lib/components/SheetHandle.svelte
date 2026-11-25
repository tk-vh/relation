<script lang="ts">
  import {
    SHEET_MINIMIZED_PX,
    nextSheetDetent,
    sheetHeightPx,
    snapSheetDetent,
    type SheetKind,
  } from '../sheet';
  import { atlas } from '../state.svelte';

  let {
    kind,
    label,
    ondragheight,
  }: {
    kind: SheetKind;
    label: string;
    ondragheight?: (heightPx: number | null) => void;
  } = $props();

  let drag: {
    pointerId: number;
    startY: number;
    startHeight: number;
    lastY: number;
    lastTime: number;
    velocityY: number;
    currentHeight: number;
    moved: boolean;
  } | null = null;

  let suppressClick = false;

  function onPointerDown(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    suppressClick = false;
    const panel = event.currentTarget.closest('.panel');
    const startHeight =
      panel?.getBoundingClientRect().height ??
      sheetHeightPx(kind, atlas.sheetDetent, window.innerHeight);
    event.currentTarget.setPointerCapture(event.pointerId);
    drag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startHeight,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      velocityY: 0,
      currentHeight: startHeight,
      moved: false,
    };
  }

  function onPointerMove(event: PointerEvent) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.abs(dy) > 6) {
      drag.moved = true;
    }
    const dt = event.timeStamp - drag.lastTime;
    if (dt > 0) {
      drag.velocityY = (event.clientY - drag.lastY) / dt;
      drag.lastY = event.clientY;
      drag.lastTime = event.timeStamp;
    }
    if (!drag.moved) return;
    const maxHeight = Math.round(window.innerHeight * 0.92);
    const nextHeight = Math.max(SHEET_MINIMIZED_PX, Math.min(maxHeight, drag.startHeight - dy));
    drag.currentHeight = nextHeight;
    ondragheight?.(Math.round(nextHeight));
  }

  function endDrag(event: PointerEvent, commit: boolean) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const active = drag;
    drag = null;
    ondragheight?.(null);
    if (!active.moved) return;
    suppressClick = true;
    setTimeout(() => {
      suppressClick = false;
    }, 100);
    if (commit) {
      atlas.setSheetDetent(
        snapSheetDetent(kind, active.currentHeight, window.innerHeight, active.velocityY),
      );
    }
  }

  function onClick() {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    atlas.setSheetDetent(nextSheetDetent(atlas.sheetDetent));
  }
</script>

<button
  type="button"
  class="sheet-handle"
  onclick={onClick}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={(event) => endDrag(event, true)}
  onpointercancel={(event) => endDrag(event, false)}
  aria-label={label}
>
  <span class="sheet-handle-bar" aria-hidden="true"></span>
</button>

<style>
  .sheet-handle {
    display: none;
  }

  @media (max-width: 959px) {
    .sheet-handle {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 28px;
      padding: 10px 0 6px;
      touch-action: none;
      cursor: grab;
    }

    .sheet-handle:active {
      cursor: grabbing;
    }

    .sheet-handle-bar {
      width: 38px;
      height: 4px;
      background: color-mix(in srgb, var(--ink-faint) 45%, var(--rule));
      border-radius: 999px;
      transition: background 0.15s ease, width 0.15s ease;
    }

    .sheet-handle:active .sheet-handle-bar {
      width: 46px;
      background: var(--ink-soft);
    }
  }
</style>
