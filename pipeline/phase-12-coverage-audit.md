# Phase 12 - Coverage audit

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-12-coverage-audit.md`](../examples/dino/phase-12-coverage-audit.md).

**Mục tiêu**: Chứng minh không thiếu: mọi đơn vị game-specific và asset được xử lý hoặc loại có lý do; đóng GUESS. Chạy NHIỀU LẦN từ khi Phase 7 có lõi.

**Entry**: Unified dump + bảng đơn vị; src có nguồn chú thích.

**Việc làm**
1. Đơn vị game-specific = tổng trừ thư viện/runtime (tiêu chí ghi rõ); đối chiếu nhắc tới trong src+FORMATS (grep) -> đã nhắc/chưa nhắc. **Đó chỉ là proxy.**
2. Mỗi đơn vị chưa nhắc: đọc, phân loại ĐÃ PORT / KHÔNG CẦN (lý do) / GAP -> TASKS.md.
3. Asset: được nguồn tham chiếu (tên, pattern, gián tiếp) hay không; web thực sự yêu cầu lúc chạy (copy vào public không tính).
4. Âm thanh: mẫu x điểm phát.
5. GUESS register: đóng bằng bằng chứng mới hoặc giữ kèm rủi ro.
6. Không có binary: audit theo checklist tính năng/module/file hoặc quan sát (video).

**Exit**: 0 đơn vị chưa duyệt; asset không dùng có lý do; GUESS còn lại có register.

**Câu hỏi kiểm tra**: Số đo có ghi rõ là proxy không?
