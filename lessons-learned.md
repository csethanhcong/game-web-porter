# Lessons learned - port "Dino and Aliens" (D3D8 exe -> three.js)

Đây là ví dụ MỘT port (nguồn binary, 3D). Rút ra nguyên tắc chung bên dưới; chi tiết kỹ thuật chỉ để minh hoạ. Mục `(SPECULATIVE)` = suy luận của người đóng gói, không phải sự kiện đã đo.

## Dòng thời gian thực tế (tóm tắt)
1. User: port game trong thư mục lên web chơi local; hỏi skill nào cần (REA, three.js). Cài Ghidra. Giải nén container (`.dat` XOR theo tên).
2. Lần lượt (mỗi lần user bảo "làm tiếp đi, thêm ..."): sửa lỗi + dựng nhân vật -> kẻ địch + nhặt vật phẩm -> bom/tablet/chìa/cổng -> thoát/chuyển màn -> laser/gương -> menu + âm thanh -> game over -> push/teleport -> hướng nhìn + tỉ lệ -> loại bom + hiệu ứng nổ -> animation còn lại.
3. User phát hiện: hướng đi ngược, tường rào thiếu, lệch nền, chân lún, "animation rất kỳ", "góc nhìn sai". Phản ứng của user: "check logic ... tránh hallucinate", rồi "REPLICATE chính xác từ app gốc, one by one, theo từng category ... spawn các agents".
4. Giai đoạn agent song song (~40 agent tổng): camera, skeleton, hero, enemy, level, AI, bom, laser, grid cờ, visual fidelity, audio, HUD, menu, water/shadow, sprite/effects, asset audit.
5. Có giới hạn dùng (usage limit) và 429 -> resume; user dặn "browser chỉ 1 instance".
6. Cuối: bypass demo (UNLOCK_ALL), "lướt lại 38 màn rồi đóng nốt các GUESS", rồi đóng gói harness này.

## Điều đã ĐÚNG (giữ lại)
- Giải mã container + loader định dạng từ decompile, kiểm size bằng công thức -> parser tin cậy.
- FORMATS.md tách CONFIRMED vs GUESS, kèm địa chỉ hàm; về sau cho phép coverage bằng grep.
- Chia agent theo category + yêu cầu báo cáo VI "confirmed (địa chỉ) vs unconfirmed".
- Debug hooks (`__hero`, `__st`, `__throw`, `__die`...) + `?level=` -> QA tái hiện nhanh.
- Scene test cô lập (`char.html`) để nhìn nhân vật front/side.
- ASSET_AUDIT bằng xref chuỗi/immediate -> biết file nào gốc thực sự dùng (kể cả sprintf pattern).
- COVERAGE: danh sách hàm game-specific chưa được nhắc (proxy) -> vòng việc có đích.
- Cờ `UNLOCK_ALL` gom deviation vào một chỗ.

## Điều đã SAI / time sink
| Vấn đề | Hậu quả | Bài học |
|---|---|---|
| Làm bản "gần giống" trước (camera fit mắt, `+PI` hack, giá trị tự đặt, cấu trúc ô tự chế) rồi mới reverse | Nhiều vòng sửa; user mất niềm tin ("tự bịa") | Reverse từng category TRƯỚC khi code; GUESS gắn nhãn ngay |
| Double V flip, winding swap, alpha-test sai, sprite queue chạy nhiều lần, blend custom ra đen | Texture xám, mặt bị cull, hiệu ứng biến mất, ground đen | Checklist toạ độ/handedness/UV/blend (rules/10) trước renderer |
| Nhiều agent sửa chung `main.js` (166 KB) | Block 441 dòng nhân đôi do script patch cắt sai neo; `stepLocks` crash do null | Ownership theo module; neo duy nhất; syntax check; guard null |
| Agent treo watchdog 600 s / 429 spend limit | Gián đoạn, mất nhịp | Giới hạn song song; resume SendMessage; ghi trạng thái vào TASKS.md |
| Nhiều agent đòi browser, nhiều tab | Máy treo | 1 agent QA, 1 tab (R4) |
| `decomp.c` được nhắc nhưng không có trên đĩa | Agent phải tự mở lại binary | Lưu dump ở đường dẫn cố định, ghi vào TASKS.md |
| Module UI trùng (`ui.js` vs `menu.js`); một số dòng FORMATS outdated | Mâu thuẫn tài liệu | doc-keeper + coverage-auditor |
| `.rec` (replay) coi là "không cần" | Bỏ lỡ nguồn parity test (SPECULATIVE) | Đánh giá recording sớm (phase 11, T4) |
| Tính năng "ảo" (mirror riêng, 'zoom' tablet, sniper billboard) | Công vô ích | Đọc decompile trước khi thêm feature: nhiều thứ là object generic/UI |
| Screenshot lớn (8 MB PNG), preview sai aspect | Chậm, so sánh sai | JPEG, capture đúng aspect |

## Thứ tự khuyên dùng (rút từ trải nghiệm)
1. Recon + decision tree -> scope với user.
2. Tooling + **unified dump** ngay từ đầu.
3. Extract + format docs (có kiểm size).
4. **Checklist render** -> renderer tối thiểu so preview.
5. Dựng level (RNG đúng), rồi nhân vật/animation (đúng quy ước toạ độ đã chốt).
6. Gameplay theo category với hằng số có địa chỉ (fixed timestep trước).
7. Effects/audio/UI song song; QA sweep lặp.
8. Coverage audit lặp; đóng GUESS; deviation (demo unlock) cuối cùng hoặc khi user yêu cầu.
9. Release.
Điểm mấu chốt: **cái user đo là "giống gốc"; mỗi lần agent đoán là một vòng sửa**. Làm đúng ngay lần đầu rẻ hơn.

## Kỹ thuật ghi nhận hiệu quả
- Xref theo chuỗi/immediate để định vị feature.
- Đọc hằng float/double trực tiếp tại địa chỉ data (Xr.java `f:ADDR`) thay vì tin decompiler.
- So sánh asm khi decompiler mơ hồ về thứ tự toán hạng (ma trận B*A).
- Chứng minh bằng "CONFIRMED visually vs <ảnh>" khi đối chiếu ảnh trực tiếp; phân biệt với CONFIRMED từ code.
- Vá nóng trong browser (runtime patch) để thử giả thuyết trước khi sửa file (Dino: thử blend ground).

## Hạn chế của kinh nghiệm này
Chỉ một game, một nền tảng, 3D D3D8, có preview ảnh; chưa thử: nguồn có source, ROM, Flash, game 2D, asset-only, chỉ video, game mạng. Các nhánh đó trong decision tree là thiết kế dự kiến (SPECULATIVE), chưa kiểm chứng trong thực tế.
