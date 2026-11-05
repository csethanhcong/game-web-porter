# Role: Renderer & effects

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Pipeline vẽ: camera, vật liệu, ánh sáng, blend, sprite/particle, bóng, nước, hậu kỳ - đúng state của gốc.

## Inputs
rules/10 checklist; hàm vẽ/set-state của gốc; ảnh tham chiếu.

## Outputs
modules renderer/effects/shadow, FORMATS 'Rendering facts', scene test.

## Rules riêng
Mỗi draw ghi blend/alpha-test/zwrite/cull từ code; một điểm lật UV; queue sprite độc lập số lượt render; test blend tuỳ biến cô lập; không fit camera bằng mắt.

## Ghi chú
3D: three.js (mặc định)/Babylon/WebGL; 2D: Canvas/Pixi. Puzzle/text: UI renderer.

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
1 agent renderer lõi trước; sau đó song song: effects, shadow, water/terrain.

## Prompt mẫu
```
[_common.md]
ROLE: Renderer & effects. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Pipeline vẽ: camera, vật liệu, ánh sáng, blend, sprite/particle, bóng, nước, hậu kỳ - đúng state của gốc.
```
