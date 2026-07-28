// Structured Data for 万维钢《现代思维工具100讲》 Web App

const APP_DATA = {
  overview: {
    title: "万维钢·现代思维工具100讲（01-45讲全景总览）",
    subtitle: "涵盖基本世界观、个人成长战略、决策与判断三大核心板块",
    stats: [
      { label: "精讲讲数", value: "45 讲", icon: "book-open", desc: "完整拆解 001-045 讲核心干货" },
      { label: "三大模块", value: "3 大板块", icon: "layers", desc: "世界观 → 成长战略 → 决策判断" },
      { label: "底层模型", value: "20+ 硬核模型", icon: "cpu", desc: "自由能、贝叶斯、凯利、OODA、反脆弱" },
      { label: "思维转折", value: "5 大范式转换", icon: "refresh-cw", desc: "破除平均化、稳态、加法、结果论与被动" }
    ],
    paradigmShifts: [
      {
        title: "加法思维 vs 乘法思维",
        module: "E01 基本世界观 (002)",
        oldMindset: "按部就班线性努力，勤俭求平均，补短板",
        newMindset: "寻找可积累的正反馈复利长板，加入重尾/幂律分布",
        svgIcon: "heavyTail"
      },
      {
        title: "稳态生存 vs 能动者",
        module: "E01 基本世界观 (003, 007)",
        oldMindset: "文化滞后的匮乏顺从，被旧叙事驱使的工具人",
        newMindset: "重写内核参数的 Agent，主动调用工具、制造恰当波动",
        svgIcon: "agency"
      },
      {
        title: "零和掠夺 vs 供给侧合作",
        module: "E02 成长战略 (009, 017)",
        oldMindset: "把竞争看作抢资源，内耗于人际角力",
        newMindset: "提供低摩擦可验证价值，占据跨阶层结构洞",
        svgIcon: "supplySide"
      },
      {
        title: "结果论 vs 概率分布",
        module: "E03 决策判断 (028, 033)",
        oldMindset: "以成败论英雄，赢了盲目自大、输了怨天尤人",
        newMindset: "评估均值、方差与下行风险，用凯利公式按 edge 出手",
        svgIcon: "probability"
      },
      {
        title: "局部贪心 vs 状态杠杆 & OODA",
        module: "E03 决策判断 (038, 045)",
        oldMindset: "到处瞎努力，盲目快速反应，陷于琐事耗费",
        newMindset: "看重一步之后的未来状态（贝尔曼方程），定向改叙事快速换脑",
        svgIcon: "ooda"
      }
    ],
    moduleMasterSummary: [
      {
        id: "E01",
        name: "E01 基本世界观（第 01～07 讲）",
        shortDesc: "理解世界最基础的六条设定与三层自我模型",
        keyConcepts: ["叙事 (宇宙第一性)", "重尾 (幂律分布)", "能动 (稳态陷阱)", "约束 (算账破盲目)", "可能 (不确定性燃料)", "内核 (改写参数)"],
        bgGradient: "from-blue-600 to-indigo-800"
      },
      {
        id: "E02",
        name: "E02 模块一：成长战略（第 08～26 讲）",
        shortDesc: "如何主动把自己活成一个能持续变强又不被异化的能动者",
        keyConcepts: ["能耐寻求 (君子不器)", "供给侧心态", "复利七资本", "自由能原理", "主动高认知负荷", "认知解耦", "共鸣 (使命)"],
        bgGradient: "from-emerald-600 to-teal-800"
      },
      {
        id: "E03",
        name: "E03 模块二：决策与判断（第 27～045 讲）",
        shortDesc: "在无法算尽的世界里设定立场、看清局面、管理风险与修正行动",
        keyConcepts: ["无免费午餐 (归纳偏置)", "贝叶斯先验", "信息价值 VOI", "凯利公式", "非遍历性", "反脆弱", "状态杠杆", "OODA 环"],
        bgGradient: "from-amber-600 to-orange-800"
      }
    ]
  },

  e01: {
    id: "E01",
    title: "E01 基本世界观（第 01～07 讲）",
    subtitle: "世界观不能自主选择，只能认识到什么程度就接受到什么程度",
    summaryQuote: "世界的本体是叙事；叙事如实揭开后，世界真相是重尾而非平均；但多数人被文化滞后的旧叙事困住，缺乏能动性；一旦行动，必须尊重硬约束；约束之内的不确定性是意义的燃料；而承接这一切的主体，是可被重训的内核自我。",
    lectures: [
      {
        num: "01",
        title: "叙事：这个宇宙的第一性原理",
        summary: "宇宙这个切片之所以长这样，是因为满足了叙事条件。因果（狭义相对论）、想象力（量子力学）、舞台（广义相对论）构成叙事三要素。叙事决定了大脑的预测处理、提供意义感并促成公共协调。一切叙事皆主观，叙事决定你的目标函数。",
        highlights: [
          "物理学 Ruliad 概念：宇宙只是无数可能物理定律集合中的一个切片",
          "丹尼特'叙事重心'：不是先有我才有叙事，是先有叙事才需要一个我",
          "弗里斯顿自由能原理：大脑靠叙事做预测，减少惊讶感",
          "同一组事实可以讲出不同故事（'负增长'/'待业'/'返乡创业'），人要主动争夺'叙事权'"
        ],
        iconKey: "narrative"
      },
      {
        num: "02",
        title: "重尾：世界服从极端值",
        summary: "真实世界是重尾分布（幂律/80-20法则），而非平均分布。区分加法世界（无复利）与乘法世界（正反馈/马太效应）。财富、声望、学术产出皆为乘法产物。拉平重尾代价巨大，个人应跳出求平均、补短板的思维，找到长板做乘法。",
        highlights: [
          "加法世界：一天劳动换一天报酬；乘法世界：增量 = 动作 × 存量",
          "胜者通吃有代价，但取消乘法代价更大（乌干达驱赶亚裔企业家反例）",
          "能力呈正态分布，但成果呈重尾分布（复利与运气放大）",
          "行动：通过正反馈、按比例追加投资（pro rata rights）加入重尾"
        ],
        iconKey: "heavyTail"
      },
      {
        num: "03",
        title: "能动：稳态生存的观念陷阱",
        summary: "多数人被'稳态生存逻辑'束缚而不自知，这是文化滞后（观念更新慢于物质条件）的结果。匮乏驱动的风险厌恶、从众驱动的态度文化、简单线性努力观在现代高波动世界反而成为枷锁。人要做 Agent（调用工具者），而非被旧叙事驱使的工具。",
        highlights: [
          "三大基因：资源匮乏（零和思维/仇富）、强从众（面子/姿势当成果）、简单模型（指标主义）",
          "在旧时代是局部理性，在现代高波动世界是成长枷锁",
          "真正爱孩子的家长：希望孩子不那么听话、不必过度努力、敢制造波动",
          "做能动者（Agent）：调用工具的人，而不是被旧叙事驱使的工具"
        ],
        iconKey: "agency"
      },
      {
        num: "04",
        title: "约束：先尊重，再行动",
        summary: "大多数人的生活叙事本质是'许愿'。现实与想象的根本区别在于硬约束（无法绕开的限制）。四种硬约束：能量守恒、时间窗口、自然规律、他人的能动性。破除神话思维的武器是'算账'（谁出钱/资源哪里来）。",
        highlights: [
          "最接近现实的第六层小说仍不能代表真实世界，因为缺乏硬约束",
          "连总统和马斯克都受制于预算结构（DOGE 省两万亿承诺被硬约束击碎）",
          "算账：一句'谁出钱？'能戳破绝大多数一厢情愿的宏大叙事",
          "约束划定确定性与安全感：有效叙事是在硬约束范围内找出路"
        ],
        iconKey: "constraint"
      },
      {
        num: "05",
        title: "问答：叙事与讲故事、造梦的区别",
        summary: "澄清叙事与故事的区别（叙事广义无戏剧性，故事强虚构感）。探讨 AI 与人的区别（AI 是工作记忆上下文，人是修改神经元）。小众赛道与结构洞策略（斯科特·亚当斯'多项技能进前25%'）。能动的边界：不干预也是一种能动。",
        highlights: [
          "叙事 vs 故事：意识到是叙事就能随时跳出来",
          "AI vs 人：AI 调用结束即出戏；人的经历改写神经元（内核自我）",
          "资源不占优时选小众赛道（多面手+结构洞策略，如'卖豆腐的西施'）",
          "大公司倾向抹平薪酬，小公司贴近真实的重尾分布"
        ],
        iconKey: "qa"
      },
      {
        num: "06",
        title: "可能：不确定性是意义的燃料",
        summary: "五种无法消除的不确定性（混沌、计算不可约性、量子随机、奈特不确定性、博弈反身性）。模拟实验证明运气比能力更重要（最富有者最幸运）。人类渴望的是'把不确定变成确定'的瞬间，不确定性恰恰是叙事与意义的燃料。",
        highlights: [
          "五大不可消除的不确定性：天气预报上限、计算不可约、奈特黑天鹅等",
          "意大利模拟实验：能力正态分布，40年随机事件后财富重尾分布，最富者最幸运",
          "消极态度：渴望确定（被贩卖确定感利用）或被动接受；积极态度：管理坏的、拥抱好的",
          "GPT 洞见：不确定性是意义的燃料，'一大块熟悉+一小块意外'最令人愉悦"
        ],
        iconKey: "possibility"
      },
      {
        num: "07",
        title: "内核：你的三个「自我」",
        summary: "提出三层自我模型：进程自我（运行日志）、界面自我（人设/提示词 Prompt）、内核自我（算法权重 Weights）。真正的成长是改写内核自我的参数。杠杆在于训练语料与奖励函数。面对预测误差，改模型才是真正的成长。",
        highlights: [
          "进程自我 (Process Self) = 单次运行输入输出流（日志）",
          "界面自我 (Interface Self) = Prompt/角色人设（受 context 影响的变量）",
          "内核自我 (Core Self) = LLM 权重 Weights（慢变量，决定直觉与潜意识）",
          "改写内核杠杆：训练语料（摄入信息/圈子）+ 奖励函数（行为打分）",
          "终极自由：人比 AI 多一层自由——可自主选择自己的训练样本与奖励函数"
        ],
        iconKey: "coreSelf"
      }
    ],
    threeSelvesTable: [
      { self: "进程自我 (Process Self)", def: "当下直观感受到的'我'，区分我与非我；被动运行日志", llm: "单次运行中的输入-推理-输出流", level: "快变量 / 日志" },
      { self: "界面自我 (Interface Self)", def: "稳定可被他人观察的人设/标签/自传，受情境 context 影响", llm: "系统提示词 (Prompt) / 角色设定", level: "中变量 / 人设" },
      { self: "内核自我 (Core Self)", def: "不可直接感知的先验假设与预测模型，决定直觉与潜意识", llm: "模型权重 (Weights)", level: "慢变量 / 算法内核" }
    ]
  },

  e02: {
    id: "E02",
    title: "E02 模块一：成长战略（第 08～26 讲）",
    subtitle: "回答一个人该如何主动把自己活成一个能持续变强、又不被异化的能动者",
    summaryQuote: "以自由能原理（014）为深层地基，008 能耐寻求定理提供总方针（增加未来选项/赋能），021 安全感提供心理前提，019/020 提供情绪与身份管理工具；09/10/17 解决外部资源与结构洞积累；022/023/025 解决赛道与探索利用节律；最终收束于 026 共鸣（使命×共鸣 = 高级生活）。",
    categories: [
      {
        name: "内在驱动 · 目标机制",
        lectures: [
          {
            num: "08",
            title: "能耐寻求定理：君子不器",
            summary: "AI 智能体研究提出 Power-Seeking Theorem：在不确定奖励环境中，最优策略是尽量增加未来选项（options），而非押注单一目标。君子不器，要做目标的主人而非奴隶。追求赋能（增加信道容量），金钱与声望是副产品（斜行定律）。",
            highlights: ["君子 vs 器：器是被单一 KPI/隧道效应驱使的工具人", "斜行定律 (obliquity)：好东西（金钱/幸福）往往是间接追求得到的副产品", "赋能 (Empowerment)：凡让你选项变多的是赋能，凡受制于人的是失能"],
            iconKey: "powerSeeking"
          },
          {
            num: "12",
            title: "自我决定理论：一流人物不可能是痛苦的卷王",
            summary: "SDT 理论区分动机质量而非强度（从外部调节到整合调节与内在动机）。内化需满足三种心理需求：自主感 (Autonomy)、胜任感 (Competence)、关系感 (Relatedness)。外部金钱奖励会产生挤出效应（过度理由效应）。",
            highlights: ["动机 6 层连续体：知之者不如好之者，好之者不如乐之者", "三大核心需求：自主感 + 胜任感 + 关系感 = 能动性自动发芽", "打工人策略：挖掘意义、搞微决策、把任务游戏化，控制点向内移动"],
            iconKey: "sdt"
          },
          {
            num: "16",
            title: "WOOP：从生活的默认设置中觉醒",
            summary: "98% 的人处于漂流状态（让环境与默认选项做决定）。WOOP 四步：Wish → Outcome → Obstacle (内心障碍) → Plan (If-Then 执行意图)。核心武器是心理比对与执行意图，消解蔡加尼克效应，做到'那一秒别漂流'。",
            highlights: ["默认设置极度强大（如器官捐献默认选项实验）", "WOOP = 愿望 + 结果感受 + 内心障碍 + If-Then 执行意图", "心理比对绑定情境线索与行动，将工作记忆残留移除"],
            iconKey: "woop"
          }
        ]
      },
      {
        name: "深层机制",
        lectures: [
          {
            num: "14",
            title: "自由能原理：活着就是对齐",
            summary: "弗里斯顿自由能原理：生命的策略是最小化自由能（惊讶/Surprise，即与环境的不融洽度）。通过知觉推断（改想法）和主动推断（改世界）降低自由能。恰到好处的'小惊讶'才是心流、胜任感与学习区的来源。",
            highlights: ["马尔可夫毯：内外分界接口，双向对齐（做鱼不是做水）", "惊讶区间：零惊讶导致钝化，大惊讶导致崩溃，小惊讶创造心流", "抑郁症机制：持极度负面先验、拒绝更新模型"],
            iconKey: "freeEnergy"
          }
        ]
      },
      {
        name: "外部合作 · 位置积累",
        lectures: [
          {
            num: "09",
            title: "供给侧心态：怎样在正和的世界合作（以及竞争）",
            summary: "现代市场因信息可复制与分工网络效应天然正和。供给侧心态 = 把自己当成可验证价值的模块，消除协作摩擦（'胶水员工'），嵌入长期重复博弈。竞争本质是抢'合作资格'，声誉是对未来合作价值的贴现。",
            highlights: ["现代竞争本质：抢合作资格；被从合作名单划掉是最大惩罚", "供给侧三件事：价值生产 + 摩擦消除 + 网络触达", "声誉：重复博弈中他人对你未来合作价值的贴现"],
            iconKey: "supplySide"
          },
          {
            num: "10",
            title: "复利：可积累的优势",
            summary: "复利秘密在于持续时间。r > g 解释了财富差距（资本优势可积累，纯打工不可积累）。提出 7 种资本（金钱、人力、健康、社会、声望、心理、体验）。ROI 人生路线：青年抬利率、中年深耕杠杆、老年取舍分红。",
            highlights: ["巴菲特 vs 西蒙斯：复利的灵魂在于时间跨度", "七种可积累资本：金钱、人力、健康、社会、声望、心理、体验", "人生 ROI 阶段：年轻强在增长，中年强在杠杆，老年强在取舍"],
            iconKey: "compound"
          },
          {
            num: "17",
            title: "社交资本、结构洞和搬家：容易向上流动的位置",
            summary: "切蒂研究证明：跨阶层'经济连通性'最能预测穷人向上流动。打破交友偏差靠共同任务。罗纳德·伯特'结构洞'：处于互不相连网络之间的经纪人，价值在翻译与创造。位置是命运的一部分，不适宜要主动换位。",
            highlights: ["切蒂研究：经济连通性（跨阶层交友）是向上流动最强预测因子", "结构洞 (Structural Hole)：站在网络缝隙处，价值在于翻译与创造", "越是不利的位置，越要主动搬家/换位置"],
            iconKey: "structuralHole"
          }
        ]
      },
      {
        name: "内心工具 · 情绪与身份",
        lectures: [
          {
            num: "15",
            title: "主动高认知负荷：注意力的 Pro 模式",
            summary: "注意力最稀缺。任务简单时大脑进入默认模式网络走神。万维钢提出'主动高认知负荷'：手动把任何任务变成高负荷思考（逆向工程/质疑剧情）。走神导致不快乐（哈佛研究），专注才能挤走走神。",
            highlights: ["走神的心是不快乐的心（因果关系：走神导致不快乐）", "主动高认知负荷：用高难度思考主动'挤走'走神", "专注是工程问题而非单纯道德/意志力问题"],
            iconKey: "cognitiveLoad"
          },
          {
            num: "19",
            title: "认知解耦：三步调节负面情绪",
            summary: "系统2思维核心：把'心中叙事'与'眼前事实'拆开。三步接化发：认知解离 (剥离感觉) → 调用视角 (换位思考) → 认知重评 (重构意义)。将威胁改写为挑战、针对我改写为情境。",
            highlights: ["情绪不是对世界的反应，而是你对世界的构建（巴瑞特）", "认知解离：拉开距离（第三人称自称/时间抽离）", "认知重评接化发：防守(解离) → 化解(换位) → 转向(重评)"],
            iconKey: "cognitiveDecoupling"
          },
          {
            num: "20",
            title: "身份认同：元认知黑魔法",
            summary: "身份认同是人设与定义权。把身份当'我'会被驱使，当'我用的'就能驾驭。凯根成人心智发展 5 阶段：最高阶（自我转化心智）把身份当客体审视。设定他人身份与三种解释立场。守住内核稳定性。",
            highlights: ["凯根心智发展：主体-客体转化，把身份当客体调用而非被其驱使", "重构身份叙事案例：'Don't mess with Texas' 解决乱扔垃圾", "忠告：内核自我保持稳定，否则'什么都能理解，什么都不再相信'"],
            iconKey: "identity"
          },
          {
            num: "21",
            title: "安全感：人需要有所依靠",
            summary: "人类本能是寻求依靠而非孤立。安全感来自关系的两大功能：安全基地 (鼓励探索) + 安全港湾 (允许脆弱)。可后天习得（觉察依恋、自我关怀、小环境）。谷歌发现团队第一要素是心理安全。",
            highlights: ["安全基地 (鼓励探索) + 安全港湾 (接住脆弱)", "谷歌亚里士多德计划：团队第一成功要素是'心理安全'", "被依赖，是当今世界给你最好的待遇"],
            iconKey: "safety"
          }
        ]
      },
      {
        name: "策略性选择与终极意义",
        lectures: [
          {
            num: "22",
            title: "赛道选择：做天兵天将，还是做孙悟空？",
            summary: "选择大于努力。天兵天将（体制内，人际关系逻辑，地位靠分配）与孙悟空（体制外，物理逻辑，地位靠自己创造）。孙悟空修不对称技能、利基构建与效应化（Effectuation：看手头有什么菜做什么饭）。",
            highlights: ["天兵天将 vs 孙悟空：两种不同游戏规则，切忌心智混淆", "孙悟空策略：利基构建（创造生态位）+ 效应化拼凑创新", "天兵策略：搞政治但不忘修'花果山副本'"],
            iconKey: "track"
          },
          {
            num: "23",
            title: "场域：识时务者为俊杰",
            summary: "布迪厄场域理论：场域是关系网络，有各自规则与资本。四件套：场域、Doxa (潜规则)、惯习 (默认反应)、资本。象征资本可定义其他资本的正当性。必须先老实承认'这是水'。",
            highlights: ["四件套：场域 (网络) + Doxa (潜规则) + 惯习 (反应模式) + 资本", "萨根效应：高级场域潜规则排斥'太出名'", "最值钱的是象征资本：决定谁有资格定义正当性"],
            iconKey: "field"
          },
          {
            num: "25",
            title: "探索与利用：怎样继续做个年轻人",
            summary: "多臂老虎机问题：探索与利用的权衡。剩余时间越长越该探索（吉廷斯指数）。连胜期 (hot streak) 研究：多样探索 → 捕捉感觉 → 集中利用深耕。年轻是系统更新的频率，而非皮肤状态。",
            highlights: ["退出社会加速衰老；持续探索能创造'超级老年人'", "连胜期节律：探索多样性 → 发现契机 → 转向利用深耕", "年轻不是年龄，而是系统更新与探索的频率"],
            iconKey: "exploreExploit"
          },
          {
            num: "26",
            title: "共鸣：高级生活的秘密（模块收官）",
            summary: "努力叙事陷于享乐适应，躺平亦非答案。追求超越自我的使命。罗萨共鸣理论：共鸣是独立主体间的同频共振（横向/斜向/纵向）。共鸣关注频率而非振幅。使命 × 共鸣 = 高级生活。",
            highlights: ["享乐适应陷阱：比较关注振幅 (谁更强)，共鸣关注频率 (谁同频)", "共鸣四条件：被触动、能回应、会转化、不完全可控", "高级生活 = 使命 (Purpose) × 共鸣 (Resonance)"],
            iconKey: "resonance"
          }
        ]
      },
      {
        name: "问答与答疑集锦",
        lectures: [
          { num: "011", title: "问答：为什么承认'原来我是错的'那么难？", summary: "硬约束检验标准；AI 对话内化思维；解离观念与身份认同；探索与利用动态平衡。", highlights: ["解离观念与身份认同才能放弃错误", "硬约束检验：看是否会成为头条新闻"], iconKey: "qa" },
          { num: "013", title: "特别放送：基本世界观模块答疑直播笔记", summary: "叙事是相对权力；做乘法靠虚拟成分可复制；高波动不可逆；好运气是可创造的合作机会。", highlights: ["乘法放大器：虚拟成分可复制", "好运气本质：高可见性+好接口"], iconKey: "qa" },
          { num: "018", title: "问答：为什么喜欢的事却难以启动？", summary: "吸血鬼悖论（先做才知道）；经验是可迁移资本；WOOP 最适合习惯养成。", highlights: ["零内省先做再说", "经验与说话能力是可迁移资本"], iconKey: "qa" },
          { num: "024", title: "问答：如何判断'该深耕'还是'该挪位置'？", summary: "去留三大信号（参考类/宏观/体感）；认知重评 vs 阿Q精神；健康依赖是互相赋能。", highlights: ["看同背景参考类过得如何", "健康依赖是互相赋能而非失能"], iconKey: "qa" }
        ]
      }
    ]
  },

  e03: {
    id: "E03",
    title: "E03 模块二：决策与判断（第 27～045 讲）",
    subtitle: "在根本无法被算尽的世界里设定立场、看清局面、管理风险、避开幻觉并持续修正行动",
    summaryQuote: "起点是 027 无免费午餐定理（决策的初心是任性偏置，强偏置弱偏执）；028 选概率分布；认知层 (29/31/32) 建模与贝叶斯更新；下注层 (33-35/37) 凯利仓位与反脆弱；排雷层 (39-41/43/44) 扫除偏差与超级预测；执行层 (38/45) 状态杠杆与 OODA 环（定向改叙事换脑子），形成完美闭环。",
    layers: [
      {
        name: "1. 元规则 · 决策的生克",
        description: "决策不可能客观中立，决策决的不是结果而是概率分布；首要指望是可活。",
        lectures: [
          {
            num: "27",
            title: "无免费午餐定理：诸行无常，有偏置才有决策",
            summary: "No Free Lunch Theorem：平均而言所有算法表现一样。想在某领域好就必须付代价。机器学习必须先有归纳偏置 (Inductive Bias)。决策的初心是任性发愿。元认知：强先验 + 算法搜索 + 系统化冒险（强偏置，弱偏执）。偏见是生命力的证明。",
            highlights: [
              "无免费午餐定理：你必须为优化付出代价，先押注结构才能找到结构",
              "决策的初心是任性/发愿：把搜索空间圈起来，目标函数定下来",
              "高手心法：强偏置、弱偏执（老百姓无偏置优柔寡断，全偏执一条道走到黑）",
              "AGI 时代人的核心价值：设定归纳偏置"
            ],
            iconKey: "noFreeLunch"
          },
          {
            num: "28",
            title: "概率分布：到底什么是决策？",
            summary: "不能只看单次结果（结果偏误/Resulting）。生活像扑克而非国象。决策决的是概率分布，是对平行宇宙剪枝。看六参数：均值、方差、上下限、偏度、峰度、稳健性。首要指望不是必胜，而是可活（看最坏能多坏）。高水平者如斯多葛射箭手。",
            highlights: [
              "结果论 (Resulting)：别用单次结果评价决策好坏",
              "决策是剪枝：切断其他可能，决定放弃什么",
              "六参数：首要指望不是必胜而是可活（孙子'先为不可胜'）",
              "斯多葛射箭手：尽力拉弓瞄准，离弦后保持冷静漠然"
            ],
            iconKey: "probability"
          }
        ]
      },
      {
        name: "2. 认知工具 · 看清局面",
        description: "建模、更新先验、筛选真正有价值的信息。",
        lectures: [
          {
            num: "29",
            title: "颗粒度和因果中介：用模型思考",
            summary: "好调节器定理：调节器必须是系统的模型（理解到什么程度才能控制到什么程度）。颗粒度需恰到好处（最小描述长度 MDL：理解即压缩）。因果模型关键在于干预。别盯终点，盯中介（点球成金上垒率、足球期望威胁 xT）。",
            highlights: [
              "好调节器定理：你的认知结构必须同构于想控制的事物",
              "最小描述长度 (MDL)：最好的模型是模型复杂度+例外补丁最小（理解即压缩）",
              "别盯终点，盯中介：找到因果链条中的干预杠杆点"
            ],
            iconKey: "granularity"
          },
          {
            num: "31",
            title: "贝叶斯先验：判断是主观的，但可以更科学一点",
            summary: "先验是成见，但是认知的起点。后验 = 先验 + 证据更新。概率是信念的度量。把世人普遍信念当先验，用具体信息做证据更新。克伦威尔法则：永远不要把概率设为 0 或 1。当事实改变时，我改变想法。",
            highlights: [
              "后验 = 先验 + 证据更新（先验低时，强证据后验仍不高）",
              "概率是对无知程度的量化，人在记账而非瞎猜",
              "克伦威尔法则：永远留有'我可能错了'的概率（切忌设 0 或 1）"
            ],
            iconKey: "bayes"
          },
          {
            num: "32",
            title: "信息价值：怎样区分沙子和金子",
            summary: "VOI 理论：只有能改变实际行动的信息才有价值。信息焦虑因为决策未落地。高 VOI 信息特点：目标导向 (本地专门)、带痛感 (改先验)、出现在决策边界上。高 VOI 信息细碎无聊，绝不会在热搜头条。",
            highlights: [
              "VOI 定义：只有能改变实际行动的信息才有价值",
              "信息焦虑本质：消费信息替代了决策落地（处于漂流状态）",
              "高 VOI 集中在决策边界与本地卡点上，而非热搜宏大叙事"
            ],
            iconKey: "voi"
          }
        ]
      },
      {
        name: "3. 下注与风险 · 仓位与结构",
        description: "凯利仓位、非遍历性、脆弱/反脆弱、期权。",
        lectures: [
          {
            num: "33",
            title: "凯利公式：乘法世界里的认知变现",
            summary: "凯利公式 f* = edge / odds。odds 是市场共识，edge 是你的认知优势。最大长期增长率受限于认知带宽。凯利赚的是超出大众认知的钱。edge 好时出手是义务。押太大和不敢押都是错，此乃仓位问题。少出手，重仓复利变量。",
            highlights: [
              "f* = edge / odds：凯利公式赚的是你超出大众认知的钱 (edge)",
              "成长上限受限于认知带宽；edge 出现时出手是一种义务",
              "生物表型赌注对冲：休眠细胞比例在数学上等价于凯利未下注比例"
            ],
            iconKey: "kelly"
          },
          {
            num: "34",
            title: "非遍历性：玩家怕方差，庄家爱方差",
            summary: "阻碍复利的因素：本钱与方差。集合平均 ≠ 时间平均（几何平均）。个体沿时间线走经历时间平均，连亏撞上吸收壁。散户跑不赢大盘是数学必然。解法：少交易、杠铃策略（按凯利下注打败非遍历性）、成为庄家、风险共担。",
            highlights: [
              "集合平均（上帝视角）≠ 时间平均（凡人命运）",
              "散户跑不赢大盘是数学机制：大盘是集合，散户经历时间平均",
              "四解法：少交易 + 杠铃策略 + 跟庄家站一起 + 风险共担"
            ],
            iconKey: "ergodicity"
          },
          {
            num: "35",
            title: "脆弱和反脆弱：怎样利用非对称风险",
            summary: "脆弱 = 凹函数 (∩，上行有限下行无底)；反脆弱 = 凸函数 (∪，詹森不等式：波动下平均收益高于平均状态)。排雷做减法 (Via Negativa) 与毁灭隔离。践行反脆弱：见机会下注、毒物兴奋效应 (Hormesis) 主动注入微压力。利益攸关 (Skin in the Game)。",
            highlights: [
              "脆弱=凹函数，反脆弱=凸函数（詹森不等式）",
              "否定法 (Via Negativa) 做减法排雷；毁灭隔离允许小失败避免大失败",
              "毒物兴奋效应 (Hormesis)：身体与系统需要可恢复的微压力"
            ],
            iconKey: "antifragile"
          },
          {
            num: "37",
            title: "期权：保留可选项的特权",
            summary: "期权是权利而非义务。需满足专有进入权。形态：敏捷 MVP (看涨)、优先受让权、BATNA (看跌，无退路叫求情)、对赌协议。双向门 (可逆快速试错) vs 单向门 (不可逆三思)。聪明只是期权，需要执行力兑现。",
            highlights: [
              "期权价值在于专有进入权，涨能耐就是获得更多期权",
              "BATNA (最佳替代方案) = 看跌期权，没有 BATNA 的谈判叫求情",
              "双向门快速试错，单向门三思后 commit；聪明是期权，需交付兑现"
            ],
            iconKey: "options"
          }
        ]
      },
      {
        name: "4. 排雷与纠偏 · 扫除盲区",
        description: "选择偏差、回归均值、前景理论、参考类、超级预测。",
        lectures: [
          {
            num: "39",
            title: "选择偏差：就算无人说谎，你看到的也不是真实世界",
            summary: "视野内的样本不等概率代表真实世界。四大类：自我选择偏差 (J型分布/朋友圈)、幸存者偏差 (辍学创业神话/怀旧)、分组选拔偏差 (名校效应)、伯克森悖论 (帅哥皆渣男/门槛伪造负相关)。听说故事先问四句话，追踪退场沉默者。",
            highlights: [
              "上桌样本不代表真实世界：听说故事先问'谁没来？谁来不了？'",
              "幸存者偏差：辍学创业成功是极少数，创始人平均 45 岁",
              "伯克森悖论：设定门槛会伪造两个变量之间的负相关"
            ],
            iconKey: "selectionBias"
          },
          {
            num: "40",
            title: "回归均值：不要大惊小怪，要有点定力",
            summary: "观测结果 = 真实水平 + 随机运气。回归谬误：把波动当因果，把运气当实力。戴明漏斗实验四规则：过度勤勉的纠偏等于给系统注入额外波动（规则一最稳定）。邓宁-克鲁格效应含统计回归成分。决策定力：遇事缓三分。",
            highlights: [
              "回归谬误：表扬后变差、痛骂后变好是统计回归而非管理有效",
              "戴明漏斗实验：过于勤勉的纠偏是在给系统注入额外波动",
              "决策定力：一时高不必封神，一时低不必诛心，遇事缓三分"
            ],
            iconKey: "regression"
          },
          {
            num: "41",
            title: "前景理论：让人铤而走险的不是贪婪，而是不甘",
            summary: "参照点 S 型曲线：损失痛苦是快乐的 2 倍（损失厌恶）。参照点左侧（不甘）让人铤而走险。四大偏误：损失厌恶、现状偏见、禀赋效应、框架效应（救活200 vs 死400）。散户处置效应。主动自由管理参照点与心理账户。",
            highlights: [
              "人是守卫参照点的动物：损失痛苦是快乐的 2 倍",
              "站在参照点左侧（不甘/亏损）让人疯狂冒险",
              "框架效应：生死攸关决策竟取决于话术表述；高手自由重构参照点"
            ],
            iconKey: "prospect"
          },
          {
            num: "43",
            title: "参考类：当局者迷，旁观者清，你不特殊",
            summary: "参考类预测 (RCF) 是反自恋装置。规划谬误：现实比最悲观估计还悲观。内部视角看个案自恋，外部视角看分布数据。傅以斌三步法：找结束案例组 → 取基准线 (中位数) → 微调。具体做事内部打气，决策必须外部泼冷水。",
            highlights: [
              "规划谬误：悉尼歌剧院/大型工程基建普遍大幅超支超期",
              "外部视角：旁观者把你当统计样本，而不是故事主角",
              "做事用内部叙事打气，决策用外部参考类泼冷水"
            ],
            iconKey: "referenceClass"
          },
          {
            num: "44",
            title: "超级预测：给不确定性命名，给自己打分",
            summary: "狐狸型专家优于刺猬型。超级预测者（良好判断项目）：概率化 + 可检验。费米化拆解云状问题 → 外部参考类打底 → 贝叶斯微调。布里尔分数 (Brier score) 记分。不确定性一旦被拆解命名，就从恐慌变成可求解工程问题。",
            highlights: [
              "狐狸型 (接受复杂随时修正) 预测胜过刺猬型 (抱大理论)",
              "超级预测法：费米化拆解 + 外部基率 + 贝叶斯持续微调",
              "Name it to tame it：不确定性写成概率，就从恐慌变为工程问题"
            ],
            iconKey: "superforecasting"
          }
        ]
      },
      {
        name: "5. 落地执行 · 状态与循环",
        description: "状态杠杆决定怎么用力，OODA 环决定怎么循环迭代。",
        lectures: [
          {
            num: "38",
            title: "状态杠杆：你不是不努力，你是没做在点子上",
            summary: "状态杠杆：一步做完后，世界是否对下一步更友好。唐僧扫塔从上往下扫。三种杠杆：前置杠杆 (NASA 设计占15%锁75%成本)、顺序杠杆 (DSM 设计结构矩阵排依赖)、约束杠杆 (TOC 瓶颈理论)。灵魂是贝尔曼动态规划：收益 = 即时回报 + 下一状态价值。",
            highlights: [
              "状态杠杆：唐僧扫塔从上往下扫（不可逆进展）",
              "三杠杆：前置杠杆 (NASA 设计锁定75%成本) + 顺序杠杆 (DSM) + 约束杠杆 (TOC 瓶颈)",
              "贝尔曼方程：行动不仅看即时回报，更看转移后的未来状态潜在价值"
            ],
            iconKey: "leverage"
          },
          {
            num: "45",
            title: "OODA 环：不是反应快，而是换脑快（模块收官）",
            summary: "Observe-Orient-Decide-Act。精髓是换脑快，提升地图刷新率。阵眼在 Orient (定向)：定向就是改叙事、重选归纳偏置。Act 是用小注逼现实表态。中途岛海战案例。四句：换脑快 > 反应快；及时改 > 永远对；先下小注 > 求定论；每一步带回情报。",
            highlights: [
              "OODA 精髓：不是反应快，而是换脑快（地图刷新率高）",
              "阵眼在 Orient (定向)：定向就是改叙事、重新选择归纳偏置（呼应 27 讲）",
              "Act 不是结局，而是用小注/压力测试逼现实表态"
            ],
            iconKey: "ooda"
          }
        ]
      },
      {
        name: "问答与答疑集锦",
        lectures: [
          { num: "030", title: "问答：没有机缘得到使命召唤怎么办？", summary: "体制内自处（老庄/平行的生活/循吏）；使命三特点；AGI 是付费午餐；决策 vs 策略。", highlights: ["使命是秩序输出者", "AGI 偏置即对齐税"], iconKey: "qa" },
          { num: "036", title: "问答：怎样培养自己找到最佳模型的能力？", summary: "建模靠储备；给孩子的 20 条好先验；系统即笔记；Edge 是独特的知与能。", highlights: ["无客观建模，先想象中介", "系统最明显区分是有无笔记"], iconKey: "qa" },
          { num: "042", title: "问答：设计结构矩阵和甘特图的区别是什么？", summary: "禁食度与 FMD；DSM 负责结构，甘特图负责节奏；普通变异 vs 特殊变异。", highlights: ["DSM 排依赖结构，甘特图排时间节奏", "求真前提是有反馈"], iconKey: "qa" }
        ]
      }
    ]
  }
};

