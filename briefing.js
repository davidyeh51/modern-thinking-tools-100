/* =====================================================================
   briefing.js — 麥肯錫顧問風格 10 分鐘精華導讀簡報互動控制器
   支援 14 頁精準放映、三段式講稿備忘錄切換、全螢幕投影與鍵盤導航
   ===================================================================== */

(function () {
  'use strict';

  let currentIndex = 0;
  const slides = BRIEFING_SLIDES;
  const totalSlides = slides.length; // 14

  // DOM 元素快取
  const viewport = document.getElementById('slide-viewport');
  const slideSelect = document.getElementById('briefing-slide-select');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const progressTrack = document.getElementById('progress-track');
  const btnToggleNotes = document.getElementById('btn-toggle-notes');
  const btnCloseNotes = document.getElementById('btn-close-notes');
  const notesDrawer = document.getElementById('notes-drawer');
  const notesGrid = document.getElementById('notes-content-grid');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnTheme = document.getElementById('btn-theme');

  // 初始化頁面下拉選單
  function initDropdown() {
    slideSelect.innerHTML = slides.map((s, idx) => {
      const title = s.type === 'cover' ? s.title : s.conclusion_title.replace(/【.*?】/, '').trim();
      return `<option value="${idx}">P${idx + 1}：${escapeHtml(s.category)} · ${escapeHtml(title.slice(0, 16))}...</option>`;
    }).join('');
  }

  // 解析 URL Hash
  function parseHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const p = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(p) && p >= 1 && p <= totalSlides) {
        return p - 1;
      }
    }
    return 0;
  }

  // 渲染投影片
  function renderSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    const s = slides[currentIndex];

    // 更新選單與進度
    slideSelect.value = currentIndex;
    const pct = Math.round(((currentIndex + 1) / totalSlides) * 100);
    progressFill.style.width = `${pct}%`;
    progressText.textContent = `第 ${String(currentIndex + 1).padStart(2, '0')} 頁 / 共 ${totalSlides} 頁`;

    // 更新 Hash
    history.replaceState(null, '', `#slide-${currentIndex + 1}`);

    if (s.type === 'cover') {
      // 封面設計
      viewport.innerHTML = `
        <div class="slide-cover-layout">
          <div>
            <div class="cover-accent-bar"></div>
            <div class="cover-category">${escapeHtml(s.category)}</div>
            <h1 class="cover-title">${escapeHtml(s.title)}</h1>
            <div class="cover-subtitle">${escapeHtml(s.subtitle)}</div>
            
            <div class="cover-claim-box">
              <div class="cover-claim-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>一句話核心主張（這本書到底在解決什麼問題）：</span>
              </div>
              <div class="cover-claim-text">${escapeHtml(s.core_claim)}</div>
            </div>
          </div>

          <div class="cover-footer">
            <div>作者：<strong>${escapeHtml(s.author)}</strong>   |   導讀節奏：${escapeHtml(s.readingTime)}</div>
            <div>麥肯錫顧問規範 16:9 全寬幅</div>
          </div>
        </div>
      `;
    } else {
      // 內頁設計（金字塔原理結論標題 + 2~3 卡片支撐）
      const numCards = s.cards.length;
      const gridClass = numCards === 2 ? 'cards-2' : 'cards-3';

      viewport.innerHTML = `
        <div class="slide-content-layout">
          <div class="slide-meta-row">
            <span class="slide-category-badge">${escapeHtml(s.category)}</span>
            <span class="slide-page-badge">PAGE ${currentIndex + 1} / ${totalSlides}</span>
          </div>

          <h2 class="slide-conclusion-title">${escapeHtml(s.conclusion_title)}</h2>

          <div class="slide-cards-grid ${gridClass}">
            ${s.cards.map(card => `
              <div class="slide-card-item">
                <div class="card-top-stripe"></div>
                <div class="card-inner-content">
                  <div class="card-heading">${escapeHtml(card.title)}</div>
                  <ul class="card-bullet-list">
                    ${card.points.map(pt => `
                      <li class="card-bullet-point">${escapeHtml(pt)}</li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 渲染講稿備忘錄
    renderSpeakerNotes(s.speaker_notes);

    // 更新按鈕狀態
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === totalSlides - 1;
  }

  // 渲染講稿備忘錄內容
  function renderSpeakerNotes(notes) {
    if (!notes) return;
    notesGrid.innerHTML = `
      <div class="notes-section">
        <div class="notes-sec-title">① 本頁結論（重申核心論點）</div>
        <div class="notes-sec-body">${escapeHtml(notes.conclusion || '原文未載')}</div>
      </div>
      <div class="notes-section">
        <div class="notes-sec-title">② 補充說明（支持細節與案例）</div>
        <div class="notes-sec-body">${escapeHtml(notes.explanation || '原文未載')}</div>
      </div>
      <div class="notes-section">
        <div class="notes-sec-title">③ 下一頁轉場（自然銜接論述）</div>
        <div class="notes-sec-body">${escapeHtml(notes.transition || '銜接下一階段論述')}</div>
      </div>
    `;
  }

  // 翻頁控制
  function goToSlide(idx) {
    if (idx >= 0 && idx < totalSlides) {
      renderSlide(idx);
    }
  }

  btnPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
  btnNext.addEventListener('click', () => goToSlide(currentIndex + 1));

  slideSelect.addEventListener('change', (e) => {
    goToSlide(parseInt(e.target.value, 10));
  });

  // 進度條跳轉
  progressTrack.addEventListener('click', (e) => {
    const rect = progressTrack.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const target = Math.min(totalSlides - 1, Math.max(0, Math.floor(ratio * totalSlides)));
    goToSlide(target);
  });

  // 切換講者備忘錄抽屜
  function toggleNotes() {
    notesDrawer.classList.toggle('open');
  }

  btnToggleNotes.addEventListener('click', toggleNotes);
  btnCloseNotes.addEventListener('click', () => notesDrawer.classList.remove('open'));

  // 全螢幕切換
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
  btnFullscreen.addEventListener('click', toggleFullscreen);

  // 明暗主題切換
  btnTheme.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // 鍵盤導航
  document.addEventListener('keydown', (e) => {
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
    } else if (e.key.toLowerCase() === 'n') {
      e.preventDefault();
      toggleNotes();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape') {
      if (notesDrawer.classList.contains('open')) {
        notesDrawer.classList.remove('open');
      }
    }
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

  // 初始化啟動
  initDropdown();
  const initialSlide = parseHash();
  renderSlide(initialSlide);

})();
