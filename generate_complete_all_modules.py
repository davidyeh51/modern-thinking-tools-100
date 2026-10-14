# -*- coding: utf-8 -*-
"""
generate_complete_all_modules.py
為《萬維鋼·現代思維工具100講》九大模組（E01～E09）生成完整的：
1. briefing_modules_data.js（供網頁播放器 briefing.html 與首頁 index.html 直接調用）
2. briefing_E01.pptx ～ briefing_E09.pptx（各 12～14 頁、16:9、麥肯錫海軍藍/琥珀金、含實體表格與逐頁三段講稿）
"""

import os
import sys
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

COLOR_NAVY_DARK = RGBColor(10, 25, 47)       # #0A192F 深藍主色
COLOR_NAVY_LIGHT = RGBColor(30, 58, 138)     # #1E3A8A 次主色藍
COLOR_ACCENT_GOLD = RGBColor(217, 119, 6)    # #D97706 琥珀金強調色
COLOR_BG_CARD = RGBColor(248, 250, 252)      # #F8FAFC 卡片底色
COLOR_BORDER_CARD = RGBColor(203, 213, 225)  # #CBD5E1 卡片邊框
COLOR_TEXT_MAIN = RGBColor(31, 41, 55)       # #1F2937 主要內文灰
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)   # #64748B 次要提示灰
COLOR_WHITE = RGBColor(255, 255, 255)        # 純白
COLOR_TABLE_HEADER = RGBColor(15, 35, 65)    # 表格標題背景
COLOR_TABLE_ROW_ALT = RGBColor(241, 245, 249)# 表格交替行底色

MODULE_CONFIGS = {
  "E01": { "id": "E01", "name": "基本世界觀", "range": "第 001–007 講", "totalSlides": 12, "pptx": "briefing_E01.pptx", "color": "#1e3a8a", "badge": "底層地基" },
  "E02": { "id": "E02", "name": "成長戰略",   "range": "第 008–026 講", "totalSlides": 13, "pptx": "briefing_E02.pptx", "color": "#d97706", "badge": "持續變強" },
  "E03": { "id": "E03", "name": "決策判斷",   "range": "第 027–045 講", "totalSlides": 13, "pptx": "briefing_E03.pptx", "color": "#004f32", "badge": "科學下注" },
  "E04": { "id": "E04", "name": "學習教育",   "range": "第 046–057 講", "totalSlides": 13, "pptx": "briefing_E04.pptx", "color": "#4f46e5", "badge": "認知重塑" },
  "E05": { "id": "E05", "name": "賺錢邏輯",   "range": "第 058–069 講", "totalSlides": 13, "pptx": "briefing_E05.pptx", "color": "#b45309", "badge": "價值捕獲" },
  "E06": { "id": "E06", "name": "參與者",     "range": "第 070–086 講", "totalSlides": 13, "pptx": "briefing_E06.pptx", "color": "#0d9488", "badge": "博弈協作" },
  "E07": { "id": "E07", "name": "領導者",     "range": "第 087–098 講", "totalSlides": 13, "pptx": "briefing_E07.pptx", "color": "#be123c", "badge": "組織權力" },
  "E08": { "id": "E08", "name": "演化者",     "range": "第 099–108 講", "totalSlides": 13, "pptx": "briefing_E08.pptx", "color": "#0369a1", "badge": "複雜適應" },
  "E09": { "id": "E09", "name": "高觀點",     "range": "第 109–120 講", "totalSlides": 13, "pptx": "briefing_E09.pptx", "color": "#7c3aed", "badge": "終極超越" }
}

# 導入各模組數據庫
from data_modules import ALL_MODULES_DECKS

