/* =====================================================================
   app.js — 萬維鋼《現代思維工具100講》渲染與互動邏輯
   ===================================================================== */

// Mermaid 初始化（溫暖色系主題配置）
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3d2b1f',
    primaryTextColor: '#fdf5eb',
    primaryBorderColor: '#f5a623',
    lineColor: '#f5a623',
    secondaryColor: '#281d14',
    tertiaryColor: '#18120c',
    background: '#18120c',
    mainBkg: '#2d2014',
    nodeBorder: '#f5a623',
    clusterBkg: '#221a12',
    titleColor: '#f7c768',
    edgeLabelBackground: '#18120c',
    fontFamily: 'Noto Sans TC, Inter, sans-serif',
  },
  flowchart: { useMaxWidth: true, htmlLabels: true }
});

// ──────────────────────────────────────────────────────────────────────
// 工具函數
// ──────────────────────────────────────────────────────────────────────
function svgIcon(name) {
  const icons = {
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    brain: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2a2.5 2.5 0 0 1 5 0"/><path d="M14.5 2a2.5 2.5 0 1 1 4.33 2.5"/><path d="M18 8a4 4 0 0 1 0 8"/><path d="M14.5 22a2.5 2.5 0 0 0 4.33-2.5"/><path d="M9.5 22a2.5 2.5 0 0 1-5 0"/><path d="M6 14a4 4 0 0 1 0-8"/><path d="M9.5 2a2.5 2.5 0 0 0-4.33 2.5"/><path d="M12 12h.01"/></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  };
  return icons[name] || icons.book;
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：總覽頁面
// ──────────────────────────────────────────────────────────────────────
function renderOverview() {
  // Hero Banner
  const hero = document.getElementById('overview-hero');
  if (hero) {
    hero.innerHTML = `
      <h1 class="hero-title">${overviewData.heroTitle}</h1>
      <p class="hero-subtitle">${overviewData.heroSubtitle}</p>`;
  }

  // Stats Grid
  const statsGrid = document.getElementById('overview-stats');
  if (statsGrid) {
    statsGrid.innerHTML = overviewData.stats.map(s => `
      <div class="stat-card">
        <div class="stat-icon">${s.icon}</div>
        <div>
          <div class="stat-val">${s.val}</div>
          <div class="stat-lbl">${s.lbl}</div>
        </div>
      </div>`).join('');
  }

  // Module Grid
  const modulesEl = document.getElementById('overview-modules');
  if (modulesEl) {
    modulesEl.innerHTML = overviewData.modules.map(m => `
      <div class="shift-card" style="cursor:pointer;" onclick="switchTab('${m.label}')">
        <div class="shift-header">
          <span class="shift-badge">${m.label} · ${m.range}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
          <div class="stat-icon" style="color:var(--accent-gold);">${m.icon}</div>
          <div class="lecture-title">${m.title}</div>
        </div>
        <p class="lecture-summary">${m.desc}</p>
        <ul class="highlights-list">
          ${m.points.map(p => `<li class="highlight-item">${p}</li>`).join('')}
        </ul>
      </div>`).join('');
  }

  // Shift Cards
  const shiftsEl = document.getElementById('overview-shifts');
  if (shiftsEl) {
    shiftsEl.innerHTML = overviewData.shifts.map(s => `
      <div class="shift-card">
        <div class="shift-header">
          <span class="shift-badge">${s.badge}</span>
        </div>
        <div class="lecture-title" style="margin-bottom:0.5rem">${s.title}</div>
        <p class="lecture-summary">${s.desc}</p>
        <div class="shift-vs">
          <div class="vs-box vs-old">
            <div class="vs-title">❌ 舊思維</div>
            ${s.old}
          </div>
          <div class="vs-box vs-new">
            <div class="vs-title">✅ 新思維</div>
            ${s.new}
          </div>
        </div>
      </div>`).join('');
  }
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：E01 基本世界觀
// ──────────────────────────────────────────────────────────────────────
function renderE01() {
  const container = document.getElementById('e01-content');
  if (!container) return;

  let html = `<div class="quote-box">${e01Data.quote}</div>`;
  html += `<div class="svg-wrap">${e01Data.svgDiagram}</div>`;
  html += e01Data.lectures.map(l => renderLectureCard(l)).join('');

  container.innerHTML = html;
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：E02 成長戰略
// ──────────────────────────────────────────────────────────────────────
function renderE02() {
  const container = document.getElementById('e02-content');
  if (!container) return;

  let html = `<div class="quote-box">${e02Data.quote}</div>`;

  html += e02Data.categories.map(cat => `
    <div class="category-block">
      <div class="category-title">${cat.title}</div>
      ${cat.lectures.map(l => renderLectureCard(l)).join('')}
    </div>`).join('');

  container.innerHTML = html;
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：E03 決策與判斷
// ──────────────────────────────────────────────────────────────────────
function renderE03() {
  const container = document.getElementById('e03-content');
  if (!container) return;

  let html = `<div class="quote-box">${e03Data.quote}</div>`;

  html += `
    <div class="section-header" style="margin-top:0;">
      <h2 class="section-title">決策工具框架總覽</h2>
    </div>
    ${e03Data.tableHtml}`;

  html += e03Data.categories.map(cat => `
    <div class="category-block">
      <div class="category-title">${cat.title}</div>
      ${cat.lectures.map(l => renderLectureCard(l)).join('')}
    </div>`).join('');

  container.innerHTML = html;
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：E04 學習與教育
// ──────────────────────────────────────────────────────────────────────
function renderE04() {
  const container = document.getElementById('e04-content');
  if (!container) return;

  let html = `<div class="quote-box">${e04Data.quote}</div>`;

  // 1. 五層骨架表格
  html += `
    <div class="section-header" style="margin-top:0;">
      <h2 class="section-title">E04 模組五層骨架總覽</h2>
    </div>
    ${e04Data.tableHtml}`;

  // 2. ICAP SVG 圖表
  html += `
    <div class="section-header" style="margin-top:2.2rem;">
      <h2 class="section-title">ICAP 學習參與強度梯級圖</h2>
    </div>
    <div class="svg-wrap">${e04Data.icapSvg}</div>`;

  // 3. 學校三功能表格
  html += `
    <div class="section-header" style="margin-top:2.2rem;">
      <h2 class="section-title">學校三功能 × 各階段配比表</h2>
    </div>
    ${e04Data.schoolTableHtml}`;

  // 4. 逐講內容卡片
  html += e04Data.categories.map(cat => `
    <div class="category-block">
      <div class="category-title">${cat.title}</div>
      ${cat.lectures.map(l => renderLectureCard(l)).join('')}
    </div>`).join('');

  container.innerHTML = html;
}

// ──────────────────────────────────────────────────────────────────────
// 通用：渲染講數卡片
// ──────────────────────────────────────────────────────────────────────
function renderLectureCard(l) {
  return `
    <div class="lecture-card">
      <div class="lecture-header">
        <span class="lecture-num">第 ${l.num} 講</span>
        <div class="lecture-title">${l.title}</div>
      </div>
      <p class="lecture-summary">${l.summary}</p>
      <ul class="highlights-list">
        ${l.highlights.map(h => `<li class="highlight-item">${h}</li>`).join('')}
      </ul>
    </div>`;
}

// ──────────────────────────────────────────────────────────────────────
// Tab 切換邏輯
// ──────────────────────────────────────────────────────────────────────
const TAB_MAP = {
  overview: 'tab-overview',
  E01: 'tab-e01',
  E02: 'tab-e02',
  E03: 'tab-e03',
  E04: 'tab-e04',
};

let renderedTabs = new Set();

function switchTab(tabKey) {
  Object.values(TAB_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(TAB_MAP[tabKey]);
  if (target) target.classList.add('active');

  const navEl = document.querySelector(`[data-tab="${tabKey}"]`);
  if (navEl) navEl.classList.add('active');

  if (!renderedTabs.has(tabKey)) {
    renderedTabs.add(tabKey);
    if (tabKey === 'overview') renderOverview();
    else if (tabKey === 'E01') renderE01();
    else if (tabKey === 'E02') renderE02();
    else if (tabKey === 'E03') renderE03();
    else if (tabKey === 'E04') renderE04();

    setTimeout(() => {
      try { mermaid.run(); } catch (e) { /* ignore */ }
    }, 120);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ──────────────────────────────────────────────────────────────────────
// 搜尋 Modal 邏輯
// ──────────────────────────────────────────────────────────────────────
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function openSearch() {
  searchModal.classList.add('active');
  setTimeout(() => searchInput.focus(), 60);
}

function closeSearch() {
  searchModal.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
}

document.getElementById('btn-search-trigger').addEventListener('click', openSearch);

searchModal.addEventListener('click', e => {
  if (e.target === searchModal) closeSearch();
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
  if (e.key === 'Escape') closeSearch();
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ''; return; }

  const results = searchIndex.filter(item =>
    item.num.includes(q) ||
    item.title.toLowerCase().includes(q) ||
    item.keywords.toLowerCase().includes(q)
  ).slice(0, 10);

  if (!results.length) {
    searchResults.innerHTML = `<div style="color:var(--text-muted);padding:1.2rem;text-align:center;">沒有找到相關內容</div>`;
    return;
  }

  searchResults.innerHTML = results.map(r => `
    <div class="search-result-item" onclick="switchTab('${r.tab}');closeSearch();">
      <div style="display:flex;align-items:center;gap:0.65rem;margin-bottom:0.35rem;">
        <span class="lecture-num" style="padding:0.2rem 0.55rem;font-size:0.78rem;">第 ${r.num} 講</span>
        <span class="tag">${r.tab}</span>
      </div>
      <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);">${r.title}</div>
    </div>`).join('');
});

// ──────────────────────────────────────────────────────────────────────
// 主題切換
// ──────────────────────────────────────────────────────────────────────
const themeBtn = document.getElementById('btn-theme-toggle');
themeBtn.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

// ──────────────────────────────────────────────────────────────────────
// 初始化事件綁定
// ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const tab = item.getAttribute('data-tab');
    if (tab) switchTab(tab);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  renderOverview();
  renderedTabs.add('overview');

  setTimeout(() => {
    try { mermaid.run(); } catch (e) { /* ignore */ }
  }, 200);
});
