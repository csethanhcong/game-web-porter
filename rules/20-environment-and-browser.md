# Environment, browser, scratch, syntax check

## Scratch & thư mục
- Scratchpad của session (Claude Code cho biết đường dẫn): script tạm, ảnh QA, dump. Không `/tmp` trừ khi user yêu cầu.
- Dump decompile/code lớn + project công cụ RE: một thư mục riêng cố định (ghi vào TASKS.md). Ví dụ cấu trúc: [`../examples/dino/environment.md`](../examples/dino/environment.md).
- Cấu trúc dự án mà `new-port.sh` tạo: `original/` (read-only) `extracted/` `src/` `public/assets/` `docs/` `.work/` (scratch cục bộ, git-ignore).
- Mỗi tệp tải về/giải nén vào thư mục MỚI, trống; chạy Python dữ liệu không tin cậy bằng `python3 -I`.

## Dev server
- Vite (mặc định): `npx vite --port 5173 --host 127.0.0.1 > <scratch>/vite.log 2>&1 &` rồi `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/`.
- Một dev server cho cả đội; chỉ orchestrator hoặc QA khởi động. Xem log khi nghi lỗi build.
- URL dạng `?level=<name>` để nhảy thẳng vào màn (rất đáng làm sớm: giúp QA quét hàng loạt).

## Debug hooks (đáng làm sớm)
Gợi ý chung: `window.__ready`, `window.__err`, state hiện tại (`__st`), hàm cheat để tái hiện tình huống (đặt vật phẩm, giết/hồi sinh nhân vật, nhảy màn). Hooks nằm sau cờ debug; không phải deviation gameplay. Danh sách hooks thực tế: ../examples/dino/environment.md.

## Browser (chỉ QA-visual)
- Dùng skill `browser-use`; trong stdin Python có sẵn `goto_url, js, cdp, capture_screenshot`. KHÔNG dùng `switch_tab`/`new_tab`/`bringToFront`/`activateTarget` (HARD RULE R4b: không được đưa tab lên trước). Mẫu ở `tools/browser-sweep.template.py`.
- 1 instance, 1 tab. Chờ `window.__ready` (thời gian load tuỳ game). `capture_screenshot(path)`.
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
- Agent bị watchdog treo (~600 s không output) hoặc HTTP 429 do giới hạn chi tiêu: **resume bằng SendMessage**, nói "tiếp tục, đừng lặp việc đã xong".
- Context của orchestrator cạn -> summary phải giữ: mục tiêu, luật (R1-R10), đường dẫn, trạng thái agent, danh sách việc chưa xong, hooks, lỗi đã gặp. Xem `agents/ORCHESTRATOR-GUIDE.md`.