def build_pptx_for_module(mod_id, slides_data, output_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    total_slides = len(slides_data)

    for idx, s in enumerate(slides_data):
        slide = prs.slides.add_slide(blank_layout)
        is_cover = s.get("type") == "cover"

        if is_cover:
            # 封面深藍背景
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
            bg.fill.solid()
            bg.fill.fore_color.rgb = COLOR_NAVY_DARK
            bg.line.fill.background()

            accent_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(1.2), Inches(1.1), Inches(1.2), Inches(0.08))
            accent_bar.fill.solid()
            accent_bar.fill.fore_color.rgb = COLOR_ACCENT_GOLD
            accent_bar.line.fill.background()

            cat_box = slide.shapes.add_textbox(Inches(1.2), Inches(1.3), Inches(10.9), Inches(0.5))
            p_cat = cat_box.text_frame.paragraphs[0]
            p_cat.text = s.get("category", "").upper()
            p_cat.font.size = Pt(13)
            p_cat.font.bold = True
            p_cat.font.color.rgb = COLOR_ACCENT_GOLD

            title_box = slide.shapes.add_textbox(Inches(1.2), Inches(1.9), Inches(10.9), Inches(1.4))
            title_box.text_frame.word_wrap = True
            p_title = title_box.text_frame.paragraphs[0]
            p_title.text = s.get("title", "")
            p_title.font.size = Pt(36)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_WHITE

            sub_box = slide.shapes.add_textbox(Inches(1.2), Inches(3.3), Inches(10.9), Inches(0.6))
            sub_box.text_frame.word_wrap = True
            p_sub = sub_box.text_frame.paragraphs[0]
            p_sub.text = s.get("subtitle", "")
            p_sub.font.size = Pt(17)
            p_sub.font.bold = True
            p_sub.font.color.rgb = RGBColor(147, 197, 253)

            claim_rect = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.2), Inches(4.1), Inches(10.9), Inches(1.8))
            claim_rect.fill.solid()
            claim_rect.fill.fore_color.rgb = RGBColor(15, 35, 65)
            claim_rect.line.color.rgb = COLOR_ACCENT_GOLD
            claim_rect.line.width = Pt(1.5)

            claim_box = slide.shapes.add_textbox(Inches(1.4), Inches(4.25), Inches(10.5), Inches(1.5))
            claim_box.text_frame.word_wrap = True
            tf_claim = claim_box.text_frame
            p_lbl = tf_claim.paragraphs[0]
            p_lbl.text = "💡 模組一句話核心主張（解決什麼問題）："
            p_lbl.font.size = Pt(13)
            p_lbl.font.bold = True
            p_lbl.font.color.rgb = COLOR_ACCENT_GOLD
            p_lbl.space_after = Pt(6)

            p_txt = tf_claim.add_paragraph()
            p_txt.text = s.get("core_claim", "")
            p_txt.font.size = Pt(14.5)
            p_txt.font.color.rgb = COLOR_WHITE

            meta_box = slide.shapes.add_textbox(Inches(1.2), Inches(6.25), Inches(10.9), Inches(0.5))
            p_meta = meta_box.text_frame.paragraphs[0]
            p_meta.text = f"作者：{s.get('author', '萬維鋼')}   |   規格：{total_slides} 頁麥肯錫顧問標準   |   節奏：10 分鐘掌握全模組精華"
            p_meta.font.size = Pt(13)
            p_meta.font.color.rgb = COLOR_TEXT_MUTED

        else:
            # 內頁頂部標籤與頁碼
            top_bar = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.35))
            p_top = top_bar.text_frame.paragraphs[0]
            p_top.text = f"{s.get('category', '重點分析')}   |   PAGE {idx+1}/{total_slides}"
            p_top.font.size = Pt(11)
            p_top.font.bold = True
            p_top.font.color.rgb = COLOR_ACCENT_GOLD

            # 金字塔原理行動結論標題
            title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.733), Inches(0.95))
            title_box.text_frame.word_wrap = True
            p_title = title_box.text_frame.paragraphs[0]
            p_title.text = s.get("conclusion_title", "本頁結論")
            p_title.font.size = Pt(20)
            p_title.font.bold = True
            p_title.font.color.rgb = COLOR_NAVY_DARK

            # 細分隔線
            line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.72), Inches(11.733), Inches(0.02))
            line.fill.solid()
            line.fill.fore_color.rgb = COLOR_BORDER_CARD
            line.line.fill.background()

            has_table = "visual" in s and s["visual"].get("type") == "table"

            if has_table:
                # 左右雙欄佈局：左邊放文字要點卡片，右邊放實體對比表格
                card_w = Inches(5.6)
                card_x = Inches(0.8)
                top_y = Inches(1.9)
                card_h = Inches(5.0)

                card_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, top_y, card_w, card_h)
                card_box.fill.solid()
                card_box.fill.fore_color.rgb = COLOR_BG_CARD
                card_box.line.color.rgb = COLOR_BORDER_CARD
                card_box.line.width = Pt(1)

                top_line = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, top_y, card_w, Inches(0.1))
                top_line.fill.solid()
                top_line.fill.fore_color.rgb = COLOR_NAVY_LIGHT
                top_line.line.fill.background()

                tb = slide.shapes.add_textbox(card_x + Inches(0.25), top_y + Inches(0.22), card_w - Inches(0.5), card_h - Inches(0.44))
                tf = tb.text_frame
                tf.word_wrap = True

                cards = s.get("cards", [])
                for c_idx, c in enumerate(cards):
                    p_ct = tf.paragraphs[0] if c_idx == 0 else tf.add_paragraph()
                    p_ct.text = c.get("title", "")
                    p_ct.font.size = Pt(14)
                    p_ct.font.bold = True
                    p_ct.font.color.rgb = COLOR_NAVY_LIGHT
                    p_ct.space_after = Pt(6)

                    for pt_txt in c.get("points", []):
                        p_pt = tf.add_paragraph()
                        p_pt.text = f"• {pt_txt}"
                        p_pt.font.size = Pt(11.5)
                        p_pt.font.color.rgb = COLOR_TEXT_MAIN
                        p_pt.space_after = Pt(5)

                # 右欄：實體表格 (PPTX Native Table)
                table_x = Inches(6.7)
                table_w = Inches(5.833)
                v_data = s["visual"]
                headers = v_data.get("headers", [])
                rows = v_data.get("rows", [])
                num_rows = len(rows) + 1
                num_cols = len(headers)

                table_shape = slide.shapes.add_table(num_rows, num_cols, table_x, top_y + Inches(0.35), table_w, card_h - Inches(0.45))
                table = table_shape.table

                # 表格標題
                tbl_title_box = slide.shapes.add_textbox(table_x, top_y - Inches(0.05), table_w, Inches(0.35))
                p_tt = tbl_title_box.text_frame.paragraphs[0]
                p_tt.text = f"📊 {v_data.get('title', '對比矩陣')}"
                p_tt.font.size = Pt(12)
                p_tt.font.bold = True
                p_tt.font.color.rgb = COLOR_ACCENT_GOLD

                # 填充表頭
                for col_idx, h in enumerate(headers):
                    cell = table.cell(0, col_idx)
                    cell.text = h
                    cell.fill.solid()
                    cell.fill.fore_color.rgb = COLOR_TABLE_HEADER
                    for p in cell.text_frame.paragraphs:
                        p.font.size = Pt(10.5)
                        p.font.bold = True
                        p.font.color.rgb = COLOR_WHITE
                        p.alignment = PP_ALIGN.CENTER

                # 填充資料列
                for r_idx, r_data in enumerate(rows):
                    is_alt = (r_idx % 2 == 1)
                    for col_idx, val in enumerate(r_data):
                        cell = table.cell(r_idx + 1, col_idx)
                        cell.text = str(val)
                        cell.fill.solid()
                        cell.fill.fore_color.rgb = COLOR_TABLE_ROW_ALT if is_alt else COLOR_WHITE
                        for p in cell.text_frame.paragraphs:
                            p.font.size = Pt(9.5)
                            p.font.color.rgb = COLOR_TEXT_MAIN
                            if col_idx == 0:
                                p.font.bold = True
                                p.font.color.rgb = COLOR_NAVY_LIGHT

            else:
                cards = s.get("cards", [])
                num_cards = max(1, min(3, len(cards)))
                total_w = 11.733
                spacing = 0.35
                card_w = (total_w - (num_cards - 1) * spacing) / num_cards
                top_y = Inches(1.9)
                card_h = Inches(5.0)

                for c_idx, card in enumerate(cards[:num_cards]):
                    card_x = Inches(0.8 + c_idx * (card_w + spacing))
                    card_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, top_y, Inches(card_w), card_h)
                    card_box.fill.solid()
                    card_box.fill.fore_color.rgb = COLOR_BG_CARD
                    card_box.line.color.rgb = COLOR_BORDER_CARD
                    card_box.line.width = Pt(1)

                    top_line = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, card_x, top_y, Inches(card_w), Inches(0.1))
                    top_line.fill.solid()
                    top_line.fill.fore_color.rgb = COLOR_NAVY_LIGHT if c_idx != 1 else COLOR_ACCENT_GOLD
                    top_line.line.fill.background()

                    tb = slide.shapes.add_textbox(card_x + Inches(0.25), top_y + Inches(0.25), Inches(card_w - 0.5), card_h - Inches(0.5))
                    tf = tb.text_frame
                    tf.word_wrap = True

                    p_c_title = tf.paragraphs[0]
                    p_c_title.text = card.get("title", "")
                    p_c_title.font.size = Pt(15)
                    p_c_title.font.bold = True
                    p_c_title.font.color.rgb = COLOR_NAVY_LIGHT
                    p_c_title.space_after = Pt(10)

                    for point in card.get("points", []):
                        p_p = tf.add_paragraph()
                        p_p.text = f"• {point}"
                        p_p.font.size = Pt(12)
                        p_p.font.color.rgb = COLOR_TEXT_MAIN
                        p_p.space_after = Pt(8)

        # 寫入逐頁三段式講稿至備忘錄 (Notes Slide)
        notes_slide = slide.notes_slide
        tf_notes = notes_slide.notes_text_frame
        nd = s.get("speaker_notes", {})
        notes_text = (
            f"① 本頁結論：\n{nd.get('conclusion', '原文未載')}\n\n"
            f"② 補充說明：\n{nd.get('explanation', '原文未載')}\n\n"
            f"③ 下一頁轉場：\n{nd.get('transition', '銜接下一階段論述')}"
        )
        tf_notes.text = notes_text

    prs.save(output_path)
    print(f"✅ 成功生成【{mod_id}】10 分鐘麥肯錫簡報：{output_path} (共 {total_slides} 頁)")

