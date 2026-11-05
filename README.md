# game-web-porter-harness

Bộ harness tái sử dụng để port **một game bất kỳ** (bất kỳ engine / ngôn ngữ / nền tảng) sang **game chạy được trong trình duyệt**.
A reusable harness for porting ANY game (any source engine/language/platform) to something that runs in a browser.

Nguồn gốc / origin: đóng gói từ quy trình thực tế của một port đã hoàn thành (ví dụ cụ thể, tách riêng: [`examples/dino/`](examples/dino/README.md))
(`<workspace>/dino_web`, three.js 0.170 + Vite 5). Mọi bài học trong đây đến từ việc đã xảy ra; chỗ nào suy đoán được đánh dấu `(SPECULATIVE)`.

Phạm vi / scope: **chỉ dùng cá nhân, local, phi thương mại** (xem `pipeline/phase-00-recon-scope.md`). Target = "chạy được trên browser", không bắt buộc framework:
three.js là lựa chọn mặc định (default), có thể thay bằng Babylon / PlayCanvas / raw WebGL / Canvas2D / Phaser / WASM (Emscripten) / v.v.

## Generic, không khoá công nghệ
Harness áp dụng cho mọi thể loại (2D/3D, platformer, RTS, puzzle, card, text...) và mọi nguồn (source, exe/ROM/Flash/Unity/Java, asset-only, chỉ video).
three.js / Ghidra / D3D / DirectInput / BASS / Vite chỉ là ví dụ hoặc mặc định. Bắt đầu bằng `pipeline/00-decision-tree-and-applicability.md` (cây quyết định nguồn, bảng chọn công nghệ, pha nào bỏ/điều chỉnh). Ví dụ Dino: `examples/dino/`.

## Triết lý cốt lõi (4 dòng)
1. **Replicate đúng bản gốc.** Không bịa logic, không bịa trigger, không "chỉnh bằng mắt" rồi coi là xong.
2. **Mọi khẳng định phải có bằng chứng**: `CONFIRMED` (địa chỉ hàm / file / offset) hoặc `GUESS` (nhãn rõ ràng, có sổ đăng ký, có kế hoạch đóng).
3. **Chia việc cho nhiều agent theo category, mỗi agent sở hữu file riêng**; giao tiếp qua tài liệu dùng chung (FORMATS / COVERAGE / TASKS) + báo cáo bàn giao.
4. **Kiểm chứng bằng mắt + số liệu** so với ảnh preview / bản ghi gốc, chỉ qua MỘT agent QA sở hữu trình duyệt duy nhất (1 instance, 1 tab).

## Quick start (khởi động port từ đầu với Claude Code)

```bash
# 1. Tạo skeleton dự án từ templates
<workspace>/game-web-porter-harness/tools/new-port.sh my_game ~/Desktop/game
cd ~/Desktop/game/my_game_port          # (new-port.sh in ra đường dẫn chính xác)

# 2. Đặt game gốc vào  original/   (exe, data, v.v.) -- chỉ đọc, không sửa
# 3. Mở Claude Code trong thư mục dự án và dán prompt khởi động:
```

Prompt khởi động (dán vào Claude Code, đã có sẵn trong `CLAUDE.md` của skeleton):

```
Đọc CLAUDE.md, HARNESS.md (đường dẫn tới harness), TASKS.md. Bạn là ORCHESTRATOR (agents/orchestrator.md).
Mục tiêu: port game trong original/ lên web chơi được local, non-commercial.
Làm Phase 0 (recon + scope) rồi Phase 1 (tooling), báo cáo tôi trước khi spawn agents song song.
Quy tắc: rules/00-standing-rules.md (replicate chính xác, không bịa, CONFIRMED/GUESS, 1 browser/1 tab).
```

Sau Phase 1-3 (tooling + extract + format docs), orchestrator spawn các agent theo `agents/ORCHESTRATOR-GUIDE.md`.
Trong Claude Code: skill `reverse-engineer-anything` (REA MCP `mcp__rea__*`) hoặc Ghidra headless (xem `tools/ghidra/`) cho decompile; skill `browser-use` cho QA.

## Folder map

```
game-web-porter-harness/
  README.md                  <- file này
  CLAUDE.snippet.md          <- đoạn thả vào CLAUDE.md của dự án port mới
  lessons-learned.md         <- cái gì sai/đúng ở port đầu tiên (ví dụ), time sink, thứ tự khuyên dùng
  rules/
    00-standing-rules.md     <- luật cố định (replicate, CONFIRMED/GUESS, báo cáo, flags, scratch dirs...)
    10-render-port-checklist.md  <- checklist toạ độ/handedness/UV/winding/ma trận/blend + anti-patterns đã gặp
    20-environment-and-browser.md <- 1 browser/1 tab, scratch dirs, syntax check, rate-limit
  examples/dino/README.md    <- ví dụ cụ thể (Dino), không bắt buộc
  pipeline/
    00-decision-tree-and-applicability.md  <- BẮT ĐẦU TỪ ĐÂY: loại nguồn, chọn công nghệ, pha nào bỏ
    README.md                <- tổng quan phase + kỹ thuật chung (unified decompile dump, parity test...)
    phase-00 ... phase-14    <- entry/exit criteria từng phase
  agents/
    ORCHESTRATOR-GUIDE.md    <- cách chia việc, song song, file-ownership, rate limit, giao tiếp
    _common.md               <- khối luật + format báo cáo dùng chung (dán vào MỌI prompt agent)
    orchestrator.md recon.md asset-extractor.md format-reverse-engineer.md character-animation.md
    level-map.md gameplay-logic.md ai-rng.md effects-render.md audio.md ui-menu-input.md
    qa-visual.md coverage-auditor.md doc-keeper.md
  templates/
    FORMATS.md COVERAGE.md ASSET_AUDIT.md TASKS.md AGENT_REPORT.md GUESS_REGISTER.md config.js (deviation flags)
  tools/
    README.md new-port.sh syntax-check-all.sh browser-sweep.template.py
    ghidra/ (All.java Dec.java Scan.java Xr.java run-headless.sh) 
```

## Cách đọc
- Người mới: README -> rules/00 -> pipeline/README -> agents/ORCHESTRATOR-GUIDE -> lessons-learned.
- Agent con: chỉ cần `_common.md` + file role của mình + FORMATS.md/TASKS.md của dự án.

## Repo layout
- Root (`rules/`, `pipeline/`, `agents/`, `templates/`, `tools/`, `examples/`): the reusable, game-agnostic porting harness.
- `games/<name>/`: one folder per ported game (source, format notes, coverage audit). Third-party game assets are never committed (see each game's `ASSETS.md`).
- `games/dino/`: Dino and Aliens (D3D8 shareware demo) → three.js port. This was the reference port the harness was distilled from.
