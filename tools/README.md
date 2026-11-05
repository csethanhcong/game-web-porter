# tools/

| Script | Công dụng |
|---|---|
| `new-port.sh <name> [parent]` | Tạo `<parent>/<name>_port/` từ templates (docs, config.js, CLAUDE.md, package.json, index.html, src/main.js, tools). Test: `new-port.sh demo /tmp/x` rồi kiểm `ls`. |
| `syntax-check-all.sh [dir...]` | `node --check` mọi .js/.mjs (ES module qua bản sao .mjs). Exit != 0 nếu lỗi. Chạy sau mỗi patch. |
| `browser-sweep.template.py` | Mẫu cho qa-visual: với mỗi level: goto_url -> chờ `__ready` -> lấy `__err` -> chụp. Chạy bằng `browser-use < file` (skill browser-use cung cấp `goto_url/js/cdp/capture_screenshot`). Một instance, một tab. |
| `ghidra/run-headless.sh` | Wrapper Ghidra headless (VÍ DỤ decompiler cho binary native): import, decompile-all, decompile vài hàm, quét hàm bỏ sót, xref. Có retry `LockException`. |
| `ghidra/All.java` | Decompile mọi hàm -> `funcs.tsv` (addr, tên, size, #callers, callers) + `all.c`. |
| `ghidra/Dec.java` | Decompile/disassemble danh sách địa chỉ (`asm:ADDR` cho assembly). |
| `ghidra/Scan.java` | Tạo hàm cho call-target/prologue chưa được nhận (x86-32: `E8` + `55 8B EC`) rồi xuất bảng hàm. Điều chỉnh prologue cho kiến trúc khác (SPECULATIVE với ARM/x64). |
| `ghidra/Xr.java` | Xref tới địa chỉ; `f:ADDR` in dword/float/double tại địa chỉ (đọc hằng số). |

## Ghidra headless - ghi chú (ví dụ một port thực tế: ../examples/dino/environment.md)
- Binary: `/opt/homebrew/opt/ghidra/libexec/support/analyzeHeadless` (Homebrew, Ghidra 12.2). Lệnh gốc: `analyzeHeadless proj <proj> -process <exe> -noanalysis -scriptPath scripts -postScript All.java out/funcs.tsv out/all.c`.
- Project bị khoá khi 2 tiến trình dùng cùng lúc (`LockException`) -> wrapper retry sleep 10 s. Chạy tuần tự.
- Ví dụ (xem examples/dino): `All.java` mất vài phút, ra 2.6 MB `all.c` (2201 hàm), sau `Scan.java` 2308 hàm.
- Nếu dùng REA MCP (`mcp__rea__*`): `open_binary` -> `decompile_all`/`procedure_pseudo_code` -> `close_binary` khi xong. Tool deferred, nạp qua ToolSearch.
- Các nguồn khác (không dùng Ghidra): JADX (APK/JVM), ILSpy/dnSpy/Il2CppDumper (.NET/Unity), JPEXS (Flash), emulator+debugger (ROM). Wrapper tương tự: xuất toàn bộ decompile ra một file + bảng hàm.

## Parity test (ghi chú)
Nếu có recording của gốc (replay/demo/video/log): viết harness chạy cùng input + seed trên bản web (qua hook `__st`, tick cố định) và so trạng thái theo tick. Chưa có script chung vì format recording khác nhau mỗi game.
