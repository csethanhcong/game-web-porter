# Pipeline overview

Đọc trước: `00-decision-tree-and-applicability.md` (loại nguồn -> pha nào áp dụng). Các ví dụ trong phase/kỹ thuật dưới đây chỉ để minh hoạ (xem `../examples/dino/`); thay bằng công cụ tương ứng của game bạn.

15 phases (0-14). Mỗi phase có file riêng: mục tiêu, entry criteria, việc làm, exit criteria, agent phụ trách, artefact.
Phase không hoàn toàn tuần tự: sau Phase 3 nhiều phase chạy song song (xem bảng).

| Phase | Tên | Agent chính | Song song được với |
|---|---|---|---|
| 0 | Recon & legal/scope | recon | - |
| 1 | Tooling setup | recon / orchestrator | - |
| 2 | Asset extraction & format RE | asset-extractor, format-reverse-engineer | 1 (cuối) |
| 3 | Format docs | format-reverse-engineer, doc-keeper | 2 |
| 4 | Minimal renderer | effects-render | 5, 6 (sau khi có mesh+texture) |
| 5 | Character/skeleton/animation | character-animation | 4, 6 |
| 6 | Level/map loader | level-map | 4, 5 |
| 7 | Gameplay logic, AI, RNG, fixed timestep | gameplay-logic, ai-rng | 8, 9, 10 |
| 8 | Effects/sprites/shadows/lighting | effects-render | 7, 9, 10 |
| 9 | Audio | audio | 7, 8, 10 |
| 10 | UI/menu/HUD/input | ui-menu-input | 7, 8, 9 |
| 11 | Save/replay/demo gating | gameplay-logic / ui-menu-input | sau 7, 10 |
| 12 | Coverage audit | coverage-auditor | lặp lại nhiều lần từ phase 7 |
| 13 | Visual verification sweep | qa-visual | sau 6, lặp |
| 14 | Packaging/release | orchestrator | cuối |

Thứ tự thực tế của một port đã làm và bài học: [`../lessons-learned.md`](../lessons-learned.md). **Khuyên**: đọc code gốc ngay từ đầu cho từng category thay vì làm bản 'gần giống' rồi sửa. Ví dụ theo phase: [`../examples/dino/`](../examples/dino/).

## Kỹ thuật chung (dùng xuyên các phase). Ví dụ cụ thể: [`../examples/dino/pipeline-techniques.md`](../examples/dino/pipeline-techniques.md)

### T1. Unified dump
Đưa TOÀN BỘ code nguồn/decompile vào MỘT file + bảng đơn vị (địa chỉ/tên, kích thước, số caller, danh sách caller). Mọi agent dùng grep/sed trên file này thay vì mở công cụ cho từng đơn vị. Lưu ở đường dẫn cố định và ghi vào TASKS.md. Với binary: decompiler headless (`tools/ghidra/` là ví dụ), thêm bước quét đơn vị bị bỏ sót. Với hằng số quan trọng: đọc trực tiếp vùng data/asm, không chỉ tin decompiler (kiểu, float, thứ tự toán hạng).

### T2. Address-annotated notes
Mọi dòng trong FORMATS.md và mọi comment code giữ nguồn: `// CONFIRMED <addr|file:line>: ...`. Cho phép kiểm lại, tính coverage bằng grep, phát hiện mâu thuẫn.

### T3. String/xref-driven discovery
Từ chuỗi (tên file, định dạng sprintf, tên section) -> xref -> đơn vị chứa -> feature. Lấy được cả tên file sinh động (pattern) mà liệt kê tên thuần không thấy. Với source: grep tên file/hằng.

### T4. Parity tests against original recordings
Nếu gốc có replay/demo/log hoặc có thể ghi (hook, emulator, ảnh/video): dùng làm "golden": phát lại input + seed -> so trạng thái theo tick giữa web và bản ghi. Thiếu recording: dùng số liệu từ code + ảnh tham chiếu. Parity RNG: tái tạo đúng seed/bảng/thứ tự gọi. Đánh giá recording sớm (bỏ lỡ nó là một cơ hội mất, SPECULATIVE).

### T5. Đóng băng và cô lập
Scene test cô lập cho từng thành phần + debug hooks để tái hiện tình huống. Đừng debug trong cả game.

### T6. Coverage as a loop
Bảng đơn vị trừ đơn vị đã được nhắc nguồn = danh sách còn lại, xếp ưu tiên; lặp tới khi hết. Số đo là proxy.

### T7. Nhãn proxy
Mọi số đo gián tiếp (coverage, nhãn module theo vùng địa chỉ) phải ghi rõ là proxy/SUY ĐOÁN.
