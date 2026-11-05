# Phase 12 - Coverage audit (COVERAGE.md / ASSET_AUDIT.md)

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-12-coverage-audit.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: chứng minh "không thiếu gì": mọi hàm game-specific và mọi asset đều được xử lý hoặc loại có lý do. Chạy NHIỀU LẦN, bắt đầu khi Phase 7 đã có lõi.

**Entry**: unified dump (all.c + funcs.tsv), src có địa chỉ chú thích.

**Việc làm** (agent: coverage-auditor)
1. **Hàm**: danh sách hàm từ `funcs.tsv`; lọc CRT/D3D/BASS/thư viện (theo vùng địa chỉ + kích thước; Dino: 838 hàm game trong 0x401000-0x440838, trong 2308); đối chiếu grep địa chỉ trong `src/*` + FORMATS.md -> "đã nhắc" vs "chưa nhắc" (Dino 364 / 495). Chú ý: **proxy** - web có thể tái hiện mà không ghi địa chỉ.
2. Mỗi hàm chưa nhắc: đọc decompile -> xếp: ĐÃ PORT (chỉ ra file) / KHÔNG CẦN (không caller, CRT, cheat chết) / GAP (việc mới -> TASKS.md). Gap xác nhận ghi ở đầu COVERAGE.md.
3. **Asset** (ASSET_AUDIT): mỗi file extract: được exe tham chiếu theo tên/pattern/gián tiếp (qua .cgo/.chr) / không; web có thực sự yêu cầu lúc chạy? ("copy vào public/assets" không tính.) Quy trình T3 (string xref).
4. **Âm thanh**: danh sách mẫu x điểm phát.
5. **GUESS**: đóng từng cái trong register (đọc thêm decompile, hoặc chốt giữ làm GUESS có lý do).
6. Sau mỗi vòng: cập nhật số liệu, báo cáo: còn bao nhiêu, ưu tiên.

**Exit**: 0 hàm game-specific "chưa duyệt"; asset không dùng có lý do ("unused in original"); GUESS còn lại có register và rủi ro ghi rõ. (Tiêu chuẩn Dino: "lướt lại 38 màn rồi đóng nốt các GUESS".)
