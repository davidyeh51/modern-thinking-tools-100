# 大衛人生 · 個人成長與思維工具導航門戶
> 旗艦專案：《萬維鋼·現代思維工具 100 講》全 120 講全景思維知識庫 ＆ 16:9 沉浸式劇院級簡報系統

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Online-success?style=flat-square&logo=github)](https://davidyeh51.github.io/modern-thinking-tools-100/)
[![Lectures](https://img.shields.io/badge/Lectures-120%2F120%20Complete-orange?style=flat-square)](https://davidyeh51.github.io/modern-thinking-tools-100/slides.html)
[![Modules](https://img.shields.io/badge/Modules-9%20Core%20Modules-blue?style=flat-square)](https://davidyeh51.github.io/modern-thinking-tools-100/)
[![Cognitive Mode](https://img.shields.io/badge/Dual--Track-Beginner%20%C3%97%20Advanced-green?style=flat-square)](https://davidyeh51.github.io/modern-thinking-tools-100/slides.html)

---

## 🌟 專案核心特色

本專案為一個兼具**高顏值知識門戶**與**16:9 全景沉浸式簡報播放器**的現代化 Web 應用，直接部署發布於 **GitHub Pages** 上：

1. **入口網站與多主題擴充門戶 (`index.html`)**:
   - 建立大腦知識庫中心，集中展示個人成長知識體系（A2.2 模組群）。
   - 整合 `registry.js` 擴充架構，除了旗艦上線的 **A2.2.1 思維框架（120 講）**，並已預備 **A2.2.2 超級個體**、**A2.2.3 系統思考**、**A2.2.4 心理學** 之擴充接口。
2. **全 120 講完整整理（九大模組 E01～E09 無遺漏）**:
   - **E01 基本世界觀** (001–007)：敘事、重尾極端值、能動者、硬約束、三層自我。
   - **E02 成長戰略** (008–026)：能耐尋求、複利、自由能、結構洞、賽道選擇、共鳴。
   - **E03 決策判斷** (027–045)：無免費午餐、貝葉斯先驗更新、凱利公式、反脆弱、OODA 環。
   - **E04 學習教育** (046–057)：認知負荷理論、ICAP 參與梯級、刻意練習、默會知識。
   - **E05 賺錢邏輯** (058–069)：經濟租收費橋、阿爾法優勢、商業槓桿、沃德利地圖、平台生態。
   - **E06 參與者** (070–086)：地位第一性原理、禮與契約、激勵相容、檸檬市場、破除摩洛克。
   - **E07 領導者** (087–098)：剩餘判斷權、組織資本、指揮官意圖、古德哈特定律、認領授權。
   - **E08 演化者** (099–108)：生成心相世界、對稱性破缺、鄰近可能、自組織臨界、適應性循環。
   - **E09 高觀點** (109–120)：零階道理、目標函數、二階意願、自我約束、預訓練與後訓練。
3. **雙軌認知階梯（小白一分鐘秒懂 × 高手建立思考架構）**:
   - 🟢 **【入門理解·白話拆解】**：生活通俗比喻、常人直覺盲區與痛點、一句話本質透視。
   - 🔥 **【進階建構·底層思維框架】**：第一性原理學術脈絡、思考架構與決策矩陣、邊界條件與反脆弱防護。
   - ⚡ **【雙軌並行】**：簡報模式支援鍵盤快捷鍵 `1`, `2`, `3` 自由切換視角！
4. **每頁均配備高畫質概念配圖與視覺隱喻**:
   - 每講皆嚴選語意契合的 High-Res 概念攝影配圖（Unsplash CDN + 本地向量圖標備援）。
   - 附帶「視覺隱喻解讀」，說明圖片與思維概念的象徵關聯。
5. **16:9 劇院級網頁簡報系統 (`slides.html`)**:
   - 支援全螢幕模式（`F` 鍵）。
   - 鍵盤導航：`←` / `→` 上下一講、`Space` 下一講、`Home` / `End`、快速下拉選單直達。
   - 實時進度條與百分比顯示。
   - 支援 Deep Link 直達（例如：`slides.html?slide=058` 或 `slides.html?module=E05`）。
6. **全局關鍵字即時檢索 (Ctrl+K)**:
   - 快速索引 120 講的講數、標題、標籤、白話比喻、進階心智模型關鍵字。
   - 搜尋結果提供「📖 閱讀知識卡片」與「📊 放映簡報」雙向直達。

---

## 📁 目錄結構與架構設計

```text
├── index.html                  # 知識庫門戶首頁（九大模組看板、擴充中心、全景架構圖）
├── slides.html                 # 16:9 全景沉浸式投影片簡報播放器
├── styles.css                  # 門戶主題樣式（暖深黑曜金 / 羊皮紙白）
├── slides.css                  # 簡報系統專屬樣式（雙軌視角切換、全螢幕佈局）
├── app.js                      # 門戶交互邏輯、動態模組渲染、搜尋與 Mermaid 初始化
├── slides.js                   # 簡報播放引擎、鍵盤控制、雙軌視圖切換、Deep Linking
├── registry.js                 # 大腦知識庫多主題註冊中心（A2.2.1 ~ A2.2.4）
├── data.js                     # 全 120 講雙軌結構化數據、圖片庫與搜尋索引（>500KB）
├── templates/                  # 未來擴充專用模板庫
│   ├── module-template.json    # 新主題標準 JSON Schema
│   └── README.md               # 10 分鐘擴充新主題與簡報完整指南
├── E01~E09*.md                 # 原始模組筆記精華
└── .github/workflows/deploy.yml # GitHub Actions 自動部署腳本
```

---

## 🚀 GitHub Pages 訪問與發布

- **線上訪問網址**：
  - 知識庫門戶首頁：`https://davidyeh51.github.io/modern-thinking-tools-100/`
  - 16:9 全景簡報播放：`https://davidyeh51.github.io/modern-thinking-tools-100/slides.html`
  - 模組直達（範例）：`https://davidyeh51.github.io/modern-thinking-tools-100/slides.html?module=E05&slide=058`

---

## ⌨️ 簡報快捷鍵指南

| 按鍵 | 功能說明 |
|---|---|
| `→` / `Space` / `PageDown` | 前往下一講 |
| `←` / `PageUp` | 返回上一講 |
| `Home` / `End` | 直達第 001 講 / 第 120 講 |
| `1` | 切換為【雙軌並行】視角（推薦） |
| `2` | 切換為【入門理解】專注模式 |
| `3` | 切換為【進階框架】專注模式 |
| `F` | 切換全螢幕投影模式 |
| `Ctrl + K` / `Cmd + K` | 開啟全局關鍵字搜尋 |
| `Esc` | 關閉搜尋彈窗 / 退出全螢幕 |
