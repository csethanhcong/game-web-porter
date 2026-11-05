# Phase 6 - Level / map loader

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-06-level-map-loader.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: mọi level dựng ra đúng bố cục, đúng đối tượng, đúng đồ trang trí so với gốc.

**Entry**: Phase 4 (mesh), format level đã reverse.

**Việc làm** (agent: level-map)
1. Parser level (Dino `.lev`: INI + lưới ASCII); header (tên, pack, độ khó, nhạc, số bom, sun, ...).
2. **Bảng chú giải ký tự/tile** -> object (hàm factory), footprint (w x h ô), góc xoay, cờ ô (Dino: cờ mặc định 0x1803, '#' 0x1883, bom 0x40, hero 0x20, đẩy được 0x800), tham số theo ký tự lân cận (laser: hướng theo ký tự bên phải, '+' bên dưới = on/off).
3. Quy đổi toạ độ ô -> world (Dino `world = cell*5 - N*5/2`). Kiểm bằng 2-3 vật mốc.
4. **Object metadata** (.cgo): mesh/texture + bounds (circle/rect) cho va chạm.
5. **RNG xác định**: trang trí ngẫu nhiên (cỏ, hoa, đá) dùng bộ RNG của gốc (bảng + seed + thứ tự gọi) để trùng bố cục. Xem agents/ai-rng.md.
6. Nền, nước (kiểu theo ô, edge fade, mesh đáy), vật trang trí, cây (sprite theo bound "leaves").
7. Tải theo mọi level; script load-all + bắt lỗi console.
8. Preview làm tham chiếu thị giác: `public/assets/preview/<level>.jpg`.

**Exit**: load-all không lỗi; ít nhất 3 level khớp preview; mọi ký tự trong chú giải được xử lý hoặc ghi "không dùng"; RNG parity (nếu có) kiểm trên 1-2 level.

**Bẫy**: crash do null trong mảng object; footprint lệch; tên texture hoa/thường; đồ trang trí RNG sai seed.
