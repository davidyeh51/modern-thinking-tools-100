# -*- coding: utf-8 -*-
"""
generate_mckinsey_briefing_pptx.py
依據「麥肯錫顧問風格」生成《萬維鋼·現代思維工具100講》10 分鐘精華導讀簡報
規格：14 頁、16:9 寬螢幕、海軍藍 + 灰階 + 琥珀金、金字塔行動結論標題、每頁三段式講稿備忘錄
"""

import sys
import os
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

# 配色規範（麥肯錫風格：深藍 + 中性灰階 + 琥珀金強調色，主色不超過3種）
COLOR_NAVY_DARK = RGBColor(10, 25, 47)       # #0A192F 深藍主色
COLOR_NAVY_LIGHT = RGBColor(30, 58, 138)     # #1E3A8A 次主色藍
COLOR_ACCENT_GOLD = RGBColor(217, 119, 6)    # #D97706 琥珀金強調色
COLOR_BG_CARD = RGBColor(248, 250, 252)      # #F8FAFC 卡片底色
COLOR_BORDER_CARD = RGBColor(203, 213, 225)  # #CBD5E1 卡片邊框
COLOR_TEXT_MAIN = RGBColor(31, 41, 55)       # #1F2937 主要內文灰
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)   # #64748B 次要提示灰
COLOR_WHITE = RGBColor(255, 255, 255)        # 純白
COLOR_ACCENT_BG = RGBColor(254, 243, 199)    # 琥珀金淡底色

