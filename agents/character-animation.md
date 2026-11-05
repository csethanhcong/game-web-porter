# Role: Character / animation (actor & animation)

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Nhân vật/quái: mesh/sprite, khung xương hoặc sprite-anim, state->animation, hướng, blend, nội suy.

## Inputs
FORMATS (định dạng), quy ước toạ độ (rules/10), hàm update nhân vật gốc.

## Outputs
module character (src/character.*), scene test cô lập, FORMATS mục animation.

## Rules riêng
Bảng state->animation đọc từ code gốc; không hack hằng số (+PI...); chạy checklist rules/10 (A hoặc E); xác nhận chân/pivot bằng số liệu.

## Ghi chú
3D: Euler->quaternion, bone world, skinning, slerp, blend ms. 2D: atlas, pivot, flip, frame timing, skeletal-2D. Bỏ role nếu game không có nhân vật hoạt hoạ.

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Song song với level-map và renderer sau khi quy ước toạ độ chốt; tách agent hero và agent enemy nếu nhiều loại.

## Prompt mẫu
```
[_common.md]
ROLE: Character / animation (actor & animation). CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Nhân vật/quái: mesh/sprite, khung xương hoặc sprite-anim, state->animation, hướng, blend, nội suy.
```
