# Phase 4 - Minimal renderer

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-04-minimal-renderer.md`](../examples/dino/phase-04-minimal-renderer.md).

**Mục tiêu**: Thấy một asset có texture đúng trên màn hình, với camera/viewport đúng quy ước, trước khi làm gì khác.

**Entry**: Parser asset (Phase 2) + checklist render (`rules/10`) đã điền vào FORMATS.md 'Rendering facts'.

**Việc làm**
1. Chạy checklist (3D mục A / 2D mục E) bằng cách đọc code nguồn - không đo bằng mắt.
2. Viết loader asset -> đối tượng render đúng quy ước (trục, winding, UV, đơn vị).
3. Camera/viewport/projection hoặc scaling 2D đọc từ code nguồn.
4. Vòng lặp: logic tick cố định hay dt (theo nguồn), render/animation theo dt.
5. Hooks tối thiểu: cờ `__ready`, tham số URL chọn màn.
6. Scene test cô lập cho từng loại asset.

**Exit**: 3+ asset hiển thị khớp tham chiếu ở cùng góc/khung; mỗi dòng checklist có nguồn; không hằng thử-sai.

**Câu hỏi kiểm tra**: Game không đồ hoạ: bỏ pha này, dựng UI/state renderer thay thế.
