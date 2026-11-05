# Phase 5 - Character / skeleton / animation

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-05-character-skeleton-animation.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: nhân vật + quái hiển thị đúng và đi/đứng tự nhiên, đúng hướng, đúng animation cho mỗi trạng thái.

**Entry**: loader skeleton/animation (Phase 2), Phase 4 đã chốt quy ước toạ độ.

**Việc làm** (agent: character-animation)
1. Đọc đúng: loader skeleton/anim/char-def; **Euler -> quaternion** (thứ tự, đơn vị); **đệ quy ma trận bone world**; **skinning** (offset theo bone-local hay bind pose; số influence/đỉnh, trọng số 0 = không dùng); translation gốc theo frame; nội suy (linear/slerp, hàm slerp chính xác nếu có); bước thời gian (Dino 33 ms/frame); loop vs clamp; **blend khi đổi animation** (Dino 200 ms).
2. Quy ước ma trận (rules/10 mục A4): row-vector vs column. Override bone (mắt, đuôi tóc, mũ gắn đầu).
3. Bảng **state -> animation file + tốc độ phát** đọc từ hàm update của nhân vật (không đoán). Upper/lower-body split nếu có (Dino: "Bip01 Spine1" cờ +0x104 sau kiểm tra = không dùng).
4. Hướng: heading biến thành xoay mô hình; tìm hướng tiến của model (Dino +X, Z-up) và dấu góc. **Không dùng +PI.**
5. Scene test front/side + đóng băng frame của anm chạy: chân luân phiên, không xoắn.
6. Chân chạm nền: xác minh bằng số liệu (Dino: chân z=0, không cần nâng).

**Exit**: đóng băng 1 chu kỳ chạy trông tự nhiên; 4/8 hướng quay đúng chiều di chuyển (QA xác nhận); mọi state có animation nguồn CONFIRMED; GUESS còn lại có register.

**Đã sai ở Dino**: facing +PI hack; double V flip trên .skl; chân lún; "animation rất kỳ" (user) -> do khung toạ độ/thứ tự xoay và blend; mất công vì làm trước khi reverse.
