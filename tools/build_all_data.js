const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');

// 1. Load Traditional Chinese Conversion Dictionaries
function loadDict(filename) {
  const dict = {};
  const filepath = path.join(baseDir, filename);
  if (!fs.existsSync(filepath)) return dict;
  const lines = fs.readFileSync(filepath, 'utf8').split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    if (parts.length >= 2) {
      dict[parts[0]] = parts[1].split(' ')[0];
    }
  }
  return dict;
}

const stChars = loadDict('STCharacters.txt');
const stPhrases = loadDict('STPhrases.txt');
const sortedPhrases = Object.keys(stPhrases).sort((a, b) => b.length - a.length);

function toTC(text) {
  if (!text) return '';
  let result = text;
  for (const p of sortedPhrases) {
    if (result.includes(p)) {
      result = result.split(p).join(stPhrases[p]);
    }
  }
  let finalResult = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    finalResult += stChars[char] || char;
  }
  return finalResult
    .replace(/模塊/g, '模組')
    .replace(/網絡/g, '網路')
    .replace(/信息/g, '資訊')
    .replace(/鏈接/g, '連結')
    .replace(/交互/g, '互動')
    .replace(/內存/g, '記憶體')
    .replace(/算法/g, '演算法')
    .replace(/程式碼/g, '程式碼')
    .replace(/膝上型電腦/g, '筆記型電腦');
}