// Vector SVG Definitions Map
const SVG_ICONS = {
  "book-open": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
  "layers": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  "cpu": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`,
  "refresh-cw": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  "narrative": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M8 7h8"></path><path d="M8 11h6"></path></svg>`,
  "heavyTail": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"></line><line x1="3" y1="3" x2="3" y2="21"></line><path d="M4 4c2 12 6 16 16 16"></path></svg>`,
  "agency": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.79-1.81l-3.79-3.79s-1.1.08-1.79.79z"></path><path d="M12 15l-3-3 8.5-8.5a2.12 2.12 0 0 1 3 3L12 15z"></path></svg>`,
  "constraint": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  "qa": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  "possibility": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 8h.01"></path><path d="M8 8h.01"></path><path d="M12 12h.01"></path><path d="M16 16h.01"></path><path d="M8 16h.01"></path></svg>`,
  "coreSelf": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  "powerSeeking": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>`,
  "sdt": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"></path></svg>`,
  "woop": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`,
  "freeEnergy": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h5l2 8 5-16 2 8h6"></path></svg>`,
  "supplySide": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  "compound": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  "structuralHole": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
  "cognitiveLoad": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  "cognitiveDecoupling": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  "identity": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  "safety": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>`,
  "track": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>`,
  "field": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`,
  "exploreExploit": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`,
  "resonance": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10s3-3 6-3 6 3 6 3 3-3 6-3 6 3 6 3"></path><path d="M2 14s3-3 6-3 6 3 6 3 3-3 6-3 6 3 6 3"></path></svg>`,
  "noFreeLunch": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"></line><path d="M5 9l7-6 7 6"></path><path d="M5 15l7 6 7-6"></path></svg>`,
  "probability": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>`,
  "granularity": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  "bayes": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path><path d="M18 8h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4v-8z"></path><circle cx="8" cy="12" r="2"></circle></svg>`,
  "voi": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  "kelly": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path></svg>`,
  "ergodicity": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>`,
  "antifragile": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  "options": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>`,
  "leverage": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v16h16"></path><path d="m5 19 6-6"></path><path d="m11 13 4 4"></path><path d="m15 17 6-6"></path></svg>`,
  "selectionBias": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  "regression": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  "prospect": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><line x1="4" y1="12" x2="20" y2="12"></line><path d="M4 18c4 0 6-6 8-6s4-6 8-6"></path></svg>`,
  "referenceClass": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="13" y2="16"></line></svg>`,
  "superforecasting": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  "ooda": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6"></path><path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>`
};
