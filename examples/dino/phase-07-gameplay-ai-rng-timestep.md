# Phase 7 - Gameplay logic, AI, RNG streams, fixed timestep

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-07-gameplay-ai-rng-timestep.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: hành vi game trùng gốc: di chuyển, va chạm, vật phẩm, vũ khí, AI, thắng/thua.

**Entry**: Phase 5, 6 chạy (có nhân vật trong level).

**Việc làm** (agents: gameplay-logic, ai-rng; chia theo category, mỗi agent một module)
1. **Fixed timestep**: tìm vòng lặp chính của gốc (Dino FUN_0043aab0 / FUN_0043a4e0: logic 33 ms/tick). Web: accumulator, tick cố định; tốc độ viết per-tick (Dino hero 1000/33 ~ 6 ô/s; enemy vilka 0.8, sniper 0.45, dlinnyi 0.5, bugai 0.7 mỗi tick). Animation/hiệu ứng thị giác dùng dt thật.
2. **Hero**: input -> hướng (8 hướng, quay tuyến tính 200 ms), di chuyển theo lưới (footprint 2x2), cờ ô, đẩy hộp, đá (60% thời gian, bán kính 14.15, dmg 10), HP 300, chết -> menu defeat 7000 ms (không có mạng/hồi sinh ở Dino).
3. **Vật phẩm / vũ khí** (Dino: đặt bom, không ném): bom thường/radio/grenade với fuse, bán kính, lưới nhiệt/lửa (FUN_00411710/00411c30), ngưỡng phá được.
4. **Đối tượng cơ chế**: laser/gương, khoá/chìa/cổng, tablet, teleport, thoát màn.
5. **AI** kẻ địch: BFS đuổi, tầm nhìn, bán kính kích hoạt, tốc độ, đạn, chết. Xem agents/ai-rng.md.
6. **RNG streams**: gốc có thể có nhiều dòng RNG riêng (Dino: FUN_00440260/004402b0/00440320, bảng ở VA 0x49e1d8; "stream RNG 1" cho mắt hero; seed theo object `ob.rnd`). Phải tái tạo **từng stream** với seed/thứ tự gọi; bất cứ chỗ nào cần "ngẫu nhiên" mà không có stream tương ứng -> GUESS.
7. Điều kiện thắng/thua, chuyển màn, tiến trình.
8. Mỗi phép tính có địa chỉ; số "cho có" -> GUESS.

**Exit**: mỗi category trong TASKS.md có CONFIRMED với địa chỉ; chơi hết ít nhất 1 level từ đầu tới thoát; parity test nếu có ghi (phase 11, T4).

**Đã sai ở Dino**: cấu trúc ô ban đầu tự chế (BLOCK/obj...) phải thay bằng "Unified cell-flag grid"; thứ tự chia agent ban đầu làm bản gần giống rồi phải reverse lại.
