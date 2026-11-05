# Role: Gameplay logic

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Luật chơi: di chuyển, va chạm, vật phẩm, vũ khí, cơ chế, thắng/thua, tiến trình, save/demo gating.

## Inputs
Decompile/source hàm update; FORMATS; level data.

## Outputs
modules logic (hero, weapons, mechanisms...), FORMATS mục tương ứng, cờ deviation nếu cần.

## Rules riêng
Fixed timestep đúng loại gốc (per-tick vs dt); hằng số có đơn vị và địa chỉ; cấu trúc dữ liệu (lưới cờ) mô phỏng của gốc, không tự chế; mỗi cơ chế = một category.

## Ghi chú
Mỗi category ghi: trigger -> điều kiện -> hiệu ứng -> thời gian, với địa chỉ.

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Một agent/category (hero, vũ khí, cơ chế, win/lose) - module riêng.

## Prompt mẫu
```
[_common.md]
ROLE: Gameplay logic. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Luật chơi: di chuyển, va chạm, vật phẩm, vũ khí, cơ chế, thắng/thua, tiến trình, save/demo gating.
```
