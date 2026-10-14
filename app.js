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
// ──────────────────────────────────────────────────────────────────────
// 模組顧問卡片資料庫 (嚴格比照 #age-19m-card 三欄結構化內容)
// ──────────────────────────────────────────────────────────────────────
const MODULE_CONSULTING_CARDS = [
  {
    id: "E01",
    icon: "🌍",
    title: "基本世界觀",
    range: "第 001–007 講",
    stageSubtitle: "破除穩態直覺 ｜ 宇宙第一性原理 ｜ 重構內核自我",
    badgeText: "🔥 認知地基",
    isHighlight: true,
    highlightClass: "highlight-19m",
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>敘事是宇宙第一性原理</strong>：自我不是實體，而是大腦為了最小化自由能而創造的「敘事重心」（001講）。<br>
• <strong>真實世界服從乘法重尾</strong>：走出常態分佈平均值錯覺，乘法世界極端值通吃，補短板不如放大長板（002講）。<br>
• <strong>四大物理硬約束不可逾越</strong>：能量、時間、預算與熵增是剛性底線，宏大敘事靠算賬戳破（004講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>破除穩態生存策略</strong>：前現代順從與勤儉曾是局部理性，現代技術社會中不敢冒險才是最大風險（003講）。<br>
• <strong>不確定性是意義燃料</strong>：大格局中運氣權重遠大於能力，承認運氣才能放下驕傲與自責（006講）。<br>
• <strong>內核自我的神經權重</strong>：成長本質不是聽道理，而是像大模型底座訓練一樣，浸泡在高質量語料與回饋中重寫權重（007講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>算賬破除法</strong>：重大決策先算清能量、時間、資金三筆硬賬，不符合守恆定律立刻叫停。<br>
• <strong>乘法長板定位</strong>：停止平均用力，尋找具備複利正反饋的長板優勢。<br>
• <strong>三個自我覺察</strong>：抽離情緒雜訊（進程自我），專注沉澱穩固的神經權重（內核自我）。`,
    coreLecture: "001",
    totalSlides: 12
  },
  {
    id: "E02",
    icon: "🚀",
    title: "成長戰略",
    range: "第 008–026 講",
    stageSubtitle: "君子不器 ｜ 供給側心態 ｜ 複利資本 ｜ 賽道躍遷",
    badgeText: "🔥 持續變強",
    isHighlight: true,
    highlightClass: "highlight-blue",
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>能耐尋求定理（君子不器）</strong>：不確定環境中，最優策略是保持並增加未來的可選項信道容量，做目標的主人而非工具人（008講）。<br>
• <strong>供給側心態</strong>：現代競爭的本質不是搶資源，而是搶「長期合作資格」；主動降低協作摩擦，提供高質量確定性模塊（009講）。<br>
• <strong>七大複利資本飛輪</strong>：r > g 資本回報率大於勞動回報率；金錢、人力、健康、社會、聲望、心理、體驗資本可跨界疊加轉化（010講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>自由能原理與雙向對齊</strong>：大腦是預測機器；知覺推斷（改想法）與主動推斷（改世界）雙向降低驚訝與內耗（014講）。<br>
• <strong>主動高認知負荷（Pro 模式）</strong>：專注不是靠意志力對抗走神，而是用高難度任務把走神擠出工作記憶（015講）。<br>
• <strong>結構洞與跨界翻譯</strong>：不參與同質小圈子內卷，跨越資訊孤島擔任異質網絡橋樑，獲取非對稱社交資本（017講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>WOOP 心理比對</strong>：願望 ➔ 具體感受 ➔ 內在障礙 ➔ If-Then 執行意圖，將習慣預先寫入神經回路。<br>
• <strong>個人供給側模塊化</strong>：標準化交付物格式，主動消除對接摩擦，成為即插即用的協作模塊。<br>
• <strong>小眾賽道+多面手</strong>：在兩三個領域各做到前 20%，交叉結合成唯一無二的前 1% 跨界人才。`,
    coreLecture: "008",
    totalSlides: 13
  },
  {
    id: "E03",
    icon: "🎲",
    title: "決策判斷",
    range: "第 027–045 講",
    stageSubtitle: "強偏置 ｜ 概率分佈 ｜ 貝葉斯先驗 ｜ 反脆弱期權",
    badgeText: "⭐ 科學下注",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>無免費午餐定理</strong>：平均來看任何算法都一樣，優化必須付出偏科代價；決策初心必然是任性發願，以強先驗鎖定搜索空間（027講）。<br>
• <strong>決策決的是概率分佈</strong>：破除結果偏誤（Resulting），決策是在對平行宇宙剪枝，追求長期正期望值與可活原則（028講）。<br>
• <strong>因果中介與最小描述長度</strong>：理解即壓縮；別盯終點，盯因果中介，找到改變期望威脅（xT）的關鍵施力點（029講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>貝葉斯主觀信念記賬</strong>：後驗 = 先驗 + 證據更新；先驗極低時不因單次強刺激驚慌，像會計般理性記賬（031講）。<br>
• <strong>非遍歷性與致命吸收壁</strong>：時間平均不等於空間平均；凡是可能導致個體徹底出局的風險，概率再小也絕不觸碰（034講）。<br>
• <strong>反脆弱與凸性期權</strong>：以槓鈴策略鎖住 90% 保本底線，配置 10% 高期權項目，享受下行受限、上行開放的凸性收益（035講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>半凱利倉位管理</strong>：將理論最優倉位打對折下注，最大化幾何增長率的同時方差減半，永不加槓桿爆倉。<br>
• <strong>決策排雷清單</strong>：排查選擇偏差、均值回歸與前景理論損失厭惡，以參考類（基率）校準主觀預測。<br>
• <strong>OODA 極速循環</strong>：觀察 ➔ 定向 ➔ 決策 ➔ 行動，以快節奏試錯打破對手節奏。`,
    coreLecture: "027",
    totalSlides: 13
  },
  {
    id: "E04",
    icon: "📚",
    title: "學習教育",
    range: "第 046–057 講",
    stageSubtitle: "默會知識 ｜ 間隔檢索 ｜ 費曼白話 ｜ 刻意練習",
    badgeText: "⭐ 認知重構",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>默會知識是終極護城河</strong>：我們所知遠多於所能言；顯性知識極易被 AI 複製，具身經驗與直覺手感才是核心資產（046講）。<br>
• <strong>間隔檢索提取效應</strong>：劃線重讀是偽勤奮；在即將遺忘時主動提取產生「必要難度」，突觸生長最牢固（047講）。<br>
• <strong>費曼技巧戳破術語自欺</strong>：如果不能用極簡白話講給外行聽懂，說明自己沒有真正理解底層邏輯（048講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>順應式概念範式重構</strong>：真正的學習不是增量填充，而是世界觀範式的徹底重構；主動設計認知衝突推翻舊成見（049講）。<br>
• <strong>刻意練習搭建心理表徵</strong>：走出舒適區，在學習區邊界針對最卡手微動作進行高頻反饋訓練（051講）。<br>
• <strong>知識網絡的平方級複利</strong>：打破學科邊界編織卡片網格，以深層同構實現跨界降維打擊（055/057講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>閉卷框架默寫法</strong>：每學完一個主題，合上書拿白紙默寫核心因果鏈與推導表格。<br>
• <strong>費曼生活類比訓練</strong>：將抽象專業概念轉化為日常生活中的生動比喻，找非專業朋友測試。<br>
• <strong>深層結構同構映射</strong>：每當在一個領域解決難題，抽象出其博弈或反饋結構，尋找不同行業的對應物。`,
    coreLecture: "046",
    totalSlides: 13
  },
  {
    id: "E05",
    icon: "💰",
    title: "賺錢邏輯",
    range: "第 058–069 講",
    stageSubtitle: "財富第一性 ｜ 零邊際成本槓桿 ｜ 定價權 ｜ 自由金錢觀",
    badgeText: "⭐ 價值捕獲",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>財富第一性原理</strong>：工資只有均值且受物理時間鎖死；唯有承擔不確定性的破壞式創新才能享受熊彼特超額利潤（058講）。<br>
• <strong>現代無許可槓桿</strong>：代碼與媒體邊際複製成本為零，睡覺時全世界都在為你運行與播放（059講）。<br>
• <strong>定價權是商業試金石</strong>：敢提價而不丟客戶才是真正的護城河；成本加成是受害者心態，價值錨定才是強者邏輯（060講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>巴菲特四大結構護城河</strong>：區分短期紅利與永久壁壘；深耕網絡效應、高轉換成本、無形資產與規模經濟（061講）。<br>
• <strong>梅特卡夫網絡效應</strong>：雙邊網絡平台價值隨節點平方級增長，跨過臨界點後贏家通吃（065講）。<br>
• <strong>自由金錢觀</strong>：金錢不是用來攀比炫耀的戰利品，而是用來購買個人時間與選擇權的看跌期權（069講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>睡後資產開發</strong>：將個人專業經驗封裝為代碼工具、課程產品或標準模板，啟動非線性收入渠道。<br>
• <strong>轉換成本構建</strong>：為核心客戶提供專有數據積累與定制化深度嵌入，構築競爭壁壘。<br>
• <strong>退出地位遊戲</strong>：保持低消費高自由，牢牢握住 Fuck-off Money，對不想做的事堅定說不。`,
    coreLecture: "058",
    totalSlides: 13
  },
  {
    id: "E06",
    icon: "🤝",
    title: "參與者",
    range: "第 070–086 講",
    stageSubtitle: "聲望 vs 支配 ｜ 訊號理論 ｜ 重複博弈 ｜ 第三物協作",
    badgeText: "⭐ 博弈協作",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>聲望大於暴力支配</strong>：前現代靠恐懼與暴力建立支配地位，現代文明社會靠專業技能與慷慨貢獻贏得聲望（072講）。<br>
• <strong>代價高昂的難偽造信號</strong>：廉價客套吹噓毫無價值；唯有付出實質高成本、難以偽造的信號才能建立深度信任（074講）。<br>
• <strong>重複博弈與以牙還牙（Tit-for-Tat）</strong>：善良起步、及時懲罰、寬容原諒、規則透明，是博弈論公認的最優演化策略（076講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>外部選項決定談判實力</strong>：BATNA 是談判桌上唯一的真正底氣；隨時能體面掀桌子的人掌握最大定價權（078講）。<br>
• <strong>間接互惠與群體選擇</strong>：利他行為是高維自私；在重複互動中建立聲譽，群體正向篩選會給利他者最高回報（080講）。<br>
• <strong>圍繞第三物低成本協作</strong>：協作不必先有世界觀共識；圍繞代碼、設計圖、具體交付件等「第三物」即可高效對齊（086講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>高成本信號發送</strong>：在關鍵合作中主動展現不可逆的投入（如公開承諾、抵押資源），秒級建立互信。<br>
• <strong>BATNA 備用選項建設</strong>：在任何談判開展前，先確保手頭至少有一個可接受的替代方案。<br>
• <strong>第三物對齊工作法</strong>：開會不談宏觀理念，只對著具體白板架構或原型界面逐行對齊。`,
    coreLecture: "070",
    totalSlides: 13
  },
  {
    id: "E07",
    icon: "👑",
    title: "領導者",
    range: "第 087–098 講",
    stageSubtitle: "剩餘判斷權 ｜ 組織資本 ｜ 古德哈特定律 ｜ 指揮官意圖",
    badgeText: "⭐ 組織權力",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>契約空白與剩餘判斷權</strong>：世界上沒有完備的合同；當意外發生、規則未明時，必須有人說了算，這就是領導權的本質（087講）。<br>
• <strong>組織資本乘數效應</strong>：把聰明外置成系統；流程、清單與經驗庫構成制度性資本，讓 1 + 1 遠大於 2（088/095講）。<br>
• <strong>文化與敘事權</strong>：最高級的權力不是發號施令，而是對眾人施法，定義集體的意義與目標函數（089講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>去人身依附走向角色責任</strong>：前現代靠個人效忠與私人關係，現代管理靠法理契約與專業角色責任（091講）。<br>
• <strong>古德哈特定律的指標暴政</strong>：當一個指標變成目標時，它就不再是一個好指標；警惕員工為了刷指標而毀掉業務本質（092講）。<br>
• <strong>指揮官意圖代替微觀管理</strong>：把控制從動作細節挪到「目的、任務與邊界」上，前方打仗的人最有裁量權（093講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>主動認領難題</strong>：領導權不是等上面任命，而是在系統混亂時主動站出來認領真空難題，自然獲取威望。<br>
• <strong>反指標異化機制</strong>：為每個關鍵 KPI 搭配對沖性指標（如數量搭配客訴率），防範內部作弊。<br>
• <strong>指揮官意圖交代法</strong>：交代任務時說明「為何做」與「最終狀態長什麼樣」，具體如何達成放手讓團隊探索。`,
    coreLecture: "087",
    totalSlides: 13
  },
  {
    id: "E08",
    icon: "🔄",
    title: "演化者",
    range: "第 099–108 講",
    stageSubtitle: "生成湧現 ｜ 對稱性破缺 ｜ 鄰近可能 ｜ 適應性循環",
    badgeText: "⭐ 複雜演化",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>生成是最高級的創造</strong>：複雜系統無法靠頂層藍圖機械設計，只能靠微觀個體遵循簡單規則自發湧現生成（099講）。<br>
• <strong>對稱性破缺</strong>：命運不過是冷卻了的偶然；微小隨機擾動打破平衡，引發不可逆的歷史路徑依賴（100講）。<br>
• <strong>踩在鄰近可能邊界</strong>：不要妄想一步跨越到無法想像的遠景；最偉大的創新都是踩在當前技術前沿的「隔壁房間」（101講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>反饋回路與延遲陷阱</strong>：系統思考的核心在於看清正負反饋回路與時空延遲；盲目加大劑量只會導致劇烈震盪崩潰（103講）。<br>
• <strong>自組織臨界的混沌邊緣</strong>：過度秩序是死寂，過度混亂是崩潰；恰到好處的活潑處於雪崩前的自組織臨界態（104講）。<br>
• <strong>適應性循環（Panarchy）</strong>：穩定蘊藏著僵化，敗壞蘊藏著生機；駕馭「增長 ➔ 守成 ➔ 釋放 ➔ 重組」的四階段循環（107講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>鄰近可能探索法</strong>：每季度盤點手頭既有資源，只跨出半步探索隔壁房間的新能力組合。<br>
• <strong>反饋延遲預防</strong>：採取干預措施後耐心等待反饋週期，嚴禁短期內反覆大幅踩油門與急剎車。<br>
• <strong>釋放重組主動除舊</strong>：主動在業務繁榮期破壞既有僵化架構，釋放資源進行創新重組。`,
    coreLecture: "099",
    totalSlides: 13
  },
  {
    id: "E09",
    icon: "👁️",
    title: "高觀點",
    range: "第 109–120 講",
    stageSubtitle: "零階道理 ｜ 二階意願 ｜ 斜行副產品 ｜ 奇點立題",
    badgeText: "⭐ 終極超越",
    isHighlight: false,
    box1Title: "🌱 核心原理與破局論點",
    box1Text: `• <strong>零階道理與真理表決權</strong>：大局觀就是給真理分配表決權；在紛繁爭論中找到最根本不可動搖的底層公理（109講）。<br>
• <strong>宇宙底層目標函數</strong>：這個宇宙在獎勵什麼？順應熱力學、演化與信息論的客觀規律，不與宇宙基本力對抗（110講）。<br>
• <strong>二階意願與元表徵</strong>：應無所住而生其心；一階慾望是我想要，二階意願是我審視自己「為什麼想要這個想要」（111講）。`,
    box2Title: "💡 三大顛覆性認知亮點",
    box2Text: `• <strong>斜行定律與珍貴副產品</strong>：最珍貴之物（幸福、聲譽、真愛）大多不能被直接追求，它們是專注做事的自然副產品（112講）。<br>
• <strong>自我約束的爆發力</strong>：無限的自由只會導致渙散與平庸；主動設定不可逾越的戒律與邊界，才能匯聚出穿透一切的力量（113講）。<br>
• <strong>AGI 時代的立題能力</strong>：解題將被大模型廉價外包；人類最高階的價值是給事情做主、提出震撼靈魂的根本問題（116講）。`,
    box3Title: "🎯 落地決策工具與自我檢驗",
    box3Text: `• <strong>二階意願暫停術</strong>：在產生強烈衝動或憤怒時，跳出第一人稱，以旁觀者視角審視這股情緒的來源與合理性。<br>
• <strong>立題訓練法</strong>：面對任何工作難題，先不要急著找答案，花一小時重寫這個問題的命題方式。<br>
• <strong>預訓練底座構築</strong>：持續閱讀跨學科經典著作，強化通識底座網絡，讓個人思維具備深厚泛化能力。`,
    coreLecture: "109",
    totalSlides: 13
  }
];

