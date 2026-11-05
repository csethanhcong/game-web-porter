# Phase 6 - Level / map / content loader

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-06-level-map-loader.md`](../examples/dino/phase-06-level-map-loader.md).

**Mục tiêu**: Mọi màn/bản đồ/bàn/bộ bài/kịch bản dựng đúng bố cục, đối tượng, vật trang trí so với gốc.

**Entry**: Phase 4 (asset hiển thị) + định dạng nội dung đã reverse.

**Việc làm**
1. Parser nội dung (header + dữ liệu).
2. Bảng chú giải mã/tile/id -> đối tượng, footprint, hướng, cờ ô/thuộc tính, tham số theo ngữ cảnh lân cận (từ hàm factory của nguồn).
3. Quy đổi toạ độ nội dung -> world (kiểm bằng vài vật mốc).
4. Metadata đối tượng (mesh/texture/bounds va chạm).
5. RNG xác định nếu nguồn sinh trang trí ngẫu nhiên: đúng seed, bảng, thứ tự gọi.
6. Địa hình đặc biệt (nước, nền, cây...) đọc từ hàm tương ứng.
7. Script load-all bắt lỗi console.

**Exit**: Load-all không lỗi; vài màn khớp tham chiếu; mọi mã trong chú giải được xử lý hoặc ghi 'không dùng'.

**Câu hỏi kiểm tra**: Dữ liệu null/thiếu có guard? Tên file có phân biệt hoa/thường không?
