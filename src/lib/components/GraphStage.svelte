<script lang="ts">
  import { onMount, onDestroy, untrack } from 'svelte';
  import {
    layoutData,
    RELATION_KINDS,
    RELATION_STYLE,
    relationKey,
    type Relation,
    type RelationKind,
    type Thinker,
  } from '../graph/model';
  import { desktopPanelClearance, sheetHeightPx, type SheetKind } from '../sheet';
  import { atlas } from '../state.svelte';
  import { eraColor, relationColor, withAlpha } from '../theme';
  import Icon from './Icon.svelte';

  type Transform = { x: number; y: number; k: number };
  type ViewportRect = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    cx: number;
    cy: number;
  };
  type NodeGeometry = { node: Thinker; index: number; x: number; y: number; r: number };
  type EdgeGeometry = {
    key: string;
    relation: Relation;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    highlighted: boolean;
    stroke: string;
    opacity: number;
    width: number;
    dash: string;
    arrow: boolean;
  };
  type LabelPlacement = {
    id: string;
    text: string;
    strong: boolean;
    boxX: number;
    boxY: number;
    boxW: number;
    boxH: number;
    textX: number;
    textY: number;
  };

  const baseThinkers = atlas.graph.thinkers;
  const indexById = new Map<string, number>(
    baseThinkers.map((thinker, index) => [thinker.id, index]),
  );

  function initPositions(): Float32Array {
    const byId = new Map(layoutData.nodes.map((node) => [node.id, node]));
    const next = new Float32Array(baseThinkers.length * 2);
    for (let i = 0; i < baseThinkers.length; i += 1) {
      const point = byId.get(baseThinkers[i]!.id);
      next[i * 2] = point?.x ?? layoutData.width * 0.5;
      next[i * 2 + 1] = point?.y ?? layoutData.height * 0.5;
    }
    return next;
  }

  function mixHex(hex: string, target: '#ffffff' | '#000000', t: number): string {
    const clean = hex.replace('#', '');
    const r = Number.parseInt(clean.slice(0, 2), 16);
    const g = Number.parseInt(clean.slice(2, 4), 16);
    const b = Number.parseInt(clean.slice(4, 6), 16);
    const end = target === '#ffffff' ? 255 : 0;
    const blend = (channel: number) => Math.round(channel + (end - channel) * t);
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(blend(r))}${toHex(blend(g))}${toHex(blend(b))}`;
  }

  let host = $state<HTMLDivElement>();
  let width = $state(1440);
  let height = $state(900);
  let positions = $state.raw<Float32Array>(initPositions());
  let transform = $state<Transform>({ x: 0, y: 0, k: 1 });
  let tip = $state<{ x: number; y: number; id: string } | null>(null);
  let draggingId = $state<string | null>(null);
  let ready = $state(false);

  let compact = $derived(width < 960);
  let palette = $derived(atlas.palette);

  const eraCount = layoutData.nodes.length ? atlas.graph.eras.length : 14;
  const guideXs = Array.from({ length: eraCount + 1 }, (_, i) => {
    const left = 62;
    const right = layoutData.width - 28;
    return left + (i * (right - left)) / eraCount;
  });

  let stoneGradients = $derived.by(() => {
    const mode = atlas.themeMode;
    const isDark = mode === 'dark';
    return atlas.graph.eras.map((_, i) => {
      const base = eraColor(i, mode);
      return {
        id: `era-stone-${i}`,
        sheen: mixHex(base, '#ffffff', isDark ? 0.34 : 0.4),
        body: base,
        shade: mixHex(base, '#000000', isDark ? 0.26 : 0.2),
        rim: mixHex(base, '#000000', isDark ? 0.44 : 0.34),
      };
    });
  });

  let activeEdgeColors = $derived.by(() => {
    const mode = atlas.themeMode;
    const isDark = mode === 'dark';
    const colors = {} as Record<RelationKind, string>;
    for (const kind of RELATION_KINDS) {
      const base = relationColor(kind, mode);
      colors[kind] = isDark ? mixHex(base, '#ffffff', 0.22) : base;
    }
    return colors;
  });

  let thread = $derived.by(() => ({
    keys: atlas.threadKeys,
    nodes: atlas.threadNodes,
    lineage: atlas.lineage,
    focus: atlas.focusId,
  }));

  let activeNodes = $derived.by(() => {
    const ids = new Set<string>();
    for (const relation of atlas.graph.relations) {
      if (!atlas.isRelationVisible(relation)) continue;
      ids.add(relation.source);
      ids.add(relation.target);
    }
    return ids;
  });

  let pathOrder = $derived.by(() => {
    const order = new Map<string, number>();
    thread.lineage?.thinkers.forEach((thinker, index) => order.set(thinker.id, index));
    return order;
  });

  let geometry = $derived.by((): NodeGeometry[] => {
    const p = positions;
    const graph = atlas.graph;
    return graph.thinkers.map((node, fallback) => {
      const index = indexById.get(node.id) ?? fallback;
      return {
        node,
        index,
        x: p[index * 2] ?? 0,
        y: p[index * 2 + 1] ?? 0,
        r: graph.nodeRadius(node.id),
      };
    });
  });

  function idleEdgeOpacity(kind: RelationKind, isDark: boolean): number {
    if (isDark) {
      if (kind === 'influences') return 0.11;
      if (kind === 'synthesizes') return 0.28;
      return 0.26;
    }
    if (kind === 'influences') return 0.14;
    if (kind === 'synthesizes') return 0.3;
    return 0.28;
  }

  let edges = $derived.by(() => {
    const p = positions;
    const graph = atlas.graph;
    const mode = atlas.themeMode;
    const currentPalette = atlas.palette;
    const hasThread = thread.focus !== null || thread.lineage !== null;
    const scale = transform.k;
    const regular: EdgeGeometry[] = [];
    const highlighted: EdgeGeometry[] = [];

    for (const relation of graph.relations) {
      if (!atlas.isRelationVisible(relation)) continue;
      const srcIdx = indexById.get(relation.source);
      const tgtIdx = indexById.get(relation.target);
      if (srcIdx === undefined || tgtIdx === undefined) continue;

      const sx = p[srcIdx * 2] ?? 0;
      const sy = p[srcIdx * 2 + 1] ?? 0;
      const tx = p[tgtIdx * 2] ?? 0;
      const ty = p[tgtIdx * 2 + 1] ?? 0;
      const dx = tx - sx;
      const dy = ty - sy;
      const dist = Math.hypot(dx, dy);
      if (dist < 2) continue;

      const startR = graph.nodeRadius(relation.source) + 2;
      const endR = graph.nodeRadius(relation.target) + 4.5;
      if (dist <= startR + endR) continue;

      const ux = dx / dist;
      const uy = dy / dist;
      const key = relationKey(relation);
      const isActive = hasThread && thread.keys.has(key);
      const dash = RELATION_STYLE[relation.kind].dash;

      if (hasThread) {
        if (isActive) {
          highlighted.push({
            key,
            relation,
            x1: sx + ux * startR,
            y1: sy + uy * startR,
            x2: tx - ux * endR,
            y2: ty - uy * endR,
            highlighted: true,
            stroke: activeEdgeColors[relation.kind],
            opacity: currentPalette.isDark ? 0.92 : 0.88,
            width: 1.65,
            dash,
            arrow: true,
          });
        } else {
          regular.push({
            key,
            relation,
            x1: sx + ux * startR,
            y1: sy + uy * startR,
            x2: tx - ux * endR,
            y2: ty - uy * endR,
            highlighted: false,
            stroke: currentPalette.dimEdge,
            opacity: currentPalette.dimEdgeAlpha,
            width: 0.7,
            dash,
            arrow: false,
          });
        }
      } else {
        regular.push({
          key,
          relation,
          x1: sx + ux * startR,
          y1: sy + uy * startR,
          x2: tx - ux * endR,
          y2: ty - uy * endR,
          highlighted: false,
          stroke: relationColor(relation.kind, mode),
          opacity: idleEdgeOpacity(relation.kind, currentPalette.isDark),
          width: relation.kind === 'influences' ? 0.75 : 0.95,
          dash,
          arrow: scale >= 1.55,
        });
      }
    }

    return { regular, highlighted };
  });

  function nodeOpacity(node: Thinker): number {
    if (!atlas.isEraVisible(node.eraIndex) && node.id !== thread.focus) {
      return atlas.anyEraVisible ? 0.06 : 0;
    }
    if ((thread.focus || thread.lineage) && !thread.nodes.has(node.id)) return 0.16;
    if (!activeNodes.has(node.id) && node.id !== thread.focus) return 0.18;
    return 1;
  }

  function visibleRect(): ViewportRect {
    if (atlas.graphFullscreen) {
      const left = 12;
      const top = 12;
      const right = Math.max(left + 1, width - 12);
      const bottom = Math.max(top + 1, height - 12);
      return {
        left,
        top,
        right,
        bottom,
        width: right - left,
        height: bottom - top,
        cx: (left + right) * 0.5,
        cy: (top + bottom) * 0.5,
      };
    }

    const left = 0;
    const top = compact ? 98 : 104;
    const right = Math.max(left + 1, compact ? width - 48 : width - desktopPanelClearance(width));
    let bottom = height - 68;
    if (compact) {
      const activeKind: SheetKind = atlas.pathMode
        ? 'trace'
        : atlas.selected
          ? 'detail'
          : 'intro';
      bottom = height - sheetHeightPx(activeKind, atlas.sheetDetent, height) - 12;
    }
    const clampedBottom = Math.max(top + 1, bottom);
    return {
      left,
      top,
      right,
      bottom: clampedBottom,
      width: right - left,
      height: clampedBottom - top,
      cx: (left + right) * 0.5,
      cy: (top + clampedBottom) * 0.5,
    };
  }

  function textWidth(text: string, size: number): number {
    let total = 0;
    for (const char of text) {
      total += /[\u3000-\u9fff\uff00-\uffef]/.test(char) ? size : size * 0.56;
    }
    return total;
  }

  let labels = $derived.by((): LabelPlacement[] => {
    const graph = atlas.graph;
    const scale = transform.k;
    const rect = visibleRect();
    const placed: LabelPlacement[] = [];
    const boxes: [number, number, number, number][] = [];

    const focusedLabels = new Set<string>();
    if (thread.lineage) {
      for (const thinker of thread.lineage.thinkers) focusedLabels.add(thinker.id);
    } else if (thread.focus) {
      focusedLabels.add(thread.focus);
      const ranked = [...thread.nodes]
        .filter((id) => id !== thread.focus)
        .map((id) => graph.byId.get(id))
        .filter((thinker): thinker is Thinker => thinker !== undefined)
        .sort((a, b) => (graph.degree.get(b.id) ?? 0) - (graph.degree.get(a.id) ?? 0))
        .slice(0, 20);
      for (const thinker of ranked) focusedLabels.add(thinker.id);
    }

    const candidates = geometry
      .filter((entry) => atlas.isEraVisible(entry.node.eraIndex))
      .map((entry) => {
        const strong =
          entry.node.id === atlas.selectedId ||
          entry.node.id === atlas.hoveredId ||
          pathOrder.has(entry.node.id);
        let priority = graph.degree.get(entry.node.id) ?? 0;
        if (entry.node.id === atlas.selectedId) priority += 10000;
        if (entry.node.id === atlas.hoveredId) priority += 9000;
        if (pathOrder.has(entry.node.id)) priority += 8000;
        return { entry, strong, priority };
      })
      .filter(({ entry, strong }) => {
        const isDragged = entry.node.id === draggingId;
        if (draggingId && !strong && !isDragged) return false;
        if (strong || isDragged) return true;
        if (thread.focus || thread.lineage) return focusedLabels.has(entry.node.id);
        if (!activeNodes.has(entry.node.id)) return false;
        const degree = graph.degree.get(entry.node.id) ?? 0;
        if (scale >= 1.55) return degree >= 1;
        if (scale >= 1.05) return degree >= 3;
        if (scale >= 0.65) return degree >= 6;
        return degree >= 14;
      })
      .sort((a, b) => b.priority - a.priority);

    const minX = rect.left + 6;
    const maxX = rect.right - 6;
    const minY = rect.top + 4;
    const maxY = rect.bottom - 4;
    const padX = 4.5;
    const padY = 2;
    const gap = 6;
    const sep = 3;

    for (const { entry, strong } of candidates) {
      const sx = entry.x * scale + transform.x;
      const sy = entry.y * scale + transform.y;
      const r = entry.r * scale;
      if (sx < rect.left - 44 || sx > rect.right + 44 || sy < rect.top - 44 || sy > rect.bottom + 44) {
        continue;
      }

      const fontSize = strong ? 12 : 11;
      const labelW = textWidth(entry.node.name, fontSize);
      const labelH = fontSize + 2;
      const boxW = labelW + padX * 2;
      const boxH = labelH + padY * 2;

      const slots: [number, number][] = [
        [sx - boxW * 0.5, sy - r - gap - boxH],
        [sx - boxW * 0.5, sy + r + gap],
        [sx + r + gap, sy - boxH * 0.5],
        [sx - r - gap - boxW, sy - boxH * 0.5],
      ];

      let chosen: [number, number] | null = null;
      for (const [bl, bt] of slots) {
        const br = bl + boxW;
        const bb = bt + boxH;
        if (bl < minX || br > maxX || bt < minY || bb > maxY) continue;
        const collides = boxes.some(
          ([ox1, oy1, ox2, oy2]) =>
            !(br + sep < ox1 || bl - sep > ox2 || bb + sep < oy1 || bt - sep > oy2),
        );
        if (!collides) {
          chosen = [bl, bt];
          break;
        }
      }

      if (!chosen) {
        if (!strong) continue;
        const clampedX = Math.max(minX, Math.min(sx - boxW * 0.5, Math.max(minX, maxX - boxW)));
        const clampedY = Math.max(minY, Math.min(sy - r - gap - boxH, Math.max(minY, maxY - boxH)));
        chosen = [clampedX, clampedY];
      }

      const [boxX, boxY] = chosen;
      boxes.push([boxX, boxY, boxX + boxW, boxY + boxH]);
      placed.push({
        id: entry.node.id,
        text: entry.node.name,
        strong,
        boxX,
        boxY,
        boxW,
        boxH,
        textX: boxX + boxW * 0.5,
        textY: boxY + boxH * 0.5,
      });
    }

    return placed;
  });

  let tipNode = $derived(tip ? (atlas.graph.byId.get(tip.id) ?? null) : null);

  function toScreen(x: number, y: number) {
    return { x: x * transform.k + transform.x, y: y * transform.k + transform.y };
  }

  function showTip(event: PointerEvent, entry: NodeGeometry) {
    if (event.pointerType === 'touch' || drag || pan) return;
    const rect = host?.getBoundingClientRect();
    if (!rect) return;
    const p = toScreen(entry.x, entry.y);
    tip = {
      id: entry.node.id,
      x: Math.max(14, Math.min(p.x + 18, rect.width - 286)),
      y: Math.max(78, Math.min(p.y - 18, rect.height - 158)),
    };
  }

  function enterNode(event: PointerEvent, entry: NodeGeometry) {
    if (event.pointerType === 'touch' || drag || pan) return;
    atlas.hover(entry.node.id);
    showTip(event, entry);
  }

  function leaveNode() {
    atlas.hover(null);
    tip = null;
  }

  let drag: { id: string; index: number; startX: number; startY: number; moved: boolean } | null =
    null;
  let pan: { x: number; y: number; tx: number; ty: number; moved: boolean } | null = null;
  let pinch: { distance: number; k: number; wx: number; wy: number } | null = null;
  const activePointers = new Map<number, { x: number; y: number }>();

  function beginNode(event: PointerEvent, entry: NodeGeometry) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    cancelAnimationFrame(flyFrame);
    event.stopPropagation();
    tip = null;
    host?.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    drag = {
      id: entry.node.id,
      index: entry.index,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
  }

  function beginPan(event: PointerEvent) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    if ((event.target as Element | null)?.closest('button, .controls')) return;
    cancelAnimationFrame(flyFrame);
    tip = null;
    host?.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    pan = { x: event.clientX, y: event.clientY, tx: transform.x, ty: transform.y, moved: false };
  }

  function onPointerMove(event: PointerEvent) {
    if (activePointers.has(event.pointerId)) {
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (activePointers.size === 2 && host) {
      const [a, b] = [...activePointers.values()];
      const distance = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      const cx = (a!.x + b!.x) / 2;
      const cy = (a!.y + b!.y) / 2;
      if (!pinch) {
        const rect = host.getBoundingClientRect();
        const localX = cx - rect.left;
        const localY = cy - rect.top;
        pinch = {
          distance,
          k: transform.k,
          wx: (localX - transform.x) / transform.k,
          wy: (localY - transform.y) / transform.k,
        };
        drag = null;
        draggingId = null;
        pan = null;
      } else {
        const ratio = distance / (pinch.distance || 1);
        const nextK = Math.min(3.5, Math.max(0.32, pinch.k * ratio));
        const rect = host.getBoundingClientRect();
        const localX = cx - rect.left;
        const localY = cy - rect.top;
        transform = {
          k: nextK,
          x: localX - pinch.wx * nextK,
          y: localY - pinch.wy * nextK,
        };
      }
      return;
    }

    if (drag) {
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (Math.hypot(dx, dy) > 3) {
        drag.moved = true;
        draggingId = drag.id;
        tip = null;
      }
      const rect = host?.getBoundingClientRect();
      if (!rect) return;
      const next = positions.slice();
      next[drag.index * 2] = (event.clientX - rect.left - transform.x) / transform.k;
      next[drag.index * 2 + 1] = (event.clientY - rect.top - transform.y) / transform.k;
      positions = next;
      return;
    }

    if (pan) {
      const dx = event.clientX - pan.x;
      const dy = event.clientY - pan.y;
      if (Math.hypot(dx, dy) > 3) pan.moved = true;
      transform = { ...transform, x: pan.tx + dx, y: pan.ty + dy };
    }
  }

  function endPointer(event: PointerEvent) {
    activePointers.delete(event.pointerId);
    if (activePointers.size < 2) pinch = null;
    if (drag) {
      if (!drag.moved) atlas.select(drag.id);
      drag = null;
      draggingId = null;
    }
    if (pan) {
      if (!pan.moved && !atlas.pathMode) atlas.clearSelection();
      pan = null;
    }
    tip = null;
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    cancelAnimationFrame(flyFrame);
    const rect = host?.getBoundingClientRect();
    if (!rect) return;
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const factor = Math.exp(-event.deltaY * 0.0016);
    const nextK = Math.min(3.5, Math.max(0.32, transform.k * factor));
    const wx = (localX - transform.x) / transform.k;
    const wy = (localY - transform.y) / transform.k;
    transform = { k: nextK, x: localX - wx * nextK, y: localY - wy * nextK };
  }

  function zoomBy(factor: number) {
    const rect = visibleRect();
    const nextK = Math.min(3.5, Math.max(0.32, transform.k * factor));
    const wx = (rect.cx - transform.x) / transform.k;
    const wy = (rect.cy - transform.y) / transform.k;
    transform = { k: nextK, x: rect.cx - wx * nextK, y: rect.cy - wy * nextK };
  }

  function fitPoints(
    points: { x: number; y: number }[],
    rect: ViewportRect,
    maxK = 1.6,
    pad = 48,
  ): Transform {
    if (!points.length) return transform;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const pt of points) {
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
    }
    const spanX = Math.max(1, maxX - minX);
    const spanY = Math.max(1, maxY - minY);
    const availW = Math.max(32, rect.width - pad * 2);
    const availH = Math.max(32, rect.height - pad * 2);
    const k = Math.min(maxK, Math.max(0.32, Math.min(availW / spanX, availH / spanY)));
    const centerX = (minX + maxX) * 0.5;
    const centerY = (minY + maxY) * 0.5;
    return {
      k,
      x: rect.cx - centerX * k,
      y: rect.cy - centerY * k,
    };
  }

  function visiblePoints(): { x: number; y: number }[] {
    return geometry
      .filter((entry) => atlas.isEraVisible(entry.node.eraIndex))
      .map((entry) => ({ x: entry.x, y: entry.y }));
  }

  function fit() {
    const points = visiblePoints();
    if (!points.length) return;
    flyTo(fitPoints(points, visibleRect(), 1.6, 48), 320);
  }

  let flyFrame = 0;

  function flyTo(target: Transform, duration = 420) {
    cancelAnimationFrame(flyFrame);
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      transform = target;
      return;
    }
    const start = { ...transform };
    const begun = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - begun) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      transform = {
        x: start.x + (target.x - start.x) * eased,
        y: start.y + (target.y - start.y) * eased,
        k: start.k + (target.k - start.k) * eased,
      };
      if (progress < 1) flyFrame = requestAnimationFrame(step);
    };
    flyFrame = requestAnimationFrame(step);
  }

  let wasFullscreen = false;
  let savedTransform: Transform | null = null;

  $effect(() => {
    const fullscreen = atlas.graphFullscreen;
    if (!ready || fullscreen === wasFullscreen) return;
    wasFullscreen = fullscreen;
    if (fullscreen) {
      savedTransform = untrack(() => ({ ...transform }));
      const rect = visibleRect();
      const lineage = atlas.lineage;
      if (lineage && lineage.steps.length > 0) {
        const points = lineage.thinkers
          .map((thinker) => geometry.find((entry) => entry.node.id === thinker.id))
          .filter((entry): entry is NodeGeometry => entry !== undefined)
          .map((entry) => ({ x: entry.x, y: entry.y }));
        flyTo(fitPoints(points, rect, 1.5, 56), 360);
      } else {
        flyTo(fitPoints(visiblePoints(), rect, 1.6, 48), 360);
      }
    } else {
      if (savedTransform) {
        flyTo(savedTransform, 360);
        savedTransform = null;
      }
    }
  });

  $effect(() => {
    if (!ready || atlas.graphFullscreen) return;
    const rect = visibleRect();
    const lineage = atlas.lineage;

    if (lineage && lineage.steps.length > 0) {
      const points = lineage.thinkers
        .map((thinker) => geometry.find((entry) => entry.node.id === thinker.id))
        .filter((entry): entry is NodeGeometry => entry !== undefined)
        .map((entry) => ({ x: entry.x, y: entry.y }));
      if (points.length > 1) {
        flyTo(fitPoints(points, rect, 1.45, 56));
      }
      return;
    }

    const id = atlas.selectedId;
    if (!id) return;
    const entry = geometry.find((candidate) => candidate.node.id === id);
    if (!entry) return;
    const current = untrack(() => transform);
    const sx = entry.x * current.k + current.x;
    const sy = entry.y * current.k + current.y;
    const margin = 48;
    if (
      sx > rect.left + margin &&
      sx < rect.right - margin &&
      sy > rect.top + margin &&
      sy < rect.bottom - margin
    ) {
      return;
    }
    const k = Math.max(current.k, compact ? 0.58 : 0.85);
    flyTo({
      k,
      x: rect.cx - entry.x * k,
      y: rect.cy - entry.y * k,
    });
  });

  function applyInitialView() {
    if (!width || !height || ready) return;
    const rect = visibleRect();
    if (compact) {
      const k = 0.56;
      transform = {
        x: (width - layoutData.width * k) * 0.5,
        y: rect.cy - layoutData.height * 0.5 * k,
        k,
      };
    } else {
      transform = fitPoints(visiblePoints(), rect, 1.2, 48);
    }
    ready = true;
  }

  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box || !box.width || !box.height) return;
      width = box.width;
      height = box.height;
      applyInitialView();
    });
    if (host) {
      observer.observe(host);
      const rect = host.getBoundingClientRect();
      if (rect.width && rect.height) {
        width = rect.width;
        height = rect.height;
        applyInitialView();
      }
    }
    host?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      observer.disconnect();
      host?.removeEventListener('wheel', onWheel);
    };
  });

  onDestroy(() => {
    cancelAnimationFrame(flyFrame);
  });
</script>

<div
  class="stage"
  bind:this={host}
  onpointerdown={beginPan}
  onpointermove={onPointerMove}
  onpointerup={endPointer}
  onpointercancel={endPointer}
  role="presentation"
>
  <svg
    {width}
    {height}
    class:ready
    aria-label={atlas.strings.graphDescription(atlas.totals.thinkers, atlas.totals.relations)}
  >
    <defs>
      {#each stoneGradients as stone (stone.id)}
        <radialGradient id={stone.id} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color={stone.sheen} />
          <stop offset="36%" stop-color={stone.body} />
          <stop offset="78%" stop-color={stone.shade} />
          <stop offset="100%" stop-color={stone.rim} />
        </radialGradient>
      {/each}

      <radialGradient id="stone-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#000000" stop-opacity={palette.isDark ? 0.55 : 0.26} />
        <stop offset="68%" stop-color="#000000" stop-opacity={palette.isDark ? 0.22 : 0.1} />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      {#each RELATION_KINDS as kind (kind)}
        <marker
          id={`arrow-${kind}`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0.6 0.8 L7.4 4 L0.6 7.2 Z" fill={activeEdgeColors[kind]} />
        </marker>
      {/each}
    </defs>

    <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
      <g class="guides" pointer-events="none">
        {#each guideXs as gx (gx)}
          <line
            x1={gx}
            y1={0}
            x2={gx}
            y2={layoutData.height}
            stroke={palette.canvasGuide}
            stroke-opacity={palette.isDark ? 0.45 : 0.65}
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
        {/each}
      </g>

      <g class="edges">
        {#each edges.regular as edge (edge.key)}
          <line
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={edge.stroke}
            stroke-width={edge.width}
            stroke-dasharray={edge.dash || undefined}
            stroke-opacity={edge.opacity}
            stroke-linecap="round"
            marker-end={edge.arrow ? `url(#arrow-${edge.relation.kind})` : undefined}
          />
        {/each}
        {#each edges.highlighted as edge (edge.key)}
          <line
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={edge.stroke}
            stroke-width={edge.width}
            stroke-dasharray={edge.dash || undefined}
            stroke-opacity={edge.opacity}
            stroke-linecap="round"
            marker-end={edge.arrow ? `url(#arrow-${edge.relation.kind})` : undefined}
          />
        {/each}
      </g>

      <g class="nodes">
        {#each geometry as entry (entry.node.id)}
          {@const opacity = nodeOpacity(entry.node)}
          {@const selected = atlas.selectedId === entry.node.id}
          {@const order = pathOrder.get(entry.node.id)}
          <g
            class="node"
            class:selected
            data-id={entry.node.id}
            data-era={entry.node.era}
            data-era-index={entry.node.eraIndex}
            transform={`translate(${entry.x} ${entry.y})`}
            {opacity}
            pointer-events={atlas.isEraVisible(entry.node.eraIndex) ? 'auto' : 'none'}
            role="button"
            tabindex="0"
            aria-label={`${entry.node.name}, ${entry.node.era}`}
            onpointerdown={(event) => beginNode(event, entry)}
            onpointerenter={(event) => enterNode(event, entry)}
            onpointermove={(event) => showTip(event, entry)}
            onpointerleave={leaveNode}
            onkeydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                atlas.select(entry.node.id);
              }
            }}
          >
            <circle class="hit" r={Math.max(entry.r + 5, 16 / transform.k)} fill="transparent" />
            {#if opacity > 0.35}
              <circle
                cx={entry.r * 0.1}
                cy={entry.r * 0.24}
                r={entry.r * 1.18}
                fill="url(#stone-shadow)"
                pointer-events="none"
              />
            {/if}
            {#if selected || order !== undefined}
              <circle
                r={entry.r + 4.2}
                fill="none"
                stroke={order !== undefined ? palette.seal : palette.canvasInk}
                stroke-width="1.3"
                opacity="0.88"
                pointer-events="none"
              />
            {/if}
            <circle
              r={entry.r}
              fill={`url(#era-stone-${entry.node.eraIndex})`}
              stroke={palette.isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.12)'}
              stroke-width="0.7"
            />
            {#if order !== undefined}
              <g transform={`translate(${entry.r + 8.5} ${entry.r + 2.5})`} pointer-events="none">
                <circle r="7.8" fill={palette.seal} stroke={palette.canvas} stroke-width="1.2" />
                <text class="path-index" text-anchor="middle" dominant-baseline="central" y="0.3">
                  {order + 1}
                </text>
              </g>
            {/if}
          </g>
        {/each}
      </g>
    </g>

    <g class="labels" aria-hidden="true">
      {#each labels as label (label.id)}
        <g
          class="label-item"
          role="button"
          tabindex="-1"
          onpointerdown={(event) => {
            event.stopPropagation();
            tip = null;
            atlas.hover(null);
            atlas.select(label.id);
          }}
        >
          <rect
            x={label.boxX}
            y={label.boxY}
            width={label.boxW}
            height={label.boxH}
            rx="3"
            fill={palette.labelBg}
            fill-opacity={label.strong ? 0.88 : 0.78}
          />
          <text
            x={label.textX}
            y={label.textY}
            text-anchor="middle"
            dominant-baseline="central"
            class="label"
            class:label-strong={label.strong}
            fill={label.strong ? palette.labelTextStrong : palette.labelText}
          >
            {label.text}
          </text>
        </g>
      {/each}
    </g>
  </svg>

  {#if tip && tipNode}
    {@const accent = eraColor(tipNode.eraIndex, atlas.themeMode)}
    {@const bioLimit = atlas.language === 'en' ? 110 : 74}
    <div class="tip" style={`left:${tip.x}px; top:${tip.y}px`}>
      <div class="tip-era" style={`color:${accent}`}>
        <span class="tip-dot" style={`background:${accent}`}></span>
        {tipNode.era}
      </div>
      <div class="tip-name">{tipNode.name}</div>
      {#if tipNode.nameEn && tipNode.nameEn !== tipNode.name}
        <div class="tip-en">{tipNode.nameEn}</div>
      {/if}
      <p class="tip-bio">
        {tipNode.bio.slice(0, bioLimit)}{tipNode.bio.length > bioLimit ? '…' : ''}
      </p>
    </div>
  {/if}

  <div
    class="controls"
    class:fullscreen={atlas.graphFullscreen}
    style={`background:${withAlpha(palette.canvasSurface, 0.9)}`}
  >
    <button type="button" onclick={() => zoomBy(1.32)} aria-label={atlas.strings.zoomIn}>
      <Icon name="plus" size={15} />
    </button>
    <button type="button" onclick={() => zoomBy(0.76)} aria-label={atlas.strings.zoomOut}>
      <Icon name="minus" size={15} />
    </button>
    <button type="button" onclick={fit} aria-label={atlas.strings.fit}>
      <Icon name="fit" size={15} />
    </button>
    <button
      type="button"
      onclick={() => atlas.toggleFullscreen()}
      aria-label={atlas.graphFullscreen ? atlas.strings.exitFullscreen : atlas.strings.fullscreen}
    >
      <Icon name={atlas.graphFullscreen ? 'exit-fullscreen' : 'fullscreen'} size={15} />
    </button>
  </div>
</div>

<style>
  .stage {
    position: fixed;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    touch-action: none;
    cursor: grab;
    background: var(--canvas);
  }

  .stage:active {
    cursor: grabbing;
  }

  svg {
    display: block;
    opacity: 0;
    transition: opacity 0.45s var(--ease);
  }

  svg.ready {
    opacity: 1;
  }

  .node {
    cursor: pointer;
    transition: opacity 0.24s ease;
  }

  .labels {
    pointer-events: none;
  }

  .label-item {
    pointer-events: auto;
    cursor: pointer;
  }

  .label {
    font-family: var(--font-serif);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.02em;
    user-select: none;
  }

  .label-strong {
    font-size: 12px;
    font-weight: 600;
  }

  .path-index {
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 700;
    fill: #ffffff;
  }

  .tip {
    position: absolute;
    z-index: 5;
    width: 268px;
    padding: 14px 16px 15px;
    pointer-events: none;
    color: var(--ink);
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: 4px;
    box-shadow: var(--panel-shadow);
    animation: fade-in 0.14s ease;
  }

  .tip-era {
    display: flex;
    gap: 6px;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
  }

  .tip-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .tip-name {
    margin-top: 6px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--ink);
  }

  .tip-en {
    margin-top: 1px;
    font-family: var(--font-latin);
    font-size: 13px;
    font-style: italic;
    color: var(--ink-faint);
  }

  .tip-bio {
    margin: 8px 0 0;
    font-size: 12px;
    line-height: 1.65;
    color: var(--ink-soft);
  }

  .controls {
    position: absolute;
    bottom: 66px;
    left: 22px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--rule);
    border-radius: 4px;
    box-shadow: var(--surface-shadow);
    backdrop-filter: blur(8px);
  }

  .controls.fullscreen {
    top: 16px;
    right: 16px;
    bottom: auto;
    left: auto;
  }

  .controls button {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    color: var(--canvas-ink-soft);
    border-bottom: 1px solid var(--rule);
    transition: color 0.15s ease, background 0.15s ease;
  }

  .controls button:last-child {
    border-bottom: 0;
  }

  .controls button:hover {
    color: var(--canvas-ink);
    background: var(--canvas-deep);
  }

  @media (max-width: 959px) {
    .controls {
      top: calc(106px + env(safe-area-inset-top));
      right: 12px;
      bottom: auto;
      left: auto;
    }

    .controls.fullscreen {
      top: calc(16px + env(safe-area-inset-top));
      right: 16px;
    }

    .controls button {
      width: 36px;
      height: 36px;
    }

    .tip {
      width: 232px;
    }
  }
</style>
