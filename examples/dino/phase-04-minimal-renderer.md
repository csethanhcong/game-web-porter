# Phase 4 - Minimal renderer

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-04-minimal-renderer.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: thấy được một mesh có texture đúng trên màn hình, camera đúng quy ước, trước khi làm bất cứ gì khác.

**Entry**: parser mesh/texture (Phase 2) + checklist render rules/10 đã điền vào FORMATS.md "Rendering facts".

**Việc làm** (agent: effects-render)
1. Chạy **checklist A** trong `rules/10-render-port-checklist.md` bằng cách đọc code gốc: handedness, winding, UV, cull, blend, projection, ánh sáng, clear color, ambient, fog.
2. Viết `loadMesh()` đúng quy ước (hoán trục + winding + UV) và test với 3-4 mesh đã biết hình (thùng, đá, rào). So với preview/screenshot gốc.
3. Camera: đọc hàm thiết lập view/projection của gốc (Dino FUN_004158e0: FOV π/4, near 1, far 1500, pitch -138+6*zoom deg, lerp k=min(1,0.01*dt)). **Không fit bằng mắt.**
4. Vòng lặp: fixed timestep cho logic, dt thật cho render/animation (xem phase 7).
5. Debug hooks tối thiểu: `window.__ready`, URL `?level=`.
6. Scene test cô lập (như `char.html`) cho mesh.

**Exit**: 3+ mesh tĩnh hiển thị khớp preview ở cùng góc camera; checklist A điền đủ mỗi dòng với nguồn; không có hằng thử-sai.

**Bẫy**: double V flip, winding, texture tên hoa/thường, ground vẽ trước (Dino: dirt01/02/03, RNG seed thứ hai 0xd80).
