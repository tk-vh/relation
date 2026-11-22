# 关系数据

`relations.draft/` 是关系的源文件，按传统分组。`scripts/build-graph.mjs` 会读取全部 JSON，合并、去重并校验，然后写入 `src/lib/data/graph.json`。

## 一条关系

```json
{
  "source": "kant",
  "target": "hume",
  "kind": "synthesizes",
  "reason": "接受休谟对因果必然性的怀疑，却以先验范畴与统觉重建经验的客观必然性。"
}
```

- `source`：依赖者，回应或继承的一方。
- `target`：被依赖者，被回应、被综合或被影响的一方。
- `kind`：`presupposes`、`refutes`、`synthesizes`、`influences` 四选一。
- `reason`：20 至 55 个汉字，说明具体的概念、论证或文本关联。不要写「影响深远」这类空话。

方向统一为 `source → target` 表示「source 依赖 target」。不要因为 source 年代更晚就反过来写。界面会把 `influences` 读成「source 受 target 影响」。

## 新增一条关系

1. 在对应传统的文件里追加对象。
2. 确认 `source`、`target` 都存在于 `data.zh.js`。
3. 同一有序对只保留一条边，选最主要的关系类型。
4. 运行 `npm run data`，确认没有警告。
5. 运行 `npm run check` 和 `npm run verify`。

## 当前规模

234 位思想家，648 条关系：

- 受影响 449
- 批判 156
- 预设前提 24
- 综合 19

只有一个弱连通分量。被依赖最多的人物是康德、黑格尔、亚里士多德、马克思、柏拉图、笛卡尔。

## 审校

关系初稿由机器起草，随后按希腊罗马与中世纪、东方与 19 世纪政治、分析哲学与欧陆哲学三组逐条审校。审校关注事实错误、关系类型、方向、时代错置与空泛理由。明显的错误已经修正，仍有争议的跨传统影响会在理由中标注不确定性。
