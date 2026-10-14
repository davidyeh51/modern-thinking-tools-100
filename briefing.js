/* =====================================================================
   briefing.js — 麥肯錫顧問風格 10 分鐘獨立模組導讀簡報互動控制器
   支援九大模組切換 (E01～E09)、雙欄實體對比表格/矩陣渲染、逐頁三段講稿備忘、全螢幕放映
   ===================================================================== */

(function () {
  'use strict';

  // 取得模組資料
  const configs = typeof MODULE_CONFIGS !== 'undefined' ? MODULE_CONFIGS : {};
  const allDecks = typeof BRIEFING_DECKS !== 'undefined' ? BRIEFING_DECKS : {};

  // 當前狀態
  let currentModuleId = 'E01';
  let currentIndex = 0;
  let currentDeck = [];
  let totalSlides = 0;

  // DOM 元素快取
  const viewport = document.getElementById('slide-viewport');
  const moduleSelect = document.getElementById('briefing-module-select');
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
  const btnDownloadPptx = document.getElementById('btn-download-pptx');
  const btnDownloadText = document.getElementById('btn-download-text');

  // 解析 URL 參數
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('module');
    if (m && allDecks[m]) {
      currentModuleId = m;
    }
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const p = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(p) && p >= 1) {
        currentIndex = p - 1;
      }
    }
  }

  // 初始化模組下拉選單
  function initModuleSelect() {
    if (!moduleSelect) return;
    const moduleKeys = Object.keys(configs);
    moduleSelect.innerHTML = moduleKeys.map(k => {
      const cfg = configs[k];
      return `<option value="${k}" ${k === currentModuleId ? 'selected' : ''}>${cfg.id} ${cfg.name} (${cfg.totalSlides}頁 · 10分鐘)</option>`;
    }).join('');
  }

  // 切換模組
  function switchModule(modId, targetSlideIndex = 0) {
    if (!allDecks[modId]) return;
    currentModuleId = modId;
    currentDeck = allDecks[modId];
    totalSlides = currentDeck.length;
    currentIndex = Math.min(targetSlideIndex, totalSlides - 1);

    // 更新模組下拉
    if (moduleSelect) moduleSelect.value = modId;

    // 更新 PPTX 下載按鈕
    if (btnDownloadPptx) {
      const pptxName = `briefing_${modId}.pptx`;
      btnDownloadPptx.href = pptxName;
      btnDownloadPptx.setAttribute('download', pptxName);
      if (btnDownloadText) {
        btnDownloadText.textContent = `下載 ${modId} PPTX`;
      }
    }

    // 更新頁面下拉選單
    initSlideDropdown();

    // 更新 URL 查詢參數（不重載頁面）
    const newUrl = `${window.location.pathname}?module=${modId}#slide-${currentIndex + 1}`;
    history.replaceState(null, '', newUrl);

    // 渲染投影片
    renderSlide(currentIndex);
  }

  // 初始化投影片頁數下拉選單
  function initSlideDropdown() {
    if (!slideSelect) return;
    slideSelect.innerHTML = currentDeck.map((s, idx) => {
      const title = s.type === 'cover' ? s.title : (s.conclusion_title || '').replace(/【.*?】/, '').trim();
      return `<option value="${idx}">P${idx + 1}：${escapeHtml(s.category || '')} · ${escapeHtml(title.slice(0, 14))}...</option>`;
    }).join('');
  }

  // 渲染投影片內容
  function renderSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    const s = currentDeck[currentIndex];

    // 更新選單與進度條
    if (slideSelect) slideSelect.value = currentIndex;
    const pct = Math.round(((currentIndex + 1) / totalSlides) * 100);
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (progressText) {
      progressText.textContent = `第 ${String(currentIndex + 1).padStart(2, '0')} 頁 / 共 ${totalSlides} 頁 (${currentModuleId})`;
    }

    // 更新 URL Hash
    history.replaceState(null, '', `${window.location.pathname}?module=${currentModuleId}#slide-${currentIndex + 1}`);

    if (s.type === 'cover') {
      // 封面設計
      viewport.innerHTML = `
        <div class="slide-cover-layout">
          <div>
            <div class="cover-accent-bar"></div>
            <div class="cover-category">${escapeHtml(s.category || '')}</div>
            <h1 class="cover-title">${escapeHtml(s.title || '')}</h1>
            <div class="cover-subtitle">${escapeHtml(s.subtitle || '')}</div>
            
            <div class="cover-claim-box">
              <div class="cover-claim-label">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span>模組一句話核心主張（解決什麼問題）：</span>
              </div>
              <div class="cover-claim-text">${escapeHtml(s.core_claim || '')}</div>
            </div>
          </div>

          <div class="cover-footer">
            <div>作者：<strong>${escapeHtml(s.author || '萬維鋼')}</strong>   |   導讀節奏：${escapeHtml(s.readingTime || '10 分鐘掌握')}</div>
            <div>麥肯錫顧問規範 16:9 全寬幅 · 含逐頁講稿備忘</div>
          </div>
        </div>
      `;
    } else {
      // 內頁設計：若含 visual 表格則採用雙欄佈局 (左要點 / 右表格)
      const hasTable = s.visual && s.visual.type === 'table';

      let innerHtml = `
        <div class="slide-content-layout">
          <div class="slide-meta-row">
            <span class="slide-category-badge">${escapeHtml(s.category || '')}</span>
            <span class="slide-page-badge">PAGE ${currentIndex + 1} / ${totalSlides} · ${currentModuleId}</span>
          </div>

          <h2 class="slide-conclusion-title">${escapeHtml(s.conclusion_title || '本頁結論')}</h2>
      `;

      if (hasTable) {
        // 雙欄佈局：左文字要點、右實體對比表格
        const v = s.visual;
        innerHtml += `
          <div class="slide-split-grid">
            <div class="slide-left-col">
              ${(s.cards || []).map((card, cIdx) => `
                <div class="slide-card-item">
                  <div class="card-top-stripe ${cIdx === 1 ? 'gold-stripe' : ''}"></div>
                  <div class="card-inner-content">
                    <div class="card-heading">${escapeHtml(card.title || '')}</div>
                    <ul class="card-bullet-list">
                      ${(card.points || []).map(pt => `<li class="card-bullet-point">${escapeHtml(pt)}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="slide-right-col">
              <div class="visual-table-card">
                <div class="visual-table-header">
                  <span>📊 ${escapeHtml(v.title || '對比矩陣')}</span>
                </div>
                <div class="visual-table-container">
                  <table class="visual-table">
                    <thead>
                      <tr>
                        ${(v.headers || []).map(h => `<th>${escapeHtml(h)}</th>`).join('')}
                      </tr>
                    </thead>
                    <tbody>
                      ${(v.rows || []).map(row => `
                        <tr>
                          ${row.map((cell, cIdx) => `
                            <td class="${cIdx === 0 ? 'td-highlight' : ''}">${escapeHtml(String(cell))}</td>
                          `).join('')}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // 傳統卡片網格 (2~3 卡片)
        const numCards = (s.cards || []).length;
        const gridClass = numCards === 2 ? 'cards-2' : 'cards-3';
        innerHtml += `
          <div class="slide-cards-grid ${gridClass}">
            ${(s.cards || []).map((card, cIdx) => `
              <div class="slide-card-item">
                <div class="card-top-stripe ${cIdx === 1 ? 'gold-stripe' : ''}"></div>
                <div class="card-inner-content">
                  <div class="card-heading">${escapeHtml(card.title || '')}</div>
                  <ul class="card-bullet-list">
                    ${(card.points || []).map(pt => `<li class="card-bullet-point">${escapeHtml(pt)}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      innerHtml += `</div>`;
      viewport.innerHTML = innerHtml;
    }

    // 渲染講稿備忘錄
    renderSpeakerNotes(s.speaker_notes);

    // 更新按鈕狀態
    if (btnPrev) btnPrev.disabled = currentIndex === 0;
    if (btnNext) btnNext.disabled = currentIndex === totalSlides - 1;
  }

  // 渲染講稿備忘錄
  function renderSpeakerNotes(notes) {
    if (!notesGrid || !notes) return;
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

  // 事件綁定
  if (btnPrev) btnPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (btnNext) btnNext.addEventListener('click', () => goToSlide(currentIndex + 1));

  if (moduleSelect) {
    moduleSelect.addEventListener('change', (e) => {
      switchModule(e.target.value, 0);
    });
  }

  if (slideSelect) {
    slideSelect.addEventListener('change', (e) => {
      goToSlide(parseInt(e.target.value, 10));
    });
  }

  // 進度條點選跳轉
  if (progressTrack) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const target = Math.min(totalSlides - 1, Math.max(0, Math.floor(ratio * totalSlides)));
      goToSlide(target);
    });
  }

  // 講者備忘錄開關
  function toggleNotes() {
    if (notesDrawer) notesDrawer.classList.toggle('open');
  }

  if (btnToggleNotes) btnToggleNotes.addEventListener('click', toggleNotes);
  if (btnCloseNotes) btnCloseNotes.addEventListener('click', () => notesDrawer && notesDrawer.classList.remove('open'));

  // 全螢幕切換
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
  if (btnFullscreen) btnFullscreen.addEventListener('click', toggleFullscreen);

  // 明暗主題切換
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

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
      if (notesDrawer && notesDrawer.classList.contains('open')) {
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

  // 啟動初始化
  parseUrlParams();
  initModuleSelect();
  switchModule(currentModuleId, currentIndex);

})();
