# Phase 2 - Asset extraction & format reverse engineering

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-02-asset-extraction-format-re.md`](../examples/dino/phase-02-asset-extraction-format-re.md).

**Mục tiêu**: Toàn bộ dữ liệu ở dạng đọc được; mỗi định dạng riêng có parser dựa trên loader của nguồn.

**Entry**: Phase 1 có công cụ đọc nguồn và trích xuất.

**Việc làm**
1. Giải container/nén/mã hoá vào thư mục mới (`extracted/`), thuật toán lấy từ code gốc (CONFIRMED).
2. Phân loại theo đuôi/magic; chuyển định dạng chuẩn web (ảnh, âm thanh, nhạc) khi có chuyển đổi trung thực.
3. Với mỗi định dạng riêng: tìm loader trong nguồn (từ tên file/đuôi/xref), ghi layout từng trường (offset, kiểu, endian, chỉ số base), viết parser, **kiểm tra bằng công thức kích thước** so với file thật.
4. Chú ý: UV/trục/đơn vị góc, normal có sẵn hay tự tính, cờ header, tham số theo đỉnh vs theo góc tam giác, trường chưa rõ (ghi unknown/GUESS).
5. Ghi từng định dạng vào FORMATS.md ngay; khởi tạo ASSET_AUDIT (danh sách file).

**Exit**: Mọi định dạng cần cho gameplay có parser + kiểm size pass; unknown được liệt kê rõ.

**Câu hỏi kiểm tra**: Asset-only: định dạng suy từ phân tích nhị phân/công cụ cộng đồng (GUESS). Source có sẵn: đọc loader thay vì RE.
