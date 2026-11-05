# ASSET AUDIT - {{GAME}} gốc vs bản web

Source of truth: <binary/source>. Quy tắc: bằng chứng từ nguồn.

## Method & limits
- Chuỗi trong nguồn (kể cả suffix), pattern sprintf (`name%i.ext`), immediate bằng VA chuỗi (xref), hàm chứa (heuristic). "indirect" = file được đặt tên bởi file khác mà nguồn đặt tên (vd .cgo/.chr). 
- Cột "web" = bản web có THỰC SỰ yêu cầu file lúc chạy (không tính chỉ copy vào public/assets).

## Counts
Tổng: <N> = <các nhóm>. Tham chiếu theo tên/pattern: <a>; gián tiếp: <b>; không tham chiếu: <c>.

## Bảng
| file | nhóm | tham chiếu bởi (addr/file) | feature | web dùng? | ghi chú/trạng thái |

## Không dùng trong gốc (lý do)
- <file>: <vì sao>
