# Role: AI & RNG streams

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
AI đối thủ/NPC và tái tạo chính xác các luồng số ngẫu nhiên của gốc.

## Inputs
Hàm AI/spawn/random của gốc; seed/bảng.

## Outputs
module enemies/ai + module rng, FORMATS mục AI & RNG (danh sách stream: seed, bảng, nơi gọi, thứ tự).

## Rules riêng
Mỗi stream riêng; thứ tự gọi phải trùng gốc (kể cả khi vật bị cull); không dùng Math.random thay thế mà không đăng ký GUESS; AI: tầm nhìn, tốc độ, pathfinding, trạng thái từ code.

## Ghi chú
Parity test: cùng seed -> cùng chuỗi (so với dump gốc/ghi hình nếu có).

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Song song với gameplay-logic; tách theo loại kẻ địch.

## Prompt mẫu
```
[_common.md]
ROLE: AI & RNG streams. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: AI đối thủ/NPC và tái tạo chính xác các luồng số ngẫu nhiên của gốc.
```
