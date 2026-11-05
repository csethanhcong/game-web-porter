> Ví dụ cụ thể (một port thực tế), KHÔNG phải quy tắc chung. Bản trung lập nằm ngoài examples/.

# Environment, browser, scratch, syntax check

## Scratch & thư mục
- Scratchpad của session (Claude Code cho biết đường dẫn): script tạm, ảnh QA, dump. Không `/tmp` trừ khi user yêu cầu.
- Ghidra headless project + dump lớn: một thư mục riêng (Dino: `/private/tmp/claude-501/gh/{proj,scripts,out}`; `out/all.c` 2.6 MB = decompile toàn bộ, `out/funcs.tsv` = bảng hàm). Xem `tools/ghidra/`.
- Cấu trúc dự án mà `new-port.sh` tạo: `original/` (read-only) `extracted/` `src/` `public/assets/` `docs/` `.work/` (scratch cục bộ, git-ignore).
- Mỗi tệp tải về/giải nén vào thư mục MỚI, trống; chạy Python dữ liệu không tin cậy bằng `python3 -I`.

## Dev server
- Vite (mặc định): `npx vite --port 5173 --host 127.0.0.1 > <scratch>/vite.log 2>&1 &` rồi `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/`.
- Một dev server cho cả đội; chỉ orchestrator hoặc QA khởi động. Xem log khi nghi lỗi build (Dino kiểm tra `curl .../src/menu.js` + `tail vite.log`).
- URL dạng `?level=<name>` để nhảy thẳng vào màn (rất đáng làm sớm: giúp QA quét hàng loạt).

## Debug hooks (đáng làm sớm)
Dino cung cấp `window.__ready`, `__hero`, `__st`, `__G`, `__enemies`, `__items`, `__bombs`, `__keys`, `__throw(n)`, `__useAction`, `__respawn`, `__die`, `__err`, `__exit`, `__LEVELS`. Gợi ý chung: expose state + hàm cheat để QA tái hiện tình huống mà không cần chơi thật. Hooks nằm sau cờ debug; không phải deviation gameplay.

## Browser (chỉ QA-visual)
- Dùng skill `browser-use`; trong stdin Python có sẵn `goto_url, js, cdp, capture_screenshot, switch_tab` (Dino đã dùng vậy). Mẫu ở `tools/browser-sweep.template.py`.
- 1 instance, 1 tab. Chờ `window.__ready` (Dino ~8-14 s load). `capture_screenshot(path)`; (không có `screenshot()`).
- Sự kiện phím: `cdp("Input.dispatchKeyEvent", type="keyDown", key=..., code=..., windowsVirtualKeyCode=...)`; `cdp("Emulation.setFocusEmulationEnabled", enabled=True)` để tab nhận focus.
- Ảnh chụp lớn (8 MB PNG) -> dùng JPEG khi quét hàng loạt.
- Không nhồi ảnh vào context orchestrator; QA tóm tắt bằng lời + đường dẫn.

## Syntax check
```bash
tools/syntax-check-all.sh <project>/src
# tương đương: for f in src/*.js; do cp "$f" /tmp-or-scratch/x.mjs; node --check x.mjs; done
```
Chạy sau mỗi patch, trước khi báo "xong". Build thật: `npx vite build` trước release.

## Rate limit / context
- Agent bị watchdog treo (600 s không output) hoặc HTTP 429 do giới hạn chi tiêu: **resume bằng SendMessage**, nói "tiếp tục, đừng lặp việc đã xong". Dino: 2 lần 429, cả hai agent hoàn tất sau khi resume.
- Context của orchestrator cạn -> summary phải giữ: mục tiêu, luật (R1-R10), đường dẫn, trạng thái agent, danh sách việc chưa xong, hooks, lỗi đã gặp. Xem `agents/ORCHESTRATOR-GUIDE.md`.
