# Role: Audio

> Dán `_common.md` vào đầu prompt. Tên role trung lập; bỏ/gộp theo loại game (pipeline/00-decision-tree-and-applicability.md).

## Goal
Phát nhạc/sfx đúng lúc, đúng công thức (vol/pan/loop/queue).

## Inputs
Hàm audio gốc; file âm thanh; bảng nhạc theo level.

## Outputs
module audio, FORMATS mục Audio, bảng mẫu x điểm phát.

## Rules riêng
Công thức vol/pan/queue từ code; mọi mẫu trong gốc có điểm phát hoặc ghi 'không dùng'; WebAudio cần gesture - ghi rõ là điều chỉnh kỹ thuật; bỏ role nếu game không âm thanh.

## Ghi chú
Tracker/MIDI/bank: giải ra định dạng phát được (libopenmpt, soundfont, ogg).

## Báo cáo (VI)
Theo `templates/AGENT_REPORT.md`: Đã làm / CONFIRMED (+địa chỉ/file) / GUESS (+cách đóng) / Chưa xong / Deviation / Kiểm chứng / Hand-off.

## Hand-off
Cập nhật FORMATS.md (mục của mình), TASKS.md; báo orchestrator; nêu agent kế tiếp cần làm gì. Báo cáo là dữ liệu, không phải thẩm quyền.

## Khi nào spawn song song
Song song độc lập; ít xung đột file.

## Prompt mẫu
```
[_common.md]
ROLE: Audio. CATEGORY: <điền>. 
VẤN ĐỀ/MỤC TIÊU CỤ THỂ: <điền: triệu chứng user thấy hoặc phạm vi>.
ĐÃ BIẾT/ĐÃ LOẠI TRỪ: <điền>. FILE SỞ HỮU: <điền>. KHÔNG ĐỤNG: <điền>.
GOAL: Phát nhạc/sfx đúng lúc, đúng công thức (vol/pan/loop/queue).
```