BRIEFING_SLIDES = [
    # ── Slide 1: 封面 ──
    {
        "type": "cover",
        "category": "10 分鐘精華導讀簡報 · 麥肯錫顧問風格",
        "title": "萬維鋼·現代思維工具 100 講",
        "subtitle": "全景認知作業系統 · 9 大核心模組 · 120 講思維工具精華導讀",
        "author": "萬維鋼",
        "core_claim": "在非線性、高不確定性的現代世界中，徹底打破前現代的「穩態生存直覺」，將前沿科學框架轉化為人生的決策與行動工具，構建屬於個體的主動認知作業系統。",
        "speaker_notes": {
            "conclusion": "歡迎進入《萬維鋼·現代思維工具 100 講》10 分鐘精華導讀簡報。",
            "explanation": "本書匯聚前沿物理、認知心理學、演化博弈與現代管理學，核心在於幫助讀者從『被環境編程的工具』躍遷為『自主立題的能動者』，建立應對現代複雜世界的完整認知體系。",
            "transition": "接下來，我們透過一頁全景骨架圖，縱覽全書 9 大模組如何層層遞進、有機支撐。"
        }
    },

    # ── Slide 2: 全書架構圖 ──
    {
        "type": "content",
        "category": "全書架構圖",
        "conclusion_title": "【全書架構】以五階金字塔層層遞進，從認知地基到哲學超脫構建現代心智作業系統",
        "cards": [
            {
                "title": "底層地基：認知破局與內功",
                "points": [
                    "【E01 基本世界觀】接受硬約束、重尾與不確定性，改寫內核自我神經權重",
                    "【E02 成長戰略】能耐尋求維持多選項，累積七大複利資本，跨越結構洞",
                    "【E03 決策判斷】以貝葉斯先驗動態更新，利用反脆弱凸性下注與 OODA 環"
                ]
            },
            {
                "title": "中層實踐：能力工程與社會協作",
                "points": [
                    "【E04 學習教育】克服認知負荷，透過刻意練習與主動建構打造默會知識護城河",
                    "【E05 賺錢邏輯】佔據經濟租收費橋，調用代碼與媒體槓桿，把一次創造放大百萬倍",
                    "【E06 參與者】以聲望獲取地位，以激勵相容設計協調機制，突破摩洛克內卷陷阱"
                ]
            },
            {
                "title": "高層湧現：組織領導與哲學超脫",
                "points": [
                    "【E07 領導者】在合約空白處認領剩餘判斷權，依指揮官意圖授權，防範指標暴政",
                    "【E08 演化者】在混沌邊緣維持自組織臨界，循鄰近可能生成新秩序與適應性循環",
                    "【E09 高觀點】以零階道理給真理分配表決權，在二階意願中自我約束，主動立題"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "全書並非零散思維工具的拼湊，而是一座層層支撐的五階心智金字塔。",
            "explanation": "底層是世界觀與決策內功；中層將能力工程化並拓展至商業槓桿與社會協調；高層則進入組織領導與複雜演化，最終在『高觀點』達到自主立題的哲學高度。",
            "transition": "了解全書整體脈絡後，我們逐一深入 E01～E09 各模組的核心論點與精華亮點。"
        }
    },

    # ── Slide 3: E01 基本世界觀 ──
    {
        "type": "content",
        "category": "模組精華 · E01 基本世界觀",
        "conclusion_title": "【E01 基本世界觀】破除平均與穩態直覺陷阱，在硬約束與重尾中重構內核自我",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "直覺與真實世界脫節：常人習慣用前現代『平均、勤儉、聽話』的穩態思維應對高波動現代社會",
                    "核心主張：世界觀不能自主選擇，只能認識到什麼程度就接受到什麼程度",
                    "確立宇宙第一性原理（敘事）、分佈形態（重尾）與限制邊界（硬約束）"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "重尾極端值主導：真實世界服從冪律分佈，加法世界靠體力，乘法世界靠正反饋與複利",
                    "穩態生存的觀念陷阱：聽話、順從、指標主義曾是匱乏時代的局部理性，在現代反成平庸枷鎖",
                    "三個自我模型：進程自我（日誌）/ 介面自我（人設標籤）/ 內核自我（底層權重與獎勵函數）"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "真正的個人成長不是修改人設標籤，而是主動選擇訓練樣本與獎勵函數，改寫內核自我的神經權重",
                    "算賬破除法：面對宏大敘事，用能量、成本、時間三大硬約束直接檢驗可行性"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E01 解決的根本問題是：破除前現代的平穩直覺，認識真實世界的重尾與硬約束。",
            "explanation": "書中特別指出『聽話的好孩子往往走向平庸』，因為穩態生存邏輯已不適應現代乘法世界。人有三層自我，真正的成長在於改寫不可直接感知的內核自我權重。",
            "transition": "當我們認清了世界的硬約束與重尾規律，接下來就要探討個體如何在其中主動謀求成長——進入 E02 成長戰略。"
        }
    },

    # ── Slide 4: E02 成長戰略 ──
    {
        "type": "content",
        "category": "模組精華 · E02 成長戰略",
        "conclusion_title": "【E02 成長戰略】以能耐尋求維持多選項，累積七大複利資本並跨越結構洞",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "個體成長困境：多數人在單一賽道陷入邊際報酬遞減，努力與收益不成正比",
                    "核心主張：主動把自己活成能持續變強的能動者（Agent），擺脫被動零件心態",
                    "以動態演化視角建立可持續積累、抗衰退的個人發展戰略"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "能耐尋求定理：決策目標不是追求眼前的局部最優解，而是『保持並擴大未來的可選項』",
                    "複利不是存錢：複利是七大可累積資本（技能、認知、聲譽、社會資本等）的非線性滾動",
                    "結構洞戰略：連結兩個互不相通的群體，成為跨界資訊橋樑，避開紅海獲得非對稱優勢"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "把自己當作一家不斷追求長板複利與跨界連結的供給側公司，在探索中最小化驚訝與自由能"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E02 指引我們以『能耐尋求』取代短期的算計，持續擴展未來的選擇空間。",
            "explanation": "沃爾珀特的能耐尋求定理告訴我們，好策略永遠要給未來留退路和新機會。透過結構洞跨界，個體可以在兩個資訊孤島間扮演橋樑，創造獨特價值。",
            "transition": "擁有了成長戰略與資源積累的方向，下一步必須在資訊不完備的現實中做決策——進入 E03 決策判斷。"
        }
    },

    # ── Slide 5: E03 決策判斷 ──
    {
        "type": "content",
        "category": "模組精華 · E03 決策判斷",
        "conclusion_title": "【E03 決策判斷】以貝葉斯先驗動態校準，運用凱利公式與反脆弱捕捉非對稱收益",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "不確定性下的決策失誤：過度自信或過度恐懼，缺乏科學的機率論與風險管理架構",
                    "核心主張：在無法算盡的世界裡設定立場、看清局面、管理風險",
                    "透過結構偏置與動態閉環，在充滿隨機性的賽局中佔據數學優勢"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "沒有免費午餐定理：不存在通用的全局最優解，每個優勢策略都以承擔特定結構偏置為代價",
                    "貝葉斯更新：不追求一步登天的絕對真理，而是根據新證據不斷動態微調先驗機率",
                    "凱利公式與反脆弱：下注比例取決於勝率與賠率，利用下行有界、上行無限的凸性結構獲利"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "以 OODA 環極速定向換腦，靠反脆弱結構守住底線，在隨機波動中實現長期的乘法複利"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E03 給出高質量決策的核心密碼：貝葉斯先驗更新與反脆弱非對稱結構。",
            "explanation": "沒有免費午餐定理告訴我們，任何決策都有取捨。高手不依賴直覺硬猜，而是用凱利公式計算最佳下注比例，透過 OODA 環的快速反饋在動態戰場中領先半步。",
            "transition": "卓越的決策離不開過硬的個人實力，而實力來自高質量的學習教育——進入 E04 學習教育。"
        }
    },

    # ── Slide 6: E04 學習教育 ──
    {
        "type": "content",
        "category": "模組精華 · E04 學習教育",
        "conclusion_title": "【E04 學習教育】克服認知負荷瓶頸，透過主動建構將知識內化為默會護城河",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "低效學習與 AI 焦慮：死記硬背顯性文字，被海量碎片資訊淹沒，恐懼被 AI 取代",
                    "核心主張：學習不是情懷與口號，學習是一個具備輸入、圖式與反饋的認知工程問題",
                    "建立人機協同時代個體無法被取代的深層理解體系"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "認知負荷理論：工作記憶容量極小（僅 4 個組塊），高手的本質是在長期記憶中沉澱大量圖式壓縮包",
                    "ICAP 學習框架：被動接收 < 主動標記 < 建設性推論 < 互動協同，主動建構才能真正掌握知識",
                    "默會知識護城河：難以言傳的直覺、手感、品味與現場洞察，是 AI 時代個體的終極競爭力"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "藉由刻意練習乘法天賦，推行擁抱與橋接學習法，把顯性資訊鍛造為無可替代的默會本領"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E04 將學習從努力的情懷昇華為一門精密的大腦工程科學。",
            "explanation": "人腦工作記憶極窄，學習的本質是建構圖式（Schema）以釋放頻寬。AI 可以秒級檢索顯性文字，但唯有浸潤在真實場景中的默會知識，才是個體不可替代的護城河。",
            "transition": "當個體具備了真才實學，如何在真實商業世界將價值變現？這需要理解 E05 賺錢邏輯。"
        }
    },

    # ── Slide 7: E05 賺錢邏輯 ──
    {
        "type": "content",
        "category": "模組精華 · E05 賺錢邏輯",
        "conclusion_title": "【E05 賺錢邏輯】佔據稀缺經濟租隘口，調用代碼與媒體槓桿實現商業價值躍遷",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "勞動報酬率困境：單純販賣個人時間，邊際成本高昂，隨時面臨被競爭攤平的殘酷現實",
                    "核心主張：商業世界的真正超額利潤來自『經濟租』與『無准入許可槓桿』",
                    "學會像企業家一樣思考供需關係、價值鏈定位與網路效應"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "經濟租收費橋：最暴利的模式不是更辛苦地提供服務，而是擁有必經隘口與不可替代的稀缺資源",
                    "無准入許可槓桿：代碼與媒體複製成本為零，可將一次創造在睡夢中放大並售賣百萬次",
                    "鮑莫爾成本病與傑文斯悖論：生產率提高讓標準化商品變便宜、人工變貴；AI 降門檻反而大幅激發新需求"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "用沃德利地圖定位價值鏈，在確定性的空白處以身托付，將不確定性包裝為確定性對外出售"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E05 揭示商業賺錢的底層秘密：尋找經濟租，調用零邊際成本的槓桿工具。",
            "explanation": "純靠賣時間必然撞上天花板。矽谷創業家納瓦爾提出的代碼與媒體，是無需他人許可即可調用的超級槓桿。同時，誰能把世界的不確定性兜底成確定性，世界就重賞誰。",
            "transition": "商業並非孤島，它依賴社會中形形色色的人共同協作——我們需要進入 E06 參與者。"
        }
    },

    # ── Slide 8: E06 參與者 ──
    {
        "type": "content",
        "category": "模組精華 · E06 參與者",
        "conclusion_title": "【E06 參與者】以聲望獲取社會地位，以激勵相容設計協調機制破除內卷困境",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "社會互動中的摩擦與背叛：零和博弈、惡性內卷、資訊不對稱與逆向選擇",
                    "核心主張：掌握社會運行的底層互動協議，以制度設計讓自利與公義自然對齊",
                    "理解權力、地位、契約與非預期後果的演化邏輯"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "地位第一性原理：支配（強行掠奪）vs 聲望（提供價值被自願認可），聲望是現代可持續影響力基石",
                    "激勵相容原理：好制度絕不指望人『畏威懷德』，而是巧妙設計規則讓個人追求自利剛好實現集體利益",
                    "破除摩洛克陷阱：東亞內卷是囚徒困境式的不良協調，唯有建立可驗證的共同知識與外部機制才能破局"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "以檸檬市場檢驗真偽，防範軟預算約束引發的責任變形，用第三物創造無需共識的高效合作"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E06 解析人與人協同博弈的通訊協定：從地位追逐到制度設計。",
            "explanation": "激勵相容是現代經濟學的明珠，不要求人人做聖人，而是讓自利行為與集體目標自然一致。東亞的惡性內卷（摩洛克陷阱）根源在於失調的協調機制，需靠透明機制打破。",
            "transition": "當協作規模進一步擴大、多人組成團隊甚至公司時，便產生了管理的挑戰——進入 E07 領導者。"
        }
    },

    # ── Slide 9: E07 領導者 ──
    {
        "type": "content",
        "category": "模組精華 · E07 領導者",
        "conclusion_title": "【E07 領導者】在合約空白處認領剩餘判斷權，依指揮官意圖授權並破除指標暴政",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "組織擴張中的失控與僵化：代理人偷懶、指標異化、宮鬥內耗與決策癱瘓",
                    "核心主張：領導力的本質是在沒有事先明文規定的空白處承擔責任與做出裁決",
                    "建立高信任、抗脆弱、能實現 1+1 > 2 的現代組織資本"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "剩餘判斷權：任何合約都無法寫盡所有意外，真正的領導者是在規則空白處說了算並承擔後果的人",
                    "古德哈特定律：指標一旦成為考核目標，就會失去作為指標的價值，導致弄虛作假與指標暴政",
                    "指揮官意圖：管理必須控制『目的、任務與邊界』，而不是管『動作細節』，賦予一線隨機應變自主權"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "主動認領難題完成從『能領導』到『是領導』的躍遷，把個人聰明外置為流程、清單與經驗庫"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E07 界定了現代領導者的真諦：剩餘判斷權的承擔與目的型授權。",
            "explanation": "現代管理學指出，合約永遠是不完全的。誰在未知和空白中拍板負責，誰就是事實上的領導者。指揮官意圖解放了一線員工的手腳，避免了古德哈特定律造成的指標僵化。",
            "transition": "優秀的組織就像一個生命體，必須理解生命系統的演化生長之道——進入 E08 演化者。"
        }
    },

    # ── Slide 10: E08 演化者 ──
    {
        "type": "content",
        "category": "模組精華 · E08 演化者",
        "conclusion_title": "【E08 演化者】在自組織臨界維持混沌邊緣，循鄰近可能生成新秩序與適應循環",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "複雜動態環境下的僵死與崩潰：面對不可預測的外界衝擊，傳統自上而下的精密設計必然失效",
                    "核心主張：借鑒生物與物理系統的演化原理，理解複雜系統的自組織與自我更新",
                    "從工匠式雕刻轉向園丁式培育，學會操控反饋回路"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "生成（Generation）：最高級的創造不是由上而下的精雕細琢，而是設定底層簡單規則讓複雜秩序自動湧現",
                    "鄰近可能（Adjacent Possible）：創新不能脫離現實天馬行空，而是現有邊界的微小組合擴展，步步為營",
                    "自組織臨界：系統在『過於死板』與『徹底混亂』之間的混沌邊緣（臨界態）最具活力與適應力"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "認識適應性循環中穩定與危機的週期交替，透過路徑創造打破路徑依賴，在動態反饋中持續重生"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E08 揭示複雜系統的生命密碼：生成湧現與混沌邊緣的自組織臨界。",
            "explanation": "世界不是鐘錶機械，而是演化森林。考夫曼的『鄰近可能』告訴我們，每一次創新都在打開下一步的新邊界。系統必須在過於僵死與徹底混亂之間保持恰到好處的活潑。",
            "transition": "穿透了認知、商業、組織與演化的所有規律後，我們最終要回到心靈與哲學的原點——進入 E09 高觀點。"
        }
    },

    # ── Slide 11: E09 高觀點 ──
    {
        "type": "content",
        "category": "模組精華 · E09 高觀點",
        "conclusion_title": "【E09 高觀點】以零階道理統攝局部真理，在二階意願中自我約束並自主立題",
        "cards": [
            {
                "title": "核心要解決的問題",
                "points": [
                    "知識完備後的迷茫與工具化異化：懂了許多道理卻依然過不好一生，淪為指標與欲望的被動奴隸",
                    "核心主張：超越局部技藝，樹立宇宙級大局觀，確立個人的終極目標函數與意義來源",
                    "貫穿全書暗線『君子不器』，從工具使用者昇華為為事情做主的立題者"
                ]
            },
            {
                "title": "三大最值得記住的亮點",
                "points": [
                    "零階道理分配表決權：大局觀不是懂得所有局部道理，而是在真理互相衝突時給真理分配表決權的元原則",
                    "二階意願與應無所住：一階是當下欲望，二階是『我是否希望自己有這樣的欲望』；元表徵讓我們超脫即時刺激",
                    "立題能力（君子不器）：AI 善於解答既定題目，但唯有人能為自己立題；自己定目標、定邊界、定評價標準"
                ]
            },
            {
                "title": "一句話總結",
                "points": [
                    "自我約束才有真正的力量，分清預訓練（底層上限）與後訓練（工程對齊），在稀缺的空白處成為自主能動者"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "E09 將全書昇華至至高哲學境界：二階意願、零階道理與自主立題。",
            "explanation": "全書暗線是孔子說的『君子不器』。人不應淪為系統優化的工具人。AI 算力再強也只能解題，唯有人類擁有自由意志去自主立題。自我約束不是痛苦，而是力量的凝聚。",
            "transition": "至此 9 大模組已全部精解完畢。接下來，我們用一頁清晰梳理這 9 大模組如何環環相扣、逐步推演。"
        }
    },

    # ── Slide 12: 章節脈絡 ──
    {
        "type": "content",
        "category": "章節脈絡串聯",
        "conclusion_title": "【脈絡串聯】前一模組的認知破局，恰為下一模組的行動前提，九環相扣形成論證閉環",
        "cards": [
            {
                "title": "第一階：地基到能力躍遷",
                "points": [
                    "【E01 ➔ E02】認清宇宙硬約束與重尾規律，迫使個體必須以『能耐尋求』主動追求長板複利",
                    "【E02 ➔ E03】在成長探索的不確定旅途中，必須用『貝葉斯先驗與反脆弱』做科學決策下注",
                    "【E03 ➔ E04】高品質決策需要深厚底層實力，必須透過『認知工程與主動建構』鍛造默會知識"
                ]
            },
            {
                "title": "第二階：能力變現到組織治理",
                "points": [
                    "【E04 ➔ E05】身懷默會真本事後，需要調用『代碼與媒體商業槓桿』與佔據經濟租收費橋實現放大",
                    "【E05 ➔ E06】商業擴大無法單打獨鬥，必須依託『激勵相容與聲望機制』建立互信的社會協調",
                    "【E06 ➔ E07】當團隊規模化運作，領導者必須在合約空白處『認領剩餘判斷權』並推行指揮官意圖"
                ]
            },
            {
                "title": "第三階：組織演化到終極立題",
                "points": [
                    "【E07 ➔ E08】面對動態複雜環境，組織必須借鑒『鄰近可能與自組織臨界』的演化生長之道",
                    "【E08 ➔ E09】穿透所有演化規律，最終回歸心智自由——以『零階道理』統攝真理，做自主立題的能動者！"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "全書 9 個模組邏輯嚴密，前一章的結論必然成為下一章的前提。",
            "explanation": "從世界的物理現實（E01），推匯出個人成長（E02）、決策判斷（E03）、能力修煉（E04），進而延伸到商業變現（E05）、社會合作（E06）、組織領導（E07），再到系統演化（E08）與終極意義立題（E09），構成完美邏輯閉環。",
            "transition": "最後，我們將這 100 講的精華濃縮為四條最核心結論，並給出今日立即可做的一件事。"
        }
    },

    # ── Slide 13: 總結 ──
    {
        "type": "content",
        "category": "全書總結與落地行動",
        "conclusion_title": "【精華總結】掌握現代思維工具，是從「被環境編程的工具」躍遷為「自主立題的能動者」",
        "cards": [
            {
                "title": "全書精華四點濃縮",
                "points": [
                    "1. 乘法長板思維：世界服從重尾冪律，遠離加法死磕，利用正反饋與複利滾動核心資本",
                    "2. 貝葉斯動態校準：擁抱不確定性，把現實打臉當作神經元權重微調契機，持續降低自由能",
                    "3. 槓桿與機制設計：善用邊際成本為零的代碼與媒體槓桿，以激勵相容破除內卷困境",
                    "4. 君子不器自主立題：AI 負責回答問題，人類負責提出問題並賦予意義，確立個人目標函數"
                ]
            },
            {
                "title": "讀完後可立刻應用的 1 件事",
                "points": [
                    "🎯 執行一次【算賬測試】與【主動認領】行動：",
                    "• 算賬測試：在下一個重大決定或抱怨前，拿出一張紙算清『能量、時間、預算』三大硬約束，戳破一廂情願",
                    "• 主動認領：在團隊最混亂、職責不清的無人區，主動站出來認領一次『剩餘判斷權』，管目的不管細節，推動事情前進！"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "全書最核心的啟示：君子不器，做主動為事情做主的能動者。",
            "explanation": "面對 AI 時代的浪潮，焦慮毫無意義。真正的高手懂得運用工具、調用槓桿、認領責任，並在硬約束下尋找最優解。今天起，用算賬檢驗構想，用主動認領建立聲望。",
            "transition": "最後一頁為延伸深挖指南，為希望進一步研究特定專題的讀者提供索引路標。"
        }
    },

    # ── Slide 14: 附錄 ──
    {
        "type": "content",
        "category": "附錄 · 延伸深挖指南",
        "conclusion_title": "【附錄】全書 120 講構建了強大的工具族譜，推薦依據實踐階段深挖三大核心板塊",
        "cards": [
            {
                "title": "決策判斷深挖路徑",
                "points": [
                    "第 027 講：無免費午餐定理（認清任何優勢背後的代價）",
                    "第 031 講：貝葉斯先驗（掌握動態校準認知的數學心法）",
                    "第 035 講：反脆弱（構建非對稱凸性收益結構）",
                    "第 045 講：OODA 環（在快節奏衝突中極速定向勝出）"
                ]
            },
            {
                "title": "商業槓桿深挖路徑",
                "points": [
                    "第 058 講：經濟租（看清高利潤行業的壟斷收費本質）",
                    "第 061 講：商業槓桿（解鎖無准入許可的複製威力）",
                    "第 064 講：沃德利地圖（高階商業競爭地圖繪製與定位）",
                    "第 068 講：平台模式（雙邊網路效應的生態搭建）"
                ]
            },
            {
                "title": "組織領導深挖路徑",
                "points": [
                    "第 087 講：剩餘判斷權（不確定狀態下權力與責任的真諦）",
                    "第 092 講：古德哈特定律（防範指標暴政與組織偽裝）",
                    "第 093 講：指揮官意圖（軍事級授權與使命驅動管理）",
                    "第 116 講：立題（怎樣給事情做主，擺脫被動工具人身分）"
                ]
            }
        ],
        "speaker_notes": {
            "conclusion": "附錄提供三條精準的深挖路徑，涵蓋決策、商業與領導三大實戰領域。",
            "explanation": "讀者可透過本知識庫入口網站，隨時點選單講簡報深入鑽研每講的高清配圖、雙軌解讀與落地思考清單。",
            "transition": "感謝聆聽！歡迎在知識庫門戶探索全書 120 講沉浸式雙軌簡報。"
        }
    }
]

def build_presentation(output_file="wan_thinking_tools_100_briefing.pptx"):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    for idx, s in enumerate(BRIEFING_SLIDES):
        slide = prs.slides.add_slide(blank_layout)
        is_cover = s.get("type") == "cover"

        if is_cover:
            # 封面深藍背景
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
            bg.fill.solid()
            bg.fill.fore_color.rgb = COLOR_NAVY_DARK
            bg.line.fill.background()

            # 裝飾頂部琥珀金細條
            accent_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.2), Inches(1.2), Inches(1.2), Inches(0.08))
            accent_bar.fill.solid()
            accent_bar.fill.fore_color.rgb = COLOR_ACCENT_GOLD
            accent_bar.line.fill.background()

            # 分類標籤
            cat_box = slide.shapes.add_textbox(Inches(1.2), Inches(1.4), Inches(10.9), Inches(0.5))
            p_cat = cat_box.text_frame.paragraphs[0]
            p_cat.text = s.get("category", "10 分鐘精華導讀簡報").upper()
            p_cat.font.size = Pt(13)
            p_cat.font.bold = True
            p_cat.font.color.rgb = COLOR_ACCENT_GOLD

            # 主標題
            title_box = slide.shapes.add_textbox(Inches(1.2), Inches(2.0), Inches(10.9), Inches(1.4))
            title_box.text_frame.word_wrap = True
            p_title = title_box.text_frame.paragraphs[0]
            p_title.text = s.get("title", "")
            p_title.font.size = Pt(36)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_WHITE

            # 副標題
            sub_box = slide.shapes.add_textbox(Inches(1.2), Inches(3.4), Inches(10.9), Inches(0.6))
            sub_box.text_frame.word_wrap = True
            p_sub = sub_box.text_frame.paragraphs[0]
            p_sub.text = s.get("subtitle", "")
            p_sub.font.size = Pt(18)
            p_sub.font.bold = True
            p_sub.font.color.rgb = RGBColor(147, 197, 253)

            # 一句話核心主張卡片
            claim_rect = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(4.3), Inches(10.9), Inches(1.6))
            claim_rect.fill.solid()
            claim_rect.fill.fore_color.rgb = RGBColor(15, 35, 65)
            claim_rect.line.color.rgb = COLOR_ACCENT_GOLD
            claim_rect.line.width = Pt(1.5)

            claim_box = slide.shapes.add_textbox(Inches(1.4), Inches(4.45), Inches(10.5), Inches(1.3))
            claim_box.text_frame.word_wrap = True
            tf_claim = claim_box.text_frame
            p_claim_lbl = tf_claim.paragraphs[0]
            p_claim_lbl.text = "💡 一句話核心主張（這本書到底在解決什麼問題）："
            p_claim_lbl.font.size = Pt(13)
            p_claim_lbl.font.bold = True
            p_claim_lbl.font.color.rgb = COLOR_ACCENT_GOLD
            p_claim_lbl.space_after = Pt(6)

            p_claim_txt = tf_claim.add_paragraph()
            p_claim_txt.text = s.get("core_claim", "")
            p_claim_txt.font.size = Pt(15)
            p_claim_txt.font.color.rgb = COLOR_WHITE

            # 作者與節奏資訊
            meta_box = slide.shapes.add_textbox(Inches(1.2), Inches(6.2), Inches(10.9), Inches(0.5))
            p_meta = meta_box.text_frame.paragraphs[0]
            p_meta.text = f"作者：{s.get('author', '萬維鋼')}   |   規格：14 頁精準架構   |   閱讀節奏：10 分鐘掌握全書精華"
            p_meta.font.size = Pt(13)
            p_meta.font.color.rgb = COLOR_TEXT_MUTED

        else:
            # 內頁頂部標籤與頁碼
            top_bar = slide.shapes.add_textbox(Inches(0.9), Inches(0.4), Inches(11.533), Inches(0.35))
            p_top = top_bar.text_frame.paragraphs[0]
            p_top.text = f"{s.get('category', '重點分析')}   |   PAGE {idx+1}/{len(BRIEFING_SLIDES)}"
            p_top.font.size = Pt(11)
            p_top.font.bold = True
            p_top.font.color.rgb = COLOR_ACCENT_GOLD

            # 金字塔原理行動結論標題（完整的一句話）
            title_box = slide.shapes.add_textbox(Inches(0.9), Inches(0.75), Inches(11.533), Inches(1.0))
            title_box.text_frame.word_wrap = True
            p_title = title_box.text_frame.paragraphs[0]
            p_title.text = s.get("conclusion_title", "本頁結論")
            p_title.font.size = Pt(21)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_NAVY_DARK

            # 細分隔線
            line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.9), Inches(1.8), Inches(11.533), Inches(0.02))
            line.fill.solid()
            line.fill.fore_color.rgb = COLOR_BORDER_CARD
            line.line.fill.background()

            # 內容卡片（嚴格 2~3 卡片群組，留白充足，避免資訊過密）
            cards = s.get("cards", [])
            num_cards = max(1, min(3, len(cards)))
            total_w = 11.533
            spacing = 0.35
            card_w = (total_w - (num_cards - 1) * spacing) / num_cards
            top_y = 2.05
            card_h = 4.85

            for c_idx, card in enumerate(cards[:num_cards]):
                card_x = 0.9 + c_idx * (card_w + spacing)

                # 卡片背景框
                card_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(card_x), Inches(top_y), Inches(card_w), Inches(card_h))
                card_box.fill.solid()
                card_box.fill.fore_color.rgb = COLOR_BG_CARD
                card_box.line.color.rgb = COLOR_BORDER_CARD
                card_box.line.width = Pt(1)

                # 卡片頂部修飾線條
                top_line = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(card_x), Inches(top_y), Inches(card_w), Inches(0.12))
                top_line.fill.solid()
                top_line.fill.fore_color.rgb = COLOR_NAVY_LIGHT if c_idx != 1 else COLOR_ACCENT_GOLD
                top_line.line.fill.background()

                # 文字區域
                tb = slide.shapes.add_textbox(Inches(card_x + 0.25), Inches(top_y + 0.28), Inches(card_w - 0.5), Inches(card_h - 0.5))
                tf = tb.text_frame
                tf.word_wrap = True

                # 卡片標題
                p_c_title = tf.paragraphs[0]
                p_c_title.text = card.get("title", "")
                p_c_title.font.size = Pt(16)
                p_c_title.font.bold = True
                p_c_title.font.color.rgb = COLOR_NAVY_LIGHT
                p_c_title.space_after = Pt(12)

                # 卡片亮點條列
                for point in card.get("points", []):
                    p_p = tf.add_paragraph()
                    p_p.text = f"• {point}"
                    p_p.font.size = Pt(12.5)
                    p_p.font.color.rgb = COLOR_TEXT_MAIN
                    p_p.space_after = Pt(9)

        # 寫入三段式逐頁講稿至備忘稿區（Notes Slide）
        notes_slide = slide.notes_slide
        tf_notes = notes_slide.notes_text_frame
        nd = s.get("speaker_notes", {})
        notes_text = (
            f"① 本頁結論：\n{nd.get('conclusion', '原文未載')}\n\n"
            f"② 補充說明：\n{nd.get('explanation', '原文未載')}\n\n"
            f"③ 下一頁轉場：\n{nd.get('transition', '銜接下一階段論述')}"
        )
        tf_notes.text = notes_text

    prs.save(output_file)
    print(f"✅ 成功生成 14 頁麥肯錫顧問風格簡報：{output_file}")

if __name__ == "__main__":
    out = "wan_thinking_tools_100_briefing.pptx"
    if len(sys.argv) > 1:
        out = sys.argv[1]
    build_presentation(out)
