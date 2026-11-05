# Phase 5 - Character / skeleton / animation

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-05-character-skeleton-animation.md`](../examples/dino/phase-05-character-skeleton-animation.md).

**Mục tiêu**: Nhân vật/thực thể hiển thị và chuyển động đúng, đúng hướng, đúng animation cho mỗi trạng thái.

**Entry**: Parser asset animation; quy ước toạ độ đã chốt (Phase 4). BỎ pha nếu game không có thực thể hoạt hoạ.

**Việc làm**
1. Đọc từ nguồn: cách dựng hoạt hoạ (xương/skinning hoặc sprite-frame), thứ tự phép biến đổi, đơn vị, nội suy, bước thời gian, loop/clamp, blend khi đổi animation.
2. Quy ước ma trận/đại số (rules/10 mục A4).
3. Bảng trạng thái -> animation + tốc độ phát lấy từ hàm update (không đoán).
4. Hướng nhìn: tìm hướng tiến của model và dấu góc; không hack hằng số.
5. Scene test cô lập, đóng băng frame; xác minh chân/pivot bằng số liệu.

**Exit**: Một chu kỳ chuyển động tự nhiên; các hướng đúng chiều di chuyển (QA); mỗi state có nguồn animation CONFIRMED.

**Câu hỏi kiểm tra**: Có nhân vật hoạt hoạ không? 2D: atlas, pivot, flip, frame timing.
