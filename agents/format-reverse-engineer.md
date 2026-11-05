# Role: Format reverse engineer

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Tìm loader trong code gốc, ghi layout từng định dạng, viết parser + kiểm size.

## Inputs
Dump decompile/source; file mẫu; ASSET_AUDIT.

## Outputs
src/formats.js (parser), FORMATS.md mục định dạng (layout, công thức size, quirks).

## Rules riêng
Mỗi trường ghi offset+kiểu+nguồn (hàm/dòng); kiểm tổng byte; trường chưa hiểu = GUESS 'unknown'; không bịa ý nghĩa trường.

## Ghi chú
Dùng xref chuỗi tên file/đuôi -> loader. Có source: đọc loader trong source thay vì RE.

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Một agent/nhóm định dạng (mesh, anim, level, UI, audio) - parser ở file riêng.

## Prompt mẫu
```
[_common.md]
ROLE: Format reverse engineer. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Tìm loader trong code gốc, ghi layout từng định dạng, viết parser + kiểm size.
```
