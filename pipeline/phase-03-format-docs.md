# Phase 3 - Format docs (FORMATS.md)

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-03-format-docs.md`](../examples/dino/phase-03-format-docs.md).

**Mục tiêu**: Một tài liệu sống làm nguồn sự thật chung: định dạng, hằng số, hành vi, kèm nguồn.

**Entry**: Có ít nhất vài định dạng từ Phase 2.

**Việc làm**
1. Khởi tạo từ `templates/FORMATS.md`.
2. Mỗi mục một chủ đề: định dạng file, chú giải nội dung/map, rendering facts, timing, từng category gameplay, RNG, audio/UI/input, DEVIATION, Fixes.
3. Mỗi dòng sự thật: CONFIRMED + nguồn (địa chỉ/file:dòng/offset) hoặc GUESS (+ GUESS_REGISTER). Hằng số luôn có đơn vị.
4. doc-keeper rà soát: dòng cũ mâu thuẫn dòng mới, PARTIAL->DONE, không xoá lịch sử fix.
5. Tài liệu lớn: đọc theo mục (`grep '^## '`); cân nhắc tách file khi quá lớn.

**Exit**: Người/agent mới có thể viết lại loader chỉ từ FORMATS.md; không hằng số vô nguồn.

**Câu hỏi kiểm tra**: Mỗi agent ghi vào mục của mình? Có mâu thuẫn chưa giải quyết không?