def export_js_data(all_decks, output_js_path):
    js_content = f"""/* =====================================================================
   briefing_modules_data.js — 《萬維鋼·現代思維工具100講》
   九大模組獨立 10 分鐘精華導讀簡報資料庫 (E01 ～ E09)
   規格：每個模組 12～14 頁（每頁 40–50 秒，嚴格 10 分鐘導讀）
   視覺：麥肯錫顧問風格、金字塔行動結論標題、每頁配備對比表格/圖表/矩陣、逐頁三段式講稿
   ===================================================================== */

const MODULE_CONFIGS = {json.dumps(MODULE_CONFIGS, ensure_ascii=False, indent=2)};

const BRIEFING_DECKS = {json.dumps(all_decks, ensure_ascii=False, indent=2)};

// 匯出供瀏覽器與 Node 雙向支援
if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ MODULE_CONFIGS, BRIEFING_DECKS }};
}}
"""
    with open(output_js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"✅ 成功匯出全模組前端資料：{output_js_path}")

def main():
    print("🚀 開始處理九大模組獨立 10 分鐘簡報生成...")
    js_path = os.path.join(os.path.dirname(__file__), "briefing_modules_data.js")
    export_js_data(ALL_MODULES_DECKS, js_path)

    for mod_id, deck in ALL_MODULES_DECKS.items():
        pptx_filename = f"briefing_{mod_id}.pptx"
        output_pptx = os.path.join(os.path.dirname(__file__), pptx_filename)
        build_pptx_for_module(mod_id, deck, output_pptx)

    print("🎉 全部九大模組 10 分鐘導讀簡報與資料庫處理完成！")

if __name__ == "__main__":
    main()
