<script lang="ts">
  import { onMount, onDestroy, untrack } from 'svelte';
  import {
    forceCollide,
    forceLink,
    forceManyBody,
    forceSimulation,
    forceX,
    forceY,
    type SimulationLinkDatum,
    type SimulationNodeDatum,
  } from 'd3-force';
  import graph, { RELATION_META, type Relation, type Thinker } from '../graph/model';
  import { atlas } from '../state.svelte';
  import { eraColor, withAlpha } from '../theme';
  import Icon from './Icon.svelte';

  type SimNode = Thinker & SimulationNodeDatum & { index: number };
  type SimLink = SimulationLinkDatum<SimNode> & { key: string; relation: Relation };

  const ERA_COUNT = graph.eras.length;
  const TOP = 158;
  const BOTTOM = 118;

  let host = $state<HTMLDivElement>();
  let width = $state(1440);
  let height = $state(900);
  let nodes = $state.raw<SimNode[]>([]);
  let links = $state.raw<SimLink[]>([]);
  let positions = $state.raw<Float32Array>(new Float32Array(0));
  let transform = $state({ x: 0, y: 0, k: 1 });
  let tip = $state<{ x: number; y: number; node: Thinker } | null>(null);
  let ready = $state(false);

  let layoutWidth = 1440;
  let layoutHeight = 900;
  let mobile = false;

  const radius = (node: Thinker) =>
    3.2 +
    Math.sqrt(graph.descendants.get(node.id) ?? 0) * 1.75 +
    Math.sqrt(graph.ancestors.get(node.id) ?? 0) * 0.55;

  const columnX = (eraIndex: number) => {
    const left = 62;
    const right = layoutWidth - 28;
    return left + ((eraIndex + 0.5) * (right - left)) / ERA_COUNT;
  };

  function hashRandom(id: string, salt: number): number {
    let h = 2166136261 ^ salt;
    for (let i = 0; i < id.length; i += 1) {
      h ^= id.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 100000) / 100000;
  }

  function layout() {
    if (!width || !height) return;
    mobile = width < 900;
    layoutWidth = mobile ? 1020 : Math.max(720, width - 436);
    layoutHeight = height;

    const top = TOP;
    const bottom = layoutHeight - BOTTOM;
    const span = Math.max(280, bottom - top);

    const nextNodes: SimNode[] = graph.thinkers.map((thinker, index) => {
      const jitter = hashRandom(thinker.id, 7) - 0.5;
      return {
        ...thinker,
        index,
        x: columnX(thinker.eraIndex) + jitter * 26,
        y: top + span * (0.16 + hashRandom(thinker.id, 13) * 0.68),
      };
    });

    const nextLinks: SimLink[] = graph.relations.map((relation) => ({
      key: `${relation.source}|${relation.target}`,
      source: relation.source,
      target: relation.target,
      relation,
    }));

    const eraBuckets = new Map<number, SimNode[]>();
    for (const node of nextNodes) {
      const bucket = eraBuckets.get(node.eraIndex) ?? [];
      bucket.push(node);
      eraBuckets.set(node.eraIndex, bucket);
    }
    const ySlots = new Map<string, number>();
    for (const bucket of eraBuckets.values()) {
      bucket.sort((a, b) => (a.birthYear ?? 0) - (b.birthYear ?? 0));
      bucket.forEach((node, rank) => {
        const slot = bucket.length === 1 ? 0.5 : rank / (bucket.length - 1);
        ySlots.set(node.id, top + span * (0.1 + slot * 0.8));
      });
    }
    const yTarget = (node: SimNode) => ySlots.get(node.id) ?? top + span * 0.5;

    const simulation = forceSimulation(nextNodes)
      .force(
        'link',
        forceLink<SimNode, SimLink>(nextLinks)
          .id((node) => node.id)
          .distance((link) => {
            const source = link.source as SimNode;
            const target = link.target as SimNode;
            return source.eraIndex === target.eraIndex ? 46 : 104;
          })
          .strength((link) => {
            const source = link.source as SimNode;
            const target = link.target as SimNode;
            return source.eraIndex === target.eraIndex ? 0.16 : 0.08;
          }),
      )
      .force('charge', forceManyBody<SimNode>().strength(-52).distanceMax(320))
      .force('collide', forceCollide<SimNode>((node) => radius(node) + 7).iterations(2))
      .force('x', forceX<SimNode>((node) => columnX(node.eraIndex)).strength(0.22))
      .force('y', forceY<SimNode>(yTarget).strength(0.055))
      .stop();

    for (let i = 0; i < 380; i += 1) simulation.tick();

    nodes = nextNodes;
    links = nextLinks;
    publish();

    if (mobile) {
      const scale = 0.55;
      const visibleHeight = height * 0.53;
      transform = {
        x: (width - layoutWidth * scale) / 2,
        y: visibleHeight * 0.52 - layoutHeight * 0.5 * scale,
        k: scale,
      };
    } else {
      transform = { x: 0, y: 0, k: 1 };
    }
    ready = true;
  }

  function publish() {
    const next = new Float32Array(nodes.length * 2);
    for (let i = 0; i < nodes.length; i += 1) {
      next[i * 2] = nodes[i]!.x ?? 0;
      next[i * 2 + 1] = nodes[i]!.y ?? 0;
    }
    positions = next;
  }

  let thread = $derived.by(() => ({
    keys: atlas.threadKeys,
    nodes: atlas.threadNodes,
    lineage: atlas.lineage,
    focus: atlas.focusId,
  }));

  let activeNodes = $derived.by(() => {
    const ids = new Set<string>();
    for (const relation of graph.relations) {
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

  let geometry = $derived.by(() => {
    const p = positions;
    return nodes.map((node, index) => ({
      node,
      x: p[index * 2] ?? 0,
      y: p[index * 2 + 1] ?? 0,
      r: radius(node),
    }));
  });

  let edges = $derived.by(() => {
    const p = positions;
    if (!p.length) return [];
    return links.map((link) => {
      const source = link.source as SimNode;
      const target = link.target as SimNode;
      const sx = p[source.index * 2] ?? 0;
      const sy = p[source.index * 2 + 1] ?? 0;
      const tx = p[target.index * 2] ?? 0;
      const ty = p[target.index * 2 + 1] ?? 0;
      const dx = tx - sx;
      const dy = ty - sy;
      const distance = Math.hypot(dx, dy) || 1;
      const sr = radius(source) + 2;
      const tr = radius(target) + 5;
      return {
        key: link.key,
        relation: link.relation,
        x1: sx + (dx / distance) * sr,
        y1: sy + (dy / distance) * sr,
        x2: tx - (dx / distance) * tr,
        y2: ty - (dy / distance) * tr,
      };
    });
  });

  function nodeOpacity(node: Thinker): number {
    if (!atlas.isEraVisible(node.era)) return 0.04;
    if (!activeNodes.has(node.id) && node.id !== atlas.selectedId) return 0.16;
    if ((thread.focus || thread.lineage) && !thread.nodes.has(node.id)) return 0.16;
    return 1;
  }

  function edgeStyle(relation: Relation) {
    const meta = RELATION_META[relation.kind];
    const visible = atlas.isRelationVisible(relation);
    if (!visible) return { stroke: meta.color, opacity: 0, width: 1, dash: meta.dash, arrow: false };
    if (thread.keys.size) {
      const active = thread.keys.has(`${relation.source}|${relation.target}`);
      return {
        stroke: active ? '#e9dfcd' : '#8d857a',
        opacity: active ? 0.95 : 0.035,
        width: active ? 1.7 : 0.8,
        dash: active ? '' : meta.dash,
        arrow: active,
      };
    }
    return {
      stroke: meta.color,
      opacity: relation.kind === 'refutes' ? 0.26 : relation.kind === 'influences' ? 0.12 : 0.19,
      width: relation.kind === 'refutes' ? 1 : 0.85,
      dash: meta.dash,
      arrow: transform.k >= 1.55,
    };
  }

  function textWidth(text: string, size: number): number {
    let width = 0;
    for (const char of text) {
      width += /[\u3000-\u9fff\uff00-\uffef]/.test(char) ? size : size * 0.58;
    }
    return width;
  }

  /** Labels are laid out in screen space so they keep a readable size at any zoom. */
  let labels = $derived.by(() => {
    const placed: {
      id: string;
      x: number;
      y: number;
      anchor: 'middle' | 'start' | 'end';
      strong: boolean;
      text: string;
    }[] = [];
    const boxes: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const scale = transform.k;

    const focusedLabels = new Set<string>();
    if (thread.lineage) {
      for (const thinker of thread.lineage.thinkers) focusedLabels.add(thinker.id);
    } else if (thread.focus) {
      focusedLabels.add(thread.focus);
      const ranked = [...thread.nodes]
        .filter((id) => id !== thread.focus)
        .map((id) => graph.byId.get(id))
        .filter((thinker) => thinker !== undefined)
        .sort(
          (a, b) => (graph.degree.get(b.id) ?? 0) - (graph.degree.get(a.id) ?? 0),
        )
        .slice(0, 22);
      for (const thinker of ranked) focusedLabels.add(thinker.id);
    }

    const candidates = geometry
      .filter((entry) => atlas.isEraVisible(entry.node.era))
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
        if (strong) return true;
        if (thread.focus || thread.lineage) return focusedLabels.has(entry.node.id);
        if (!activeNodes.has(entry.node.id)) return false;
        const degree = graph.degree.get(entry.node.id) ?? 0;
        if (scale >= 1.55) return degree >= 1;
        if (scale >= 1.05) return degree >= 3;
        if (scale >= 0.65) return degree >= 6;
        return degree >= 14;
      })
      .sort((a, b) => b.priority - a.priority);

    for (const { entry, strong } of candidates) {
      const x = entry.x * scale + transform.x;
      const y = entry.y * scale + transform.y;
      const r = entry.r * scale;
      const size = strong ? 12 : 11;
      const width = textWidth(entry.node.name, size);
      const height = size + 3;
      const gap = 6;
      const minLabelY = mobile ? 96 : 104;
      const minLabelX = 6;
      const maxLabelX = viewWidth() - 6;
      const options: { x: number; y: number; anchor: 'middle' | 'start' | 'end'; box: [number, number, number, number] }[] = [
        { x, y: y - r - gap, anchor: 'middle', box: [x - width / 2, y - r - gap - height, x + width / 2, y - r - gap] },
        { x, y: y + r + gap + height, anchor: 'middle', box: [x - width / 2, y + r + gap, x + width / 2, y + r + gap + height] },
        { x: x + r + 5, y: y + 3.5, anchor: 'start', box: [x + r + 5, y - height / 2, x + r + 5 + width, y + height / 2] },
        { x: x - r - 5, y: y + 3.5, anchor: 'end', box: [x - r - 5 - width, y - height / 2, x - r - 5, y + height / 2] },
      ];

      const option = options.find((candidate) => {
        const [x1, y1, x2, y2] = candidate.box;
        if (y1 < minLabelY || x1 < minLabelX || x2 > maxLabelX) return false;
        return boxes.every((box) => x2 + 2 < box.x1 || x1 - 2 > box.x2 || y2 + 2 < box.y1 || y1 - 2 > box.y2);
      });
      if (!option && !strong) continue;
      const chosen = option ?? options[0]!;
      boxes.push({
        x1: chosen.box[0],
        y1: chosen.box[1],
        x2: chosen.box[2],
        y2: chosen.box[3],
      });
      placed.push({
        id: entry.node.id,
        x: chosen.x,
        y: chosen.y,
        anchor: chosen.anchor,
        strong,
        text: entry.node.name,
      });
    }
    return placed;
  });

  function toScreen(x: number, y: number) {
    return { x: x * transform.k + transform.x, y: y * transform.k + transform.y };
  }

  function showTip(event: PointerEvent, node: SimNode) {
    const rect = host?.getBoundingClientRect();
    if (!rect) return;
    const p = toScreen(node.x ?? 0, node.y ?? 0);
    tip = {
      node,
      x: Math.max(14, Math.min(p.x + 18, rect.width - 286)),
      y: Math.max(78, Math.min(p.y - 18, rect.height - 158)),
    };
  }

  function enterNode(event: PointerEvent, node: SimNode) {
    atlas.hover(node.id);
    showTip(event, node);
  }

  function leaveNode() {
    atlas.hover(null);
    tip = null;
  }

  let drag: { node: SimNode; startX: number; startY: number; moved: boolean } | null = null;
  let pan: { x: number; y: number; tx: number; ty: number; moved: boolean } | null = null;
  let pinch: { distance: number; k: number; wx: number; wy: number } | null = null;
  const activePointers = new Map<number, { x: number; y: number }>();

  function beginNode(event: PointerEvent, node: SimNode) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    cancelAnimationFrame(flyFrame);
    event.stopPropagation();
    host?.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    drag = { node, startX: event.clientX, startY: event.clientY, moved: false };
  }

  function beginPan(event: PointerEvent) {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    cancelAnimationFrame(flyFrame);
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
        pan = null;
      } else {
        const ratio = distance / (pinch.distance || 1);
        const nextK = Math.min(3.5, Math.max(0.35, pinch.k * ratio));
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
      if (Math.hypot(dx, dy) > 3) drag.moved = true;
      const rect = host?.getBoundingClientRect();
      if (!rect) return;
      drag.node.x = (event.clientX - rect.left - transform.x) / transform.k;
      drag.node.y = (event.clientY - rect.top - transform.y) / transform.k;
      publish();
      showTip(event, drag.node);
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
      if (!drag.moved) atlas.select(drag.node.id);
      drag = null;
    }
    if (pan) {
      if (!pan.moved) atlas.clearSelection();
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
    const cx = viewWidth() / 2;
    const cy = viewHeight() / 2;
    const nextK = Math.min(3.5, Math.max(0.32, transform.k * factor));
    const wx = (cx - transform.x) / transform.k;
    const wy = (cy - transform.y) / transform.k;
    transform = { k: nextK, x: cx - wx * nextK, y: cy - wy * nextK };
  }

  function fit() {
    if (!positions.length) return;
    const visible = geometry.filter((entry) => atlas.isEraVisible(entry.node.era));
    if (!visible.length) return;
    const xs = visible.map((entry) => entry.x);
    const ys = visible.map((entry) => entry.y);
    const pad = 64;
    const minX = Math.min(...xs) - pad;
    const maxX = Math.max(...xs) + pad;
    const minY = Math.min(...ys) - pad;
    const maxY = Math.max(...ys) + pad;
    const viewW = viewWidth();
    const viewH = viewHeight();
    const k = Math.min(
      1.6,
      Math.max(0.32, Math.min((viewW - 40) / (maxX - minX), (viewH - 60) / (maxY - minY))),
    );
    transform = {
      k,
      x: viewW / 2 - ((minX + maxX) / 2) * k,
      y: viewH / 2 - ((minY + maxY) / 2) * k,
    };
  }

  let flyFrame = 0;

  function flyTo(target: { x: number; y: number; k: number }, duration = 420) {
    cancelAnimationFrame(flyFrame);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

  const viewWidth = () => (mobile ? width : width - 436);
  const viewHeight = () =>
    mobile ? height * (atlas.selected || atlas.pathMode ? 0.3 : 0.53) : height;

  $effect(() => {
    if (!ready) return;
    const viewW = viewWidth();
    const viewH = viewHeight();
    const lineage = atlas.lineage;

    if (lineage && lineage.steps.length && !mobile) {
      const entries = lineage.thinkers
        .map((thinker) => geometry.find((entry) => entry.node.id === thinker.id))
        .filter((entry) => entry !== undefined);
      if (entries.length > 1) {
        const xs = entries.map((entry) => entry.x);
        const ys = entries.map((entry) => entry.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const k = Math.min(
          1.8,
          Math.max(
            0.8,
            Math.min((viewW - 220) / Math.max(1, maxX - minX), (height - 260) / Math.max(1, maxY - minY)),
          ),
        );
        flyTo({
          k,
          x: viewW / 2 - ((minX + maxX) / 2) * k,
          y: height / 2 - ((minY + maxY) / 2) * k,
        });
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
    if (sx > 60 && sx < viewW - 50 && sy > 110 && sy < viewH - 50) return;
    const k = Math.max(current.k, mobile ? 0.55 : 0.85);
    flyTo({
      k,
      x: viewW / 2 - entry.x * k,
      y: viewH / 2 - entry.y * k,
    });
  });

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      width = box.width;
      height = box.height;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    });
    if (host) observer.observe(host);
    host?.addEventListener('wheel', onWheel, { passive: false });
    layout();

    return () => {
      observer.disconnect();
      clearTimeout(resizeTimer);
      host?.removeEventListener('wheel', onWheel);
    };
  });

  onDestroy(() => {
    clearTimeout(resizeTimer);
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
  <svg width={width} height={height} class:ready aria-label="哲学依赖关系图">
    <defs>
      {#each Object.entries(RELATION_META) as [kind, meta]}
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
          <path d="M0.6 0.8 L7.4 4 L0.6 7.2 Z" fill={meta.color} />
        </marker>
      {/each}
    </defs>

    <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
      <g class="edges">
        {#each edges as edge (edge.key)}
          {@const style = edgeStyle(edge.relation)}
          {#if style.opacity > 0}
            <line
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke={style.stroke}
              stroke-width={style.width}
              stroke-dasharray={style.dash}
              stroke-opacity={style.opacity}
              marker-end={style.arrow ? `url(#arrow-${edge.relation.kind})` : undefined}
            />
          {/if}
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
            transform={`translate(${entry.x} ${entry.y})`}
            opacity={opacity}
            pointer-events={atlas.isEraVisible(entry.node.era) ? 'auto' : 'none'}
            role="button"
            tabindex="0"
            aria-label={`${entry.node.name}，${entry.node.era}`}
            onpointerdown={(event) => beginNode(event, entry.node)}
            onpointerenter={(event) => enterNode(event, entry.node)}
            onpointermove={(event) => showTip(event, entry.node)}
            onpointerleave={leaveNode}
            onkeydown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                atlas.select(entry.node.id);
              }
            }}
          >
            <circle class="hit" r={Math.max(entry.r + 5, 16 / transform.k)} fill="transparent" />
            {#if selected || order !== undefined}
              <circle r={entry.r + 5} fill="none" stroke="#ece6d8" stroke-width="0.9" opacity="0.6" />
            {/if}
            <circle
              r={entry.r}
              fill={eraColor(entry.node.eraIndex)}
              stroke="#16130f"
              stroke-width="1.2"
            />
            <circle
              r={Math.max(0.8, entry.r * 0.34)}
              fill={withAlpha('#f6f1e7', 0.5)}
              pointer-events="none"
            />
            {#if order !== undefined}
              <g transform={`translate(${entry.r + 9} ${entry.r + 3})`}>
                <circle r="7.4" fill="#f6f1e7" />
                <text class="path-index" text-anchor="middle" y="3.5">{order + 1}</text>
              </g>
            {/if}
          </g>
        {/each}
      </g>
    </g>

    <g class="labels" aria-hidden="true">
      {#each labels as label, index (index)}
        <text
          x={label.x}
          y={label.y}
          text-anchor={label.anchor}
          class="label"
          class:label-strong={label.strong}
          role="button"
          tabindex="-1"
          onpointerdown={(event) => {
            event.stopPropagation();
            tip = null;
            atlas.hover(null);
            atlas.select(label.id);
          }}
        >
          {label.text}
        </text>
      {/each}
    </g>
  </svg>

  {#if tip}
    <div class="tip" style={`left:${tip.x}px; top:${tip.y}px`}>
      <div class="tip-era" style={`color:${eraColor(tip.node.eraIndex)}`}>
        <span class="tip-dot" style={`background:${eraColor(tip.node.eraIndex)}`}></span>
        {tip.node.era}
      </div>
      <div class="tip-name">{tip.node.name}</div>
      <div class="tip-en">{tip.node.nameEn}</div>
      <p class="tip-bio">{tip.node.bio.slice(0, 74)}{tip.node.bio.length > 74 ? '…' : ''}</p>
    </div>
  {/if}

  <div class="controls">
    <button type="button" onclick={() => zoomBy(1.32)} aria-label="放大"><Icon name="plus" size={15} /></button>
    <button type="button" onclick={() => zoomBy(0.76)} aria-label="缩小"><Icon name="minus" size={15} /></button>
    <button type="button" onclick={fit} aria-label="适应画布"><Icon name="fit" size={15} /></button>
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
    background:
      radial-gradient(circle at 38% 44%, rgba(60, 51, 40, 0.34), transparent 46%),
      radial-gradient(circle at 78% 16%, rgba(52, 42, 34, 0.28), transparent 38%),
      linear-gradient(180deg, #191510 0%, #14110d 62%, #100e0b 100%);
  }

  .stage:active {
    cursor: grabbing;
  }

  svg {
    display: block;
    opacity: 0;
    transition: opacity 0.8s var(--ease);
  }

  svg.ready {
    opacity: 1;
  }

  .node {
    cursor: pointer;
    transition: opacity 0.24s ease;
  }

  .node circle {
    transition: r 0.2s var(--ease);
  }

  .labels {
    pointer-events: none;
  }

  .label {
    font-family: var(--font-serif);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.03em;
    fill: #d8d0c2;
    paint-order: stroke;
    stroke: #14110d;
    stroke-width: 3.4px;
    stroke-linejoin: round;
    pointer-events: auto;
    cursor: pointer;
    user-select: none;
  }

  .label-strong {
    fill: #f6f1e7;
    font-weight: 600;
    font-size: 12px;
  }

  .path-index {
    font-family: var(--font-sans);
    font-size: 8px;
    font-weight: 700;
    fill: #1c1917;
  }

  .tip {
    position: absolute;
    z-index: 5;
    width: 268px;
    padding: 14px 16px 15px;
    pointer-events: none;
    background: rgba(20, 17, 13, 0.94);
    border: 1px solid rgba(236, 230, 216, 0.16);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(8px);
    animation: fade-in 0.14s ease;
  }

  .tip-era {
    display: flex;
    gap: 6px;
    align-items: center;
    font-family: var(--font-sans);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.14em;
  }

  .tip-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }

  .tip-name {
    margin-top: 7px;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #f6f1e7;
  }

  .tip-en {
    margin-top: 1px;
    font-family: var(--font-latin);
    font-size: 13px;
    font-style: italic;
    color: #a9a092;
  }

  .tip-bio {
    margin: 9px 0 0;
    font-size: 12px;
    line-height: 1.7;
    color: #b9b0a2;
  }

  .controls {
    position: absolute;
    bottom: 24px;
    left: 22px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(236, 230, 216, 0.14);
    background: rgba(22, 19, 15, 0.7);
    backdrop-filter: blur(8px);
  }

  .controls button {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    color: #a9a092;
    border-bottom: 1px solid rgba(236, 230, 216, 0.1);
    transition: color 0.15s ease, background 0.15s ease;
  }

  .controls button:last-child {
    border-bottom: 0;
  }

  .controls button:hover {
    color: #f6f1e7;
    background: rgba(236, 230, 216, 0.07);
  }

  @media (max-width: 900px) {
    .controls {
      top: 104px;
      right: 8px;
      bottom: auto;
      left: auto;
    }

    .controls button {
      width: 30px;
      height: 30px;
    }

    .tip {
      width: 232px;
    }
  }
</style>
