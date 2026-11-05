# Decision tree, technology choice, phase applicability

Harness này KHÔNG gắn với một game/engine/thư viện nào. Mọi tên cụ thể (three.js, Ghidra, DirectX, DirectInput, BASS, Vite...) chỉ là **ví dụ hoặc lựa chọn mặc định**. Ví dụ cụ thể (một port binary 3D đã làm) nằm ở `examples/dino/` và `lessons-learned.md`.
Mục tiêu duy nhất: **bản chạy được trong trình duyệt**, đúng hành vi bản gốc (hoặc đúng deviation đã gắn cờ).

## 1. Bắt đầu từ loại nguồn nào? (decision tree)

```
Bạn có gì?
|
+-- (A) SOURCE CODE đầy đủ (C/C++/C#/Java/Lua/GDScript/JS...)
|     +-- Engine có export web chính thức (Unity WebGL, Godot HTML5, Defold, Love.js, Cocos...)?
|     |     -> dùng export web của engine. Pha chính: 0, 1(build), 9-ish audio autoplay, 13, 14.
|     +-- C/C++ thuần/SDL/OpenGL -> Emscripten (WASM) hoặc port từng phần sang JS/TS.
|     +-- Ngôn ngữ khác -> viết lại sang JS/TS (hoặc transpile: Java->TeaVM/GWT, C#->Blazor/Bridge, Python->Pyodide).
|     -> BỎ: decompile (1), RE định dạng nếu có tài liệu/loader (2-3 rút gọn thành "đọc loader trong source").
|     -> Quy tắc "replicate đúng" vẫn áp dụng: đọc source, đừng viết lại từ trí nhớ.
|
+-- (B) BINARY chỉ có (exe/ELF/Mach-O/APK/ROM/.swf/.jar/.dll managed/Unity build)
|     +-- Native (x86/ARM/MIPS): decompiler (Ghidra/IDA/Hopper/REA MCP).
|     +-- Managed (.NET/Unity Mono/il2cpp): ILSpy/dnSpy/Il2CppDumper.
|     +-- JVM/Android: JADX/apktool.   +-- Flash: JPEXS FFDec.   +-- ROM console: emulator + disassembler (+ tilemap/sprite viewer).
|     +-- Có thể CHỈ chạy emulator trên web? (jsnes, EmulatorJS, v86, DOSBox/js-dos, ScummVM, OpenMW)
|           -> nếu mục tiêu "chơi được" và pháp lý cho phép: nhúng emulator = cách nhanh nhất (ghi rõ đây là emulation, không phải port).
|     -> Đủ pipeline 0-14.
|
+-- (C) ASSET-ONLY (có data, không có exe/logic: vd chỉ file .dat/.pak/ảnh/âm thanh)
|     -> Làm 0, 2, 3 (đảo ngược định dạng bằng phân tích nhị phân / so với công cụ cộng đồng), rồi
|        logic = VIẾT MỚI theo thiết kế -> mọi logic đều là GUESS/"reimplementation" (gắn cờ rõ; xem rules R2).
|        Hỏi user chấp nhận mức độ "tái tạo" không phải "replicate".
|
+-- (D) CHỈ CÓ VIDEO / ảnh chụp / mô tả gameplay
      -> Không thể "replicate đúng". Pipeline thành: spec từ quan sát (frame extraction, đo tốc độ/thời gian từ video),
         toàn bộ hành vi = GUESS (đăng ký), asset tự tạo/ tái tạo. Nói thẳng với user. Các pha 1-3 bỏ; 7-12 dùng "quan sát" làm bằng chứng
         (CONFIRMED-visual: timestamp video).
```
Nguồn hỗn hợp (vd binary + source mod): dùng nhánh mạnh nhất cho từng phần, ghi nguồn trong FORMATS.md.

## 2. Bảng chọn công nghệ theo loại game (mặc định gợi ý, không bắt buộc)

