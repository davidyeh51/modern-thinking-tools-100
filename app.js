/* =====================================================================
   app.js — 萬維鋼《現代思維工具100講》知識門戶與全景看板互動邏輯
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
// 渲染：總覽頁面 (Overview)
// ──────────────────────────────────────────────────────────────────────
// 模組與 10 分鐘導讀簡報頁碼對照 (E01~E09 -> Slide 3~11)
const MODULE_SLIDE_MAPPING = {
  E01: 3,
  E02: 4,
  E03: 5,
  E04: 6,
  E05: 7,
  E06: 8,
  E07: 9,
  E08: 10,
  E09: 11
};

// ──────────────────────────────────────────────────────────────────────
// 渲染：總覽頁面 (Overview)
// ──────────────────────────────────────────────────────────────────────
function renderOverview() {
  // Hero Banner
  const hero = document.getElementById('overview-hero');
  if (hero) {
    hero.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.75rem;flex-wrap:wrap;">
        <span class="tag" style="font-size:0.82rem;padding:0.25rem 0.75rem;">A2.2 個人成長旗艦知識庫</span>
        <span class="tag" style="background:rgba(217,119,6,0.15);color:var(--accent-gold);font-weight:700;">🌟 10 分鐘麥肯錫導讀簡報</span>
        <span class="tag" style="background:rgba(16,185,129,0.15);color:#10b981;">120 講雙軌全景</span>
      </div>
      <h1 class="hero-title">${overviewData.heroTitle}</h1>
      <p class="hero-subtitle">${overviewData.heroSubtitle}</p>
      <div style="display:flex;gap:0.85rem;margin-top:1.4rem;flex-wrap:wrap;">
        <a href="briefing.html" class="btn-briefing-gold" style="padding:0.7rem 1.4rem;font-size:0.95rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>🌟 放映 10 分鐘精華導讀（麥肯錫 14 頁簡報）</span>
        </a>
        <a href="wan_thinking_tools_100_briefing.pptx" download="wan_thinking_tools_100_briefing.pptx" class="btn-download-gold" style="padding:0.65rem 1.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>📥 下載 16:9 PPTX 簡報（含講稿備忘）</span>
        </a>
        <a href="slides.html" class="btn-launch-slides" style="padding:0.65rem 1.25rem;font-size:0.9rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>120 講沉浸式放映</span>
        </a>
        <button class="btn-search" onclick="switchTab('registry')" style="padding:0.65rem 1.2rem;border-radius:9999px;">
          <span>🧭 檢視知識庫擴充體系</span>
        </button>
      </div>`;
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

  // 10-Minute McKinsey Briefing Deck Showcase Banner
  const showcaseEl = document.getElementById('overview-briefing-showcase');
  if (showcaseEl) {
    showcaseEl.innerHTML = `
      <div class="briefing-showcase">
        <div class="briefing-showcase-header">
          <div class="briefing-showcase-title">
            <span>🏛️</span>
            <span>10 分鐘精華導讀簡報（麥肯錫顧問風格 · 14 頁全收錄）</span>
          </div>
          <span class="tag" style="background:var(--accent-gold);color:#18120c;font-weight:700;padding:0.3rem 0.8rem;">高管導讀首選</span>
        </div>
        <p class="briefing-showcase-desc">
          專為第一次接觸本書、時間有限的學習者設計。每頁停留約 40–50 秒，全長控制在 14 頁以內。嚴格依循金字塔原理行動結論標題、深藍（Navy）＋琥珀金視覺規範、全書架構骨架圖、E01~E09 逐模組重點、論證脈絡串聯、總結落地行動與逐頁三段式講稿備忘錄（結論 / 補充 / 轉場）。
        </p>
        <div class="briefing-feature-chips">
          <span class="feature-chip">📐 14 頁精準結構（12–16 頁規範）</span>
          <span class="feature-chip">🎯 金字塔原理行動結論標題</span>
          <span class="feature-chip">🎨 麥肯錫 Navy 深藍視覺</span>
          <span class="feature-chip">🎙️ 逐頁三段式講稿備忘錄（快捷鍵 N）</span>
          <span class="feature-chip">📺 16:9 全螢幕放映支援</span>
          <span class="feature-chip">💾 支援本地 PPTX 下載（含備忘錄）</span>
        </div>
        <div class="briefing-showcase-actions">
          <a href="briefing.html" class="btn-briefing-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>🚀 立即放映 10 分鐘簡報</span>
          </a>
          <a href="wan_thinking_tools_100_briefing.pptx" download="wan_thinking_tools_100_briefing.pptx" class="btn-download-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>📥 下載 PPTX 原檔 (84 KB)</span>
          </a>
          <a href="briefing.html#slide-2" class="btn-search-act" style="padding:0.55rem 1rem;font-size:0.85rem;border-radius:9999px;">
            <span>🦴 查看全書架構骨架圖</span>
          </a>
          <a href="briefing.html#slide-12" class="btn-search-act" style="padding:0.55rem 1rem;font-size:0.85rem;border-radius:9999px;">
            <span>🔗 查看九大章節脈絡串聯</span>
          </a>
        </div>
      </div>
    `;
  }

  // Modules Grid
  const modulesEl = document.getElementById('overview-modules');
  if (modulesEl) {
    modulesEl.innerHTML = overviewData.modules.map(m => {
      const slidePage = MODULE_SLIDE_MAPPING[m.label] || 3;
      return `
      <div class="shift-card" style="cursor:pointer;" onclick="switchTab('${m.label}')">
        <div class="shift-header">
          <span class="shift-badge">${m.label} · ${m.range}</span>
          <div style="display:flex;gap:0.4rem;align-items:center;">
            <a href="briefing.html#slide-${slidePage}" onclick="event.stopPropagation();" class="tag" style="text-decoration:none;background:var(--accent-gold);color:#18120c;font-weight:700;" title="直接跳轉至此模組 10 分鐘精華導讀簡報 (P${slidePage})">
              🌟 模組導讀 (P${slidePage})
            </a>
            <a href="slides.html?module=${m.label}" onclick="event.stopPropagation();" class="tag" style="text-decoration:none;" title="播放此模組 120 講投影片">
              📊 120 講放映
            </a>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
          <div class="stat-icon" style="color:var(--accent-gold);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div class="lecture-title">${m.title}</div>
        </div>
        <p class="lecture-summary">${m.desc}</p>
        <ul class="highlights-list">
          ${m.points.map(p => `<li class="highlight-item">${escapeHtml(p)}</li>`).join('')}
        </ul>
      </div>`;
    }).join('');
  }

  // Shifts Grid
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
            ${escapeHtml(s.old)}
          </div>
          <div class="vs-box vs-new">
            <div class="vs-title">✅ 新思維</div>
            ${escapeHtml(s.new)}
          </div>
        </div>
      </div>`).join('');
  }
}

// ──────────────────────────────────────────────────────────────────────
// 渲染：擴充體系中心 (Registry Hub)
// ──────────────────────────────────────────────────────────────────────
function renderRegistry() {
  const grid = document.getElementById('registry-topics-grid');
  if (!grid || !window.KNOWLEDGE_REGISTRY) return;

  grid.innerHTML = KNOWLEDGE_REGISTRY.topics.map(t => `
    <div class="topic-card">
      <div class="topic-header-row">
        <span class="topic-id-badge">${t.id}</span>
        <span class="topic-status-badge ${t.status}">${t.badge}</span>
      </div>

      <div>
        <h3 class="topic-title">${t.title}</h3>
        <p style="font-size:0.85rem;color:var(--accent-gold);margin-top:0.25rem;">${t.subtitle}</p>
      </div>

      <p class="topic-desc">${t.description}</p>

      <div class="topic-tags-row">
        ${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>

      <div class="topic-actions-row">
        ${t.status === 'active' ? `
          <a href="briefing.html" class="btn-topic-action primary" style="background:var(--accent-gold);color:#18120c;font-weight:700;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>🌟 10 分鐘導讀簡報</span>
          </a>
          <a href="wan_thinking_tools_100_briefing.pptx" download="wan_thinking_tools_100_briefing.pptx" class="btn-topic-action secondary" title="下載 16:9 PPTX">
            <span>📥 下載 PPTX</span>
          </a>
          <a href="${t.links.slides}" class="btn-topic-action secondary">
            <span>📊 120 講放映</span>
          </a>
          <button onclick="switchTab('E01')" class="btn-topic-action secondary">
            <span>📖 瀏覽卡片</span>
          </button>
        ` : `
          <a href="${t.links.slides}" class="btn-topic-action secondary" style="opacity:0.75;" onclick="alert('【${t.title}】主題資料架構已預備，即將於下一階段匯入 Obsidian 筆記！');return false;">
            <span>預覽架構簡報</span>
          </a>
          <button class="btn-topic-action secondary" onclick="alert('【${t.title}】可依據下方《未來資料擴充架構規範》無縫擴充！')">
            <span>查看資料規範</span>
          </button>
        `}
      </div>
    </div>`).join('');
}

// ──────────────────────────────────────────────────────────────────────
// 通用模組渲染器 (Dynamic Module Renderer for E01 ~ E09)
// ──────────────────────────────────────────────────────────────────────
function renderModule(modId) {
  const container = document.getElementById(`e0${modId.slice(1).toLowerCase()}-content`) ||
                    document.getElementById(`${modId.toLowerCase()}-content`);
  if (!container || !modulesData[modId]) return;

  const mod = modulesData[modId];
  const slidePage = MODULE_SLIDE_MAPPING[modId] || 3;

  let html = `
    <!-- Module Header Banner -->
    <div class="module-banner-box">
      <div>
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.4rem;flex-wrap:wrap;">
          <span class="shift-badge">${mod.id} · ${mod.range}</span>
          <span class="tag">${mod.lecturesCount} 講全收錄</span>
          <span class="tag" style="background:rgba(217,119,6,0.15);color:var(--accent-gold);">麥肯錫導讀 P${slidePage}</span>
        </div>
        <div class="module-banner-quote">“ ${escapeHtml(mod.quote)} ”</div>
      </div>
      <div style="display:flex;gap:0.65rem;flex-wrap:wrap;align-items:center;">
        <a href="briefing.html#slide-${slidePage}" class="btn-briefing-gold" style="padding:0.5rem 1.1rem;font-size:0.86rem;" title="進入本模組 10 分鐘麥肯錫導讀簡報">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>🌟 本模組導讀簡報 (P${slidePage})</span>
        </a>
        <a href="slides.html?module=${mod.id}" class="btn-launch-slides" style="padding:0.5rem 1.1rem;font-size:0.86rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>播放 ${mod.id} 120 講簡報</span>
        </a>
      </div>
    </div>

    <!-- Lectures Cards Grid -->
    <div class="cards-grid">
      ${mod.lectures.map(l => renderLectureCard(l)).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// ──────────────────────────────────────────────────────────────────────
// 通用：渲染單講卡片 (Lecture Card)
// ──────────────────────────────────────────────────────────────────────
function renderLectureCard(l) {
  return `
    <div class="lecture-card" id="card-${l.num}">
      <!-- Concept Image Thumbnail -->
      <div class="lecture-card-thumb-wrap">
        <img src="${l.image.thumb || l.image.url}" alt="${escapeHtml(l.title)}" class="lecture-card-thumb" loading="lazy" />
        <div class="card-thumb-badge">🖼️ 隱喻：${escapeHtml(l.image.metaphor)}</div>
      </div>

      <div class="lecture-header">
        <span class="lecture-num">第 ${l.num} 講</span>
        <div class="lecture-title">${escapeHtml(l.title)}</div>
      </div>

      <div class="slide-tagline-box" style="margin:0.65rem 0;font-size:0.84rem;padding:0.5rem 0.75rem;">
        💡 ${escapeHtml(l.tagline)}
      </div>

      <!-- Cognitive Dual Track Preview -->
      <div class="cognitive-preview-row">
        <div class="cognitive-item">
          <span class="cognitive-pill green">🟢 入門白話</span>
          <span>${escapeHtml(l.beginner.metaphor)}</span>
        </div>
        <div class="cognitive-item">
          <span class="cognitive-pill gold">🔥 進階框架</span>
          <span>${escapeHtml(l.advanced.framework)}</span>
        </div>
      </div>

      <ul class="highlights-list">
        ${l.highlights.slice(0, 3).map(h => `<li class="highlight-item">${escapeHtml(h)}</li>`).join('')}
      </ul>

      <!-- Direct Slide Launcher Button -->
      <a href="slides.html?slide=${l.num}" class="btn-card-slide" title="在全景簡報中放映第 ${l.num} 講">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>觀看本講簡報（第 ${l.num} 講）</span>
      </a>
    </div>`;
}

// ──────────────────────────────────────────────────────────────────────
// Tab 切換邏輯 (Tabs Management)
// ──────────────────────────────────────────────────────────────────────
const TAB_MAP = {
  overview: 'tab-overview',
  registry: 'tab-registry',
  E01: 'tab-e01',
  E02: 'tab-e02',
  E03: 'tab-e03',
  E04: 'tab-e04',
  E05: 'tab-e05',
  E06: 'tab-e06',
  E07: 'tab-e07',
  E08: 'tab-e08',
  E09: 'tab-e09',
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
    if (tabKey === 'overview') {
      renderOverview();
    } else if (tabKey === 'registry') {
      renderRegistry();
    } else if (tabKey.startsWith('E0')) {
      renderModule(tabKey);
    }

    setTimeout(() => {
      try { mermaid.run(); } catch (e) { /* ignore */ }
    }, 120);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ──────────────────────────────────────────────────────────────────────
