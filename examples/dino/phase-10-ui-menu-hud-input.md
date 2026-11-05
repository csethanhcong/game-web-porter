# Phase 10 - UI, menus, HUD, input

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-10-ui-menu-hud-input.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: toàn bộ màn hình ngoài gameplay + HUD + điều khiển giống gốc.

**Entry**: Phase 4; font/atlas UI đã extract.

**Việc làm** (agent: ui-menu-input)
1. **Hệ toạ độ UI**: Dino ortho 800x600 (FUN_0043bd00); scale lên canvas giữ tỉ lệ.
2. **Font bitmap** (font.tga + font.dat, FUN_00435ab0), atlas menu (menutex.tga), panel, text file (menu.txt, menutext.txt; parser FUN_004295a0).
3. **Menu graph**: màn nào dẫn đi đâu, hiệu ứng chuyển, mục bị khoá (demo). Menu 3D (Dino INFO showcase FUN_0041b740 + ánh sáng menulevel).
4. **HUD** in-game: vị trí, số liệu, hộp chữ trượt (tablet 'zoom' = hộp trượt 750 ms, không phải zoom camera), chữ 'R' replay (FUN_00416dd0).
5. **Input**: bàn phím (map DIK -> KeyboardEvent.code), chuột (DIMOUSESTATE lX/lY/button), gamepad (Gamepad API; thứ tự nút/trục vs DirectInput là GUESS ở Dino), freecam/debug cam của gốc (FUN_00415200), phím cấu hình được.
6. Pointer lock/focus; chặn phím trình duyệt (mũi tên cuộn trang).
7. Màn kết thúc/defeat/pause/credits.

**Exit**: duyệt toàn bộ menu graph bằng bàn phím + (nếu có) gamepad; mọi text lấy từ file gốc; HUD khớp ảnh; cheat chết (không caller) ghi "không cần port".

**Bẫy**: ui.js vs menu.js trùng lặp (Dino); nhầm tính năng "zoom" vì tên; nhầm phím modifier (LAlt = DIK 0x38).
