# Phase 13 - Visual verification sweep

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-13-visual-verification.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: mọi level/màn hình được nhìn thật bằng browser và so với tham chiếu (preview gốc), lỗi quay về agent chủ.

**Entry**: Phase 6 trở đi; chạy lặp (sau mỗi cụm thay đổi lớn).

**Việc làm** (agent: qa-visual — DUY NHẤT dùng browser, 1 instance 1 tab)
1. Dùng `tools/browser-sweep.template.py`: với mỗi level: `goto_url(?level=X)` -> đợi `__ready` -> thu console errors (`__err`) -> chụp JPEG vào scratch.
2. So sánh với `preview/<level>.jpg`: bố cục, vật thể, ánh sáng, nước, bóng; ghi sai lệch có số/toạ độ.
3. Kịch bản gameplay qua hooks: di chuyển 4 hướng, ném/đặt bom, đẩy hộp, laser, thoát màn, chết (Dino `__die`, `__throw`, `__respawn`).
4. Phân loại lỗi -> agent sở hữu (render -> effects-render; hướng -> character-animation; ...). **Không tự sửa code trừ khi orchestrator giao.**
5. Báo cáo ngắn: level x kết quả (OK / lỗi mô tả / đường dẫn ảnh), tách "xác nhận bằng ảnh" vs "nghi ngờ".
6. Dino: 38 màn. Kinh nghiệm: capture đúng aspect (re-capture khi preview có tỉ lệ khác), đợi 8-14 s load.

**Exit**: mỗi level có dòng kết quả; không lỗi console; chênh lệch so với preview đã giải thích (CONFIRMED hoặc GUESS).

**Quy tắc**: ảnh là bằng chứng thị giác; không thay bằng chứng từ code. `CONFIRMED visually` chỉ ghi khi ảnh và preview đối chiếu trực tiếp.
