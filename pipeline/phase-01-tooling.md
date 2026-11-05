# Phase 1 - Tooling setup

> Trung lập về game/engine/công nghệ. Pha này có áp dụng không: `00-decision-tree-and-applicability.md`. Ví dụ cụ thể: [`../examples/dino/phase-01-tooling.md`](../examples/dino/phase-01-tooling.md).

**Mục tiêu**: Có công cụ đọc nguồn (decompiler/disassembler/đọc source), công cụ trích xuất, dev server, QA tooling.

**Entry**: Phase 0 xong; biết loại nguồn.

**Việc làm**
1. Chọn công cụ đọc nguồn theo loại (bảng trong decision tree); hỏi user khi cần cài. Có source: bỏ bước này, chỉ cần index/grep.
2. Tạo **unified dump**: toàn bộ code nguồn/decompile trong MỘT file + bảng đơn vị (hàm/module: địa chỉ-tên, kích thước, caller). Lưu ở đường dẫn cố định, ghi vào TASKS.md (`pipeline/README.md` T1).
3. Công cụ trích xuất container (script có thuật toán lấy từ code gốc).
4. Dev server + scaffold (`tools/new-port.sh`); ghim phiên bản phụ thuộc.
5. QA tooling (`tools/browser-sweep.template.py`) - chỉ qa-visual dùng; script syntax check.
6. Ghi môi trường vào TASKS.md (dump, scratch, dev URL, hooks).

**Exit**: Truy vấn 'đơn vị X làm gì' bằng grep trên dump trong vài giây; giải được container (hoặc biết còn gì chưa); dev server chạy.

**Câu hỏi kiểm tra**: Công cụ có khoá tài nguyên (project lock)? Dump có lưu bền ngoài session không?
