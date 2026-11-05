# Phase 7 - Gameplay logic, AI, RNG streams, fixed timestep

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-07-gameplay-ai-rng-timestep.md`](../examples/dino/phase-07-gameplay-ai-rng-timestep.md).

**Mục tiêu**: Hành vi game trùng gốc: điều khiển, va chạm, vật phẩm, vũ khí, cơ chế, AI, thắng/thua.

**Entry**: Có thực thể chạy trong nội dung (Phase 5/6) hoặc state machine của game.

**Việc làm**
1. **Timestep**: tìm vòng lặp chính; tick cố định hay dt; đơn vị tốc độ (per-tick vs per-giây). Web: accumulator nếu tick cố định.
2. Chia theo category (điều khiển người chơi, vật phẩm/vũ khí, cơ chế, kẻ địch/AI, thắng/thua, tiến trình); mỗi category một module + một agent.
3. Cấu trúc dữ liệu của nguồn (lưới cờ, danh sách thực thể) tái tạo đúng, không tự chế.
4. **RNG streams**: liệt kê mọi luồng ngẫu nhiên (seed, bảng, nơi gọi, thứ tự). Dùng random khác = GUESS có register.
5. Mỗi quy tắc: trigger -> điều kiện -> hiệu ứng -> thời lượng, kèm nguồn.
6. Game lượt/puzzle/card: trạng thái + luật + RNG; không có timestep.

**Exit**: Mỗi category có CONFIRMED với nguồn; chơi hết một vòng từ đầu tới kết thúc; parity test nếu có recording (T4).

**Câu hỏi kiểm tra**: Giá trị nào là 'cho có'? Stream RNG nào chưa tái tạo?
