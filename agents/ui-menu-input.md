# Role: UI / menu / HUD / input

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Menu graph, HUD, font/atlas UI, text, điều khiển (bàn phím/chuột/gamepad/touch).

## Inputs
Hàm UI/input gốc; atlas/font; file text.

## Outputs
modules ui, hud, input, FORMATS mục UI/Input.

## Rules riêng
Văn bản/bố cục từ file gốc; map phím gốc (DIK/scancode/button) -> code web: phần không chắc là GUESS; chặn phím trình duyệt; một hệ UI duy nhất (tránh module trùng).

## Ghi chú
Demo gating/save thuộc role này + gameplay-logic, qua cờ config.

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Song song: menu, HUD, input là 3 module riêng.

## Prompt mẫu
```
[_common.md]
ROLE: UI / menu / HUD / input. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Menu graph, HUD, font/atlas UI, text, điều khiển (bàn phím/chuột/gamepad/touch).
```
