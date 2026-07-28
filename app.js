/* =====================================================================
   app.js — 萬維鋼《現代思維工具100講》渲染邏輯
   ===================================================================== */

// Mermaid 初始化（溫暖色系主題）
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3a2510',
    primaryTextColor: '#fef3e2',
    primaryBorderColor: '#f0a500',
    lineColor: '#f0a500',
    secondaryColor: '#241a0e',
    tertiaryColor: '#1a1208',
    background: '#1a1208',
    mainBkg: '#2a1c0c',
    nodeBorder: '#f0a500',
    clusterBkg: '#241a0e',
    titleColor: '#f0c060',
    edgeLabelBackground: '#1a1208',
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
  // Hero
  const hero = document.getElementById('overview-hero');
  if (hero) {
    hero.innerHTML = `
      <h1 class="hero-title">${overviewData.heroTitle}</h1>
      <p class="hero-subtitle">${overviewData.heroSubtitle}</p>`;
  }

  // Stats
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

  // Module cards
  const modulesEl = document.getElementById('overview-modules');
  if (modulesEl) {
    modulesEl.innerHTML = overviewData.modules.map(m => `
      <div class="shift-card" style="cursor:pointer;" onclick="switchTab('${m.label}')">
        <div class="shift-header">
          <span class="shift-badge">${m.label} · ${m.range}</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
          <div class="stat-icon" style="color:var(--accent-gold)">${m.icon}</div>
          <div class="lecture-title">${m.title}</div>
        </div>
        <p class="lecture-summary">${m.desc}</p>
        <ul class="highlights-list">
          ${m.points.map(p => `<li class="highlight-item">${p}</li>`).join('')}
        </ul>
      </div>`).join('');
  }

  // Shift cards
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
// 渲染：E01
// ──────────────────────────────────────────────────────────────────────
function renderE01() {
  const container = document.getElementById('e01-content');
  if (!container) return;

  let html = `<div class="quote-box">${e01Data.quote}</div>`;

  // SVG flow diagram
  html += `<div class="svg-wrap">${e01Data.svgDiagram}</div>`;

  // Lecture cards
  html += e01Data.lectures.map(l => renderLectureCard(l)).join('');

  container.innerHTML = html;
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：E02
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
// 渲染：E03
// ──────────────────────────────────────────────────────────────────────
function renderE03() {
  const container = document.getElementById('e03-content');
  if (!container) return;

  let html = `<div class="quote-box">${e03Data.quote}</div>`;

  // Decision framework table
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
// 渲染：E04（學習教育）
// ──────────────────────────────────────────────────────────────────────
function renderE04() {
  const container = document.getElementById('e04-content');
  if (!container) return;

  let html = `<div class="quote-box">${e04Data.quote}</div>`;

  // Module overview table
  html += `
    <div class="section-header" style="margin-top:0;">
      <h2 class="section-title">E04 模塊五層骨架總覽</h2>
    </div>
    ${e04Data.tableHtml}`;

  // ICAP SVG
  html += `
    <div class="section-header" style="margin-top:2rem;">
      <h2 class="section-title">ICAP 學習參與強度梯級圖</h2>
    </div>
    <div class="svg-wrap">${e04Data.icapSvg}</div>`;

  // School function table
  html += `
    <div class="section-header" style="margin-top:2rem;">
      <h2 class="section-title">學校三功能×各階段配比</h2>
    </div>
    ${e04Data.schoolTableHtml}`;

  // Category lecture cards
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
// Tab 切換
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
  // Hide all
  Object.values(TAB_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  // Remove active from all nav items
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  // Show selected
  const target = document.getElementById(TAB_MAP[tabKey]);
  if (target) target.classList.add('active');

  // Highlight nav
  const navEl = document.querySelector(`[data-tab="${tabKey}"]`);
  if (navEl) navEl.classList.add('active');

  // Render content if not already done
  if (!renderedTabs.has(tabKey)) {
    renderedTabs.add(tabKey);
    if (tabKey === 'overview') renderOverview();
    else if (tabKey === 'E01') renderE01();
    else if (tabKey === 'E02') renderE02();
    else if (tabKey === 'E03') renderE03();
    else if (tabKey === 'E04') renderE04();

    // Re-run mermaid on new content
    setTimeout(() => {
      try { mermaid.run(); } catch (e) { /* ignore */ }
    }, 100);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ──────────────────────────────────────────────────────────────────────
// 搜索 Modal
// ──────────────────────────────────────────────────────────────────────
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function openSearch() {
  searchModal.classList.add('active');
  setTimeout(() => searchInput.focus(), 50);
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
    searchResults.innerHTML = `<div style="color:var(--text-muted);padding:1rem;text-align:center;">沒有找到相關內容</div>`;
    return;
  }

  searchResults.innerHTML = results.map(r => `
    <div class="search-result-item" onclick="switchTab('${r.tab}');closeSearch();">
      <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.3rem;">
        <span class="lecture-num" style="padding:0.2rem 0.5rem;font-size:0.78rem;">第 ${r.num} 講</span>
        <span class="tag">${r.tab}</span>
      </div>
      <div style="font-weight:600;font-size:0.93rem;color:var(--text-primary);">${r.title}</div>
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

// 讀取儲存的主題
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

// ──────────────────────────────────────────────────────────────────────
// 導航欄點擊事件綁定
// ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const tab = item.getAttribute('data-tab');
    if (tab) switchTab(tab);
  });
});

// ──────────────────────────────────────────────────────────────────────
// 初始化
// ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  renderOverview();
  renderedTabs.add('overview');

  // Init Mermaid for pre-existing charts in HTML
  setTimeout(() => {
    try { mermaid.run(); } catch (e) { /* ignore */ }
  }, 200);
});
