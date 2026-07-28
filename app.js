// Application Logic for 万维钢《现代思维工具100讲》 Web App

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderOverview();
  renderE01();
  renderE02();
  renderE03();
  setupNavigation();
  setupSearch();
  initMermaid();
});

// Theme Toggle
function initTheme() {
  const themeBtn = document.getElementById('btn-theme-toggle');
  const savedTheme = localStorage.getItem('app-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('app-theme', newTheme);
    });
  }
}

// Helper to get SVG string
function getIconSvg(iconKey) {
  return SVG_ICONS[iconKey] || SVG_ICONS['book-open'];
}

// 1. Render Overview
function renderOverview() {
  const data = APP_DATA.overview;
  
  // Hero
  const heroEl = document.getElementById('overview-hero');
  if (heroEl) {
    heroEl.innerHTML = `
      <h1 class="hero-title">${data.title}</h1>
      <p class="hero-subtitle">${data.subtitle}</p>
    `;
  }

  // Stats Grid
  const statsContainer = document.getElementById('overview-stats');
  if (statsContainer) {
    statsContainer.innerHTML = data.stats.map(s => `
      <div class="stat-card">
        <div class="stat-icon">${getIconSvg(s.icon)}</div>
        <div>
          <div class="stat-val">${s.value}</div>
          <div class="stat-lbl">${s.label} - ${s.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // Paradigm Shifts
  const shiftsContainer = document.getElementById('overview-shifts');
  if (shiftsContainer) {
    shiftsContainer.innerHTML = data.paradigmShifts.map(shift => `
      <div class="shift-card">
        <div class="shift-header">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <div style="width:28px; height:28px; color:var(--accent-indigo)">${getIconSvg(shift.svgIcon)}</div>
            <h3 style="font-size:1.05rem; font-weight:700;">${shift.title}</h3>
          </div>
          <span class="shift-badge">${shift.module}</span>
        </div>
        <div class="shift-vs">
          <div class="vs-box vs-old">
            <div class="vs-title">❌ 旧思维 / 局部理性</div>
            <div>${shift.oldMindset}</div>
          </div>
          <div class="vs-box vs-new">
            <div class="vs-title">✨ 新思维 / 能动者</div>
            <div>${shift.newMindset}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Module Master Summary Cards
  const masterContainer = document.getElementById('overview-modules');
  if (masterContainer) {
    masterContainer.innerHTML = data.moduleMasterSummary.map(m => `
      <div class="shift-card" style="border-left: 4px solid var(--accent-indigo); cursor: pointer;" onclick="switchToTab('${m.id}')">
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:0.4rem; color:var(--accent-indigo);">${m.name}</h3>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.75rem;">${m.shortDesc}</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${m.keyConcepts.map(c => `<span style="font-size:0.75rem; padding:0.2rem 0.5rem; background:rgba(99,102,241,0.12); border-radius:4px; color:var(--text-primary);">${c}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

// Helper for rendering lecture card
function createLectureCardHtml(lec) {
  return `
    <div class="lecture-card" id="lecture-${lec.num}">
      <div class="lecture-header">
        <span class="lecture-num">第 ${lec.num} 讲</span>
        <div style="display:flex; align-items:center; gap:0.5rem; flex:1;">
          <div style="width:24px; height:24px; color:var(--accent-teal);">${getIconSvg(lec.iconKey)}</div>
          <h3 class="lecture-title">${lec.title}</h3>
        </div>
      </div>
      <p class="lecture-summary">${lec.summary}</p>
      <ul class="highlights-list">
        ${lec.highlights.map(h => `<li class="highlight-item">${h}</li>`).join('')}
      </ul>
    </div>
  `;
}

// 2. Render E01
function renderE01() {
  const data = APP_DATA.e01;
  const container = document.getElementById('e01-content');
  if (!container) return;

  let html = `
    <div class="quote-box">
      <strong>E01 核心贯穿命题：</strong> ${data.summaryQuote}
    </div>
    
    <div class="section-header">
      <h2 class="section-title">逐讲重点摘要 (01～07 讲)</h2>
    </div>
    <div class="lectures-list">
      ${data.lectures.map(lec => createLectureCardHtml(lec)).join('')}
    </div>

    <div class="section-header" style="margin-top:2.5rem;">
      <h2 class="section-title">三层「自我」LLM 工作模型 (第 07 讲)</h2>
    </div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>自我层级</th>
          <th>定义与机制</th>
          <th>LLM 大模型类比</th>
          <th>变量属性</th>
        </tr>
      </thead>
      <tbody>
        ${data.threeSelvesTable.map(row => `
          <tr>
            <td style="font-weight:700; color:var(--accent-teal);">${row.self}</td>
            <td>${row.def}</td>
            <td><code>${row.llm}</code></td>
            <td><span style="padding:0.2rem 0.5rem; background:rgba(99,102,241,0.15); border-radius:4px; font-size:0.8rem;">${row.level}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

// 3. Render E02
function renderE02() {
  const data = APP_DATA.e02;
  const container = document.getElementById('e02-content');
  if (!container) return;

  let html = `
    <div class="quote-box">
      <strong>E02 核心贯穿命题：</strong> ${data.summaryQuote}
    </div>
  `;

  data.categories.forEach(cat => {
    html += `
      <div class="category-block">
        <h2 class="category-title">
          <span>❖</span> ${cat.name}
        </h2>
        <div class="lectures-list">
          ${cat.lectures.map(lec => createLectureCardHtml(lec)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// 4. Render E03
function renderE03() {
  const data = APP_DATA.e03;
  const container = document.getElementById('e03-content');
  if (!container) return;

  let html = `
    <div class="quote-box">
      <strong>E03 核心贯穿命题：</strong> ${data.summaryQuote}
    </div>
  `;

  data.layers.forEach(layer => {
    html += `
      <div class="category-block">
        <h2 class="category-title" style="color:var(--accent-amber);">
          <span>✦</span> ${layer.name}
        </h2>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:1rem;">${layer.description}</p>
        <div class="lectures-list">
          ${layer.lectures.map(lec => createLectureCardHtml(lec)).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Navigation Tab Switcher
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchToTab(tabId);
    });
  });
}

function switchToTab(tabId) {
  // nav item active state
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('data-tab') === tabId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // tab content active state
  document.querySelectorAll('.tab-content').forEach(content => {
    if (content.id === `tab-${tabId.toLowerCase()}`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global Search
function setupSearch() {
  const searchBtn = document.getElementById('btn-search-trigger');
  const modal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  if (!searchBtn || !modal || !searchInput) return;

  function openSearch() {
    modal.classList.add('active');
    searchInput.focus();
  }

  function closeSearch() {
    modal.classList.remove('active');
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  }

  searchBtn.addEventListener('click', openSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      resultsContainer.innerHTML = '';
      return;
    }

    const matches = [];

    // Flatten all lectures
    const allLectures = [
      ...APP_DATA.e01.lectures.map(l => ({ ...l, tab: 'E01' })),
      ...APP_DATA.e02.categories.flatMap(c => c.lectures.map(l => ({ ...l, tab: 'E02' }))),
      ...APP_DATA.e03.layers.flatMap(l => l.lectures.map(lec => ({ ...lec, tab: 'E03' })))
    ];

    allLectures.forEach(lec => {
      const matchInNum = lec.num.includes(query);
      const matchInTitle = lec.title.toLowerCase().includes(query);
      const matchInSummary = lec.summary.toLowerCase().includes(query);
      const matchInHighlights = lec.highlights && lec.highlights.some(h => h.toLowerCase().includes(query));

      if (matchInNum || matchInTitle || matchInSummary || matchInHighlights) {
        matches.push(lec);
      }
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div style="padding:1rem; text-align:center; color:var(--text-muted);">未找到相关讲数或内容</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(m => `
      <div class="search-result-item" onclick="jumpToLecture('${m.tab}', '${m.num}')">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.3rem;">
          <span style="font-weight:700; color:var(--accent-indigo);">第 ${m.num} 讲 ${m.title}</span>
          <span class="shift-badge">${m.tab}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-secondary);">${m.summary.substring(0, 80)}...</div>
      </div>
    `).join('');
  });
}

function jumpToLecture(tabId, num) {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.remove('active');

  switchToTab(tabId);

  setTimeout(() => {
    const el = document.getElementById(`lecture-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.border = '2px solid var(--accent-indigo)';
      setTimeout(() => { el.style.border = ''; }, 2000);
    }
  }, 200);
}

// Mermaid init
function initMermaid() {
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose'
    });
  }
}
