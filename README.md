# 关系 · 哲学依赖图谱

> 每一个观念，都是对某人的回答。

一个纯前端的交互式哲学依赖图谱。它把 234 位思想家组织成一张有向网络，并用四种关系说明思想之间的继承、批判与重构：

- **预设前提**（29 条）：A 要成立，必须先接受 B 的某个区分或主张。
- **批判**（173 条）：A 明确反对 B 的论证或结论。
- **综合**（26 条）：A 把 B 的问题或立场纳入一个新的结构。
- **受影响**（559 条）：A 受 B 启发，属于较宽的历史依赖，并非严格推导。

当前收录 **234 位思想家、787 条有向关系、14 个时代/传统分组**，整体构成 1 个弱连通分量，覆盖前苏格拉底到当代，以及东方、中世纪、近现代欧陆与分析哲学等脉络。被依赖最多的节点依次为康德（42）、黑格尔（38）、亚里士多德（34）、马克思（33）、柏拉图（30）、尼采（19）。

## 关系方向

每条边从**依赖者**指向**被依赖者**。箭头指向被依赖的思想家，而不是时间上的后来者，因此可能出现较早的思想家依赖较年轻的同时代人的情况。

读法示例：

- `毕达哥拉斯 → 泰勒斯`：毕达哥拉斯受泰勒斯影响（`influences`）。
- `康德 → 休谟`：康德综合了休谟（`synthesizes`）。
- `海德格尔 → 尼采`：海德格尔受尼采影响（`influences`）。

界面中的每条关系都会渲染为完整句子，并在下方附上具体理由，无需仅凭箭头猜测方向。

## 主要功能

- **图谱交互**：支持拖动画布平移、拖动单个节点、滚轮或双指缩放；悬停查看人物摘要，点击打开档案；提供放大、缩小、居中适配与全屏图谱按钮（按 `Esc` 退出全屏、关闭搜索或返回导览）。
- **思想档案**：展示人物简介、生卒年、学派、核心观念、代表作（无完整传世著作者如苏格拉底会显示对应说明）、入门阅读建议与维基百科链接，并按「思想来源 / 思想去向」列出每条关系的理由。桌面端右侧面板随视口宽度在 460px–540px 间自适应；移动端提供可拖拽、可点按切档的底部抽屉（最小化 / 半屏 / 展开）。
- **追溯世系**：任选两位思想家后，在当前未被筛选隐藏的边上执行无向最短路径搜索，高亮整条路径并逐跳解释每一条关系；若当前筛选条件阻断了连通性，会明确提示无法连通。
- **时代与关系筛选**：顶部支持按 14 个时代单独开关，并带一键全显/全隐总开关与重置；底部图例（移动端位于导览面板内）支持按 4 种关系类型开关。隐藏「受影响」后，剩余的批判、综合与预设前提会更清晰地呈现论争主干。
- **全文检索**：按 `⌘K`、`Ctrl+K` 或 `/` 打开搜索框，可匹配中英文姓名、学派、时代、核心观念与著作名。
- **双语与主题**：顶栏支持中/英文切换和浅色/深色主题切换，偏好保存在浏览器 `localStorage` 中；中英文图谱共用同一份预计算坐标，切换语言时节点位置保持不变。
- **可分享链接**：选中人物后地址栏会同步为 `#/<id>`（例如 `#/kant`），档案右上角支持一键复制当前链接。

## 数据与校验

前端加载的图谱数据位于 `src/lib/data/`：

- `src/lib/data/graph.json`：中文图谱（234 位思想家、787 条关系）
- `src/lib/data/graph.en.json`：英文图谱（234 位思想家、787 条关系）
- `src/lib/data/layout.json`：234 个节点的预计算坐标

独立校验器位于 `engine/src/main.rs`（Rust），通过 `npm run graph:check` 对 `graph.json` 与 `graph.en.json` 执行类型化检查：校验 ID 唯一性与存在性、无自环、无重复有向边、理由不少于 12 字符、无孤立节点，对可疑的年代方向发出警告，并输出关系分布、弱连通分量、高频节点与时代统计。

## 开发与构建

环境要求：

- **Node.js 20+**（GitHub Actions 构建环境使用 Node 22）
- 运行 `npm run verify` 需要本地 Chromium（默认 `/usr/bin/chromium`，可通过环境变量 `CHROMIUM_PATH` 指定路径）
- 运行 `npm run graph:check` 需要 Rust 工具链（`cargo`）

常用命令：

```bash
npm install
npm run dev          # 启动开发服务器（http://localhost:5173）
npm run check        # Svelte + TypeScript 类型检查
npm run build        # 打包纯静态站点到 dist/
npm run preview      # 本地预览 dist/ 构建结果
npm run verify       # Playwright 桌面与移动端端到端验收（42 项检查）
npm run graph:check  # 使用 Rust 校验 graph.json 与 graph.en.json
```

## 部署到 GitHub Pages

项目为纯静态前端，路由使用 Hash（`#/<id>`），`vite.config.ts` 已配置 `base: './'`，可直接部署在仓库子路径或自定义域名下。

1. 将代码推送到 `master` 分支。
2. 在 GitHub 仓库打开 **Settings** -> **Pages**，将 **Build and deployment** 下的 **Source** 设为 **GitHub Actions**。
3. `.github/workflows/deploy.yml` 会在推送到 `master` 或手动触发 `workflow_dispatch` 时，使用 Node 22 执行 `npm ci` 与 `npm run build`，并自动发布 `dist/`。

## 目录结构

```text
.github/workflows/deploy.yml  GitHub Pages 自动构建与发布工作流
scripts/verify.mjs            Playwright 桌面与移动端端到端验收脚本
engine/src/main.rs            Rust 图谱校验器
src/lib/data/                 graph.json、graph.en.json 与 layout.json
src/lib/graph/model.ts        图谱类型、索引、检索与无向最短路径
src/lib/state.svelte.ts       选择、筛选、双语、主题与追溯状态
src/lib/sheet.ts              桌面面板宽度与移动端抽屉档位几何计算
src/lib/strings.ts            中英文界面文案
src/lib/theme.ts              浅色与深色配色表
src/lib/components/           Svelte 组件、抽屉把手与 SVG 图谱
```

## 实现说明

- 基于 Svelte 5（runes）、TypeScript 与 Vite 构建，无后端依赖。
- 图谱采用 SVG 渲染，节点初始坐标从 `src/lib/data/layout.json` 读取；节点标签在屏幕空间进行碰撞规避，缩放时保持可读字号。
- 关系样式集中在 `src/lib/graph/model.ts` 与 `src/lib/theme.ts`，自然语言句子由 `RelationPhrase.svelte` 统一拼装。
- 移动端底部抽屉使用 `dvh` 与安全区边距适配，图谱会自动在抽屉上方可见区域居中。
- 支持 `prefers-reduced-motion` 减少动效，键盘检索与焦点切换均有可见状态。

## 已知限制

- 关系集并非完备的哲学史，只收录能够说明具体概念或论证关联的边；跨传统影响存在一定阐释争议。
- 部分历史人物生卒年为约数，界面保留原始表述。
- 无账户、收藏或后端同步，仅语言与主题偏好保存在浏览器 `localStorage` 中。
