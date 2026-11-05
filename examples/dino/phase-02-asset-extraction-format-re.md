# Phase 2 - Asset extraction & format reverse engineering

> VÍ DỤ cụ thể (Dino and Aliens, binary D3D8 -> three.js). Bản trung lập của phase: `../../pipeline/phase-02-asset-extraction-format-re.md`. Mọi địa chỉ/hằng số dưới đây chỉ minh hoạ độ cụ thể cần có.

**Mục tiêu**: toàn bộ dữ liệu game ở dạng đọc được; mỗi định dạng nhị phân có loader tham chiếu.

**Entry**: Phase 1 có decompile + công cụ.

**Việc làm** (agents: asset-extractor, format-reverse-engineer)
1. Giải container ra `extracted/<container>/` (Dino: 400 file dino_assets + 44 âm thanh + 7 + 3 + 7 + 4 = 465 file tổng audit).
2. Phân loại theo phần mở rộng/magic; chuyển đổi cái chuẩn: ảnh -> PNG/JPG, âm thanh -> ogg/wav/mp3, nhạc module -> giữ nguyên nếu có player web (Dino: MO3 qua `chiptune3` 0.8.10/libopenmpt).
3. Với mỗi định dạng riêng: tìm **hàm loader** trong decompile (từ chuỗi tên file/đuôi, hoặc từ `fopen/ReadFile` xref), đọc từng `fread` để ra layout, viết parser JS (`formats.js`) + **kiểm tra kích thước** (công thức tổng byte = kích thước file thật). Ví dụ Dino `.msh`: `37 + 12V + 12T + 24T`; `.skl` bugai: `8+39*12+476*60+39*56+4+944*36 = 65208`; `.anm`: `12 + 12*F + 12*B*F`.
4. Chú ý chi tiết dễ sai: endian, u8 vs u32, chỉ số có base 0/1, UV theo góc tam giác (không theo đỉnh), normal có trong file không hay tự tính, đơn vị góc, cờ header (Dino: header byte 3 != 0 -> smooth normals).
5. Giải mã cái gì không trực tiếp: container XOR, nén, mã hoá chuỗi.
6. Ghi MỖI định dạng vào FORMATS.md (Phase 3) ngay khi xong, kèm CONFIRMED/GUESS.
7. Đặt asset cho web ở `public/assets/` (loại bỏ không cần; giữ tên gốc; resolver case-insensitive).

**Exit**: mọi định dạng cần cho gameplay có parser + kiểm size pass; ASSET_AUDIT khởi tạo (danh sách file + cột "tham chiếu bởi" còn trống); định dạng chưa hiểu liệt kê rõ là GUESS/unknown.

**Artefact**: `tools/unpack.*`, `src/formats.js`, `extracted/`, FORMATS.md (phần định dạng).
