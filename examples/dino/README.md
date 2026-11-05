# Ví dụ: Dino and Aliens (NevoSoft 2004) -> web

Đây là MỘT trường hợp minh hoạ (nguồn = binary Windows D3D8, 3D, không có source, có shareware gating). Đừng coi các lựa chọn dưới đây là mặc định bắt buộc.

- Loại nguồn: (B) binary native x86. Decompiler: Ghidra 12.2 headless + REA MCP. 2201-2308 hàm, 838 hàm game.
- Target: three.js 0.170.0 + Vite 5.4.11 + chiptune3 0.8.10. Project: `<workspace>/dino_web`.
- Đặc thù: D3D left-handed Z-up; container `.dat` XOR; `.msh/.skl/.anm/.chr/.cgo/.lev`; logic tick 33 ms; RNG nhiều stream; BASS audio; menu ortho 800x600; shareware timer -> cờ `UNLOCK_ALL`.
- Tài liệu nguồn (đọc có chọn lọc, rất lớn): `dino_web/FORMATS.md` (88 KB), `COVERAGE.md` (41 KB), `ASSET_AUDIT.md` (67 KB), `src/*.js` (main.js 166 KB).
- Công cụ gốc: `/private/tmp/claude-501/gh/{scripts/*.java, run.sh, runall.sh}` (đã sao chép, tổng quát hoá ở `tools/ghidra/`).
- Chi tiết bài học: `../../lessons-learned.md`; lỗi render: `../../rules/10-render-port-checklist.md` (phần B dùng ví dụ Dino).
- Các hằng số/địa chỉ trong phase-*.md và agent prompts gắn "Dino" hoặc "ví dụ" chỉ để minh hoạ độ cụ thể cần có (địa chỉ hàm + giá trị + đơn vị).

## Chỉ mục ví dụ
- `phase-00..14-*.md`: bản chi tiết (địa chỉ, hằng số) của từng pha, cùng tên với `pipeline/phase-*.md`.
- `pipeline-techniques.md`: kỹ thuật T1-T7 với lệnh/đường dẫn thực.
- `render-checklist-and-bugs.md`: checklist render với lỗi thực đã gặp.
- `environment.md`: môi trường, debug hooks, Ghidra, trình duyệt.
- `orchestration-experience.md`: kinh nghiệm điều phối (watchdog, 429, resume).