| Loại game | Renderer web gợi ý | Ghi chú |
|---|---|---|
| 3D thời gian thực | three.js (mặc định), Babylon.js, PlayCanvas, raw WebGL2/WebGPU | cần checklist toạ độ/winding/UV (rules/10) |
| 2D sprite/platformer/arcade | Canvas2D, PixiJS, Phaser, kaboom, raw WebGL | quan trọng: pixel-snapping, tick cố định, thứ tự layer, palette/CLUT |
| Tile/RTS/chiến thuật | Canvas2D/Pixi + worker cho AI/pathfinding | chú ý RNG, pathfinding xác định, fog-of-war |
| Puzzle/board/card | DOM/SVG/Canvas | logic là trọng tâm, parity test trạng thái dễ làm nhất |
| Text/adventure/IF | DOM; VM story (Z-machine: Parchment/Quixe; ScummVM) | thường dùng lại interpreter có sẵn |
| Visual novel | DOM/Canvas; Ren'Py web / custom | script VM + asset |
| Game console/ROM | emulator WASM (EmulatorJS/jsnes/...) | pháp lý: cần ROM hợp pháp của user |
| DOS/Win cổ | js-dos/DOSBox, v86 | port trực tiếp thường không cần |
| Flash | Ruffle (WASM) | thường chỉ cần nhúng |
| Game có mạng | WebSocket/WebRTC server giả lập | thường ngoài scope: hỏi user |

Ngôn ngữ: JS/TS mặc định; Rust/C++ -> WASM khi cần hiệu năng hoặc dùng lại code C. Build: Vite (mặc định) / esbuild / không build.
Âm thanh: WebAudio; nhạc tracker -> libopenmpt (chiptune3); MIDI -> soundfont player; FMOD/BASS bank -> giải bank ra ogg/wav.
Input: Keyboard/Mouse/Pointer/Gamepad API (+ touch nếu cần); DirectInput/SDL/evdev chỉ là cái cần map từ gốc.
Decompile: Ghidra (mặc định cho native), IDA, Hopper, REA MCP; JADX/ILSpy/JPEXS/Il2CppDumper cho managed/Flash.

## 3. Pha nào áp dụng / bỏ / điều chỉnh

| Pha | Bỏ/điều chỉnh khi... |
|---|---|
| 0 Recon | luôn làm |
| 1 Tooling | **Bỏ phần decompile** nếu có source (A); nếu chỉ video (D) bỏ cả pha; chỉ giữ dev server + syntax check |
| 2 Asset/format RE | asset-only (C) là pha chính; có source -> đọc loader thay vì RE; video (D): bỏ |
| 3 Format docs | luôn làm (ngắn hơn khi có spec/loader source) |
| 4 Renderer tối thiểu | 2D: bỏ khung 3D, thay bằng "checklist 2D" (rules/10 mục E); text game: UI-only |
| 5 Character/skeleton/animation | **Bỏ** nếu không có nhân vật hoạt hoạ (puzzle/text/card); 2D: sprite animation/atlas/skeletal 2D (Spine/DragonBones) |
| 6 Level/map | thay bằng "content loader" (màn, bàn cờ, bộ bài, kịch bản, bản đồ) |
| 7 Logic/AI/RNG/timestep | luôn làm; text/card: RNG + luật; real-time: fixed timestep |
| 8 Effects/lighting | 2D: particle/palette/blend; puzzle/text: bỏ phần lớn |
| 9 Audio | **Bỏ** nếu game không âm thanh; luôn xử lý autoplay policy |
| 10 UI/menu/input | luôn làm; mobile/touch thêm nếu muốn (ngoài replicate) |
| 11 Save/replay/demo gating | chỉ khi gốc có save/replay/giới hạn demo/DRM |
| 12 Coverage audit | binary: theo hàm; source: theo module/file; asset-only/video: theo checklist tính năng |
| 13 Visual sweep | luôn (so với ảnh/video tham chiếu); game không đồ hoạ -> so sánh transcript/trạng thái |
| 14 Release | luôn |

Ghi lựa chọn vào TASKS.md mục "Phase plan": phase nào SKIP + lý do.

## 4. Tên role trung lập
Role trong `agents/` dùng tên trung lập: recon, asset-extractor, format-reverse-engineer, character-animation (= "actor/animation"), level-map (= "content/world loader"), gameplay-logic, ai-rng, effects-render (= "renderer & effects"), audio, ui-menu-input, qa-visual, coverage-auditor, doc-keeper. Đổi tên/gộp/bỏ theo loại game (vd puzzle: gộp ai-rng vào gameplay-logic; không có animation -> bỏ role).
