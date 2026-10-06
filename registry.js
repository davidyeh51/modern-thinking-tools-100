/* =====================================================================
   registry.js — 大腦知識庫總目錄與多主題可擴充註冊架構
   支援未來無縫擴充：A2.2.1 思維框架, A2.2.2 超級個體, A2.2.3 系統思考, A2.2.4 心理學 等
   ===================================================================== */

const KNOWLEDGE_REGISTRY = {
  version: '2.0.0',
  updatedAt: '2026-10-06',
  
  // 核心主題目錄清單
  topics: [
    {
      id: 'A2.2.1',
      code: 'thinking-tools-100',
      title: 'A2.2.1 思維框架 · 萬維鋼·現代思維工具 100 講',
      subtitle: '全景認知作業系統 · 9 大核心模組 · 120 講完整精華導讀與決策模型',
      status: 'active',
      badge: '旗艦上線 · 120 講全收錄',
      color: '#f5a623',
      totalLectures: 120,
      totalModules: 9,
      tags: ['認知科學', '心智模型', '決策判斷', '商業槓桿', '複雜系統', '領導力'],
      description: '將現代前沿物理、認知心理學、資訊論、演化博弈與管理學，萃取為 120 個頂尖決策心智工具。專為初學者破除盲點、進階者建構體系而設計。',
      links: {
        portal: 'index.html',
        slides: 'slides.html',
        firstSlide: 'slides.html?slide=001'
      }
    },
    {
      id: 'A2.2.2',
      code: 'super-individual',
      title: 'A2.2.2 超級個體 · 隱性潛能與高維學習',
      subtitle: '個人商業模式躍遷 · 隱性潛能釋放 · 費曼 AI 個人化深度學習',
      status: 'planned',
      badge: '架構已預備 · 待匯入',
      color: '#4a90e2',
      totalLectures: 30,
      totalModules: 3,
      tags: ['超級個體', '隱性潛能', '費曼學習法', '個人杠桿'],
      description: '聚焦亞當·格蘭特《隱性潛能》、費曼學習法AI賦能、個人知識資產複利化，探索個體在AI時代突破邊界的實踐路徑。',
      links: {
        portal: 'index.html#A2.2.2',
        slides: 'slides.html?topic=A2.2.2',
        firstSlide: '#'
      }
    },
    {
      id: 'A2.2.3',
      code: 'systems-thinking',
      title: 'A2.2.3 系統思考 · 破框思維與動態反饋',
      subtitle: '麥肯錫結構化分析 · 系統動力學 · 因果迴路與破框決策法',
      status: 'planned',
      badge: '架構已預備 · 待匯入',
      color: '#50e3c2',
      totalLectures: 25,
      totalModules: 3,
      tags: ['系統動力學', '因果反饋', '破框思維', '麥肯錫方法'],
      description: '從全盲決策專家《破框思維的技術》與麥肯錫顧問方法論出發，建立看見系統冰山底層結構與反饋迴路的高階視野。',
      links: {
        portal: 'index.html#A2.2.3',
        slides: 'slides.html?topic=A2.2.3',
        firstSlide: '#'
      }
    },
    {
      id: 'A2.2.4',
      code: 'psychology-development',
      title: 'A2.2.4 心理學 · 自我發展與心智躍遷',
      subtitle: '陳海賢自我發展心理學 · 心智發展階梯 · 克服倦怠與認知重構',
      status: 'planned',
      badge: '架構已預備 · 待匯入',
      color: '#bd10e0',
      totalLectures: 30,
      totalModules: 4,
      tags: ['自我發展', '心智階梯', '心理學', '認知重構'],
      description: '深入解構自我發展的五大轉折期、關係思維與情緒容器，幫助個體穿越現代人的「過勞倦怠」，實現心智模式升維。',
      links: {
        portal: 'index.html#A2.2.4',
        slides: 'slides.html?topic=A2.2.4',
        firstSlide: '#'
      }
    }
  ],

  // 註冊擴充輔助函數
  registerNewTopic(topicConfig) {
    if (!topicConfig || !topicConfig.id) {
      console.error('Invalid topic configuration.');
      return false;
    }
    this.topics.push(topicConfig);
    console.log('Successfully registered new knowledge topic:', topicConfig.title);
    return true;
  }
};

// 匯出供瀏覽器與 Node 雙向支援
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KNOWLEDGE_REGISTRY };
}
