# Phase 3 - Format docs (FORMATS.md)

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-03-format-docs.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: một tài liệu sống, nguồn sự thật chung cho mọi agent: định dạng, hằng số, hành vi, kèm địa chỉ nguồn.

**Entry**: có ít nhất vài định dạng ở Phase 2.

**Việc làm** (agents: format-reverse-engineer viết, doc-keeper bảo trì)
1. Khởi tạo từ `templates/FORMATS.md`.
2. Mỗi section = một chủ đề: định dạng file, bảng chú giải map/level (Dino: ký tự `$ % & * 0-9 <>^v @ B E F G I L M ...` với footprint và hàm FUN_00406f40), Rendering facts, Hero/Enemy/Bombs/Effects/Audio/UI, Deviations, "Fixes" (triệu chứng+nguyên nhân).
3. Mỗi dòng sự thật: `CONFIRMED <địa chỉ/file>` hoặc `GUESS`. Hằng số có đơn vị (ms, tick, ô, độ).
4. Quy ước ghi: layout nhị phân bằng khối code với offset; công thức kiểm size; quirks (v = 1 - v).
5. doc-keeper rà soát định kỳ: dòng cũ mâu thuẫn dòng mới (Dino: vài dòng ~106-112, 154, 168, 178, 194, 197 bị outdated); gom "PARTIAL" thành "DONE" khi xong; không xoá lịch sử fix.

**Exit**: FORMATS.md đủ để một người/agent mới viết lại loader mà không cần xem decompile; không có hằng số không nguồn.

**Lưu ý**: FORMATS.md lớn (Dino 88 KB). Dùng mục lục `## ` và grep; agent đọc theo mục, không đọc toàn bộ. Cân nhắc tách file khi >100 KB (SPECULATIVE).
