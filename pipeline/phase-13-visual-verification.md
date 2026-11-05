# Phase 13 - Visual verification sweep

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-13-visual-verification.md`](../examples/dino/phase-13-visual-verification.md).

**Mục tiêu**: Mọi màn/trạng thái được nhìn thật trong trình duyệt và so với tham chiếu; lỗi quay về agent chủ.

**Entry**: Phase 6 trở đi; lặp sau mỗi cụm thay đổi lớn.

**Việc làm**
1. Chỉ agent qa-visual dùng browser: 1 instance, 1 tab (R4). Dùng `tools/browser-sweep.template.py`.
2. Với mỗi màn: mở, chờ cờ ready, thu lỗi console, chụp (ảnh nhẹ), so với tham chiếu; ghi sai lệch bằng số/toạ độ.
3. Kịch bản gameplay qua debug hooks (tái hiện tình huống không cần chơi thật).
4. Phân loại lỗi -> agent chủ; QA không tự sửa code trừ khi được giao.
5. Báo cáo bảng màn x kết quả; tách 'xác nhận bằng ảnh' vs 'nghi ngờ'.
6. Game không đồ hoạ: so sánh transcript/trạng thái.

**Exit**: Mỗi màn có dòng kết quả; không lỗi console; chênh lệch có giải thích (CONFIRMED/GUESS).

**Câu hỏi kiểm tra**: Ảnh tham chiếu có cùng aspect/độ phân giải không?