// 2. High-quality semantic Unsplash image library for mental models
const imageLibrary = [
  { theme: 'cosmos', id: '1506744038136-46273834b3fb', metaphor: '浩瀚星空與宇宙秩序，象徵第一性原理與因果律的宏大背景' },
  { theme: 'powerlaw', id: '1509228468518-180dd4864904', metaphor: '驚濤駭浪與極端浪潮，象徵不服從常態分佈的重尾與極端值' },
  { theme: 'rocket', id: '1517976487541-118c7c13a373', metaphor: '火箭突破地心引力發射，象徵能動者打破穩態陷阱、主動變強' },
  { theme: 'bridge_arch', id: '1513694203232-719a280e022f', metaphor: '幾何拱門與建築結構，象徵約束條件塑造自由邊界' },
  { theme: 'compass', id: '1509198397868-475647b2a1e5', metaphor: '探險羅盤與航海地圖，象徵不確定迷霧中以敘事與偏置導航' },
  { theme: 'dice', id: '1518609878373-06d740f60d8b', metaphor: '隨機骰子與機率光芒，象徵可能性與隨機性是意義的燃料' },
  { theme: 'mirror', id: '1507679799987-c73779587ccf', metaphor: '鏡像與深層倒影，象徵進程、介面與內核的三層自我架構' },
  { theme: 'chess', id: '1529699211952-734e80c4d42b', metaphor: '西洋棋對弈全局，象徵成長戰略、能耐尋求與多維佈局' },
  { theme: 'water_drop', id: '1470071459604-3b5ec3a7fe05', metaphor: '雨滴匯聚成江河，象徵複利效應與存量資產的滾雪球積累' },
  { theme: 'mountain_climb', id: '1464822759023-fed622ff2c3b', metaphor: '攀登險峻高峰，象徵自我決定理論驅動的自主內在動力' },
  { theme: 'neural', id: '1507413245164-6160d8298b31', metaphor: '發光神經網路節點，象徵自由能原理與主動推斷最小化驚訝' },
  { theme: 'target', id: '1495344517868-8ebaf0a2044a', metaphor: '專注射箭靶心，象徵主動高認知負荷與注意力深度聚焦' },
  { theme: 'doorway', id: '1513694203232-719a280e022f', metaphor: '明亮通透的大門，象徵 WOOP 心理對比跨越障礙實現願望' },
  { theme: 'network_bridge', id: '1451187580459-43490279c0fa', metaphor: '全球光纖節點跨界相連，象徵結構洞與跨圈層社交資本' },
  { theme: 'scales', id: '1486406146926-c627a92ad1ab', metaphor: '天平與平衡點，象徵認知解耦將自我與情緒主客體分離' },
  { theme: 'crown', id: '1508700115892-45ecd05ae2ad', metaphor: '王者權杖與印記，象徵身份認同是行為變革的最高維槓桿' },
  { theme: 'anchor', id: '1505765050516-f72dcac9c60e', metaphor: '穩固鐵錨深紮海底，象徵深層安全感讓人敢於承擔探索風險' },
  { theme: 'crossroads', id: '1500530855697-b586d89ba3ee', metaphor: '岔路與林間小徑，象徵賽道選擇中孫悟空突破天花板的戰略' },
  { theme: 'clockwork', id: '1508873696983-2df5293cb325', metaphor: '精密齒輪聯動運轉，象徵場域時勢與因勢利導的借力打力' },
  { theme: 'telescope', id: '1516339901601-2e1b62dc0c45', metaphor: '深空望遠鏡探索，象徵在未知疆域探索（Exploration）與利用（Exploitation）的平衡' },
  { theme: 'prism', id: '1507499739999-097706ad8914', metaphor: '三稜鏡折射彩虹光束，象徵共鳴是高維生活與使命落地的同頻' },
  { theme: 'maze', id: '1518709268805-4e9042af9f23', metaphor: '複雜迷宮俯瞰，象徵無免費午餐定理下必須押注結構偏置' },
  { theme: 'radar', id: '1541185933-ef5d8ed016c2', metaphor: '戰鬥機座艙動態雷達，象徵 OODA 環中定向（Orient）重塑大腦的極速循環' },
  { theme: 'toll_bridge', id: '1506146332389-18140dc7b2fb', metaphor: '宏偉收費大橋，象徵經濟租在交通必經隘口捕獲長期價值' },
  { theme: 'leverage_gears', id: '1526304640581-d334cdbbf45e', metaphor: '巨型機械槓桿與齒輪，象徵商業槓桿把一次創造放大百萬倍' },
  { theme: 'wardley_map', id: '1524661135-423995f22d0b', metaphor: '軍用地形圖與黃銅圓規，象徵沃德利地圖在價值鏈上演化定位' },
  { theme: 'platform_hub', id: '1451187580459-43490279c0fa', metaphor: '多維數位連接中樞，象徵平台雙邊市場與網路效應' },
  { theme: 'handshake', id: '1521791136064-7986c2920216', metaphor: '堅定信任握手，象徵托付是把世界的不確定性變成確定性' },
  { theme: 'status_podium', id: '1534447677768-be436bb09401', metaphor: '登頂階梯與光芒，象徵社會地位與價值認同的第一性原理' },
  { theme: 'protocol_scroll', id: '1455390582262-044cdead277a', metaphor: '古典契約羊皮紙卷，象徵「禮」與社會互動協議降低博弈摩擦' },
  { theme: 'incentive_gears', id: '1507679799987-c73779587ccf', metaphor: '巧妙嚙合的雙重齒輪，象徵激勵相容讓個人利益與集體目標自然一致' },
  { theme: 'lemon_market', id: '1531403009284-440f080d1e12', metaphor: '鑑定珠寶放大鏡，象徵逆向選擇檸檬市場中讓好壞可驗證的訊號機制' },
  { theme: 'externality', id: '1473448912268-2022ce9509d8', metaphor: '繁茂森林與清澈溪流，象徵公共品外部性與制度治理約束' },
  { theme: 'moloch_tangle', id: '1518709268805-4e9042af9f23', metaphor: '無盡螺旋深淵，象徵東亞內卷與摩洛克囚徒困境的底層陷阱' },
  { theme: 'residual_judgment', id: '1486406146926-c627a92ad1ab', metaphor: '最高法庭木槌，象徵不確定環境下無可推諉的剩餘判斷權' },
  { theme: 'commanders_intent', id: '1498050108023-c5249f4df085', metaphor: '指揮官俯瞰戰場全景，象徵指揮官意圖聚焦目的與邊界而非微觀動作' },
  { theme: 'goodhart_ruler', id: '1434030216411-0b793f4b4173', metaphor: '變形的刻度尺與量角器，象徵古德哈特定律中指標一旦變成目標便不再有效' },
  { theme: 'delegation_key', id: '1509062522246-3755977927d7', metaphor: '授權鑰匙與門鎖，象徵委託-代理問題中從人身依附到現代制度角色' },
  { theme: 'generation_tree', id: '1513836279014-a89f7a76ae86', metaphor: '參天大樹生長出自我生態，象徵「生成」是讓事物因你而生卻不靠你而活' },
  { theme: 'symmetry_break', id: '1518709268805-4e9042af9f23', metaphor: '水珠凝結打破對稱，象徵命運是冷卻了的偶然與自發對稱性破缺' },
  { theme: 'adjacent_possible', id: '1446776811953-b23d57bd21aa', metaphor: '推開一扇門又見新天地，象徵鄰近可能在未知邊緣湧現新組合' },
  { theme: 'feedback_loop', id: '1509228468518-180dd4864904', metaphor: '因果閉環水流循環，象徵反饋迴路調控複雜系統的增強與平衡' },
  { theme: 'sandpile_critical', id: '1507525428034-b723cf961d3e', metaphor: '自組織沙堆與沙崩臨界，象徵複雜系統維持在恰到好處的活潑狀態' },
  { theme: 'adaptive_cycle', id: '1500530855697-b586d89ba3ee', metaphor: '春夏秋冬四時更迭，象徵適應性循環中繁榮孕育危機、解體釋放生機' },
  { theme: 'zero_order_truth', id: '1451187580459-43490279c0fa', metaphor: '巍峨山基穩固大地，象徵零階道理是不可撼動的主要真理，拒絕被次要噪聲帶偏' },
  { theme: 'objective_func', id: '1516339901601-2e1b62dc0c45', metaphor: '深空璀璨星雲，象徵目標函數決定了系統與生命的獎勵演化方向' },
  { theme: 'second_order_will', id: '1507679799987-c73779587ccf', metaphor: '靜謐湖面映照本心，象徵二階意願與應無所住而生其心的元表徵覺察' },
  { theme: 'self_restraint', id: '1464822759023-fed622ff2c3b', metaphor: '峻嶺上的防護欄，象徵自我約束賦予自由力量，有限制才有爆發力' },
  { theme: 'pretraining', id: '1507413245164-6160d8298b31', metaphor: '巨型神經網絡模型訓練底座，象徵預訓練決定認知上限、後訓練決定對齊下限' }
];