// 搜尋 Modal 邏輯 (Global Keyword Search)
// ──────────────────────────────────────────────────────────────────────
const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const btnSearchClose = document.getElementById('btn-search-close');

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
if (btnSearchClose) btnSearchClose.addEventListener('click', closeSearch);

searchModal.addEventListener('click', e => {
  if (e.target === searchModal) closeSearch();
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openSearch();
  }
  if (e.key === 'Escape') closeSearch();
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = '';
    return;
  }

  const results = searchIndex.filter(item =>
    item.keywords.toLowerCase().includes(q)
  ).slice(0, 10);

  if (!results.length) {
    searchResults.innerHTML = `<div style="color:var(--text-muted);padding:1.5rem;text-align:center;">沒有找到相關內容</div>`;
    return;
  }

  searchResults.innerHTML = results.map(r => `
    <div class="search-result-item" style="display:flex;align-items:center;justify-content:space-between;gap:1rem;">
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.25rem;">
          <span class="lecture-num" style="padding:0.15rem 0.5rem;font-size:0.75rem;">第 ${r.num} 講</span>
          <span class="tag">${r.module} · ${escapeHtml(r.moduleName)}</span>
        </div>
        <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);">${escapeHtml(r.title)}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.2rem;">${escapeHtml(r.tagline)}</div>
      </div>
      <div class="search-result-actions" style="display:flex;gap:0.4rem;align-items:center;">
        <button class="btn-search-act" onclick="jumpToCard('${r.module}', '${r.num}')">📖 查看卡片</button>
        <a href="slides.html?slide=${r.num}" class="btn-search-act" style="background:var(--accent-gold);color:#18120c;">📊 120 講放映</a>
        <a href="briefing.html#slide-${MODULE_SLIDE_MAPPING[r.module] || 3}" class="btn-search-act" style="background:#1e3a8a;color:#ffffff;" title="查看所屬模組 10 分鐘導讀簡報">🌟 模組導讀</a>
      </div>
    </div>`).join('');
});

function jumpToCard(moduleId, numStr) {
  closeSearch();
  switchTab(moduleId);
  setTimeout(() => {
    const card = document.getElementById(`card-${numStr}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.outline = '2px solid var(--accent-gold)';
      setTimeout(() => { card.style.outline = 'none'; }, 2000);
    }
  }, 250);
}

// ──────────────────────────────────────────────────────────────────────
// 主題切換 (Light / Dark Theme)
// ──────────────────────────────────────────────────────────────────────
const themeBtn = document.getElementById('btn-theme-toggle');
themeBtn.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

// ──────────────────────────────────────────────────────────────────────
// 初始化事件綁定 (Initialization)
// ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const tab = item.getAttribute('data-tab');
    if (tab) switchTab(tab);
  });
});

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.addEventListener('DOMContentLoaded', () => {
  renderOverview();
  renderedTabs.add('overview');

  setTimeout(() => {
    try { mermaid.run(); } catch (e) { /* ignore */ }
  }, 200);
});
