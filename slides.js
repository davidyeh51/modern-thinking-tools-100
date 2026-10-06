/* =====================================================================
   slides.js — 16:9 全景沉浸式簡報播放器互動邏輯
   支援全 120 講切換、雙軌認知模式切換、鍵盤快捷鍵、全螢幕投影與全局搜尋
   ===================================================================== */

(function () {
  'use strict';

  // 1. 狀態管理
  let currentIndex = 0;
  let activeView = 'dual'; // 'dual' | 'beginner' | 'advanced'
  const totalSlides = allLectures.length; // 120

  // 2. DOM 元素快取
  const slideContainer = document.getElementById('slide-container');
  const slideCounterBadge = document.getElementById('slide-counter-badge');
  const progressFill = document.getElementById('progress-fill');
  const slidePercent = document.getElementById('slide-percent');
  const progressTrack = document.getElementById('progress-track');
  const moduleSelect = document.getElementById('module-select');
  const lectureSelect = document.getElementById('lecture-select');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const viewButtons = document.querySelectorAll('.view-btn');
  const themeToggle = document.getElementById('btn-theme-toggle');
  const fullscreenToggle = document.getElementById('btn-fullscreen-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const btnSearchTrigger = document.getElementById('btn-search-trigger');
  const btnCloseSearch = document.getElementById('btn-close-search');

  // 3. 初始化講數選單 (Lecture Dropdown)
  function initLectureDropdown() {
    lectureSelect.innerHTML = allLectures.map((l, idx) => `
      <option value="${idx}">第 ${l.num} 講：${escapeHtml(l.title.split('：')[0])}</option>
    `).join('');
  }

  // 4. 解析初始 URL 參數 (Deep Linking)
  function parseInitialSlide() {
    const params = new URLSearchParams(window.location.search);
    const slideParam = params.get('slide');
    const moduleParam = params.get('module');
    const hash = window.location.hash;

    if (slideParam) {
      const targetNum = String(parseInt(slideParam, 10)).padStart(3, '0');
      const idx = allLectures.findIndex(l => l.num === targetNum);
      if (idx !== -1) return idx;
    }

    if (hash && hash.startsWith('#slide-')) {
      const targetNum = hash.replace('#slide-', '').padStart(3, '0');
      const idx = allLectures.findIndex(l => l.num === targetNum);
      if (idx !== -1) return idx;
    }

    if (moduleParam) {
      const idx = allLectures.findIndex(l => l.module.toUpperCase() === moduleParam.toUpperCase());
      if (idx !== -1) return idx;
    }

    return 0; // Default to first lecture
  }

  // 5. 渲染投影片
  function renderSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    const l = allLectures[currentIndex];

    // 更新選單狀態
    lectureSelect.value = currentIndex;
    moduleSelect.value = l.module;

    // 更新進度指示器
    const percent = Math.round(((currentIndex + 1) / totalSlides) * 100);
    progressFill.style.width = `${((currentIndex + 1) / totalSlides) * 100}%`;
    slidePercent.textContent = `${percent}%`;
    slideCounterBadge.textContent = `第 ${l.num} 講 / 共 ${totalSlides} 講 · ${l.moduleName}`;

    // 更新 Hash
    history.replaceState(null, '', `#slide-${l.num}`);

    // Fallback SVG icon for resilience
    const fallbackSvg = `
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(245,166,35,0.08);color:var(--accent-gold);">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
      </div>`;

    // 構建投影片主體 HTML
    slideContainer.innerHTML = `
      <!-- 左欄：視覺配圖與大標題 -->
      <aside class="slide-visual-col">
        <div class="lecture-badge-row">
          <span class="badge-module">${l.module} · ${escapeHtml(l.moduleName)}</span>
          <span class="badge-number">第 ${l.num} 講</span>
        </div>

        <h1 class="slide-main-title">${escapeHtml(l.title)}</h1>

        <div class="slide-tagline-box">
          💡 ${escapeHtml(l.tagline)}
        </div>

        <!-- 概念圖片與隱喻解讀 -->
        <div class="slide-image-wrap">
          <img src="${l.image.url}" alt="${escapeHtml(l.image.alt)}" class="slide-image" loading="lazy" onerror="this.outerHTML='${fallbackSvg.replace(/\n/g, '')}'" />
        </div>

        <div class="image-metaphor-bar">
          <span class="image-metaphor-icon">🖼️</span>
          <div><strong>視覺隱喻：</strong>${escapeHtml(l.image.metaphor)}</div>
        </div>

        <!-- 落地實踐行動 -->
        <div class="slide-action-box">
          <div class="slide-action-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <span>落地實踐與思考清單</span>
          </div>
          <div>${escapeHtml(l.action)}</div>
        </div>
      </aside>

      <!-- 右欄：雙階認知內容 (入門 vs 進階) -->
      <section class="slide-content-col" data-active-view="${activeView}">
        
        <div class="cognitive-deck">
          <!-- 🟢 入門理解：白話生活拆解 -->
          <article class="cognitive-card beginner">
            <div class="card-header-row">
              <span class="card-badge-pill green">
                <span>🟢</span>
                <span>入門理解 · 白話生活拆解</span>
              </span>
              <span class="card-target-text">初學者一分鐘秒懂</span>
            </div>

            <div class="item-block">
              <div class="item-label">💡 白話生活比喻</div>
              <div class="item-body">${escapeHtml(l.beginner.metaphor)}</div>
            </div>

            <div class="item-block">
              <div class="item-label">🎯 常人痛點與直覺盲區</div>
              <div class="item-body">${escapeHtml(l.beginner.painPoint)}</div>
            </div>

            <div class="item-block">
              <div class="item-label">📌 直覺透視結論</div>
              <div class="item-body" style="font-weight:600;color:var(--text-primary);">${escapeHtml(l.beginner.plainTakeaway)}</div>
            </div>
          </article>

          <!-- 🔥 進階建構：底層思維框架 -->
          <article class="cognitive-card advanced">
            <div class="card-header-row">
              <span class="card-badge-pill gold">
                <span>🔥</span>
                <span>進階建構 · 底層思維框架</span>
              </span>
              <span class="card-target-text">高階者建立思考骨架</span>
            </div>

            <div class="item-block">
              <div class="item-label">🧠 底層原理與學術脈絡</div>
              <div class="item-body">${escapeHtml(l.advanced.lineage)}</div>
            </div>

            <div class="item-block">
              <div class="item-label">⚙️ 思考架構與決策模型</div>
              <div class="item-body">${escapeHtml(l.advanced.framework)}</div>
            </div>

            <div class="item-block">
              <div class="item-label">🛡️ 邊界條件與反脆弱防護</div>
              <div class="item-body">${escapeHtml(l.advanced.boundary)}</div>
            </div>
          </article>
        </div>

        <!-- 📋 核心精華亮點清單 -->
        <div class="highlights-block">
          <div class="highlights-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>本講核心精華亮點提煉</span>
          </div>
          <ul class="highlights-list">
            ${l.highlights.map(h => `<li class="highlight-row">${escapeHtml(h)}</li>`).join('')}
          </ul>
        </div>
      </section>
    `;

    // 按鈕可用性更新
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === totalSlides - 1;
  }

  // 6. 視角切換器
  function setCognitiveView(viewName) {
    activeView = viewName;
    viewButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });
    const col = document.querySelector('.slide-content-col');
    if (col) {
      col.setAttribute('data-active-view', viewName);
    }
  }

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      setCognitiveView(view);
    });
  });

  // 7. 翻頁控制
  function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
      renderSlide(index);
    }
  }

  btnPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
  btnNext.addEventListener('click', () => goToSlide(currentIndex + 1));

  lectureSelect.addEventListener('change', (e) => {
    goToSlide(parseInt(e.target.value, 10));
  });

  moduleSelect.addEventListener('change', (e) => {
    const modId = e.target.value;
    const idx = allLectures.findIndex(l => l.module === modId);
    if (idx !== -1) goToSlide(idx);
  });

  // 進度條點擊跳轉
  progressTrack.addEventListener('click', (e) => {
    const rect = progressTrack.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const targetIdx = Math.min(totalSlides - 1, Math.max(0, Math.floor(clickRatio * totalSlides)));
    goToSlide(targetIdx);
  });

  // 8. 鍵盤導航
  document.addEventListener('keydown', (e) => {
    if (searchModal.classList.contains('active')) {
      if (e.key === 'Escape') closeSearch();
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullscreen();
    } else if (e.key === '1') {
      setCognitiveView('dual');
    } else if (e.key === '2') {
      setCognitiveView('beginner');
    } else if (e.key === '3') {
      setCognitiveView('advanced');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // 9. 全螢幕投影切換
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
  fullscreenToggle.addEventListener('click', toggleFullscreen);

  // 10. 明/暗主題切換
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // 11. 全局搜尋邏輯
  function openSearch() {
    searchModal.classList.add('active');
    setTimeout(() => searchInput.focus(), 60);
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  btnSearchTrigger.addEventListener('click', openSearch);
  btnCloseSearch.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '';
      return;
    }

    const matched = searchIndex.filter(item =>
      item.keywords.toLowerCase().includes(q)
    ).slice(0, 10);

    if (matched.length === 0) {
      searchResults.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--text-muted);">沒有找到匹配的思維工具</div>`;
      return;
    }

    searchResults.innerHTML = matched.map(m => {
      const idx = allLectures.findIndex(l => l.num === m.num);
      return `
        <div class="search-result-row" onclick="window.slidesGoTo(${idx})">
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
              <span class="badge-module" style="padding:0.15rem 0.45rem;font-size:0.75rem;">${m.module}</span>
              <span class="badge-number" style="padding:0.15rem 0.45rem;font-size:0.75rem;">第 ${m.num} 講</span>
            </div>
            <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary);">${escapeHtml(m.title)}</div>
          </div>
          <span style="color:var(--accent-gold);font-size:0.82rem;font-weight:600;">跳轉 ➜</span>
        </div>`;
    }).join('');
  });

  window.slidesGoTo = function (idx) {
    closeSearch();
    goToSlide(idx);
  };

  // 12. 工具函數：HTML 跳脫
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 13. 頁面啟動初始化
  initLectureDropdown();
  const startSlide = parseInitialSlide();
  renderSlide(startSlide);

})();
