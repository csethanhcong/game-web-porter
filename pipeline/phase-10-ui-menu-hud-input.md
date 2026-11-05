# Phase 10 - UI, menus, HUD, input

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-10-ui-menu-hud-input.md`](../examples/dino/phase-10-ui-menu-hud-input.md).

**Mục tiêu**: Mọi màn hình ngoài gameplay, HUD và điều khiển giống gốc.

**Entry**: Phase 4; font/atlas UI đã extract.

**Việc làm**
1. Hệ toạ độ/độ phân giải UI và cách scale lên canvas.
2. Font (bitmap/vector), atlas, panel, file text (parser từ nguồn).
3. Menu graph: màn nào dẫn đi đâu, hiệu ứng chuyển, mục khoá.
4. HUD: vị trí, số liệu, hộp thông báo; kiểm tên có đánh lừa (feature gọi 'zoom' nhưng thực chất là UI).
5. Input: map phím/nút/trục của API gốc -> API web (Keyboard/Pointer/Gamepad/Touch); phần map không chắc = GUESS; chặn phím mặc định của trình duyệt.
6. Màn kết thúc/thua/pause/credits.
7. Một hệ UI duy nhất, tránh module trùng.

**Exit**: Duyệt toàn bộ menu graph bằng input chính; text lấy từ file gốc; HUD khớp tham chiếu; code chết (không caller) ghi 'không cần port'.

**Câu hỏi kiểm tra**: Có điều khiển debug/cheat/freecam của gốc cần giữ không?
