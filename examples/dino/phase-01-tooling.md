# Phase 1 - Tooling setup

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-01-tooling.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: có decompiler chạy được, bộ trích xuất, dev server, QA tooling.

**Entry**: Phase 0 xong, biết loại binary.

**Việc làm**
1. **Decompiler**. Hỏi user cài cái nào (Dino: AskUserQuestion, user chọn "Cài Ghidra (Recommended)"; Ghidra 12.2 qua Homebrew: `/opt/homebrew/opt/ghidra/libexec/support/analyzeHeadless`).
   - Claude Code: skill `reverse-engineer-anything` + MCP `mcp__rea__*` (`open_binary`, `decompile_all`, `procedure_pseudo_code`, `procedure_assembly`, `search_strings`, `read_bytes`, `xrefs`...). Tool MCP là deferred: tải qua ToolSearch `select:mcp__rea__...`.
   - Headless Ghidra: import binary một lần, rồi chạy script. Xem `tools/ghidra/run-headless.sh` (có vòng retry cho `LockException`: project Ghidra bị khoá khi nhiều tiến trình chạy -> chạy một cái một lúc hoặc retry sleep 10 s).
   - Với bytecode (Java/.NET/Flash/Unity-Mono): dùng decompiler chuyên dụng (JADX, ILSpy, JPEXS). (SPECULATIVE: không dùng ở Dino.)
2. **Unified dump** (pipeline/README T1): decompile mọi hàm -> `all.c`, `funcs.tsv`. Thêm `Scan.java` nếu Ghidra bỏ sót hàm (không có symbol).
3. **Extractor**: script giải container (Dino: `unpack.py` giải `*.dat`; viết bằng Python, đặt scratch rồi chép vào `tools/` của dự án). Ghi lại thuật toán (Dino: entry = `name\0` + u32 size + body XOR với `name` lặp).
4. **Dev server + scaffold**: `tools/new-port.sh` rồi `npm i` (three + vite, ghim phiên bản chính xác, vd three 0.170.0, vite 5.4.11).
5. **QA tooling**: kiểm `browser-use` chạy; copy `tools/browser-sweep.template.py`. Chỉ QA agent dùng.
6. **Syntax check** script: `tools/syntax-check-all.sh`.
7. Ghi đường dẫn tất cả vào TASKS.md mục "Environment".

**Exit**: có thể hỏi "hàm tại địa chỉ X làm gì" bằng grep `all.c` trong <10 s; unpack được toàn bộ container (hoặc biết còn gì chưa); `npm run dev` hiển thị trang trống; ghi môi trường vào TASKS.md.

**Bẫy** (Dino): `decomp.c` được nhắc nhưng không có trên đĩa; ghidra project lock; REA session mở binary phải `close_binary` khi xong.