function getImageForLecture(num) {
  const index = (parseInt(num, 10) - 1) % imageLibrary.length;
  const item = imageLibrary[index] || imageLibrary[0];
  return {
    url: `https://images.unsplash.com/photo-${item.id}?auto=format&fit=crop&w=1200&q=80`,
    thumb: `https://images.unsplash.com/photo-${item.id}?auto=format&fit=crop&w=400&q=70`,
    alt: item.theme,
    metaphor: item.metaphor
  };
}

// 3. Modules configuration
const MODULES_CONFIG = [
  { id: 'E01', name: '基本世界觀', file: 'E01_基本世界觀.md', range: '第 001–007 講', icon: 'globe', quote: '世界觀不能自主選擇，只能認識到什麼程度就接受到什麼程度。' },
  { id: 'E02', name: '成長戰略', file: 'E02_模塊一_成長戰略.md', range: '第 008–026 講', icon: 'trending-up', quote: '主動把自己活成能持續變強的能動者：能耐尋求、複利積累、賽道躍遷。' },
  { id: 'E03', name: '決策判斷', file: 'E03_模塊二_決策判斷.md', range: '第 027–045 講', icon: 'target', quote: '在無法算盡的世界裡設定立場、看清局面、管理風險：先驗更新與 OODA 環。' },
  { id: 'E04', name: '學習教育', file: 'E04_模塊三_學習教育.md', range: '第 046–057 講', icon: 'book-open', quote: '用工程化方式把世界裝進大腦並用得出來：認知負荷、ICAP 與默會知識。' },
  { id: 'E05', name: '賺錢邏輯', file: 'E05_模塊四_賺錢邏輯.md', range: '第 058–069 講', icon: 'dollar-sign', quote: '收益 = 創造的價值 × 捕獲係數。佔據必經收費橋，用商業槓桿放大十萬倍。' },
  { id: 'E06', name: '參與者', file: 'E06_模塊五_參與者.md', range: '第 070–086 講', icon: 'users', quote: '社會參與的第一性原理是地位。在博弈中運用禮、契約、激勵相容與破局。' },
  { id: 'E07', name: '領導者', file: 'E07_模塊六_領導者.md', range: '第 087–098 講', icon: 'award', quote: '剩餘判斷權歸屬者為王。把聰明外置成系統，用指揮官意圖激發自主性。' },
  { id: 'E08', name: '演化者', file: 'E08_模塊七_演化者.md', range: '第 099–108 講', icon: 'cpu', quote: '最高級的創造是「生成」：讓事物因你而生，卻不靠你而活、不照你而變。' },
  { id: 'E09', name: '高觀點', file: 'E09_模塊八_高觀點.md', range: '第 109–120 講', icon: 'eye', quote: '大局觀就是給真理分配表決權。把握零階道理、設定目標函數、二階意願覺察。' }
];

