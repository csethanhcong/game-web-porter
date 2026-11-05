# Phase 9 - Audio

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-09-audio.md`](../examples/dino/phase-09-audio.md).

**Mục tiêu**: Âm thanh/nhạc phát đúng lúc, đúng kiểu như gốc. BỎ nếu game không có âm thanh.

**Entry**: File âm thanh đã extract; hàm audio của nguồn đã định vị.

**Việc làm**
1. Thư viện/API của nguồn; danh sách mẫu/bài nhạc.
2. Nhạc: định dạng (tracker/MIDI/stream), bảng chọn nhạc theo màn, loop.
3. Hàng đợi phát: 2D/3D, công thức âm lượng/pan/khoảng cách, one-shot vs loop, áp lại mỗi khung hay không.
4. Web: autoplay policy cần cử chỉ người dùng (ghi là điều chỉnh kỹ thuật).
5. Cross-check: mỗi tên mẫu trong nguồn có điểm phát (grep) -> COVERAGE.

**Exit**: Bảng mẫu x điểm phát đầy đủ; nhạc đúng màn; công thức vol/pan theo nguồn; mẫu 'không dùng' được liệt kê.

**Câu hỏi kiểm tra**: Cần player cho định dạng nhạc đặc thù (libopenmpt, soundfont)?
