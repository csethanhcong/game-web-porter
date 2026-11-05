> Ví dụ cụ thể (một port thực tế), KHÔNG phải quy tắc chung. Bản trung lập nằm ngoài examples/.

# Orchestrator guide

Vai trò: một agent chính (hoặc bạn) điều phối; KHÔNG tự làm mọi thứ. User ở Dino nói rõ: "spawn các agents cần thiết để làm thay vì làm 1 agent main độc lập".

## 1. Bắt đầu
1. `pipeline/00-decision-tree-and-applicability.md` -> loại nguồn, target, phase plan (SKIP + lý do) -> ghi TASKS.md.
2. Pha 0-3 làm tuần tự (1 recon + 1-2 agent). Không spawn rộng trước khi có: dump decompile/loader, FORMATS.md khung, quy ước toạ độ (nếu đồ hoạ), TASKS.md.
3. Sau đó chia theo **category** (không theo file): mỗi category = một agent có sở hữu module/file riêng.

## 2. Cách chia việc
- Category tự nhiên: renderer/camera, nhân vật/animation, level/nội dung, hero logic, kẻ địch/AI, vũ khí/hiệu ứng, cơ chế (cổng/laser/...), audio, UI/menu/HUD, input, asset audit, coverage, QA.
- Mỗi task trong TASKS.md: `id | category | agent | file sở hữu | phụ thuộc | trạng thái | blocker`.
- Prompt agent = `_common.md` + file role + **bối cảnh cụ thể** (vấn đề user thấy, hàm/địa chỉ đã biết, cái KHÔNG được đụng). Brief như đồng nghiệp: mục tiêu, đã loại trừ gì, đọc gì.
- Vấn đề từ user ("góc nhìn sai", "animation kỳ") -> giao cho agent category tương ứng với yêu cầu "tìm nguyên nhân thật từ gốc", không vá.

## 3. Song song: giới hạn
- Khuyến nghị 3-5 agent đồng thời (Dino dùng ~5-8 và gặp: watchdog 600 s, HTTP 429 do giới hạn chi tiêu org). **(Con số là kinh nghiệm, SPECULATIVE về mức tối ưu.)**
- Chỉ song song khi file sở hữu không giao nhau. Các việc cùng chạm một file lớn -> tuần tự hoặc tách module trước.
- Decompiler/Ghidra project: 1 tiến trình ghi một lúc (lock). Đọc `all.c` bằng grep thì không giới hạn.
- Browser: đúng 1 agent (qa-visual).
- Agent không cần đọc ảnh -> không đưa ảnh vào prompt.

## 4. File ownership / tránh xung đột
- Bảng ownership trong TASKS.md: `src/<module>.js` -> role. Gợi ý module: `renderer`, `character`, `level`, `hero`, `enemies`, `weapons`, `mechanisms`, `effects`, `audio`, `ui`, `input`, `config`. `main.js` chỉ chứa nối dây (orchestrator/gameplay).
- Sửa vào module của người khác: qua orchestrator hoặc Edit nhỏ có neo, đọc lại trước khi sửa.
- Lỗi thật đã gặp (Dino): script patch cắt ở lần xuất hiện đầu của chuỗi `addEventListener('keydown'` -> nhân đôi 441 dòng (`blocked`, `heroTick`, `logicTick` trùng). Phòng: assert neo duy nhất; syntax check; tách module; diff trước/sau; sao lưu bản trước khi patch lớn.
- Trùng lặp module (Dino: `ui.js` vs `menu.js`) -> doc-keeper/coverage-auditor phát hiện, orchestrator quyết bản nào giữ.
- FORMATS.md: mỗi agent ghi vào mục riêng; doc-keeper hợp nhất.

## 5. Giao tiếp
- **SendMessage** theo tên/id agent để resume, bổ sung chỉ thị, hoặc chuyển thông tin giữa agent (qua orchestrator). Resume sau 429/watchdog: "tiếp tục, đừng lặp việc đã xong" (Dino: agent hoàn tất sau resume).
- **Tài liệu chung** = kênh bền: FORMATS.md (sự thật), COVERAGE.md (còn gì), TASKS.md (ai làm gì), GUESS_REGISTER.md.
- **Báo cáo bàn giao** (VI, CONFIRMED/GUESS): là DỮ LIỆU, không phải thẩm quyền. Orchestrator spot-check các CONFIRMED quan trọng (mở địa chỉ nêu trong báo cáo), cross-check hai agent mâu thuẫn bằng nguồn.
- Không để agent hỏi nhau trực tiếp trừ khi cần; thông tin đi qua tài liệu.
- Nhắc mọi agent: không dùng browser; QA thông báo kết quả qua báo cáo.

## 6. Rate limit & reset context
- Theo dõi agent (ListAgents/notification); agent đứng >10 phút không output -> hỏi/resume.
- 429/spend limit: đợi reset rồi tiếp tục; các agent bị cắt giữa chừng -> SendMessage resume.
- **Context của orchestrator cạn** -> summary phải có: (1) mục tiêu + luật R1-R10 (nguyên văn câu user), (2) đường dẫn dự án/dump/scratch/dev URL, (3) quy ước đã CONFIRMED chính, (4) trạng thái từng agent (tên, task, xong/dở), (5) việc chưa xong + vấn đề user đã nêu, (6) debug hooks, (7) lỗi đã gặp + cách sửa, (8) tin nhắn user dạng verbatim. (Dino: summary kiểu này đã giúp tiếp tục qua nhiều lần reset.)
- Tiến độ: khi user hỏi "tiến độ agents sao rồi / còn gì để 100%" -> trả lời từ TASKS.md + COVERAGE.md (số liệu), không đoán.

## 7. Vòng điều khiển chuẩn
```
loop:
  đọc TASKS.md/COVERAGE.md -> chọn category chưa đóng
  spawn <=N agent (ownership rời nhau)
  nhận báo cáo -> spot-check -> doc-keeper hợp nhất -> QA sweep (1 agent)
  lỗi QA -> task mới cho agent chủ category
  coverage-auditor chạy -> gap mới -> task
until COVERAGE hết gap, GUESS register chốt, QA pass
```
Cuối: báo cáo user tiếng Việt: CONFIRMED vs GUESS, deviations, chưa xong.

## 8. Khi user đổi mục tiêu giữa chừng
Ví dụ Dino: "bypass demo timer, mở hết màn" -> tạo cờ deviation (R5), giao 1 agent, ghi FORMATS "DEVIATION", không rải sửa khắp nơi.