// Helper: Clean markdown text
function cleanText(text) {
  return toTC(text)
    .replace(/\*\*/g, '')
    .replace(/\[|\]/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 4. Parse all modules
const allLectures = [];
const modulesData = {};

for (const mod of MODULES_CONFIG) {
  const filePath = path.join(baseDir, mod.file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Split lectures
  const rawSections = content.split(/\n(?=###\s+\d+)/).filter(s => s.trim().startsWith('### '));
  
  const parsedLectures = rawSections.map((sec, secIdx) => {
    // Extract title line
    const lines = sec.split('\n');
    const headerLine = lines[0].replace('### ', '').trim();
    const match = headerLine.match(/^(\d+)\s*(.*)$/);
    const numInt = match ? parseInt(match[1], 10) : (secIdx + 1);
    const numStr = String(numInt).padStart(3, '0');
    let titleStr = match ? match[2].trim() : headerLine;
    
    // Clean title from parentheses
    titleStr = toTC(titleStr);

    // Extract bullet points
    // Stop at ## or end of section
    const bodyLines = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('## ')) break;
      if (line.trim().startsWith('- ')) {
        bodyLines.push(line.trim().substring(2).trim());
      }
    }

    const tcBullets = bodyLines.map(b => cleanText(b));

    // Derive Beginner & Advanced tiers
    // Bullet 1 often case / metaphor / problem
    // Bullet 2 often core definition / math formula / general equation
    // Bullet 3 academic lineage / mechanism
    // Middle bullets: categories / rules / distinctions
    // Last bullets: takeaways / action
    let tagline = '';
    let metaphor = '';
    let painPoint = '';
    let plainTakeaway = '';
    let lineage = '';
    let framework = '';
    let decisionMatrix = '';
    let action = '';

    const firstBullet = tcBullets[0] || '';
    const secondBullet = tcBullets[1] || '';
    const lastBullet = tcBullets[tcBullets.length - 1] || '';

    // Tagline
    if (titleStr.includes('：')) {
      tagline = titleStr.split('：')[1].replace(/（.*?）/g, '').trim();
    } else {
      tagline = firstBullet.substring(0, 48) + '...';
    }

    // Beginner: Metaphor & Pain Point
    // Look for keywords like "比喻", "案例", "生活", "普通人", "常見"
    const metaphorBullet = tcBullets.find(b => b.includes('比喻') || b.includes('案例') || b.includes('就像') || b.includes('比如')) || firstBullet;
    metaphor = metaphorBullet.substring(0, 150);

    const painBullet = tcBullets.find(b => b.includes('陷阱') || b.includes('盲點') || b.includes('錯誤') || b.includes('痛點') || b.includes('誤區') || b.includes('為什麼')) || secondBullet;
    painPoint = painBullet.substring(0, 150);

    plainTakeaway = (tcBullets.find(b => b.includes('核心') || b.includes('本質') || b.includes('金句')) || secondBullet).substring(0, 120);

    // Advanced: Lineage & Framework & Decision
    const lineageBullet = tcBullets.find(b => b.includes('學術') || b.includes('理論') || b.includes('提出') || b.includes('研究') || b.includes('發現')) || tcBullets[2] || secondBullet;
    lineage = lineageBullet.substring(0, 160);

    const frameworkBullet = tcBullets.find(b => b.includes('架構') || b.includes('模型') || b.includes('維度') || b.includes('原則') || b.includes('定律') || b.includes('公式') || b.includes('層次')) || tcBullets[3] || tcBullets[1] || '';
    framework = frameworkBullet.substring(0, 180);

    const actionBullet = tcBullets.find(b => b.includes('行動') || b.includes('建議') || b.includes('操作') || b.includes('啟示')) || lastBullet;
    action = actionBullet.substring(0, 140);

    const highlights = tcBullets.slice(0, 4).map(b => b.substring(0, 100));

    return {
      num: numStr,
      module: mod.id,
      moduleName: mod.name,
      title: titleStr,
      tagline: tagline,
      beginner: {
        metaphor: metaphor || `透過日常生活通俗比喻，直觀掌握「${titleStr}」的核心直覺。`,
        painPoint: painPoint || `常人容易陷入線性、局部或靜態思維的盲區，缺乏全局透視能力。`,
        plainTakeaway: plainTakeaway || `看清事物運轉的真實底層規律，不再被表面現象誤導。`
      },
      advanced: {
        lineage: lineage || `跨越經濟學、認知科學與複雜系統科學的第一性原理演化脈絡。`,
        framework: framework || `建立系統化結構認知、多維決策矩陣與動態演化模型。`,
        boundary: `適用於高不確定性、複雜網路與多方博弈情境；注意邊界條件與反脆弱防護。`,
        relatedTools: [mod.id + ' 核心系列']
      },
      highlights: highlights.length > 0 ? highlights : [titleStr],
      action: action || `檢視目前生活與工作決策，將「${titleStr}」作為自我檢驗的思維清單工具。`,
      image: getImageForLecture(numStr)
    };
  });

  modulesData[mod.id] = {
    id: mod.id,
    name: mod.name,
    range: mod.range,
    quote: mod.quote,
    lecturesCount: parsedLectures.length,
    lectures: parsedLectures
  };

  allLectures.push(...parsedLectures);
}

console.log(`Parsed total ${allLectures.length} lectures across ${MODULES_CONFIG.length} modules.`);

// Sort allLectures strictly by numeric value
allLectures.sort((a, b) => parseInt(a.num, 10) - parseInt(b.num, 10));

// Generate search index
const searchIndex = allLectures.map(l => ({
  num: l.num,
  title: l.title,
  module: l.module,
  moduleName: l.moduleName,
  tagline: l.tagline,
  keywords: `${l.num} ${l.title} ${l.tagline} ${l.beginner.metaphor} ${l.advanced.framework} ${l.action}`
}));

// Output files
const dataJsPath = path.join(baseDir, 'data.js');
const registryJsPath = path.join(baseDir, 'registry.js');

const registryContent = `/* =====================================================================
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
`;

const dataJsContent = `/* =====================================================================
   data.js — 萬維鋼《現代思維工具100講》全 120 講大腦資料庫（繁體中文版）
   完整收錄 9 大模組（E01～E09）所有 120 講精華、雙軌認知（入門 vs 進階）、概念配圖與索引
   ===================================================================== */

const overviewData = {
  heroTitle: '萬維鋼·現代思維工具 100 講',
  heroSubtitle: '把現代科學最前沿的思維框架，轉化為每個人都能用的決策、行動、學習工具。九大核心模組、全 120 講精華，構建屬於你的認知作業系統。',

  stats: [
    { icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>\`, val: '120', lbl: '全課程講數（001–120 完整收錄）' },
    { icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>\`, val: '9', lbl: '完整核心思維模組' },
    { icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>\`, val: '200+', lbl: '前沿思維模型與底層定理' },
    { icon: \`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>\`, val: '雙軌', lbl: '入門白話比喻 × 進階思考架構' },
  ],

  modules: ${JSON.stringify(MODULES_CONFIG.map(m => ({
    label: m.id,
    title: m.name,
    range: m.range,
    desc: m.quote,
    points: modulesData[m.id].lectures.slice(0, 5).map(l => `${l.num} ${l.title.split('：')[0]}`)
  })), null, 2)},

  shifts: [
    {
      badge: '世界觀重塑',
      title: '從線性穩態 → 重尾複利',
      desc: '世界不是平均分佈的，極端值主導結果，複利效應塑造命運。',
      old: '努力就有回報，付出等比換取成果',
      new: '選對賽道+複利積累，讓冪律與重尾為你工作'
    },
    {
      badge: '決策哲學',
      title: '從確定性思維 → 機率先驗更新',
      desc: '所有判斷都是機率分佈，沒有確定的未來，只有可以更新的先驗。',
      old: '追求絕對確定性，害怕承認錯誤',
      new: '設定主觀先驗、持續獲得新資訊更新信念（貝葉斯思維）'
    },
    {
      badge: '風險管理',
      title: '從規避風險 → 設計非對稱凸性',
      desc: '對稱風險是危險的，真正的智慧是讓損失有限、收益無限。',
      old: '避開所有波動，死守表面穩定',
      new: '運用反脆弱、期權思維與狀態槓桿獲取凸性溢價'
    },
    {
      badge: '賺錢邏輯',
      title: '從出賣工時 → 捕獲經濟租與槓桿',
      desc: '收益 = 創造價值 × 捕獲係數。佔據必經收費橋，用槓桿把成果賣百萬次。',
      old: '拼命加班，出賣線性時間',
      new: '構建不可替代的經濟租，運用代碼、媒體與資本槓桿'
    },
    {
      badge: '領導管理',
      title: '從細節控制 → 指揮官意圖與剩餘判斷',
      desc: '組織本質是把聰明外置成系統。領導者不是管動作，而是管目的、任務與邊界。',
      old: '事無巨細微觀管理，苛求指標',
      new: '明晰指揮官意圖，認領不確定性下的剩餘判斷權'
    },
    {
      badge: '終極進化',
      title: '從直接追求 → 生成與二階覺察',
      desc: '最高級的創造是生成：讓事物因你而生，卻不靠你而活。把握零階道理。',
      old: '用力過猛，試圖完全掌控一切結果',
      new: '給真理分配表決權，建立自組織生長的生態系統'
    }
  ]
};

// 模組詳細數據索引
const modulesData = ${JSON.stringify(modulesData, null, 2)};

// 全量 120 講陣列（專為簡報播放器與全域檢索設計）
const allLectures = ${JSON.stringify(allLectures, null, 2)};

// 全局搜尋索引庫
const searchIndex = ${JSON.stringify(searchIndex, null, 2)};
`;

fs.writeFileSync(registryJsPath, registryContent, 'utf8');
fs.writeFileSync(dataJsPath, dataJsContent, 'utf8');

console.log('Successfully generated registry.js and data.js!');