// ──────────────────────────────────────────────────────────────────────
// 渲染：總覽頁面 (Overview)
// ──────────────────────────────────────────────────────────────────────
function renderOverview() {
  // Hero Banner
  const hero = document.getElementById('overview-hero');
  if (hero) {
    hero.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.85rem;flex-wrap:wrap;">
        <span class="tag" style="background:#051C2C;color:#ffffff;font-size:0.82rem;padding:0.3rem 0.85rem;">A2.2 個人成長旗艦知識庫</span>
        <span class="tag" style="background:linear-gradient(135deg, #D97706, #B45309);color:#ffffff;font-weight:800;">🌟 9 套獨立 10 分鐘導讀簡報</span>
        <span class="tag" style="background:#E2E8F0;color:#051C2C;font-weight:700;">120 講雙軌全景</span>
      </div>
      <h1 class="hero-title">${overviewData.heroTitle}</h1>
      <p class="hero-subtitle">${overviewData.heroSubtitle}</p>
      <div style="display:flex;gap:0.85rem;margin-top:1.4rem;flex-wrap:wrap;">
        <a href="briefing.html?module=E01" class="btn-briefing-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>🌟 放映 10 分鐘導讀簡報（E01～E09 獨立全套）</span>
        </a>
        <a href="briefing_E01.pptx" download="briefing_E01.pptx" class="btn-download-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          <span>📥 下載 E01 PPTX 原檔</span>
        </a>
        <a href="slides.html" class="btn-launch-slides">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>120 講全集放映</span>
        </a>
        <button class="btn-search" onclick="switchTab('registry')">
          <span>🧭 知識庫擴充體系</span>
        </button>
      </div>`;
  }

  // Stats Grid (KPI 4 卡片)
  const statsGrid = document.getElementById('overview-stats');
  if (statsGrid) {
    statsGrid.innerHTML = `
      <div class="kpi-card">
        <div class="kpi-num">9</div>
        <div class="kpi-label">核心思維模組 (E01～E09)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-num">120</div>
        <div class="kpi-label">講前沿思維工具 (全收錄)</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-num">9 套</div>
        <div class="kpi-label">10 分鐘獨立導讀簡報</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-num">100%</div>
        <div class="kpi-label">實體對比表格與逐頁講稿</div>
      </div>
    `;
  }

  // 10-Minute McKinsey Briefing Deck Showcase Banner
  const showcaseEl = document.getElementById('overview-briefing-showcase');
  if (showcaseEl) {
    showcaseEl.innerHTML = `
      <div class="briefing-showcase">
        <div class="briefing-showcase-header">
          <div class="briefing-showcase-title">
            <span>🏛️</span>
            <span>九大模組獨立 10 分鐘精華導讀簡報矩陣（麥肯錫顧問風格 · 全 9 套）</span>
          </div>
          <span class="priority-badge badge-p1" style="background:#004F32;color:#ffffff;">每個模組嚴格 10 分鐘</span>
        </div>
        <p class="briefing-showcase-desc">
          專為時間有限的專業學習者設計。<strong>每個模組獨立 10 分鐘（12–14 頁，每頁 40–50 秒）</strong>。全面遵循金字塔原理行動結論標題、深藍（Navy）＋琥珀金視覺規範、全模組骨架圖、逐講精華亮點、<strong>每一頁均配備實體對比表格或矩陣</strong>、論證脈絡串聯、總結落地行動與逐頁三段式講稿備忘錄（結論 / 補充 / 轉場），並支援一鍵下載各模組 PPTX 原檔。
        </p>
        
        <div class="briefing-module-chips-grid">
          ${MODULE_CONSULTING_CARDS.map(m => `
            <a href="briefing.html?module=${m.id}" class="module-chip-btn" title="放映 ${m.id} ${m.title} 10 分鐘導讀簡報">
              <span>🌟</span>
              <span>${m.id} ${m.title} (${m.totalSlides}P)</span>
            </a>
          `).join('')}
        </div>

        <div class="briefing-showcase-actions">
          <a href="briefing.html?module=E01" class="btn-briefing-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>🚀 放映 E01 導讀簡報</span>
          </a>
          <a href="briefing.html?module=E02" class="btn-briefing-gold" style="background:linear-gradient(135deg, #1E3A8A, #2563EB);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>🚀 放映 E02 導讀簡報</span>
          </a>
          <a href="briefing_E01.pptx" download="briefing_E01.pptx" class="btn-download-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>📥 下載 E01 PPTX</span>
          </a>
          <a href="briefing_E02.pptx" download="briefing_E02.pptx" class="btn-download-gold">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>📥 下載 E02 PPTX</span>
          </a>
        </div>
      </div>
    `;
  }

  // Modules Grid (嚴格比照 #age-19m-card 結構化顧問卡片)
  const modulesEl = document.getElementById('overview-modules');
  if (modulesEl) {
    modulesEl.innerHTML = MODULE_CONSULTING_CARDS.map(m => `
      <div class="age-card ${m.isHighlight ? m.highlightClass : ''}" id="module-${m.id.toLowerCase()}-card">
        <div class="age-header">
          <div class="age-title">
            <span>${m.icon} ${m.id} ${m.title}</span>
            <span class="age-stage-badge">${m.range} ｜ ${m.stageSubtitle}</span>
          </div>
          <span class="priority-badge ${m.id === 'E01' ? 'badge-p1' : (m.id === 'E02' ? 'badge-blue' : 'badge-gold')}">${m.badgeText}</span>
        </div>

        <div class="age-grid">
          <div class="age-content-box">
            <h4>${m.box1Title}</h4>
            <p>${m.box1Text}</p>
          </div>

          <div class="age-content-box">
            <h4>${m.box2Title}</h4>
            <p>${m.box2Text}</p>
          </div>

          <div class="age-content-box">
            <h4>${m.box3Title}</h4>
            <p>${m.box3Text}</p>
          </div>
        </div>

        <div class="age-direct-links">
          <span style="font-size: 0.85rem; font-weight: 800; color: var(--accent-navy); align-self: center;">🎯 核心直達：</span>
          <a href="briefing.html?module=${m.id}" class="deep-link-btn btn-briefing" title="放映本模組 10 分鐘精華導讀簡報">
            <span>🌟</span>
            <span>放映 10 分鐘導讀簡報 (${m.totalSlides}P)</span>
          </a>
          <a href="briefing_${m.id}.pptx" download="briefing_${m.id}.pptx" class="deep-link-btn btn-download" title="下載本模組 16:9 PPTX 原檔">
            <span>📥</span>
            <span>下載 ${m.id} PPTX</span>
          </a>
          <a href="slides.html?slide=${m.coreLecture}" class="deep-link-btn btn-lecture" title="直達第 ${m.coreLecture} 講深入研讀">
            <span>📖</span>
            <span>核心講數直達 (${m.coreLecture}講)</span>
          </a>
          <a href="slides.html?module=${m.id}" class="deep-link-btn btn-slides" title="進入 120 講沉浸式放映">
            <span>📊</span>
            <span>120 講全集放映</span>
          </a>
          <button onclick="switchTab('${m.id}')" class="deep-link-btn" style="border-left: 3px solid #64748B; background:#F8FAFC; cursor:pointer;" title="在門戶中展開所有講次">
            <span>📑</span>
            <span>展開模組講次卡片</span>
          </button>
        </div>
      </div>
    `).join('');
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
