# Phase 9 - Audio

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-09-audio.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: mọi âm thanh/nhạc phát đúng lúc, đúng kiểu như gốc.

**Entry**: file âm thanh đã extract; hàm audio của gốc đã định vị (Dino: BASS, FUN_00434cd0 init, 00434d80 load `*.ogg`, 00434e60/00434f40 music, 00435000 queue).

**Việc làm** (agent: audio)
1. Thư viện gốc & API; danh sách mẫu (Dino: 44 tên mẫu trong exe, tất cả được phát).
2. **Nhạc**: format (Dino MO3 module -> chiptune3/libopenmpt; bảng order theo level `{0:0,1:6,2:0x2e,...}`), loop.
3. **Hàng đợi phát**: 2D vs 3D (FUN_00434fa0/00434fd0), phát mỗi khung (FUN_00435190), 3D: `vol = 100 - trunc(dist)`, `pan = trunc(dx*3)` clamp ±100, áp lại mỗi khung. One-shot vs loop.
4. **Web**: AudioContext cần user gesture -> màn "click to start"; autoplay policy. Ghi là deviation kỹ thuật nếu thêm.
5. Âm lượng nhạc/sfx từ cài đặt gốc (nếu có menu option).
6. Cross-check: mỗi tên mẫu trong exe có điểm phát trong code web (grep) -> COVERAGE.

**Exit**: danh sách mẫu x điểm phát đã ánh xạ; nhạc đúng level; 3D pan/vol theo công thức; ghi các mẫu "chưa có lệnh phát" (Dino: không có).
