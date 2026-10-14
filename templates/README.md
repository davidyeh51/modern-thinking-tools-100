# 📐 大腦知識庫與簡報系統擴充指南 (Extensibility Guide)

本專案建構了一套**「入口網站 ↔ 多主題知識庫 ↔ 10 分鐘麥肯錫導讀簡報 ↔ 16:9 全景沉浸式簡報」**的現代化模組化架構。

---

## 🏛️ 三層階梯分類架構 (Three-Tier Knowledge Architecture)

本系統以結構化的方式組織知識，確保任何主題皆能無限擴充：

1. **第一層：知識領域 (Domain/Theme)**
   - `A2.2.1 思維框架`（旗艦已上線 · 萬維鋼 100 講 / 全 120 講）
   - `A2.2.2 超級個體`（已預備 · 隱性潛能與個人槓桿）
   - `A2.2.3 系統思考`（已預備 · 因果迴路與破框思維）
   - `A2.2.4 心理學`（已預備 · 自我發展與心智躍遷）

2. **第二層：大分類模組 (Major Categories E01~E09)**
   - 以 `E01 基本世界觀` 到 `E09 高觀點` 作為 9 大核心分類。
   - 每個模組皆有專屬的核心問題、核心論點、3大亮點與一句話總結。
   - 每個大分類在「10 分鐘麥肯錫導讀簡報 (`briefing.html`)」中皆對應專屬頁面（Slide 3~11）。

3. **第三層：子分類各講 (Subcategory Lectures)**
   - 每個大模組下涵蓋具體講數（如 E01 下的 001~007 講，全書共 120 講）。
   - 每講皆具備**「雙軌認知視角」**：
     - 🟢 入門理解：白話生活比喻、痛點盲區、直覺透視
     - 🔥 進階建構：學術脈絡、決策模型、邊界條件
   - 於 `slides.html` 中提供獨立劇院級 16:9 投影片。

---

## 📊 雙軌簡報放映體系

從入口網站出發，使用者可根據時間與需求進入兩種簡報：
- **🌟 10 分鐘精華導讀簡報 (`briefing.html`)**：
  - 麥肯錫顧問風格、14 頁精準架構、金字塔原理行動結論標題。
  - 配備逐頁三段式講稿備忘錄（①本頁結論 ②補充說明 ③下一頁轉場，快捷鍵 N 展開）。
  - 支援一鍵下載 `wan_thinking_tools_100_briefing.pptx` 原檔。
- **🚀 120 講全集深研簡報 (`slides.html`)**：
  - 120 講全收錄、支援入門/進階/雙軌切換、高清語意概念圖解。

---

## 🚀 三步擴充新主題流程

### 第一步：在 `registry.js` 註冊新主題

打開專案根目錄的 `registry.js`，在 `KNOWLEDGE_REGISTRY.topics` 陣列中新增一個主題物件：

```javascript
{
  id: 'A2.2.2',
  code: 'super-individual',
  title: 'A2.2.2 超級個體 · 隱性潛能與高維學習',
  subtitle: '個人商業模式躍遷 · 隱性潛能釋放 · 費曼 AI 個人化深度學習',
  status: 'active', // 改為 active 即代表已正式上線
  badge: '已上線 · 30 講',
  color: '#4a90e2',
  totalLectures: 30,
  totalModules: 3,
  tags: ['超級個體', '隱性潛能', '費曼學習法', '個人槓桿'],
  description: '聚焦亞當·格蘭特《隱性潛能》、費曼學習法AI賦能、個人知識資產複利化。',
  links: {
    portal: 'index.html#A2.2.2',
    briefing: 'briefing.html?topic=A2.2.2',
    downloadPptx: 'super_individual_briefing.pptx',
    slides: 'slides.html?topic=A2.2.2',
    firstSlide: 'slides.html?topic=A2.2.2&slide=001'
  }
}
```

### 第二步：準備主題資料庫 (`data/<topic-code>.js`)

參考 `templates/module-template.json` 的格式，建立對應主題的結構化資料。每一講包含雙軌認知：

1. **🟢 入門理解 (Beginner Tier)**：
   - `metaphor`：日常生活通俗生動比喻（如：收費橋、文具差生、指北針）
   - `painPoint`：初學者最常犯的直覺盲區或痛點
   - `plainTakeaway`：一句話大白話透視
2. **🔥 進階建構 (Advanced Tier)**：
   - `lineage`：第一性原理與學術脈絡（經濟學、認知科學、系統論）
   - `framework`：思考架構與決策矩陣
   - `boundary`：邊界條件與反脆弱防護
3. **🖼️ 概念配圖 (Semantic Image)**：
   - `url`：Unsplash 高畫質概念圖片
   - `metaphor`：視覺隱喻說明（解釋圖片與思維概念的象徵關聯）
4. **🚀 落地實踐 (Action Takeaway)**：
   - 具體可執行的思考練習或檢驗清單

### 第三步：提交並發布到 GitHub Pages

```bash
git add .
git commit -m "feat: Add A2.2.2 Super Individual presentation deck"
git push origin main
```

GitHub Actions 會在 1~2 分鐘內自動完成全站編譯與部署！

---

## 🎯 雙軌認知設計哲學

| 維度 | 🟢 入門理解（小白友好） | 🔥 進階建構（高手進階） |
|---|---|---|
| **目標** | 破除名詞壁壘，1 分鐘建立直覺 | 建立立體思考骨架，融入決策系統 |
| **表達** | 日常生活生動比喻、痛點盲區 | 底層數理/博弈邏輯、第一性原理推導 |
| **工具** | 直覺心法、口訣、場景案例 | 決策矩陣、因果反饋迴路、邊界條件 |
| **配圖** | 直觀視覺隱喻 | 概念圖譜、架構流程 |
