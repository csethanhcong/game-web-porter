# Phase 11 - Save / replay / demo gating

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-11-save-replay-demo-gating.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: tiến trình, lưu, replay và các giới hạn bản demo được xử lý có chủ ý.

**Entry**: Phase 7, 10.

**Việc làm** (agents: gameplay-logic / ui-menu-input)
1. **Save/progress**: gốc lưu ở đâu (file, registry, INI)? Web: `localStorage`/IndexedDB (try/catch, có thể trống). Ghi format.
2. **Replay**: Dino `.rec` = demo replay; format chưa dùng. Nếu đọc được: (a) tính năng replay, (b) **golden parity test** (pipeline/README T4). Thứ tự input per tick + seed RNG.
3. **Demo gating** (shareware): timer, "DEMO VERSION / MIN. LEFT", BUY NOW, nag screen, khoá level theo số pass. Tìm tất cả điểm kiểm tra bằng chuỗi (xref).
   - Theo yêu cầu user, Dino **bypass có chủ ý** qua cờ `UNLOCK_ALL` trong `config.js`: bỏ timer 60 phút, bỏ mục BUY NOW/DEMO, mở 38 màn, tiến trình xuyên pack. Đây là **deviation** (rules R5): mặc định do user quyết, `false` = hành vi demo gốc.
   - Không tự bypass khi user chưa yêu cầu; hỏi.
4. Đăng ký deviation trong FORMATS.md + templates/config.js.

**Exit**: save/load chạy; mọi giới hạn demo xử lý đúng theo cờ; replay (nếu làm) tái hiện đúng; deviation ghi tài liệu.
