> Ví dụ cụ thể (một port thực tế), KHÔNG phải quy tắc chung. Bản trung lập nằm ngoài examples/.

# Pipeline overview

Đọc trước: `00-decision-tree-and-applicability.md` (loại nguồn -> pha nào áp dụng). Các ví dụ trong phase/kỹ thuật dưới đây lấy từ Dino (D3D8 exe, Ghidra, three.js) chỉ để minh hoạ; thay bằng công cụ tương ứng của game bạn.

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

Thứ tự thực tế ở Dino (xem lessons-learned): unpack -> loader mesh/skl/anm -> level -> nhân vật -> kẻ địch/items -> bom/tablet/chìa/cổng -> thoát màn -> laser/gương -> menu/âm thanh -> game over -> ... Sau đó user phát hiện nhiều thứ "bịa" và bắt reverse lại từng category. **Khuyên**: đọc code gốc ngay từ đầu cho từng category thay vì làm bản "gần giống" rồi sửa.

## Kỹ thuật chung (dùng xuyên các phase)

### T1. Unified decompile dump
Decompile TOÀN BỘ hàm một lần vào một file (`all.c`) + bảng hàm (`funcs.tsv`: địa chỉ, tên, kích thước, số caller, danh sách caller). Sau đó mọi agent dùng `grep`/`sed` trên file này thay vì mở MCP từng hàm.
- Dino: `All.java` (Ghidra headless) -> `out/all.c` 2.6 MB, 2201-2308 hàm; `Scan.java` tìm thêm hàm bị bỏ sót bằng quét `E8` call-target + prologue `55 8B EC` (2308 hàm). Xem `tools/ghidra/`.
- Ghi chú: một phiên có file `decomp.c` không có trên đĩa -> các agent phải dùng MCP/REA hoặc chạy lại headless; vì vậy hãy lưu dump ở đường dẫn cố định và ghi vào TASKS.md.
- Hàm đơn lẻ: `Dec.java <out> <addr...>` (tiền tố `asm:` để lấy assembly).
- Cẩn thận khi gộp: decompiler đôi khi sai (kiểu, hằng float). Với hằng số quan trọng, đọc asm/`read_bytes` ở địa chỉ data.

### T2. Address-annotated notes
Mọi dòng trong FORMATS.md và mọi comment code giữ địa chỉ nguồn: `// CONFIRMED FUN_0041fb70: ...`. Cho phép: kiểm lại, tính coverage bằng grep địa chỉ, doc-keeper phát hiện mâu thuẫn.

### T3. String/xref-driven discovery
Từ chuỗi (tên file, định dạng sprintf, tên section INI) -> tìm xref -> hàm chứa nó -> feature. Dino ASSET_AUDIT dùng: mọi chuỗi NUL-terminated, mọi immediate 4 byte bằng VA chuỗi trong .text/.rdata/.data, hàm chứa = hàm gần nhất phía trước (heuristic). Lấy được cả pattern sprintf (`bottom%i.cgo`, `water0%i.jpg`) mà tên file thuần không thấy.

### T4. Parity tests against original recordings
Nếu gốc có file replay/demo (Dino: `.rec`) hoặc có thể ghi (Frida/GDB/ảnh chụp bản gốc chạy trong Wine/VM): dùng làm "golden":
- Replay input -> so sánh trạng thái (vị trí hero mỗi N tick, HP, vật phẩm) giữa web và ghi gốc.
- Trong Dino `.rec` được ghi nhận là "demo replay (not needed)" -> chưa dùng làm parity test. **(SPECULATIVE)** đây là cơ hội bỏ lỡ, nếu format .rec đọc được thì rất đáng làm ở Phase 11/13.
- Thay thế khi không có recording: số liệu từ code (tốc độ/tick, bán kính, thời gian) + ảnh preview của game (Dino: `preview/<level>.jpg`) làm tham chiếu thị giác.
- Parity RNG: bản web phải reproduce cùng chuỗi số ngẫu nhiên (seed + bảng + thứ tự gọi) thì mới trùng bố cục/đồ trang trí (xem phase 7, role ai-rng).

### T5. Đóng băng và cô lập
Scene test cô lập cho từng thành phần (Dino: `char.html` + `chartest.js` xem nhân vật front/side; hook `__st`/`__throw` cho bom). Đừng debug trong cả game.

### T6. Coverage as a loop
Bảng hàm (T1) trừ đi hàm được nhắc địa chỉ trong src/FORMATS = danh sách còn lại, xếp ưu tiên theo vùng địa chỉ/kích thước. Lặp tới khi hết. (Dino: 838 hàm game, 364 đã nhắc, 495 chưa -> duyệt dần, đóng bằng "ĐÃ PORT"/"không cần port: không caller".)

### T7. Nhãn proxy
Mọi số đo gián tiếp (coverage, nhãn module theo vùng địa chỉ) phải ghi rõ là proxy/SUY ĐOÁN.
