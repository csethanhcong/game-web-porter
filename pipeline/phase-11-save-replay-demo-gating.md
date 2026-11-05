# Phase 11 - Save / replay / demo gating

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-11-save-replay-demo-gating.md`](../examples/dino/phase-11-save-replay-demo-gating.md).

**Mục tiêu**: Tiến trình, lưu, replay và giới hạn bản demo được xử lý có chủ ý. Chỉ làm nếu gốc có.

**Entry**: Phase 7 và 10.

**Việc làm**
1. Save/progress: gốc lưu ở đâu/format gì; web dùng localStorage/IndexedDB với try/catch.
2. Replay/recording của gốc: đọc được không? Dùng làm tính năng và/hoặc **golden parity test** (`pipeline/README.md` T4).
3. Demo gating (timer, nag, khoá nội dung, DRM): tìm mọi điểm kiểm tra (xref chuỗi).
4. Bypass chỉ khi user yêu cầu, qua cờ deviation (R5, `templates/config.js`); mặc định cờ do user quyết.
5. Ghi DEVIATION trong FORMATS.md.

**Exit**: Save/load chạy; mọi giới hạn demo xử lý đúng theo cờ; deviation có tài liệu.

**Câu hỏi kiểm tra**: User có muốn bypass không? Cờ có đường quay về hành vi gốc không?
