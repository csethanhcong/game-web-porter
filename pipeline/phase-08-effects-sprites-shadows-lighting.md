# Phase 8 - Effects, sprites, shadows, lighting

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-08-effects-sprites-shadows-lighting.md`](../examples/dino/phase-08-effects-sprites-shadows-lighting.md).

**Mục tiêu**: Hiệu ứng, hạt, billboard, bóng, môi trường động, ánh sáng đúng như gốc.

**Entry**: Renderer (Phase 4) + sự kiện từ logic (Phase 7). Puzzle/text: phần lớn bỏ.

**Việc làm**
1. Hệ thống sprite/particle: atlas, blend theo loại, zwrite, alpha test (có hay không), sort, cull; triển khai **độc lập số lượt render**.
2. Bóng: kỹ thuật của nguồn (shadow map/lightmap/blob), blend; test blend custom cô lập.
3. Môi trường động (nước, cây, thời tiết): hàm cập nhật + tham số theo thời gian.
4. Ánh sáng: nguồn sáng, ambient, vật liệu từ dữ liệu/ code gốc.
5. Hiệu ứng trên nhân vật (tàng hình, cháy...).
6. Mỗi hiệu ứng ghi bảng blend/state (rules/10 mục C).

**Exit**: Hiệu ứng khớp tham chiếu; không biến mất qua các pass; mỗi state có nguồn.

**Câu hỏi kiểm tra**: Có pass vẽ phụ (bóng, gương) làm vẽ scene nhiều lần không?
