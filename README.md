# 《万维钢·现代思维工具100讲》 交互式 Web 看板

这是一个基于 HTML5 / Modern CSS / Vanilla JS 开发的高颜值、响应式《万维钢·现代思维工具100讲》（01～45讲全景拆解） Web 应用程序，专为发布在 **GitHub Pages** 上设计。

---

## 🌟 核心功能亮点

1. **四大分视图导航**:
   - **總覽**: 看板数据统计、五大思维范式转换卡片、三大模块汇总、全景跨模块 Mermaid 联动态图。
   - **E01 基本世界觀 (01-07讲)**: 叙事、重尾、能动、约束、不确定性、LLM 三层自我（进程/界面/内核）对比表。
   - **E02 成長戰略 (08-26讲)**: 5 大主题维度归类（内在驱动、自由能原理、复利与结构洞、情绪与身份、探索与利用、共鸣）。
   - **E03 決策判斷 (27-45讲)**: 5 大决策层级归类（无免费午餐、贝叶斯先验、信息价值 VOI、凯利公式、非遍历性、反脆弱、状态杠杆、OODA 环）。
2. **富含 Vector SVG 精美图示**: 每一个核心概念均配有专属 SVG 矢量矢量图标与颜色标注。
3. **全局实时搜索 (Ctrl+K)**: 支持按照讲数（如 01, 28, 45）或关键词（如 贝叶斯, OODA, 自由能）实时搜索并一键跳转高亮。
4. **暗黑 / 明亮主题一键切换**: 自由选择高科技暗黑玻璃拟态或清爽明亮模式。

---

## 🚀 如何在 GitHub 上发布 (GitHub Pages 部署指南)

### 方法一：使用 GitHub Actions 自动部署（推荐）

1. 将本文件夹内的所有内容 commit 并 push 到你的 GitHub 仓库（例如分支为 `main`）：
   ```bash
   git add .
   git commit -m "Deploy modern thinking tools web app"
   git push origin main
   ```
2. 在 GitHub 仓库页面中，点击 **Settings** -> **Pages**。
3. 在 **Build and deployment** 下的 **Source** 选择 **GitHub Actions**。
4. 每次 push 到 `main` 分支时，`.github/workflows/deploy.yml` 会自动构建并将网页发布至 `https://<your-username>.github.io/<your-repo-name>/`。

---

### 方法二：直接选择分支 (Deploy from a branch)

1. 在 GitHub 仓库页面中，点击 **Settings** -> **Pages**。
2. 在 **Source** 选择 **Deploy from a branch**。
3. Branch 选择 `main` (或 `master`)，Directory 选择 `/ (root)`，点击 **Save**。
4. 等待 1-2 分钟后，刷新页面即可获得 GitHub Pages 专属网址！

---

## 📁 目录文件结构

- `index.html`: 主页面结构与 HTML 布局。
- `styles.css`: CSS 变量设计系统、暗色/明色主题、响应式卡片与微动画。
- `app.js`: 页面交互逻辑、Tab 切换、全局关键字搜索与 Mermaid 初始化。
- `data.js`: 拆解 45 讲的结构化数据、SVG 图标定义库与三层自我表格。
- `.github/workflows/deploy.yml`: GitHub Actions 自动部署脚本。
- `E01_基本世界觀.md` / `E02_模塊一_成長戰略.md` / `E03_模塊二_決策判斷.md`: 原始 MD 知识库文件。
