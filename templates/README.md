# 📐 大腦知識庫與簡報系統擴充指南 (Extensibility Guide)

本專案建構了一套**「入口網站 ↔ 多主題知識庫 ↔ 16:9 全景沉浸式簡報」**的模組化架構。

無論是目前的旗艦主題 **A2.2.1 思維框架（萬維鋼 100 講，全 120 講）**，還是未來預計擴充的 **A2.2.2 超級個體**、**A2.2.3 系統思考**、**A2.2.4 心理學**，皆可依照本指南在 10 分鐘內完成接入並自動發布至 GitHub Pages。

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
