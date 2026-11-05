# Phase 0 - Recon & legal/scope

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-00-recon-scope.md`](../examples/dino/phase-00-recon-scope.md).

**Mục tiêu**: Biết chính xác đang port cái gì, từ nguồn nào, giới hạn pháp lý/phạm vi.

**Entry**: User chỉ ra nguồn game + mục tiêu (chạy được trên web).

**Việc làm**
1. Liệt kê file: loại, kích thước, hash; tìm tài liệu tham chiếu sẵn (ảnh chụp, preview, metadata, manual, video).
2. Nhận diện nền tảng/engine/ngôn ngữ, API đồ hoạ-âm thanh-input mà nguồn dùng, packer/bảo vệ/installer.
3. Phân loại nguồn theo `00-decision-tree-and-applicability.md` (source / binary / asset-only / video) và chọn hướng: port code, RE, nhúng runtime/emulator có sẵn, hay tái tạo.
4. Chốt scope pháp lý với user (cá nhân/local/phi thương mại; không phân phối asset gốc).
5. Chọn target kỹ thuật (bảng chọn công nghệ trong decision tree) và phase plan (SKIP + lý do).
6. Ghi giới hạn đã biết: demo/shareware gating, DRM, mạng, phụ thuộc phần cứng.

**Exit**: `docs/RECON.md` (file, engine/API, loại nguồn, hướng, target, rủi ro, câu hỏi mở); TASKS.md khởi tạo; user xác nhận scope.

**Câu hỏi kiểm tra**: Nguồn có packer? Có tham chiếu thị giác sẵn không? Có runtime web sẵn dùng lại được không?
