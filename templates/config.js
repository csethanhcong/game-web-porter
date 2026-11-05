// Deviation flags / cờ lệch có chủ ý so với bản gốc. Một nơi duy nhất.
// Mỗi cờ: tên, mặc định, mô tả hành vi gốc vs mới, tham chiếu FORMATS.md "DEVIATION: <name>".
// Mặc định do USER quyết định (không tự bật khi chưa được yêu cầu).

// Ví dụ: gỡ giới hạn shareware/demo.
// true  = không timer/nag/BUY NOW, mở mọi màn. false = hành vi demo gốc.
// DELIBERATE DEVIATION from the original (see FORMATS.md "DEVIATION: UNLOCK_ALL").
export const UNLOCK_ALL = true;

// Debug hooks (window.__*) - không đổi gameplay.
export const DEBUG_HOOKS = true;

// Thêm cờ mới theo mẫu:
// export const <FLAG> = <default>; // gốc: ...; mới: ...; FORMATS "DEVIATION: <FLAG>"
