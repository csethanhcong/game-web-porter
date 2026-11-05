# Phase 14 - Packaging / release (local)

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-14-packaging-release.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: bản build chạy độc lập trên máy user, tài liệu bàn giao.

**Việc làm** (orchestrator + doc-keeper)
1. `npm run build` (Vite) -> `dist/`; chạy bằng `npx vite preview` hoặc static server (`python3 -m http.server`) — mở `file://` thường hỏng do module/CORS.
2. Kiểm: đường dẫn tương đối (`base: './'`), asset đầy đủ, resolver tên file không phân biệt hoa/thường, AudioContext cần gesture.
3. Cờ deviation: ghi giá trị mặc định cuối (vd `UNLOCK_ALL`), bảng điều khiển phím.
4. Tài liệu: README dự án (cách chạy, phím), FORMATS/COVERAGE/ASSET_AUDIT cuối, danh sách GUESS còn lại, deviations.
5. Pháp lý: giữ phi thương mại, không phân phối asset gốc ngoài máy user (`dist/` chứa asset -> không đăng công khai).
6. Smoke test cuối bằng QA (1 level đầy đủ + menu) trên bản build, không chỉ dev.

**Exit**: build sạch không lỗi; QA smoke pass; README + báo cáo cuối (VI) gồm CONFIRMED/GUESS/deviation.
