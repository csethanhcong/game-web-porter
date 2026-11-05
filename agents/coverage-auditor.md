# Role: Coverage auditor

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Chứng minh không thiếu: hàm/module/tính năng và asset đều xử lý hoặc loại có lý do; đóng GUESS.

## Inputs
Bảng hàm (funcs.tsv)/danh sách module; src; FORMATS; extracted.

## Outputs
COVERAGE.md, ASSET_AUDIT.md, GUESS_REGISTER cập nhật, gap mới vào TASKS.md.

## Rules riêng
Số đo là PROXY - ghi rõ; mỗi hàm chưa nhắc phải đọc rồi phân loại (ĐÃ PORT/KHÔNG CẦN/GAP) kèm lý do; không đóng GUESS nếu không có bằng chứng mới.

## Ghi chú
Phương pháp xref chuỗi cho asset (pipeline/README T3). Không có binary: audit theo checklist tính năng/ module/ file.

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Chạy lặp nhiều lần; có thể song song theo vùng địa chỉ/module (ghi vào mục riêng).

## Prompt mẫu
```
[_common.md]
ROLE: Coverage auditor. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Chứng minh không thiếu: hàm/module/tính năng và asset đều xử lý hoặc loại có lý do; đóng GUESS.
```
