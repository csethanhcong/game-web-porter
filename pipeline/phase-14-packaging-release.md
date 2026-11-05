# Phase 14 - Packaging / release

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-14-packaging-release.md`](../examples/dino/phase-14-packaging-release.md).

**Mục tiêu**: Bản build chạy độc lập cục bộ + tài liệu bàn giao.

**Entry**: Phase 13 pass.

**Việc làm**
1. Build production; phục vụ bằng static server (không dựa vào `file://`).
2. Kiểm đường dẫn tương đối, asset đầy đủ, resolver tên file, autoplay audio.
3. Ghi giá trị mặc định cuối của cờ deviation và bảng điều khiển.
4. Tài liệu: README dự án, FORMATS/COVERAGE/ASSET_AUDIT cuối, GUESS còn lại, deviations.
5. Pháp lý: giữ phi thương mại; không phân phối asset gốc.
6. Smoke test cuối bằng QA trên bản build.

**Exit**: Build sạch; QA smoke pass; báo cáo cuối (VI) CONFIRMED/GUESS/deviation.

**Câu hỏi kiểm tra**: Build có chứa asset gốc -> chỉ để dùng cá nhân.
